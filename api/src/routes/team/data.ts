import { DBTables, generateBaseDBfields } from '../../utils/db.ts';
import { EventLog } from '../event-log/data.ts';
import type { CreateTeamData, Team, UpdateTeamData } from './validation.ts';

export async function doesTeamExist(database: D1Database, id: string) {
	const existingTeam = await database
		.prepare(`SELECT id FROM ${DBTables.TEAM} WHERE id = ? AND deletedAt IS NULL LIMIT 1`)
		.bind(id)
		.first<{ id: string }>();

	return Boolean(existingTeam);
}

export async function doesSameTeamNameExist(database: D1Database, name: string, excludeId?: string) {
	const existingTeam = await database
		.prepare(`SELECT id FROM ${DBTables.TEAM} WHERE name = ? AND deletedAt IS NULL AND id != ? LIMIT 1`)
		.bind(name, excludeId ?? '')
		.first<{ id: string }>();

	return Boolean(existingTeam);
}

export async function insertTeam(database: D1Database, profileId: string, { name, description = '' }: CreateTeamData) {
	const { id, schemaVersion, happenedAt, insertedAt } = generateBaseDBfields();

	const results = await database.batch([
		database.prepare(`
			INSERT INTO ${DBTables.TEAM} (
				id, schemaVersion, happenedAt, insertedAt,
				name, description
			)
			VALUES (
				?, ?, ?, ?,
				?, ?
			)
		`)
			.bind(
				id,
				schemaVersion,
				happenedAt,
				insertedAt,
				name,
				description
			),
		EventLog.createTeam(database, profileId, id)
	]);

	return { success: results.every(({ success }) => success), id };
}

export async function updateTeamById(database: D1Database, id: string, data: UpdateTeamData) {
	const keys: string[] = [];
	const values: string[] = [];

	if (data.name !== undefined) {
		values.push(data.name);
		keys.push('name = ?');
	}

	if (data.description !== undefined) {
		values.push(data.description);
		keys.push('description = ?');
	}

	const { success } = await database
		.prepare(`
			UPDATE ${DBTables.TEAM}
			SET
				${keys.join(', ')}
			WHERE
				id = ?
				AND deletedAt IS NULL
		`)
		.bind(...values, id)
		.run();

	return success;
}

export async function getTeamById(database: D1Database, id: string) {
	const team = await database
		.prepare(`
			SELECT *
			FROM ${DBTables.TEAM}
			WHERE
				id = ?
				AND deletedAt IS NULL
			LIMIT 1
		`)
		.bind(id)
		.first<Team>();

	return team;
}

export async function countAllTeams(database: D1Database) {
	const result = await database.prepare(`
		SELECT COUNT(*) AS count
		FROM ${DBTables.TEAM}
		WHERE deletedAt IS NULL
	`).first<{ count: number }>();

	return result?.count ?? 0;
}

export async function getAllTeams(database: D1Database, limit?: number, offset = 0) {
	const query = database.prepare(`
		SELECT *
		FROM ${DBTables.TEAM}
		WHERE deletedAt IS NULL
		${limit ? 'LIMIT ? OFFSET ?' : ''}
	`);
	const { results } = await (limit ? query.bind(limit, offset) : query).run<Team>();

	return results;
}

export async function deleteTeamById(database: D1Database, profileId: string, id: string) {
	const now = new Date().toISOString();

	const results = await database.batch([
		database.prepare(`
			UPDATE ${DBTables.TEAM}
			SET
				deletedAt = ?
			WHERE
				id = ?
		`)
			.bind(now, id),
		EventLog.closeTeam(database, profileId, id)
	]);

	return results.every(({ success }) => success);
}
