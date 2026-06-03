import { describe, expect, it } from 'vitest';
import { generateGravatarUrl } from './gravatar.ts';

describe('generateGravatarUrl', () => {
	it('normalizes and hashes email addresses with SHA-256', async () => {
		const url = await generateGravatarUrl(' Test@Example.COM ');

		expect(url).toBe('https://gravatar.com/avatar/973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b?s=200&d=mp&r=g');
	});
});
