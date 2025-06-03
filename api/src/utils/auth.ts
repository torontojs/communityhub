import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import type { CookieOptions } from 'hono/utils/cookie';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const SESSION_LIFESPAN_IN_SECONDS = 60 * 60 * 24; // INFO: One day
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const SESSION_MAXIMUM_LIFETIME_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7 * 2; // INFO: Two weeks
const MILLISECONDS_IN_SECOND = 1000;
const SESSION_COOKIE_NAME = 'auth_token';
const DELETED_COOKIE_VALUE = 'DELETED';
const DEFAULT_COOKIE_OPTIONS = {
	httpOnly: true,
	path: '/',
	secure: true,
	sameSite: 'Strict'
} satisfies CookieOptions;

export const Access = {
	ADMIN: 'admin',
	ORGANIZER: 'organizer',
	VOLUNTEER: 'volunteer'
} as const;

type ContextWithBindings = Context<EnvironmentBindings>;

export type AccessLevel = typeof Access[keyof typeof Access];

export interface SessionData {
	id: string;
	email: string;
	access: AccessLevel;
	token: string;
	originalExpiry: string;
}

function getSessionExpiryAsDate() {
	const now = new Date();

	now.setTime(now.getTime() + SESSION_LIFESPAN_IN_SECONDS * MILLISECONDS_IN_SECOND);

	return now;
}

interface DeleteSessionParams {
	context: ContextWithBindings;
	sessionToken: string;
}

export async function deleteSession({ context, sessionToken }: DeleteSessionParams) {
	// Delete session on server
	await context.env.SessionTokens.delete(sessionToken);

	// Delete session on client
	setCookie(
		context,
		SESSION_COOKIE_NAME,
		DELETED_COOKIE_VALUE,
		{
			...DEFAULT_COOKIE_OPTIONS,
			expires: new Date(0)
		}
	);
}

export function getSession(context: ContextWithBindings) {
	return context.get('session');
}

interface ExtendSessionParams {
	sessionToken: string;
	session: SessionData;
	context: ContextWithBindings;
}

async function extendExistingSession({
	sessionToken,
	session,
	context
}: ExtendSessionParams) {
	// Update session on server
	await context.env.SessionTokens.put(
		sessionToken,
		JSON.stringify(session),
		{
			expirationTtl: SESSION_LIFESPAN_IN_SECONDS
		}
	);

	// Update session on client
	setCookie(
		context,
		SESSION_COOKIE_NAME,
		sessionToken,
		{
			...DEFAULT_COOKIE_OPTIONS,
			expires: getSessionExpiryAsDate()
		}
	);
	return session;
}

export async function revalidateSession(context: ContextWithBindings) {
	const sessionToken = getCookie(context, SESSION_COOKIE_NAME);
	if (!sessionToken) {
		return undefined;
	}

	const session = await context.env.SessionTokens.get<SessionData>(sessionToken, 'json');

	// User has a session token but it's invalid so delete it
	if (!session) {
		await deleteSession({ context, sessionToken });
		return;
	}

	const now = new Date().getTime();
	const originalExpiryDate = new Date(session.originalExpiry).getTime();

	// The session has been refreshed for longer than the maximum time limit
	if (now - originalExpiryDate >= SESSION_MAXIMUM_LIFETIME_IN_MILLISECONDS) {
		await deleteSession({ context, sessionToken });
		return;
	}

	const extendedSession = await extendExistingSession({
		sessionToken,
		session,
		context
	});

	return extendedSession;
}

interface CreateSessionParams {
	id: string;
	email: string;
	access: AccessLevel;
	context: ContextWithBindings;
}

export async function createSession({
	email,
	id,
	access,
	context
}: CreateSessionParams) {
	const sessionToken = crypto.randomUUID();
	const sessionExpiryDate = getSessionExpiryAsDate();

	// Create session on server
	await context.env.SessionTokens.put(
		sessionToken,
		JSON.stringify(
			{
				id,
				email,
				access,
				token: sessionToken,
				originalExpiry: sessionExpiryDate.toISOString()
			} satisfies SessionData
		),
		{
			expirationTtl: SESSION_LIFESPAN_IN_SECONDS
		}
	);

	// Send session to client
	setCookie(
		context,
		SESSION_COOKIE_NAME,
		sessionToken,
		{
			...DEFAULT_COOKIE_OPTIONS,
			expires: sessionExpiryDate
		}
	);

	return sessionToken;
}
