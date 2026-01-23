import { Page, Locator } from '@playwright/test'

export class AdRemovelPage {

    readonly page: Page;
    readonly lblAd:Locator;
    readonly btnClose:Locator; 


    constructor(page: Page) {
        this.page = page;
        this.lblAd=page.getByText('Ad');
        this.btnClose=page.getByText('Close');        

    }

    async clickonAdCloseButton(): Promise<void>{
        const isAdVisible = await this.lblAd.isVisible();
        if(isAdVisible){
            this.btnClose.click();
        }
    }    

    getAdLabel():Locator{
      return  this.lblAd;
    }

    async clickOnCloseButton(): Promise<void>{
        this.btnClose.click();
    }
}