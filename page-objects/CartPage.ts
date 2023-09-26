import { Locator, Page } from "@playwright/test";
import CheckoutOnePage from "./CheckoutOnePage";

class CartPage {
  page: Page;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole("button", {
      name: "Checkout",
    });
  }

  async clickCheckout() {
    await this.checkoutButton.click();
    return new CheckoutOnePage(this.page);
  }
}

export default CartPage;
