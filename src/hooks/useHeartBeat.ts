import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';

// Kept for ConfirmAccount.tsx direct usage
export const getHeartBeat = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});
		return response.status === 200;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Public page: redirect away if already authenticated
export const useHeartBeat = () => {
	const { isLoading, profileStatus } = useAuth();

	useEffect(() => {
		if (isLoading) { return; }
		if (profileStatus !== null) { window.location.href = '/pages/home'; }
	}, [isLoading, profileStatus]);

	if (isLoading) { return null; }
	if (profileStatus !== null) { return null; }
	return true;
};

// Protected page: requires completed profile
export const useHeartBeatProtected = () => {
	const { isLoading, profileStatus } = useAuth();

	useEffect(() => {
		if (isLoading) { return; }
		if (profileStatus !== 'profile-completed') { window.location.href = '/pages/sign-in'; }
	}, [isLoading, profileStatus]);

	if (isLoading) { return null; }
	if (profileStatus !== 'profile-completed') { return null; }
	return true;
};

// Protected organizer/admin page
export const useHeartBeatProtectedOrganizer = () => {
	const { isLoading, accessLevel } = useAuth();

	useEffect(() => {
		if (isLoading) { return; }
		if (accessLevel !== 'organizer' && accessLevel !== 'admin') { window.location.href = '/pages/sign-in'; }
	}, [isLoading, accessLevel]);

	if (isLoading) { return null; }
	if (accessLevel !== 'organizer' && accessLevel !== 'admin') { return null; }
	return true;
};

// Protected admin page
export const useHeartBeatProtectedAdmin = () => {
	const { isLoading, accessLevel } = useAuth();

	useEffect(() => {
		if (isLoading) { return; }
		if (accessLevel !== 'admin') { window.location.href = '/pages/sign-in'; }
	}, [isLoading, accessLevel]);

	if (isLoading) { return null; }
	if (accessLevel !== 'admin') { return null; }
	return true;
};
