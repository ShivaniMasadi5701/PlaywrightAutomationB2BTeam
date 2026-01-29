import { Page, Locator } from "@playwright/test";
import strict from "node:assert/strict";
import { text } from "node:stream/consumers";

export class ProductsPage {

    readonly page: Page;
    readonly btnProducts: Locator;
    readonly lblAllProducts: Locator;
    readonly lstProducts: Locator;
    readonly btnFirstProduct: Locator;
    readonly lblFirstProduct: Locator;
    readonly lblRs:Locator;
    readonly lblQuantity:Locator;
    readonly btnAddToCart: Locator;
    readonly txtSearchProduct: Locator;
    readonly btnSearchIcon: Locator;
    readonly lstProductsLabels: Locator;
    readonly btnViewProduct: Locator;
    readonly lblSearchedProducts: Locator;
    readonly lblSearchedProduct;
    readonly lblViewedProductLabel;


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
        this.lstProductsLabels = page.locator("//div[@class='productinfo text-center']//following-sibling::p");
        this.btnViewProduct = page.locator("//a[text()='View Product']");
        this.lblSearchedProducts = page.getByRole("heading", { name: 'Searched Products' });
        this.lblSearchedProduct = (text: string) => this.page.getByText(text, { exact: true }).nth(1);
        this.lblViewedProductLabel=(text:string) =>this.page.getByRole('heading', { name: text });
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

    //selecting one product and saving that text in variable 
    async clickOnSelectProduct(productName: string): Promise<string> {
        const count = await this.lstProductsLabels.count();
        console.log("Products count:", count);

        for (let i = 0; i < count; i++) {
            const currentProductName =
                (await this.lstProductsLabels.nth(i).textContent())?.trim();

            console.log(currentProductName);

            if (currentProductName === productName) {
                await this.lstProductsLabels.nth(i).hover();
                await this.btnViewProduct.nth(i).click();
                return currentProductName;
            }
        }
        throw new Error(`Product not found: ${productName}`);
    }
   
    async getViewedProductLabel(productName: string): Promise<string> {
        return await this.lblViewedProductLabel(productName).textContent() ?? '';
    }

    getRupeesLabel(): Locator {
        return this.lblRs;
    }

    getQuantityLabel(): Locator {
        return this.lblQuantity;
    }

    getAddToCartButton(): Locator {
        return this.btnAddToCart;
    }

    getSearchProductTextbox(): Locator {
        return this.txtSearchProduct;
    }
    async enterSearchProduct(productName: string): Promise<void> {
        await this.txtSearchProduct.fill(productName);
    }

    getSearchIcon(): Locator {
        return this.btnSearchIcon;
    }

    async clickOnSearchIcon(): Promise<void> {
        await this.btnSearchIcon.click();
    }

    getSearchedProductsLabel(): Locator {
        return this.lblSearchedProducts;
    }

    getSearchedProductLabel(product_name: string): Locator {
        return this.lblSearchedProduct(product_name);
    }
}