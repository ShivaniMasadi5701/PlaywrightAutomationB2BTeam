import { test, expect, Page } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { RegisterPage } from '../pages/RegisterPage';
import registerData from '../data/registerData.json';
import { profile } from 'node:console';

test.describe("Products Page script", () => {

    let registerPage: RegisterPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        productsPage = new ProductsPage(page);
        await registerPage.navigate();
    });

    test("Verify All Products and View Product Detail Page", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await productsPage.clickOnProductsButton();

       // await expect(productsPage.getAllProductsLabel()).toHaveText('All Products');
        await expect(productsPage.getProductsList()).toBeVisible();
       
        const selectedProduct = await productsPage.clickOnSelectProduct("Winter Top");
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

        await productsPage.enterSearchProduct("Winter Top");
        await productsPage.clickOnSearchIcon();

        await expect(productsPage.getSearchedProductsLabel()).toHaveText('Searched Products');
        await expect(productsPage.getSearchedProductLabel("Winter Top")).toBeVisible();

    });
});
