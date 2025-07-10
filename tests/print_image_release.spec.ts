import { expect } from '@playwright/test';
import { test } from './base';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach( async ({ printImageReleasePage }) => {
  test.setTimeout(50000) // Sets a 40-second timeout for all tests
  await printImageReleasePage.navigate();
  
});

test.afterEach( async ({ printImageReleasePage }) => {
  test.setTimeout(5000) // Sets a 40-second timeout for all tests
  await printImageReleasePage.page.close();
});


test.describe('PRINT IMAGE RELEASE Test Suite', () => {
    test('PAGE LINKS', async ({ printImageReleasePage }) => {


        expect(printImageReleasePage.view_doc_link).toBeVisible();
        
        expect(printImageReleasePage.view_doc_link).toBeVisible();

        await printImageReleasePage.page.waitForTimeout(8000);
    
    });


    test('PRINT BUTTON TEST', async({ printImageReleasePage }) => {

        await printImageReleasePage.print_button.isVisible();
        await printImageReleasePage.print_button.isEnabled();

        expect(printImageReleasePage.print_button).toHaveCSS('background-color', printImageReleasePage.print_button_color );

        await printImageReleasePage.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        await printImageReleasePage.print_button.click();
        await printImageReleasePage.page.waitForFunction('window.waitForPrintDialog');

        await printImageReleasePage.page.waitForTimeout(3000);

    });

    /*
     test('SCREENSHOT COMPARISON TEST', async({ printImageReleasePage}) => {
        await printImageReleasePage.page.waitForURL(printImageReleasePage.url);
        await expect(printImageReleasePage.page).toHaveScreenshot("print_image_release_screen.png");
      }); */

});

test.describe('ASSESSIBILITY Suite', () => {

    test('BASIC WCAG22AA', async({page }) => {
        
        const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22aa"]).analyze();
        expect( axeBuilder.violations).toEqual([]);
    });
});