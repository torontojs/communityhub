import { expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { execPath } from 'process';
import { test } from "./base.ts";
import { sign } from 'crypto';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({signUpPage}) => {
   test.setTimeout(70000);
   await signUpPage.navigate();
  
   // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 

   
}); 

test.afterEach(async ({ signUpPage }) => {
    await signUpPage.page.close();
});

test.describe('SIGN-UP Test Suite', () => {
    test('Check page Elements and Text', async ({ signUpPage }) => {


        //const signUpPage = new SignUpPage(page);

        // await signUpPage.navigate();

        //const red_button = page.getByRole('button', { name: 'Create Account' });

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        // await page.getByRole('heading', { name: 'Sign Up to TorontoJS' }).isVisible();

        await signUpPage.page_title_1.isVisible();
        await signUpPage.page_title_2.isVisible();

        await expect(signUpPage.login_form).toHaveCSS('justify-content', 'center');
        await expect(signUpPage.login_form).toHaveCSS('border-radius', '8px');

        await signUpPage.email_field.isVisible();
        await signUpPage.name_field.isVisible();
        await signUpPage.password_field.isVisible();

        await signUpPage.email_required_label.isVisible();
        await signUpPage.password_required_label.isVisible();

        //await page.locator('#name-input').isVisible();

        // await page.locator('#email-input').isVisible();
        await signUpPage.page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();

        //await page.locator('#password-input').isVisible();


        //await red_button.isVisible();
        await signUpPage.red_Account_button.isVisible();

        console.log('Checking page Elements and Text');
    });

    test('TEST Password Strength METER with weak passwords', async ({ signUpPage }) => {

        const weak_passwords = ["password", "123456", "abcde", "aba", "JJJJJJJ"];

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_2.isVisible();

        for(let w = 0; w < weak_passwords.length; w++) { 
            await signUpPage.page.waitForTimeout(500);
            console.log("WEAK PASSWORD " + (w + 1) + ": " + weak_passwords[w]);

            await signUpPage.fill_fields(username_1, "test@gm.com", weak_passwords[w]);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(255, 0, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(128, 128, 128)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(128, 128, 128)');
            
        }


        await signUpPage.red_Account_button.isVisible();

    });

    test('TEST Password Strength METER with FAIR passwords', async ({ signUpPage }) => {

        const fair_passwords = ["super_1", "password_1", "extra_2", "toronto@"];

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        await signUpPage.page_title_2.isVisible();

        await signUpPage.page_title_1.isVisible();



        for(let f = 0; f < fair_passwords.length; f++) { 
            console.log("FAIR PASSWORD " + (f + 1) + ": " + fair_passwords[f]);

            await signUpPage.fill_fields(username_1, "test@gm.com", fair_passwords[f]);

            await signUpPage.page.waitForTimeout(500);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(128, 128, 128)');

        }

        await signUpPage.red_Account_button.isVisible();

    });

    test('TEST Password Strength METER with GOOD passwords', async ({ signUpPage }) => {

        await signUpPage.page.waitForTimeout(800);
        const good_passwords = ["tester_123", "welcome_123", "security_123", "good_password"];

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_2.isVisible();

        signUpPage.page_title_1.isVisible();

        for(let g = 0; g < good_passwords.length; g++) { 
            console.log("GOOD PASSWORD " + (g + 1) + ": " + good_passwords[g]);

            await signUpPage.fill_fields(username_1, "test@gm.com", good_passwords[g]);

            await signUpPage.page.waitForTimeout(800);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(255, 255, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(128, 128, 128)');

        }

        await signUpPage.red_Account_button.isVisible();
    });

    test('TEST Password Strength METER with STRONG passwords', async ({ signUpPage }) => {

        const strong_passwords = ["super_password123", "super_long", "strong_password", "qatester_123"];

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_2.isVisible();

        signUpPage.page_title_1.isVisible();

        signUpPage.page_title_1.isVisible();
        signUpPage.page_title_2.isVisible();

        for(let s = 0; s < strong_passwords.length; s++) { 
            await signUpPage.page.waitForTimeout(800);

            await signUpPage.fill_fields(username_1, "test@gm.com", strong_passwords[s]);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            console.log("STRONG PASSWORD " + (s + 1) + ": " + strong_passwords[s]);

            await expect(signUpPage.password_strength_Label).toHaveText("Password strength: Strong");

        }

        await signUpPage.red_Account_button.isVisible();

    });

    test('TEST Password Strength METER with VERY STRONG passwords', async ({ signUpPage }) => {

        const very_strong_passwords = ["tester_1234!@#$", "tester_2345@#$%", "QAtester_1234", "theTester_1234"];

        await signUpPage.page.waitForTimeout(1800);

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_1.isVisible();
        signUpPage.page_title_2.isVisible();

        // await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'}).isVisible();

        for(let vs = 0; vs < very_strong_passwords.length; vs++) { 
            await signUpPage.page.waitForTimeout(1500);
            // await page.locator('#password-input').fill(very_strong_passwords[vs]);
            await signUpPage.password_field.fill(very_strong_passwords[vs]);

            console.log("VERY STRONG PASSWORD " + (vs + 1) + ": " + very_strong_passwords[vs]);

            await signUpPage.fill_fields(username_1, "test@gm.com", very_strong_passwords[vs]);

            await expect(signUpPage.password_level_low).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_middle).toHaveCSS('background-color', 'rgb(0, 153, 0)');
            await expect(signUpPage.password_level_high).toHaveCSS('background-color', 'rgb(0, 153, 0)');

            await expect(signUpPage.password_strength_Label).toHaveText("Password strength: Very Strong");

        }

        await signUpPage.red_Account_button.isVisible();

    });

    test('Enter Invalid Password Test', async ({ signUpPage, checkEmailPage }) => {


        await signUpPage.page.waitForTimeout(1800);

        const username_1 = await signUpPage.unique_username("Curtis Tester");

        signUpPage.page_title_1.isVisible();
        signUpPage.page_title_2.isVisible(); 

        await signUpPage.fill_fields(username_1, "test@gmail.com", "#######");

        await signUpPage.red_Account_button.isVisible();

        await signUpPage.red_Account_button.click();

        expect(signUpPage.page.url()).toBe(checkEmailPage.url);

        
    });

    test('ENTER INVALID EMAIL', async ({ signUpPage }) => {

        await signUpPage.page_title_1.isVisible();
        await signUpPage.page_title_2.isVisible();

        const username = await signUpPage.unique_username("Curtis Tester");

        //let t = (Math.round(Date.now() / 100000000)).toString();
        //const username = "Curtis Tester" + t;
        //console.log(username);

        await signUpPage.fill_fields(username, "xxxxxxxxx", "password");

        await signUpPage.red_Account_button.isVisible();
        await signUpPage.red_Account_button.isEnabled();
        expect(signUpPage.red_Account_button).toHaveCSS('background-color', `rgb(237, 52, 63)`);
        await signUpPage.red_Account_button.click();

        expect(signUpPage.page.url()).toBe(signUpPage.url);

    });

    test('Social Media Footer Check', async ({ signUpPage }) => {

        /*
        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();
        const signUpPage = new SignUpPage(page);
        await page.goto('http://localhost:3000/pages/sign-up/');
        */
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
            signUpPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signUpPage.home_icon.click()
        ]);
        
        await expect(homePage).toHaveURL("https://torontojs.com/");
        let pp = await homePage.evaluate(() => window.location.href)
        
        await homePage.close(); 

        const [newPage_1] = await Promise.all([
            signUpPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signUpPage.youtube_icon.click()
        ]);
        
        await expect(newPage_1).toHaveURL("https://www.youtube.com/channel/UC1samyyfqiKmOT6fq3uVO1A");
        pp = await newPage_1.evaluate(() => window.location.href)
        
        await newPage_1.close();

        const [newPage_2] = await Promise.all([
            signUpPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signUpPage.instagram_icon.click(),
        ]);

        await expect(newPage_2).toHaveURL("https://www.instagram.com/toronto.js/");
        pp = await newPage_2.evaluate(() => window.location.href)
        
        await newPage_2.close();

        const [newPage_3] = await Promise.all([
            signUpPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signUpPage.twitter_x_icon.click()
        ]);

        pp = await newPage_3.evaluate(() => window.location.href)
        
        expect(pp.includes("x.com"));

        signUpPage.page.on('dialog', dialog => dialog.accept());
        await newPage_3.close();

        const [newPage_4] = await Promise.all([
            signUpPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            signUpPage.linkedin_icon.click()
        ]);

        await expect(newPage_4).toHaveURL("https://www.linkedin.com/company/torontojs");
        pp = await newPage_4.evaluate(() => window.location.href)
        
        await newPage_4.close();

    });

    test('Javascript Injection Test', async ({ signUpPage, checkEmailPage }) => {

            console.log('SIGN-UP Javascript Injection test');

            const input_text: string[][] = [["alert('Hello')", "test1@zoho.com", "password"],
                                             ["Curtis tester", "alert('Hello')", "password"],
                                             ["Curtis tester", "test2@zoho.com", "alert('Hello')"]];

            await signUpPage.fill_fields("alert('Hello')", "alert('Hello')", "alert('Hello')");


            await signUpPage.red_Account_button.isVisible();
            await signUpPage.red_Account_button.isEnabled();
            await signUpPage.red_Account_button.click();


            await signUpPage.page.waitForTimeout(3000);

            signUpPage.page.on('console', msg => {
            if (msg.type().includes('error') || msg.type().includes('SQL') || msg.type().includes('alert'))
                console.log(`Error text: "${msg.text()}"`);
                expect(msg.type()).toContainEqual("");
            });

            await expect(signUpPage.page.getByRole('alert', {name:'Hello'})).toHaveCount(0);

            /*
            for(let i = 0; i < input_text.length; i++) {
                await signUpPage.fill_fields(input_text[i][0], input_text[i][1], input_text[i][2]);


                await signUpPage.red_Account_button.isVisible();
                await signUpPage.red_Account_button.isEnabled();
                await signUpPage.red_Account_button.click();


                await signUpPage.page.waitForTimeout(3000);

                await expect(signUpPage.page.getByRole('alert', {name:'Hello'})).toHaveCount(0);
            } */

       

    });

    test('SQL Injection Test', async ({ signUpPage, checkEmailPage }) => {


        const input_text: string[][] = [["SHOW DATABASES;", "test1@zoho.com", "password"],
                                             ["Curtis tester", "SHOW DATABASES;", "password"],
                                             ["Curtis tester", "test2@zoho.com", "SHOW DATABASES;"]];

        await signUpPage.page.locator('label').filter({ hasText: 'E-mailREQUIRED' }).locator('span').isVisible();
          
         await signUpPage.fill_fields("SHOW DATABASES", "SHOW DATABASES", "SHOW DATABASES");
        await signUpPage.page.waitForTimeout(2000);

        await signUpPage.red_Account_button.isVisible();
        await signUpPage.red_Account_button.isEnabled();
        await signUpPage.red_Account_button.dblclick();

        //console.log(signUpPage.page.url());
    
        //console.log(signUpPage.page.url());
        expect(signUpPage.page.url()).toEqual(signUpPage.url);

        //signUpPage.page.on('console', msg => console.log(msg.text()));

        signUpPage.page.on('console', msg => {
        if (msg.type().includes('error') || msg.type().includes('SQL'))
            console.log(`Error text: "${msg.text()}"`);
            expect(msg.type()).toContainEqual("");
        });

        await signUpPage.page.waitForTimeout(5000);



        //expect(signUpPage.page.getByText("SQLITE_ERROR")).toHaveCount(0);
        //expect(signUpPage.page.getByText("SQL")).toHaveCount(0);
        //expect(signUpPage.page.getByText("ERROR")).toHaveCount(0);
       
        /*
        for(let i = 0; i < input_text.length; i++) {
            await signUpPage.fill_fields(input_text[i][0], input_text[i][1], input_text[i][2]);
            await signUpPage.page.waitForTimeout(5000);

            await signUpPage.red_Account_button.isVisible();
            await signUpPage.red_Account_button.isEnabled();
            await signUpPage.red_Account_button.dblclick();

            //console.log(signUpPage.page.url());
            console.log(i + 1);

            await signUpPage.page.waitForURL(checkEmailPage.url);
            console.log(signUpPage.page.url());
            expect(signUpPage.page.url()).toEqual(checkEmailPage.url);


            await signUpPage.page.waitForTimeout(5000);

            expect(signUpPage.page.getByText("SQLITE_ERROR")).toHaveCount(0);
            expect(signUpPage.page.getByText("SQL")).toHaveCount(0);
            expect(signUpPage.page.getByText("ERROR")).toHaveCount(0);

            await signUpPage.navigate();

           
        } */


        console.log('SQL Injection test completed!');

    });

    test('CLICk HYPERLINK TO GO TO SIGN-IN PAGE', async({ signInPage, signUpPage}) => {
        await signUpPage.sign_in_link.isVisible();
        await signUpPage.sign_in_link.dblclick();
        expect(signUpPage.page.url()).toEqual(signInPage.url);

    });

    test('CLICk HYPERLINKS TO TRAVEL BETWEEN SIGN-IN PAGE AND SIGN-UP PAGE', async({ signInPage, signUpPage}) => {
        await signUpPage.sign_in_link.isVisible();
        await signUpPage.sign_in_link.dblclick();
        expect(signUpPage.page.url()).toEqual(signInPage.url);
        await signInPage.signup_link.isVisible();
        await signInPage.signup_link.isVisible();
        await signInPage.signup_link.dblclick();
        expect(signInPage.page.url()).toEqual(signUpPage.url);
        await signUpPage.sign_in_link.isVisible();
    });

    test('SIGN-UP PAGE SCREENSHOT COMPARISON TEST', async({ signUpPage}) => {
         await expect(async() => {
        await signUpPage.page.waitForURL(signUpPage.url);
        await expect(signUpPage.page).toHaveScreenshot("signup_page_screen.png");
         }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
    });

});

test.describe('ASSESSIBILITY Suite', () => {

    test('BASIC WCAG22AA', async({signUpPage, page }) => {
        
        const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22aa"]).analyze();
        expect( axeBuilder.violations).toEqual([]);
    });
});