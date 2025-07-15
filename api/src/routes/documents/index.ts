import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { authMiddleware } from '../../middleware/auth.ts';
import { getSession } from '../../utils/auth.ts';
import { type DataResponse, generateDataResponeSchema, StatusCodes, type StatusResponse, statusResponseFormatter, StatusResponseSchema } from '../../utils/responses.ts';
import { getProfileById } from '../profile/data.ts';
import { getSignedDocuments, signDocument } from './data.ts';
import { ProfileDocumentTypeSchema, SignedProfileDocumentSchema } from './validation.ts';

export const documentRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

documentRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/sign/{type}',
		operationId: 'Sign document',
		summary: 'Sign the specified document for the logged in profile',
		description: 'Marks the specified document as signed.',
		tags: ['Document'],
		request: {
			params: z.object({
				type: ProfileDocumentTypeSchema
			})
		},
		responses: {
			[StatusCodes.NOT_FOUND]: {
				description: 'Internal error getting profile that should exist',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'No cookies found, invalid or missing token, invalid session or session expired. ',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware] as const
	}),
	async (context) => {
		const sessionData = getSession(context);
		const profile = await getProfileById(context.env.Database, sessionData.id);

		if (!profile || profile.id !== sessionData.id) {
			return context.json({ message: 'Profile not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const { type } = context.req.valid('param');
		const isSuccessful = await signDocument(context.env.Database, profile.id, type);

		if (!isSuccessful) {
			return context.json({ message: 'Error signing the document' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Document signed' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

documentRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/signed',
		operationId: 'Signed documents',
		summary: 'Get signed documents for the logged in profile',
		description: 'Lists all signed document for the currently logged in profile.',
		tags: ['Document'],
		responses: {
			[StatusCodes.NOT_FOUND]: {
				description: 'Internal error getting profile that should exist',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'No cookies found, invalid or missing token, invalid session or session expired. ',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generateDataResponeSchema(z.array(SignedProfileDocumentSchema)) } }
			}
		},
		middleware: [authMiddleware] as const
	}),
	async (context) => {
		const sessionData = getSession(context);
		const profile = await getProfileById(context.env.Database, sessionData.id);

		if (!profile || profile.id !== sessionData.id) {
			return context.json({ message: 'Profile not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const documents = await getSignedDocuments(context.env.Database, profile.id);

		return context.json({ data: documents, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof documents>, StatusCodes.OKAY);
	}
);
