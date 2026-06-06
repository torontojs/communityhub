import { DBTables, generateBaseDBfields } from '../../utils/db.ts';
import { resolveGravatarAvatarUrl } from '../../utils/gravatar.ts';
import { EventLog } from '../event-log/data.ts';
import type { AddTeamMembers, TeamMemberInfo, UpdateTeamMembers } from './validation.ts';

export async function nonExistingTeamMemberIds(database: D1Database, teamId: string, ids: string[]) {
	const { results } = await database.prepare(`
		SELECT role.id AS id
		FROM ${DBTables.ROLE} AS role
		JOIN ${DBTables.ACCESS} AS access ON access.id = role.profileId
		WHERE
			role.teamId = ?
			AND role.id IN (${new Array(ids.length).fill('?').join(',')})
			AND access.activatedAt IS NOT NULL
			AND access.deletedAt IS NULL
			AND role.deletedAt IS NULL
	`).bind(teamId, ...ids).run<{ id: string }>();

	const existingIds = new Set(results.map(({ id }) => id));

	return [...new Set(ids).difference(existingIds)];
}

export async function addTeamMembers(database: D1Database, teamId: string, data: AddTeamMembers) {
	const results = await database.batch([
		...data.flatMap(({ name, profileId, description }) => {
			const { id, schemaVersion, happenedAt, insertedAt } = generateBaseDBfields();

			return [
				database.prepare(`
					INSERT INTO ${DBTables.ROLE} (
						id, schemaVersion, happenedAt, insertedAt,
						teamId, name, description,
						profileId
					)
					SELECT
						?, ?, ?, ?,
						?, ?, ?,
						id
					FROM ${DBTables.ACCESS}
					WHERE
						id = ?
						AND activatedAt IS NOT NULL
						AND deletedAt IS NULL
					LIMIT 1
				`).bind(
					id,
					schemaVersion,
					happenedAt,
					insertedAt,
					teamId,
					name,
					description ?? '',
					profileId
				),
				EventLog.joinTeam(database, profileId, teamId)
			];
		})
	]);

	return results.every(({ success }) => success);
}

export async function updateTeamMembers(database: D1Database, teamId: string, data: UpdateTeamMembers) {
	const results = await database.batch([
		...data.map(({ id: roleId, description, name }) =>
			database.prepare(`
				UPDATE ${DBTables.ROLE}
				SET
					name = ?,
					description = ?
				WHERE
					id = ?
					AND teamId = ?
					AND deletedAt IS NULL
			`).bind(name ?? '', description ?? '', roleId, teamId)
		)
	]);

	return results.every(({ success }) => success);
}

export async function countAllMembers(database: D1Database, teamId: string) {
	const { results } = await database.prepare(`
		SELECT COUNT(*) AS count FROM ${DBTables.ROLE} AS role
		INNER JOIN ${DBTables.ACCESS} AS access ON access.id = role.profileId
		INNER JOIN ${DBTables.PROFILE} AS profile ON profile.id = role.profileId
		WHERE
			role.teamId = ?
			AND role.deletedAt IS NULL
			AND access.activatedAt IS NOT NULL
			AND access.deletedAt IS NULL
	`).bind(teamId).run();
	return results;
}

export async function getAllMembers(database: D1Database, teamId: string, limit?: number, offset = 0) {
	const { results } = await database.prepare(`
		SELECT
			role.id AS id,
			role.name AS name,
			role.insertedAt AS joinedTeamAt,
			profile.id AS profileId,
			profile.name AS profileName,
			profile.avatar AS avatar,
			profile.email AS email,
			profile.isBasedOnGTA AS isBasedOnGTA,
			(
				SELECT GROUP_CONCAT(team.name, '||')
				FROM ${DBTables.ROLE} AS member_role
				INNER JOIN ${DBTables.TEAM} AS team ON team.id = member_role.teamId
				WHERE
					member_role.profileId = profile.id
					AND member_role.deletedAt IS NULL
					AND team.deletedAt IS NULL
			) AS teamNames
		FROM ${DBTables.ROLE} AS role
		INNER JOIN
			${DBTables.ACCESS} AS access
			ON
				access.id = role.profileId
		INNER JOIN
			${DBTables.PROFILE} AS profile
			ON
				profile.id = role.profileId
		WHERE
			role.teamId = ?
			AND role.deletedAt IS NULL
			AND access.activatedAt IS NOT NULL
			AND access.deletedAt IS NULL
		${limit ? 'LIMIT ? OFFSET ?' : ''}
		`).bind(teamId, ...(limit ? [limit, offset] : [])).run<TeamMemberInfo>();

	return Promise.all(results.map(async (member) => ({
		...member,
		avatar: member.avatar ? await resolveGravatarAvatarUrl(member.avatar) : member.avatar,
		isBasedOnGTA: Boolean(member.isBasedOnGTA)
	})));
}

export async function deleteTeamMembers(database: D1Database, teamId: string, data: string[]) {
	const results = await database.batch(
		data.flatMap((roleId) => [
			database
				.prepare(`
					UPDATE ${DBTables.ROLE}
					SET
						deletedAt = ?
					WHERE
						id = ?
						AND teamId = ?
				`).bind(new Date().toISOString(), roleId, teamId),
			EventLog.leaveTeam(database, roleId, teamId)
		])
	);

	return results.every(({ success }) => success);
}
