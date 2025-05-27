import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { StatusCodes, type StatusResponse, statusResponseFormatter, StatusResponseSchema } from '../../utils/responses.ts';
import { checkEnvVars } from './validation.ts';

export const healthCheckRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

healthCheckRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'Health-check',
		summary: 'Get server status.',
		description: 'Checks if the server is missing any environment variables needed for it to run correctly.',
		tags: ['Server status'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	(context) => {
		const { warnings, errors } = checkEnvVars(context.env);

		if (context.env.NODE_ENV === 'production') {
			if (errors.length > 0) {
				return context.json({ message: '❌ Something is wrong with the server configuration' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
			}

			return context.json({ message: '✅ OK' } satisfies StatusResponse, StatusCodes.OKAY);
		}

		if (errors.length > 0) {
			return context.json(
				{
					message: '❌ Required variables missing',
					warnings,
					errors
				} satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		return context.json(
			{
				message: '✅ All required environment variables are set',
				warnings
			} satisfies StatusResponse,
			StatusCodes.OKAY
		);
	}
);
