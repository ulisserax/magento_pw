import { type Locator, type Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly title: Locator;
  readonly headerText: Locator;
  readonly hotSellersTitle: Locator;
  readonly hotSellersProductsBlockList: Locator;
  readonly hotSellersProductsItems: Locator;
  readonly hotSellersProductsNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-ui-id="page-title-wrapper"]');
    this.hotSellersTitle = page.locator("div.content-heading h2", {
      hasText: "Hot Sellers",
    });
    this.hotSellersProductsBlockList = page.locator("ol.product-items");
    this.hotSellersProductsItems = page.locator(
      "ol.product-items > li.product-item"
    );
    this.hotSellersProductsNames = page.locator(
      "strong.product-item-name a.product-item-link"
    );
    this.headerText = page.locator("#ui-id-2 > li > a");
  }

  async goto() {
    await this.page.goto("/");
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getHotSellersTitle() {
    return this.hotSellersTitle.textContent();
  }

  async assertTitle(expectedTitle: string) {
    await this.title.waitFor({ state: "visible" });
    await this.page.waitForLoadState("domcontentloaded");
    const actualTitle = await this.getTitle();
    if (expectedTitle?.trim() !== actualTitle?.trim()) {
      throw new Error(
        `Expected title "${expectedTitle}", but got "${actualTitle}"`
      );
    }
  }

  async assertHotSellersTitle(expectedTitle: string) {
    await this.hotSellersTitle.waitFor({ state: "visible" });
    const actualTitle = await this.getHotSellersTitle();
    if (expectedTitle?.trim() !== actualTitle?.trim()) {
      throw new Error(
        `Expected Hot Sellers title "${expectedTitle}", but got "${actualTitle}"`
      );
    }
  }

  async assertHotSellersProductsCount(expectedCount: number) {
    await this.hotSellersProductsBlockList.waitFor({ state: "visible" });
    const actualCount = await this.hotSellersProductsItems.count();
    if (expectedCount !== actualCount) {
      throw new Error(
        `Expected Hot Sellers products count ${expectedCount}, but got ${actualCount}`
      );
    }
  }

  async assertHotSellersProductsNames(expectedNames: string[]) {
    await this.hotSellersProductsBlockList.waitFor({ state: "visible" });
    for (let i = 0; i < expectedNames.length; i++) {
      const actualNames = await this.hotSellersProductsNames
        .nth(i)
        .textContent();
      if (expectedNames[i] !== actualNames?.trim()) {
        throw new Error(
          `Expected Hot Sellers product name "${
            expectedNames[i]
          }", but got "${actualNames?.trim()}"`
        );
      }
    }
  }
  async assertHeaderText(expectedText: string[]) {
    await this.headerText.first().waitFor({ state: "visible" });
    const actualItems = await this.headerText.allTextContents();
    const normalizedItems = actualItems.map((item) => item.trim());
    for (const expected of expectedText) {
      if (!normalizedItems.includes(expected)) {
        throw new Error(
          `Expected header item "${expected}" not found in ${JSON.stringify(
            normalizedItems
          )}`
        );
      }
    }
  }
}
