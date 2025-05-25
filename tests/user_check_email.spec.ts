import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test.describe('USER CHECK YOUR EMAIL Suite', () => {
    test('Social Media Footer Check', async ({ browser }) => {

            const browser_context = await browser.newContext();
            const page = await browser_context.newPage();

            await page.goto('http://localhost:3000/pages/check-your-email/');

            await page.getByRole('heading', {name: 'Check your e-mail'}).isVisible()


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

            await page.close();
    });

});
