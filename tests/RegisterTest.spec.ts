import { test, Page, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import registerData from '../data/registerData.json';
import loginData from '../data/loginData.json';

import { feature, story } from 'allure-js-commons';

feature('User Registration');
story('Valid user signup and Deleeting the Account');


test.describe('Register Tests', () => {

    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();

    });

    test('Register And Delete Account Scripts', async ({ page }) => {

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
        // await expect(registerPage.lblEnterAccInfo).toHaveText(registerData.user.user.assertions.accountInfoLabel);
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
        await registerPage.clickOnCreateAccountButton();

        await expect(registerPage.getAccountCreatedLabel()).toHaveText(registerData.user.assertions.accountCreatedLabel);

        await registerPage.clickOnContinueButton();

        const username = await registerPage.getLoggedUsernameLabel();
        console.log(username);

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
        await expect(registerPage.getDeleteAccountButton()).toBeVisible();
        await expect(registerPage.getLoggedInAsUsernameLabel()).toHaveText(`${loginData.assertions.loggedinAsLabel}${enteredName}`);

        await registerPage.clickOnDeleteAccountButton();

        await expect(registerPage.getAccountDeletedLabel()).toHaveText(registerData.user.assertions.accountDeletedLabel);

    });

    test("Register using Existing Email", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(registerPage.getNewUserSignupLabel()).toHaveText(registerData.user.assertions.newUserLabel);

        await registerPage.enterName(registerData.user.name);
        await registerPage.enterEmailAddress(loginData.validUser.email); // using name as prefix and generating email

        const enteredName = await registerPage.getEnteredName();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredName}`);

        const enteredEmail = await registerPage.getEnteredEmail();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredEmail}`);

        await registerPage.clickOnSignupButton();

        await expect(registerPage.getEmailAddressAlreadyExistErrorText()).toHaveText(registerData.user.assertions.emailAddressAlreadyExistErrorText);

    });
});