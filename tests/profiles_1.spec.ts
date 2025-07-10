import { expect } from '@playwright/test';
// import { ProfilesPages } from '../page_object_models/pom_profiles';
import { execPath } from 'process';
import { test } from './base.ts';
import AxeBuilder from '@axe-core/playwright';


test.beforeEach( async ({ profilesPage }) => {
  test.setTimeout(50000) // Sets a 40-second timeout for all tests
  await profilesPage.navigate();
});

test.afterEach( async ({ profilesPage }) => {
  test.setTimeout(500) // Sets a 40-second timeout for all tests
  await profilesPage.page.close();
});

test('has title', async ({ profilesPage }) => {


  // Expect a title "to contain" a substring.
  // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

  /*
  for (const row of await page.locator('h3').all()) {
    console.log(await row.textContent());
    expect(await row.textContent() == 'Volunteer Profile');
  } */

  await profilesPage.check_H_tag_text(profilesPage.page, 'Volunteer Profile', 'h3');

});

test('Check Profile Record Fields', async ({ profilesPage }) => {

      // await page.goto("http://localhost:3000/pages/profiles/");

      await profilesPage.page.waitForSelector('.profile-header div p strong');
      // const locator_list = await page.locator('.profile-header div p strong').all();

      // Expect a title "to contain" a substring.
      const fieldCount = await profilesPage.profile_field_wrapper_base.count();
      console.log(fieldCount);

      //console.log(await page.locator('.profile-header div p').allTextContents());

      //const profileNames_Collection = page.locator('.profile-header div p strong');
      //console.log(await profileNames_Collection.allInnerTexts());

      const profileFields = [
        'ID:',
        'Email:',
        'Name:',
        'Description:',
        'Created At:',
        'Inserted At:'
      ]

    const p_list = profilesPage.profile_field_base.allInnerTexts();
    // const p_list = page.getByRole('paragraph').allInnerTexts()

    let i = 0;
    let id_num;
    // let s1, s2;
    /*
    for (const lo of await locator_list) {
    
      console.log(await lo.textContent());
      
      
      if(await lo.textContent() == profileFields[0]) {
        s1 = lo.textContent();
        // s2 = s1

      } 

      if (await lo.textContent() == profileFields[i]) {
        console.log("&&&&************************************");

      } else {

      }
      i++;

      if (i > profileFields.length) { i = 0;}
    } */

    i = 0;
    for (const lo2 of await p_list) {
      // console.log(await lo2)
      let s1 = lo2.split(':');

      if(s1[0] + ":" == profileFields[0]) {
        id_num = s1[0];
        //console.log(s1[0] + ":");
        //console.log(profileFields[i]);

      }

      switch (s1[1]) {
          case 'Email:':
            break;
          case 'Name:':
            break;
          case 'Description:':
            break;
          case 'Created At:':
            break;
          case 'Inserted At:':
            break;
      }

      expect(s1[0] + ":" == profileFields[i]);
      i++;

      if (i > profileFields.length) {
        i = 0;
      }
    }


  
  // console.log(profileNames_Collection);
  // expect(await profileNames_Collection.allInnerTexts()).toEqual(profileFields);

});



/*
test("all Facebook links are valid", async ({page, request}) => {
    await page.setContent('html');
    const links = await page.locator("a")
      .evaluateAll(els => els.map(el => el.href));
    const chunk = 3;
  
    for (let i = 0; i < links.length; i += chunk) {
      await Promise.all(links.slice(i, i + chunk).map(e => request.get(e)));
    }
  });
  */
 

test('Check Links', async ({ profilesPage }) => {

    // const browser_context = await browser.newContext();
    //const page = await browser_context.newPage();

    //await page.goto("http://localhost:3000/pages/profiles/"); 

  // Click the get started link.
  await profilesPage.facebook_link_base.isVisible();

  // console.log(await page.getByRole('link', { name: 'Facebook' }));

  // Expects page to have a heading with the name of Installation.
  await expect(profilesPage.twitter_x_link_base).toBeVisible();


  /*
  // CHECK H3 taga for correct text
  for (const row of await page.locator('h3').all()) {
    expect(await row.textContent() == 'Volunteer Profile');
  } */

  await profilesPage.check_H_tag_text(profilesPage.page, 'Volunteer Profile', 'h3');

  await profilesPage.click_social_links(profilesPage.social_media_link_base, profilesPage.page);

  /*
  for (const row of await profilesPage.social_media_link_base.all()) {
     let temp = await row.textContent();
     console.log(temp);
     
     let [newPage_1] = await Promise.all([
            profilesPage.page.waitForEvent("popup"), // pending, fullfilled or rejected
            await row.click()
        ]);
        
      let pp = await newPage_1.evaluate(() => window.location.href);
      console.log(pp);

      if(temp != "Twitter") { 
        expect(pp).toContain(temp?.toLowerCase());

      } else {
         expect(pp).toContain("x.com");
      }

      await newPage_1.close();
  } */

});

/*
test('PROFILES PAGE SCREENSHOT COMPARISON TEST', async({ profilesPage}) => {
        await profilesPage.page.waitForURL(profilesPage.url);
        await expect(profilesPage.page).toHaveScreenshot("profiles_page_screen.png");
  }); */

test.describe('ASSESSIBILITY Suite', () => {

    test('BASIC WCAG22AA', async({page }) => {
        
        const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22aa"]).analyze();
        expect( axeBuilder.violations).toEqual([]);
    });
});
