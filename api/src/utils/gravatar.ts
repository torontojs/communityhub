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
