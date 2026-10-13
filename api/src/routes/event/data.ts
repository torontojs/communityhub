import { DBTables, generateBaseDBfields } from '../../utils/db.ts';
import { EventLog } from '../event-log/data.ts';
import type { CreateEventData, Event as EventData, UpdateEventData } from './validation.ts';

export async function doesEventExist(database: D1Database, id: string) {
	const existingEvent = await database
		.prepare(`SELECT id FROM ${DBTables.EVENT} WHERE id = ? AND deletedAt IS NULL LIMIT 1`)
		.bind(id)
		.first<{ id: string }>();

	return Boolean(existingEvent);
}

export async function doesSameEventNameExist(database: D1Database, name: string) {
	const existingEvent = await database
		.prepare(`SELECT id FROM ${DBTables.EVENT} WHERE name = ? AND deletedAt IS NULL LIMIT 1`)
		.bind(name)
		.first<{ id: string }>();

	return Boolean(existingEvent);
}

export async function insertEvent(database: D1Database, profileId: string, { name, description = '', teamId }: CreateEventData) {
	const { id, schemaVersion, happenedAt, insertedAt } = generateBaseDBfields();

	const results = await database.batch([
		database.prepare(`
				INSERT INTO ${DBTables.EVENT} (
					id, schemaVersion, happenedAt, insertedAt,
					name, description, teamId
				)
				VALUES (
					?, ?, ?, ?,
					?, ?, ?
				)
			`)
			.bind(
				id,
				schemaVersion,
				happenedAt,
				insertedAt,
				name,
				description,
				teamId ?? null
			),
		EventLog.createEvent(database, profileId, id)
	]);

	return { success: results.every(({ success }) => success), id };
}

export async function updateEventById(database: D1Database, id: string, data: UpdateEventData) {
	const keys: string[] = [];
	const values: (string | null)[] = [];

	if (data.name !== undefined) {
		values.push(data.name);
		keys.push('name = ?');
	}

	if (data.description !== undefined) {
		values.push(data.description);
		keys.push('description = ?');
	}

	if (data.teamId !== undefined) {
		values.push(data.teamId);
		keys.push('teamId = ?');
	}

	const { success } = await database
		.prepare(`
			UPDATE ${DBTables.EVENT}
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

export async function getEventById(database: D1Database, id: string) {
	const event = await database
		.prepare(`
			SELECT *
			FROM ${DBTables.EVENT}
			WHERE
				id = ?
				AND deletedAt IS NULL
			LIMIT 1
		`)
		.bind(id)
		.first<EventData>();

	return event;
}

export async function getAllEvents(database: D1Database) {
	const { results } = await database.prepare(`
		SELECT *
		FROM ${DBTables.EVENT}
		WHERE deletedAt IS NULL
	`).run<EventData>();

	return results;
}

export async function deleteEventById(database: D1Database, profileId: string, id: string) {
	const now = new Date().toISOString();

	const results = await database.batch([
		database.prepare(`
				UPDATE ${DBTables.EVENT}
				SET
					deletedAt = ?
				WHERE
					id = ?
					AND deletedAt IS NULL
			`)
			.bind(now, id),
		EventLog.closeEvent(database, profileId, id)
	]);

	return results.every(({ success }) => success);
}
