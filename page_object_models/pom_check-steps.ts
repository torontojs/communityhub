import { test, expect, type Page, type Locator } from '@playwright/test';

export class CheckSteps {
    readonly page: Page;
    readonly url_1: string = 'http://localhost:3000/pages/check-steps/'; 
    readonly url_2: string = 'http://localhost:3000/pages/review-conduct-code/';
    // 'https://26-profile-page-css.volunteer-ekr.pages.dev/pages/complete-profile/';

    readonly welcome_title: Locator;
    readonly review_title: Locator;

    readonly account_confirm_tab: Locator;
    readonly conduct_code_tab: Locator;
    readonly complete_profile_tab: Locator;

    readonly conduct_dialog: Locator;
    readonly conduct_dialog_title: Locator;
    readonly complete_profile_dialog: Locator;
    readonly complete_profile_dialog_title: Locator;

    readonly continue_button: Locator;

    public constructor(page: Page) {
        this.welcome_title = page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'});

        this.account_confirm_tab = page.getByRole('listitem', {name: 'Account confirmed'});
        this.conduct_code_tab = page.getByRole('listitem', {name: 'Check the conduct code'});
        this.complete_profile_tab = page.getByRole('listitem', {name: 'Complete your profile'});

        this.conduct_dialog_title = page.getByText('Check the TorontoJS\'s conduct');
        this.conduct_dialog = page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' });
        this.complete_profile_dialog_title = page.locator('#check-steps').getByText('Complete your profile');
        this.complete_profile_dialog = page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ });

        this.continue_button = page.getByRole('link', {name: "Let\'s continue"});


    }

    async convertHexToRGB(hex) {
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


}
