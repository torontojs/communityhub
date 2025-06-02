import { test, expect, type Page, type Locator, Browser, BrowserContext } from '@playwright/test';

export class TeamsPage {
    readonly url: string = 'http://localhost:3000/pages/team/';
    readonly page: Page;
    readonly dragon_link_base: Locator;
    readonly druid_link_base: Locator;
    readonly crafters_link_base: Locator;
    readonly organisers_link_base: Locator;



    public constructor(page: Page) {
        this.page = page;
        this.dragon_link_base = page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link");
        this.druid_link_base = page.getByText('Toronto JS\' tournament wizards!Team membersJohn DoelinkedinJane').getByRole("link");
        this.crafters_link_base = page.getByText('Toronto JS\' tournament wizards!Team membersJohn DoelinkedinJane').getByRole("link");
        this.organisers_link_base = page.getByText('Toronto JS\' overseeing overlords!Team membersJohn DoelinkedinJane').getByRole("link");



    }

    async navigate() {
        await this.page.goto(this.url); 
        console.log(this.page.url())
        expect(this.page.url()).toBe(this.url);
    }

    async check_profile_links(base_locator: Locator, browser_context: BrowserContext, url_expected: string) {

        for (const row of await base_locator.all()) {
            expect(row).toBeVisible();
            let temp = await row.textContent();
            console.log(temp);
            
            let [newPage_1] = await Promise.all([
                    browser_context.waitForEvent("page"), // pending, fullfilled or rejected
                    await row.click()    
                ]);

            console.log(newPage_1.url());
            let pp = newPage_1.url();

            expect(pp.includes(url_expected));

            await this.page.waitForTimeout(2000);

            await newPage_1.close();

        }

    }
}