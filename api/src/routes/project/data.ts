import { DBTables, generateBaseDBfields } from '../../utils/db.ts';
import { EventLog } from '../event-log/data.ts';
import type { CreateProjectData, Project, UpdateProjectData } from './validation.ts';

export async function doesProjectExist(database: D1Database, id: string) {
	const existingProject = await database
		.prepare(`SELECT id FROM ${DBTables.PROJECT} WHERE id = ? AND deletedAt IS NULL LIMIT 1`)
		.bind(id)
		.first<{ id: string }>();

	return Boolean(existingProject);
}

export async function doesSameProjectNameExist(database: D1Database, name: string) {
	const existingProject = await database
		.prepare(`SELECT id FROM ${DBTables.PROJECT} WHERE name = ? AND deletedAt IS NULL LIMIT 1`)
		.bind(name)
		.first<{ id: string }>();

	return Boolean(existingProject);
}

export async function insertProject(database: D1Database, profileId: string, { name, description = '', teamId }: CreateProjectData) {
	const { id, schemaVersion, happenedAt, insertedAt } = generateBaseDBfields();

	const results = await database.batch([
		database.prepare(`
				INSERT INTO ${DBTables.PROJECT} (
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
				teamId
			),
		EventLog.createProject(database, profileId, id)
	]);

	return { success: results.every(({ success }) => success), id };
}

export async function updateProjectById(database: D1Database, id: string, data: UpdateProjectData) {
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

	if (data.teamId !== undefined) {
		values.push(data.teamId);
		keys.push('teamId = ?');
	}

	const { success } = await database
		.prepare(`
			UPDATE ${DBTables.PROJECT}
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

export async function getProjectById(database: D1Database, id: string) {
	const project = await database
		.prepare(`
			SELECT *
			FROM ${DBTables.PROJECT}
			WHERE
				id = ?
				AND deletedAt IS NULL
			LIMIT 1
		`)
		.bind(id)
		.first<Project>();

	return project;
}

export async function getAllProjects(database: D1Database) {
	const { results } = await database.prepare(`
		SELECT *
		FROM ${DBTables.PROJECT}
		WHERE deletedAt IS NULL
	`).run<Project>();

	return results;
}

export async function deleteProjectById(database: D1Database, profileId: string, id: string) {
	const now = new Date().toISOString();

	const results = await database.batch([
		database.prepare(`
				UPDATE ${DBTables.PROJECT}
				SET
					deletedAt = ?
				WHERE
					id = ?
					AND deletedAt IS NULL
			`)
			.bind(now, id),
		EventLog.closeProject(database, profileId, id)
	]);

	return results.every(({ success }) => success);
}
