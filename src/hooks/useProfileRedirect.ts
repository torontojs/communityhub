import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import type { ProfileStatus } from '../types/index.ts';

type RedirectPathResult = string | null;

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

const normalizePath = (path: string) => path.replace(new RegExp(REGEX_REMOVE_TRAILING_SLASHES.source, REGEX_REMOVE_TRAILING_SLASHES.flags), '');

const getRedirectPathForStatus = (status: ProfileStatus, currentPath: string): RedirectPathResult => {
	switch (status) {
		case 'activated':
			if (
				currentPath === normalizePath(REDIRECT_PATHS.checkSteps) ||
				currentPath === normalizePath(REDIRECT_PATHS.reviewConductCode)
			) {
				return null;
			}
			return REDIRECT_PATHS.checkSteps;

		case 'tos-accepted':
		case 'social-handle-provided':
			if (currentPath === normalizePath(REDIRECT_PATHS.completeProfile)) {
				return null;
			}
			return REDIRECT_PATHS.completeProfile;

		case 'profile-completed':
			if (currentPath === normalizePath(REDIRECT_PATHS.home)) {
				return null;
			}
			return REDIRECT_PATHS.home;

		case 'created':
		case 'deleted':
		case 'error':
		default:
			return REDIRECT_PATHS.signIn;
	}
};

export const useProfileRedirect = () => {
	const { isLoading, profileStatus } = useAuth();
	const [redirectionComplete, setRedirectionComplete] = useState<boolean | null>(null);

	useEffect(() => {
		if (isLoading) { return; }

		const currentPath = normalizePath(new URL(window.location.href).pathname);
		const validStatus = profileStatus && isValidStatus(profileStatus) ? profileStatus : null;
		const redirectPath: RedirectPathResult = validStatus ? getRedirectPathForStatus(validStatus, currentPath) : REDIRECT_PATHS.signIn;

		if (!redirectPath) {
			setRedirectionComplete(true);
			return;
		}

		if (currentPath !== normalizePath(redirectPath)) {
			window.location.href = redirectPath;
		} else {
			setRedirectionComplete(true);
		}
	}, [isLoading, profileStatus]);

	return redirectionComplete;
};
