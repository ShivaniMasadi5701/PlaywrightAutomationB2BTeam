import { test, expect, Page } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { RegisterPage } from '../pages/RegisterPage';
import registerData from '../data/registerData.json';

test.describe("Products Page script", () => {

    let registerPage: RegisterPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        productsPage = new ProductsPage(page);
        await registerPage.navigate();
    });

    test("Verify All Products and View Product Detail Page", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await productsPage.clickOnProductsButton();

        await expect(productsPage.getAllProductsLabel()).toHaveText('All Products');
        await expect(productsPage.getProductsList()).toBeVisible();

        const firstProductLabel = await productsPage.getFirstProductLabel();
        console.log(`****FirstLabel :${firstProductLabel}`);

        // const productLabel= await productsPage.getProduct().innerText();
        // console.log("ProductLabel:"+productLabel);

        await productsPage.clickOnFirstProduct();

        const viewProductLabel = await productsPage.getViewProductLabel(firstProductLabel);
        console.log("ProductLabel:" + viewProductLabel);

        await expect(productsPage.getProductByName(firstProductLabel)).toBeVisible();
        expect(firstProductLabel.trim()).toBe(viewProductLabel.trim());
        await expect(productsPage.getRupeesLabel()).toBeVisible();
        await expect(productsPage.getAddToCartButton()).toBeVisible();
    });

    test("Verify search product", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await productsPage.clickOnProductsButton();

        await expect(productsPage.getAllProductsLabel()).toHaveText('All Products');
        await expect(productsPage.getProductsList()).toBeVisible();
        await expect(productsPage.getSearchProductTextbox()).toBeVisible();
        await expect(productsPage.getSearchIcon()).toBeVisible();

        await productsPage.enterSearchProduct("Winter Top");
        await productsPage.clickOnSearchIcon();

    });
});
