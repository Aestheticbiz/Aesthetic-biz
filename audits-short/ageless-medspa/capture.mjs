/**
 * Captures the two screenshots an audit needs, from the live site.
 *
 *   node capture.mjs https://agelessmedspa.com/
 *
 * Writes images/audited-desktop.jpg and images/audited-mobile.jpg at the
 * viewports the review script specifies: 1366x768 and 390x844.
 *
 * Same robustness as build.mjs: headless printing/capture is unreliable while a
 * normal Edge/Chrome window is open, so each capture uses a private profile,
 * waits for the file, and retries.
 *
 * Files are written as .png first and left as .png if no converter is present —
 * the report's <img> tags work either way, but audit-data.js must then name the
 * .png. The script prints exactly what to put in audit-data.js.
 */

import { access, mkdir, rename, readdir, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import os from "node:os";

const run = promisify(execFile);
const url = process.argv[2];

if (!url || !/^https?:\/\//.test(url)) {
  console.error("Usage: node capture.mjs <https://practice-website/>");
  process.exit(1);
}

const here = process.cwd();
const images = path.join(here, "images");
await mkdir(images, { recursive: true });

const candidates = [
  `${process.env["ProgramFiles(x86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
let browser = null;
for (const c of candidates) {
  try { await access(c); browser = c; break; } catch { /* keep looking */ }
}
if (!browser) {
  console.error("Chrome or Edge not found. Capture the two screenshots by hand instead.");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(label, width, height, out) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try { await unlink(out); } catch { /* not there yet */ }
    try {
      await run(browser, [
        "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
        `--window-size=${width},${height}`,
        // A live site needs time for fonts, images and any consent banner.
        "--virtual-time-budget=20000",
        `--user-data-dir=${path.join(os.tmpdir(), `audit-shot-${process.pid}-${label}-${attempt}`)}`,
        `--screenshot=${out}`,
        url,
      ], { timeout: 90000 });
    } catch { /* the browser can exit non-zero and still write the file */ }

    // A live site can take far longer than a local file; the write has been
    // observed landing ~10s after the process returns.
    for (let waited = 0; waited < 30000; waited += 500) {
      try { await access(out); return true; } catch { await sleep(500); }
    }
    if (attempt < 3) console.log(`  … ${label} attempt ${attempt} produced nothing, retrying`);
  }
  return false;
}

console.log(`\n  Capturing ${url}`);
const desktop = path.join(images, "audited-desktop.png");
const mobile = path.join(images, "audited-mobile.png");

const okD = await shot("desktop", 1366, 768, desktop);
const okM = await shot("mobile", 390, 844, mobile);

console.log(`  ${okD ? "✓" : "✗"} images/audited-desktop.png  (1366 x 768)`);
console.log(`  ${okM ? "✓" : "✗"} images/audited-mobile.png   (390 x 844)`);

if (okD && okM) {
  // Remove the template's sample .jpg files so nothing stale can be uploaded.
  for (const f of await readdir(images)) {
    if (f === "audited-desktop.jpg" || f === "audited-mobile.jpg") {
      await unlink(path.join(images, f));
    }
  }
  console.log(`
  Set these in audit-data.js:
    screenshots.desktop.src = "images/audited-desktop.png"
    screenshots.mobile.src  = "images/audited-mobile.png"

  Then open both and confirm they show the practice's first screen, not a
  cookie banner or an error page.
`);
} else {
  console.log("\n  Close any open Edge/Chrome windows and run again.\n");
}
