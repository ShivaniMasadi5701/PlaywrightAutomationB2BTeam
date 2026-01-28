import { test, expect } from "@playwright/test";
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import registerData from '../data/registerData.json';
import loginData from '../data/loginData.json';
import { env } from '../config/env';
import { CartPage } from "../pages/AddToCartPage";
import productsData from '../data/productsData.json';

test.describe('AddToCart Test Scripts', () => {

    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage( page );
        cartPage = new CartPage( page );
        await registerPage.navigate();
        console.log("BeforeEach method Running");
    });

    test("Verify add single product to cart", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await cartPage.clickOnProductsButton();
        await cartPage.clickOnSelectProduct(productsData.product.product1);

        const addedText = await cartPage.getAddedToCartText();
        expect(addedText).toBe(productsData.assertions.ProductAdded);

        await expect(cartPage.getViewCartButton()).toBeVisible();
        await cartPage.clickOnViewCartButton();

       expect((await cartPage.verifyCartItemsSize()).toString()).toBe(productsData.assertions.cartSize);
    });

    test("Verify add multiple products to cart", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await cartPage.clickOnProductsButton();

        for(let i=0;i<productsData.products.length;i++){

            console.log("Products"+ productsData.products[i]);

            await cartPage.clickOnSelectProduct(productsData.products[i]);

            const addedText = await cartPage.getAddedToCartText();
            expect(addedText).toBe(productsData.assertions.ProductAdded);

            await expect(cartPage.getViewCartButton()).toBeVisible();
            await expect(cartPage.getContinueShopingButton()).toBeVisible();

            if(i<productsData.products.length-1){
                await cartPage.clickOnContinueShopingButton();
            }
        }
            await cartPage.clickOnViewCartButton();
            expect(await cartPage.verifyCartItemsSize()).toBe(productsData.products.length)
        
    });
});




