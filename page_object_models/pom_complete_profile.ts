import { expect, type Page, type Locator } from '@playwright/test';
import { Complete_Profile_Type, Enable_Profile_Footer_Type} from '../tests/base';

export class CompleteProfilePage {
    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/complete-profile/?'; 
    // 'https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/';

    readonly page_title: Locator;

    readonly name_field: Locator;
    readonly email_field: Locator;
    readonly slack_field: Locator;
    readonly pronouns: Locator;
    readonly dob_Month: Locator;
    readonly dob_Day: Locator;

    readonly based_GTA_switch: Locator;
    readonly can_join_Local_switch: Locator;
    readonly upload_Button: Locator;
    readonly upload_New_Photo_Button: Locator;
    readonly file_picker: Locator;
    readonly remove_image_Button: Locator;
    readonly upload_success_Label: Locator;

    readonly linkedin_profile_1: Locator;
    readonly github_field: Locator;
    readonly site_field: Locator;
    readonly skills_field: Locator;

    readonly instagram_field: Locator;
    readonly linkedin_2nd_field: Locator;
    readonly facebook_field: Locator;
    readonly twitter_x_field: Locator;
    readonly thread_field: Locator;
    readonly bluesky_field: Locator;
    readonly devto_field: Locator;

    readonly facebook_icon: Locator;
    readonly instagram_icon: Locator;
    readonly threads_icon: Locator;
    readonly bluesky_icon: Locator;
    readonly twitter_x_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly dev_icon: Locator;

    readonly close_linkedin_field_button: Locator;
    readonly close_instagram_field_button: Locator;
    readonly close_facebook_field_button: Locator;
    readonly close_twitter_x_field_button: Locator;
    readonly close_threads_field_button: Locator;
    readonly close_bluesky_field_button: Locator;
    readonly close_devto_field_button: Locator;

    readonly complete_button: Locator;
    readonly nutshell_bar: Locator;
    readonly avatar_bar: Locator;
    readonly more_info_bar: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.page_title = page.getByRole('heading', {name: 'Complete your profile'});

        this.name_field = page.getByRole('textbox', { name: 'Name' });
        this.email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        this.slack_field = page.getByRole('textbox', { name: 'Slack handle Required" / "' });
        this.pronouns = page.getByRole('combobox', { name: 'Pronouns' });
        this.dob_Month = page.getByLabel('Month');
        this.dob_Day = page.getByLabel('Day');

        this.based_GTA_switch = page.getByText('I\'m based in Toronto or');
        this.can_join_Local_switch = page.getByText('I can join TorontoJS\'s local');

        this.upload_Button = page.getByRole('button', { name: 'Upload Your Photo' });
        this.upload_New_Photo_Button = page.getByRole('button', { name: 'Upload New Photo' });
        this.file_picker = page.locator("#image-upload");
        this.remove_image_Button = page.getByRole('button', {name: 'Remove Photo'});
        this.upload_success_Label = page.getByText('Avatar uploaded successfully');

        this.linkedin_profile_1 = page.getByRole('textbox', { name: 'LinkedIn profile' });
        this.github_field = page.getByRole('textbox', { name: 'GitHub profile' });
        this.site_field = page.getByRole('textbox', { name: 'Site/portfolio' });
        this.skills_field = page.getByRole('textbox', { name: 'Your skills' });

        this.nutshell_bar = page.locator('summary').filter({ hasText: 'In a nutshell:' });
        this.avatar_bar = page.locator('summary').filter({ hasText: 'Avatar:' });
        this.more_info_bar = page.locator('summary').filter({ hasText: 'More Information:' });

        this.instagram_field = page.getByRole('textbox', {name: 'Instagram'});
        this.facebook_field = page.getByRole('textbox', {name: 'Facebook'});
        this.thread_field = page.getByRole('textbox', {name: 'Threads'});
        this.bluesky_field = page.getByRole('textbox', {name: 'BlueSky'});
        this.devto_field = page.getByRole('textbox', {name: 'Dev.to'});
        this.twitter_x_field = page.getByRole('textbox', {name: 'X'}); 
        this.linkedin_2nd_field = page.getByRole('textbox', {name: 'LinkedIn'}).nth(1);
        
