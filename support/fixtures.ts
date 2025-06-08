import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/homePage/homePage";
import { MensPage } from "../page-objects/mensPage/mensPage";

type MyFixtures = {
  homePage: HomePage;
  mensPage: MensPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
    await page.close();
  },
  mensPage: async ({ page }, use) => {
    const mensPage = new MensPage(page);
    await use(mensPage);
    await page.close();
  },
});
export { expect } from "@playwright/test";
