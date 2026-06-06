import { applyD1Migrations, env } from 'cloudflare:test';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { activateProfile, checkActiveEmail, checkExistingEmail, getHeartbeatInfo, getLoginInfo } from './data.ts';

beforeAll(async () => {
	await applyD1Migrations(env.Database, env.TEST_MIGRATIONS);
});

beforeEach(async () => {
	await env.Database.exec(env.SEED_SQL);
});

describe('Auth data functions test', () => {
	describe('getLoginInfo', () => {
		it('retrieves credentials when a matching active profile exist', async () => {
			const email = 'king.arthur@camelot.uk';

			const result = await getLoginInfo(env.Database, email);

			expect(result).toEqual({
				id: '3c5123c0-8548-4a02-a83c-32e9ce67eae8',
				password: '93BLyQ4D5SV2T/WV0e8gvQ==:ppVJhUYl+QxiDb6I1OSN0oOlgRPX1BnW1Y5hbLbsSpX25KVau2jYLAvgUtKlPwdpWl/AjzMz3DDi0TNbcOcVcw==',
				access: 'organizer'
			});
		});

		it('returns no credentials for an unknown email', async () => {
			const result = await getLoginInfo(env.Database, 'notfound@example.com');
			expect(result).toBeNull();
		});
	});

	describe('getHeartbeatInfo', () => {
		it('returns heartbeat details for an active user', async () => {
			const userId = '3c5123c0-8548-4a02-a83c-32e9ce67eae8';

			const result = await getHeartbeatInfo(env.Database, userId);

			expect(result).toEqual({
				id: userId,
				access: 'organizer',
				name: 'King Arthur',
				avatar: 'https://gravatar.com/avatar/0000000000000000000000000000000000000000000000000000000000000002?s=200&d=robohash&r=g',
				status: 'profile-completed'
			});
		});

		it('returns no heartbeat details for an unknown user id', async () => {
			const result = await getHeartbeatInfo(env.Database, 'nonexistent-id');
			expect(result).toBeNull();
		});
	});

	describe('checkExistingEmail', () => {
		it('detects that an email already exists', async () => {
			const exists = await checkExistingEmail(env.Database, 'king.arthur@camelot.uk');
			expect(exists).toBe(true);
		});

		it('detects that an email does not exist', async () => {
			const exists = await checkExistingEmail(env.Database, 'none@example.com');
			expect(exists).toBe(false);
		});
	});

	describe('checkActiveEmail', () => {
		it('reports an email as active when the profile is active', async () => {
			const isActive = await checkActiveEmail(env.Database, 'king.arthur@camelot.uk');
			expect(isActive).toBe(true);
		});

		it('reports an email as inactive when the profile is inactive', async () => {
			const isActive = await checkActiveEmail(env.Database, 'inactive@example.com');
			expect(isActive).toBe(false);
		});
	});

	describe('activateProfile', () => {
		it('activates the profile for a known email and signals success', async () => {
			const email = 'king.arthur@camelot.uk';

			const result = await activateProfile(env.Database, email);

			expect(result).toBe(true);

			const isActive = await checkActiveEmail(env.Database, email);
			expect(isActive).toBe(true);
		});
	});
});