        this.facebook_icon = page.getByRole('button', { name: 'Add Facebook account' });
        this.instagram_icon = page.getByRole('button', { name: 'Add Instagram account' });
        this.threads_icon = page.getByRole('button', { name: 'Add Threads account' });
        this.twitter_x_icon = page.getByRole('button', { name: 'Add X account' });
        this.bluesky_icon = page.getByRole('button', { name: 'Add BlueSky account' });
        this.linkedin_icon = page.getByRole('button', { name: 'Add LinkedIn account' });
        this.dev_icon = page.getByRole('button', { name: 'Add Dev.to account' });

        this.close_linkedin_field_button = page.getByRole("button", { name: 'Close LinkedIn input'});
        this.close_instagram_field_button = page.getByRole("button", { name: 'Close Instagram input'});
        this.close_threads_field_button = page.getByRole("button", { name: 'Close Threads input'});
        this.close_facebook_field_button = page.getByRole("button", { name: 'Close Facebook input'});
        this.close_twitter_x_field_button = page.getByRole("button", { name: 'Close X input'});
        this.close_bluesky_field_button = page.getByRole("button", { name: 'Close BlueSky input'});
        this.close_devto_field_button = page.getByRole("button", { name: 'Close Dev.to input'});

        this.complete_button = page.getByRole('button', {name: 'Complete My Profile'});

    }
    
   async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            await this.page.waitForURL(this.url);
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }

    async upload_avatar_image(image_path: string, valid_image_bool: boolean) {
        await expect(async() => {
            await this.upload_Button.isVisible();
            await this.upload_New_Photo_Button.isVisible();
            await this.remove_image_Button.isHidden();

            if(await this.upload_New_Photo_Button.isHidden()) {
                await this.upload_Button.click();
            } else {
                await this.upload_New_Photo_Button.click();
            }

            await this.page.waitForLoadState('networkidle');

            //### FILE PICKER
            await this.file_picker.setInputFiles(image_path);
            await this.upload_Button.isVisible();
            await this.remove_image_Button.isVisible();
            await this.upload_success_Label.isVisible();
            await this.upload_New_Photo_Button.isVisible();

            console.log("upload_avatar_image: " + valid_image_bool + " MODE");

            if (valid_image_bool) {
                await this.page.waitForLoadState('networkidle');
                //expect(this.page.locator('.details-content-file-upload picture img')).toHaveCSS('width', '128px');

                let size = await this.get_image_size();
                console.log("Checking avatar image size ...");
                expect((size[0])).toBeGreaterThanOrEqual(80);
                expect((size[0])).toBeLessThanOrEqual(130);
                expect((size[1])).toBeGreaterThanOrEqual(80);
                expect((size[1])).toBeLessThanOrEqual(130);
                

            } else {
                // SHOULD BE BROKEN IMAGE IF FILE UPLOAD IS NOT IMAGE FILE
                expect(this.page.locator('.details-content-file-upload picture img')).toBeEmpty();
            }

        }).toPass({ intervals: [1_000, 10_000, 20_000],
                    timeout: 90_000});
    
    }

    async remove_avatar_image() {
        await this.page.waitForLoadState('networkidle');
        await this.upload_Button.isHidden();
        await this.upload_New_Photo_Button.isVisible();
        await this.remove_image_Button.isVisible();
        await this.remove_image_Button.click();
        expect(await this.remove_image_Button.count()).toEqual(0);
        expect(await this.upload_success_Label.count()).toEqual(0);
        expect(await this.remove_image_Button.count()).toEqual(0);
        await this.remove_image_Button.isHidden();
        await this.upload_success_Label.isHidden();
    }

    async get_image_size() {
        
       // const elementHandle = await imageLocation.elementHandle();

        let loc = this.page.locator('.details-content-file-upload picture img');

        if (loc) {
            const boundingBox = await loc.boundingBox();

            if (boundingBox) {
                const width = boundingBox.width;
                const height = boundingBox.height;

                console.log(`Image width: ${width}, height: ${height}`);
                let size_array = [width, height];
                return size_array;
            } else {
                 console.log("Bounding box is null");
                 let size_array = [0, 0];
                 return size_array;
            }
        } else {
            console.log("Image not found");
            let size_array = [0, 0];
            return size_array;
        } 

    }

    async check_navbar(page: Page) {

        await expect(page).toHaveURL(this.url);

        // ********************<<<<<<<<<<<<<<<<
        console.log("Current page is: " + page.url());

        for (const row2 of await page.locator('.step-text').all()) {
            
            
            if(await row2.textContent() == "Complete your profile") {

                const color = await row2.evaluate((ele) => {
                    return window.getComputedStyle(ele).getPropertyValue("color");
                });
        
                await expect(row2).toHaveCSS('color', `rgb(237, 55, 49)`);
            } else {
                await expect(row2).toHaveCSS('color', `rgb(153, 153, 153)`);
                console.log("Checking color of disabled navbar tabs");
            }
        
        }
    }

    
    async fill_fields(form1 : Complete_Profile_Type, enable_footer: Enable_Profile_Footer_Type) {

        await this.enable_disable_footer_social_fields(this.page, enable_footer);
        //await this.page.waitForTimeout(1000);
        
        await this.name_field.fill(form1.name);
        await this.email_field.fill(form1.email);
        await this.slack_field.fill(form1.slack_handle);
        await this.pronouns.fill(form1.pronouns);
        await this.dob_Month.selectOption(form1.birth_month);
        await this.dob_Day.selectOption(form1.birth_day);

        if(form1.toronto_based) {
            await this.based_GTA_switch.click();
        }

        if(form1.join_locally) {
            await this.can_join_Local_switch.click();
        }


        await this.site_field.fill(form1.site_portfolio);
        await this.linkedin_profile_1.fill(form1.linkedin_profile);

        await this.github_field.fill(form1.github);
        await this.site_field.fill(form1.site_portfolio);
        await this.skills_field.fill(form1.skills_field);

        await this.linkedin_2nd_field.isVisible();

        await this.linkedin_2nd_field.fill(form1.linkedin_other);
        await this.instagram_field.fill(form1.instagram);
        await this.thread_field.fill(form1.threads);
        await this.bluesky_field.fill(form1.bluesky);
        await this.facebook_field.fill(form1.facebook);
        await this.twitter_x_field.fill(form1.twitter_x);

        await this.devto_field.fill(form1.devto);

    }

    unique_username(username: string) {
        let t = (Math.round(Date.now() / 100000000)).toString();

        return username + t;
    }

    async enable_disable_footer_social_fields(page: Page, enable_switch: Enable_Profile_Footer_Type) {

        if(enable_switch.linkedin_other) {
            if(await this.linkedin_icon.isVisible()) {
                await this.linkedin_icon.click();
                   
            }      
        } else {
            if(await this.linkedin_2nd_field.isVisible()) {
                await this.close_linkedin_field_button.click();
            } 
        }

        if(enable_switch.instagram) {
            if(await this.instagram_icon.isVisible()) {
                await this.instagram_icon.click();
            }      
        } else {
            if(await this.instagram_field.isVisible()) {
                await this.close_instagram_field_button.click();
            } 
        }

        if(enable_switch.facebook) {
            if(await this.facebook_icon.isVisible()) {
                await this.facebook_icon.click();
            }      
        } else {
            if(await this.facebook_field.isVisible()) {
                await this.close_facebook_field_button.click();
            } 
        }

        if(enable_switch.threads) {
            if(await this.threads_icon.isVisible()) {
                await this.threads_icon.click();
            }      
        } else {
            if(await this.thread_field.isVisible()) {
                await this.close_threads_field_button.click();
            } 
        }

        if(enable_switch.bluesky) {
            if(await this.bluesky_icon.isVisible()) {
                await this.bluesky_icon.click();
            }      
        } else {
            if(await this.bluesky_field.isVisible()) {
                await this.close_bluesky_field_button.click();
            } 
        }

        if(enable_switch.twitter_x) {
            if(await this.twitter_x_icon.isVisible()) {
                await this.twitter_x_icon.click();
            }      
        } else {
            if(await this.twitter_x_field.isVisible()) {
                await this.close_twitter_x_field_button.click();
            } 
        }

        if(enable_switch.devto) {
            if(await this.dev_icon.isVisible()) {
                await this.dev_icon.click();
            }      
        } else {
            if(await this.devto_field.isVisible()) {
                await this.close_devto_field_button.click();
            } 
        }

        // await page.waitForTimeout(1000);
        

    }



    
  





    

        
       

        
        
        
}