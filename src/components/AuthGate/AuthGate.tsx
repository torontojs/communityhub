import { useHeartBeat, useHeartBeatPrivateAll } from '../../hooks/useHeartBeat.ts';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

// Utilize on application pages which are public
export const AuthGatePublic = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeat();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

// To be utilized only on home page and profile completion onboarding steps
export const AuthGatePrivateRedirect = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useProfileRedirect();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

// Pages only accessible to authenticated volunteers
export const AuthGatePrivateAll = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatPrivateAll();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

// // Pages only accessible to organizers
// export const AuthGateOrganizerPrivate = ({ children, access }: { children: React.ReactNode, access: string }) => {
// 	const isAuth = useHeartBeatPrivate(access);

// 	if (!isAuth) {
// 		return <h1>Is Loading...</h1>;
// 	}
// 	return children;
// };

// // Pages only accessible to admin
// export const AuthGateAdminPrivate = ({ children, access }: { children: React.ReactNode, access: string }) => {
// 	const isAuth = useHeartBeatPrivate(access);

// 	if (!isAuth) {
// 		return <h1>Is Loading</h1>;
// 	}
// 	return children;
// };
