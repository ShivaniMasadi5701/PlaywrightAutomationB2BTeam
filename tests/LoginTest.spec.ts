import { test, expect } from "@playwright/test";
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import registerData from '../data/registerData.json';
import loginData from '../data/loginData.json';
import { env } from '../config/env';
import { APP_CONSTANTS } from "./resources/constants";


test.describe('Login Tests', () => {

    let registerPage: RegisterPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        await registerPage.navigate();

    });

    test("Verify Login with Invalid Email and Valid Password", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

        await loginPage.enterLoginEmailAddress(loginData.invalidEmailValidPassword.email);
        await loginPage.enterPassword(loginData.invalidEmailValidPassword.password);
        await loginPage.clickOnLoginButton();
    });

    test("Verify Login with  Valid Email and Invalid Password", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

        await loginPage.enterLoginEmailAddress(loginData.validEmailInvalidPassword.email);
        await loginPage.enterPassword(loginData.validEmailInvalidPassword.password);
        await loginPage.clickOnLoginButton();

        await expect(loginPage.getInvalidLoginErrorText()).toHaveText(loginData.assertions.InvalidLoginErrorText);
    });

    test(" Verify Login with Invalid Email and Invalid Password", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

        await loginPage.enterLoginEmailAddress(loginData.invalidEmailInValidPassword.email);
        await loginPage.enterPassword(loginData.invalidEmailInValidPassword.password);
        await loginPage.clickOnLoginButton();
    });

    test("Verify Login with Valid Email and Valid Password", async ({ page }) => {

        console.log("*Email" + env.loginEmail);
        console.log("*password" + env.loginPassword);

        await expect(page).toHaveTitle(APP_CONSTANTS.LOGIN_TITLE);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel())
            .toHaveText(loginData.assertions.loginToYourAccountLabel);

        await loginPage.enterLoginEmailAddress(env.loginEmail);
        await loginPage.enterPassword(env.loginPassword);
        await loginPage.clickOnLoginButton();

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
    });
});