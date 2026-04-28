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
			expect(tokens.keys.length).toBe(1);

			const [firstActivationTokenKey] = tokens.keys;
			assert(firstActivationTokenKey, 'First ActivationToken should exist.');

			const stored = await env.ActivationTokens.get(firstActivationTokenKey.name, 'json');
			expect(stored).toEqual(expect.objectContaining({ email: newUserPayload.email }));
		});

		it.todo('skips creation when the email already exists (idempotent sign-up path)');

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
			expect(remaining.keys.find(({ name }) => name === token)).toBeDefined();
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

			expect(response.status).toBe(StatusCodes.CREATED);

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
});
