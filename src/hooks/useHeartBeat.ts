import { useEffect } from 'react';

export const getHeartBeat = async () => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status !== 200) {
			window.location.href = '/pages/sign-in';
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

export const useHeartBeat = () => {
	useEffect(() => {
		void getHeartBeat();
	}, []);
};
