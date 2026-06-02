import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { authorizeAdmin, authorizeOrganizer } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import { bodySizeCheck } from '../../middleware/body-size.ts';
import { getSession } from '../../utils/auth.ts';
import {
	type DataResponse,
	generateDataResponseSchema,
	generatePaginatedResponseSchema,
	type PaginatedResponse,
	StatusCodes,
	type StatusResponse,
	statusResponseFormatter,
	StatusResponseSchema
} from '../../utils/responses.ts';
import { IdParamSchema } from '../../utils/validation.ts';
import { countAllTeams, deleteTeamById, doesSameTeamNameExist, doesTeamExist, getAllTeams, getTeamById, insertTeam, updateTeamById } from './data.ts';
import { CreateTeamSchema, TeamSchema, UpdateTeamSchema } from './validation.ts';

export const teamRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

const TeamPaginationQuerySchema = z.object({
	limit: z.coerce.number().int().positive().optional(),
	page: z.coerce.number().int().positive().optional().default(1)
});

teamRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{id}',
		operationId: 'Get team',
		summary: 'Get team by ID',
		description: "Retrieves a single team based on it's id.",
		tags: ['Team'],
		request: {
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generateDataResponseSchema(TeamSchema) } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
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

		const team = await getTeamById(context.env.Database, id);

		if (!team) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		return context.json({ data: team, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof team>, StatusCodes.OKAY);
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'List teams',
		summary: 'Get a list of teams',
		description: 'Retrieves a list of teams.',
		tags: ['Team'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(TeamSchema)) } }
			},
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'Invalid pagination response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const totalTeamsCount = await countAllTeams(context.env.Database);
		const pagination = TeamPaginationQuerySchema.safeParse(context.req.query());

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
		const lastPageCount = !limitCount ? 1 : Math.max(1, Math.ceil(totalTeamsCount / limitCount));
		const offset = !limitCount ? 0 : ((currentPageCount - 1) * limitCount);
		const teams = await getAllTeams(context.env.Database, limitCount, offset);

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
				data: teams,
				start: offset,
				end: !limitCount || offset + limitCount > totalTeamsCount ? totalTeamsCount - 1 : offset + limitCount - 1,
				total: totalTeamsCount,
				size: teams.length,
				currentPage: currentPageCount,
				lastPage: lastPageCount,
				_links: {
					self: { href: currentPage.toString() },
					first: { href: firstPage.toString() },
					last: { href: lastPage.toString() }
				}
			} satisfies PaginatedResponse<typeof teams>,
			StatusCodes.OKAY
		);
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'delete',
		path: '/{id}',
		operationId: 'Delete team',
		summary: 'Delete team by ID',
		description: "Deletes a single team based on it's id.",
		tags: ['Team'],
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
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [bodySizeCheck, authMiddleware, authorizeAdmin] as const
	}),
	async (context) => {
		const { id } = context.req.valid('param');
		const { id: profileId } = getSession(context);

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);

		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const isDeleted = await deleteTeamById(context.env.Database, profileId, id);

		if (!isDeleted) {
			return context.json({ message: 'Team not deleted' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Team deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/',
		operationId: 'Create team',
		summary: 'Create new team',
		description: 'Add a new team to the VMS including basic information about this team.',
		tags: ['Team'],
		request: {
			body: { content: { 'application/json': { schema: CreateTeamSchema } }, required: true }
		},
		responses: {
			[StatusCodes.CREATED]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.CONFLICT]: {
				description: 'Team with same name response',
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
		const { id: profileId } = getSession(context);
		const body = context.req.valid('json');

		const hasExistingTeamName = await doesSameTeamNameExist(context.env.Database, body.name);

		if (hasExistingTeamName) {
			return context.json({ message: 'Team already exists' } satisfies StatusResponse, StatusCodes.CONFLICT);
		}

		const { success } = await insertTeam(context.env.Database, profileId, body);

		if (!success) {
			return context.json({ message: 'Team not saved' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Team created successfully' } satisfies StatusResponse, StatusCodes.CREATED);
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'patch',
		path: '/{id}',
		operationId: 'Update team',
		summary: 'Update existing team',
		description: "Update information for an existing team based on it's id.",
		tags: ['Team'],
		request: {
			body: { content: { 'application/json': { schema: UpdateTeamSchema } }, required: true },
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
			[StatusCodes.CONFLICT]: {
				description: 'Team with same name response',
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
		const body = context.req.valid('json');

		const isTeamIdValid = await doesTeamExist(context.env.Database, id);

		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		if (body.name) {
			const hasExistingTeamName = await doesSameTeamNameExist(context.env.Database, body.name);

			if (hasExistingTeamName) {
				return context.json({ message: 'Team already exists' } satisfies StatusResponse, StatusCodes.CONFLICT);
			}
		}

		const isUpdated = await updateTeamById(context.env.Database, id, body);

		if (!isUpdated) {
			return context.json({ message: 'Team not updated' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Team updated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);
