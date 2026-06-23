export const isGravatarHost = (hostname: string): boolean => {
	const normalizedHostname = hostname.toLowerCase();
	return normalizedHostname === 'gravatar.com' || normalizedHostname.endsWith('.gravatar.com');
};

export const getGravatarUrlType = (value?: string): 'empty' | 'image' | 'invalid' | 'profile' => {
	if (!value?.trim()) { return 'empty'; }

	try {
		const url = new URL(value.trim());
		const [firstPath = '', secondPath, thirdPath] = url.pathname.split('/').filter(Boolean);

		if (url.protocol !== 'https:' || !isGravatarHost(url.hostname)) { return 'invalid'; }
		if (firstPath === 'avatar' && secondPath) { return 'image'; }
		if ((url.hostname === 'gravatar.com' || url.hostname === 'www.gravatar.com') && firstPath && !secondPath) { return 'profile'; }
		if (url.hostname === 'api.gravatar.com' && firstPath === 'v3' && secondPath === 'profiles' && thirdPath) { return 'profile'; }

		return 'invalid';
	} catch {
		return 'invalid';
	}
};

export const getGravatarProfileSlug = (value: string): string | null => {
	try {
		const url = new URL(value.trim());
		const [firstPath = '', secondPath = '', thirdPath = '', extraPath] = url.pathname.split('/').filter(Boolean);

		if (url.protocol !== 'https:') {
			return null;
		}

		if (['gravatar.com', 'www.gravatar.com'].includes(url.hostname.toLowerCase()) && firstPath !== 'avatar' && !secondPath) {
			return firstPath.replace(/\.card$/iu, '');
		}

		if (url.hostname === 'api.gravatar.com' && firstPath === 'v3' && secondPath === 'profiles' && thirdPath && !extraPath) {
			return thirdPath;
		}

		return null;
	} catch {
		return null;
	}
};

export const getGravatarAvatarUrl = async (profileUrl: string): Promise<string | null> => {
	const slug = getGravatarProfileSlug(profileUrl);
	if (!slug) { return null; }

	try {
		const response = await fetch(`https://api.gravatar.com/v3/profiles/${encodeURIComponent(slug)}`);
		if (!response.ok) { return null; }

		const profile = await response.json() as { avatar_url?: string };
		return profile.avatar_url ?? null;
	} catch {
		return null;
	}
};
