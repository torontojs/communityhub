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
	} catch (error) {
		if (import.meta.env.MODE === 'development') {
			console.log(error);
		}
	}
};

export const useHeartBeat = () => {
	useEffect(() => {
		void getHeartBeat();
	}, []);
};
