export const AuthGate = ({ children, hook }: { children: React.ReactNode, hook(): boolean | null }) => {
	const isAuth = hook();

	if (isAuth === null) {
		return <h1>Is Loading...</h1>;
	}

	return children;
};
