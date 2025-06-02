import { test, expect, Page } from '@playwright/test';
import { CompleteProfilePage } from '../page_object_models/pom_complete_profile'

test.beforeEach(async ({page }) => {
    
   test.setTimeout(50000) // Sets a 50-second timeout for all tests
   const completeProfilePage = new CompleteProfilePage(page);
   completeProfilePage.navigate();
  
   // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 


   
});

test.afterEach(async ({page }) => {
    await page.close();
});
 
test.describe('USER COMPLETE PROFILE Suite', () => {
    test('Social Media Footer Check', async ({ page }) => {

        const completeProfilePage = new CompleteProfilePage(page);

        // const browser_context = await browser.newContext();
        // const page = await browser_context.newPage();

        // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/');

        await page.getByRole('heading', {name: 'Complete your profile'}).isVisible();

        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        completeProfilePage.instagram_icon.isEnabled();
        completeProfilePage.facebook_icon.isEnabled();
        completeProfilePage.threads_icon.isEnabled();
        completeProfilePage.linkedin_icon.isEnabled();
        completeProfilePage.bluesky_icon.isEnabled();
        completeProfilePage.twitter_x_icon.isEnabled(); 
        completeProfilePage.dev_icon.isEnabled();

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let ddd = await page.locator("#details-social-inputs").getByRole("button").all();


        for(let i = (ddd.length - 1); i >= 0; i-- ) {
            console.log(ddd[i]);
            await ddd[i].click();
            expect(await ddd[i].count()).toEqual(0) 
        }

        // await page.close();
    });

    test('FIELD DATA PERSISTS after RED ACCORDIAN USE', async ({ page }) => {
        // await page.goto('http://localhost:3000/pages/check-steps/');
        // await page.goto('https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/'); 

        // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

        const completeProfilePage = new CompleteProfilePage(page);

        /*
        const name_field = page.getByRole('textbox', { name: 'Name' });
        const email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        const slack_field = page.getByRole('textbox', { name: 'Slack handle Required" / "' });
        const pronouns = page.getByRole('combobox', { name: 'Pronouns' });
        const dob_Month = page.getByLabel('Month');
        const dob_Day = page.getByLabel('Day');

        const based_GTA_switch = page.getByText('I\'m based in Toronto or');
        const can_join_Local_switch = page.getByText('I can join TorontoJS\'s local');
        const upload_Button = page.getByRole('button', { name: 'Upload Your Photo' });
        const file_picker = page.locator("#image-upload");

        const linkedin_profile_1 = page.getByRole('textbox', { name: 'LinkedIn profile' });
        const github_field = page.getByRole('textbox', { name: 'GitHub profile' });
        const site_field = page.getByRole('textbox', { name: 'Site/portfolio' });
        const skills_field = page.getByRole('textbox', { name: 'Your skills' });

        const facebook_icon = page.getByRole('button', { name: 'Add Facebook account' });
        const threads_icon = page.getByRole('button', { name: 'Add Threads account' });
        const instagram_icon = page.getByRole('button', { name: 'Add Instagram account' });
        const twitter_x_icon = page.getByRole('button', { name: 'Add X account' });
        const linkedin_icon = page.getByRole('button', { name: 'Add LinkedIn account' });
        const bluesky_icon = page.getByRole('button', { name: 'Add BlueSky account' })
        const dev_icon = page.getByRole('button', { name: 'Add Dev.to account' });

        const complete_button = page.getByRole('button', {name: 'Complete My Profile'});

        */

        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        /*    
        const nutshell_bar = page.locator('summary').filter({ hasText: 'In a nutshell:' });
        const avatar_bar = page.locator('summary').filter({ hasText: 'Avatar:' });
        const more_info_bar = page.locator('summary').filter({ hasText: 'More Information:' }); */

        await completeProfilePage.page_title.isVisible();

        await completeProfilePage.name_field.fill("Mr Tester");
        await completeProfilePage.email_field.fill("ct@gmail.com");
        await completeProfilePage.slack_field.fill("Toronto JS");

        await completeProfilePage.pronouns.fill("He/him");

        await completeProfilePage.dob_Month.selectOption("December");
        await completeProfilePage.dob_Day.selectOption("31");

        await completeProfilePage.based_GTA_switch.click();
        await completeProfilePage.can_join_Local_switch.click();

        // UPLOAD AVATAR
        await completeProfilePage.upload_avatar_image('tests/IH4png - asia.jpg');

        await completeProfilePage.github_field.fill('https://github.com/torontojs');
        await completeProfilePage.linkedin_profile_1.fill("https://www.linkedin.com/company/torontojs/");
        await completeProfilePage.site_field.fill("https://torontojs.com/");

        await completeProfilePage.skills_field.fill("Python, Javascript, Git, Playwright, Flask, Azure");

        

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        await completeProfilePage.instagram_field.fill("www.instagram.com");
        await completeProfilePage.linkedin_2nd_field.fill("www.linkedin.com");
        await page.getByRole('textbox', {name: 'X'}).fill("www.x.com");
        await page.getByRole('textbox', {name: 'Dev.to'}).fill("www.dev.to.com");
        await page.getByRole('textbox', {name: 'BlueSky'}).fill("www.bluesky.com");
        await page.getByRole('textbox', {name: 'Facebook'}).fill("www.facebook.com");
        await page.getByRole('textbox', {name: 'Threads'}).fill("www.threads.com");

        console.log(await page.locator('#Instagram-input').textContent());

        // REPEATABLE SELECTS red ACCORDIAN CONTROLS
        for(let x = 1; x <= 2; x++) {
            await completeProfilePage.nutshell_bar.click();
            await completeProfilePage.avatar_bar.click();
            await completeProfilePage.more_info_bar.click();

            await page.waitForTimeout(700);

        }

        // ## CHECK if fields RETAIN VALUE after using red Accordian CONTROLS
        expect(await completeProfilePage.name_field.inputValue()).toEqual("Mr Tester");
        expect(await completeProfilePage.email_field.inputValue()).toEqual("ct@gmail.com");

        expect(await page.locator('#Instagram-input').inputValue()).toEqual("www.instagram.com");
        expect(await page.locator('#X-input').inputValue()).toEqual("www.x.com");
       
       // expect(await completeProfilePage.remove_image_Button).toBeVisible;
       // expect(await completeProfilePage.upload_success_Label).toBeVisible;
       // expect(page.locator('.details-content-file-upload picture img')).toHaveCSS('height', '128px');
      //  expect(page.locator('.details-content-file-upload picture img')).toHaveCSS('width', '128px');

        await completeProfilePage.complete_button.click();

        await page.waitForTimeout(1000);


        /*
        await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
        await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
        await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

        await page.getByText('Check the TorontoJS\'s conduct').isVisible();
        await page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' }).isVisible();

        await page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ }).isVisible();
        await page.locator('#check-steps').getByText('Complete your profile').isVisible();
        */

        // await page.close();           
  });

  test('PHOTO UPLOAD and DELETING', async ({ page }) => {

        const completeProfilePage = new CompleteProfilePage(page);

        await completeProfilePage.page_title.isVisible();

        await completeProfilePage.upload_avatar_image('tests/IH4png - asia.jpg');


        await completeProfilePage.avatar_bar.isVisible();
        await expect(completeProfilePage.avatar_bar).toHaveCSS('accent-color', 'rgb(237, 55, 49)');
        await completeProfilePage.avatar_bar.click();
        await completeProfilePage.upload_Button.isHidden();
        await completeProfilePage.page.waitForTimeout(3000);
        await completeProfilePage.avatar_bar.click();
        await completeProfilePage.remove_image_Button.isVisible();

        await completeProfilePage.remove_avatar_image();

        await completeProfilePage.upload_avatar_image('tests/img_1926.jpeg');

        await completeProfilePage.remove_avatar_image();

        const button_list = [completeProfilePage.facebook_icon, completeProfilePage.threads_icon, completeProfilePage.instagram_icon, completeProfilePage.twitter_x_icon, 
            completeProfilePage.linkedin_icon, completeProfilePage.bluesky_icon, completeProfilePage.dev_icon];

        completeProfilePage.instagram_icon.isEnabled();
        completeProfilePage.facebook_icon.isEnabled();
        completeProfilePage.threads_icon.isEnabled();
        completeProfilePage.linkedin_icon.isEnabled();
        completeProfilePage.bluesky_icon.isEnabled();
        completeProfilePage.twitter_x_icon.isEnabled(); 
        completeProfilePage.dev_icon.isEnabled();

        for(const b of button_list) {
            console.log(await b.all());
            await b.click();
            expect(await b.count()).toEqual(0);
        }

        let ddd = await page.locator("#details-social-inputs").getByRole("button").all();


        for(let i = (ddd.length - 1); i >= 0; i-- ) {
            console.log(ddd[i]);
            await ddd[i].click();
            expect(await ddd[i].count()).toEqual(0) 
        }

        // await page.close();
    });

});