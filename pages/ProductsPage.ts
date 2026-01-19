import { Page, Locator } from "@playwright/test";

export class ProductsPage {

    readonly page: Page;
    readonly btnProducts: Locator;
    readonly lblAllProducts: Locator;
    readonly lstProducts: Locator;
    readonly btnFirstProduct: Locator;
    readonly lblFirstProduct: Locator;
    readonly lblRs:Locator;
    readonly lblQuantity:Locator;
    readonly btnAddToCart;
    readonly txtSearchProduct;
    readonly btnSearchIcon;



    constructor(page: Page) {
        this.page = page;
        this.btnProducts = page.getByRole('link', { name: 'Products' });
        this.lblAllProducts = page.getByRole('heading', { name: 'All Products' });
        this.lstProducts = page.locator("//div[@class='features_items']");
        this.btnFirstProduct = page.locator('a').filter({ hasText: 'View Product' }).first();
        this.lblFirstProduct = page.locator("(//div[@class='productinfo text-center']//p)[1]");
        this.lblRs=page.locator("//span[contains(text(),'Rs')]");
        this.lblQuantity=page.getByLabel('Quantity:');
        this.btnAddToCart=page.getByRole('button', { name: 'Add to cart' });
        this.txtSearchProduct=page.getByPlaceholder('Search Product');
          this.btnSearchIcon=page.locator('#submit_search');

    }


    async clickOnProductsButton(): Promise<void> {
        await this.btnProducts.click();
    }

    getAllProductsLabel(): Locator {
        return this.lblAllProducts;
    }

    getProductsList(): Locator {
        return this.lstProducts;
    }

    async clickOnFirstProduct(): Promise<void> {
        await this.btnFirstProduct.click();
    }

    async getFirstProductLabel(): Promise<string> {
        return await this.lblFirstProduct.textContent() ?? '';
    }

    getProduct(): Locator {
        return this.lblFirstProduct;
    }

    // ✅ Dynamic locator[accepts the dynamic text]
    viewproductLabel(productName: string): Locator {
        return this.page.getByRole('heading', { name: productName });
    }

    async getViewProductLabel(productName: string): Promise<string> {
        return await this.viewproductLabel(productName).textContent() ?? '';
    }

    getProductByName(productName: string): Locator {
        return this.viewproductLabel(productName);
    }

    getRupeesLabel():Locator{
        return this.lblRs;
    }

    getQuantityLabel() : Locator{
        return this.lblQuantity;
    }

    getAddToCartButton() : Locator{
        return this.btnAddToCart;
    }

    getSearchProductTextbox(): Locator{
        return this.txtSearchProduct;
    }
    async enterSearchProduct(productName:string) : Promise<void>{
        await this.txtSearchProduct.fill(productName);

    }

    getSearchIcon(): Locator{
        return this.btnSearchIcon;
    }

    async clickOnSearchIcon() : Promise<void>{
        await this.btnSearchIcon.click();
    }

}