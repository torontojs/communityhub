import { describe, expect, it } from 'vitest';
import { generateGravatarUrl, isGravatarAvatarUrl } from './gravatar.ts';

describe('generateGravatarUrl', () => {
	it('normalizes and hashes email addresses with SHA-256', async () => {
		const url = await generateGravatarUrl(' Test@Example.COM ');

		expect(url).toBe('https://gravatar.com/avatar/973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b?s=200&d=mp&r=g');
	});
});

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
