const GRAVATAR_HASH_PATTERN = /^[a-f0-9]{32}(?:[a-f0-9]{32})?$/u;

/**
 * Returns true when `url` is a direct Gravatar *image* URL — one that points
 * straight at an avatar, e.g. `https://gravatar.com/avatar/<hash>`. These are
 * ready to display as-is and need no further resolution.
 */
export function isGravatarAvatarUrl(url: string): boolean {
	try {
		const parsedUrl = new URL(url);
		const [, avatarPath, hash] = parsedUrl.pathname.split('/');

		const hostname = parsedUrl.hostname.toLowerCase();

		return parsedUrl.protocol === 'https:' &&
			(hostname === 'gravatar.com' || hostname.endsWith('.gravatar.com')) &&
			avatarPath === 'avatar' &&
			GRAVATAR_HASH_PATTERN.test(hash ?? '');
	} catch {
		return false;
	}
}

/**
 * Returns true when `url` is a Gravatar *profile* URL rather than a direct
 * image — either a human-facing profile page (`https://gravatar.com/<slug>`)
 * or the profiles API (`https://api.gravatar.com/v3/profiles/<slug>`). These
 * are not images themselves; the underlying avatar must be looked up via
 * {@link resolveGravatarAvatarUrl}.
 */
export function isGravatarProfileUrl(url: string): boolean {
	try {
		const parsedUrl = new URL(url);
		const [firstPath = '', secondPath = '', thirdPath = '', extraPath] = parsedUrl.pathname.split('/').filter(Boolean);
		const hostname = parsedUrl.hostname.toLowerCase();

		if (parsedUrl.protocol !== 'https:') { return false; }

		return (
			(hostname === 'gravatar.com' || hostname === 'www.gravatar.com') &&
			firstPath !== 'avatar' &&
			!secondPath
		) || (
			hostname === 'api.gravatar.com' &&
			firstPath === 'v3' &&
			secondPath === 'profiles' &&
			thirdPath !== '' &&
			!extraPath
		);
	} catch {
		return false;
	}
}

/**
 * Normalizes a Gravatar URL into a displayable image URL.
 *
 * Callers are expected to have already restricted the input to Gravatar URLs
 * (see `AvatarSchema` in profile validation, which rejects anything that is
 * neither a Gravatar avatar nor a Gravatar profile URL). Given that:
 *
 * - Already a direct Gravatar image URL → returned unchanged.
 * - A Gravatar profile URL → the profiles API is queried and the underlying
 *   `avatar_url` is returned.
 *
 * Returns `null` only when a Gravatar profile lookup fails or yields no valid
 * avatar; callers should treat that as a validation failure.
 */
export async function resolveGravatarAvatarUrl(url: string): Promise<string | null> {
	// Already a direct image — nothing to resolve.
	if (isGravatarAvatarUrl(url)) { return url; }
	// Defensive: callers validate Gravatar-only upstream, so a non-profile URL
	// shouldn't reach here. If one does, pass it through rather than fetch.
	if (!isGravatarProfileUrl(url)) { return url; }

	const parsedUrl = new URL(url);
	const [firstPath = '', , thirdPath = ''] = parsedUrl.pathname.split('/').filter(Boolean);
	const slug = parsedUrl.hostname === 'api.gravatar.com' ? thirdPath : firstPath;
	try {
		const response = await fetch(`https://api.gravatar.com/v3/profiles/${encodeURIComponent(slug.replace(/\.card$/iu, ''))}`);
		if (!response.ok) { return null; }

		const profile: { avatar_url?: string } = await response.json();
		return profile.avatar_url && isGravatarAvatarUrl(profile.avatar_url) ? profile.avatar_url : null;
	} catch {
		return null;
	}
}
