import { expect, test } from '@playwright/test';

const url_val = 'http://localhost:3000/pages/profile/';

test('has title', async ({ page }) => {
	await page.goto(url_val);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Profile/);

	await page.getByRole('link', { name: 'Team John Doe Avatar John Doe' }).first().click();
});
