import { applyD1Migrations, env } from 'cloudflare:test';
import { assert, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { app } from '../../index.ts';
import { StatusCodes } from '../../utils/responses.ts';

const ORGANIZER_ID = '3c5123c0-8548-4a02-a83c-32e9ce67eae8';

beforeAll(async () => {
	await applyD1Migrations(env.Database, env.TEST_MIGRATIONS);
});

beforeEach(async () => {
	await env.Database.exec(env.SEED_SQL);
	const sessionKeys = await env.SessionTokens.list();
	await Promise.all(sessionKeys.keys.map(async ({ name }) => env.SessionTokens.delete(name)));
});

async function signIn(email: string, password: string) {
	const response = await app.request('/api/auth/sign-in', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	}, env);
	const setCookie = response.headers.get('set-cookie');

	expect(response.status).toBe(StatusCodes.OKAY);
	assert(setCookie, 'Sign-in response should include a cookie.');
	const [cookie] = setCookie.split(';');
	assert(cookie, 'Session cookie should exist.');
	return cookie;
}

describe('Email campaign routes', () => {
	test('allows organizers to load audience options', async () => {
		const cookie = await signIn('king.arthur@camelot.uk', 'H0lyGr@il42!L0rd');
		const response = await app.request('/api/email-campaigns/audience-options', {
			headers: { Cookie: cookie }
		}, env);
		const data = await response.json<{ profiles: unknown[], teams: unknown[] }>();

		expect(response.status).toBe(StatusCodes.OKAY);
		expect(data.profiles.length).toBeGreaterThan(0);
		expect(data.teams.length).toBeGreaterThan(0);
	});

	test('does not allow volunteers to preview private recipient data', async () => {
		const cookie = await signIn('sir.robin@cowardly.co', 'RunAway!1234Run');
		const response = await app.request('/api/email-campaigns/preview', {
			method: 'POST',
			headers: { 'Cookie': cookie, 'Content-Type': 'application/json' },
			body: JSON.stringify({ audience: { mode: 'all' } })
		}, env);

		expect(response.status).toBe(StatusCodes.FORBIDDEN);
	});

	test('sends once and returns the same campaign for a repeated idempotency key', async () => {
		const cookie = await signIn('king.arthur@camelot.uk', 'H0lyGr@il42!L0rd');
		const idempotencyKey = crypto.randomUUID();
		const body = JSON.stringify({
			subject: 'Community update',
			message: 'This is a test community notification.',
			audience: { mode: 'selected', profileIds: [ORGANIZER_ID] },
			idempotencyKey
		});
		const request = async () =>
			app.request('/api/email-campaigns', {
				method: 'POST',
				headers: { 'Cookie': cookie, 'Content-Type': 'application/json' },
				body
			}, env);

		const firstResponse = await request();
		const firstCampaign = await firstResponse.json<{ id: string, sentCount: number, failedCount: number }>();
		const repeatedResponse = await request();
		const repeatedCampaign = await repeatedResponse.json<{ id: string }>();
		const storedCount = await env.Database.prepare('SELECT COUNT(*) AS count FROM email_campaign WHERE idempotencyKey = ?')
			.bind(idempotencyKey)
			.first<{ count: number }>();

		expect(firstResponse.status).toBe(StatusCodes.CREATED);
		expect(firstCampaign).toMatchObject({ sentCount: 1, failedCount: 0 });
		expect(repeatedResponse.status).toBe(StatusCodes.OKAY);
		expect(repeatedCampaign.id).toBe(firstCampaign.id);
		expect(storedCount?.count).toBe(1);
	});

	test('resumes a campaign whose previous request died before every recipient was attempted', async () => {
		const cookie = await signIn('king.arthur@camelot.uk', 'H0lyGr@il42!L0rd');
		const idempotencyKey = crypto.randomUUID();
		const body = JSON.stringify({
			subject: 'Community update',
			message: 'This is a test community notification.',
			audience: { mode: 'all' },
			idempotencyKey
		});
		const request = async () =>
			app.request('/api/email-campaigns', {
				method: 'POST',
				headers: { 'Cookie': cookie, 'Content-Type': 'application/json' },
				body
			}, env);

		const firstResponse = await request();
		const firstCampaign = await firstResponse.json<{ id: string, recipientCount: number }>();
		expect(firstResponse.status).toBe(StatusCodes.CREATED);
		expect(firstCampaign.recipientCount).toBeGreaterThan(1);

		// Rewind to the state a torn-down Worker leaves behind: campaign still 'sending',
		// with one recipient never attempted.
		const strandedRecipient = await env.Database.prepare(
			'SELECT id FROM email_campaign_recipient WHERE campaignId = ? ORDER BY insertedAt LIMIT 1'
		).bind(firstCampaign.id).first<{ id: string }>();
		assert(strandedRecipient, 'Campaign should have at least one recipient.');
		await env.Database.batch([
			env.Database.prepare(
				`UPDATE email_campaign_recipient
				SET status = 'pending', providerMessageId = NULL, attemptedAt = NULL
				WHERE id = ?`
			).bind(strandedRecipient.id),
			env.Database.prepare(
				`UPDATE email_campaign SET status = 'sending', sentAt = NULL WHERE id = ?`
			).bind(firstCampaign.id)
		]);

		const resumedResponse = await request();
		const resumedCampaign = await resumedResponse.json<{ id: string, status: string, sentCount: number }>();
		const stillPending = await env.Database.prepare(
			`SELECT COUNT(*) AS count FROM email_campaign_recipient WHERE campaignId = ? AND status = 'pending'`
		).bind(firstCampaign.id).first<{ count: number }>();

		expect(resumedResponse.status).toBe(StatusCodes.OKAY);
		expect(resumedCampaign.id).toBe(firstCampaign.id);
		expect(resumedCampaign.status).toBe('sent');
		expect(resumedCampaign.sentCount).toBe(firstCampaign.recipientCount);
		expect(stillPending?.count).toBe(0);
	});
});
