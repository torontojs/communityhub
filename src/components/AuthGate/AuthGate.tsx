// import { useHeartBeat, useHeartBeatProtected, useHeartBeatProtectedAdmin, useHeartBeatProtectedHomePage, useHeartBeatProtectedOrganizer } from '../../hooks/useHeartBeat.ts';
import { useHeartBeat, useHeartBeatProtected, useHeartBeatProtectedAdmin, useHeartBeatProtectedOrganizer } from '../../hooks/useHeartBeat.ts';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';
// Utilize on public pages to check and redirect authenticated users to home page
export const AuthGateCheck = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeat();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

// THIS VERSION WORKS WITHOUT FLICKERING
// To be utilized only on home page and profile completion steps handles authenticated non completed profile status
// export const AuthGateHomePageProtected = ({ children }: { children: React.ReactNode }) => {
// 	const isAuth = useHeartBeatProtectedHomePage();

// 	if (isAuth === null) {
// 		return <h1>Is Loading...</h1>;
// 	}
// 	return children;
// };

// THIS VERSOIN WORKS BUT FLICKERS
export const AuthGateHomePageProtected = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useProfileRedirect();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

// Pages only accessible to authenticated volunteers, organizers and admin with completed profile
export const AuthGateProtected = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatProtected();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};
// Pages only accessible to organizers and admin
export const AuthGateProtectedOrganizer = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatProtectedOrganizer();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

// Pages only accessible to admin
export const AuthGateProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartBeatProtectedAdmin();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};
