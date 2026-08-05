/**
 * Captures the glossary illustration images straight from the running dev server.
 *
 *   npm run dev            (in one terminal)
 *   node scripts/capture-glossary-images.mjs
 *
 * Drives Chrome over the DevTools Protocol with no dependencies — Node 22+ has a
 * global WebSocket. Re-run it whenever the underlying UI changes; the images are
 * screenshots of the real product, so they should never be edited by hand.
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ORIGIN = process.env.CAPTURE_ORIGIN ?? "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "public", "images", "glossary");
const PORT = 9333;

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];

/** slug → what to photograph. Selectors verified against the live pages. */
const SHOTS = [
  { slug: "gift-vouchers", url: "/gift-cards", selector: ".gift-layout" },
  { slug: "loyalty-points", url: "/rewards", selector: ".points-table" },
  { slug: "video-reviews", url: "/submit-review", selector: ".rev-form" },
  { slug: "profit-calculator", url: "/financial", selector: ".fin-panel-magic" },
  { slug: "online-retail", url: "/shop", selector: ".star-rec-grid" },
  { slug: "online-booking", url: "/book", selector: ".booking-wizard" },
  { slug: "lead-generation", url: "/skin-survey", selector: ".skin-survey-form" },
];

/** Floating chrome that would otherwise clutter every shot. */
const HIDE_CSS = `
  .preview-bar, .brand-launcher, .adel-launcher, .adel-active-bar,
  .site-header, .site-footer, .star-drawer { display: none !important; }
  html { scroll-behavior: auto !important; }
`;

function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("Chrome not found. Set the path in CHROME_CANDIDATES.");
  return found;
}

async function waitForDebugger() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Chrome DevTools endpoint never came up.");
}

/** Minimal CDP client: send(method, params) → Promise<result>. */
function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  const listeners = new Map();
  let nextId = 1;

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener("open", () => resolve());
    socket.addEventListener("error", reject);
  });

  socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
      return;
    }
    if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method).forEach((fn) => fn(msg.params));
    }
  });

  return {
    ready,
    send(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const list = listeners.get(method) ?? [];
        const handler = (params) => {
          listeners.set(method, (listeners.get(method) ?? []).filter((f) => f !== handler));
          resolve(params);
        };
        listeners.set(method, [...list, handler]);
      });
    },
    close: () => socket.close(),
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      "--window-size=1440,1000",
      "--no-first-run",
      "--user-data-dir=" + path.join(process.cwd(), ".chrome-capture-profile"),
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    await waitForDebugger();

    const targetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, {
      method: "PUT",
    });
    const target = await targetRes.json();

    const client = connect(target.webSocketDebuggerUrl);
    await client.ready;

    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 2,
      mobile: false,
    });

    for (const shot of SHOTS) {
      const loaded = client.once("Page.loadEventFired");
      await client.send("Page.navigate", { url: `${ORIGIN}${shot.url}` });
      await loaded;
      // Let fonts, images and any client rendering settle.
      await new Promise((resolve) => setTimeout(resolve, 2200));

      await client.send("Runtime.evaluate", {
        expression: `
          (() => {
            const style = document.createElement('style');
            style.textContent = ${JSON.stringify(HIDE_CSS)};
            document.head.appendChild(style);
          })();
        `,
      });
      await new Promise((resolve) => setTimeout(resolve, 400));

      const { result } = await client.send("Runtime.evaluate", {
        expression: `
          (() => {
            const el = document.querySelector(${JSON.stringify(shot.selector)});
            if (!el) return JSON.stringify({ error: 'selector not found' });
            el.scrollIntoView({ block: 'center', behavior: 'instant' });
            const r = el.getBoundingClientRect();
            const pad = 18;
            // captureBeyondViewport clips in PAGE coordinates, so the scroll
            // offset has to be added to these viewport-relative numbers.
            return JSON.stringify({
              x: Math.max(0, r.left + window.scrollX - pad),
              y: Math.max(0, r.top + window.scrollY - pad),
              width: r.width + pad * 2,
              height: r.height + pad * 2,
            });
          })();
        `,
        returnByValue: true,
      });

      const box = JSON.parse(result.value);
      if (box.error) {
        console.error(`  ✗ ${shot.slug}: ${box.error} (${shot.selector})`);
        continue;
      }

      const { data } = await client.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...box, scale: 1 },
        captureBeyondViewport: true,
      });

      const file = path.join(OUT_DIR, `${shot.slug}.png`);
      await writeFile(file, Buffer.from(data, "base64"));
      console.log(
        `  ✓ ${shot.slug}  ${Math.round(box.width)}×${Math.round(box.height)} → ${path.relative(process.cwd(), file)}`,
      );
    }

    client.close();
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
