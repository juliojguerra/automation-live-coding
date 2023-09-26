import { Page, Locator } from "@playwright/test";

class CheckoutCompletePage {
  page: Page;
  completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.locator(".complete-header");
  }

  getCompleteHeaderText() {
    return this.completeHeader.textContent();
  }
}

export default CheckoutCompletePage;
