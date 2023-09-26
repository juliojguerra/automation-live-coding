import { Page, test, expect } from "@playwright/test";
import LoginPage from "../page-objects/LoginPage";
import userData from "../test-data/userData.json";
import productData from "../test-data/productData.json";
import InventoryPage from "../page-objects/InventoryPage";

let inventoryPage: InventoryPage;
let page: Page;

test.beforeEach(async function ({ browser }) {
  const context = await browser.newContext();
  page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.go();

  inventoryPage = await loginPage.submitLoginForm(
    userData.userName,
    userData.password
  );
});

test("Verify product purchase successfully", async function ({}) {
  const inventoryItemPage = await inventoryPage.selectProduct(productData.name);

  const addToCartButton = inventoryItemPage.getAddToCartButton();

  expect.soft(addToCartButton).toBeVisible();

  await inventoryItemPage.clickAddToCart();

  const cartPage = await inventoryItemPage.clickShoppingCart();

  const checkoutOnePage = await cartPage.clickCheckout();

  await checkoutOnePage.fillCheckoutInformation(
    userData.firstName,
    userData.lastName,
    userData.postalCode
  );

  const checkoutTwoPage = await checkoutOnePage.clickContinue();

  const productText = await checkoutTwoPage.getProductText();
  const priceText = await checkoutTwoPage.getProductPrice();

  const priceTotalText = await checkoutTwoPage.getPriceTotalText();
  const sumTotal = await checkoutTwoPage.calculateTotal(productData.price);
  const totalInCheckout = await checkoutTwoPage.getTotalNumber();

  expect.soft(productText).toEqual(productData.name);
  expect.soft(priceText).toEqual(productData.price);

  expect.soft(priceTotalText).toEqual(productData.price);
  expect.soft(sumTotal).toEqual(totalInCheckout);

  const checkoutCompletePage = await checkoutTwoPage.clickFinishButton();

  const completeHeaderText = await checkoutCompletePage.getCompleteHeaderText();
  const expectedMessage = "Thank you for your order!";

  expect(completeHeaderText).toContain(expectedMessage);
});
