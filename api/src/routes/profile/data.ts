import { DBTables, DEFAULT_TEAM_ID, generateBaseDBfields } from '../../utils/db.ts';
import { EventLog } from '../event-log/data.ts';
import type { CreateProfileData, Profile, ProfileLink, ProfileSkill, ProfileTeam, UpdateProfileData } from './validation.ts';

export function transformProfile(profile: Profile) {
	const filteredProfile = Object.fromEntries(Object.entries(profile).filter(([, value]) => Boolean(value))) as Profile;

	return {
		...filteredProfile,
		isBasedOnGTA: Boolean(profile.isBasedOnGTA),
		canJoinLocalEvents: Boolean(profile.canJoinLocalEvents),
		links: profile.links ?? [],
		skills: profile.skills ?? [],
		teams: profile.teams ?? []
	};
}

export async function doesProfileExist(database: D1Database, id: string) {
	const profile = await database.prepare(`
		SELECT profile.id
		FROM ${DBTables.PROFILE} AS profile
		JOIN ${DBTables.ACCESS} AS access ON access.id = profile.id
		WHERE
			profile.id = ?
			AND access.activatedAt IS NOT NULL
			AND access.deletedAt IS NULL
		LIMIT 1
	`).bind(id).first<{ id: string }>();

	return Boolean(profile);
}

export async function nonExistingProfileIds(database: D1Database, ids: string[]) {
	if (ids.length === 0) { return []; }

	const { results } = await database.prepare(`
		SELECT profile.id
		FROM ${DBTables.PROFILE} AS profile
		JOIN ${DBTables.ACCESS} AS access ON access.id = profile.id
		WHERE
			profile.id IN (${new Array(ids.length).fill('?').join(',')})
			AND access.activatedAt IS NOT NULL
			AND access.deletedAt IS NULL
	`).bind(...ids).run<{ id: string }>();

	const existingIds = new Set(results.map(({ id }) => id));

	return [...new Set(ids).difference(existingIds)];
}

export async function insertProfile(database: D1Database, { avatar, email, name, password }: CreateProfileData) {
	const { id: profileId, schemaVersion, happenedAt, insertedAt } = generateBaseDBfields();
	const { id: roleId } = generateBaseDBfields();

	const results = await database.batch([
		database.prepare(`
			INSERT INTO ${DBTables.PROFILE} (
				id, schemaVersion, happenedAt, insertedAt,
				email, name, avatar
			)
			VALUES (
				?, ?, ?, ?,
				?, ?, ?
			)
		`).bind(
			profileId,
			schemaVersion,
			happenedAt,
			insertedAt,
			email,
			name,
			avatar ?? null
		),
		database.prepare(`
			INSERT INTO ${DBTables.ACCESS} (
				accessLevel, profileStatus, id, schemaVersion, password, email
			)
			VALUES (
				'volunteer', 'created', ?, ?, ?, ?
			)
		`).bind(profileId, schemaVersion, password, email),
		EventLog.joinTorontoJS(database, profileId),
		database.prepare(`
			INSERT INTO ${DBTables.ROLE} (
				id, schemaVersion, happenedAt, insertedAt,
				name, description, teamId, profileId
			)
			VALUES (
				?, ?, ?, ?,
				?, ?, ?, ?
			)
		`).bind(
			roleId,
			schemaVersion,
			happenedAt,
			insertedAt,
			'volunteer',
			'Volunteer at Toronto JS',
			DEFAULT_TEAM_ID,
			profileId
		)
	]);

	return { success: results.every(({ success }) => success), id: profileId };
}

export async function updateProfileById(
	database: D1Database,
	id: string,
	{ name, description, isBasedOnGTA, canJoinLocalEvents, pronouns, birthday, avatar, links, skills }: UpdateProfileData
) {
	const fieldsToUpdate = Object.fromEntries(
		Object.entries({
			name,
			description,
			isBasedOnGTA,
			canJoinLocalEvents,
			pronouns,
			birthday,
			avatar
		}).filter(([key, value]) => key === 'avatar' ? value !== undefined : value !== null && value !== undefined)
	);

	// Only include links that have URLs and skills that are non-empty
	const incomingLinks = (links ?? []).filter(({ url }) => url);
	const incomingSkills = (skills ?? []).filter((skill) => skill);

	// If scalar fields were provided, build the UPDATE query; otherwise return an empty array
	// so that spreading into the batch is a no-op
	const hasFieldsToUpdate = Object.keys(fieldsToUpdate).length > 0;
	const profileUpdateQuery = hasFieldsToUpdate
		? [
			database.prepare(`
			UPDATE ${DBTables.PROFILE} AS profile
			SET
				${Object.keys(fieldsToUpdate).map((key) => `${key} = ?`).join(', ')}
			FROM ${DBTables.ACCESS} AS access
			WHERE
				profile.id = ?
				AND access.id = profile.id
				AND access.activatedAt IS NOT NULL
				AND access.deletedAt IS NULL
		`).bind(...Object.values(fieldsToUpdate), id)
		]
		: [];

	// Build links queries only if links were provided
	const hasLinks = links !== undefined;
	const linksQueries = hasLinks
		? [
			database.prepare(`
				DELETE FROM ${DBTables.PROFILE_LINKS}
				WHERE profileId = ?
			`).bind(id),
			...incomingLinks.map(({ platform, url }) => {
				const { id: linkId } = generateBaseDBfields();

				return database.prepare(`
					INSERT INTO ${DBTables.PROFILE_LINKS} (
						id, platform, url, profileId
					)
					VALUES (?, ?, ?, ?)
				`).bind(linkId, platform, url, id);
			})
		]
		: [];

	// Build skills queries only if skills were provided
	const hasSkills = skills !== undefined;
	const skillsQueries = hasSkills
		? [
			database.prepare(`
				DELETE FROM ${DBTables.PROFILE_SKILLS}
				WHERE profileId = ?
			`).bind(id),
			...incomingSkills.map((skill) => {
				const { id: skillId } = generateBaseDBfields();

				return database.prepare(`
					INSERT INTO ${DBTables.PROFILE_SKILLS} (
						id, skill, profileId
					)
					VALUES (?, ?, ?)
				`).bind(skillId, skill, id);
			})
		]
		: [];

	const results = await database.batch([
		...profileUpdateQuery,
		...linksQueries,
		...skillsQueries
	]);

	return results.every(({ success }) => success);
}

