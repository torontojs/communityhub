// FIXME: readd checks for existing ids, based on the doesTeamExist function

import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { authorizeAdmin, authorizeVolunteer } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import { Access, getSession } from '../../utils/auth.ts';
import {
	type DataResponse,
	generateDataResponeSchema,
	generatePaginatedResponseSchema,
	type PaginatedResponse,
	StatusCodes,
	type StatusResponse,
	statusResponseFormatter,
	StatusResponseSchema
} from '../../utils/responses.ts';
import { IdParamSchema } from '../../utils/validation.ts';
import { deleteProfileById, doesProfileExist, getAllProfiles, getProfileById, updateProfileById } from './data.ts';
import { ProfileSchema, UpdateProfileSchema } from './validation.ts';

export const profileRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

profileRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'List profiles',
		summary: 'List profiles',
		description: 'Retrieves a list of profiles',
		tags: ['Profile'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(ProfileSchema)) } }
			}
		}
	}),
	async (context) => {
		const profiles = await getAllProfiles(context.env.Database);

		return context.json(
			{
				data: profiles,
				start: 0,
				end: profiles.length - 1,
				total: profiles.length,
				size: profiles.length,
				currentPage: 1,
				lastPage: 1,
				_links: {
					self: { href: context.req.url },
					first: { href: context.req.url },
					last: { href: context.req.url }
				}
			} satisfies PaginatedResponse<typeof profiles>,
			StatusCodes.OKAY
		);
	}
);

profileRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/self',
		operationId: 'Get profile data',
		summary: 'Get profile data of logged-in user',
		description: 'Retrieves the profile data of the currently logged-in user',
		tags: ['Profile'],
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
				content: { 'application/json': { schema: generateDataResponeSchema(ProfileSchema) } }
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

		return context.json({ data: profile, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof profile>, StatusCodes.OKAY);
	}
);

profileRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{id}',
		operationId: 'Get profile',
		summary: 'Get profile by ID',
		description: "Retrieves a single profile based on it's id.",
		tags: ['Profile'],
		request: {
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generateDataResponeSchema(ProfileSchema) } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const profile = await getProfileById(context.env.Database, id);

		if (!profile) {
			return context.json({ message: 'Profile not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		return context.json({ data: profile, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof profile>, StatusCodes.OKAY);
	}
);

profileRoutes.openapi(
	createRoute({
		method: 'patch',
		path: '/{id}',
		operationId: 'Update Profile',
		summary: 'Update existing profile',
		description: "Update information for an existing profile based on it's id.",
		tags: ['Profile'],
		request: {
			body: { content: { 'application/json': { schema: UpdateProfileSchema } }, required: true },
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Users can only edit their own profiles.',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeVolunteer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');
		const session = getSession(context);

		// For volunteers, only allow if it's their own profile
		if (session.id !== id && session.access !== Access.ADMIN) {
			return context.json({ message: 'Can only modify own profile' }, StatusCodes.FORBIDDEN);
		}

		const isProfileIdValid = await doesProfileExist(context.env.Database, id);
		if (!isProfileIdValid) {
			return context.json({ message: 'Profile does not exist' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');
		const isUpdated = await updateProfileById(context.env.Database, id, body);

		if (!isUpdated) {
			return context.json({ message: 'Profile not updated' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Profile updated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

profileRoutes.openapi(
	createRoute({
		method: 'delete',
		path: '/{id}',
		operationId: 'Delete Profile',
		summary: 'Delete profile by ID',
		description: "Deletes a single profile based on it's id",
		tags: ['Profile'],
		request: {
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeAdmin] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isProfileIdValid = await doesProfileExist(context.env.Database, id);
		if (!isProfileIdValid) {
			return context.json({ message: 'Profile does not exist' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const isDeleted = await deleteProfileById(context.env.Database, id);

		if (!isDeleted) {
			return context.json({ message: 'Profile not deleted' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Profile deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);
