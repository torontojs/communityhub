import { test, expect } from '@playwright/test';
import { ProfilesPages } from '../page_object_models/pom_profiles';
import { execPath } from 'process';

/*
test.beforeEach(async ({page }) => {

  
   // await page.goto('http://localhost:3000/pages/profiles/'); 

}) */

test.beforeEach( async ({ page }) => {
  test.setTimeout(50000) // Sets a 40-second timeout for all tests

});

test('has title', async ({ page }) => {

  // await page.goto("http://localhost:3000/pages/profiles/");

  const profilePages = new ProfilesPages(page);

  await profilePages.navigate();


  // Expect a title "to contain" a substring.
  // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

  /*
  for (const row of await page.locator('h3').all()) {
    console.log(await row.textContent());
    expect(await row.textContent() == 'Volunteer Profile');
  } */

  await profilePages.check_H_tag_text(page, 'Volunteer Profile', 'h3');

  await page.close();
});

test('Check Profile Record Fields', async ({ page }) => {

      // await page.goto("http://localhost:3000/pages/profiles/");

      const profilePages = new ProfilesPages(page);

      await profilePages.navigate();

      await page.waitForSelector('.profile-header div p strong');
      const locator_list = await page.locator('.profile-header div p strong').all();

      // Expect a title "to contain" a substring.
      const fieldCount = await page.locator('.profile-header').count();
      console.log(fieldCount);

      //console.log(await page.locator('.profile-header div p').allTextContents());

      //const profileNames_Collection = page.locator('.profile-header div p strong');
      //console.log(await profileNames_Collection.allInnerTexts());

      test.setTimeout(3000);

      const profileFields = [
        'ID:',
        'Email:',
        'Name:',
        'Description:',
        'Created At:',
        'Inserted At:'
      ]

    const p_list = page.getByRole('paragraph').allInnerTexts()

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

  await page.close();
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
 

test('Check Links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/profiles/"); 

  // Click the get started link.
  await page.getByRole('link', { name: 'Facebook' }).isVisible;

  // console.log(await page.getByRole('link', { name: 'Facebook' }));

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('link', { name: 'Twitter' })).toBeVisible();

  // CHECK H3 taga for correct text
  for (const row of await page.locator('h3').all()) {
    expect(await row.textContent() == 'Volunteer Profile');
  }

  for (const row of await page.locator('.social-links a').all()) {
     let temp = await row.textContent();
     console.log(temp);
     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click()
        ]);
        
      let pp = await newPage_1.evaluate(() => window.location.href);
      console.log(pp);
      // console.log("----");

      if(temp != "Twitter") { 
        expect(pp).toContain(temp?.toLowerCase());

      } else {
         expect(pp).toContain("x.com");
      }

      await newPage_1.close();
    // expect(await row.textContent() == 'Volunteer Profile');
  }

  await page.close();
});
