import { describe, expect, it } from 'vitest';
import { isGravatarAvatarUrl, isGravatarProfileUrl } from './gravatar.ts';

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
