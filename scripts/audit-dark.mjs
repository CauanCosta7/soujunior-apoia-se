import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto(process.argv[2] || "http://localhost:5173");
await page.getByRole("button", { name: "Ativar modo escuro" }).click();
await page.evaluate(() => {
  document.querySelectorAll("details").forEach((d) => (d.open = true));
});
await page.evaluate(() => document.fonts.ready);
async function audit(name) {
  const r = await new AxeBuilder({ page })
    .withRules(["color-contrast"])
    .analyze();
  console.log(
    JSON.stringify({
      name,
      violations: r.violations.map((v) =>
        v.nodes.map((n) => ({ target: n.target, reason: n.failureSummary })),
      ),
      manualReviewNodes: r.incomplete.reduce(
        (total, v) => total + v.nodes.length,
        0,
      ),
    }),
  );
}
await audit("desktop dark all FAQ open");
for (const selector of [
  ".hero-secondary",
  ".hero-primary",
  ".nav-cta-desktop",
  ".giving-action .btn",
  ".final .btn",
  ".amount",
]) {
  await page.locator(selector).first().hover();
  await audit("hover " + selector);
}
await page.locator(".amount").first().click();
await page.mouse.move(0, 0);
await audit("selected amount");
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
await audit("mobile menu");

await browser.close();
