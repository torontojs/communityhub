import { expect, type Page, type Locator, Browser } from '@playwright/test';

export class PrintImageReleasePage {

    readonly page: Page; 
    readonly url: string = 'http://localhost:3000/pages/print-documents/?document=image-release';
    readonly print_button: Locator;
    readonly print_button_color: string = 'rgb(237, 55, 49)';

    readonly page_header: Locator;
    readonly view_doc_link: Locator;
    readonly paragraph_text: Locator;

    
    public constructor(page: Page) { 
        this.page = page;
        this.print_button = page.getByRole('button', { name: 'Print document' });
        this.view_doc_link = page.getByRole('link', { name: 'View this document in a full' });
        this.page_header = page.getByRole('heading', { name: 'Toronto JS - Image Release' });
        this.paragraph_text = page.getByText('The volunteer authorizes the');
    }

    async navigate() {

      await expect(async() => {
            await this.page.goto(this.url); 
            expect(this.page.url()).toBe(this.url);
      }).toPass({ intervals: [1_000, 2_000, 10_000],
                    timeout: 60_000});
      console.log("NAVIGATING to: " + this.url);
    }


}