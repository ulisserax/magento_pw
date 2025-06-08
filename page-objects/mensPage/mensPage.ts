import { type Locator, type Page } from "@playwright/test";

export class MensPage {
  readonly page: Page;
  readonly mensLink: Locator;
  readonly topsLink: Locator;
  readonly bottomsLink: Locator;
  readonly jacketLink: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mensLink = page.locator("#ui-id-5");
    this.topsLink = page.getByRole("menuitem", { name: "Tops" });
    this.bottomsLink = page.getByRole("menuitem", { name: "Bottoms" });
    this.jacketLink = page.getByRole("menuitem", { name: "Jackets" });
    this.productItems = page.locator(
      "ol.products.list.items.product-items > li"
    );
  }

  async goto() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async hoverOverMensLink(locator?: Locator): Promise<void> {
    await (locator || this.mensLink).hover();
  }

  async getMensOptionText(locator: Locator): Promise<string | null> {
    return locator.textContent();
  }

  //   async getProductItems() {
  //     return this.productItems;
  //   }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }
}
