import { useEffect, useState } from 'react';

// Public Page getHeartBeat
export const getHeartBeat = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status === 200) {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Public Page useHeartBeat
export const useHeartBeat = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeat();
			if (auth) { window.location.href = '/pages/home'; }
			else {
				setIsAuth(true);
			}
		};
		void check();
	}, []);
	return isAuth;
};

// Private page access getHearBeatPrivateAll for volunteers, organizers and admin
export const getHeartBeatPrivateAll = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});

		const data = await response.json();
		if (response.status === 200 && data.status === 'created') {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Private page access useHeartBeatPrivateAll for volunteers, organizers and admin
export const useHeartBeatPrivateAll = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeatPrivateAll();
			if (!auth) { window.location.href = '/pages/login'; }
			else {
				setIsAuth(true);
			}
		};
		void check();
	}, []);
	return isAuth;
};
