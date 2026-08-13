/**
 * Screenshot any URL at a given viewport, for audit evidence.
 *
 *   node scripts/capture-site.mjs <url> <out> [width] [height] [scale]
 *   node scripts/capture-site.mjs https://example.com shot.png 1366 768
 *   node scripts/capture-site.mjs https://example.com shot.jpg 1366 768 1.5
 *
 * Drives Chrome over the DevTools Protocol — no dependencies (Node 22+ has a
 * global WebSocket).
 *
 * Use a .jpg output for anything going into an emailed report. A full-page PNG
 * screenshot runs 2–3 MB; the same image as JPEG is roughly a tenth of that,
 * and report pages are opened on phones.
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
const scale = Number(process.argv[6] ?? 2);
const isJpeg = /\.jpe?g$/i.test(out ?? "");

if (!url || !out) {
  console.error("Usage: node scripts/capture-site.mjs <url> <out> [width] [height] [scale]");
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

    // Headless Chrome advertises "HeadlessChrome" in its UA, and some clinic
    // sites sit behind a WAF that resets the connection on sight of it. We are
    // photographing a public homepage as a visitor would see it, so present the
    // matching desktop or mobile UA rather than the headless one.
    await client.send("Network.setUserAgentOverride", {
      userAgent:
        width < 700
          ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
          : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    });

    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: scale,
      mobile: width < 700,
    });

    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url });
    await loaded;
    // Fonts, hero images and any client-side rendering.
    await sleep(3000);

    const { data } = await client.send(
      "Page.captureScreenshot",
      isJpeg ? { format: "jpeg", quality: 82 } : { format: "png" },
    );
    const buf = Buffer.from(data, "base64");
    await writeFile(out, buf);
    console.log(
      `  ✓ ${url} @ ${width}×${height}@${scale}x → ${out} (${Math.round(buf.length / 1024)} KB)`,
    );
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
