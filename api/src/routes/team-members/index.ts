import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { authorizeOrganizer } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import { bodySizeCheck } from '../../middleware/body-size.ts';
import {
	generatePaginatedResponseSchema,
	type PaginatedResponse,
	StatusCodes,
	type StatusResponse,
	statusResponseFormatter,
	StatusResponseSchema
} from '../../utils/responses.ts';
import { IdParamSchema, PaginationQuerySchema } from '../../utils/validation.ts';
import { nonExistingProfileIds } from '../profile/data.ts';
import { doesTeamExist } from '../team/data.ts';
import { addTeamMembers, countAllMembers, deleteTeamMembers, getAllMembers, nonExistingTeamMemberIds, updateTeamMembers } from './data.ts';
import { AddTeamMembersSchema, PublicTeamMemberInfoSchema, UpdateTeamMembersSchema } from './validation.ts';

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
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(PublicTeamMemberInfoSchema)) } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'Invalid pagination response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const count = await countAllMembers(context.env.Database, id);
		const totalMembersCount = (count[0]?.['count']) as number;
		const pagination = PaginationQuerySchema.safeParse(context.req.query());

		if (!pagination.success) {
			return context.json(
				{
					message: 'Invalid pagination parameters',
					errors: pagination.error.issues.map(({ path, message }) => ({ [path.join('.')]: message }))
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		const { limit: limitCount, page: currentPageCount } = pagination.data;
		const lastPageCount = !limitCount ? 1 : Math.max(1, Math.ceil(totalMembersCount / limitCount));
		const offset = !limitCount ? 0 : ((currentPageCount - 1) * limitCount);

		const members = await getAllMembers(context.env.Database, id, limitCount, offset);
		const publicMembers = members.map(({ email: _email, ...rest }) => rest);
		const firstPage = new URL(context.req.url);
		firstPage.searchParams.set('limit', limitCount?.toString() ?? '');
		firstPage.searchParams.set('page', '1');
		const currentPage = new URL(context.req.url);
		currentPage.searchParams.set('limit', limitCount?.toString() ?? '');
		currentPage.searchParams.set('page', currentPageCount.toString());
		const lastPage = new URL(context.req.url);
		lastPage.searchParams.set('limit', limitCount?.toString() ?? '');
		lastPage.searchParams.set('page', lastPageCount.toString());

		return context.json(
			{
				data: publicMembers,
				start: offset,
				end: !limitCount || offset + limitCount > totalMembersCount ? Math.max(0, totalMembersCount - 1) : offset + limitCount - 1,
				total: totalMembersCount,
				size: members.length,
				currentPage: currentPageCount,
				lastPage: lastPageCount,
				_links: {
					self: { href: currentPage.toString() },
					first: { href: firstPage.toString() },
					last: { href: lastPage.toString() }
				}
			} satisfies PaginatedResponse<typeof publicMembers>,
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
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'Invalid Team IDs response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [bodySizeCheck, authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');

		const nonExistingIds = await nonExistingProfileIds(context.env.Database, body.map(({ profileId }) => profileId));

		if (nonExistingIds.length !== 0) {
			return context.json(
				{
					message: 'Not all team members exist',
					errors: nonExistingIds.map((profileId) => ({
						profileId,
						message: 'Profile ID does not exist'
					}))
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

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
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'Invalid Team IDs response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [bodySizeCheck, authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');

		const { error: errors } = z.array(z.uuid()).safeParse(body.map(({ id: teamMemberId }) => teamMemberId));

		if (errors) {
			return context.json(
				{
					message: 'Not all team member ids are valid',
					errors: errors.issues.map(({ path, message }) => ({
						path: path.join('.'),
						message
					}))
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		const nonExistingIds = await nonExistingTeamMemberIds(context.env.Database, id, body.map(({ id: teamMemberId }) => teamMemberId));

		if (nonExistingIds.length !== 0) {
			return context.json(
				{
					message: 'Not all team member ids exist',
					errors: nonExistingIds.map((memberId) => ({
						id: memberId,
						message: 'Team member does not exist'
					}))
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

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
			body: { content: { 'application/json': { schema: z.array(z.string().uuid()) } }, required: true }
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
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'Invalid Team IDs response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [bodySizeCheck, authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);
		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const body = context.req.valid('json');

		const { error: errors } = z.array(z.uuid()).safeParse(body);

		if (errors) {
			return context.json(
				{
					message: 'Not all team member ids are valid',
					errors: errors.issues.map(({ path, message }) => ({
						path: path.join('.'),
						message
					}))
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		const nonExistingIds = await nonExistingTeamMemberIds(context.env.Database, id, body);

		if (nonExistingIds.length !== 0) {
			return context.json(
				{
					message: 'Not all team member ids exist',
					errors: nonExistingIds.map((memberId) => ({
						id: memberId,
						message: 'Team member does not exist'
					}))
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		const isDeleted = await deleteTeamMembers(context.env.Database, id, body);

		if (!isDeleted) {
			return context.json({ message: 'Role not deleted' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Role deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);
