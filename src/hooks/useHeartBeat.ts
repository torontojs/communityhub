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

// Protected page check for volunteers, organizers and admin
export const getHeartBeatProtectedHomePage = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});

		const data = await response.json();
		if (response.status === 200 && data.status === 'profile-completed') {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Protected page hook
export const useHeartBeatProtectedHomePage = () => {
	const [isAuth, setIsAuth] = useState<boolean | null>(null);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeatProtectedHomePage();
			if (!auth) { window.location.href = '/pages/sign-in'; }
			else {
				setIsAuth(true);
			}
		};
		void check();
	}, []);
	return isAuth;
};
// Protected page check for volunteers, organizers and admin
export const getHeartBeatProtected = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});

		const data = await response.json();
		if (response.status === 200 && data.status === 'profile-completed') {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Protected page hook
export const useHeartBeatProtected = () => {
	const [isAuth, setIsAuth] = useState<boolean | null>(null);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeatProtected();
			if (!auth) { window.location.href = '/pages/home'; }
			else {
				setIsAuth(true);
			}
		};
		void check();
	}, []);
	return isAuth;
};

// Protected page check for organizers and admins
export const getHeartBeatProtectedOrganizer = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});

		const data = await response.json();
		if (response.status === 200 && data.access === 'organizer' || data.access === 'admin') {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Protected organizers and admins page hook
export const useHeartBeatProtectedOrganizer = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeatProtectedOrganizer();
			if (!auth) { window.location.href = '/pages/home'; }
			else {
				setIsAuth(true);
			}
		};
		void check();
	}, []);
	return isAuth;
};

// Protected page check for volunteers, organizers and admin
export const getHeartBeatProtectedAdmin = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});

		const data = await response.json();
		if (response.status === 200 && data.acess === 'admin') {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Protected admin page hook
export const useHeartBeatProtectedAdmin = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeatProtectedAdmin();
			if (!auth) { window.location.href = '/pages/home'; }
			else {
				setIsAuth(true);
			}
		};
		void check();
	}, []);
	return isAuth;
};
