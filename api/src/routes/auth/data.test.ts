/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { beforeEach, describe, expect, test } from 'vitest';
import { Access, type AccessLevel } from '../../utils/auth.ts';
import { MockEnvBindings } from '../../utils/testing.ts';
import {
	checkActiveEmail,
	checkExistingEmail,
	getHeartbeatInfo,
	getLoginInfo
} from './data.ts';

interface User {
	id: string;
	email: string;
	password: string;
	access: AccessLevel;
	name: string;
	avatar?: string;
}

const sampleUser: User = {
	id: '3227114d-43c4-42ed-8aea-f3860fe42222',
	email: 'profile1@example.com',
	password: 'hashed-password',
	access: Access.ORGANIZER,
	name: 'John Doe',
	avatar: 'avatar-url'
};

describe('Auth Data Functions', () => {
	let env: MockEnvBindings;

	beforeEach(() => {
		env = new MockEnvBindings();
	});

	describe('getLoginInfo', () => {
		test('returns login info for activated, non-deleted user', async () => {
			const mockUser = {
				id: sampleUser.id,
				password: sampleUser.password,
				access: sampleUser.access
			};

			env.setDatabase({
				first: <T>() => mockUser as T
			});

			const result = await getLoginInfo(env.Database, sampleUser.email);

			expect(result).toEqual({
				id: sampleUser.id,
				password: sampleUser.password,
				access: sampleUser.access
			});
		});

		test('returns null if no matching user found', async () => {
			const result = await getLoginInfo(env.Database, 'notfound@example.com');

			expect(result).toBeNull();
		});
	});

	describe('getHeartbeatInfo', () => {
		test('returns heartbeat info for activated user', async () => {
			const mockUser = {
				id: sampleUser.id,
				access: sampleUser.access,
				name: sampleUser.name,
				avatar: sampleUser.avatar
			};

			env.setDatabase({
				first: <T>() => mockUser as T
			});

			const result = await getHeartbeatInfo(env.Database, sampleUser.id);

			expect(result).toEqual({
				id: sampleUser.id,
				access: sampleUser.access,
				name: sampleUser.name,
				avatar: sampleUser.avatar
			});
		});

		test('returns null if user is not found', async () => {
			const result = await getHeartbeatInfo(env.Database, 'nonexistent-id');

			expect(result).toBeNull();
		});
	});

	describe('checkExistingEmail', () => {
		test('returns true if email exists', async () => {
			env.setDatabase({
				first: <T>() => ({ email: sampleUser.email }) as T
			});

			const result = await checkExistingEmail(env.Database, sampleUser.email);

			expect(result).toBe(true);
		});

		test('returns false if email does not exist', async () => {
			const result = await checkExistingEmail(env.Database, 'none@example.com');

			expect(result).toBe(false);
		});
	});

	describe('checkActiveEmail', () => {
		test('returns true if email is active', async () => {
			env.setDatabase({
				first: <T>() => ({ email: sampleUser.email }) as T
			});

			const result = await checkActiveEmail(env.Database, sampleUser.email);

			expect(result).toBe(true);
		});

		test('returns false if email is inactive', async () => {
			env.setDatabase({
				first: <T>() => null as T
			});

			const result = await checkActiveEmail(env.Database, 'inactive@example.com');

			expect(result).toBe(false);
		});
	});

	describe('activateProfile', () => {
		test.todo('returns true when update succeeds');
		test.todo('returns false when update fails');
	});
});
