import { test, expect } from '@playwright/test';

const url_val = "http://localhost:3000/pages/team/";

test('Select ', async ({ page }) => {
    await page.goto(url_val);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Team/);

    await page.getByRole('link', { name: 'Team John Doe Avatar John Doe' }).first().click();
  });