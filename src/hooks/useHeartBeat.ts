import { useEffect, useState } from 'react';

const getHeartBeat = async (): Promise<boolean> => {
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

export const useHeartbeat = () => {
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
