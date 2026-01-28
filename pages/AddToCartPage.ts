import { Locator, mergeExpects, Page } from "@playwright/test";

export class CartPage {
     readonly page: Page;
     readonly btnProducts : Locator;
     readonly btnAddToCart : Locator;
     readonly lblProductName : Locator;
     readonly lblAddedToCart : Locator;
     readonly btnContinueShoping : Locator;
     readonly btnViewCart : Locator;
     readonly tableCartItems : Locator;
  
    constructor(page:Page){
      this.page = page;
      this.btnProducts=page.getByText('Products');
      this.btnAddToCart=page.locator("//div[@class='productinfo text-center']//following-sibling::a");
      this.lblProductName=page.locator("//div[@class='productinfo text-center']//following-sibling::p");
      this.lblAddedToCart=page.locator("//div[@class='modal-body']//p[text()='Your product has been added to cart.']");
      this.btnContinueShoping=page.getByText('Continue Shopping');
      this.btnViewCart = page.locator("//u[text()='View Cart']");
      this.tableCartItems = page.locator(".table#cart_info_table tbody tr");
    }

    async clickOnProductsButton(): Promise<void>{
        await this.btnProducts.click();
    }

    async clickOnAddToCartButton(): Promise<void>{
        await this.btnAddToCart.click();
    }

    async clickOnSelectProduct(productName:string): Promise<void>{
        const count = await this.lblProductName.count();
        console.log("**Products count:"+ count);

        for (let i = 0; i < count; i++) {
            console.log("Product Name for Single item"+await this.lblProductName.nth(i).textContent());
            const currentProductName =await this.lblProductName.nth(i).textContent();
            if(currentProductName?.trim() === productName){
                console.log("Actual Product name"+currentProductName);
                await this.lblProductName.nth(i).hover();
                await this.btnAddToCart.nth(i).click();
            break;
            }
        }
    }

    async getAddedToCartText(): Promise<string>{
      return (await this.lblAddedToCart.innerText()).trim();
    }

    async clickOnContinueShopingButton(): Promise<void>{
        await this.btnContinueShoping.click();
    }

   async clickOnViewCartButton(): Promise<void>{
        await this.btnViewCart.click();
    }

    getViewCartButton(): Locator{
        return (this.btnViewCart);
    }

    getContinueShopingButton(): Locator{
        return (this.btnContinueShoping);
    }

    async verifyCartItemsSize(): Promise<number>{
        return await this.tableCartItems.count();
    }


}