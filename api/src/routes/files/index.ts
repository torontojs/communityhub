import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { authMiddleware } from '../../middleware/auth.ts';
import { fileUploadSizeCheck } from '../../middleware/body-size.ts';
import { StatusCodes, type StatusResponse, statusResponseFormatter, StatusResponseSchema } from '../../utils/responses.ts';
import { FileNameParamSchema, FileUploadSchema } from './validation.ts';

export const fileRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

fileRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{filename}',
		operationId: 'Get File',
		summary: 'Get a file from Cloudflare R2',
		description: 'Get a file from Cloudflare R2 using the filename.',
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
		// TODO: Add separate routes for public and private files
		// middleware: [authMiddleware, fileUploadSizeCheck] as const
	}),
	async (context) => {
		// Fetch the file from the R2 bucket
		try {
			const { filename } = context.req.valid('param');

			if (!filename) {
				return context.json({ message: 'Invalid or no filename provided!' }, StatusCodes.BAD_REQUEST);
			}

			// TODO: Add a check to verify if the user is allowed to access the file.

			const r2Bucket = context.env.ExportedFiles;
			const file = await r2Bucket.get(filename);

			// If file is found, return it
			if (file) {
				const contentType = file.httpMetadata?.contentType ?? 'image/png';

				return context.body(file.body, {
					headers: {
						'Content-Type': contentType,
						'Content-Disposition': `inline; filename="${filename}"`
					}
				});
			}

			// If the file is not found
			return context.json(
				{ message: `File ${filename} was not found.` },
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
			}
		},
		middleware: [authMiddleware, fileUploadSizeCheck] as const
	}),
	async (context) => {
		const formData = await context.req.formData();
		const file = formData.get('file') as File;

		// Check if file was uploaded
		if (!file || !(file instanceof File)) {
			return context.json({ message: 'No or invalid file uploaded. Please provide a file!' }, StatusCodes.BAD_REQUEST);
		}

		// TODO: Add events to event log

		const fileName = crypto.randomUUID();
		const stream = file.stream();

		try {
			const r2Bucket = context.env.ExportedFiles;
			await r2Bucket.put(fileName, stream);

			// TODO: Add the file details to an uploads table

			return context.json({ message: 'File uploaded successfully' } satisfies StatusResponse, StatusCodes.OKAY);
		} catch (err) {
			console.error('Upload failed:', err);
			return context.json(
				{ message: 'Upload failed' },
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
);
