import type { AccessLevel } from '../../utils/auth.ts';
import { DBTables } from '../../utils/db.ts';

export async function getLoginInfo(database: D1Database, email: string) {
	const loginInfo = await database
		.prepare(`
			SELECT
				${DBTables.ACCESS}.password AS password,
				${DBTables.ACCESS}.accessLevel AS access,
				${DBTables.PROFILE}.id AS id
			FROM ${DBTables.ACCESS}
			INNER JOIN
				${DBTables.PROFILE}
				ON ${DBTables.PROFILE}.id = ${DBTables.ACCESS}.id
			WHERE
				${DBTables.PROFILE}.email = ?
				AND ${DBTables.PROFILE}.activatedAt IS NOT NULL
				AND ${DBTables.PROFILE}.deletedAt IS NULL
			LIMIT 1
		`)
		.bind(email)
		.first<{ password: string, access: AccessLevel, id: string }>();

	return loginInfo;
}

export async function getHeartbeatInfo(database: D1Database, id: string) {
	const userInfo = await database
		.prepare(`
			SELECT
				${DBTables.ACCESS}.accessLevel AS access,
				${DBTables.PROFILE}.id AS id,
				${DBTables.PROFILE}.avatar AS avatar,
				${DBTables.PROFILE}.name AS name
			FROM ${DBTables.ACCESS}
			INNER JOIN
				${DBTables.PROFILE}
				ON ${DBTables.PROFILE}.id = ${DBTables.ACCESS}.id
			WHERE
				${DBTables.PROFILE}.id = ?
				AND ${DBTables.PROFILE}.activatedAt IS NOT NULL
				AND ${DBTables.PROFILE}.deletedAt IS NULL
			LIMIT 1
		`)
		.bind(id)
		.first<{ access: AccessLevel, id: string, avatar?: string, name?: string }>();

	return userInfo;
}

export async function checkExistingEmail(database: D1Database, email: string) {
	const existingEmail = await database
		.prepare(`SELECT email FROM ${DBTables.PROFILE} WHERE email = ? LIMIT 1`)
		.bind(email)
		.first<{ email: string }>();

	return existingEmail !== null;
}

export async function checkActiveEmail(database: D1Database, email: string) {
	const existingEmail = await database
		.prepare(`SELECT email FROM ${DBTables.PROFILE} WHERE email = ? AND activatedAt NOT NULL LIMIT 1`)
		.bind(email)
		.first<{ email: string }>();

	return existingEmail !== null;
}

export async function activateProfile(database: D1Database, email: string) {
	const now = new Date().toISOString();
	const { success } = await database
		.prepare(`UPDATE ${DBTables.PROFILE} SET activatedAt = ? WHERE email = ?`)
		.bind(now, email)
		.run();

	return success;
}
