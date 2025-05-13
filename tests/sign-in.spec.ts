import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
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

        
        page.close();
    });

    test('Enter invalid password', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/sign-in/');

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').fill("test@gmail.com")
        await page.locator('#password-input').fill("xxxxxxxxx");


        await red_button.isVisible();

        await red_button.click();

        
        page.close();
    });

    test('Enter invalid email', async ({ page }) => {
        await page.goto('http://localhost:3000/pages/sign-in/');

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').fill("xxxxxx");
        await page.locator('#password-input').fill("password");

        const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });


        await red_button.isVisible();

        await expect(red_button).toHaveCSS('background-color', `rgb(237, 52, 63)`);
        await expect(red_button).toHaveCSS('accent-color', `rgb(237, 55, 49)`);
        await expect(red_button).toHaveCSS('color', `rgb(255, 255, 255)`);

        await red_button.click();

        
        page.close();
    });

    test('Social Media Footer Check', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();

        await page.goto('http://localhost:3000/pages/sign-in/');

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        /*
        const tt = await page.getByRole('list').all();

        for(const t of tt) {
            console.log(t.allInnerTexts);

        } */

        const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });

        await page.locator('#email-input').fill("test@gmail.com")
        await page.locator('#password-input').fill("xxx");


        await red_button.isVisible();

        await red_button.click();

        const home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        const youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        const instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        const twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        const linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);
        

        const [newPage_0] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            home_icon.click()
        ]);
        
        await expect(newPage_0).toHaveURL("https://torontojs.com/");
        let pp = await newPage_0.evaluate(() => window.location.href)
        console.log(pp);
        newPage_0.close();

        const [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            youtube_icon.click()
        ]);
        
        await expect(newPage_1).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
        pp = await newPage_1.evaluate(() => window.location.href)
        console.log(pp);
        newPage_1.close();

        const [newPage_2] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            instagram_icon.click(),
        ]);

        await expect(newPage_2).toHaveURL("https://www.instagram.com/toronto.js/");
        pp = await newPage_2.evaluate(() => window.location.href)
        console.log(pp);
        newPage_2.close();

        const [newPage_3] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            twitter_x_icon.click()
        ]);

        // await expect(newPage_3).toHaveURL("https://twitter.com/torontojs");
        pp = await newPage_3.evaluate(() => window.location.href)
        console.log(pp);
        expect(pp.includes("x.com"));

        await newPage_3.getByTestId('app-bar-close').click();
        newPage_3.close();

        const [newPage_4] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            linkedin_icon.click()
        ]);

        await expect(newPage_4).toHaveURL("https://www.linkedin.com/company/torontojs");
        pp = await newPage_4.evaluate(() => window.location.href)
        console.log(pp);
        newPage_4.close();

        page.close();
    });

});