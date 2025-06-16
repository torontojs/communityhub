import { expect } from '@playwright/test';
import { test } from './base.ts';
import { execPath } from 'process';

test.beforeEach( async ({checkEmailPage }) => {
    test.setTimeout(50000) // Sets a 40-second timeout for all tests
    checkEmailPage.navigate();
});

test.afterEach( async ({checkEmailPage }) => {
    test.setTimeout(500) // Sets a 40-second timeout for all tests
    checkEmailPage.page.close();
});

test.describe('USER CHECK YOUR EMAIL Suite', () => {
    test('Social Media Footer Check', async ({ checkEmailPage }) => {

            await checkEmailPage.page_title.isVisible();
            await checkEmailPage.home_icon.isVisible();
            await checkEmailPage.youtube_icon.isVisible();
            await checkEmailPage.instagram_icon.isVisible();
            await checkEmailPage.twitter_x_icon.isVisible();
            await checkEmailPage.linkedin_icon.isVisible();

            
            /*
            const home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
            const youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
            const instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
            const twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
            const linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);
            */

            const [newPage_0] = await Promise.all([
                checkEmailPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
                checkEmailPage.home_icon.click()
            ]);
            
            await expect(newPage_0).toHaveURL("https://torontojs.com/");
            let pp = await newPage_0.evaluate(() => window.location.href)
            console.log(pp);
            newPage_0.close();

            const [newPage_1] = await Promise.all([
                checkEmailPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
                checkEmailPage.youtube_icon.click()
            ]);
            
            await expect(newPage_1).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
            pp = await newPage_1.evaluate(() => window.location.href)
            console.log(pp);
            newPage_1.close();

            const [newPage_2] = await Promise.all([
                checkEmailPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
                checkEmailPage.instagram_icon.click(),
            ]);

            await expect(newPage_2).toHaveURL("https://www.instagram.com/toronto.js/");
            pp = await newPage_2.evaluate(() => window.location.href)
            console.log(pp);
            newPage_2.close();

            const [newPage_3] = await Promise.all([
                checkEmailPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
                checkEmailPage.twitter_x_icon.click()
            ]);

            // await expect(newPage_3).toHaveURL("https://twitter.com/torontojs");
            pp = await newPage_3.evaluate(() => window.location.href)
            console.log(pp);
            expect(pp.includes("x.com"));

            // await newPage_3.getByTestId('app-bar-close').click();
            checkEmailPage.page.on('dialog', dialog => dialog.accept());
            
            newPage_3.close();

            const [newPage_4] = await Promise.all([
                checkEmailPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
                checkEmailPage.linkedin_icon.click()
            ]);

            await expect(newPage_4).toHaveURL("https://www.linkedin.com/company/torontojs");
            pp = await newPage_4.evaluate(() => window.location.href)
            console.log(pp);
            newPage_4.close();

    });

    

});
