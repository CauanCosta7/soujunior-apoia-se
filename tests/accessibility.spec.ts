import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const theme of ["light", "dark"])
  for (const width of [320, 768, 1440]) {
    test(`WCAG automated audit ${theme} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      if (theme === "dark")
        await page.getByRole("button", { name: "Ativar modo escuro" }).click();
      await page.evaluate(() => {
        document.querySelectorAll("details").forEach((el) => (el.open = true));
      });
      const results = await new AxeBuilder({ page })
        .withTags([
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
          "best-practice",
        ])
        .analyze();
      expect(results.violations).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      for (const selector of [".theme-toggle", ".motion-toggle", ".menu"]) {
        const control = page.locator(selector);
        if (await control.isVisible()) {
          const box = await control.boundingBox();
          expect(box!.x).toBeGreaterThanOrEqual(0);
          expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        }
      }
    });
  }
test("keyboard skip link, FAQ and menu are usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-navigation")).toHaveClass(/is-open/);
  await expect(page.locator("#main-navigation a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Abrir menu", exact: true }),
  ).toBeFocused();
  await page.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(page.locator("details").first()).not.toHaveAttribute("open");
});
test("global motion pause persists and stops automatic movement", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pausar animações", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await page.locator(".test-track").scrollIntoViewIfNeeded();
  const story = await page.locator(".test-card.active .test-index").innerText();
  await page.waitForTimeout(3300);
  await expect(page.locator(".test-card.active .test-index")).toHaveText(story);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Retomar animações", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Retomar animações", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "active");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Animações reduzidas pelo sistema" }),
  ).toBeDisabled();
});
test("text can be enlarged to 200% without clipping the reading column", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
    document.querySelectorAll("details").forEach((el) => (el.open = true));
  });
  for (const selector of [".faq-answer", ".giving-story", ".journey-head"]) {
    const els = await page.locator(selector).all();
    for (const el of els) {
      expect(
        await el.evaluate((e) => e.scrollWidth <= e.clientWidth + 1),
        selector,
      ).toBe(true);
    }
  }
});
