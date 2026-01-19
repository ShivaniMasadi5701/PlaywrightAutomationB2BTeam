import { test, Page, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import loginData from '../data/loginData.json';
import registerData from '../data/registerData.json';
import { DataHolder } from '../Utils/dataHolder';
import { LoginPage } from '../pages/LoginPage';


//  Register and Saving the credentails during runtime into dataHolder and using them in login
// After login, relogin and logout functionality then , relogin and deleting the Account
// This process could not work when there is parallel execution of testclasses
test.describe.serial('E2E Flow - Register,Login,Logout,Delete Account Tests', () => {

    let registerPage: RegisterPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        await registerPage.navigate();
    });

    test('Valid Register Test', async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(registerPage.getNewUserSignupLabel()).toHaveText(registerData.user.assertions.newUserLabel);

        await registerPage.enterName(registerData.user.name);
        await registerPage.enterEmail(registerData.user.name); // using name as prefix and generating email

        const enteredName = await registerPage.getEnteredName();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredName}`);

        const enteredEmail = await registerPage.getEnteredEmail();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredEmail}`);

        await registerPage.clickOnSignupButton();

        await expect(registerPage.getEnterAccountInformationLabel()).toBeVisible();
        // await expect(registerPage.lblEnterAccInfo).toHaveText(registerData.user.assertions.accountInfoLabel);
        // await expect(registerPage.lblEnterAccInfo).toContainText('ACCOUNT INFORMATION');
        //  await expect(registerPage.lblEnterAccInfo).toHaveText(/ENTER ACCOUNT INFORMATION/i);
        await registerPage.selectTitle(registerData.user.title);
        await expect(registerPage.getMrsRadio()).toBeChecked();
        await expect(registerPage.getMrRadio()).not.toBeChecked();
        await expect(registerPage.getEnteredNameText()).toHaveValue(`${enteredName}`);
        await expect(registerPage.getEnteredEmailText()).toHaveValue(`${enteredEmail}`);

        await registerPage.enterPassword(registerData.user.password);

        await registerPage.selectDateOfBirth(
            registerData.user.dob.day,
            registerData.user.dob.month,
            registerData.user.dob.year
        );

        await expect(registerPage.getDayDropdown()).toHaveValue(registerData.user.dob.day);
        await expect(registerPage.getMonthDropdown()).toHaveValue(registerData.user.dob.month);
        await expect(registerPage.getYearDropdown()).toHaveValue(registerData.user.dob.year);
        await expect(registerPage.getAddressInformationLabel()).toBeVisible();

        await registerPage.enterFirstName(registerData.user.address.firstName);
        await registerPage.enterLastName(registerData.user.address.lastName);
        await registerPage.enterAddress(registerData.user.address.street);
        await registerPage.selectCountry(registerData.user.address.country);
        await registerPage.enterState(registerData.user.address.state);
        await registerPage.enterCity(registerData.user.address.city);
        await registerPage.enterZipcode(registerData.user.address.zipcode);
        await registerPage.enterMobileNumber(registerData.user.address.mobile);

        DataHolder.setCredentials(enteredEmail, registerData.user.password);

        await registerPage.clickOnCreateAccountButton();

        await expect(registerPage.getAccountCreatedLabel()).toHaveText(registerData.user.assertions.accountCreatedLabel);

        await registerPage.clickOnContinueButton();

        const username = await registerPage.getLoggedUsernameLabel();
        console.log(username);

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
        await expect(registerPage.getDeleteAccountButton()).toBeVisible();
        await expect(registerPage.getLoggedInAsUsernameLabel()).toHaveText(`${loginData.assertions.loggedinAsLabel}${enteredName}`);
    });

    test("ValidLogin Test", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

        const email = DataHolder.getEmail();
        const password = DataHolder.getPassword();
        console.log("****Login Email Address " + email)
        console.log("****Login Password" + password)

        await loginPage.enterLoginEmailAddress(email);
        await loginPage.enterPassword(password);
        await loginPage.clickOnLoginButton();

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
        await expect(registerPage.getDeleteAccountButton()).toBeVisible();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    });

    test("Logout Test", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

        const email = DataHolder.getEmail();
        const password = DataHolder.getPassword();
        console.log("****Login Email Address " + email)
        console.log("****Login Password" + password)

        await loginPage.enterLoginEmailAddress(email);
        await loginPage.enterPassword(password);
        await loginPage.clickOnLoginButton();

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
        await expect(registerPage.getDeleteAccountButton()).toBeVisible();

        await registerPage.clickOnLogoutButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

    });

    test("Delete Account Test", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(loginPage.getLoginToYourAccountLabel()).toHaveText(loginData.assertions.loginToYourAccountLabel);

        const email = DataHolder.getEmail();
        const password = DataHolder.getPassword();
        console.log("****Login Email Address " + email)
        console.log("****Login Password" + password)

        await loginPage.enterLoginEmailAddress(email);
        await loginPage.enterPassword(password);
        await loginPage.clickOnLoginButton();

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
        await expect(registerPage.getDeleteAccountButton()).toBeVisible();

        await registerPage.clickOnDeleteAccountButton();

        await expect(registerPage.getAccountDeletedLabel()).toHaveText(registerData.user.assertions.accountDeletedLabel);

    });
});