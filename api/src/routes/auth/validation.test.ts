import { describe, expect, it } from 'vitest';
import { ResetPasswordSchema, SignInSchema, SignUpSchema } from './validation.ts';

const VALID_UUID = '3c5123c0-8548-4a02-a83c-32e9ce67eae8';
const VALID_GRAVATAR = 'https://gravatar.com/avatar/973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b';

describe('SignInSchema', () => {
	it('accepts a valid email and password', () => {
		expect(SignInSchema.safeParse({ email: 'user@example.com', password: 'secret' }).success).toBe(true);
	});

	it('rejects a malformed email', () => {
		expect(SignInSchema.safeParse({ email: 'not-an-email', password: 'secret' }).success).toBe(false);
	});

	it('rejects an empty password', () => {
		expect(SignInSchema.safeParse({ email: 'user@example.com', password: '' }).success).toBe(false);
	});
});

describe('SignUpSchema', () => {
	it('accepts a complete sign-up with a Gravatar avatar', () => {
		const result = SignUpSchema.safeParse({
			name: 'Jane Doe',
			email: 'jane@example.com',
			avatar: VALID_GRAVATAR,
			password: 'a-strong-password'
		});

		expect(result.success).toBe(true);
	});

	it('rejects a non-Gravatar avatar', () => {
		const result = SignUpSchema.safeParse({
			name: 'Jane Doe',
			email: 'jane@example.com',
			avatar: 'https://example.com/me.png',
			password: 'a-strong-password'
		});

		expect(result.success).toBe(false);
	});
});

describe('ResetPasswordSchema', () => {
	it('accepts a long password with a valid token', () => {
		expect(ResetPasswordSchema.safeParse({ password: 'a-very-long-password', token: VALID_UUID }).success).toBe(true);
	});

	it('rejects a password shorter than 15 characters', () => {
		expect(ResetPasswordSchema.safeParse({ password: 'short', token: VALID_UUID }).success).toBe(false);
	});

	it('rejects a malformed token', () => {
		expect(ResetPasswordSchema.safeParse({ password: 'a-very-long-password', token: 'nope' }).success).toBe(false);
	});
});
