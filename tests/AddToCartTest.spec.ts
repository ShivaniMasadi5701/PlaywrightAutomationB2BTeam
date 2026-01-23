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

    // test("Verify Login with Valid Email and Valid Password", async ({ page }) => {

    //     console.log("*Email" + env.loginEmail);
    //     console.log("*password" + env.loginPassword);

    //     await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
    //     await expect(registerPage.getHomeButton()).toBeVisible();

    //     await registerPage.clickOnSignUpLoginButton();

    //     await expect(loginPage.getLoginToYourAccountLabel())
    //         .toHaveText(loginData.assertions.loginToYourAccountLabel);

    //     await loginPage.enterLoginEmailAddress(env.loginEmail);
    //     await loginPage.enterPassword(env.loginPassword);
    //     await loginPage.clickOnLoginButton();

    //     await expect(registerPage.getLogoutAccountButton()).toBeVisible();
    // });

    test("Verify add products in cart", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await cartPage.clickOnProductsButton();
        await cartPage.clickOnSelectProduct(productsData.products.product1);

        const addedText = await cartPage.getAddedToCartText();
        expect(addedText).toBe(productsData.assertions.ProductAdded);

        const isVisible = await cartPage.verifyViewCartButtonVisible();
        expect(isVisible).toBe(true);

        await cartPage.clickOnViewCartButton();

        expect(await cartPage.verifyCartItemsSize()).toBe(productsData.assertions.cartSize)
        

       // await cartPage.clickOnContinueShopingButton();
    });
});