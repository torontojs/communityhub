import { expect, test } from '@playwright/test';

const protectedRoutes = [
	'/pages/teams/',
	'/pages/team/?id=00000000-0000-0000-0000-000000000000',
	'/pages/profile/?id=00000000-0000-0000-0000-000000000000',
	'/pages/protected-profile/',
	'/pages/volunteer/',
	'/pages/notifications/',
	'/pages/protected-page-all/',
	'/pages/protected-page-organizers/',
	'/pages/protected-page-admins/'
];

for (const route of protectedRoutes) {
	test(`${route} redirects unauthenticated visitors to sign in`, async ({ page }) => {
		await page.goto(route);

		await expect(page).toHaveURL(/\/pages\/sign-in\/?$/u);
	});
}
