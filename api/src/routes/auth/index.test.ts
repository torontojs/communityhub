import { env } from 'cloudflare:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { app } from '../../index.ts';
import type * as authModule from '../../utils/auth.ts';

type AuthModule = typeof authModule;

vi.mock('../../utils/auth.ts', async () => {
	const actual = await vi.importActual<AuthModule>('../../utils/auth.ts');
	return {
		...actual,
		revalidateSession: vi.fn().mockResolvedValue(null),
		createSession: vi.fn().mockResolvedValue(undefined)
	};
});

vi.mock('../../utils/password-hashing.ts', () => ({
	validatePassword: vi.fn().mockResolvedValue(true)
}));

vi.mock('../../routes/auth/data.ts', () => ({
	getLoginInfo: vi.fn().mockResolvedValue({
		id: 'profile-123',
		email: 'member@example.com',
		access: ['volunteer'],
		password: 'hashed',
		status: 'active'
	})
}));

describe('POST /auth/sign-in', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns 201 and creates a session for valid credentials', async () => {
		const response = await app.request(
			'/api/auth/sign-in',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: 'member@example.com', password: 'helloWorld' })
			},
			env
		);

		expect(response.status).toBe(201);

		const payload = await response.json();
		expect(payload).toEqual({ message: 'Sign in successful' });

		const { createSession } = await import('../../utils/auth.ts');
		expect(createSession).toHaveBeenCalledWith(
			expect.objectContaining({
				id: 'profile-123',
				email: 'member@example.com'
			})
		);
	});
});
