import {test,expect} from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { env } from '../config/env';

test('Login and save auth state', async ({ page }) => {
    let registerPage = new RegisterPage(page);
    let loginPage = new LoginPage(page);
    await registerPage.navigate();
    await registerPage.clickOnSignUpLoginButton();
    await loginPage.login(env.loginEmail,env.loginPassword);
    await expect(registerPage.getLogoutAccountButton()).toBeVisible();
    
    //await page.context().storageState({ path :'auth.json' });
    
})
