import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
for (const theme of ["light", "dark"]) {
  await page.goto(process.argv[2] || "http://localhost:5173");
  await page.evaluate((t) => {
    localStorage.setItem("soujunior-theme", t);
  }, theme);
  await page.reload();
  await page.evaluate(() => {
    document.querySelectorAll("details").forEach((d) => (d.open = true));
  });
  const r = await new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
    ])
    .analyze();
  if (r.violations.length) process.exitCode = 1;
  console.log(
    JSON.stringify({
      theme,
      violations: r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          reason: n.failureSummary,
        })),
      })),
      incomplete: r.incomplete.map((v) => ({
        id: v.id,
        count: v.nodes.length,
      })),
    }),
  );
}
await browser.close();
