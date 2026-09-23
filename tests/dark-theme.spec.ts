import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
function contrast(a: string, b: string) {
  const lum = (rgb: string) =>
    rgb
      .match(/[\d.]+/g)!
      .slice(0, 3)
      .map(Number)
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const x = lum(a),
    y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
for (const width of [390, 1440])
  test(`dark contrast and selected states at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: "Ativar modo escuro" }).click();
    await page.evaluate(() => {
      document.querySelectorAll("details").forEach((el) => (el.open = true));
    });
    const result = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();
    expect(result.violations).toEqual([]);
    // Pseudo-element tiles need explicit checks: axe cannot infer their backgrounds.
    const tiles = await page.locator(".metric").evaluateAll((els) =>
      els.map((el) => ({
        bg: getComputedStyle(el, "::before").backgroundColor,
        fg: getComputedStyle(el.querySelector("p")!).color,
      })),
    );
    for (const tile of tiles)
      expect(contrast(tile.fg, tile.bg)).toBeGreaterThanOrEqual(4.5);
    for (const selector of [
      ".hero-primary",
      ".hero-secondary",
      ".giving-action .btn",
      ".final .btn",
      ".amount",
    ]) {
      const el = page.locator(selector).first();
      await el.hover();
      const pair = await el.evaluate((e) => ({
        fg: getComputedStyle(e).color,
        bg: getComputedStyle(e).backgroundColor,
      }));
      expect(contrast(pair.fg, pair.bg), selector).toBeGreaterThanOrEqual(4.5);
      await el.focus();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(el).toBeFocused();
      await expect(el).toHaveCSS("outline-style", "solid");
    }
    await page.locator(".amount").first().click();
    await page.mouse.move(0, 0);
    await expect(page.locator(".amount").first()).toHaveCSS(
      "background-color",
      "rgb(250, 204, 21)",
    );
    await expect(page.locator(".amount").first()).toHaveCSS(
      "color",
      "rgb(10, 22, 98)",
    );
    if (width === 390) {
      await page
        .getByRole("button", { name: "Abrir menu", exact: true })
        .click();
      const mobile = await new AxeBuilder({ page })
        .withRules(["color-contrast"])
        .analyze();
      expect(mobile.violations).toEqual([]);
    }
  });
test("animated heading hover, card movement and reduced motion remain legible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Ativar modo escuro" }).click();
  const heading = page.locator("#impacto h2");
  await heading.hover();
  await expect(heading).toHaveClass(/text-in/);
  await expect(heading.locator(".title-word").first()).toHaveCSS(
    "color",
    "rgb(250, 204, 21)",
  );
  await page.locator(".spend-landscape").scrollIntoViewIfNeeded();
  await expect(page.locator(".spend-landscape")).toHaveClass(/is-visible/);
  const card = page.locator(".spend-card").nth(1);
  await card.hover();
  await expect(card).toHaveCSS("translate", "0px -7px");
  await expect(card.locator("svg")).toHaveCSS(
    "animation-name",
    "resource-greeting",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card).toHaveCSS("translate", "none");
  await expect(card.locator("svg")).toHaveCSS("animation-name", "none");
});
