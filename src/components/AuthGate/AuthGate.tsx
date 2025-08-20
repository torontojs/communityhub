import { useHeartbeat } from '../../hooks/useHeartBeat.ts';

const AuthGate = ({ children }: { children: React.ReactNode }) => {
	const isAuth = useHeartbeat();

	if (!isAuth) {
		return <h1>Is Loading...</h1>;
	}
	return children;
};

export default AuthGate;
