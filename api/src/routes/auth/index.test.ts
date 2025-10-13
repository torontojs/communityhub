import { env } from 'cloudflare:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type * as EmailModule from '../../email/index.ts';
import type * as PasswordHashingModule from '../../utils/password-hashing.ts';
import type * as PasswordStrengthModule from '../../utils/passwordStrengthCheck.ts';
import { StatusCodes } from '../../utils/responses.ts';
import type * as ProfileModule from '../profile/data.ts';
import type * as AuthDataModule from './data.ts';

const USER = {
	name: 'King Arthur',
	email: 'king.arthur@camelot.uk',
	password: 'H0lyGr@il42!'
};

vi.mock('../../../src/utils/passwordStrengthCheck.ts', async () => {
	const actual = await vi.importActual<typeof PasswordStrengthModule>(
		'../../../src/utils/passwordStrengthCheck.ts'
	);
	return {
		...actual,
		passwordStrengthCheck: vi.fn().mockReturnValue(true)
	};
});

vi.mock('../../../src/utils/password-hashing.ts', async () => {
	const actual = await vi.importActual<typeof PasswordHashingModule>(
		'../../../src/utils/password-hashing.ts'
	);
	return {
		...actual,
		hashPassword: vi.fn().mockResolvedValue('hashed-password')
	};
});

vi.mock('../../../src/routes/auth/data.ts', async () => {
	const actual = await vi.importActual<typeof AuthDataModule>(
		'../../../src/routes/auth/data.ts'
	);
	return {
		...actual,
		checkExistingEmail: vi.fn().mockResolvedValue(false),
		updateProfileStatus: vi.fn().mockResolvedValue(undefined)
	};
});

vi.mock('../../../src/routes/profile/data.ts', async () => {
	const actual = await vi.importActual<typeof ProfileModule>(
		'../../../src/routes/profile/data.ts'
	);
	return {
		...actual,
		insertProfile: vi.fn().mockResolvedValue({ id: '3c5123c0-8548-4a02-a83c-32e9ce67eae8' })
	};
});

vi.mock('../../../src/email/index.ts', async () => {
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
	beforeEach(async () => {
		vi.clearAllMocks();

		const activationKeys = await env.ActivationTokens.list();
		await Promise.all(activationKeys.keys.map(({ name }) => env.ActivationTokens.delete(name)));

		const sessionKeys = await env.SessionTokens.list();
		await Promise.all(sessionKeys.keys.map(async ({ name }) => env.SessionTokens.delete(name)));
	});

	describe('POST /api/auth/sign-up', () => {
		it('creates profile and activation token when payload is valid', async () => {
			const app = await loadApp();
			const response = await app.request(
				'/api/auth/sign-up',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(USER)
				},
				env
			);

			expect(response.status).toBe(StatusCodes.OKAY);
			await expect(response.json()).resolves.toEqual({
				message: 'Created a new profile and sent an email for confirmation'
			});

			const { hashPassword } = await import('../../utils/password-hashing.ts');
			expect(hashPassword).toHaveBeenCalledWith('H0lyGr@il42!');

			const { insertProfile } = await import('../../routes/profile/data.ts');
			expect(insertProfile).toHaveBeenCalledWith(env.Database, {
				...USER,
				password: 'hashed-password'
			});

			const tokens = await env.ActivationTokens.list();
			expect(tokens.keys.length).toBe(1);

			const [firstActivationTokenKey] = tokens.keys;
			if (!firstActivationTokenKey) {
				throw new Error('Activation token was not created');
			}

			const stored = await env.ActivationTokens.get(firstActivationTokenKey.name, 'json');
			expect(stored).toMatchObject({
				email: 'king.arthur@camelot.uk',
				id: '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
			});

			const { sendAccountConfirmationEmail } = await import('../../email/index.ts');
			expect(sendAccountConfirmationEmail).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					email: USER.email,
					// apiKey: env.RESEND_API_KEY,
					senderEmail: env.SENDER_EMAIL,
					token: expect.any(String)
				})
			);
		});

		it('returns 200 but skips creation when email already exists', async () => {
			const app = await loadApp();

			const { checkExistingEmail } = await import('../../routes/auth/data.ts');
			vi.mocked(checkExistingEmail).mockResolvedValueOnce(true);

			const response = await app.request(
				'/api/auth/sign-up',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(USER)
				},
				env
			);

			expect(response.status).toBe(StatusCodes.OKAY);

			const { insertProfile } = await import('../../routes/profile/data.ts');
			const { sendAccountConfirmationEmail } = await import('../../email/index.ts');

			expect(insertProfile).not.toHaveBeenCalled();
			expect(sendAccountConfirmationEmail).not.toHaveBeenCalled();
		});

		it('returns 422 when password fails strength check', async () => {
			const app = await loadApp();

			const { passwordStrengthCheck } = await import('../../utils/passwordStrengthCheck.ts');
			vi.mocked(passwordStrengthCheck).mockReturnValueOnce(false);

			const response = await app.request(
				'/api/auth/sign-up',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(USER)
				},
				env
			);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_CONTENT);
			await expect(response.json()).resolves.toEqual({
				message: 'Weak Password found'
			});

			const tokens = await env.ActivationTokens.list();
			expect(tokens.keys).toHaveLength(0);
		});
	});
});
