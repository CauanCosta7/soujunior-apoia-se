import { test, expect } from "@playwright/test";
test("transparency advances every four seconds, wraps and can be paused", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".spend-viewport").scrollIntoViewIfNeeded();
  const position = page.locator(".spend-position");
  await expect(position).toHaveText("1 / 4");
  await page.locator(".spend-viewport").hover();
  await expect(position).toHaveText("2 / 4", { timeout: 5500 });
  await page.getByRole("button", { name: "Pausar rotação automática" }).click();
  await page.waitForTimeout(4300);
  await expect(position).toHaveText("2 / 4");
  await page.getByRole("button", { name: "Próximo destino" }).click();
  await expect(position).toHaveText("3 / 4");
  await page
    .getByRole("button", { name: "Retomar rotação automática" })
    .click();
  await expect(position).toHaveText("4 / 4", { timeout: 5500 });
  await expect(position).toHaveText("1 / 4", { timeout: 5500 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".spend-playback")).toBeDisabled();
  await page.waitForTimeout(4300);
  await expect(position).toHaveText("1 / 4");
});
