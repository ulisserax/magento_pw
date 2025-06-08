import { test, expect } from "../../support/fixtures";

test.describe("Mens Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should hover over the Mens link and assert if the Tops link is visible", async ({
    mensPage,
  }) => {
    await expect(mensPage.mensLink).toBeVisible();
    await mensPage.hoverOverMensLink();
    await expect(mensPage.topsLink).toBeVisible();
    const topsText = await mensPage.getMensOptionText(mensPage.topsLink);
    expect(topsText).toBe("Tops");
  });

  test("should navigate to the Tops page when the Tops link is clicked", async ({
    mensPage,
    page,
  }) => {
    await mensPage.hoverOverMensLink();
    await mensPage.topsLink.click();
    await expect(page).toHaveURL(/.*tops-men/);
  });

  test("should hover over tops link, select the jacket link option and check if there's 11 elements displaying on the page", async ({
    mensPage,
    page,
  }) => {
    await mensPage.hoverOverMensLink();
    await mensPage.hoverOverMensLink(mensPage.topsLink);
    await mensPage.jacketLink.click();
    await expect(page).toHaveURL(/.*jackets-men/);
    const jacketsCount = await mensPage.getProductCount();
    expect(jacketsCount).toBe(11);
  });
});
