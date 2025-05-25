import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class SignUpPage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/sign-up/'; 

    readonly page_title_1: Locator;
    readonly page_title_2: Locator

    readonly login_form: Locator;
    readonly name_field: Locator;
    readonly email_field: Locator;
    readonly password_field: Locator;

    readonly password_level_low: Locator;
    readonly password_level_middle: Locator;
    readonly password_level_high: Locator;

    readonly red_Account_button: Locator;

    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;

    readonly password_strength_Label: Locator;
    readonly password_strength_suggestions_Label: Locator;

    public constructor(page: Page) { 
        this.page = page;
        this.url = this.url;

        this.page_title_2 = page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub'});
        this.page_title_1 = page.getByRole('heading', { name: 'Sign Up to TorontoJS' })

        this.name_field = page. getByRole('textbox', { name: 'Name' });
        this.email_field = page.getByRole('textbox', { name: 'E-mail REQUIRED' });
        this.password_field = page.getByRole('textbox', { name: 'Password: REQUIRED' });
        this.login_form = page.locator('.login-form');

        this.password_strength_Label = page.locator("#password-input-strength span");
        this.password_level_low = page.locator(".password-meter .password-meter-level").first();
        this.password_level_middle = page.locator(".password-meter .password-meter-level").nth(1);
        this.password_level_high = page.locator(".password-meter .password-meter-level").nth(2);

        this.home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        this.youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        this.instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        this.twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        this.linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);

        this.password_strength_suggestions_Label = page.locator('#password-input-suggestion p');

        this.red_Account_button = page.getByRole('button', { name: 'Create Account' });


    }

    async navigate() {
         await this.page.goto(this.url); 
    }

    async fill_fields(username: string, email: string, password: string) {

        await this.name_field.isVisible();
        await this.email_field.isVisible();
        await this.password_field.isVisible();
        await this.name_field.fill(username);
        await this.email_field.fill(email);
        await this.password_field.fill(password);


    }

    // CONCATENATES DATE TO SUPPLIED USERNAME TO CREATE UNIQUE PASSWORD
    async unique_username(username: string) {
        let t = (Math.round(Date.now() / 100000000)).toString();
        return username + t;
    }

    async password_analysis() {

    }

}