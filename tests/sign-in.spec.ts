import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';
import { SignInPage } from '../page_object_models/pom_sign-in';

const url_1 = "http://localhost:3000/pages/sign-in/";

test.describe('SIGN-IN Test Suite', () => {
    test('Check page Elements and Text', async ({ page }) => {
        // await page.goto('http://localhost:3000/pages/sign-in/');


        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        const signInPage = new SignInPage(page);

        await signInPage.navigate();

        await signInPage.page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();

        //await page.locator('#email-input').isVisible();
       // await page.locator('#password-input').isVisible();


       //  await page.getByRole('button', { name: 'Log in'}).isVisible();
        await signInPage.login_button.isVisible();
        
        await page.close();
    });

    test('Enter invalid password', async ({ page }) => {

        const signInPage = new SignInPage(page);

        await signInPage.navigate();

        await signInPage.page_title_1.isVisible()

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();

        await signInPage.fill_fields('test@gmail.com', 'xxxxxxxxx');


        await signInPage.login_button.isVisible();

        await signInPage.login_button.click();

        
        await page.close();
    });

    test('Enter invalid email', async ({ page }) => {

        const signInPage = new SignInPage(page);

        await signInPage.navigate();

        await signInPage.page_title_1.isVisible()

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();


        // await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        

        //await page.locator('#email-input').fill("xxxxxx");
        //await page.locator('#password-input').fill("password");

        await signInPage.fill_fields('xxxxxx', 'password');

        // const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });

        await signInPage.login_button.isVisible();
        // await red_button.isVisible();

        await expect(signInPage.login_button).toHaveCSS('background-color', `rgb(237, 52, 63)`);
        await expect(signInPage.login_button).toHaveCSS('accent-color', `rgb(237, 55, 49)`);
        await expect(signInPage.login_button).toHaveCSS('color', `rgb(255, 255, 255)`);

        await signInPage.login_button.click();

        
        await page.close();
    });

    test('Social Media Footer Check', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();

        const signInPage = new SignInPage(page);

        await signInPage.navigate();

        await signInPage.page_title_1.isVisible()

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();

        await signInPage.navigate();

        await signInPage.page_title_1.isVisible();

        // const username = signInPage.unique_username("Tester");

       
        /*
        const tt = await page.getByRole('list').all();

        for(const t of tt) {
            console.log(t.allInnerTexts);

        } */

        const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });

        //await page.locator('#email-input').fill("test@gmail.com")
        //await page.locator('#password-input').fill("xxx");

        await signInPage.fill_fields('test@gmail.com', 'xxx');

       //await signUpPage.fill_fields(username, "signUpPage.email_field");


        await signInPage.login_button.isVisible();

        await signInPage.login_button.click();

        /*
        const home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        const youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        const instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        const twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        const linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);
        */

        const [newPage_0] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signInPage.home_icon.click()
        ]);
        
        await expect(newPage_0).toHaveURL("https://torontojs.com/");
        let pp = await newPage_0.evaluate(() => window.location.href)
        console.log(pp);
        newPage_0.close();

        const [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signInPage.youtube_icon.click()
        ]);
        
        await expect(newPage_1).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
        pp = await newPage_1.evaluate(() => window.location.href)
        console.log(pp);
        newPage_1.close();

        const [newPage_2] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signInPage.instagram_icon.click(),
        ]);

        await expect(newPage_2).toHaveURL("https://www.instagram.com/toronto.js/");
        pp = await newPage_2.evaluate(() => window.location.href)
        console.log(pp);
        newPage_2.close();

        const [newPage_3] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signInPage.twitter_x_icon.click()
        ]);

        // await expect(newPage_3).toHaveURL("https://twitter.com/torontojs");
        pp = await newPage_3.evaluate(() => window.location.href)
        console.log(pp);
        expect(pp.includes("x.com"));

        await newPage_3.getByTestId('app-bar-close').click();
        newPage_3.close();

        const [newPage_4] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signInPage.linkedin_icon.click()
        ]);

        await expect(newPage_4).toHaveURL("https://www.linkedin.com/company/torontojs");
        pp = await newPage_4.evaluate(() => window.location.href)
        console.log(pp);
        newPage_4.close();

        await page.close();
    });

    test('Javascript Injection Test', async ({ page }) => {
            
            const signInPage = new SignInPage(page);

            await signInPage.navigate();

            await signInPage.page_title_1.isVisible()

            await signInPage.email_field.isVisible();
            await signInPage.password_field.isVisible();

            await signInPage.navigate();

            await signInPage.page_title_1.isVisible();

    
            // const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });
    

            await signInPage.fill_fields("alert('Hello')", 'xxx');
            await signInPage.email_field.isVisible();
            await signInPage.password_field.isVisible();
    
            /*
            await page.locator('#email-input').isVisible();
            await page.locator('#email-input').fill("alert('Hello')");
            await page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();
            */

            //await page.locator('#password-input').isVisible();
            //await page.locator('#password-input').fill("alert('Hello')");
    
            

            await page.waitForTimeout(4000);
    
            await signInPage.login_button.isVisible();
            await signInPage.login_button.click();
    
            console.log('Javascript Injection test');
            await page.close();
        });
    
        test('SQL Injection Test', async ({ page }) => {

            const signInPage = new SignInPage(page);

            await signInPage.navigate();

            await signInPage.page_title_1.isVisible()

            await signInPage.email_field.isVisible();
            await signInPage.password_field.isVisible();

            await signInPage.navigate();

            await signInPage.page_title_1.isVisible();

            await signInPage.login_button.isVisible();
    
            const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });
    
            /*
            await page.locator('#email-input').isVisible();
            await page.locator('#email-input').fill("SHOW DATABASES;");
            await page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();
    
            await page.locator('#password-input').isVisible();
            await page.locator('#password-input').fill("SHOW DATABASES;");

            await signInPage.fill_fields("SHOW DATABASES;", "SHOW DATABASES;");
            */
    
            await page.waitForTimeout(4000);

            await signInPage.login_button.isVisible();
            await signInPage.login_button.click();
    
            console.log('Javascript Injection test');
            await page.close();
        });

});