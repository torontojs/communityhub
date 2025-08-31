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

/**
 * The regex engine looks for one or more forward slashes (/+) that are located at the very end of the string ($).
 * If it finds them, the replace method replaces them with an empty string (''), effectively deleting them.
 *
 * - `\/+`  : Matches one or more slashes. The backslash '\' escapes the forward slash '/'. '+' is a quantifier for one or more matches.
 * - `$`    : Anchors that matches the end of the string.
 * - `u`    : Enables full Unicode support (safe for Unicode characters).
 *
 * E.g.		: 'https://www.example.com/path/'  becomes 'https://www.example.com/path'.
 * 			: 'https://www.example.com/path//' becomes 'https://www.example.com/path'.
 */
export const REGEX_REMOVE_TRAILING_SLASHES = /\/+$/u;

/**
 * Normalizes a path by removing any trailing slashes (/).
 *
 * This is useful for ensuring consistent path formatting, especially
 * when comparing or joining paths.
 *
 * @param {string} path - The input path string to normalize.
 * @returns {string} The normalized path without trailing slashes.
 */
const normalizePath = (path: string) => path.replace(new RegExp(REGEX_REMOVE_TRAILING_SLASHES.source, REGEX_REMOVE_TRAILING_SLASHES.flags), '');

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
		// Re-throw the abort
		throw err;
	}
};

export const useProfileRedirect = () => {
	const [isRedirecting, setIsRedirecting] = useState(true);

	useEffect(() => {
		// Create abort controller to fetch abort
		const controller = new AbortController();
		const { signal } = controller;

		const redirect = async () => {
			try {
				// Extract URL pathname
				const currentPath = new URL(window.location.href).pathname;

				const redirectPath = await getRedirectPath(signal, currentPath);

				// If invalid redirectPath, throw error
				if (!redirectPath) {
					throw new Error('Invalid Redirect Path!');
				}

				// Redirect only if current url path is different from the redirectpath
				if (currentPath !== redirectPath) {
					window.location.href = redirectPath;
				} else {
					setIsRedirecting(false);
				}
			} catch (error) {
				if (error.name === 'AbortError') {
					// Do nothing for Abort Error
					return;
				}
				console.error('Redirect Error!', error);
				window.location.href = REDIRECT_PATHS.signIn;
			}
		};

		void redirect();

		// Cleanup function to abort fetch
		return () => {
			controller.abort();
		};
	}, []);

	return { isRedirecting };
};
