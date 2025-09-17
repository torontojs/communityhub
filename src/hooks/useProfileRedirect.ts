import { useEffect, useState } from 'react';

type ProfileStatus = 'activated' | 'created' | 'deleted' | 'error' | 'profile-completed' | 'social-handle-provided' | 'tos-accepted';

type RedirectPathResult = string | null;

interface ProfileStatusResponse {
	id: string;
	name: string;
	access: string;
	avatar: string | null;
	status: ProfileStatus;
}

const VALID_STATUSES = new Set<ProfileStatus>([
	'created',
	'activated',
	'tos-accepted',
	'social-handle-provided',
	'profile-completed',
	'deleted',
	'error'
]);

const isValidStatus = (status: string): status is ProfileStatus => VALID_STATUSES.has(status as ProfileStatus);

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

export const getRedirectPath = async (signal?: AbortSignal): Promise<RedirectPathResult> => {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include',
			signal
		});

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (response.status !== 200) {
			// If not authenticated, redirect to sign-in
			return REDIRECT_PATHS.signIn;
		}

		const data: ProfileStatusResponse = await response.json();

		// Redirects based on profile status or to sign-in if not profile status is returned
		return (data?.status && isValidStatus(data.status)) ? getRedirectPathForStatus(data.status) : REDIRECT_PATHS.signIn;
	} catch (err) {
		if (err.name !== 'AbortError') {
			console.error('Failed to fetch profile status:', err);
			return REDIRECT_PATHS.signIn;
		}
		return null;
	}
};

export const useProfileRedirect = () => {
	// Start as null so we can render a loading state
	const [redirectionComplete, setRedirectionComplete] = useState<boolean | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const redirect = async () => {
			const redirectPath = await getRedirectPath(signal);

			if (!redirectPath) {
				setRedirectionComplete(true);
				return;
			}

			const currentPath = new URL(window.location.href).pathname;

			if (currentPath !== redirectPath) {
				window.location.href = redirectPath;
			} else {
				setRedirectionComplete(true);
			}
		};

		void redirect();

		return () => controller.abort();
	}, []);

	return redirectionComplete;
};
