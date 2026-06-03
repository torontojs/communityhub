import { describe, expect, test } from 'vitest';
import { UpdateProfileSchema } from './validation.ts';

describe('UpdateProfileSchema', () => {
	test('rejects empty body', () => {
		const result = UpdateProfileSchema.safeParse({});

		expect(result.success).toBe(false);
	});

	test('rejects body with only unknown keys (stripped by Zod, leaving empty object)', () => {
		const result = UpdateProfileSchema.safeParse({ foo: 'bar', baz: 123 });

		expect(result.success).toBe(false);
	});

	test('rejects avatar updates', () => {
		const result = UpdateProfileSchema.safeParse({ avatar: 'https://example.com/avatar.png' });

		expect(result.success).toBe(false);
	});

	test('accepts empty links array (means "remove all links")', () => {
		const result = UpdateProfileSchema.safeParse({ links: [] });

		expect(result.success).toBe(true);
	});

	test('accepts empty skills array (means "remove all skills")', () => {
		const result = UpdateProfileSchema.safeParse({ skills: [] });

		expect(result.success).toBe(true);
	});

	test('rejects link with missing url', () => {
		const result = UpdateProfileSchema.safeParse({
			links: [{ platform: 'github' }]
		});

		expect(result.success).toBe(false);
	});

	test('rejects link with missing platform', () => {
		const result = UpdateProfileSchema.safeParse({
			links: [{ url: 'https://github.com/test' }]
		});

		expect(result.success).toBe(false);
	});

	test('rejects link with invalid platform', () => {
		const result = UpdateProfileSchema.safeParse({
			links: [{ platform: 'tiktok', url: 'https://tiktok.com/test' }]
		});

		expect(result.success).toBe(false);
	});

	test('rejects link with empty url', () => {
		const result = UpdateProfileSchema.safeParse({
			links: [{ platform: 'github', url: '' }]
		});

		expect(result.success).toBe(false);
	});

	test('rejects invalid birthday format', () => {
		const result = UpdateProfileSchema.safeParse({ birthday: '2025-01-15' });

		expect(result.success).toBe(false);
	});

	test('accepts valid birthday format', () => {
		const result = UpdateProfileSchema.safeParse({ birthday: '01-15' });

		expect(result.success).toBe(true);
	});
});
