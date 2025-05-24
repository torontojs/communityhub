import type { Context, Next } from 'hono';
import { revalidateSession } from '../utils/auth.ts';
import { StatusCodes } from '../utils/responses.ts';

export const authMiddleware = async (context: Context<EnvironmentBindings>, next: Next) => {
	const session = await revalidateSession(context);
	if (!session) {
		return context.json({ message: 'Invalid session' }, StatusCodes.UNAUTHORIZED);
	}

	context.set('session', session);
	return next();
};
