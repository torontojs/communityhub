import { useEffect, useRef } from 'react';

type ProfileStatus = 'activated' | 'created' | 'deleted' | 'error' | 'profile-completed' | 'social-handle-provided' | 'tos-accepted';

interface ProfileStatusResponse {
	id: string;
	name: string;
	access: string;
	avatar: string | null;
	status: ProfileStatus;
}

interface ProfileStatusResult {
	statusOkay: boolean;
	shouldRedirect: boolean;
	profileStatus: ProfileStatus | null;
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

export const getProfileStatus = async (signal?: AbortSignal): Promise<ProfileStatusResult> => {
	let statusOkay = false;
	let shouldRedirect = true;
	let profileStatus;

	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include',
			signal
		});

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (response.status !== 200) {
			statusOkay = false;
			shouldRedirect = true;
			profileStatus = null;
		} else {
			const data: ProfileStatusResponse = await response.json();
			statusOkay = true;
			shouldRedirect = true;
			profileStatus = data.status ?? null;
		}

		return { statusOkay, shouldRedirect, profileStatus };
	} catch (err) {
		if (err.name === 'AbortError') {
			statusOkay = false;
			shouldRedirect = false;
			profileStatus = null;
		} else {
			console.error('err', err);
			statusOkay = false;
			shouldRedirect = false;
			profileStatus = null;
		}

		return { statusOkay, shouldRedirect, profileStatus };
	}
};

export const useProfileRedirect = () => {
	const hasRedirected = useRef(false);

	useEffect(() => {
		// Create abort controller to fetch abort
		const controller = new AbortController();
		const { signal } = controller;

		const redirect = async () => {
			if (hasRedirected.current) { return; }

			const { statusOkay, shouldRedirect, profileStatus } = await getProfileStatus(signal);

			if ((!statusOkay && shouldRedirect) || (statusOkay && shouldRedirect && !profileStatus)) {
				hasRedirected.current = true;
				window.location.href = '/pages/sign-in/';
				return;
			}

			if (statusOkay && shouldRedirect && profileStatus) {
				const redirectPath = getRedirectPathForStatus(profileStatus);
				if (window.location.pathname !== redirectPath) {
					hasRedirected.current = true;
					window.location.href = redirectPath;
				}
			}
		};
		void redirect();

		// Cleanup function to abort fetch
		return () => {
			controller.abort();
		};
	}, []);
};
