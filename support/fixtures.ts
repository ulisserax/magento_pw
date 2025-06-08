import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/homePage/homePage";

type MyFixtures = {
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
    await page.close();
  },
});
export { expect } from "@playwright/test";
