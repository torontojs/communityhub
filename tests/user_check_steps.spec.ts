import { test, expect, Page } from '@playwright/test';
import { CheckStepsPage } from '../page_object_models/pom_check-steps'
import { ReviewConductPage } from '../page_object_models/pom_review_conduct';
import { execPath } from 'process';

/*
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
} */

test.beforeEach( async ({ page }) => {
    test.setTimeout(50000) // Sets a 40-second timeout for all tests

});

test.describe('ACCOUNT CONFIRMED Test Suite', () => {
  test('Account Confirmed page - Text check', async ({ page }) => {
    // await page.goto('http://localhost:3000/pages/check-steps/');

    const checkStepsPage = new CheckStepsPage(page);
    await checkStepsPage.navigate();

    await checkStepsPage.welcome_title.isVisible();

    await checkStepsPage.account_confirm_tab.isVisible();
    await checkStepsPage.conduct_code_tab.isVisible();
    await checkStepsPage.complete_profile_tab.isVisible();
    
    await checkStepsPage.complete_profile_dialog_title.isVisible();
    await checkStepsPage.complete_profile_dialog.isVisible();

    await checkStepsPage.conduct_dialog_title.isVisible();
    await checkStepsPage.conduct_dialog.isVisible();
  
    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    /*
    await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.getByRole('listitem', {name: 'Account confirmed'}).isVisible();
    await page.getByRole('listitem', {name: 'Check the conduct code'}).isVisible();
    await page.getByRole('listitem', {name: 'Complete your profile'}).isVisible();

    await page.getByText('Check the TorontoJS\'s conduct').isVisible();
    await page.getByRole('listitem').filter({ hasText: 'Check the TorontoJS\'s conduct' }).isVisible();

    await page.getByRole('listitem').filter({ hasText: /^Complete your profile$/ }).isVisible();
    await page.locator('#check-steps').getByText('Complete your profile').isVisible();
    */
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
    
    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    const checkStepsPage = new CheckStepsPage(page);
    await checkStepsPage.navigate();
    await checkStepsPage.welcome_title.isVisible();


    // await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    let rbgColors = checkStepsPage.convertHexToRGB("#333333");

    await checkStepsPage.continue_button.isVisible();

    await expect(checkStepsPage.continue_button).toHaveCSS('background-color',
      `rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
      
    await page.close();

  });

  test('Account Confirmed - Lets Continue Button Click', async ({ page }) => {
    // await page.goto('http://localhost:3000/pages/check-steps/');

    const checkStepsPage = new CheckStepsPage(page);
    await checkStepsPage.navigate();
    await checkStepsPage.welcome_title.isVisible();

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    //await page.getByRole('heading', {name: 'Welcome to TorontoJS Community Hub!'}).isVisible();

    await page.waitForTimeout(3000);

    // const let_button = page.getByRole('link', {name: "Let\'s continue"});

    await checkStepsPage.continue_button.isVisible();

    let rbgColors = checkStepsPage.convertHexToRGB("#333333");

    const color = await checkStepsPage.continue_button.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("background-color");
    });

    console.log(color);

    expect(color).toBe(`rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
    

    await checkStepsPage.continue_button.click();

    // Expect a title "to contain" a substring.
    // await expect(page.locator('h3')).toHaveText('Volunteer Profile');
    
    

    // await expect(page.getByText("Check the conduct code")).toHaveCSS('background-color',
    //  `rgb(${ rbgColors.red }, ${ rbgColors.green }, ${ rbgColors.blue })`);

   const btn = page.locator(".dropbtn");

   const all_spans = page.locator('span').all()

   await page.waitForTimeout(3000);

   rbgColors = checkStepsPage.convertHexToRGB("#ED3731");

   for (const row2 of await page.locator('.step-text').all()) {
    console.log(await row2.textContent());
    
    if(await row2.textContent() == "Check the conduct code") {
        console.log(":::"); 

      await expect(row2).toHaveCSS('color',
        `rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
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

  test('Page 2 - CONDUCT CODE - CHECK TEXT for HEADERS', async ({ page }) => {

    const reviewConductPage = new ReviewConductPage(page);

    await reviewConductPage.navigate();

    await reviewConductPage.review_title.isVisible();
    await reviewConductPage.subtitle.isVisible();

    await expect(reviewConductPage.review_title).toHaveCSS('text-align', 'center');
    await expect(reviewConductPage.subtitle).toHaveCSS('text-align', 'center');

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    //await page.getByRole('heading', { name: 'Review our conduct code' }).isVisible();

    // await page.getByText('We are a community driven by').isVisible();


    await page.waitForTimeout(3000);
      
    await page.close();

  });

  test('Page 2 - CONDUCT CODE - CHECK NUTSHELL box PROPERTIES', async ({ page }) => {

    // await page.goto('http://localhost:3000/pages/review-conduct-code/');

    const reviewConductPage = new ReviewConductPage(page);

    await reviewConductPage.navigate();

    await reviewConductPage.nutshell_dialog_heading.isVisible();
    await reviewConductPage.nutshell_text_1.isVisible();
    await reviewConductPage.nutshell_text_2.isVisible();
    await reviewConductPage.nutshell_text_3.isVisible();

    expect(reviewConductPage.nutshell_dialog_heading).toHaveCSS('color', 'rgb(255, 255, 255)');
    expect(reviewConductPage.nutshell_dialog_heading).toHaveCSS('background-color', 'rgb(237, 55, 49)');


    await reviewConductPage.dropdown_Volunteering.isVisible();
    await reviewConductPage.dropdown_TorontoJS_conduct.isVisible();
    await reviewConductPage.dropdown_Release_form.isVisible();



    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');
    /*
    await page.getByText('In a nutshell:').isVisible();
    expect(page.getByText('In a nutshell:')).toHaveCSS('color', 'rgb(255, 255, 255)');
    expect(page.getByText('In a nutshell:')).toHaveCSS('background-color', 'rgb(237, 55, 49)');


    await page.getByText('All our members are committed').isVisible();
    await page.getByText('Developers, designers and other tech workers').isVisible();
    await page.getByText('The TorontoJS activities are non-profit').isVisible(); */



    // Check NUMBERED CIRCLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    for(let i = 1; i < 4; i++) {

      await page.locator('#conduct-code').getByText(String(i), { exact: true }).isVisible();
      console.log(await page.locator('#conduct-code').getByText(String(i), { exact: true }).textContent());
      expect(page.locator('#conduct-code').getByText(String(i), { exact: true })).toHaveCSS('width', '36px');
      expect(page.locator('#conduct-code').getByText(String(i), { exact: true })).toHaveCSS('color', 'rgb(255, 255, 255)');
      expect(page.locator('#conduct-code').getByText(String(i), { exact: true })).toHaveCSS('background-color', 'rgb(237, 55, 49)');

    }

    await page.waitForTimeout(3000);

    let rbgColors = reviewConductPage.convertHexToRGB("#ED3731");
    //const box_header = page.getByText('In a nutshell:');

    //await box_header.isVisible();

    await expect(reviewConductPage.nutshell_dialog_heading).toHaveCSS('background-color',
      `rgb(${ (await rbgColors).red }, ${ (await rbgColors).green }, ${ (await rbgColors).blue })`);
      
    await page.close();

  });

  test('PAGE 2 - CONDUCT CODE - SUMMARY DROP-DOWN LIST', async ({ page }) => {

    // await page.goto('http://localhost:3000/pages/review-conduct-code/');

    const reviewConductPage = new ReviewConductPage(page);

    await reviewConductPage.navigate();

    await reviewConductPage.review_title.isVisible();
    await reviewConductPage.subtitle.isVisible();



    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    //await page.getByRole('heading', { name: 'Review our conduct code' }).isVisible();

    // await page.getByText('We are a community driven by').isVisible();

    await expect(page.locator('.dropdown-list')).toHaveCSS('accent-color',
      'rgb(237, 55, 49)');

    for (let i = 1; i < 5; i++) {  
          await reviewConductPage.dropdown_TorontoJS_conduct.click();
          await page.waitForTimeout(2000);
          await reviewConductPage.dropdown_Volunteering.click();
          await page.waitForTimeout(2000);
          await reviewConductPage.dropdown_Release_form.click();
          await page.waitForTimeout(2000);
          console.log(i);
          //await page.locator('summary').filter({ hasText: 'TorontoJS Code of Conduct' }).click();
          
          //await page.locator('summary').filter({ hasText: 'Volunteering Agreement' }).click();

          //await page.locator('summary').filter({ hasText: 'Image Release Form' }).click()

          

    }

    await page.waitForTimeout(2000);

    await reviewConductPage.dropdown_TorontoJS_conduct.click();

    await reviewConductPage.dropdown_Volunteering.click();

    await reviewConductPage.dropdown_Release_form.click()

    // await page.waitForTimeout(1000);
      
    await page.close();

  });

  test('PAGE 2 - CONDUCT CODE PAGE - CHECK COMPLETE PROFILE button and Checkbox Functionality', async ({ page }) => {

    //await page.goto('http://localhost:3000/pages/review-conduct-code/');

    const reviewConductPage = new ReviewConductPage(page);

    await reviewConductPage.navigate();
    

    // await expect(page.locator('li').nth(1)).toHaveText('Account confirmed');

    await reviewConductPage.checkbox_text.isVisible();
    await expect(reviewConductPage.checkbox_text).toHaveCSS('font-size', '16.8697px');
    await expect(reviewConductPage.continue_button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    //await page.getByText('I agree to TorontoJS\’s').isVisible();
    //expect(page.getByText('I agree to TorontoJS\’s')).toHaveCSS('font-size', '16.8697px');
    // expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    await reviewConductPage.checkbox_I_agree.isVisible();
    await reviewConductPage.continue_button.isDisabled();
    expect(reviewConductPage.continue_button).toHaveCSS('background-color', 'rgb(237, 55, 49)');
    
    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).isVisible();
   //await page.getByRole('button', { name: 'Let me complete my profile' }).isDisabled();
   // expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgb(237, 55, 49)');
    await page.waitForTimeout(150);


    await reviewConductPage.checkbox_I_agree.click();
    await reviewConductPage.continue_button.isEnabled();
    expect( reviewConductPage.continue_button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');

    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    //await page.getByRole('button', { name: 'Let me complete my profile' }).isEnabled();
    //expect( page.getByRole('button', { name: 'Let me complete my profile' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)');
    await page.waitForTimeout(150);


    await reviewConductPage.checkbox_I_agree.click();
    await reviewConductPage.continue_button.isDisabled();
    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    // await page.getByRole('button', { name: 'Let me complete my profile' }).isDisabled();
    await page.waitForTimeout(3000);
    
    console.log("click -----");

    await reviewConductPage.checkbox_I_agree.click();
    await reviewConductPage.continue_button.click();

    //await page.getByRole('checkbox', { name: 'I agree to TorontoJS’s' }).click();
    //await page.getByRole('button', { name: 'Let me complete my profile' }).click();
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