import { test, expect } from "../../support/fixtures";

const expectedNames = [
  "Radiant Tee",
  "Breathe-Easy Tank",
  "Argus All-Weather Tank",
  "Hero Hoodie",
  "Fusion Backpack",
  "Push It Messenger Bag",
];

const expectedHeaderItems = [
  "What's New",
  "Women",
  "Men",
  "Gear",
  "Training",
  "Sale",
];

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("should display the correct title", async ({ homePage }) => {
    const expectedTitle = "Home Page";
    await homePage.assertTitle(expectedTitle);
    await expect(homePage.title).toHaveText(expectedTitle, { timeout: 5000 });
  });

  test("should have the title hot sellers, check if all the products are displaying on the page and their names", async ({
    homePage,
  }) => {
    const expectedTitle = "Hot Sellers";
    await expect(homePage.hotSellersTitle).toHaveText(expectedTitle, {
      timeout: 5000,
    });
    const productsCount = await homePage.hotSellersProductsItems.count();
    expect(productsCount).toBeGreaterThan(0);
    const expectedCount = 6;
    await homePage.assertHotSellersProductsCount(expectedCount);
    await homePage.assertHotSellersProductsNames(expectedNames);
    for (const name of expectedNames) {
      expect(
        (await homePage.hotSellersProductsNames.allTextContents()).map((text) =>
          text.trim()
        )
      ).toContain(name);
    }
  });

  test("should have the correct header names", async ({ homePage }) => {
    const actualHeaderItems = await homePage.getHeaderText();
    expect(actualHeaderItems).toEqual(expectedHeaderItems);
  });
});
