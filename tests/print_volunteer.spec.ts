import { expect, Page, BrowserContext, Locator } from '@playwright/test';
import { test } from './base';

test.beforeEach( async ({ printVolunteerPage }) => {
  test.setTimeout(50000) // Sets a 40-second timeout for all tests
  await printVolunteerPage.navigate();
});

test.afterEach( async ({ printVolunteerPage }) => {
  test.setTimeout(500) // Sets a 40-second timeout for all tests
  await printVolunteerPage.page.close();
});


test.describe('PRINT VOLUNTEER AGREEMENT Test Suite', () => {
    test('PAGE LINKS', async ({ printVolunteerPage }) => {

        const uu = 'http://localhost:3000/pages/print-documents/?document=code-of-conduct';

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        expect(printVolunteerPage.view_doc_link).toBeVisible();
        
        expect(printVolunteerPage.health_law_link).toBeVisible();
        await printVolunteerPage.health_law_link.click();
        expect(printVolunteerPage.page.url().includes("https://www.ontario.ca/laws/statut"));

        await printVolunteerPage.page.waitForTimeout(8000);

        await printVolunteerPage.page.goBack();
        //let t = await page.getByText('The Toronto JS Code of').getByRole('link').all();
        
    
        /*
        for(const row of t) {
            console.log(await row.textContent());
            let ex_temp = await row.getAttribute('href');
           
            let expected_url = ex_temp?.toString().split(".");
            
           // let expected_url_1 = expected_url?.[0];
             console.log("&&& " + expected_url?.[0]);
        

            // console.log(expected_url);

            await row.click();
            await page.waitForTimeout(2000);

            // REGEX BASE URL ^((http[s]?|ftp):\/)?\/?([^:\/\s]+)
            
            //let split_string = page.url().split(".");
            //console.log(split_string);

            console.log("***");
            console.log("+++ " + page.url() + "===" + expected_url?.[0])
            expect(page.url().includes(expected_url?.[0] as string));
            
            
            // console.log("999 " + nextPage_url);
            console.log("888 " + expected_url?.[0]);

            

            

            await page.goBack();
            // expect.soft(page.url()).toEqual(uu);
            expect(page.url()).toEqual(uu);
            console.log("^^^^ " + page.url() + "===" + uu)

            

            // expect(newPage_url).toEqual(expected_url);

            //await page.waitForTimeout(2000);

        
        // await expect(newPage_0).toHaveURL("https://torontojs.com/");

            
        } */
    
    });


    test('PRINT BUTTON TEST', async({ printVolunteerPage }) => {
       // const printConductPage = new PrintConductPage(page);

       console.log("HERE TOOOOO");

        await printVolunteerPage.print_button.isVisible();
        await printVolunteerPage.print_button.isEnabled();

        expect(printVolunteerPage.print_button).toHaveCSS('background-color', printVolunteerPage.print_button_color );

        await printVolunteerPage.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        await printVolunteerPage.print_button.click();
        await printVolunteerPage.page.waitForFunction('window.waitForPrintDialog');

        await printVolunteerPage.page.waitForTimeout(10000);

    });

     test('SCREENSHOT COMPARISON TEST', async({ printVolunteerPage}) => {
        await expect(printVolunteerPage.page).toHaveScreenshot("print_volunteer_screen.png");
      });

    


});