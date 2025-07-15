import { DBTables, generateBaseDBfields } from '../../utils/db.ts';
import { DOCUMENT_VERSIONS, type ProfileDocumentType, type SignedProfileDocument } from './validation.ts';

export async function signDocument(database: D1Database, profileId: string, documentType: ProfileDocumentType) {
	const existingDocument = await database.prepare(`
			SELECT id
			FROM ${DBTables.DOCUMENTS}
			WHERE
				profileId = ?
				AND documentType = ?
			LIMIT 1
		`)
		.bind(profileId, documentType)
		.first<{ id: string }>();

	const now = new Date().toISOString();
	const documentVersion = DOCUMENT_VERSIONS[documentType];

	let isSuccess = false;

	if (existingDocument) {
		isSuccess = (await database.prepare(`
			UPDATE ${DBTables.DOCUMENTS}
			SET
				signedAt = ?,
				documentVersion = ?
			WHERE
				profileId = ?
				AND type = ?
		`)
			.bind(now, documentVersion, profileId, documentType)
			.run()).success;
	} else {
		const { id, schemaVersion } = generateBaseDBfields();

		isSuccess = (await database.prepare(`
			INSERT INTO ${DBTables.DOCUMENTS} (
				signedAt, documentVersion, profileId, type,
				id, schemaVersion
			)
			VALUES (
				?, ?, ?, ?,
				?, ?
			)
		`)
			.bind(now, documentVersion, profileId, documentType, id, schemaVersion)
			.run()).success;
	}

	return isSuccess;
}

export async function getSignedDocuments(database: D1Database, profileId: string) {
	const { results } = await database.prepare(`
		SELECT type, documentVersion, signedAt
		FROM ${DBTables.DOCUMENTS}
		WHERE
			profileId = ?
	`)
		.bind(profileId)
		.run<SignedProfileDocument>();

	return results;
}
