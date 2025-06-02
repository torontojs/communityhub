import { test, expect } from '@playwright/test';
import { TeamsPage } from '../page_object_models/pom_teams';
import { execPath } from 'process';

test('CHECK Design Dragon links', async ({ browser }) => {


    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    const teamsPage = new TeamsPage(page);

    teamsPage.navigate();


   // await page.goto("http://localhost:3000/pages/team/"); 

   // const design_team = await page.getByText('Toronto JS').getByRole("link").all();

   /*
   console.log("****");
   let i = 1;
   await page.waitForTimeout(2000);
    for(const cc2 of await page.locator(".team-member-card .team-member-profile-link").getByRole("link").all()) {
        console.log(await cc2.textContent());
        console.log(i);
        i++;
        await page.waitForTimeout(2000);
    }
    */
  
  await page.waitForTimeout(2000);
  console.log((await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()).length);

  await teamsPage.check_profile_links(teamsPage.dragon_link_base, browser_context, "linkedin.com");

  /*
  
  for (const row of await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()) {
     let temp = await row.textContent();
     console.log(temp);
     console.log(await page.evaluate(() => window.location.href));

     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            row.hover(),
            await row.click()    
      ]);
        
      console.log(newPage_1.url());
      let pp = newPage_1.url();
      // let pp = await newPage_1.evaluate(() => window.location.href);
      // console.log(pp);

      expect(pp.includes("linkedin.com"));

      await newPage_1.close();
    // expect(await row.textContent() == 'Volunteer Profile');

    

  } 
  */

  await page.close();
});

test('CHECK DEVELOPMENT DRUIDS Profile links', async ({ browser }) => {

  const browser_context = await browser.newContext();
  const page = await browser_context.newPage();

  const teamsPage = new TeamsPage(page);

  teamsPage.navigate();

    // await page.goto("http://localhost:3000/pages/team/"); 

  await page.waitForTimeout(2000);
  console.log((await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()).length);

  await teamsPage.check_profile_links(teamsPage.druid_link_base, browser_context, "linkedin.com");

  await page.waitForTimeout(2000);

  await page.close();
});

test('COMMUNITY CRAFTERS links', async ({ browser }) => {

  const browser_context = await browser.newContext();
  const page = await browser_context.newPage();

  const teamsPage = new TeamsPage(page);

  teamsPage.navigate();

  await page.waitForTimeout(2000);

  await teamsPage.check_profile_links(teamsPage.crafters_link_base, browser_context, "linkedin.com");

  await page.waitForTimeout(2000);


  await page.close();
});

test('OMNIPOTENT ORGANISERS links', async ({ browser }) => {

  const browser_context = await browser.newContext();
  const page = await browser_context.newPage();

  const teamsPage = new TeamsPage(page);

  teamsPage.navigate();

  await page.waitForTimeout(2000);

  await teamsPage.check_profile_links(teamsPage.organisers_link_base, browser_context, "linkedin.com");

  await page.close();
});