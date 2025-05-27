import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { sendAccountConfirmationEmail } from '../../email/index.ts';
import { authorizeVolunteer } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import { createSession, deleteSession, getSession, revalidateSession } from '../../utils/auth.ts';
import { hashPassword, validatePassword } from '../../utils/password-hashing.ts';
import { StatusCodes, type StatusResponse, statusResponseFormatter, StatusResponseSchema } from '../../utils/responses.ts';
import { insertProfile } from '../profile/data.ts';
import { activateProfile, checkActiveEmail, checkExistingEmail, getHeartbeatInfo, getLoginInfo } from './data.ts';
import { type HeartbeatResponse, HeartbeatResponseSchema } from './responses.ts';
import { ActivateSchema, SignInSchema, SignUpSchema } from './validation.ts';

export const authRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

authRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/sign-up',
		operationId: 'Create account',
		summary: 'Create a new Community Hub account',
		description: 'This is the entry point for the Community Hub. It allows users to register new accounts.',
		tags: ['Authentication'],
		request: {
			body: { content: { 'application/json': { schema: SignUpSchema } }, required: true }
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Created a new profile and sent an email for confirmation',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const { email, password, name } = context.req.valid('json');
		const response = { message: 'Created a new profile and sent an email for confirmation' };

		const emailExists = await checkExistingEmail(context.env.Database, email);
		if (emailExists) {
			// INFO: Hide non existing emails to reduce attack surface from guessing registered emails.
			return context.json(response satisfies StatusResponse, StatusCodes.OKAY);
		}

		const hashedPasswordWithSalt = await hashPassword(password);
		await insertProfile(context.env.Database, { email, password: hashedPasswordWithSalt, name });

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const TEN_MINUTES_IN_SECONDS = 60 * 10;
		const token = crypto.randomUUID();
		await context.env.ActivationTokens.put(
			token,
			email,
			{ expirationTtl: TEN_MINUTES_IN_SECONDS }
		);

		await sendAccountConfirmationEmail(context, {
			apiKey: context.env.RESEND_API_KEY,
			senderEmail: context.env.SENDER_EMAIL,
			token,
			email
		});

		return context.json(response satisfies StatusResponse, StatusCodes.OKAY);
	}
);

authRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/activate',
		operationId: 'Activate account',
		summary: 'Activate a newly created account',
		description: 'Received activation email and clicked on activation link.',
		tags: ['Authentication'],
		request: {
			query: ActivateSchema
		},
		responses: {
			[StatusCodes.BAD_REQUEST]: {
				description: 'Invalid or missing token',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'Invalid or expired token',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Failed to activate account',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.OKAY]: {
				description: 'Account activated successfully',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const { token } = context.req.valid('query');
		if (!token) {
			return context.json({ message: 'Invalid or missing token' }, StatusCodes.BAD_REQUEST);
		}

		const email = await context.env.ActivationTokens.get(token);
		if (!email) {
			return context.json({ message: 'Invalid or expired token' }, StatusCodes.UNAUTHORIZED);
		}

		const userAlreadyActivated = await checkActiveEmail(context.env.Database, email);
		if (userAlreadyActivated) {
			// INFO: Hide non existing emails to reduce attack surface from guessing registered emails.
			return context.json({ message: 'Account activated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
		}

		const activated = await activateProfile(context.env.Database, email);
		if (!activated) {
			return context.json({ message: 'Failed to activate account' }, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		// Remove token after successful activation
		await context.env.ActivationTokens.delete(token);

		return context.json({ message: 'Account activated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
	}
);

authRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/sign-in',
		operationId: 'Sign-in',
		summary: 'Sign in to Community Hub account',
		description: 'Signs the user in to the Community Hub.',
		tags: ['Authentication'],
		request: {
			body: { content: { 'application/json': { schema: SignInSchema } }, required: true }
		},
		responses: {
			[StatusCodes.UNAUTHORIZED]: {
				description: 'Invalid email, profile Id, password or account not activated.',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.CREATED]: {
				description: 'Sign in succesful',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.BAD_REQUEST]: {
				description: 'Already signed in',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		const session = await revalidateSession(context);
		if (session) {
			return context.json({ message: 'Already signed in' } satisfies StatusResponse, StatusCodes.BAD_REQUEST);
		}

		const { email, password } = context.req.valid('json');

		const genericSignInResponse = { message: 'Either your email/password combination is invalid, or your account is not active' };

		const results = await getLoginInfo(context.env.Database, email);
		if (!results) {
			// INFO: Hide specific errors to reduce attack surface and avoid guessing.
			return context.json(genericSignInResponse satisfies StatusResponse, StatusCodes.UNAUTHORIZED);
		}

		const { password: storedPassword, access, id } = results;
		if (!storedPassword) {
			// INFO: Hide specific errors to reduce attack surface and avoid guessing.
			return context.json(genericSignInResponse satisfies StatusResponse, StatusCodes.UNAUTHORIZED);
		}

		const isValid = await validatePassword(password, storedPassword);
		if (!isValid) {
			// INFO: Hide specific errors to reduce attack surface and avoid guessing.
			return context.json(genericSignInResponse satisfies StatusResponse, StatusCodes.UNAUTHORIZED);
		}

		await createSession({ id, email, access, context });

		return context.json({ message: 'Sign in successful' } satisfies StatusResponse, StatusCodes.CREATED);
	}
);

authRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/heartbeat',
		operationId: 'Heartbeat',
		summary: 'Check for basic logged in user information',
		descrition:
			'Check if authenticated and get name, avatar and access. Every protected UI page will make a heartbeat check and if successful will receive name, avatar and access in order to generate custsom content',
		tags: ['Heartbeat'],
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
				description: 'Heartbeat succesful. User authenticted and name, avatar and access returned to Client.',
				content: { 'application/json': { schema: HeartbeatResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeVolunteer] as const
	}),
	async (context) => {
		const sessionData = getSession(context);

		const heartbeatInfo = await getHeartbeatInfo(context.env.Database, sessionData.id);
		if (!heartbeatInfo) {
			return context.json({ message: 'Internal error getting profile that should exist' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
		}

		return context.json(heartbeatInfo satisfies HeartbeatResponse, StatusCodes.OKAY);
	}
);

authRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/sign-out',
		operationId: 'Sign-out',
		summary: 'Signs the user out.',
		description: 'Signs the user out from this device, removing the current session.',
		tags: ['Authentication'],
		responses: {
			[StatusCodes.BAD_REQUEST]: {
				description: 'Invalid token is provided.',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.NO_CONTENT]: {
				description: 'The user is successfully logged out.'
			}
		},
		middleware: [authMiddleware] as const
	}),
	async (context) => {
		const session = getSession(context);

		await deleteSession({ context, sessionToken: session.token });

		return context.json(StatusCodes.NO_CONTENT);
	}
);
