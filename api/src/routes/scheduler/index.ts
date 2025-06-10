import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { authorizeAdmin } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import { exportData } from '../../scheduler/data-export.ts';
import { StatusCodes, type StatusResponse, statusResponseFormatter, StatusResponseSchema } from '../../utils/responses.ts';

export function initSchedulerRoutes(app: OpenAPIHono<EnvironmentBindings>) {
	const schedulerRoutes = new OpenAPIHono<EnvironmentBindings>({
		defaultHook: statusResponseFormatter
	});

	schedulerRoutes.openapi(
		createRoute({
			method: 'get',
			path: '/export-data',
			operationId: 'Export Data',
			summary: 'Export all of the existing data.',
			description: 'Export all of the existing data and upload it to a cloud storage.',
			tags: ['Internal'],
			responses: {
				[StatusCodes.OKAY]: {
					description: 'Successful response',
					content: { 'application/json': { schema: StatusResponseSchema } }
				},
				[StatusCodes.INTERNAL_SERVER_ERROR]: {
					description: 'Error response',
					content: { 'application/json': { schema: StatusResponseSchema } }
				}
			},
			middleware: [authMiddleware, authorizeAdmin] as const
		}),
		async (context) => {
			if (context.env.NODE_ENV !== 'development') {
				return context.json({ message: 'OK' } satisfies StatusResponse, StatusCodes.OKAY);
			}

			try {
				await exportData(app, context.env, context.executionCtx as ExecutionContext);

				return context.json({ message: 'OK' } satisfies StatusResponse, StatusCodes.OKAY);
			} catch (err) {
				return context.json({ message: 'An error has occured', errors: [err.toString()] } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
			}
		}
	);

	return schedulerRoutes;
}
