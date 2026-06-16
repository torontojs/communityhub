const GRAVATAR_BASE_URL = 'https://gravatar.com/avatar';
const GRAVATAR_DEFAULT_IMAGE = 'mp';
const GRAVATAR_RATING = 'g';
const GRAVATAR_SIZE = 200;
const GRAVATAR_HASH_PATTERN = /^[a-f0-9]{32}(?:[a-f0-9]{32})?$/u;

function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function generateGravatarUrl(email: string): Promise<string> {
	const normalizedEmail = email.trim().toLowerCase();
	const emailBytes = new TextEncoder().encode(normalizedEmail);
	const hashBuffer = await crypto.subtle.digest('SHA-256', emailBytes);
	const hash = bytesToHex(new Uint8Array(hashBuffer));
	const parameters = new URLSearchParams({
		s: String(GRAVATAR_SIZE),
		d: GRAVATAR_DEFAULT_IMAGE,
		r: GRAVATAR_RATING
	});

	return `${GRAVATAR_BASE_URL}/${hash}?${parameters.toString()}`;
}

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

export async function resolveGravatarAvatarUrl(url: string): Promise<string | null> {
	if (isGravatarAvatarUrl(url)) { return url; }
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
