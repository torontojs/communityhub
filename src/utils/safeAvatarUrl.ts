export const safeAvatarUrl = (url: string | undefined): string => {
	if (!url) {
		return '/default-avatar.png';
	}
	// Exclude protocol-relative URLs (//evil.com) which start with / but are not local paths
	if (url.startsWith('/') && !url.startsWith('//')) {
		return encodeURI(url);
	}
	try {
		const parsed = new URL(url);
		if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
			return encodeURI(parsed.href);
		}
	} catch {
		return '/default-avatar.png';
	}
	return '/default-avatar.png';
};
