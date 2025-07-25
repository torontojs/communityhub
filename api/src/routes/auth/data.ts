import type { AccessLevel } from '../../utils/auth.ts';
import { DBTables } from '../../utils/db.ts';
import { DOCUMENT_VERSIONS, type ProfileDocument } from '../documents/validation.ts';
import type { HeartbeatResponse } from './responses.ts';
import type { ProfileStatus } from './validation.ts';

export async function getProfileStatus(database: D1Database, profileId: string): Promise<ProfileStatus> {
	const SOCIAL_MEDIA_PLATFORM = 'slack';

	const [{ results: datesResults }, { results: socialMediaResults }, { results: documents }] = await database.batch([
		database.prepare(`
			SELECT
				access.deletedAt AS deletedAt,
				access.activatedAt AS activatedAt,
				profile.insertedAt AS insertedAt
			FROM ${DBTables.ACCESS} AS access
			INNER JOIN
				${DBTables.PROFILE} AS profile
				ON profile.id = access.id
			WHERE
				profile.id = ?
			LIMIT 1
		`).bind(profileId),
		database.prepare(`
			SELECT url
			FROM ${DBTables.PROFILE_LINKS}
			WHERE
				profileId = ?
				AND platform = '${SOCIAL_MEDIA_PLATFORM}'
			LIMIT 1
		`).bind(profileId),
		database.prepare(`
			SELECT type, documentVersion
			FROM ${DBTables.DOCUMENTS}
			WHERE
				profileId = ?
		`).bind(profileId)
	]) as [
		D1Result<{ deletedAt: string, activatedAt: string, insertedAt: string }>,
		D1Result<{ url: string }>,
		D1Result<ProfileDocument>
	];

	const { deletedAt, activatedAt, insertedAt } = datesResults[0] ?? {};
	const { url: socialMediaUrl } = socialMediaResults[0] ?? {};

	if (deletedAt) {
		return 'deleted';
	}

	const documentTypes = new Set(Object.keys(DOCUMENT_VERSIONS));
	const documentVersions = new Set(Object.values(DOCUMENT_VERSIONS));
	const signedDocumentTypes = new Set(documents.map(({ type }) => type));
	const signedDocumentVersions = new Set(documents.map(({ documentVersion }) => documentVersion));
	const hasSignedAllDocuments = documentTypes.intersection(signedDocumentTypes).size === documentTypes.size;
	const hasSignedAllDocumentVersions = documentVersions.intersection(signedDocumentVersions).size === documentVersions.size;

	const isCreated = Boolean(insertedAt);
	const isActivated = Boolean(activatedAt);
	const isTosAccepted = hasSignedAllDocuments && hasSignedAllDocumentVersions;
	const hasSocialMediaHandle = Boolean(socialMediaUrl);

	if (isCreated && isActivated && isTosAccepted && hasSocialMediaHandle) {
		return 'profile-completed';
	}

	if (hasSocialMediaHandle) {
		return 'social-handle-provided';
	}

	if (isTosAccepted) {
		return 'tos-accepted';
	}

	if (isActivated) {
		return 'activated';
	}

	if (isCreated) {
		return 'created';
	}

	return 'error';
}

export async function updateProfileStatus(database: D1Database, profileId: string) {
	const currentStatus = await getProfileStatus(database, profileId);

	const { success } = await database.prepare(`
		UPDATE ${DBTables.ACCESS} SET profileStatus = ? WHERE id = ?
	`)
		.bind(currentStatus, profileId)
		.run();

	return success;
}
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
		.first<HeartbeatResponse>();

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
		.prepare(`SELECT email FROM ${DBTables.ACCESS} WHERE email = ? AND activatedAt IS NOT NULL LIMIT 1`)
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
