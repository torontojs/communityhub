import type { Context, Next } from 'hono';
import { ACCESS_LEVEL, type AccessLevel, getSession } from '../utils/auth.ts';
import { StatusCodes } from '../utils/responses.ts';

const accessHierachy = {
	admin: ['admin'],
	organizer: ['admin', 'organizer'],
	volunteer: ['admin', 'organizer', 'volunteer']
};

function createAccessMiddleware(minimumAcess: AccessLevel) {
	return async (context: Context<EnvironmentBindings>, next: Next) => {
		const session = getSession(context);

		if (!session) {
			return context.json({ message: 'Session not found' }, StatusCodes.UNAUTHORIZED);
		}

		if (!accessHierachy[minimumAcess].includes(session.access)) {
			return context.json({ message: 'Forbidden' }, StatusCodes.FORBIDDEN);
		}
		return next();
	};
}

export const authorizeAdmin = createAccessMiddleware(ACCESS_LEVEL.ADMIN);
export const authorizeOrganizer = createAccessMiddleware(ACCESS_LEVEL.ORGANIZER);
export const authorizeVolunteer = createAccessMiddleware(ACCESS_LEVEL.VOLUNTEER);
