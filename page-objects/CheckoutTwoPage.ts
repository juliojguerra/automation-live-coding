import { Locator, Page } from "@playwright/test";
import CheckoutCompletePage from "./CheckoutCompletePage";

class CheckoutTwoPage {
  page: Page;
  productName: Locator;
  price: Locator;
  priceTotal: Locator;
  tax: Locator;
  total: Locator;
  finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = this.page.locator(".inventory_item_name");
    this.price = this.page.locator(".inventory_item_price");
    this.priceTotal = this.page.locator(".summary_subtotal_label");
    this.tax = this.page.locator(".summary_tax_label");
    this.total = this.page.locator(".summary_info_label.summary_total_label");
    this.finishButton = this.page.getByRole("button", { name: "Finish" });
  }

  async getProductText() {
    return await this.productName.textContent();
  }

  async getProductPrice() {
    return await this.price.textContent();
  }

  async getPriceTotalText() {
    const completeText = await this.priceTotal.textContent();
    return completeText?.split("Item total:")[1].trim();
  }

  async getTaxText() {
    const completeText = await this.tax.textContent();
    return completeText?.split("Tax:")[1].trim();
  }

  async getTotalNumber() {
    const totalText = await this.total.textContent();
    const totalNumber = Number(totalText?.split("Total: $")[1]);

    return totalNumber;
  }

  // Pending to move method to a helper class
  async calculateTotal(itemTotal: string) {
    const itemTotalNumber = Number(itemTotal.split("$")[1]);
    const taxText = await this.getTaxText();

    const taxNumber = Number(taxText?.split("$")[1]);

    return itemTotalNumber + taxNumber;
  }

  async clickFinishButton() {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }
}

export default CheckoutTwoPage;
