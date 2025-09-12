import { useHeartBeat, useHeartBeatProtected, useHeartBeatProtectedAdmin, useHeartBeatProtectedOrganizer } from '../../hooks/useHeartBeat.ts';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

export const AuthGateCheck = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeat();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

export const AuthGateHomePageProtected = ({ children }: { children: React.ReactNode }) => {
	const redirectionComplete = useProfileRedirect();

	if (redirectionComplete === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

export const AuthGateProtected = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatProtected();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

export const AuthGateProtectedOrganizer = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatProtectedOrganizer();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

export const AuthGateProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatProtectedAdmin();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};
