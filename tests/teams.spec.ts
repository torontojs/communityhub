import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('Design Dragon links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/team/"); 

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
  
  for (const row of await page.getByText('Toronto JS\' awesome creative minds!Team members').getByRole("link").all()) {
     let temp = await row.textContent();
     console.log(temp);
     console.log(await page.evaluate(() => window.location.href));

     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            row.hover(),
            await row.click()    
        ]);

     // expect(newPage_1.getByRole('link', { name: 'About' } ));
        
      // newPage_1.waitForTimeout(1000);
      console.log(newPage_1.url());
      let pp = newPage_1.url();
      // let pp = await newPage_1.evaluate(() => window.location.href);
      // console.log(pp);

      expect(pp.includes("linkedin.com"));

      await newPage_1.close();
    // expect(await row.textContent() == 'Volunteer Profile');

    

  } 



  await page.close();
});

test('DEVELOPMENT DRUIDS links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/team/"); 

  await page.waitForTimeout(2000);

  for (const row of await page.getByText('Toronto JS\' tournament wizards!Team membersJohn DoelinkedinJane').getByRole("link").all()) {
     let temp = await row.textContent();
     console.log(temp);
     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click()    
        ]);

      console.log(newPage_1.url());
      let pp = newPage_1.url();

      expect(pp.includes("linkedin.com"));

      await newPage_1.close();
  } 

  await page.close();
});

test('COMMUNITY CRAFTERS links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/team/"); 

  await page.waitForTimeout(2000);

  for (const row of await page.getByText('Toronto JS\' tournament wizards!Team membersJohn DoelinkedinJane').getByRole("link").all()) {
     let temp = await row.textContent();
     console.log(temp);
     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click()    
        ]);

      console.log(newPage_1.url());
      let pp = newPage_1.url();

      expect(pp.includes("linkedin.com"));

      await newPage_1.close();
  } 



  await page.close();
});

test('OMNIPOTENT ORGANISERS links', async ({ browser }) => {

    const browser_context = await browser.newContext();
    const page = await browser_context.newPage();

    await page.goto("http://localhost:3000/pages/team/"); 

  await page.waitForTimeout(2000);

  for (const row of await page.getByText('Toronto JS\' overseeing overlords!Team membersJohn DoelinkedinJane').getByRole("link").all()) {
     let temp = await row.textContent();
     console.log(temp);
     
     let [newPage_1] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click()    
        ]);

      console.log(newPage_1.url());
      let pp = newPage_1.url();

      expect(pp.includes("linkedin.com"));

      await newPage_1.close();
  } 

  await page.close();
});