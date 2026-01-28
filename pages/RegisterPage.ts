import { Page, Locator } from '@playwright/test'

export class RegisterPage {
    readonly page: Page;

    readonly btnSignUpLogin: Locator;
    readonly lblNewUserSignup: Locator;
    readonly txtName: Locator;
    readonly txtEmail: Locator;
    readonly btnSignup: Locator;
    readonly lblEnterAccInfo: Locator;
    readonly radioMr: Locator;
    readonly radioMrs: Locator;
    readonly txtPassword: Locator;
    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;
    readonly enteredName: Locator;
    readonly enteredEmail: Locator;
    readonly lblAddressInfo: Locator;
    readonly txtFirstName: Locator;
    readonly txtLastName: Locator;
    readonly txtAddress: Locator;
    readonly countryDropdown: Locator;
    readonly txtState: Locator;
    readonly txtCity: Locator;
    readonly txtZipcode: Locator;
    readonly txtMobileNumber: Locator;
    readonly btnCreateAccount: Locator;
    readonly lblAccountCreated: Locator;
    readonly btnContinue: Locator;
    readonly lblLoggedUsername: Locator;
    readonly btnDeleteAccount: Locator;
    readonly btnLogout: Locator;
    readonly lblAccountDeleted: Locator;
    readonly lblEmailAddressAlreadyExist: Locator;
    readonly btnHome: Locator;

    constructor(page: Page) {
        this.page = page;

        this.btnSignUpLogin = page.locator("a[href='/login']");
        this.lblNewUserSignup = page.locator("//h2[text()='New User Signup!']");
        this.txtName = page.getByPlaceholder('Name');
        this.txtEmail = page.locator("//input[@data-qa='signup-email']");
        this.btnSignup = page.getByRole('button', { name: 'Signup' });
        this.lblEnterAccInfo = page.getByText('ENTER ACCOUNT INFORMATION');
        this.radioMr = page.getByLabel('Mr.');
        this.radioMrs = page.getByLabel('Mrs.');
        this.enteredName = page.locator("//input[@id='name']");
        this.enteredEmail = page.locator("//input[@id='email']")
        this.txtPassword = page.locator('#password');
        this.dayDropdown = page.locator('#days');
        this.monthDropdown = page.locator('#months');
        this.yearDropdown = page.locator('#years');
        this.lblAddressInfo = page.getByText('Address Information');
        this.txtFirstName = page.locator("//input[@id='first_name']");
        this.txtLastName = page.locator("//input[@id='last_name']");
        this.txtAddress = page.locator("//input[@id='address1']")
        this.countryDropdown = page.locator('#country');
        this.txtState = page.locator("//input[@id='state']");
        this.txtCity = page.locator("//input[@id='city']");
        this.txtZipcode = page.locator("//input[@id='zipcode']");
        this.txtMobileNumber = page.locator("//input[@id='mobile_number']");
        this.btnCreateAccount = page.getByText('Create Account');
        this.lblAccountCreated = page.getByText('Account Created');
        this.btnContinue = page.getByRole('link', { name: 'Continue' });
        this.lblLoggedUsername = page.locator('a:has-text("Logged in as")');
        this.btnDeleteAccount = page.getByRole('link', { name: 'Delete Account' });
        this.btnLogout = page.getByRole('link', { name: 'Logout' });
        this.lblAccountDeleted = page.getByText('Account Deleted!');
        this.lblEmailAddressAlreadyExist = page.getByText('Email Address already exist!');
        this.btnHome = page.getByRole('link', { name: 'Home' });
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    getHomeButton(): Locator {
        return this.btnHome;
    }

    async clickOnSignUpLoginButton(): Promise<void> {
        await this.btnSignUpLogin.click();
    }

    getNewUserSignupLabel() {
        return this.lblNewUserSignup;
    }

    async enterName(name: string): Promise<void> {
        await this.txtName.fill(name);
    }

    async enterEmail(email: string): Promise<void> {
        const randomNum = Math.floor(Math.random() * 100000);
        const signupEmail = `${email}${randomNum}@gmail.com`;

        console.log(`Signup Email generated: ${signupEmail}`);

        await this.txtEmail.fill(signupEmail);
    }

    async enterEmailAddress(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    async getEnteredName(): Promise<string> {
        return await this.txtName.inputValue();
    }

    async getEnteredEmail(): Promise<string> {
        return await this.txtEmail.inputValue();
    }

    async clickOnSignupButton(): Promise<void> {
        await this.btnSignup.click();
    }

    getEnterAccountInformationLabel() {
        return this.lblEnterAccInfo;
    }

    async selectTitle(title: string): Promise<void> {
        if (title === 'Mr') {
            await this.radioMr.check();
        } else {
            await this.radioMrs.check();
        }
    }

    getMrRadio() {
        return this.radioMr;
    }

    getMrsRadio() {
        return this.radioMrs;
    }

    getEnteredNameText(): Locator {
        return this.enteredName;
    }

    getEnteredEmailText(): Locator {
        return this.enteredEmail;
    }

    async enterPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
        await this.dayDropdown.waitFor();
        await this.dayDropdown.selectOption(day);
        await this.monthDropdown.selectOption(month);
        await this.yearDropdown.selectOption(year);
    }

    getDayDropdown(): Locator {
        return this.dayDropdown;
    }

    getMonthDropdown(): Locator {
        return this.monthDropdown;
    }

    getYearDropdown(): Locator {
        return this.yearDropdown;
    }

    getAddressInformationLabel() {
        return this.lblAddressInfo;
    }

    async enterFirstName(first_name: string): Promise<void> {
        await this.txtFirstName.fill(first_name);
    }

    async enterLastName(last_name: string): Promise<void> {
        await this.txtLastName.fill(last_name);
    }

    async enterAddress(address: string): Promise<void> {
        await this.txtAddress.fill(address);
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryDropdown.selectOption(country);

    }

    async enterState(state: string): Promise<void> {
        await this.txtState.fill(state);
    }

    async enterCity(city: string): Promise<void> {
        await this.txtCity.fill(city);
    }

    async enterZipcode(zipcode: string): Promise<void> {
        await this.txtZipcode.fill(zipcode);
    }

    async enterMobileNumber(mobileNum: string): Promise<void> {
        await this.txtMobileNumber.fill(mobileNum);
    }

    async clickOnCreateAccountButton(): Promise<void> {
        await this.btnCreateAccount.click();
    }

    getAccountCreatedLabel(): Locator {
        return this.lblAccountCreated;
    }

    async clickOnContinueButton(): Promise<void> {
        await this.btnContinue.click();
    }

    async getLoggedUsernameLabel(): Promise<string> {
        return await this.lblLoggedUsername.textContent() ?? '';
    }

    getLoggedInAsUsernameLabel(): Locator {
        return this.lblLoggedUsername;
    }

    async clickOnDeleteAccountButton(): Promise<void> {
        await this.btnDeleteAccount.click();
    }

    getDeleteAccountButton(): Locator {
        return this.btnDeleteAccount;
    }

    async clickOnLogoutButton(): Promise<void> {
        await this.btnLogout.click();
    }

    getLogoutAccountButton(): Locator {
        return this.btnLogout;
    }

    getAccountDeletedLabel(): Locator {
        return this.lblAccountDeleted;
    }

    getEmailAddressAlreadyExistErrorText(): Locator {
        return this.lblEmailAddressAlreadyExist;
    }
}

