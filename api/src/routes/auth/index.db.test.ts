import { applyD1Migrations, env } from 'cloudflare:test';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import type * as EmailModule from '../../email/index.ts';
import { StatusCodes } from '../../utils/responses.ts';

const USER = {
	name: 'King Arthur',
	email: 'king.arthur@camelot.uk',
	password: 'H0lyGr@il42!',
	access: 'volunteer' as const,
	status: 'active'
} as const;

const API_ENDPOINTS = {
	SIGN_UP: '/api/auth/sign-up',
	SIGN_IN: '/api/auth/sign-in',
	SIGN_OUT: '/api/auth/sign-out',
	ACTIVATE: '/api/auth/activate'
} as const;

vi.mock('../../email/index.ts', async () => {
	const actual = await vi.importActual<typeof EmailModule>(
		'../../../src/email/index.ts'
	);
	return {
		...actual,
		sendAccountConfirmationEmail: vi.fn().mockResolvedValue(undefined)
	};
});

const loadApp = async () => (await import('../../index.ts')).app;

describe('Authentication routes', () => {
	beforeAll(async () => {
		await applyD1Migrations(env.Database, env.TEST_MIGRATIONS);
		await env.Database.exec(env.SEED_SQL);
	});

	describe('POST /api/auth/sign-up', () => {
		it('creates profile and activation token when payload is valid', async () => {
			const app = await loadApp();
			const response = await app.request(
				API_ENDPOINTS.SIGN_UP,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: 'NEW',
						email: 'new@new.new',
						password: 'jfiewofjieowfjo2348219++++'
					})
				},
				env
			);

			expect(response.status).toBe(StatusCodes.OKAY);
			await expect(response.json()).resolves.toEqual({
				message: 'Created a new profile and sent an email for confirmation'
			});

			const tokens = await env.ActivationTokens.list();
			expect(tokens.keys.length).toBe(1);

			const [firstActivationTokenKey] = tokens.keys;
			if (!firstActivationTokenKey) {
				throw new Error('Activation token was not created');
			}

			const stored = await env.ActivationTokens.get(firstActivationTokenKey.name, 'json');
			expect(stored).toEqual(expect.objectContaining({
				email: 'new@new.new'
			}));

			const { sendAccountConfirmationEmail } = await import('../../email/index.ts');
			expect(sendAccountConfirmationEmail).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					email: 'new@new.new',
					// apiKey: env.RESEND_API_KEY,
					senderEmail: env.SENDER_EMAIL
				})
			);
		});

		describe('POST /api/auth/sign-in', () => {
			it('returns 201 and creates a session when credentials are valid', async () => {
				const app = await loadApp();
				const response = await app.request(API_ENDPOINTS.SIGN_IN, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(USER)
				}, env);

				expect(response.status).toBe(StatusCodes.CREATED);
				await expect(response.json()).resolves.toEqual({ message: 'Sign in successful' });
			});

			it('returns 401 login with incorrect email', async () => {
				const app = await loadApp();

				const response = await app.request(
					API_ENDPOINTS.SIGN_IN,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							...USER,
							email: 'wrong@email.com'
						})
					},
					env
				);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
				await expect(response.json()).resolves.toEqual({ message: 'Either your email/password combination is invalid, or your account is not active' });
			});

			it('returns 401 login with incorrect password', async () => {
				const app = await loadApp();

				const response = await app.request(
					API_ENDPOINTS.SIGN_IN,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							...USER,
							password: 'wrong password'
						})
					},
					env
				);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
				await expect(response.json()).resolves.toEqual({ message: 'Either your email/password combination is invalid, or your account is not active' });
			});

			it.todo('Should not log in if account is not activated');
		});
	});
});
