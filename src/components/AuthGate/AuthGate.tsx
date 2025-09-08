import { useHeartBeat } from '../../hooks/useHeartBeat.ts';
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
export const AuthGatePrivate = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useProfileRedirect();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};
