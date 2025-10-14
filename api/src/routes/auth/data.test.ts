import { env } from 'cloudflare:test';
import { applyD1Migrations } from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import { getLoginInfo } from './data.ts';

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

	it('returns credentials for an active, non-deleted profile', async () => {
		const result = await getLoginInfo(env.Database, 'king.arthur@camelot.uk');

		expect(result).toEqual(expect.objectContaining({
			id: USER.id,
			password: USER.password,
			access: USER.access
		}));
	});
});
