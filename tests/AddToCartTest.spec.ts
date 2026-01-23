import { test, expect } from "@playwright/test";
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import registerData from '../data/registerData.json';
import loginData from '../data/loginData.json';
import { env } from '../config/env';
import { CartPage } from "../pages/CartPage";
import productsData from '../data/productsData.json';

test.describe('Login Tests', () => {

    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage( page );
        cartPage = new CartPage( page );
        await registerPage.navigate();

    });

    test("Verify add products in cart", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await cartPage.clickOnProductsButton();
        await cartPage.clickOnSelectProduct(productsData.products.product1);

        const addedText = await cartPage.getAddedToCartText();
        expect(addedText).toBe(productsData.assertions.ProductAdded);

       await expect(cartPage.getViewCartButton()).toBeVisible();
       await cartPage.clickOnViewCartButton();

       expect((await cartPage.verifyCartItemsSize()).toString()).toBe(productsData.assertions.cartSize)
        
    });
});