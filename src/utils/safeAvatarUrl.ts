export const safeAvatarUrl = (url: string | undefined): string => {
	if (!url) {
		return '/default-avatar.png';
	}
	if (url.startsWith('/')) {
		return url;
	}
	try {
		const parsed = new URL(url);
		if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
			return url;
		}
	} catch {
		return '/default-avatar.png';
	}
	return '/default-avatar.png';
};
