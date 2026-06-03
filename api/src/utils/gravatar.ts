const GRAVATAR_BASE_URL = 'https://gravatar.com/avatar';
const GRAVATAR_DEFAULT_IMAGE = 'mp';
const GRAVATAR_RATING = 'g';
const GRAVATAR_SIZE = 200;

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
