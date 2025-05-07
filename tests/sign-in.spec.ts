import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test.describe('SIGN-IN Test Suite', () => {
    test('Check page Elements and Text', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/sign-in/');

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').isVisible();
        await page.locator('#password-input').isVisible();


        await page.getByRole('button', { name: 'Log in'}).isVisible();

        
        page.close;
    });

});