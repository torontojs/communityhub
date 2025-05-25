import { test, expect, Page } from '@playwright/test';
import { execPath } from 'process';

export function convertHexToRGB(hex) {
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

test.describe('ACCOUNT CONFIRMED Test Suite', () => {
  test('Account Confirmed page - Text check', async ({ page }) => {
    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
    await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
    await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

    await page.getByText('Check the TorontoJS\'s conduct').isVisible();
    await page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' }).isVisible();

    await page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ }).isVisible();
    await page.locator('#check-steps').getByText('Complete your profile').isVisible();

    /*
    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

    for (const row of await page.locator('h3').all()) {
      console.log(await row.textContent());
      expect(await row.textContent() == 'Volunteer Profile');
    } */

    await page.close();           
  });

  test('Account Confirmed - Lets Continue Button examination', async ({ page }) => {

    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    let rbgColors = convertHexToRGB("#ED3731");
    const let_button = page.getByRole('link', {name: "Let\'s continue"});

    await let_button.isVisible();

    await expect(let_button).toHaveCSS('background-color',
      `rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);
      
    await page.close();

  });

  test('Account Confirmed - Lets Continue Button Click', async ({ page }) => {
    await page.goto('http://localhost:3000/pages/check-steps/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    const let_button = page.getByRole('link', {name: "Let\'s continue"});

    await let_button.isVisible();

    let rbgColors = convertHexToRGB("#ED3731");

    const color = await let_button.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("background-color");
    });

    console.log(color);

    expect(color).toBe(`rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);
    

    await let_button.click();

    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');
    
    

    // await expect(page.getByText("Check the conduct code")).toHaveCSS('background-color',
    //  `rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);

   const btn = page.locator(".dropbtn");

   const all_spans = page.locator('span').all()

   await page.waitForTimeout(3000);

   for (const row2 of await page.locator('.step-text').all()) {
    console.log(await row2.textContent());
    
    if(await row2.textContent() == "Check the conduct code") {
        console.log(":::"); 

      await expect(row2).toHaveCSS('color',
        `rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);
    } else {
        await expect(row2).toHaveCSS('color',
          'rgb(153, 153, 153)');
    }
    
  }

  await page.waitForTimeout(100);


  await page.close;
   
  });

  
});


test.describe('CHECK THE CONDUCT CODE Test Suite', () => {

  test('2 Check the conduct code - Top Text Check', async ({ page }) => {

    await page.goto('http://localhost:3000/pages/review-conduct-code/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', { name: 'Review our conduct code' }).isVisible();

    await page.getByText('We are a community driven by').isVisible();

    await page.waitForTimeout(3000);
      
    await page.close();

  });

  test('2 Check the conduct code - NUTSHELL box', async ({ page }) => {

    await page.goto('http://localhost:3000/pages/review-conduct-code/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByText('In a nutshell:').isVisible();
    expect(page.getByText('In a nutshell:')).toHaveCSS('color', 'rgb(255, 255, 255)');
    expect(page.getByText('In a nutshell:')).toHaveCSS('background-color', 'rgb(237, 55, 49)');


    await page.getByText('All our members are committed').isVisible();
    await page.getByText('Developers, designers and other tech workers').isVisible();
    await page.getByText('The TorontoJS activities are non-profit').isVisible();
    

    const conduct_code_list = page.locator('#conduct-code').all();

    // Check NUMBER CIRCLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    for(let i = 1; i < 4; i++) {

      await page.locator('#conduct-code').getByText(String(i)).isVisible();
      console.log(await page.locator('#conduct-code').getByText(String(i)).textContent());
      expect(page.locator('#conduct-code').getByText(String(i))).toHaveCSS('width', '36px');
      expect(page.locator('#conduct-code').getByText(String(i))).toHaveCSS('color', 'rgb(255, 255, 255)');
      expect(page.locator('#conduct-code').getByText(String(i))).toHaveCSS('background-color', 'rgb(237, 55, 49)');

    }

    await page.waitForTimeout(3000);

    let rbgColors = convertHexToRGB("#ED3731");
    const box_header = page.getByText('In a nutshell:');

    await box_header.isVisible();

    await expect(box_header).toHaveCSS('background-color',
      `rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);
      
    await page.close();

  });

  test('2 Check the conduct code - SUMMARY DROP-DOWN LIST', async ({ page }) => {

    await page.goto('http://localhost:3000/pages/review-conduct-code/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByRole('heading', { name: 'Review our conduct code' }).isVisible();

    await page.getByText('We are a community driven by').isVisible();

    await expect(page.locator('.dropdown-list')).toHaveCSS('accent-color',
      'rgb(237, 55, 49)');

    for (let i; i < 6; i++) {  
          await page.locator('summary').filter({ hasText: 'TorontoJS Code of Conduct' }).click();
          await page.waitForTimeout(1000);
          await page.locator('summary').filter({ hasText: 'Volunteering Agreement' }).click();

          await page.locator('summary').filter({ hasText: 'Image Release Form' }).click()

          await page.waitForTimeout(2000);

    }

    await page.waitForTimeout(4000);

    await page.getByText('TorontoJS Code of Conduct').click();

    await page.getByText('Volunteering Agreement').click();

    await page.getByText('Image Release Form').click()

    await page.waitForTimeout(4000);
      
    await page.close();

  });

  test('2 Check the conduct code - COMPLETE PROFILE button', async ({ page }) => {

    await page.goto('http://localhost:3000/pages/review-conduct-code/');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await page.getByText('I agree to TorontoJS\’s').isVisible();
    expect(page.getByText('I agree to TorontoJS\’s')).toHaveCSS('font-size', '16.8697px');
    expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).isVisible();
    await page.getByRole('button', { name: 'Let me complete my profile' }).isDisabled();
    expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgb(237, 55, 49)');
    await page.waitForTimeout(150);

    await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    await page.getByRole('button', { name: 'Let me complete my profile' }).isEnabled();
    expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');
    await page.waitForTimeout(150);

    await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    await page.getByRole('button', { name: 'Let me complete my profile' }).isDisabled();
    await page.waitForTimeout(3000);
    
    console.log("click -----");

    await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    await page.getByRole('button', { name: 'Let me complete my profile' }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("http://localhost:3000/pages/complete-profile/?");

    for (const row2 of await page.locator('.step-text').all()) {
      console.log(await row2.textContent());
      
      if(await row2.textContent() == "Complete your profile") {

          const color = await row2.evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("color");
          });
  
        await expect(row2).toHaveCSS('color', `rgb(237, 55, 49)`);
      } else {
          await expect(row2).toHaveCSS('color', `rgb(153, 153, 153)`);
          console.log("Checking color of disabled navbar tabs");
      }
      
    }

      
    await page.close();

  });


});