const GRAVATAR_HASH_PATTERN = /^[a-f0-9]{32}(?:[a-f0-9]{32})?$/u;

/**
 * True if `url` is a direct Gravatar *image* URL, e.g.
 * `https://gravatar.com/avatar/<hash>`. Already displayable — no lookup needed.
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
 * True if `url` is a Gravatar *profile* URL — a profile page
 * (`https://gravatar.com/<slug>`) or the profiles API
 * (`https://api.gravatar.com/v3/profiles/<slug>`). Not an image itself; the
 * avatar must be looked up via {@link resolveGravatarAvatarUrl}.
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
 * Turns a Gravatar URL into a displayable image URL.
 *
 * - Direct image URL → returned as-is.
 * - Profile URL → the image is looked up via the Gravatar profiles API.
 *
 * Returns `null` if a profile lookup fails or finds no valid avatar; callers
 * treat that as a validation failure. Input is restricted to Gravatar URLs
 * upstream by `AvatarSchema`, so the final fallthrough return is just a safety
 * net.
 */
export async function resolveGravatarAvatarUrl(url: string): Promise<string | null> {
	// A direct image URL is already displayable.
	if (isGravatarAvatarUrl(url)) { return url; }

	// A profile URL points at a page, not an image — ask the profiles API for
	// the avatar behind it.
	if (isGravatarProfileUrl(url)) {
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

	// Not a Gravatar URL — unreachable given upstream validation; return as-is.
	return url;
}
