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
import { deleteEventById, doesEventExist, doesSameEventNameExist, getAllEvents, getEventById, insertEvent, updateEventById } from './data.ts';
import { CreateEventSchema, EventSchema, UpdateEventSchema } from './validation.ts';

export const eventRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

eventRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{id}',
		operationId: 'Get event',
		summary: 'Get event by ID',
		description: "Retrieves a single event based on it's id.",
		tags: ['Event'],
		request: {
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generateDataResponseSchema(EventSchema) } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const { id } = context.req.valid('param');
		const event = await getEventById(context.env.Database, id);

		if (!event) {
			return context.json({ message: 'Event not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		return context.json({ data: event, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof event>, StatusCodes.OKAY);
	}
);

eventRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'List events',
		summary: 'Get a list of events',
		description: 'Retrieves a list of events.',
		tags: ['Event'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(EventSchema)) } }
			}
		}
	}),
	async (context) => {
		const events = await getAllEvents(context.env.Database);

		return context.json(
			{
				data: events,
				start: 0,
				end: events.length - 1,
				total: events.length,
				size: events.length,
				currentPage: 1,
				lastPage: 1,
				_links: {
					self: { href: context.req.url },
					first: { href: context.req.url },
					last: { href: context.req.url }
				}
			} satisfies PaginatedResponse<typeof events>,
			StatusCodes.OKAY
		);
	}
);

eventRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/',
		operationId: 'Create event',
		summary: 'Create new event',
		description: 'Add a new event to the VMS including basic information about this event.',
		tags: ['Event'],
		request: {
			body: { content: { 'application/json': { schema: CreateEventSchema } }, required: true }
		},
		responses: {
			[StatusCodes.CREATED]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.CONFLICT]: {
				description: 'Event with same name response',
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
		const hasExistingEventName = await doesSameEventNameExist(context.env.Database, body.name);

		if (hasExistingEventName) {
			return context.json({ message: 'Event already exists' } satisfies StatusResponse, StatusCodes.CONFLICT);
		}

		if (body.teamId) {
			const isTeamIdValid = await doesTeamExist(context.env.Database, body.teamId);

			if (!isTeamIdValid) {
				return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
			}
		}

		const { success } = await insertEvent(context.env.Database, profileId, body);

		if (!success) {
			return context.json({ message: 'Event not saved' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Event created successfully' } satisfies StatusResponse, StatusCodes.CREATED);
	}
);

eventRoutes.openapi(
	createRoute({
		method: 'patch',
		path: '/{id}',
		operationId: 'Update event',
		summary: 'Update existing event',
		description: "Update information for an existing event based on it's id.",
		tags: ['Event'],
		request: {
			body: { content: { 'application/json': { schema: UpdateEventSchema } }, required: true },
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
				description: 'Event with same name response',
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
		const isEventIdValid = await doesEventExist(context.env.Database, id);

		if (!isEventIdValid) {
			return context.json({ message: 'Event not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		if (body.name) {
			const hasExistingEventName = await doesSameEventNameExist(context.env.Database, body.name);

			if (hasExistingEventName) {
				return context.json({ message: 'Event already exists' } satisfies StatusResponse, StatusCodes.CONFLICT);
			}
		}

		if (body.teamId) {
			const isTeamIdValid = await doesTeamExist(context.env.Database, body.teamId);

			if (!isTeamIdValid) {
				return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
			}
		}

		const isUpdated = await updateEventById(context.env.Database, id, body);

		if (!isUpdated) {
			return context.json({ message: 'Event not updated' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Event updated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

eventRoutes.openapi(
	createRoute({
		method: 'delete',
		path: '/{id}',
		operationId: 'Delete event',
		summary: 'Delete event by ID',
		description: "Deletes a single event based on it's id.",
		tags: ['Event'],
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
		const isEventIdValid = await doesEventExist(context.env.Database, id);

		if (!isEventIdValid) {
			return context.json({ message: 'Event not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		const isDeleted = await deleteEventById(context.env.Database, profileId, id);

		if (!isDeleted) {
			return context.json({ message: 'Event not deleted' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		return context.json({ message: 'Event deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);
