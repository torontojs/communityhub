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
import { doesTeamExist } from '../team/data.ts';
import { deleteProjectById, doesProjectExist, doesSameProjectNameExist, getAllProjects, getProjectById, insertProject, updateProjectById } from './data.ts';
import { CreateProjectSchema, ProjectSchema, UpdateProjectSchema } from './validation.ts';

export const projectRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

projectRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{id}',
		operationId: 'Get project',
		summary: 'Get project by ID',
		description: "Retrieves a single project based on it's id.",
		tags: ['Project'],
		request: {
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generateDataResponseSchema(ProjectSchema) } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const { id } = context.req.valid('param');
		const project = await getProjectById(context.env.Database, id);

		if (!project) {
			return context.json({ message: 'Project not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		return context.json({ data: project, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof project>, StatusCodes.OKAY);
	}
);

projectRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'List projects',
		summary: 'Get a list of projects',
		description: 'Retrieves a list of projects.',
		tags: ['Project'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(ProjectSchema)) } }
			}
		}
	}),
	async (context) => {
		const projects = await getAllProjects(context.env.Database);

		return context.json(
			{
				data: projects,
				start: 0,
				end: projects.length - 1,
				total: projects.length,
				size: projects.length,
				currentPage: 1,
				lastPage: 1,
				_links: {
					self: { href: context.req.url },
					first: { href: context.req.url },
					last: { href: context.req.url }
				}
			} satisfies PaginatedResponse<typeof projects>,
			StatusCodes.OKAY
		);
	}
);

projectRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/',
		operationId: 'Create project',
		summary: 'Create new project',
		description: 'Add a new project to the VMS including basic information about this project.',
		tags: ['Project'],
		request: {
			body: { content: { 'application/json': { schema: CreateProjectSchema } }, required: true }
		},
		responses: {
			[StatusCodes.CREATED]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.CONFLICT]: {
				description: 'Project with same name response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Team not found response',
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
		const hasExistingProjectName = await doesSameProjectNameExist(context.env.Database, body.name);

		if (hasExistingProjectName) {
			return context.json({ message: 'Project already exists' } satisfies StatusResponse, StatusCodes.CONFLICT);
		}

		const isTeamIdValid = await doesTeamExist(context.env.Database, body.teamId);

		if (!isTeamIdValid) {
			return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const { success } = await insertProject(context.env.Database, profileId, body);

		if (!success) {
			return context.json({ message: 'Project not saved' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Project created successfully' } satisfies StatusResponse, StatusCodes.CREATED);
	}
);

projectRoutes.openapi(
	createRoute({
		method: 'patch',
		path: '/{id}',
		operationId: 'Update project',
		summary: 'Update existing project',
		description: "Update information for an existing project based on it's id.",
		tags: ['Project'],
		request: {
			body: { content: { 'application/json': { schema: UpdateProjectSchema } }, required: true },
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
				description: 'Project with same name response',
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
		const isProjectIdValid = await doesProjectExist(context.env.Database, id);

		if (!isProjectIdValid) {
			return context.json({ message: 'Project not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		if (body.name) {
			const hasExistingProjectName = await doesSameProjectNameExist(context.env.Database, body.name);

			if (hasExistingProjectName) {
				return context.json({ message: 'Project already exists' } satisfies StatusResponse, StatusCodes.CONFLICT);
			}
		}

		if (body.teamId) {
			const isTeamIdValid = await doesTeamExist(context.env.Database, body.teamId);

			if (!isTeamIdValid) {
				return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
			}
		}

		const isUpdated = await updateProjectById(context.env.Database, id, body);

		if (!isUpdated) {
			return context.json({ message: 'Project not updated' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Project updated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

projectRoutes.openapi(
	createRoute({
		method: 'delete',
		path: '/{id}',
		operationId: 'Delete project',
		summary: 'Delete project by ID',
		description: "Deletes a single project based on it's id.",
		tags: ['Project'],
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
		const { id: profileId } = getSession(context);
		const { id } = context.req.valid('param');
		const isProjectIdValid = await doesProjectExist(context.env.Database, id);

		if (!isProjectIdValid) {
			return context.json({ message: 'Project not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const isDeleted = await deleteProjectById(context.env.Database, profileId, id);

		if (!isDeleted) {
			return context.json({ message: 'Project not deleted' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Project deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);
