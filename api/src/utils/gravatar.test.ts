import { afterEach, describe, expect, it, vi } from 'vitest';
import { isGravatarAvatarUrl, isGravatarProfileUrl, resolveGravatarAvatarUrl } from './gravatar.ts';

const AVATAR_HASH = '973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b';
const AVATAR_URL = `https://gravatar.com/avatar/${AVATAR_HASH}`;
const AVATAR_URL_FIELD = 'avatar_url';

function mockFetch(response: { ok: boolean, body?: unknown }): ReturnType<typeof vi.fn> {
	const fetchMock = vi.fn().mockResolvedValue({
		ok: response.ok,
		json: async (): Promise<unknown> => {
			await Promise.resolve();
			return response.body;
		}
	});
	vi.stubGlobal('fetch', fetchMock);
	return fetchMock;
}

describe('isGravatarAvatarUrl', () => {
	it('accepts HTTPS Gravatar avatar URLs with SHA-256 hashes', () => {
		const url = 'https://gravatar.com/avatar/973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b?s=200&d=mp&r=g';

		expect(isGravatarAvatarUrl(url)).toBe(true);
	});

	it('accepts HTTPS Gravatar avatar URLs from Gravatar subdomains', () => {
		const url = 'https://www.gravatar.com/avatar/00000000000000000000000000000000';

		expect(isGravatarAvatarUrl(url)).toBe(true);
	});

	it('rejects non-Gravatar avatar URLs', () => {
		expect(isGravatarAvatarUrl('https://example.com/avatar.png')).toBe(false);
	});
});

describe('isGravatarProfileUrl', () => {
	it('accepts HTTPS Gravatar profile URLs', () => {
		expect(isGravatarProfileUrl('https://gravatar.com/gleamingb80de23538')).toBe(true);
	});

	it('rejects Gravatar avatar URLs', () => {
		expect(isGravatarProfileUrl('https://gravatar.com/avatar/973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b')).toBe(false);
	});
});

describe('resolveGravatarAvatarUrl', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('returns a direct avatar URL unchanged without fetching', async () => {
		const fetchMock = mockFetch({ ok: true });

		expect(await resolveGravatarAvatarUrl(AVATAR_URL)).toBe(AVATAR_URL);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('resolves a profile URL to the avatar returned by the API', async () => {
		mockFetch({ ok: true, body: { [AVATAR_URL_FIELD]: AVATAR_URL } });

		expect(await resolveGravatarAvatarUrl('https://gravatar.com/johnsmith')).toBe(AVATAR_URL);
	});

	it('resolves the gleamingb80de23538 profile URL to its numbered Gravatar avatar host', async () => {
		const avatarUrl = 'https://2.gravatar.com/avatar/f5111607a361fc4d3d500f33193de4fee7d5667b5a714a7765d389a89de3fefa';
		mockFetch({ ok: true, body: { [AVATAR_URL_FIELD]: avatarUrl } });

		expect(await resolveGravatarAvatarUrl('https://gravatar.com/gleamingb80de23538')).toBe(avatarUrl);
	});

	it('extracts the slug from an api.gravatar.com profile URL', async () => {
		const fetchMock = mockFetch({ ok: true, body: { [AVATAR_URL_FIELD]: AVATAR_URL } });

		await resolveGravatarAvatarUrl('https://api.gravatar.com/v3/profiles/johnsmith');

		expect(fetchMock).toHaveBeenCalledWith('https://api.gravatar.com/v3/profiles/johnsmith');
	});

	it('strips a trailing .card from the slug', async () => {
		const fetchMock = mockFetch({ ok: true, body: { [AVATAR_URL_FIELD]: AVATAR_URL } });

		await resolveGravatarAvatarUrl('https://gravatar.com/johnsmith.card');

		expect(fetchMock).toHaveBeenCalledWith('https://api.gravatar.com/v3/profiles/johnsmith');
	});

	it('returns null when the profile lookup is not ok', async () => {
		mockFetch({ ok: false });

		expect(await resolveGravatarAvatarUrl('https://gravatar.com/johnsmith')).toBeNull();
	});

	it('returns null when the API response has no avatar_url', async () => {
		mockFetch({ ok: true, body: {} });

		expect(await resolveGravatarAvatarUrl('https://gravatar.com/johnsmith')).toBeNull();
	});

	it('returns null when the API avatar_url is not a Gravatar image', async () => {
		mockFetch({ ok: true, body: { [AVATAR_URL_FIELD]: 'https://example.com/me.png' } });

		expect(await resolveGravatarAvatarUrl('https://gravatar.com/johnsmith')).toBeNull();
	});

	it('returns null when the fetch throws', async () => {
		const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
		vi.stubGlobal('fetch', fetchMock);

		expect(await resolveGravatarAvatarUrl('https://gravatar.com/johnsmith')).toBeNull();
	});
});
