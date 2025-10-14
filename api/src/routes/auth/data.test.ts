import { env } from 'cloudflare:test';
import { applyD1Migrations } from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import { activateProfile, checkActiveEmail, checkExistingEmail, getHeartbeatInfo, getLoginInfo } from './data.ts';

const USER = {
	id: '3c5123c0-8548-4a02-a83c-32e9ce67eae8',
	email: 'king.arthur@camelot.uk',
	password: 'saMwRm9Sfm0QSkmxgAIadA==:1pkHxwpYK2HCWlItbMNfJ0XmvTmnTXD2l70s5GMLtMUC85fhbMU9B0VKSFzWALQXtc945LB5zsKNg0w1cybCKA==',
	name: 'King Arthur',
	access: 'organizer'
};

describe('Auth data functions', () => {
	beforeAll(async () => {
		await applyD1Migrations(env.Database, env.TEST_MIGRATIONS);
		await env.Database.exec(env.SEED_SQL);
	});

	describe('getLoginInfo', () => {
		it('returns credentials for an active, non-deleted profile', async () => {
			const result = await getLoginInfo(env.Database, 'king.arthur@camelot.uk');

			expect(result).toEqual({
				id: USER.id,
				password: USER.password,
				access: USER.access
			});
		});

		it('returns null if no matching user found', async () => {
			const result = await getLoginInfo(env.Database, 'notfound@example.com');

			expect(result).toBeNull();
		});
	});

	describe('getHeartbeatInfo', () => {
		it('returns heartbeat info for activated user', async () => {
			const result = await getHeartbeatInfo(env.Database, USER.id);

			expect(result).toEqual({
				id: USER.id,
				access: USER.access,
				name: USER.name,
				avatar: null,
				status: 'profile-completed'
			});
		});

		it('returns null if user is not found', async () => {
			const result = await getHeartbeatInfo(env.Database, 'nonexistent-id');
			expect(result).toBeNull();
		});
	});

	describe('checkExistingEmail', () => {
		it('returns true if email exists', async () => {
			const result = await checkExistingEmail(env.Database, USER.email);

			expect(result).toBe(true);
		});

		it('returns false if email does not exist', async () => {
			const result = await checkExistingEmail(env.Database, 'none@example.com');

			expect(result).toBe(false);
		});
	});

	describe('checkActiveEmail', () => {
		it('returns true if email is active', async () => {
			const result = await checkActiveEmail(env.Database, USER.email);

			expect(result).toBe(true);
		});

		it('returns false if email is inactive', async () => {
			const result = await checkActiveEmail(env.Database, 'inactive@example.com');

			expect(result).toBe(false);
		});
	});

	describe('activateProfile', () => {
		it('returns true when update succeeds', async () => {
			const result = await activateProfile(env.Database, USER.email);

			expect(result).toBe(true);
		});

		it.todo('returns false when update fail');
	});
});
