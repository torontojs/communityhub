import { test, expect, type Page, type Locator, Browser, BrowserContext } from '@playwright/test';
import { threadId } from 'worker_threads';

export class TeamsPage {
    readonly url: string = 'http://localhost:3000/pages/team/';
    readonly page: Page;
    readonly dragon_link_base: Locator;
    readonly druid_link_base: Locator;
    readonly crafters_link_base: Locator;
    readonly organisers_link_base: Locator;

    readonly page_title: Locator;
    readonly dragon_title: Locator;
    readonly dragon_subtitle: Locator;

    readonly druid_title: Locator;
    readonly druid_subtitle: Locator;
    readonly crafters_title: Locator;
    readonly crafters_subtitle: Locator;
    readonly omni_title: Locator;
    readonly omni_subtitle: Locator;

    readonly team_member_title_0: Locator;
    readonly team_member_title_1: Locator;
    readonly team_member_title_2: Locator;
    readonly team_member_title_3: Locator;



    public constructor(page: Page) {
        this.page = page;
        this.page_title = page.getByRole('heading', { name: 'The volunteer clans of' });
        

        this.dragon_link_base = page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link");
        this.druid_link_base = page.getByText('Toronto JS\' tournament wizards!Team membersJohn DoelinkedinJane').getByRole("link");
        this.crafters_link_base = page.getByText('Toronto JS\' tournament wizards!Team membersJohn DoelinkedinJane').getByRole("link");
        this.organisers_link_base = page.getByText('Toronto JS\' overseeing overlords!Team membersJohn DoelinkedinJane').getByRole("link");

        this.dragon_title = page.getByRole('heading', { name: 'Design Dragons' });
        this.dragon_subtitle = page.getByText('Toronto JS\' awesome creative');
        this.druid_title = page.getByRole('heading', { name: 'Development Druids' });
        this.druid_subtitle = page.getByRole('heading', { name: 'Development Druids' });
        this.omni_title = page.getByRole('heading', { name: 'Omnipotent Organisers' });
        this.omni_subtitle = page.getByText('Toronto JS\' overseeing');

        this.crafters_title = page.getByRole('heading', { name: 'Community Crafters' });
        this.crafters_subtitle = page.getByText('Toronto JS\' tournament');

        this.team_member_title_0 = page.locator('#team-members-label-0');
        this.team_member_title_1 = page.locator('#team-members-label-1');
        this.team_member_title_2 = page.locator('#team-members-label-2');
        this.team_member_title_3 = page.locator('#team-members-label-3');

    }

    async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }

    async check_profile_links(base_locator: Locator, page: Page, url_expected: string) {

        for (const row of await base_locator.all()) {
            expect(row).toBeVisible();
            let temp = await row.textContent();
            console.log(temp);
            
            let [newPage_1] = await Promise.all([
                    page.waitForEvent("popup"), // pending, fullfilled or rejected
                    await row.click()    
                ]);

            console.log(newPage_1.url());
            let pp = newPage_1.url();

            expect(pp.includes(url_expected));

            // await this.page.waitForTimeout(2000);

            await newPage_1.close();

        }

    }
}