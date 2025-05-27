export const handleLogOut = async (appUrl: string) => {
	try {
		const response = await fetch(`${appUrl}auth/sign-out`, {
			method: 'POST',
			credentials: 'include'
		});

		if (response.status === 200) {
			window.location.href = `${appUrl}sign-in/`;
		}
	} catch (err) {
		if (import.meta.env.MODE === 'development') {
			if (err instanceof Error) {
				console.error(err.name);
				console.error(err.cause);
				console.error(err.message);
				console.error(err.stack);
			} else {
				throw new Error('Error login out');
			}
		}
	}
};
