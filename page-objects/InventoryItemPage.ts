import { Page, Locator } from "@playwright/test";
import CartPage from "./CartPage";

class InventoryItemPage {
  page: Page;
  addToCartButton: Locator;
  shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.getByRole("button", {
      name: "Add to cart",
    });
    this.shoppingCart = this.page.locator(".shopping_cart_link");
  }

  getAddToCartButton() {
    return this.addToCartButton;
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickShoppingCart() {
    await this.shoppingCart.click();
    return new CartPage(this.page);
  }
}

export default InventoryItemPage;
