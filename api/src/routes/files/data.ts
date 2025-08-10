import { DBTables, SCHEMA_VERSION } from '../../utils/db.ts';
import type { AllowedFileMimeType, FileAccessLevelType, UploadedFileType } from './validation.ts';

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
