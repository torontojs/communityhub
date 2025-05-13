import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';

const url_1 = "http://localhost:3000/pages/sign-up/";


test.describe('SIGN-UP Test Suite', () => {
    test('Check page Elements and Text', async ({ page }) => {
        await page.goto(url_1);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        await page.getByRole('heading', { name: 'Sign Up to TorontoJS' }).isVisible();

        await page.getByRole('heading', { name: 'Welcome! Let\'s set up your' }).isVisible();

        const login_form = page.locator('.login-form');

        await expect(login_form).toHaveCSS('justify-content', 'center');
        await expect(login_form).toHaveCSS('border-radius', '8px');

        await page.locator('#name-input').isVisible();

        await page.locator('#email-input').isVisible();
        await page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();

        await page.locator('#password-input').isVisible();


        await red_button.isVisible();

        console.log('Checking page Elements and Text');
        page.close();
    });

    test('TEST Password Strength METER with weak passwords', async ({ page }) => {

        const weak_passwords = ["password", "123456", "abcde", "aba", "JJJJJJJ"];

        await page.goto(url_1);
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        const m1 = page.locator(".password-meter .password-meter-level").first();
        const m2 = page.locator(".password-meter .password-meter-level").nth(1);
        const m3 = page.locator(".password-meter .password-meter-level").nth(2);


        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");

        for(let w = 0; w < weak_passwords.length; w++) { 
            await page.waitForTimeout(500);
            console.log("WEAK PASSWORD " + (w + 1) + ": " + weak_passwords[w]);
            await page.locator('#password-input').fill(weak_passwords[w]);

            await expect(m1).toHaveCSS('background-color', 'rgb(255, 0, 0)');
            await expect(m2).toHaveCSS('background-color', 'rgb(128, 128, 128)');
            await expect(m3).toHaveCSS('background-color', 'rgb(128, 128, 128)');
            
        }


        await red_button.isVisible();

        // await red_button.click();

        
         page.close();
    });

    test('TEST Password Strength METER with FAIR passwords', async ({ page }) => {

        const fair_passwords = ["super_1", "password_1", "extra_2", "toronto@"];

        await page.goto(url_1);
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        const m1 = page.locator(".password-meter .password-meter-level").first();
        const m2 = page.locator(".password-meter .password-meter-level").nth(1);
        const m3 = page.locator(".password-meter .password-meter-level").nth(2);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");

        for(let f = 0; f < fair_passwords.length; f++) { 
            console.log("FAIR PASSWORD " + (f + 1) + ": " + fair_passwords[f]);
            await page.locator('#password-input').fill(fair_passwords[f]);
            await page.waitForTimeout(500);

            await expect(m1).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(m2).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(m3).toHaveCSS('background-color', 'rgb(128, 128, 128)');

        }

        await red_button.isVisible();

        // await red_button.click();

        
        page.close();
    });

    test('TEST Password Strength METER with GOOD passwords', async ({ page }) => {

        await page.waitForTimeout(800);
        const good_passwords = ["tester_123", "welcome_123", "security_123", "good_password"];

        await page.goto(url_1);
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        const m1 = page.locator(".password-meter .password-meter-level").first();
        const m2 = page.locator(".password-meter .password-meter-level").nth(1);
        const m3 = page.locator(".password-meter .password-meter-level").nth(2);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");

        
        for(let g = 0; g < good_passwords.length; g++) { 
            console.log("GOOD PASSWORD " + (g + 1) + ": " + good_passwords[g]);
            await page.locator('#password-input').fill(good_passwords[g]);
            await page.waitForTimeout(800);

            await expect(m1).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(m2).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(m3).toHaveCSS('background-color', 'rgb(128, 128, 128)');

        }

        await red_button.isVisible();

        // await red_button.click();

        
        page.close();
    });

    test('TEST Password Strength METER with STRONG passwords', async ({ page }) => {

        const strong_passwords = ["super_password123", "super_long", "strong_password", "qatester_123"];

        await page.goto(url_1);
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        const m1 = page.locator(".password-meter .password-meter-level").first();
        const m2 = page.locator(".password-meter .password-meter-level").nth(1);
        const m3 = page.locator(".password-meter .password-meter-level").nth(2);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");


        for(let s = 0; s < strong_passwords.length; s++) { 
            await page.waitForTimeout(800);
            await page.locator('#password-input').fill(strong_passwords[s]);

            await expect(m1).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(m2).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(m3).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            console.log("STRONG PASSWORD " + (s + 1) + ": " + strong_passwords[s]);

        }

        await red_button.isVisible();

         page.close();
    });

    test('TEST Password Strength METER with VERY STRONG passwords', async ({ page }) => {

        const very_strong_passwords = ["tester_1234!@#$", "tester_2345@#$%", "QAtester_1234", "theTester_1234"];

        await page.waitForTimeout(1800);

        await page.goto(url_1);
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        const m1 = page.locator(".password-meter .password-meter-level").first();
        const m2 = page.locator(".password-meter .password-meter-level").nth(1);
        const m3 = page.locator(".password-meter .password-meter-level").nth(2);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");

        for(let vs = 0; vs < very_strong_passwords.length; vs++) { 
            await page.waitForTimeout(1500);
            await page.locator('#password-input').fill(very_strong_passwords[vs]);

            console.log("VERY STRONG PASSWORD " + (vs + 1) + ": " + very_strong_passwords[vs]);

            await expect(m1).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(m2).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(m3).toHaveCSS('background-color', 'rgb(0, 153, 0)');

        }

        await red_button.isVisible();

        // await red_button.click();

         page.close();
    });

    test('Enter Invalid Password Test', async ({ page }) => {
        
        await page.goto(url_1);
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");

        await page.locator('#password-input').fill("xxxxxxxxx");

        await red_button.isVisible();

        await red_button.click();

        
        page.close();
    });

    test('Enter invalid email', async ({ page }) => {
        await page.goto(url_1);

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');
        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username);

        await page.locator('#name-input').fill(username);


        await page.locator('#email-input').fill("xxxxxx");
        await page.locator('#password-input').fill("password");


        await red_button.isVisible();

        await expect(red_button).toHaveCSS('background-color', `rgb(237, 52, 63)`);

        await red_button.click();

        
        page.close();
    });

    test('Social Media Footer Check', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();
        const red_button = page.getByRole('button', { name: 'Create Account' });

        await page.goto(url_1);

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        await page.locator('#email-input').fill("test@gmail.com")
        await page.locator('#password-input').fill("xxx");


        await red_button.isVisible();

       // await red_button.click();

        const home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        const youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        const instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        const twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        const linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);

        const [homePage] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            home_icon.click()
        ]);

        console.log(url_1);
        
        await expect(homePage).toHaveURL("https://torontojs.com/");
        let pp = await homePage.evaluate(() => window.location.href)
        console.log(pp);
        homePage.close(); 

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