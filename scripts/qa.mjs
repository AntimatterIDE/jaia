/**
 * QA smoke suite (spec §16): axe accessibility, responsive widths, overflow,
 * keyboard operation, reduced motion, console errors, and internal links.
 * Run: node scripts/qa.mjs  (expects the app on http://localhost:3123)
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { PNG } from "pngjs";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE_URL ?? "http://localhost:3123";
const SHOTS = "/tmp/jaia-qa";
mkdirSync(SHOTS, { recursive: true });

const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const SERVICE_ROUTES = [
  "/services/apcm-bhi",
  "/services/hrv-assessment",
  "/services/iv-therapy",
  "/services/billing-rcm",
  "/services/laboratory-coordination",
  "/services/pol-establishment",
];
const ROUTES = ["/", "/case-studies", "/about", "/contact", ...SERVICE_ROUTES];

const failures = [];
const notes = [];
function fail(msg) {
  failures.push(msg);
  console.log("  FAIL:", msg);
}
function note(msg) {
  notes.push(msg);
  console.log("  note:", msg);
}
function ok(msg) {
  console.log("  ok:", msg);
}

const browser = await chromium.launch();
const consoleErrors = [];

async function newPage(options = {}) {
  const context = await browser.newContext(options);
  return context.newPage();
}

function watchConsole(page, label) {
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[${label}] ${msg.text()}`);
  });
  page.on("pageerror", (err) =>
    consoleErrors.push(`[${label}] ${err.message}`),
  );
}

async function overflowAmount(page) {
  return page.evaluate(() => {
    const el = document.scrollingElement;
    return el.scrollWidth - document.documentElement.clientWidth;
  });
}

// ── 1. Route availability + console errors ────────────────────────────────
console.log("\n== Routes ==");
{
  const page = await newPage();
  watchConsole(page, "routes");
  for (const route of ROUTES) {
    const res = await page.goto(BASE + route, { waitUntil: "load" });
    if (!res || res.status() !== 200)
      fail(`${route} returned ${res?.status()}`);
    else ok(`${route} 200`);
  }
  await page.close();
}

// ── 2. Responsive screenshots + horizontal overflow ───────────────────────
console.log("\n== Responsive (homepage) ==");
for (const width of [360, 768, 1024, 1440, 1920]) {
  const page = await newPage({
    viewport: { width, height: 1000 },
  });
  watchConsole(page, `home-${width}`);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const overflow = await overflowAmount(page);
  if (overflow > 1)
    fail(`homepage horizontal overflow at ${width}px: ${overflow}px`);
  else ok(`no horizontal overflow at ${width}px`);
  await page.screenshot({ path: `${SHOTS}/home-${width}.png`, fullPage: true });
  await page.close();
}

// 320px reflow (WCAG 1.4.10)
{
  const page = await newPage({ viewport: { width: 320, height: 800 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const overflow = await overflowAmount(page);
  if (overflow > 1) fail(`homepage reflows at 320px (overflow ${overflow}px)`);
  else ok("reflows at 320px without horizontal scroll");
  await page.screenshot({ path: `${SHOTS}/home-320.png`, fullPage: true });
  await page.close();
}

// ── 2b. Service routes: overflow at every breakpoint ──────────────────────
console.log("\n== Responsive (service routes) ==");
for (const route of SERVICE_ROUTES) {
  for (const width of [375, 768, 1280, 1536]) {
    const page = await newPage({ viewport: { width, height: 900 } });
    watchConsole(page, `${route}-${width}`);
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const overflow = await overflowAmount(page);
    if (overflow > 1)
      fail(`${route} horizontal overflow at ${width}px: ${overflow}px`);
    if (width === 375 || width === 1440)
      await page.screenshot({
        path: `${SHOTS}/${route.split("/").pop()}-${width}.png`,
        fullPage: true,
      });
    await page.close();
  }
  ok(`${route}: no overflow at 375/768/1280/1536`);
}

// ── 3. axe: every route, plus the mobile nav open state ───────────────────
console.log("\n== axe ==");
for (const route of ROUTES) {
  const page = await newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
  if (results.violations.length > 0) {
    for (const v of results.violations) {
      fail(
        `axe ${route}: ${v.id} (${v.impact}) — ${v.nodes.length} node(s): ${v.help}`,
      );
      for (const n of v.nodes.slice(0, 3)) note(`    ${n.html.slice(0, 160)}`);
    }
  } else ok(`axe clean on ${route}`);
  await page.close();
}

// Mobile navigation (sheet open state)
{
  const page = await newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const trigger = page.getByRole("button", { name: "Open menu" });
  if ((await trigger.count()) === 0) {
    fail("mobile menu trigger not found at 390px");
  } else {
    await trigger.click();
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    if (results.violations.length > 0) {
      for (const v of results.violations)
        fail(`axe mobile-nav: ${v.id} (${v.impact}) — ${v.help}`);
    } else ok("axe clean with mobile sheet open");
    await page.screenshot({ path: `${SHOTS}/mobile-nav-open.png` });
    // Escape closes and focus returns to the trigger
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const focused = await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-label"),
    );
    if (focused !== "Open menu")
      note(`after Escape, focus on: ${focused ?? "body"}`);
    else ok("Escape closes sheet, focus returns to trigger");
  }
  await page.close();
}

// ── 4. Keyboard pass: skip link first, dropdown operable ──────────────────
console.log("\n== Keyboard ==");
{
  const page = await newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  await page.keyboard.press("Tab");
  const first = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  );
  if (first !== "Skip to main content")
    fail(`first Tab stop is "${first}", expected skip link`);
  else ok("skip link is the first Tab stop");

  // Activate skip link on a fresh page, then verify focus lands on main
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  const mainFocused = await page.evaluate(
    () => document.activeElement?.id === "main-content",
  );
  if (!mainFocused) fail("skip link did not move focus to #main-content");
  else ok("skip link moves focus to main content");

  // Fresh page: tab through the header to the Services trigger
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(400);
  let guard = 0;
  let label = "";
  while (guard++ < 8) {
    await page.keyboard.press("Tab");
    label = await page.evaluate(
      () => document.activeElement?.textContent?.trim() ?? "",
    );
    if (label.includes("Services")) break;
  }
  if (!label.includes("Services"))
    fail(`could not reach Services trigger (saw "${label}")`);
  else {
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    const expanded = await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-expanded"),
    );
    if (expanded !== "true")
      note(`Services trigger aria-expanded=${expanded} after Enter`);
    const visible = await page
      .getByRole("link", { name: /APCM \+ BHI/ })
      .first()
      .isVisible();
    if (!visible)
      fail("Services dropdown links not visible after keyboard open");
    else ok("Services dropdown opens via keyboard, links visible");
    await page.screenshot({ path: `${SHOTS}/desktop-services-dropdown.png` });
    await page.keyboard.press("Escape");
  }

  // Focus visibility: tab a few stops, confirm an outline/ring is computed
  let focusVisible = false;
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    const styles = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        outline: cs.outlineWidth + " " + cs.outlineStyle,
        boxShadow: cs.boxShadow,
      };
    });
    if (
      styles &&
      (styles.outline.includes("2px") ||
        (styles.boxShadow && styles.boxShadow !== "none"))
    ) {
      focusVisible = true;
      break;
    }
  }
  if (!focusVisible)
    fail("no visible focus indicator detected in first 8 Tab stops");
  else ok("visible focus indicator present while tabbing");
  await page.close();
}

// ── 4b. Header: recede on scroll down, return on scroll up ────────────────
console.log("\n== Header ==");
{
  const page = await newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const offset = () =>
    page.evaluate(() =>
      Math.round(document.querySelector("header").getBoundingClientRect().top),
    );
  const height = await page.evaluate(() =>
    Math.round(document.querySelector("header").getBoundingClientRect().height),
  );

  if ((await offset()) !== 0) fail("header not visible at the top of the page");
  else ok("header visible at page top");

  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(800);
  if ((await offset()) > -height + 2)
    fail("header did not recede when scrolling down");
  else ok("header recedes when scrolling down");

  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(800);
  if ((await offset()) !== 0) fail("header did not return when scrolling up");
  else ok("header returns when scrolling up");

  // Keyboard users must never be left chasing an off-screen header
  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector("header a").focus());
  await page.waitForTimeout(600);
  if ((await offset()) !== 0) fail("header stays hidden when focused");
  else ok("header returns when focus enters it");
  await page.close();

  // Reduced motion: the header should not slide away at all
  const rmPage = await newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await rmPage.goto(BASE + "/", { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(500);
  await rmPage.mouse.wheel(0, 1600);
  await rmPage.waitForTimeout(800);
  const rmTop = await rmPage.evaluate(() =>
    Math.round(document.querySelector("header").getBoundingClientRect().top),
  );
  if (rmTop !== 0) fail("reduced-motion: header still recedes on scroll");
  else ok("reduced-motion: header stays pinned");
  await rmPage.close();
}

// ── 5. Reduced motion + 200% zoom behavior of the stack ───────────────────
console.log("\n== Motion & zoom ==");
{
  const page = await newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const stickyCount = await page.evaluate(() => {
    const root = document.querySelector("#capabilities");
    if (!root) return -1;
    return Array.from(root.querySelectorAll("*")).filter(
      (el) => getComputedStyle(el).position === "sticky",
    ).length;
  });
  const rmMode = await page.getAttribute("#capabilities", "data-capabilities-mode");
  if (rmMode !== "list")
    fail(`reduced-motion: expected list mode, got ${rmMode}`);
  else if (stickyCount > 0)
    fail(`reduced-motion: ${stickyCount} sticky nodes still in capabilities`);
  else ok("reduced-motion: capability stack is a normal list (no sticky)");

  // Content must be visible immediately (no hidden-till-JS reveals)
  const hidden = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const cs = h1 ? getComputedStyle(h1.closest("div")) : null;
    return cs ? Number(cs.opacity) < 1 : true;
  });
  if (hidden) fail("reduced-motion: hero content starts hidden");
  else ok("reduced-motion: hero content visible immediately");
  await page.close();

  // Default motion: sticky engaged on desktop
  const page2 = await newPage({ viewport: { width: 1440, height: 1000 } });
  await page2.goto(BASE + "/", { waitUntil: "networkidle" });
  const stackDesktop = await page2.evaluate(() => {
    const root = document.querySelector("#capabilities");
    const mode = root?.getAttribute("data-capabilities-mode");
    const links = root
      ? Array.from(root.querySelectorAll('a[href^="/services/"]')).length
      : 0;
    const sticky = root
      ? Array.from(root.querySelectorAll("*")).filter(
          (el) => getComputedStyle(el).position === "sticky",
        ).length
      : 0;
    return { mode, links, sticky };
  });
  if (stackDesktop.mode !== "stack")
    fail(`desktop capabilities mode: ${stackDesktop.mode}`);
  else if (stackDesktop.links < 6)
    fail(`desktop capabilities links: ${stackDesktop.links}/6`);
  else if (stackDesktop.sticky < 1)
    fail("desktop: ScrollStack sticky stage missing");
  else ok("desktop: capability ScrollStack pinned with six service links");
  await page2.close();

  // 200% zoom equivalent: 1440px screen zoomed 2x => ~720 CSS px viewport
  const page3 = await newPage({ viewport: { width: 720, height: 900 } });
  await page3.goto(BASE + "/", { waitUntil: "networkidle" });
  await page3.waitForTimeout(500);
  const sticky720 = await page3.evaluate(() => {
    const root = document.querySelector("#capabilities");
    if (!root) return 0;
    return Array.from(root.querySelectorAll("*")).filter(
      (el) => getComputedStyle(el).position === "sticky",
    ).length;
  });
  const overflow720 = await overflowAmount(page3);
  if (overflow720 > 1) fail(`200% zoom: horizontal overflow ${overflow720}px`);
  else ok(`200% zoom equivalent: no overflow (sticky nodes: ${sticky720})`);
  await page3.close();
}

// ── 5b. Hero backdrop, liquid-fill CTAs, and motion sections ──────────────
console.log("\n== Hero backdrop & CTA fill ==");
{
  // The backdrop must animate normally...
  const page = await newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  const backdrop = await page.locator("[data-hero-backdrop]").count();
  if (backdrop !== 1) fail(`expected 1 hero backdrop, found ${backdrop}`);
  else ok("hero backdrop mounted");

  const hiddenFromA11y = await page.evaluate(() => {
    const el = document.querySelector("[data-hero-backdrop]");
    return el?.getAttribute("aria-hidden") === "true";
  });
  if (!hiddenFromA11y) fail("hero backdrop is not aria-hidden");
  else ok("hero backdrop hidden from assistive technology");

  const readBlob = () =>
    page.evaluate(
      () =>
        getComputedStyle(document.querySelector("[data-blob]")).transform ?? "",
    );
  const t1 = await readBlob();
  await page.waitForTimeout(1200);
  const t2 = await readBlob();
  if (t1 === t2) note("hero backdrop blobs did not move over 1.2s");
  else ok("hero backdrop blobs animate");

  // ...and the CTA fill must expand from the pointer
  const cta = page
    .locator("section[aria-labelledby='hero-heading'] a[href='/contact']")
    .first();
  const box = await cta.boundingBox();
  const scaleOf = () =>
    cta.evaluate((n) => {
      const layer = n.querySelector("span[aria-hidden]");
      if (!layer) return "NONE";
      const m = new DOMMatrixReadOnly(getComputedStyle(layer).transform);
      return m.a; // uniform scale factor
    });
  const restScale = await scaleOf();
  await page.mouse.move(box.x + 3, box.y + box.height / 2);
  await page.waitForTimeout(700);
  const hoverScale = await scaleOf();
  if (restScale === "NONE") fail("CTA has no liquid fill layer");
  else if (!(hoverScale > restScale + 0.5))
    fail(`CTA fill did not expand on hover (${restScale} -> ${hoverScale})`);
  else ok(`CTA liquid fill expands on hover (${restScale} -> ${hoverScale})`);
  await page.close();

  // Reduced motion: backdrop still, fill layer suppressed, sections visible
  const rm = await newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await rm.goto(BASE + "/", { waitUntil: "networkidle" });
  await rm.waitForTimeout(800);

  const readRm = () =>
    rm.evaluate(
      () =>
        getComputedStyle(document.querySelector("[data-blob]")).transform ?? "",
    );
  const r1 = await readRm();
  await rm.waitForTimeout(1200);
  const r2 = await readRm();
  if (r1 !== r2) fail("reduced-motion: hero backdrop still animating");
  else ok("reduced-motion: hero backdrop static");

  const fillDisplay = await rm.evaluate(() => {
    const link = document.querySelector(
      "section[aria-labelledby='hero-heading'] a[href='/contact']",
    );
    const layer = link?.querySelector("span[aria-hidden]");
    return layer ? getComputedStyle(layer).display : "ABSENT";
  });
  if (fillDisplay !== "none")
    fail(`reduced-motion: CTA fill layer not hidden (display: ${fillDisplay})`);
  else ok("reduced-motion: CTA falls back to a plain background swap");

  // Sections animated with motion/react must not stay hidden
  const proofOpacity = await rm.evaluate(() => {
    const section = document.querySelector(
      "section[aria-labelledby='social-proof-heading']",
    );
    const article = section?.querySelector("article");
    return article ? Number(getComputedStyle(article).opacity) : -1;
  });
  if (proofOpacity < 1)
    fail(`reduced-motion: social proof cards at opacity ${proofOpacity}`);
  else ok("reduced-motion: social proof content fully visible");
  await rm.close();
}

// ── 5c. Text contrast over the animated hero artwork ──────────────────────
console.log("\n== Hero contrast ==");
{
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

  const targets = [
    ["#hero-heading", "headline"],
    ["section[aria-labelledby='hero-heading'] p.measure", "lead"],
    ["section[aria-labelledby='hero-heading'] p.text-eyebrow", "eyebrow"],
    [
      "section[aria-labelledby='hero-heading'] a[href='/#capabilities']",
      "cta link",
    ],
  ];

  for (const width of [1440, 1280, 768, 375]) {
    const page = await newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    // The aurora drifts, so a single sample can miss the worst moment.
    // Check early in the loop and again once the blobs have travelled.
    for (const phase of [0, 7000]) {
      if (phase) await page.waitForTimeout(phase);
      for (const [selector, label] of targets) {
        const el = page.locator(selector).first();
        if ((await el.count()) === 0) continue;
        const box = await el.boundingBox();
        if (!box) continue;

        const [r, g, b] = (await el.evaluate((n) => getComputedStyle(n).color))
          .match(/\d+/g)
          .map(Number);
        const textLum = lum(r, g, b);
        const fontSize = parseFloat(
          await el.evaluate((n) => getComputedStyle(n).fontSize),
        );
        const required = fontSize >= 24 ? 3 : 4.5;

        // Hide the glyphs so only the backdrop behind them is sampled
        await el.evaluate((n) => (n.style.visibility = "hidden"));
        const buf = await page.screenshot({
          clip: {
            x: Math.max(0, box.x),
            y: Math.max(0, box.y),
            width: Math.min(box.width, width - box.x),
            height: box.height,
          },
        });
        await el.evaluate((n) => (n.style.visibility = ""));

        const png = PNG.sync.read(buf);
        let worst = Infinity;
        for (let i = 0; i < png.data.length; i += 4) {
          const c = contrast(
            textLum,
            lum(png.data[i], png.data[i + 1], png.data[i + 2]),
          );
          if (c < worst) worst = c;
        }
        if (worst < required)
          fail(
            `hero ${label} at ${width}px (phase +${phase}ms): ${worst.toFixed(2)}:1 over the backdrop (needs ${required}:1)`,
          );
      }
    }
    ok(`hero text clears AA over the backdrop at ${width}px`);
    await page.close();
  }
}

// ── 6. Internal links resolve ──────────────────────────────────────────────
console.log("\n== Links ==");
{
  const page = await newPage();
  const hrefs = new Set();
  for (const route of ["/", "/case-studies", "/about", "/contact", "/services/iv-therapy"]) {
    await page.goto(BASE + route, { waitUntil: "load" });
    const links = await page.$$eval("a[href^='/']", (els) =>
      els.map((e) => e.getAttribute("href")),
    );
    links.forEach((l) => hrefs.add(l.split("#")[0].split("?")[0]));
  }
  for (const href of hrefs) {
    const res = await page.goto(BASE + href, { waitUntil: "load" });
    if (!res || res.status() !== 200)
      fail(`link target ${href} returned ${res?.status()}`);
  }
  ok(`all ${hrefs.size} unique internal link targets resolve`);
  await page.close();
}

// ── 7. Contact form: keyboard + error summary + honest submit ─────────────
console.log("\n== Contact form ==");
{
  const page = await newPage({ viewport: { width: 1440, height: 1000 } });
  watchConsole(page, "contact");
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Empty submit shows error summary and focuses it
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await page.waitForTimeout(300);
  const summaryVisible = await page
    .getByRole("alert")
    .filter({ hasText: "problem" })
    .isVisible();
  if (!summaryVisible) fail("contact: no error summary on empty submit");
  else ok("contact: error summary appears and is an alert");
  await page.screenshot({ path: `${SHOTS}/contact-errors.png` });

  // Fill and submit -> honest not-connected notice (no fake success)
  await page.fill("#field-firstName", "Jordan");
  await page.fill("#field-lastName", "Lee");
  await page.fill("#field-workEmail", "jordan@exampleclinic.com");
  await page.fill("#field-organization", "Example Clinic");
  await page.fill("#field-role", "Practice Manager");
  await page.fill(
    "#field-message",
    "We want to explore adding care management programs.",
  );
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await page.waitForTimeout(800);
  const status = await page.locator("#form-status").textContent();
  if (!status || !/not yet connected/i.test(status))
    fail("contact: expected honest not-connected status after submit");
  else ok("contact: submit reports not-connected honestly (no fake success)");
  await page.screenshot({ path: `${SHOTS}/contact-status.png` });

  // Service preselect via query param
  await page.goto(BASE + "/contact?service=iv-therapy", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(400);
  const selected = await page.locator("#field-service").textContent();
  if (!selected || !selected.includes("IV Therapy"))
    fail(`contact: service preselect failed (saw "${selected?.trim()}")`);
  else ok("contact: ?service=iv-therapy preselects the service");
  await page.close();
}

await browser.close();

console.log("\n== Console errors ==");
if (consoleErrors.length > 0) {
  consoleErrors.forEach((e) => fail(e));
} else ok("no console errors or page errors");

console.log("\n==============================");
if (failures.length > 0) {
  console.log(`QA RESULT: ${failures.length} failure(s)`);
  failures.forEach((f) => console.log(" - " + f));
  process.exit(1);
} else {
  console.log("QA RESULT: all checks passed");
}
