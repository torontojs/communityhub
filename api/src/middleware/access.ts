import type { Context, Next } from 'hono';
import { Access, type AccessLevel, getSession } from '../utils/auth.ts';
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

export const authorizeAdmin = createAccessMiddleware(Access.ADMIN);
export const authorizeOrganizer = createAccessMiddleware(Access.ORGANIZER);
export const authorizeVolunteer = createAccessMiddleware(Access.VOLUNTEER);
