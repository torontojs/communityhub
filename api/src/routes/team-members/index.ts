import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { authorizeOrganizer } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import {
	generatePaginatedResponseSchema,
	type PaginatedResponse,
	StatusCodes,
	type StatusResponse,
	statusResponseFormatter,
	StatusResponseSchema
} from '../../utils/responses.ts';
import { IdParamSchema } from '../../utils/validation.ts';
import { ProfileSchema } from '../profile/validation.ts';
import { doesTeamExist } from '../team/data.ts';
import { addTeamMembers, deleteTeamMembers, getAllMembers, updateTeamMembers } from './data.ts';
import { AddTeamMembersSchema, UpdateTeamMembersSchema } from './validation.ts';

export const teamMemberRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

teamMemberRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{id}/members',
		operationId: 'List team members',
		summary: 'List members of a team',
		description: 'Retrieves a list of all the members of a team, based on the team id.',
		request: {
			params: IdParamSchema
		},
		tags: ['Team Members'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(ProfileSchema.pick({ id: true, name: true, avatar: true }))) } }
			}
		}
	}),
	async (context) => {
		const { id } = context.req.valid('param');
		const members = await getAllMembers(context.env.Database, id);

		return context.json(
			// TODO: implement proper pagination
			{
				data: members,
				start: 0,
				end: members.length - 1,
				total: members.length,
				size: members.length,
				currentPage: 1,
				lastPage: 1,
				_links: {
					self: { href: context.req.url },
					first: { href: context.req.url },
					last: { href: context.req.url }
				}
			} satisfies PaginatedResponse<typeof members>,
			StatusCodes.OKAY
		);
	}
);

teamMemberRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/{id}/members',
		operationId: 'Add team members',
		summary: 'Add new members to a team',
		description: 'Add a new members to a team, assigning their roles within that team.',
		tags: ['Team Members'],
		request: {
			params: IdParamSchema,
			body: { content: { 'application/json': { schema: AddTeamMembersSchema } }, required: true }
		},
		responses: {
			[StatusCodes.CREATED]: {
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
		middleware: [authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');
		const success = await addTeamMembers(context.env.Database, id, body);

		if (!success) {
			return context.json({ message: 'Team members not saved' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Team members added to the team successfully' } satisfies StatusResponse, StatusCodes.CREATED);
	}
);

teamMemberRoutes.openapi(
	createRoute({
		method: 'patch',
		path: '/{id}/members',
		operationId: 'Update team members',
		summary: 'Update existing team members',
		description: 'Update information for existing team members based on the team id and the member ids.',
		tags: ['Team Members'],
		request: {
			body: { content: { 'application/json': { schema: UpdateTeamMembersSchema } }, required: true },
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
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');

		const isUpdated = await updateTeamMembers(context.env.Database, id, body);

		if (!isUpdated) {
			return context.json({ message: 'Team members not updated' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Team members updated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

teamMemberRoutes.openapi(
	createRoute({
		method: 'delete',
		path: '/{id}/members',
		operationId: 'Delete team members',
		summary: 'Delete existing team members',
		description: 'Deletes team members based on the team id.',
		tags: ['Team Members'],
		request: {
			params: IdParamSchema,
			body: { content: { 'application/json': { schema: z.array(z.string()) } }, required: true }
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
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');
		const isDeleted = await deleteTeamMembers(context.env.Database, id, body);

		if (!isDeleted) {
			return context.json({ message: 'Role not deleted' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Role deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);
