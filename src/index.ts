import { env } from 'cloudflare:workers';

import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { ZodError } from 'zod';
import packageJson from '../package.json' with { type: 'json' };
import { authRoutes } from './routes/auth/index.ts';
import { healthCheckRoutes } from './routes/health-check/index.ts';
import { profileRoutes } from './routes/profile/index.ts';
import { teamMemberRoutes } from './routes/team-members/index.ts';
import { teamRoutes } from './routes/team/index.ts';
import { StatusCodes, statusResponseFormatter } from './utils/responses.ts';

const app = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

// Catch all error handler.
app.onError((err, context) => {
	// TODO: add better error logging?

	if (err instanceof ZodError) {
		console.error(err.toString());
	} else {
		console.error(err);
	}

	return context.json({ message: 'An error has occured' }, StatusCodes.INTERNAL_SERVER_ERROR);
});

// CORS middleware22
app.use(
	'/*',
	cors({
		origin: [env.BASE_URL, env.FRONTEND_URL],
		credentials: true,
		allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
		allowHeaders: ['Content-Type']
	})
);

app.doc('/open-api.json', {
	openapi: '3.0.0',
	servers: [
		{
			url: 'https://vms.torontojs.com/',
			description: 'Production server.'
		},
		{
			url: 'http://localhost:4242/',
			description: 'Local server for development.'
		}
	],
	info: {
		title: 'Toronto JS Community Hub API',
		version: packageJson.version,
		description: `
		This is the API documentation for the [Toronto JS Community Hub](https://vms.torontojs.com/).

		Please note that the recomended way of getting data from the community hub is to use the staticly generated data available on GitHub.
		`
	}
});

app.get('/docs', swaggerUI({ url: '/open-api.json' }));

// Handle static assets using Cloudflare Workers
app.get('/assets/*', async (context) => context.env.Assets.fetch(context.req.raw));

app.route('/', healthCheckRoutes);
app.route('/auth', authRoutes);
app.route('/profiles', profileRoutes);
app.route('/teams', teamRoutes);
// All routes follow the format /teams/{id}/members
app.route('/teams', teamMemberRoutes);

export default app;
