import { expect, type Page, type Locator, Browser } from '@playwright/test';

export class PrintVolunteerPage {

    readonly page: Page; 
    readonly url: string = 'http://localhost:3000/pages/print-documents/?document=volunteer-agreement';
    readonly print_button: Locator;
    readonly print_button_color: string = 'rgb(237, 55, 49)';

    readonly page_header: Locator;

    readonly health_law_link: Locator;
    readonly view_doc_link: Locator;

    
    public constructor(page: Page) { 
        this.page = page;
        this.print_button = page.getByRole('button', { name: 'Print document' });
        this.health_law_link = page.getByRole('link', { name: 'Occupational Health & Safety' });
        this.view_doc_link = page.getByRole('link', { name: 'View this document in a full' });
        this.page_header = page.getByRole('heading', { name: 'Toronto JS - Volunteer' });
    
    }

    async navigate() {
        await this.page.goto(this.url); 
        console.log(this.page.url())
        expect(this.page.url()).toBe(this.url);
    }

}