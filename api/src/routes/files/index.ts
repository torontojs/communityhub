import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { authMiddleware } from '../../middleware/auth.ts';
import { fileUploadSizeCheck } from '../../middleware/body-size.ts';
import { getSession } from '../../utils/auth.ts';
import { StatusCodes, type StatusResponse, statusResponseFormatter, StatusResponseSchema } from '../../utils/responses.ts';
import { getProfileById } from '../profile/data.ts';
import { fetchFileInfo, uploadFile } from './data.ts';
import {
	type AllowedFileMimeType,
	FileNameParamSchema,
	FileUploadSchema,
	isPublicFileType,
	type UploadedFileType,
	validateFileExtension
} from './validation.ts';

export const fileRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

fileRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{filename}',
		operationId: 'Get Public File',
		summary: 'Get a publicly accessible file from Cloudflare R2',
		description: "Get a file with 'public' access level from Cloudflare R2 using the filename.",
		tags: ['File'],
		request: {
			params: FileNameParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: {
					'image/*': {
						schema: { type: 'string', format: 'binary' }
					}
				}
			},
			[StatusCodes.BAD_REQUEST]: {
				description: 'Invalid or missing data',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Invalid file name or missing file',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		try {
			const { filename } = context.req.valid('param');

			if (!filename) {
				return context.json({ message: 'Invalid or no filename provided!' }, StatusCodes.BAD_REQUEST);
			}
			// Fetch file data to determine if it is public
			const fileInfo = await fetchFileInfo(context.env.Database, filename);

			if (fileInfo && fileInfo.accessLevel === 'public') {
				const r2Bucket = context.env.ExportedFiles;
				const file = await r2Bucket.get(filename);

				// If file is found, return it
				if (file) {
					const contentType = file.httpMetadata?.contentType ?? fileInfo.mimeType;

					return context.body(file.body, {
						headers: {
							'Content-Type': contentType,
							'Content-Disposition': `inline; filename="${filename}"`
						}
					});
				}
			}

			// If the file is not found
			return context.json(
				{ message: `File was not found.` },
				StatusCodes.NOT_FOUND
			);
		} catch (err) {
			console.error('File retrieval failed:', err);
			return context.json(
				{ message: 'Error fetching the file' },
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
);

fileRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/protected/{filename}',
		operationId: 'Get Protected File',
		summary: 'Get a Protected file from Cloudflare R2',
		description: "Get a file with access level 'protected' from Cloudflare R2 using the filename.",
		tags: ['File'],
		request: {
			params: FileNameParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: {
					'image/*': {
						schema: { type: 'string', format: 'binary' }
					}
				}
			},
			[StatusCodes.BAD_REQUEST]: {
				description: 'Invalid or missing data',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Invalid file name or missing file',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, fileUploadSizeCheck] as const
	}),
	async (context) => {
		try {
			const sessionData = getSession(context);
			const profile = await getProfileById(context.env.Database, sessionData.id);

			if (!profile || profile.id !== sessionData.id) {
				return context.json({ message: 'Profile not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
			}

			const { filename } = context.req.valid('param');

			if (!filename) {
				return context.json({ message: 'Invalid or no filename provided!' }, StatusCodes.BAD_REQUEST);
			}

			// Fetch file data to determine if it exists
			const fileInfo = await fetchFileInfo(context.env.Database, filename, 'protected', true);

			if (fileInfo) {
				// TODO: Add a check to verify if the user is allowed to access the file.

				const r2Bucket = context.env.ExportedFiles;
				const file = await r2Bucket.get(filename);

				// If file is found, return it
				if (file) {
					const contentType = file.httpMetadata?.contentType ?? fileInfo.mimeType;

					return context.body(file.body, {
						headers: {
							'Content-Type': contentType,
							'Content-Disposition': `inline; filename="${filename}"`
						}
					});
				}
			}

			// If the file is not found
			return context.json(
				{ message: `File was not found.` },
				StatusCodes.NOT_FOUND
			);
		} catch (err) {
			console.error('File retrieval failed:', err);
			return context.json(
				{ message: 'Error fetching the file' },
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
);

fileRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/upload',
		operationId: 'Upload File',
		summary: 'Upload a file to Cloudflare R2',
		description: 'Upload a file received via multipart/form-data to Cloudflare R2.',
		tags: ['File'],
		request: {
			body: { content: { 'multipart/form-data': { schema: FileUploadSchema } }, required: true }
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.BAD_REQUEST]: {
				description: 'Invalid file or missing data',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Internal error getting profile that should exist',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, fileUploadSizeCheck] as const
	}),
	async (context) => {
		const sessionData = getSession(context);
		const profile = await getProfileById(context.env.Database, sessionData.id);

		if (!profile || profile.id !== sessionData.id) {
			return context.json({ message: 'Profile not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const formData = await context.req.formData();
		const file = formData.get('file') as File;
		const fileType = formData.get('type') as UploadedFileType;

		// Check if file was uploaded by the user
		if (!file || !(file instanceof File)) {
			return context.json({ message: 'No or invalid file uploaded. Please provide a file!' } satisfies StatusResponse, StatusCodes.BAD_REQUEST);
		}

		const fileMimeType = file.type as AllowedFileMimeType;

		// Validate file extension
		if (!validateFileExtension(file.name, fileMimeType)) {
			return context.json({ message: 'Invalid image file extension. Only JPEG and PNG are allowed!' } satisfies StatusResponse, StatusCodes.BAD_REQUEST);
		}

		const extension = file.name?.split('.').pop() ?? 'bin';
		const fileName = `${crypto.randomUUID()}.${extension}`;
		const stream = file.stream();

		const fileAccessLevel = isPublicFileType(fileType) ? 'public' : 'protected';

		try {
			const r2Bucket = context.env.ExportedFiles;
			const r2UploadResult = await r2Bucket.put(fileName, stream);

			// TODO: Determine if we need to create thumbnails

			if (r2UploadResult?.key === fileName) {
				const isSuccessful = await uploadFile(context.env.Database, profile.id, fileName, fileType, fileMimeType, fileAccessLevel);

				if (isSuccessful) {
					return context.json({ message: 'File uploaded successfully' } satisfies StatusResponse, StatusCodes.OKAY);
				}
				// Clean up orphaned file
				await r2Bucket.delete(fileName);
			}

			return context.json({ message: 'Upload failed.' }, StatusCodes.INTERNAL_SERVER_ERROR);
		} catch (err) {
			console.error('Upload failed:', err);
			return context.json(
				{ message: 'Upload failed' },
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
);
