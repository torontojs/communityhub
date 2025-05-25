import { test, expect, type Page, type Locator } from '@playwright/test';

export class CompleteProfilePage {
    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/complete-profile/'; 
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
    readonly file_picker: Locator;
    readonly remove_image_Button: Locator;
    readonly upload_success_Label: Locator;

    readonly linkedin_profile_1: Locator;
    readonly github_field: Locator;
    readonly site_field: Locator;
    readonly skills_field: Locator;

    readonly instagram_field: Locator;
    readonly linkedin_2nd_field: Locator;

    readonly facebook_icon: Locator;
    readonly instagram_icon: Locator;
    readonly threads_icon: Locator;
    readonly bluesky_icon: Locator;
    readonly twitter_x_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly dev_icon: Locator;

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
        this.linkedin_2nd_field = page.getByRole('textbox', {name: 'LinkedIn'}).nth(1);
        this.facebook_icon = page.getByRole('button', { name: 'Add Facebook account' });
        this.instagram_icon = page.getByRole('button', { name: 'Add Instagram account' });
        this.threads_icon = page.getByRole('button', { name: 'Add Threads account' });
        this.twitter_x_icon = page.getByRole('button', { name: 'Add X account' });
        this.bluesky_icon = page.getByRole('button', { name: 'Add BlueSky account' });
        this.linkedin_icon = page.getByRole('button', { name: 'Add LinkedIn account' });
        this.dev_icon = page.getByRole('button', { name: 'Add Dev.to account' });

        this.complete_button = page.getByRole('button', {name: 'Complete My Profile'});

    }
    
    async navigate() {
        await this.page.goto(this.url); 
    }

    async upload_avatar_image(image_path: string) {
        this.upload_Button.isVisible();
        await this.upload_Button.click();
        //### FILE PICKER
        await this.file_picker.setInputFiles(image_path);
        await this.page.waitForTimeout(1200);
        await this.upload_Button.isVisible();
        await this.remove_image_Button.isVisible();
        await this.upload_success_Label.isVisible();
        expect(this.page.locator('.details-content-file-upload picture img')).toHaveCSS('height', '128px');
        expect(this.page.locator('.details-content-file-upload picture img')).toHaveCSS('width', '128px');
    }

    async remove_avatar_image() {
        await this.remove_image_Button.click();
        expect(await this.remove_image_Button.count()).toEqual(0);
        expect(await this.upload_success_Label.count()).toEqual(0);
        expect(await this.remove_image_Button.count()).toEqual(0);
        await this.remove_image_Button.isHidden();
        await this.upload_success_Label.isHidden();
        await this.page.waitForTimeout(2000);
    }



  





    

        
       

        
        
        
}