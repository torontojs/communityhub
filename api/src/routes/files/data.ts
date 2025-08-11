import { DBTables, SCHEMA_VERSION } from '../../utils/db.ts';
import type { AllowedFileMimeType, FileAccessLevelType, UploadedFileType } from './validation.ts';

export const fetchFileInfo = async (database: D1Database, fileNameAsId: string, fileAccessLevel: FileAccessLevelType = 'public', isAuthenticated = false) => {
	// Search all files if requesting protected file and authenticated, otherwise only search public files
	const accessLevelCheck = fileAccessLevel === 'protected' && isAuthenticated ?  "AND accessLevel = 'public'" : '';
	const dbQuery = `
		SELECT id AS fileName, mimeType, accessLevel
		FROM ${DBTables.UPLOADS}
		WHERE
			id = ?
			${accessLevelCheck}
		LIMIT 1
	`;

	const fileInfo = await database
		.prepare(dbQuery)
		.bind(fileNameAsId)
		.first<{ fileName: string, mimeType: AllowedFileMimeType, accessLevel: FileAccessLevelType }>();

	return fileInfo;
};

export const uploadFile = async (
	database: D1Database,
	profileId: string,
	fileNameAsId: string,
	fileType: UploadedFileType,
	fileMimeType: AllowedFileMimeType,
	accessLevel: FileAccessLevelType = 'public'
) => {
	const now = new Date().toISOString();

	const { success } = await database.prepare(`
		INSERT INTO ${DBTables.UPLOADS} (id, schemaVersion, profileId, type,  insertedAt, mimeType, accessLevel) VALUES (?, ?, ?, ?, ?, ?, ?)
	`)
		.bind(fileNameAsId, SCHEMA_VERSION, profileId, fileType, now, fileMimeType, accessLevel)
		.run();

	return success;
};
