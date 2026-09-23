import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
for (const width of [390, 768, 1440]) {
  test(`preserves original layout and content at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route("**/reference", (route) =>
      route.fulfill({
        contentType: "text/html",
        body: fs
          .readFileSync("docs/original.html", "utf8")
          .replaceAll('="assets/', '="/assets/'),
      }),
    );
    await page.goto("/reference");
    await page.evaluate(() => document.fonts.ready);
    const signature = () =>
      [...document.querySelectorAll("h1,h2,h3,h4,p,a,img")].map((el) => ({
        tag: el.tagName,
        text: el.textContent?.replace(/\s+/g, " ").trim(),
        href: el.getAttribute("href"),
        src: el.getAttribute("src")?.replace(/^\//, "") ?? null,
        rect: {
          w: el.getBoundingClientRect().width,
          h: el.getBoundingClientRect().height,
        },
      }));
    const before = await page.evaluate(signature);
    await page.evaluate(() =>
      Promise.all([...document.images].map((i) => i.decode().catch(() => {}))),
    );
    const original = PNG.sync.read(await page.screenshot({ fullPage: true }));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all([...document.images].map((i) => i.decode().catch(() => {}))),
    );
    expect(await page.evaluate(signature)).toEqual(before);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const migrated = PNG.sync.read(
      await page.screenshot({
        path: `docs/preview-${width}.png`,
        fullPage: true,
      }),
    );
    expect(migrated.width).toBe(original.width);
    expect(migrated.height).toBe(original.height);
    const changed = pixelmatch(
      original.data,
      migrated.data,
      undefined,
      original.width,
      original.height,
      { threshold: 0.1 },
    );
    expect(changed / (original.width * original.height)).toBeLessThan(0.005);
    expect(errors).toEqual([]);
  });
}
test("theme, contributions, FAQ, menu and carousel work after StrictMode remount", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Ativar modo escuro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(page.locator("#main-navigation")).toHaveClass(/is-open/);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Abrir menu", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "R$ 10", exact: true }).click();
  await expect(page.locator(".response")).toContainText("R$ 10");
  await expect(
    page.getByRole("button", { name: "R$ 10", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator("summary").nth(0).click();
  await expect(page.locator("details").nth(0)).toHaveAttribute("open", "");
  await page.locator("summary").nth(1).click();
  await expect(page.locator("details").nth(0)).not.toHaveAttribute("open");
  await expect(page.locator("details").nth(1)).toHaveAttribute("open", "");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const current = Number(
    (await page.locator(".test-card.active .test-index").innerText()).slice(
      0,
      2,
    ),
  );
  await page.getByRole("button", { name: "Próximo depoimento" }).click();
  await expect(page.locator(".test-card.active .test-index")).toHaveText(
    `${String((current % 3) + 1).padStart(2, "0")} / 03`,
  );
  await page.getByRole("button", { name: "Próximo destino" }).click();
  await expect(page.locator(".spend-position")).toHaveText("2 / 4");
  expect(await page.locator(".momentum-set").count()).toBe(2);
  for (const url of [
    "https://apoia.se/soujunior",
    "https://discord.gg/FkBcf3vdQZ",
    "https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W",
    "https://github.com/SouJunior",
  ])
    expect(await page.locator(`footer a[href="${url}"]`).count()).toBe(1);
  expect(errors).toEqual([]);
});
