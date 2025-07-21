import { useEffect } from 'react';

type ProfileStatus = 'activated' | 'created' | 'deleted' | 'error' | 'profile-completed' | 'social-handle-provided' | 'tos-accepted';

interface ProfileStatusResponse {
	id: string;
	name: string;
	access: string;
	avatar: string | null;
	status: ProfileStatus;
}

const REDIRECT_PATHS = {
	signIn: '/pages/sign-in/',
	checkSteps: '/pages/check-steps/',
	completeProfile: '/pages/complete-profile/',
	home: '/pages/home/'
};

const getRedirectPathForStatus = (status: ProfileStatus): string => {
	switch (status) {
		case 'activated':
			return REDIRECT_PATHS.checkSteps;

		case 'tos-accepted':
		case 'social-handle-provided':
			return REDIRECT_PATHS.completeProfile;

		case 'profile-completed':
			return REDIRECT_PATHS.home;

		case 'created':
		case 'deleted':
		case 'error':
		default:
			return REDIRECT_PATHS.signIn;
	}
};

export const getProfileStatus = async (): Promise<ProfileStatus | null> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});

		if (response.status !== 200) {
			return null;
		}

		const data: ProfileStatusResponse = await response.json();

		return data.status ?? null;
	} catch (err) {
		if (import.meta.env.MODE === 'development') {
			if (err instanceof Error) {
				console.error(err.name);
				console.error(err.cause);
				console.error(err.message);
				console.error(err.stack);
			} else {
				throw new Error('Error Fetching Profile Status', err);
			}
		}

		// fallback in case of failure
		return null;
	}
};

export const useProfileRedirect = () => {
	useEffect(() => {
		const redirect = async () => {
			const status = await getProfileStatus();

			if (!status) {
				window.location.href = '/pages/sign-in';
				return;
			}

			const redirectPath = getRedirectPathForStatus(status);
			if (window.location.pathname !== redirectPath) {
				window.location.href = redirectPath;
			}
		};
		void redirect();
	}, []);
};
