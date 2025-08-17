import { useEffect, useRef, useState } from 'react';

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
	'activated',
	'created',
	'deleted',
	'error',
	'profile-completed',
	'social-handle-provided',
	'tos-accepted'
]);

const isValidStatus = (status: string): status is ProfileStatus => VALID_STATUSES.has(status as ProfileStatus);

const REDIRECT_PATHS = {
	signIn: '/pages/sign-in/',
	checkSteps: '/pages/check-steps/',
	reviewConductCode: '/pages/review-conduct-code/',
	completeProfile: '/pages/complete-profile/',
	home: '/pages/home/'
};

const normalizePath = (path: string) => path.replace(/\/+$/u, '');

const getRedirectPathForStatus = (status: ProfileStatus, currentPath?: string): string => {
	const normalized = normalizePath(currentPath ?? '');
	switch (status) {
		case 'activated':
			return normalized === normalizePath(REDIRECT_PATHS.reviewConductCode)
				? REDIRECT_PATHS.reviewConductCode
				: REDIRECT_PATHS.checkSteps;

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

export const getRedirectPath = async (signal?: AbortSignal, currentPath?: string): Promise<RedirectPathResult> => {
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
		return (data?.status && isValidStatus(data.status)) ? getRedirectPathForStatus(data.status, currentPath) : REDIRECT_PATHS.signIn;
	} catch (err) {
		if (err.name !== 'AbortError') {
			console.error('Failed to fetch profile status:', err);
			return REDIRECT_PATHS.signIn;
		}
		return null;
	}
};

export const useProfileRedirect = () => {
	const hasRedirected = useRef(false);

	// Use in components to prevent flashing if redirection is required.
	// NOTE: In development, React Strict Mode may still cause a brief flash
	// due to double-invoked useEffect and initial component mount.
	const [redirectionComplete, setRedirectionComplete] = useState(false);

	useEffect(() => {
		// Create abort controller to fetch abort
		const controller = new AbortController();
		const { signal } = controller;

		const redirect = async () => {
			try {
				// Normalize URL path
				const currentPath = new URL(window.location.href).pathname;

				const redirectPath = await getRedirectPath(signal, currentPath);

				if (signal.aborted || hasRedirected.current) {
					return;
				}

				// If redirectPath is null (aborted), skip redirection
				if (!redirectPath) {
					setRedirectionComplete(true);
					return;
				}

				// Redirect only if current url path is different from the redirectpath
				if (currentPath && currentPath !== redirectPath) {
					hasRedirected.current = true;
					window.location.href = redirectPath;
				} else {
					// Mark redirection complete if already on the correct path
					setRedirectionComplete(true);
				}
			} catch (error) {
				console.error('Redirect Error!', error);
				if (!signal.aborted && !hasRedirected.current) {
					window.location.href = REDIRECT_PATHS.signIn;
				}
			} finally {
				if (!signal.aborted && !hasRedirected.current) {
					setRedirectionComplete(true);
				}
			}
		};

		void redirect();

		// Cleanup function to abort fetch
		return () => {
			controller.abort();
		};
	}, []);

	return { redirectionComplete };
};
