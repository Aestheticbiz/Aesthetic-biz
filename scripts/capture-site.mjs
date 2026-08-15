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

import { spawn, execFileSync } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

/**
 * Chrome spawns a tree of child processes — renderer, GPU, network service.
 * child.kill() reaps only the parent and leaves the rest running, which over a
 * batch of captures accumulates into hundreds of orphans that eventually stop
 * any new Chrome from launching at all. Kill the whole tree.
 */
/** Pid of the Chrome we launched, so the exit handler can always reap it. */
let launched = null;

function killTree(pid) {
  try {
    if (process.platform === "win32") {
      execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      process.kill(-pid, "SIGKILL");
    }
  } catch {
    /* already gone */
  }
}

// Derived from the pid so concurrent runs do not fight over one port.
const PORT = 9000 + (process.pid % 900);
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
      // Per-process profile. Two Chrome instances sharing one user-data-dir
      // fight over it and the second never opens its debugging port, so
      // captures and builds cannot run at the same time.
      "--user-data-dir=" + path.join(process.cwd(), `.chrome-capture-profile-${process.pid}`),
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  // Recorded immediately, so the exit handler can reap this tree even if we
  // are killed before reaching the finally block below.
  launched = chrome.pid;

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
    killTree(chrome.pid);
    // The per-process profile is disposable, but Chrome may not have released
    // its file locks yet. Never let tidying up fail a capture that succeeded —
    // leftovers are gitignored and harmless.
    try {
      rmSync(path.join(process.cwd(), `.chrome-capture-profile-${process.pid}`), {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 200,
      });
    } catch {
      /* locked — leave it */
    }
  }
}

/**
 * Self-imposed deadline, deliberately shorter than the 120s prep-batch allows
 * each capture. If the parent times us out first it sends SIGTERM to this
 * process, which never reaches the finally block above — so Chrome and its
 * whole tree survive. Enough of those in one batch and no further Chrome can
 * launch, which is why slow sites used to poison every capture after them.
 * Losing one screenshot is fine; leaking the browser is not.
 */
const DEADLINE_MS = 90000;

const deadline = setTimeout(() => {
  console.error(`  ✗ ${url} — gave up after ${DEADLINE_MS / 1000}s`);
  process.exit(1); // triggers the exit handler below
}, DEADLINE_MS);
deadline.unref();

// Covers the deadline above, an uncaught throw, and Ctrl-C alike.
process.on("exit", () => {
  if (launched) killTree(launched);
});
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => process.exit(1));

main()
  .then(() => clearTimeout(deadline))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
