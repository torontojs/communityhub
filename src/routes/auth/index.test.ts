import { describe, expect, test } from 'vitest';
import app from '../../index.ts';
import type { StatusResponse } from '../../utils/responses.ts';
import { MockEnvBindings } from '../../utils/testing.ts';

const MOCK_ENV = new MockEnvBindings();

describe('Sign-up route', () => {
	const signUpResponse = async (email: string, password: string, name: string) => {
		const response = await app.request('/auth/sign-up', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				email,
				password,
				name
			})
		}, MOCK_ENV);

		const json: StatusResponse = await response.json();
		console.log('SIGN-UPPITY', json);
		return json;
	};

	test('Failure: registration should be valid email', async () => {
		const json: StatusResponse = await signUpResponse('vitest', 'hashed_password_1', 'Vitest');
		expect(json.errors).toHaveProperty('email');
	});

	test.todo('Failure: registration should fail if email is already registered');
	test.todo('Failure: registration should have valid password');
	test.todo('Failure: registration should have name');

	test('Registration successful', async () => {
		const json: StatusResponse = await signUpResponse('vitest@example.com', 'hashed_password_1', 'Vitest');

		expect(json.message).toBe('Created a new profile and sent an email for confirmation');
	});

	test.todo('failure: activation should not be successful if incorrect token');

	test.todo('failure: activation should not be successful if token expired');

	test('Activation successful', async () => {
		const response = await app.request(
			`/auth/activate?token=${crypto.randomUUID()}`,
			{
				method: 'GET'
			},
			new MockEnvBindings({
				activations: {
					// @ts-expect-error
					get: () => 'test@email.com'
				}
			})
		);

		const json: StatusResponse = await response.json();

		expect(json.message).toBe('Account activated successfully');
	});
});

describe('Sign-in route', () => {
	test('Failure: Should not log in with incorrect username and/or password', async () => {
		const response = await app.request('/auth/sign-in', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				email: 'notfound@example.com',
				password: 'wrong'
			})
		}, MOCK_ENV);

		const json: StatusResponse = await response.json();

		expect(response.status).equals(401);
		expect(json.message).toBe('Either your email/password combination is invalid, or your account is not active');
	});
	test.todo('Should not log in if account is not activated');

	test.skip('Success: Should log in successfully with correct username and password', async () => {
		const response = await app.request('/auth/sign-in', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				email: 'profile1@example.com',
				password: 'hashed_password_1'
			})
		}, MOCK_ENV);
		console.log('SIGN-INNIT', response);
		const json: StatusResponse = await response.json();

		expect(json.message).toBe('Authorized successfully');
	});
});

describe('Sign-out route', () => {
	test.todo('Bad request if invalid token provided');
	test.todo('User is successfully logged out');
});
