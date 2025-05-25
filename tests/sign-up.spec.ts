import { test, expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';
import { SignUpPage } from '../page_object_models/pom_sign-up'

/*
test.beforeEach(async () => {
   page = await browser.newPage();

   const context = await browser.newContext();
   const signUpPage = new SignUpPage(await page);

   signUpPage.navigate();
  
   // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 


   
}); */

test.afterEach(async ({ page }) => {
    await page.close();
});

const url_1 = "http://localhost:3000/pages/sign-up/";

/*
test.beforeEach(async ({page }) => {

    await page.goto('http://localhost:3000/pages/sign-up/'); 

}) */


test.describe('SIGN-UP Test Suite', () => {
    test('Check page Elements and Text', async ({ page }) => {


        const signUpPage = new SignUpPage(page);

        await signUpPage.navigate();

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
    });

    test('TEST Password Strength METER with weak passwords', async ({ page }) => {

        const signUpPage = new SignUpPage(page);

        await signUpPage.navigate();

        const weak_passwords = ["password", "123456", "abcde", "aba", "JJJJJJJ"];

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        const red_button = page.getByRole('button', { name: 'Create Account' });

        signUpPage.page_title_2.isVisible();

        for(let w = 0; w < weak_passwords.length; w++) { 
            await page.waitForTimeout(500);
            console.log("WEAK PASSWORD " + (w + 1) + ": " + weak_passwords[w]);

            await signUpPage.fill_fields(username_1, "test@gm.com", weak_passwords[w]);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(255, 0, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(128, 128, 128)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(128, 128, 128)');
            
        }


        await signUpPage.red_Account_button.isVisible();

    });

    test('TEST Password Strength METER with FAIR passwords', async ({ page }) => {

        const fair_passwords = ["super_1", "password_1", "extra_2", "toronto@"];

        const signUpPage = new SignUpPage(page);
        await signUpPage.navigate();

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_2.isVisible();

        signUpPage.page_title_1.isVisible();



        for(let f = 0; f < fair_passwords.length; f++) { 
            console.log("FAIR PASSWORD " + (f + 1) + ": " + fair_passwords[f]);

            await signUpPage.fill_fields(username_1, "test@gm.com", fair_passwords[f]);

            await page.waitForTimeout(500);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(128, 128, 128)');

        }

        signUpPage.red_Account_button.isVisible();

    });

    test('TEST Password Strength METER with GOOD passwords', async ({ page }) => {

        await page.waitForTimeout(800);
        const good_passwords = ["tester_123", "welcome_123", "security_123", "good_password"];

        const signUpPage = new SignUpPage(page);
        await signUpPage.navigate();

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_2.isVisible();

        signUpPage.page_title_1.isVisible();

        

        await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();
        
        for(let g = 0; g < good_passwords.length; g++) { 
            console.log("GOOD PASSWORD " + (g + 1) + ": " + good_passwords[g]);

            await signUpPage.fill_fields(username_1, "test@gm.com", good_passwords[g]);

            await page.waitForTimeout(800);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(128, 128, 128)');

        }

        await signUpPage.red_Account_button.isVisible();
    });

    test('TEST Password Strength METER with STRONG passwords', async ({ page }) => {

        const strong_passwords = ["super_password123", "super_long", "strong_password", "qatester_123"];

        const signUpPage = new SignUpPage(page);
        await signUpPage.navigate();

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_2.isVisible();

        signUpPage.page_title_1.isVisible();

        signUpPage.page_title_1.isVisible();
        signUpPage.page_title_2.isVisible();

        for(let s = 0; s < strong_passwords.length; s++) { 
            await page.waitForTimeout(800);

            await signUpPage.fill_fields(username_1, "test@gm.com", strong_passwords[s]);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            console.log("STRONG PASSWORD " + (s + 1) + ": " + strong_passwords[s]);

            await expect(signUpPage.password_strength_Label).toHaveText("Password strength: Strong");

        }

        await signUpPage.red_Account_button.isVisible();

    });

    test('TEST Password Strength METER with VERY STRONG passwords', async ({ page }) => {

        const very_strong_passwords = ["tester_1234!@#$", "tester_2345@#$%", "QAtester_1234", "theTester_1234"];

        await page.waitForTimeout(1800);

        const signUpPage = new SignUpPage(page);
        await signUpPage.navigate();

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_1.isVisible();
        signUpPage.page_title_2.isVisible();

        // await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        for(let vs = 0; vs < very_strong_passwords.length; vs++) { 
            await page.waitForTimeout(1500);
            await page.locator('#password-input').fill(very_strong_passwords[vs]);

            console.log("VERY STRONG PASSWORD " + (vs + 1) + ": " + very_strong_passwords[vs]);

            await signUpPage.fill_fields(username_1, "test@gm.com", very_strong_passwords[vs]);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(0, 153, 0)');

            await expect(signUpPage.password_strength_Label).toHaveText("Password strength: Very Strong");

        }

        await signUpPage.red_Account_button.isVisible();

    });

    test('Enter Invalid Password Test', async ({ page }) => {


        await page.waitForTimeout(1800);

        const signUpPage = new SignUpPage(page);
        await signUpPage.navigate();

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_1.isVisible();
        signUpPage.page_title_2.isVisible(); 

        /* await page.goto(url_1); 
        
        let t = (Math.round(Date.now() / 100000000)).toString();
        const username = "Curtis Tester" + t;
        console.log(username); */

        // const red_button = page.getByRole('button', { name: 'Create Account' });

        // await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        /*
        await page.locator('#name-input').fill(username);
        await page.locator('#email-input').fill("test@gmail.com");

        await page.locator('#password-input').fill("xxxxxxxxx"); */

        await signUpPage.fill_fields(username_1, "test@gmail.com", "xxxxxxx");

        await signUpPage.red_Account_button.isVisible();

        await signUpPage.red_Account_button.click();

        
        await page.close();
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

        
        await page.close();
    });

    test('Social Media Footer Check', async ({ browser }) => {

        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();
        const signUpPage = new SignUpPage(page);
        await page.goto('http://localhost:3000/pages/sign-up/');

        // await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible()

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        await signUpPage.page_title_1.isVisible();
        await signUpPage.page_title_2.isVisible();

        await signUpPage.fill_fields(username_1, "test@gm.com", "passWord11");


        await signUpPage.red_Account_button.isVisible();

       /*
        const home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        const youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        const instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        const twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        const linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);

        */
        const [homePage] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signUpPage.home_icon.click()
        ]);
        
        await expect(homePage).toHaveURL("https://torontojs.com/");
        let pp = await homePage.evaluate(() => window.location.href)
        console.log(pp);
        await homePage.close(); 

        const [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signUpPage.youtube_icon.click()
        ]);
        
        await expect(newPage_1).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
        pp = await newPage_1.evaluate(() => window.location.href)
        console.log(pp);
        await newPage_1.close();

        const [newPage_2] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signUpPage.instagram_icon.click(),
        ]);

        await expect(newPage_2).toHaveURL("https://www.instagram.com/toronto.js/");
        pp = await newPage_2.evaluate(() => window.location.href)
        console.log(pp);
        await newPage_2.close();

        const [newPage_3] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signUpPage.twitter_x_icon.click()
        ]);

        

        // await expect(newPage_3).toHaveURL("https://twitter.com/torontojs");
        pp = await newPage_3.evaluate(() => window.location.href)
        console.log(pp);
        expect(pp.includes("x.com"));

        await newPage_3.getByTestId('app-bar-close').click();
        await newPage_3.close();

        const [newPage_4] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            signUpPage.linkedin_icon.click()
        ]);

        await expect(newPage_4).toHaveURL("https://www.linkedin.com/company/torontojs");
        pp = await newPage_4.evaluate(() => window.location.href)
        console.log(pp);
        await newPage_4.close();

        await page.close();

    });

    test('Javascript Injection Test', async ({ page }) => {

        await page.goto(url_1);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        /*
        await page.getByRole('heading', { name: 'Sign Up to TorontoJS' }).isVisible();

        await page.getByRole('heading', { name: 'Welcome! Let\'s set up your' }).isVisible();

        const login_form = page.locator('.login-form');

        await expect(login_form).toHaveCSS('justify-content', 'center');
        await expect(login_form).toHaveCSS('border-radius', '8px'); */

        await page.locator('#name-input').isVisible();
        await page.locator('#name-input').fill("alert('Hello')");

        await page.locator('#email-input').isVisible();
        await page.locator('#email-input').fill("alert('Hello')");
        await page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();

        await page.locator('#password-input').isVisible();
        await page.locator('#password-input').fill("alert('Hello')");


        await red_button.isVisible();
        await red_button.click();

        console.log('Javascript Injection test');
        await page.close();
    });

    test('SQL Injection Test', async ({ page }) => {

        await page.goto(url_1);

        const red_button = page.getByRole('button', { name: 'Create Account' });

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        /*
        await page.getByRole('heading', { name: 'Sign Up to TorontoJS' }).isVisible();

        await page.getByRole('heading', { name: 'Welcome! Let\'s set up your' }).isVisible();

        const login_form = page.locator('.login-form');

        await expect(login_form).toHaveCSS('justify-content', 'center');
        await expect(login_form).toHaveCSS('border-radius', '8px'); */

        await page.locator('#name-input').isVisible();
        await page.locator('#name-input').fill("SHOW DATABASES;");

        await page.locator('#email-input').isVisible();
        await page.locator('#email-input').fill("SHOW DATABASES;");
        await page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();

        await page.locator('#password-input').isVisible();
        await page.locator('#password-input').fill("SHOW DATABASES;");


        await red_button.isVisible();
        await red_button.click();

        console.log('Javascript Injection test');
        await page.close();
    });

});