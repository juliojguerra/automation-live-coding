import { Locator, Page } from "@playwright/test";
import InventoryItemPage from "./InventoryItemPage";

class InventoryPage {
  page: Page;
  productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitles = this.page.locator(".inventory_item_description a div");
  }

  async selectProduct(productName: string) {
    // Stores an array of locators in products
    const products = await this.productTitles.all();
    const count = products.length;

    // Iterates through locators array
    for (let i = 0; i < count; i++) {
      let productText = await products[i].textContent();

      // Clicks on the product with the expected name
      if (productText === productName) {
        await products[i].click();
        break;
      }
    }

    return new InventoryItemPage(this.page);
  }
}

export default InventoryPage;
