import { expect, Browser, Page, BrowserContext, Locator } from '@playwright/test';
import { test } from "./base.ts";

import { execPath } from 'process';
import { SignInPage } from '../page_object_models/pom_sign-in';
// import { PrintConductPage } from '../page_object_models/pom_print_conduct';
import { link } from 'fs/promises';
import { PrintConductPage } from '../page_object_models/pom_print_conduct.ts';

test.describe('SIGN-IN Test Suite', () => {
    test('LICENSE LINK', async ({ browser }) => {

        
        const browser_context = await browser.newContext();
        const page = await browser_context.newPage();
        const printConductPage = new PrintConductPage(page);

        // const printConductPage = new PrintConductPage(page);
        await printConductPage.navigate();
        //await page.goto('http://localhost:3000/pages/print-documents/?document=code-of-conduct');

        const uu = 'http://localhost:3000/pages/print-documents/?document=code-of-conduct';

        // Expect a title "to contain" a substring.
        // await expect(page.locator('h3')).toHaveText('Volunteer Profile');

        let t = await page.getByText('The Toronto JS Code of').getByRole('link').all();
        
        /* *******************
        for(const row of t) {
            console.log(await row.textContent());
            await page.waitForTimeout(500);
            let expected_url = row.getAttribute('href');
            console.log(await row.getAttribute('href'));

            let [newPage_0] = await Promise.all([
            browser_context.waitForEvent("page"), // pending, fullfilled or rejected
            await row.click()

             ]);

            let newPage_url = newPage_0.url(); 

            expect(newPage_url).toEqual(expected_url);

            await page.waitForTimeout(2000);

            await newPage_0.close();
        
        // await expect(newPage_0).toHaveURL("https://torontojs.com/");

            
        } ******************************/

        
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

            
        } 
    

        await page.close();
    });

    test('PRINT BUTTON TEST', async({ printConductPage}) => {
       // const printConductPage = new PrintConductPage(page);

       console.log("HERE TOOOOO");
        await printConductPage.navigate();

        await printConductPage.print_button.isVisible();
        await printConductPage.print_button.isEnabled();

        expect(printConductPage.print_button).toHaveCSS('background-color', printConductPage.print_button_color );

        await printConductPage.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        await printConductPage.print_button.click();
        await printConductPage.page.waitForFunction('window.waitForPrintDialog');

        await printConductPage.page.waitForTimeout(10000);
        // await page.waitForTimeout(10000);

        await printConductPage.page.close();

    });

    test('SEND EMPTY MESSAGE WITH EMPTY EMAIL', async({ printConductPage }) => {
        
        await printConductPage.navigate();

        await printConductPage.email_field.isVisible();
        await printConductPage.email_field.isEditable();
        await printConductPage.email_field.isEnabled();

        await printConductPage.send_button.isVisible();
        await printConductPage.send_button.isEnabled();

        await printConductPage.text_box.isVisible();
        await printConductPage.text_box.isEditable();

        await printConductPage.send_button.click();

        await printConductPage.page.waitForTimeout(5000);

        expect(printConductPage.page.url().includes("formspree.io"));

        await printConductPage.page.getByRole('heading', { name: "Can't send an empty form" }).isVisible();
        
        await printConductPage.page.close();

    });

    test('SEND VALID EMAIL WITH EMPTY MESSAGE', async({ printConductPage }) => {
        
        await printConductPage.navigate();

        await printConductPage.email_field.isVisible();
        await printConductPage.email_field.isEditable();
        await printConductPage.email_field.isEnabled();
        await printConductPage.email_field.fill("tester@gmail.com")

        await printConductPage.send_button.isVisible();
        await printConductPage.send_button.isEnabled();

        await printConductPage.text_box.isVisible();
        await printConductPage.text_box.isEditable();

        await printConductPage.send_button.click();

        await printConductPage.page.waitForTimeout(5000);

        expect(printConductPage.page.url().includes("formspree.io"));

        await printConductPage.page.getByRole('heading', { name: 'Thanks!' }).isVisible();

        await printConductPage.goBack_link.isVisible();
        await printConductPage.goBack_link.isEnabled();

        await printConductPage.goBack_link.click();

        expect(printConductPage.page.url().includes(printConductPage.url));
        
        await printConductPage.page.close();

    });

    test('SEND CORRECT MESSAGE AND VALID EMAIL', async({ printConductPage }) => {
        
        await printConductPage.navigate();

        await printConductPage.email_field.isVisible();
        await printConductPage.email_field.isEditable();
        await printConductPage.email_field.isEnabled();
        await printConductPage.email_field.fill("tester@gmail.com")

        await printConductPage.send_button.isVisible();
        await printConductPage.send_button.isEnabled();

        await printConductPage.text_box.isVisible();
        await printConductPage.text_box.isEditable();
        await printConductPage.text_box.fill("I am sending a Message. Great website!");

        await printConductPage.page.waitForTimeout(1000);

        await printConductPage.send_button.click();

        await printConductPage.page.waitForTimeout(5000);

        expect(printConductPage.page.url().includes("formspree.io"));

        await printConductPage.page.getByRole('heading', { name: 'Thanks!' }).isVisible();

        await printConductPage.goBack_link.isVisible();
        await printConductPage.goBack_link.isEnabled();

        await printConductPage.goBack_link.click();

        expect(printConductPage.page.url().includes(printConductPage.url));
        
        await printConductPage.page.close();

    });

    test('USE INVALID EMAIL', async({ printConductPage }) => {
        
        await printConductPage.navigate();

        await printConductPage.email_field.isVisible();
        await printConductPage.email_field.isEditable();
        await printConductPage.email_field.isEnabled();
        await printConductPage.email_field.fill("XXXXXXXX");

        await printConductPage.send_button.isVisible();
        await printConductPage.send_button.isEnabled();

        await printConductPage.text_box.isVisible();
        await printConductPage.text_box.isEditable();
        await printConductPage.text_box.fill("I am sending a Message. Great website!");

        await printConductPage.page.waitForTimeout(3000);

        await printConductPage.send_button.click();

        expect(printConductPage.page.url().includes("formspree.io"));

        await printConductPage.page.getByRole('heading', { name: 'Thanks!' }).isVisible();

        await printConductPage.goBack_link.isVisible();
        await printConductPage.goBack_link.isEnabled();

        await printConductPage.goBack_link.click();

        expect(printConductPage.page.url().includes(printConductPage.url));
        
        await printConductPage.page.close();

    });

});