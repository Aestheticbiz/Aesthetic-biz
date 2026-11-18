// Captures the real demo screens that Adel's video tour shows
// (components/video/TourFilm.tsx) into public/previews/*.webp.
// Headless Edge over the DevTools protocol (the same approach as
// crmsolutions/scripts/video/record-tour.mjs), so phone captures are a true
// mobile viewport of OUR OWN site, not a squeezed desktop.
//
//   node scripts/capture-previews.mjs [base-url]     (default http://localhost:3010)
//
// Before each capture: floating launchers and the demo preview bar are hidden,
// and every US$ price is blanked. The video never shows a price; pricing
// happens on the Discovery Call.

import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const BASE = process.argv[2] || "http://localhost:3010";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "previews");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9341;

/** [file, path, kind, max height in CSS px (full-page captures only)] */
const SHOTS = [
  ["m-home", "/", "phone", 2400],
  ["m-book", "/book", "phone", 1800],
  ["m-shop", "/shop", "phone", 2400],
  ["m-rewards", "/rewards", "phone", 2200],
  ["home", "/", "desktop"],
  ["reviews", "/reviews", "desktop"],
  ["customizer", "/customizer", "desktop"],
];
const KINDS = {
  phone: { width: 390, height: 844, scale: 2, mobile: true },
  desktop: { width: 1440, height: 900, scale: 1, mobile: false },
};

const PREP = `(() => {
  const s = document.createElement("style");
  s.textContent = ".adel-launcher,.adel-panel,.adel-active-bar,.brand-launcher,.preview-bar,.star-drawer{display:none!important}.site-header{position:relative!important;top:0!important}nextjs-portal{display:none!important}";
  document.head.appendChild(s);
  const re = /(US)?\\$\\s?\\d/;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const hide = new Set();
  while (walk.nextNode()) if (re.test(walk.currentNode.nodeValue || "")) hide.add(walk.currentNode.parentElement);
  hide.forEach((el) => el && (el.style.visibility = "hidden"));
  return hide.size;
})()`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = path.join(os.tmpdir(), `ab-previews-${Date.now()}`);
const edge = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--hide-scrollbars", "--no-first-run", "--disable-extensions", "about:blank"], { stdio: "ignore" });

let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page"); } catch {}
}
if (!target) throw new Error("Edge did not start");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 1;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) listeners.forEach((l) => l(msg));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true })).result?.value;

await send("Page.enable");
mkdirSync(OUT, { recursive: true });
const tmp = path.join(profile, "png");
mkdirSync(tmp, { recursive: true });

for (const [file, route, kind, maxH] of SHOTS) {
  const k = KINDS[kind];
  await send("Emulation.setDeviceMetricsOverride", { width: k.width, height: k.height, deviceScaleFactor: k.scale, mobile: k.mobile });
  await send("Emulation.setUserAgentOverride", {
    userAgent: k.mobile
      ? "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36"
      : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  });
  await send("Emulation.setTouchEmulationEnabled", k.mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false });
  const loaded = new Promise((r) => listeners.push((m) => m.method === "Page.loadEventFired" && r()));
  await send("Page.navigate", { url: BASE + route });
  await Promise.race([loaded, sleep(30000)]);
  await sleep(2500);
  // Scroll through once so lazy images load, then back to the top.
  await evaluate("(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); })()");
  await sleep(1500);
  const hidden = await evaluate(PREP);
  await sleep(300);
  const full = await evaluate("document.documentElement.scrollHeight");
  const height = maxH ? Math.min(full, maxH) : k.height;
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: Boolean(maxH), clip: { x: 0, y: 0, width: k.width, height, scale: 1 } });
  const png = path.join(tmp, `${file}.png`);
  writeFileSync(png, Buffer.from(data, "base64"));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "82", path.join(OUT, `${file}.webp`)]);
  console.log(`✓ ${file}.webp  ${route}  ${k.width}×${height}${hidden ? `  (${hidden} prices hidden)` : ""}`);
}

ws.close();
edge.kill();
await sleep(500);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
