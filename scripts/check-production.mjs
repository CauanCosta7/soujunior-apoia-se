import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const response = await page.goto("https://soujunior-apoia-se.vercel.app");
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() =>
  Promise.all([...document.images].map((i) => i.decode().catch(() => {}))),
);
await page.screenshot({
  path: "docs/hero-preview.jpg",
  type: "jpeg",
  quality: 65,
});
console.log(
  JSON.stringify({
    status: response.status(),
    title: await page.title(),
    h1: await page.locator("h1").innerText(),
    images: await page.evaluate(() =>
      [...document.images]
        .filter((i) => !i.complete || !i.naturalWidth)
        .map((i) => i.src),
    ),
    errors,
  }),
);
await browser.close();
