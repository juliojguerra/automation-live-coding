import { Locator, Page } from "@playwright/test";
import InventoryPage from "./InventoryPage";

class LoginPage {
  page: Page;
  userInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  async go() {
    await this.page.goto("/");
  }

  async submitLoginForm(userName: string, password: string) {
    await this.userInput.fill(userName);
    await this.passwordInput.fill(password);

    await this.loginButton.click();
    return new InventoryPage(this.page);
  }
}

export default LoginPage;
