import { test, expect, Page } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { RegisterPage } from '../pages/RegisterPage';
import registerData from '../data/registerData.json';
import productsData from '../data/productsData.json';
import { AdRemovelPage } from '../pages/AdRemovelPage';

test.describe("Products Page script", () => {

    let registerPage: RegisterPage;
    let productsPage: ProductsPage;
    let adRemovelPage : AdRemovelPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        productsPage = new ProductsPage(page);
        adRemovelPage= new AdRemovelPage(page);
        await registerPage.navigate();
    });

    test("Verify All Products and View Product Detail Page", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await productsPage.clickOnProductsButton();

       // await expect(productsPage.getAllProductsLabel()).toHaveText('All Products');
        await expect(productsPage.getProductsList()).toBeVisible();
       
        const selectedProduct = await productsPage.clickOnSelectProduct(productsData.products.product4);
        console.log("selectedProduct:"+selectedProduct);
        const viewedproductLabel = await productsPage.getViewedProductLabel(selectedProduct);
        console.log("After viewing Product Label:"+viewedproductLabel);

        await expect(viewedproductLabel.trim()).toBe(selectedProduct.trim());
        await expect(productsPage.getRupeesLabel()).toBeVisible();
        await expect(productsPage.getAddToCartButton()).toBeVisible();
    });

    test("Verify search product", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await productsPage.clickOnProductsButton();

        //await expect(productsPage.getAllProductsLabel()).toHaveText('All Products');
        await expect(productsPage.getProductsList()).toBeVisible();
        await expect(productsPage.getSearchProductTextbox()).toBeVisible();
        await expect(productsPage.getSearchIcon()).toBeVisible();

        await productsPage.enterSearchProduct(productsData.products.product4);
        await productsPage.clickOnSearchIcon();

        await expect(productsPage.getSearchedProductsLabel()).toHaveText(productsData.assertions.SearchedProductsLabel);
        await expect(productsPage.getSearchedProductLabel(productsData.products.product4)).toBeVisible();

    });
});
