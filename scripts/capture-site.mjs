/**
 * Screenshot any URL at a given viewport, for audit evidence.
 *
 *   node scripts/capture-site.mjs <url> <out.png> [width] [height]
 *   node scripts/capture-site.mjs https://example.com shot.png 1366 768
 *   node scripts/capture-site.mjs https://example.com m.png 390 844
 *
 * Drives Chrome over the DevTools Protocol — no dependencies (Node 22+ has a
 * global WebSocket). Captures at 2x for a sharp image in the report.
 */

import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const PORT = 9355;
const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];

const url = process.argv[2];
const out = process.argv[3];
const width = Number(process.argv[4] ?? 1366);
const height = Number(process.argv[5] ?? 768);

if (!url || !out) {
  console.error("Usage: node scripts/capture-site.mjs <url> <out.png> [width] [height]");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  const found = CHROME_CANDIDATES.find((c) => existsSync(c));
  if (!found) throw new Error("Chrome not found — add its path to CHROME_CANDIDATES.");
  return found;
}

function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  const listeners = new Map();
  let id = 1;

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener("open", () => resolve());
    socket.addEventListener("error", reject);
  });

  socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method).forEach((fn) => fn(msg.params));
    }
  });

  return {
    ready,
    send(method, params = {}) {
      const i = id++;
      return new Promise((resolve, reject) => {
        pending.set(i, { resolve, reject });
        socket.send(JSON.stringify({ id: i, method, params }));
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const list = listeners.get(method) ?? [];
        const fn = (p) => {
          listeners.set(method, (listeners.get(method) ?? []).filter((x) => x !== fn));
          resolve(p);
        };
        listeners.set(method, [...list, fn]);
      });
    },
  };
}

async function main() {
  await mkdir(path.dirname(path.resolve(out)), { recursive: true });

  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${width},${height}`,
      "--no-first-run",
      "--user-data-dir=" + path.join(process.cwd(), ".chrome-capture-profile"),
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    for (let i = 0; i < 80; i += 1) {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
        if (res.ok) break;
      } catch {
        /* not up yet */
      }
      await sleep(250);
    }

    const target = await (
      await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })
    ).json();

    const client = connect(target.webSocketDebuggerUrl);
    await client.ready;
    await client.send("Page.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: width < 700,
    });

    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url });
    await loaded;
    // Fonts, hero images and any client-side rendering.
    await sleep(3000);

    const { data } = await client.send("Page.captureScreenshot", { format: "png" });
    await writeFile(out, Buffer.from(data, "base64"));
    console.log(`  ✓ ${url} @ ${width}×${height} → ${out}`);
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
