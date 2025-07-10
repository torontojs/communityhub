import { expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';
import { test } from "./base.ts";
import AxeBuilder from '@axe-core/playwright';

const url_1 = "http://localhost:3000/pages/sign-in/";

test.beforeEach(async({signInPage}) => {
    test.setTimeout(70000)
    await signInPage.navigate();
});

test.afterEach(async ({ signInPage }) => {
    await signInPage.page.close();
});

test.describe('SIGN-IN Test Suite', () => {
    test('Check page Elements and Text', async ({ signInPage }) => {
        // await page.goto('http://localhost:3000/pages/sign-in/');


        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        // const signInPage = new SignInPage(page);

        await signInPage.navigate();

        await signInPage.page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();

        await signInPage.email_required_label.isVisible();
        await signInPage.password_required_label.isVisible();

        //await page.locator('#email-input').isVisible();
       // await page.locator('#password-input').isVisible();


       //  await page.getByRole('button', { name: 'Log in'}).isVisible();
        await signInPage.login_button.isVisible();
        
    });

    test('Enter invalid password', async ({ signInPage }) => {

        // const signInPage = new SignInPage(page);

        await signInPage.navigate();

        await signInPage.page_title_1.isVisible()

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();

        await signInPage.fill_fields('test@gmail.com', 'xxxxxxxxx');


        await signInPage.login_button.isVisible();

        await signInPage.login_button.click();

    });

    test('Enter invalid email', async ({ signInPage }) => {

        //const signInPage = new SignInPage(page);

        //await signInPage.navigate();

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


    });

    /* 
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

       
        

        const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });

        //await page.locator('#email-input').fill("test@gmail.com")
        //await page.locator('#password-input').fill("xxx");

        await signInPage.fill_fields('test@gmail.com', 'xxx');

       //await signUpPage.fill_fields(username, "signUpPage.email_field");


        await signInPage.login_button.isVisible();

        await signInPage.login_button.click();

       

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

        // await newPage_3.getByTestId('app-bar-close').click();
        
        page.on('dialog', dialog => dialog.accept());

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
    */

    test('Javascript Injection Test', async ({ signInPage }) => {

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
    
            

            await signInPage.page.waitForTimeout(4000);
    
            await signInPage.login_button.isVisible();
            await signInPage.login_button.click();
    
            console.log('Javascript Injection test');

        });
    
        test('SQL Injection Test', async ({ signInPage }) => {

            //const signInPage = new SignInPage(page);

            //await signInPage.navigate();

            await signInPage.page_title_1.isVisible()

            await signInPage.email_field.isVisible();
            await signInPage.password_field.isVisible();

            // await signInPage.navigate();

            await signInPage.page_title_1.isVisible();

            await signInPage.login_button.isVisible();

            await signInPage.fill_fields("SHOW DATABASES;", 'SHOW DATABASES;');
    
            // const red_button = page.getByRole('button', { name: 'Complete sign-up form button' });
    
            /*
            await page.locator('#email-input').isVisible();
            await page.locator('#email-input').fill("SHOW DATABASES;");
            await page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();
    
            await page.locator('#password-input').isVisible();
            await page.locator('#password-input').fill("SHOW DATABASES;");

            await signInPage.fill_fields("SHOW DATABASES;", "SHOW DATABASES;");
            */
    
            await signInPage.page.waitForTimeout(4000);

            await signInPage.login_button.isVisible();
            await signInPage.login_button.click();
    
            console.log('SQL Injection test');

        });

        test('USE SIGNUP LINK', async ({ signInPage }) => {
            
            //const signInPage = new SignInPage(page);

            //await signInPage.navigate();

            // expect(signInPage.url).toBe(signInPage.page.url);

            await signInPage.signup_link.isVisible();
            await expect(signInPage.signup_link).toHaveCSS('color', 'rgb(237, 55, 49)');
            await expect(signInPage.signup_link).toHaveCSS('text-align', 'center');

            await expect(signInPage.signup_link).toBeEnabled();

            await signInPage.page.waitForTimeout(2000);
            await signInPage.signup_link.click();

            console.log(signInPage.page.url());
            console.log(signInPage.signup_url);

            expect(signInPage.page.url()).toBe(signInPage.signup_url);

            await signInPage.page.waitForTimeout(3000);
        
        });

        test("USER DOESN't REMEMBER LINK", async ({ signInPage }) => {
            
            //const signInPage = new SignInPage(page);

            //await signInPage.navigate();

            // expect(signInPage.url).toBe(signInPage.page.url);

            await signInPage.signup_link.isVisible();
            await expect(signInPage.forgot_link).toHaveCSS('color', 'rgb(237, 55, 49)');
            await expect(signInPage.forgot_link).toHaveCSS('text-align', 'center');

            await expect(signInPage.forgot_link).toBeEnabled();

            await signInPage.page.waitForTimeout(2000);
            await signInPage.forgot_link.click();

            console.log(signInPage.page.url());
            console.log(signInPage.forgot_page_url);

            expect(signInPage.page.url()).toBe(signInPage.forgot_page_url);

            await signInPage.page.waitForTimeout(3000);

        });


    test('Social Media Footer Check', async ({ signInPage }) => {

        await signInPage.page_title_1.isVisible()

        await signInPage.email_field.isVisible();
        await signInPage.password_field.isVisible();

        // await signInPage.navigate();

        await signInPage.page_title_1.isVisible();


        await signInPage.fill_fields('test@gmail.com', 'xxx');


        await signInPage.login_button.isVisible();

        await signInPage.login_button.click();

        const [newPage_0] = await Promise.all([
            signInPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signInPage.home_icon.click()
        ]);
        
        await expect(newPage_0).toHaveURL("https://torontojs.com/");
        let pp = await newPage_0.evaluate(() => window.location.href)
        console.log(pp);
        newPage_0.close();

        const [newPage_1] = await Promise.all([
            signInPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signInPage.youtube_icon.click()
        ]);
        
        await expect(newPage_1).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
        pp = await newPage_1.evaluate(() => window.location.href)
        console.log(pp);
        newPage_1.close();

        const [newPage_2] = await Promise.all([
            signInPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signInPage.instagram_icon.click(),
        ]);

        await expect(newPage_2).toHaveURL("https://www.instagram.com/toronto.js/");
        pp = await newPage_2.evaluate(() => window.location.href)
        console.log(pp);
        newPage_2.close();

        const [newPage_3] = await Promise.all([
            signInPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signInPage.twitter_x_icon.click()
        ]);

        // await expect(newPage_3).toHaveURL("https://twitter.com/torontojs");
        pp = await newPage_3.evaluate(() => window.location.href)
        console.log(pp);
        expect(pp.includes("x.com"));

        //await newPage_3.getByTestId('app-bar-close').click();
        
        signInPage.page.on('dialog', dialog => dialog.accept());

        newPage_3.close();

        const [newPage_4] = await Promise.all([
            signInPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signInPage.linkedin_icon.click()
        ]);

        await expect(newPage_4).toHaveURL("https://www.linkedin.com/company/torontojs");
        pp = await newPage_4.evaluate(() => window.location.href)
        console.log(pp);
        newPage_4.close();

    });

    test('CLICk HYPERLINK TO GO TO SIGN-UP PAGE', async({ signInPage, signUpPage}) => {
        await signInPage.signup_link.isVisible();
        await signInPage.signup_link.dblclick();
        await signInPage.page.waitForURL(signUpPage.url);
        expect(signInPage.page.url()).toEqual(signUpPage.url);

    });

    test('CLICk HYPERLINKS TO TRAVEL BETWEEN SIGN-IN PAGE AND SIGN-UP PAGE', async({ signInPage, signUpPage}) => {
        await signInPage.signup_link.isVisible();
        await signInPage.signup_link.dblclick();
         await signInPage.page.waitForURL(signUpPage.url);
        expect(signInPage.page.url()).toEqual(signUpPage.url);

        await signUpPage.sign_in_link.isVisible();
        await signUpPage.sign_in_link.dblclick();
        await signUpPage.page.waitForURL(signInPage.url);
        expect(signUpPage.page.url()).toEqual(signInPage.url);
        await signInPage.signup_link.isVisible();
    });

    /*
    test('SIGN-IN SCREENSHOT COMPARISON TEST', async({ signInPage }) => {
        await expect(async() => {
            await signInPage.page.waitForURL(signInPage.url);
            await expect(signInPage.page).toHaveScreenshot("profiles_page_screen.png");
        }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
    });

}); */

});

test.describe('ASSESSIBILITY Suite', () => {

    test('BASIC WCAG22AA', async({page }) => {
        
        const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22aa"]).analyze();
        expect( axeBuilder.violations).toEqual([]);
    });
});

