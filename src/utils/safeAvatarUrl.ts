import { DEFAULT_AVATAR } from './constants.ts';

export const safeAvatarUrl = (url: string | undefined): string => {
	if (!url) {
		return DEFAULT_AVATAR;
	}
	try {
		const parsed = new URL(url);
		if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
			// `parsed.href` is already percent-encoded by the URL constructor;
			// running encodeURI over it again would double-encode (e.g. %20 -> %2520).
			return parsed.href;
		}
	} catch {
		return DEFAULT_AVATAR;
	}
	return DEFAULT_AVATAR;
};
