import { test, expect, type Page, type Locator, Browser } from '@playwright/test';

export class CheckEmailPage {

    readonly page: Page;
    readonly url: string = 'http://localhost:3000/pages/check-your-email/'; 

    readonly page_title: Locator;

    readonly change_email_link: Locator;

    readonly torontoJS_icon: Locator;
    readonly home_icon: Locator;
    readonly linkedin_icon: Locator;
    readonly youtube_icon: Locator;
    readonly instagram_icon: Locator;
    readonly twitter_x_icon: Locator;

    public constructor(page: Page) { 
        this.page = page;
        this.page_title = page.getByRole('heading', {name: 'Check your e-mail'});
        this.change_email_link = page.getByRole('link', { name: 'Change it' });

        this.torontoJS_icon = page.getByText('TorontoJS');
        this.home_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').first();
        this.youtube_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(1);
        this.instagram_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(2);
        this.twitter_x_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(3);
        this.linkedin_icon = page.getByRole('navigation', { name: 'Secondary Navigation' }).getByRole('link').nth(4);
        
    }

    async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }

}