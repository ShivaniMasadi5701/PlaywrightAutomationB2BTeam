import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ContactUsPage } from '../pages/ContactUsPage';

import registerData from '../data/registerData.json';
import loginData from '../data/loginData.json';
import contactUsData from '../data/contactUsData.json';

let registerPage: RegisterPage;
let loginPage: LoginPage;
let contactUsPage: ContactUsPage;

test.describe("ContactUs Form Test Scripts", () => {

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        contactUsPage = new ContactUsPage(page);
        await registerPage.navigate();
    });

    test("Verify Valid ContactUs Form", async ({ page }) => {

        await expect(page).toHaveTitle(registerData.user.assertions.pageTitle);
        await expect(registerPage.getHomeButton()).toBeVisible();
        await expect(contactUsPage.getContactUsButton()).toBeVisible();

        await contactUsPage.clickOnContactUsButton();

        await expect(contactUsPage.getContactUsLabel())
            .toHaveText(contactUsData.asserations.contactUsLabel);

        await expect(contactUsPage.getGetInTouchLabel())
            .toHaveText(contactUsData.asserations.getInTouchLabel);

        await contactUsPage.enterName(contactUsData.formData.name);
        await contactUsPage.enterEmail(contactUsData.formData.email);
        await contactUsPage.enterSubject(contactUsData.formData.subject);
        await contactUsPage.enterMessage(contactUsData.formData.message);
        await contactUsPage.uploadFile(contactUsData.formData.filePath);

        // ALERT HANDLER BEFORE SUBMIT
        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('Press OK to proceed!');
            await dialog.accept();
        });

        //Trigger alert
        await contactUsPage.clickOnSubmitButton();

        // Assert success message
        await expect(contactUsPage.getSuccessText()).toHaveText(contactUsData.asserations.successText);
    });


});