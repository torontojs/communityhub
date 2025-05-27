export const getHeartBeat = async (appUrl: string) => {
	try {
		const response = await fetch(`${appUrl}auth/heartbeat`, {
			method: 'GET',
			credentials: 'include'
		});
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (response.status !== 200) {
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
				throw new Error('Error sign-up');
			}
		}
	}
};
