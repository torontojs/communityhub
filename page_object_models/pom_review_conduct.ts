import { test, expect, type Page, type Locator } from '@playwright/test';
import { assert } from 'console';

export class ReviewConductPage {
    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/review-conduct-code/'; 
    // readonly url_2: string = 'http://localhost:3000/pages/review-conduct-code/';
    // 'https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/';

    readonly review_title: Locator;
    readonly subtitle: Locator;

    readonly account_confirm_tab: Locator;
    readonly conduct_code_tab: Locator;
    readonly complete_profile_tab: Locator;

    readonly nutshell_wrapper: Locator;
    readonly nutshell_dialog_heading: Locator;
    readonly nutshell_text_1: Locator;
    readonly nutshell_text_2: Locator;
    readonly nutshell_text_3: Locator;
    readonly circle_1: Locator;
    readonly circle_2: Locator;
    readonly circle_3: Locator;

    readonly dropdown_Volunteering: Locator;
    readonly dropdown_TorontoJS_conduct: Locator;
    readonly dropdown_Release_form: Locator;

    readonly checkbox_I_agree: Locator;
    readonly checkbox_text: Locator;

    readonly continue_button: Locator;

    readonly content_wrapper: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.review_title = page.getByRole('heading', { name: 'Review our conduct code' });
        this.subtitle = page.getByText('We are a community driven by');
        // this.review_title = page.getByText('We are a community driven by');

        this.account_confirm_tab = page.getByRole('listitem', {name: 'Account confirmed'});
        this.conduct_code_tab = page.getByRole('listitem', {name: 'Check the conduct code'});
        this.complete_profile_tab = page.getByRole('listitem', {name: 'Complete your profile'});

        this.nutshell_dialog_heading = page.getByText('In a nutshell:');
        this.nutshell_wrapper = page.getByRole('list').filter({ hasText: '1All our members are' });
        this.nutshell_text_1 = page.getByText('All our members are committed');
        this.nutshell_text_2 = page.getByText('Developers, designers and');
        this.nutshell_text_3 = page.getByText('The TorontoJS activities are');
        this.circle_1 = page.locator('#conduct-code').getByText('1', { exact: true });
        this.circle_2 = page.locator('#conduct-code').getByText('2', { exact: true });
        this.circle_3 = page.locator('#conduct-code').getByText('3', { exact: true });

        this.dropdown_Volunteering = page.getByRole('group').filter({ hasText: 'Volunteering AgreementToronto' }).locator('#arrow-down-icon');
        this.dropdown_TorontoJS_conduct = page.getByRole('group').filter({ hasText: 'TorontoJS Code of' }).locator('#arrow-down-icon');
        this.dropdown_Release_form = page.getByRole('group').filter({ hasText: 'Image Release FormToronto JS' }).locator('#arrow-down-icon');
        

        this.continue_button = page.getByRole('button', { name: 'Let me complete my profile' });

        this.content_wrapper = page.getByText('We are a community driven by');

        this.checkbox_I_agree = page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' });
        this.checkbox_text = page.getByText('I agree to TorontoJS’s');


    }

    async convertHexToRGB(hex: string) {
        // Remove the '#' if it's included in the input
        hex = hex.replace(/^#/, '');

        // Parse the hex values into separate R, G, and B values
        const red = parseInt(hex.substring(0, 2), 16);
        const green = parseInt(hex.substring(2, 4), 16);
        const blue = parseInt(hex.substring(4, 6), 16);

        // Return the RGB values in an object
        return {
            red: red,
            green: green,
            blue: blue,
        };
    }

    async navigate() {
        await this.page.goto(this.url); 
        // console.log(this.page.url())
        expect(this.page.url()).toBe(this.url);
    }

    async check_navbar(page: Page) {

        await expect(page).toHaveURL(this.url);
        
        // ********************<<<<<<<<<<<<<<<<
        console.log("Current page is: " + page.url());

        for (const row2 of await page.locator('.step-text').all()) {
            
            if(await row2.textContent() == "Check the conduct code") {

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

}
