import { expect, test } from '@playwright/test';

const profileId = '11111111-1111-4111-8111-111111111111';
const teamId = '22222222-2222-4222-8222-222222222222';

const profile = {
	id: profileId,
	name: 'Ada Lovelace',
	description: 'Builds tools for the community.',
	isBasedOnGTA: true,
	canJoinLocalEvents: true,
	pronouns: 'she/her',
	links: [],
	skills: ['JavaScript', 'Accessibility'],
	teams: [{ id: teamId, name: 'Website Team', role: 'Developer', memberCount: 4 }]
};

const team = {
	id: teamId,
	name: 'Website Team',
	description: 'Builds the TorontoJS website.',
	memberCount: 1
};

test('public profile cards are anonymous, responsive, and link to public details', async ({ page }) => {
	await page.route('**/api/profiles?*', async (route) =>
		route.fulfill({
			json: { data: [profile], currentPage: 1, lastPage: 1, total: 1 }
		}));
	await page.setViewportSize({ width: 390, height: 844 });

	await page.goto('/pages/public-profiles/');

	await expect(page).toHaveURL(/\/pages\/public-profiles\/?$/u);
	await expect(page.getByRole('navigation', { name: 'Public navigation' })).toBeVisible();
	await expect(page.locator('.sidebar-left')).toHaveCount(0);
	await expect(page.getByRole('heading', { name: 'Ada Lovelace' })).toBeVisible();
	await expect(page.getByText('ada@example.com')).toHaveCount(0);
	await expect(page.getByRole('link', { name: /Ada Lovelace/u })).toHaveAttribute('href', `/pages/public-profile/?id=${profileId}`);
	await expect(page.locator('.public-profile-card')).toHaveCSS('min-width', '0px');
});

test('public profile detail uses public team links and excludes private fields', async ({ page }) => {
	await page.route(`**/api/profiles/${profileId}`, async (route) => route.fulfill({ json: { data: profile } }));

	await page.goto(`/pages/public-profile/?id=${profileId}`);

	await expect(page.getByRole('heading', { name: 'Ada Lovelace', level: 1 })).toBeVisible();
	await expect(page.getByText('ada@example.com')).toHaveCount(0);
	await expect(page.getByRole('link', { name: /Website Team/u })).toHaveAttribute('href', `/pages/public-team/?id=${teamId}`);
	await expect(page.getByRole('button', { name: /edit|add|remove/iu })).toHaveCount(0);
});

test('public team cards link to public team details', async ({ page }) => {
	await page.route('**/api/teams?*', async (route) =>
		route.fulfill({
			json: { data: [team], currentPage: 1, lastPage: 1, total: 1 }
		}));

	await page.goto('/pages/public-teams/');

	await expect(page).toHaveURL(/\/pages\/public-teams\/?$/u);
	await expect(page.locator('.sidebar-left')).toHaveCount(0);
	await expect(page.getByRole('link', { name: 'Website Team' })).toHaveAttribute('href', `/pages/public-team/?id=${teamId}`);
});

test('public team detail renders member cards linked to public profiles', async ({ page }) => {
	await page.route(`**/api/teams/${teamId}/members?*`, async (route) =>
		route.fulfill({
			json: {
				data: [{
					id: '33333333-3333-4333-8333-333333333333',
					profileId,
					profileName: 'Ada Lovelace',
					name: 'Developer',
					isBasedOnGTA: true,
					joinedTeamAt: '2025-01-01T00:00:00Z'
				}],
				currentPage: 1,
				lastPage: 1,
				total: 1
			}
		}));
	await page.route(`**/api/teams/${teamId}`, async (route) => route.fulfill({ json: { data: team } }));

	await page.goto(`/pages/public-team/?id=${teamId}`);

	await expect(page.getByRole('heading', { name: 'Members (1)' })).toBeVisible();
	await expect(page.getByRole('link', { name: /Ada Lovelace/u })).toHaveAttribute('href', `/pages/public-profile/?id=${profileId}`);
	await expect(page.getByText('ada@example.com')).toHaveCount(0);
	await expect(page.getByRole('button', { name: /edit|add|remove/iu })).toHaveCount(0);
});
