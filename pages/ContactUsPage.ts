import { Locator, mergeExpects, Page } from "@playwright/test";

export class ContactUsPage {
    readonly page: Page;
    readonly btnContactUs: Locator;
    readonly lblContactUs : Locator;
    readonly lblGetInTouch: Locator;
    readonly txtName : Locator;
    readonly txtEmail : Locator;
    readonly txtSubject: Locator;
    readonly txtMessage : Locator;
    readonly fileInput : Locator;
    readonly btnSubmit: Locator;
    readonly lblSuccessText : Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnContactUs=page.getByRole('link', { name: 'Contact us' });
        this.lblContactUs=page.getByRole('heading', { name: 'Contact Us' });
        this.lblGetInTouch=page.getByRole('heading', { name: 'Get In Touch' });
        this.txtName =page.getByRole('textbox', { name: 'Name' });
        this.txtEmail =page.locator("//input[@placeholder='Email']");
        this.txtSubject=page.getByPlaceholder('Subject');
        this.txtMessage=page.getByPlaceholder('Your Message Here');
        this.fileInput = page.locator('input[type="file"]');
        //this.lblUploadedFileName=page.locator("//span[text()='${text}']");
        this.btnSubmit =page.locator('[name="submit"]');
        this.lblSuccessText=page.locator("//div[@class='status alert alert-success']");
    }

    async clickOnContactUsButton(): Promise<void>{
        await this.btnContactUs.click();
    }

    getContactUsButton(): Locator{
        return this.btnContactUs;
    }

    getContactUsLabel() : Locator{
        return this.lblContactUs;
    }

    getGetInTouchLabel() : Locator{
        return this.lblGetInTouch;
    }

    async enterName(name : string) : Promise<void>{
        await this.txtName.fill(name);
    }

    async enterEmail(email :string ) : Promise<void>{
        await this.txtEmail.fill(email);
    }

    async enterSubject(subject :string):Promise<void>{
        await this.txtSubject.fill(subject);
    }

    async enterMessage(message:string) : Promise <void>{
        await this.txtMessage.fill(message);
    }

    async uploadFile(filepath :string): Promise<void>{
        await this.fileInput.setInputFiles(filepath);
    }

    async clickOnSubmitButton(): Promise<void>{
        await this.btnSubmit.click();
    }

    getSuccessText():Locator{
        return this.lblSuccessText;
    }
}