export async function getProfileById(database: D1Database, id: string) {
	// TODO: try to refactor to a single query (join)
	const results = await database.batch([
		database.prepare(`
			SELECT profile.*, access.activatedAt, access.deletedAt
			FROM ${DBTables.PROFILE} AS profile
			JOIN ${DBTables.ACCESS} AS access ON access.id = profile.id
			WHERE
				profile.id = ?
				AND access.activatedAt IS NOT NULL
				AND access.deletedAt IS NULL
			LIMIT 1
		`).bind(id),
		database.prepare(`SELECT platform, url FROM ${DBTables.PROFILE_LINKS} WHERE profileId = ?`).bind(id),
		database.prepare(`SELECT skill FROM ${DBTables.PROFILE_SKILLS} WHERE profileId = ?`).bind(id),
		database.prepare(`
			SELECT
				team.id,
				team.name,
				team.description,
				role.name AS role,
				(
					SELECT COUNT(*)
					FROM ${DBTables.ROLE} AS r_count
					WHERE r_count.teamId = team.id AND r_count.deletedAt IS NULL
				) AS memberCount
			FROM ${DBTables.ROLE} AS role
			JOIN ${DBTables.TEAM} AS team ON role.teamId = team.id
			WHERE
				role.profileId = ?
				AND role.deletedAt IS NULL
				AND team.deletedAt IS NULL
		`).bind(id)
	]);

	const profile = results[0]?.results[0] as Profile | undefined;

	if (!profile) {
		return undefined;
	}

	profile.links = (results[1]?.results as ProfileLink[] | undefined ?? []).map((link) => link);
	profile.skills = (results[2]?.results as ProfileSkill[] | undefined ?? []).map(({ skill }) => skill);
	profile.teams = results[3]?.results as ProfileTeam[] | undefined ?? [];
	return transformProfile(profile);
}

export async function getAllProfiles(database: D1Database) {
	const results = await database.batch([
		database.prepare(`
			SELECT profile.*, access.activatedAt, access.deletedAt
			FROM ${DBTables.PROFILE} AS profile
			JOIN ${DBTables.ACCESS} AS access ON access.id = profile.id
			WHERE
				access.activatedAt IS NOT NULL
				AND access.deletedAt IS NULL
		`),
		database.prepare(`
			SELECT pl.profileId, pl.platform, pl.url
			FROM ${DBTables.PROFILE_LINKS} AS pl
			JOIN ${DBTables.ACCESS} AS access ON access.id = pl.profileId
			WHERE access.activatedAt IS NOT NULL AND access.deletedAt IS NULL
		`),
		database.prepare(`
			SELECT ps.profileId, ps.skill
			FROM ${DBTables.PROFILE_SKILLS} AS ps
			JOIN ${DBTables.ACCESS} AS access ON access.id = ps.profileId
			WHERE access.activatedAt IS NOT NULL AND access.deletedAt IS NULL
		`)
	]);

	const profiles = new Map(
		(results[0]?.results as Profile[] | undefined ?? [])
			.map((profile) => [profile.id, transformProfile(profile)])
	);

	// Assign links to profiles
	(results[1]?.results as ProfileLink[] | undefined ?? []).forEach(({ profileId, platform, url }) => {
		const profile = profiles.get(profileId);

		if (profile) {
			profile.links ??= [];
			profile.links.push({ platform, url });
		}
	});

	// Assign skills to profiles
	(results[2]?.results as ProfileSkill[] | undefined ?? []).forEach(({ profileId, skill }) => {
		const profile = profiles.get(profileId);

		if (profile) {
			profile.skills ??= [];
			profile.skills.push(skill);
		}
	});

	return [...profiles.values()];
}

export async function deleteProfileById(database: D1Database, id: string) {
	const now = new Date().toISOString();

	const { success } = await database
		.prepare(`
			UPDATE ${DBTables.ACCESS}
			SET deletedAt = ?
			WHERE id = ?
			LIMIT 1
		`)
		.bind(now, id)
		.run();

	return success;
}
