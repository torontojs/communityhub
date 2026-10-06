import { applyD1Migrations, env } from 'cloudflare:test';
import { assert, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { app } from '../../index.ts';
import { StatusCodes } from '../../utils/responses.ts';

beforeAll(async () => {
	await applyD1Migrations(env.Database, env.TEST_MIGRATIONS);
});
beforeEach(async () => {
	await env.Database.exec(env.SEED_SQL);
	const activationKeys = await env.ActivationTokens.list();
	await Promise.all(activationKeys.keys.map(async ({ name }) => env.ActivationTokens.delete(name)));

	const sessionKeys = await env.SessionTokens.list();
	await Promise.all(sessionKeys.keys.map(async ({ name }) => env.SessionTokens.delete(name)));

	const passwordResetKeys = await env.PasswordResetToken.list();
	await Promise.all(passwordResetKeys.keys.map(async ({ name }) => env.PasswordResetToken.delete(name)));
});

describe('Authentication routes', () => {
	describe('POST /api/auth/sign-up', () => {
		it('creates a new profile and stores an activation token for a valid request', async () => {
			const newUserPayload = {
				name: 'New User',
				email: 'new@new.new',
				password: 'jfiewofjieowfjo2348219++++'
			} as const;

			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUserPayload)
			}, env);

			expect(response.status).toBe(StatusCodes.OKAY);

			const tokens = await env.ActivationTokens.list();
			expect(Array.isArray(tokens?.keys)).toBe(true);
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			expect(tokens.keys.length).toBe(2);

			const firstActivationTokenKey = tokens.keys.find(({ name }) => !name.startsWith('activation-resend:'));
			assert(firstActivationTokenKey, 'First ActivationToken should exist.');
			const activationResendKey = tokens.keys.find(({ name }) => name.startsWith('activation-resend:'));
			assert(activationResendKey, 'Activation resend cooldown should exist.');
			assert(firstActivationTokenKey.expiration, 'Activation token expiration should exist.');
			assert(activationResendKey.expiration, 'Activation resend cooldown expiration should exist.');
			expect(firstActivationTokenKey.expiration).toBe(activationResendKey.expiration);
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			const expectedTtlSeconds = 60 * 15;
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			const actualTtlSeconds = firstActivationTokenKey.expiration - Math.floor(Date.now() / 1000);
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			expect(actualTtlSeconds).toBeGreaterThanOrEqual(expectedTtlSeconds - 5);
			expect(actualTtlSeconds).toBeLessThanOrEqual(expectedTtlSeconds);

			const stored = await env.ActivationTokens.get(firstActivationTokenKey.name, 'json');
			expect(stored).toEqual(expect.objectContaining({ email: newUserPayload.email }));

			const profile = await env.Database.prepare('SELECT avatar FROM profile WHERE email = ?')
				.bind(newUserPayload.email)
				.first<{ avatar: string | null }>();
			expect(profile?.avatar).toBeNull();
		});

		it('stores a provided Gravatar avatar URL for a valid sign-up request', async () => {
			const newUserPayload = {
				name: 'New Avatar User',
				email: 'new-avatar@new.new',
				avatar: 'https://gravatar.com/avatar/0000000000000000000000000000000000000000000000000000000000000020?s=200&d=robohash&r=g',
				password: 'jfiewofjieowfjo2348219++++'
			} as const;

			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUserPayload)
			}, env);

			expect(response.status).toBe(StatusCodes.OKAY);

			const profile = await env.Database.prepare('SELECT avatar FROM profile WHERE email = ?')
				.bind(newUserPayload.email)
				.first<{ avatar: string | null }>();
			expect(profile?.avatar).toBe(newUserPayload.avatar);
		});

		it('does not resend while an unactivated account is on cooldown', async () => {
			const payload = {
				name: 'Cooldown User',
				email: 'cooldown@example.com',
				password: 'jfiewofjieowfjo2348219++++'
			};

			await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			}, env);
			const tokensBeforeRetry = await env.ActivationTokens.list();

			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			}, env);

			expect(response.status).toBe(StatusCodes.OKAY);
			expect((await env.ActivationTokens.list()).keys).toHaveLength(tokensBeforeRetry.keys.length);
		});

		it('creates a fresh activation token after the resend cooldown', async () => {
			const payload = {
				name: 'Resend User',
				email: 'resend@example.com',
				password: 'jfiewofjieowfjo2348219++++'
			};

			await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			}, env);
			const firstKeys = await env.ActivationTokens.list();
			const cooldownKey = firstKeys.keys.find(({ name }) => name.startsWith('activation-resend:'));
			assert(cooldownKey, 'Activation resend cooldown should exist.');
			await env.ActivationTokens.delete(cooldownKey.name);

			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			}, env);

			expect(response.status).toBe(StatusCodes.OKAY);
			const activationKeys = (await env.ActivationTokens.list()).keys.filter(({ name }) => !name.startsWith('activation-resend:'));
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			expect(activationKeys).toHaveLength(2);
		});

		it('does not send an activation token for an existing active account', async () => {
			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'King Arthur',
					email: 'king.arthur@camelot.uk',
					password: 'H0lyGr@il42!L0rd'
				})
			}, env);

			expect(response.status).toBe(StatusCodes.OKAY);
			expect((await env.ActivationTokens.list()).keys).toHaveLength(0);
		});

		it('rejects sign-up when email is invalid', async () => {
			const invalidEmailPayload = {
				name: 'Invalid Email User',
				email: 'invalid',
				password: 'jfiewofjieowfjo2348219++++'
			} as const;

			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(invalidEmailPayload)
			}, env);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_CONTENT);

			const tokens = await env.ActivationTokens.list();
			expect(tokens.keys).toHaveLength(0);
		});

		it('rejects sign-up when password is weak', async () => {
			const weakPasswordPayload = {
				name: 'Weak Password User',
				email: 'weak@pw.test',
				password: 'a'
			} as const;

			const response = await app.request('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(weakPasswordPayload)
			}, env);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_CONTENT);

			const tokens = await env.ActivationTokens.list();
			expect(tokens.keys).toHaveLength(0);
		});

		it('activates an account when presented with a valid activation token', async () => {
			const token = '00000000-0000-0000-0000-000000000000';
			const activationUser = {
				name: 'King Arthur',
				email: 'king.arthur@camelot.uk',
				password: 'H0lyGr@il42!',
				access: 'volunteer' as const,
				status: 'active'
			};

			await env.ActivationTokens.put(token, JSON.stringify(activationUser), { expirationTtl: 60 });

			const response = await app.request(`/api/auth/activate?token=${token}`, { method: 'GET' }, env);
			expect(response.status).toBe(StatusCodes.OKAY);

			const remaining = await env.ActivationTokens.list();
			expect(remaining.keys.find(({ name }) => name === token)).toBeUndefined();
		});

		it('fails to activate when token is invalid or expired', async () => {
			const invalidToken = '00000000-0000-0000-0000-000000000000';
			const response = await app.request(`/api/auth/activate?token=${invalidToken}`, {
				method: 'GET'
			}, env);
			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});
	});

	describe('POST /api/auth/sign-in', () => {
		it('signs in with a registered active account and correct password', async () => {
			const registeredActiveVolunteer = {
				name: 'King Arthur',
				email: 'king.arthur@camelot.uk',
				password: 'H0lyGr@il42!L0rd',
				access: 'volunteer' as const,
				status: 'active'
			};

			const response = await app.request('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(registeredActiveVolunteer)
			}, env);

			expect(response.status).toBe(StatusCodes.OKAY);

			const setCookie = response.headers.get('set-cookie') ?? response.headers.get('Set-Cookie');
			expect(setCookie).toBeTruthy();
		});

		it('rejects sign-in when the email does not exist', async () => {
			const nonExistentEmailPayload = {
				name: 'Ghost User',
				email: 'wrong@email.com',
				password: 'H0lyGr@il42!',
				access: 'volunteer' as const,
				status: 'active'
			};

			const response = await app.request('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(nonExistentEmailPayload)
			}, env);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('rejects sign-in when the password is incorrect', async () => {
			const wrongPasswordPayload = {
				name: 'King Arthur',
				email: 'king.arthur@camelot.uk',
				password: 'wrong password',
				access: 'volunteer' as const,
				status: 'active'
			};

			const response = await app.request('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(wrongPasswordPayload)
			}, env);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it.todo('rejects sign-in when the account exists but is not activated');
	});

	describe('POST /api/auth/sign-out', () => {
		it('signs out and invalidates the session when a valid session token is provided', async () => {
			const token = '00000000-0000-0000-0000-000000000000';
			const sessionPayload = {
				id: token,
				name: 'King Arthur',
				email: 'king.arthur@camelot.uk',
				password: 'H0lyGr@il42!',
				access: 'volunteer' as const,
				status: 'active',
				token,
				originalExpiry: new Date().toISOString()
			};

			await env.SessionTokens.put(token, JSON.stringify(sessionPayload));

			const response = await app.request('/api/auth/sign-out', {
				method: 'POST',
				headers: { Cookie: `auth_token=${token}` }
			}, env);

			expect(response.status).toBe(StatusCodes.NO_CONTENT);

			const remaining = await env.SessionTokens.list();
			expect(remaining.keys.some(({ name }) => name === token)).toBe(false);
		});

		it('returns unauthorized when the session token is missing', async () => {
			const response = await app.request('/api/auth/sign-out', { method: 'POST' }, env);
			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});
	});

	describe('POST /api/auth/reset-password', () => {
		it('resets a password using a token created by the forgot-password route', async () => {
			const email = 'king.arthur@camelot.uk';
			const password = 'An Even Stronger Reset Password 84! With Symbols';

			const forgotPasswordResponse = await app.request('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			}, env);
			expect(forgotPasswordResponse.status).toBe(StatusCodes.OKAY);

			const token = await env.PasswordResetToken.get(email);
			expect(token).toBeTruthy();
			if (!token) { throw new Error('Expected a password reset token'); }
			expect(await env.PasswordResetToken.get(token)).toBe(email);

			const resetPasswordResponse = await app.request('/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password })
			}, env);
			expect(resetPasswordResponse.status).toBe(StatusCodes.OKAY);
			expect(await env.PasswordResetToken.get(email)).toBeNull();
			expect(await env.PasswordResetToken.get(token)).toBeNull();

			const signInResponse = await app.request('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			}, env);
			expect(signInResponse.status).toBe(StatusCodes.OKAY);
		});

		it('invalidates a password reset token after successful use', async () => {
			const token = '99141843-fb98-48ca-90d7-3f7c14831e2c';
			const email = 'king.arthur@camelot.uk';
			const password = 'An Extremely Strong Reset Password 42! With Symbols';

			await env.PasswordResetToken.put(token, email, { expirationTtl: 60 });
			await env.PasswordResetToken.put(email, token, { expirationTtl: 60 });

			const firstResponse = await app.request('/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password })
			}, env);
			expect(firstResponse.status).toBe(StatusCodes.OKAY);

			const replayResponse = await app.request('/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password })
			}, env);
			expect(replayResponse.status).toBe(StatusCodes.UNPROCESSABLE_CONTENT);
		});
	});
});
