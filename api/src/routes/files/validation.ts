import { z } from 'zod';

export const FileNameParamSchema = z.object({
	filename: z.string('Invalid file name!')
});

export type FileNameParam = z.infer<typeof FileNameParamSchema>;

export const AllowedFileMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

export const FileTypeSchema = z.enum([
	'avatar',
	'document'
]).describe('The purpose of the upload. E.g., user avatar or other document.');

export const FileUploadSchema = z.object({
	file: z
		.custom<File>((f) => f instanceof File, {
			message: 'Uploaded value is not a File'
		})
		.refine(
			(file) => AllowedFileMimeTypes.includes(file.type),
			{ message: 'Invalid image file type. Only JPEG and PNG are allowed' }
		)
		.describe('The allowed MIME types for file uploads to the platform for storage in R2 bucket.'),
	type: FileTypeSchema
});
