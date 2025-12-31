import { Page, Locator } from '@playwright/test'

export class LoginPage {

    readonly page: Page;
    readonly lblLogin: Locator;
    readonly txtEmailAddress: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly lblInvalidLoginError: Locator;


    constructor(page: Page) {
        this.page = page;
        this.lblLogin = page.getByText('Login to your account');
        this.txtEmailAddress = page.locator("//input[@data-qa='login-email']");
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.lblInvalidLoginError=page.getByText('Your email or password is incorrect!');

    }

    getLoginToYourAccountLabel(): Locator {
        return this.lblLogin;
    }

    async enterLoginEmailAddress(email: string): Promise<void> {
        await this.txtEmailAddress.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    async clickOnLoginButton(): Promise<void> {
        await this.btnLogin.click();
    }

     getInvalidLoginErrorText(): Locator {
        return this.lblInvalidLoginError;
    }
}