import type { AccessLevel } from '../../utils/auth.ts';
import { DBTables } from '../../utils/db.ts';

export async function getLoginInfo(database: D1Database, email: string) {
	const loginInfo = await database
		.prepare(`
			SELECT password, accessLevel AS access, id
			FROM ${DBTables.ACCESS}
			WHERE
				email = ?
				AND activatedAt IS NOT NULL
				AND deletedAt IS NULL
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
				access.accessLevel AS access,
				access.profileStatus AS status,
				profile.id AS id,
				profile.avatar AS avatar,
				profile.name AS name
			FROM ${DBTables.ACCESS} AS access
			INNER JOIN
				${DBTables.PROFILE} AS profile
				ON profile.id = access.id
			WHERE
				profile.id = ?
				AND access.activatedAt IS NOT NULL
				AND access.deletedAt IS NULL
			LIMIT 1
		`)
		.bind(id)
		.first<{ access: AccessLevel, status: ProfileStatus, id: string, avatar?: string, name?: string }>();

	return userInfo;
}

export async function checkExistingEmail(database: D1Database, email: string) {
	const existingEmail = await database
		.prepare(`SELECT email FROM ${DBTables.ACCESS} WHERE email = ? LIMIT 1`)
		.bind(email)
		.first<{ email: string }>();

	return existingEmail !== null;
}

export async function checkActiveEmail(database: D1Database, email: string) {
	const existingEmail = await database
		.prepare(`SELECT email FROM ${DBTables.ACCESS} WHERE email = ? AND activatedAt NOT NULL LIMIT 1`)
		.bind(email)
		.first<{ email: string }>();

	return existingEmail !== null;
}

export async function activateProfile(database: D1Database, email: string) {
	const now = new Date().toISOString();
	const { success } = await database
		.prepare(`UPDATE ${DBTables.ACCESS} SET activatedAt = ? WHERE email = ?`)
		.bind(now, email)
		.run();

	return success;
}
