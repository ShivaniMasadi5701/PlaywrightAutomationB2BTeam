import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import registerData from '../data/registerData.json';
import loginData from '../data/loginData.json';




test.describe('Register Tests', () => {


    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();

    });

    test('Register And Delete Account Scripts', async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(registerPage.getNewUserSignupLabel()).toHaveText(registerData.register.assertions.newUserLabel);

        await registerPage.enterName(registerData.register.name);
        await registerPage.enterEmail(registerData.register.name); // using name as prefix and generating email

        const enteredName = await registerPage.getEnteredName();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredName}`);

        const enteredEmail = await registerPage.getEnteredEmail();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredEmail}`);

        await registerPage.clickOnSignupButton();

        await expect(registerPage.getEnterAccountInformationLabel()).toBeVisible();
        // await expect(registerPage.lblEnterAccInfo).toHaveText(registerData.register.user.assertions.accountInfoLabel);
        // await expect(registerPage.lblEnterAccInfo).toContainText('ACCOUNT INFORMATION');
        //  await expect(registerPage.lblEnterAccInfo).toHaveText(/ENTER ACCOUNT INFORMATION/i);
        await registerPage.selectTitle(registerData.register.title);
        await expect(registerPage.getMrsRadio()).toBeChecked();
        await expect(registerPage.getMrRadio()).not.toBeChecked();
        await expect(registerPage.getEnteredNameText()).toHaveValue(`${enteredName}`);
        await expect(registerPage.getEnteredEmailText()).toHaveValue(`${enteredEmail}`);

        await registerPage.enterPassword(registerData.register.password);

        await registerPage.selectDateOfBirth(
            registerData.register.dob.day,
            registerData.register.dob.month,
            registerData.register.dob.year
        );

        await expect(registerPage.getDayDropdown()).toHaveValue(registerData.register.dob.day);
        await expect(registerPage.getMonthDropdown()).toHaveValue(registerData.register.dob.month);
        await expect(registerPage.getYearDropdown()).toHaveValue(registerData.register.dob.year);
        await expect(registerPage.getAddressInformationLabel()).toBeVisible();

        await registerPage.enterFirstName(registerData.register.address.firstName);
        await registerPage.enterLastName(registerData.register.address.lastName);
        await registerPage.enterAddress(registerData.register.address.street);
        await registerPage.selectCountry(registerData.register.address.country);
        await registerPage.enterState(registerData.register.address.state);
        await registerPage.enterCity(registerData.register.address.city);
        await registerPage.enterZipcode(registerData.register.address.zipcode);
        await registerPage.enterMobileNumber(registerData.register.address.mobile);
        await registerPage.clickOnCreateAccountButton();

        await expect(registerPage.getAccountCreatedLabel()).toHaveText(registerData.register.assertions.accountCreatedLabel);

        await registerPage.clickOnContinueButton();

        const username = await registerPage.getLoggedUsernameLabel();
        console.log(username);

        await expect(registerPage.getLogoutAccountButton()).toBeVisible();
        await expect(registerPage.getDeleteAccountButton()).toBeVisible();
        await expect(registerPage.getLoggedInAsUsernameLabel()).toHaveText(`${loginData.assertions.loggedinAsLabel}${enteredName}`);

        await registerPage.clickOnDeleteAccountButton();

        await expect(registerPage.getAccountDeletedLabel()).toHaveText(registerData.register.assertions.accountDeletedLabel);

    });

    test("Register using Existing Email", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.register.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();

        await registerPage.clickOnSignUpLoginButton();

        await expect(registerPage.getNewUserSignupLabel()).toHaveText(registerData.register.assertions.newUserLabel);

        await registerPage.enterName(registerData.register.name);
        await registerPage.enterEmailAddress(loginData.validUser.email);

        const enteredName = await registerPage.getEnteredName();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredName}`);

        const enteredEmail = await registerPage.getEnteredEmail();
        // 🔹 Print in TEST console
        console.log(`Email entered in textbox: ${enteredEmail}`);

        await registerPage.clickOnSignupButton();

        await expect(registerPage.getEmailAddressAlreadyExistErrorText()).toHaveText(registerData.register.assertions.emailAddressAlreadyExistErrorText);

    });
});