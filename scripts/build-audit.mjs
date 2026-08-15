/**
 * Turns an audit folder into something you can upload and send.
 *
 *   node scripts/build-audit.mjs bel-ange-medical-spa
 *
 * Does two things:
 *   1. Prints index.html to a PDF beside it, so the report's own
 *      "Download as PDF" button resolves.
 *   2. Zips index.html + images + the PDF into audits/<slug>.zip, ready to
 *      upload to the subdomain and unzip in place.
 *
 * The outreach email is deliberately left out of the zip — it is for you, not
 * for the recipient's web server.
 *
 * Chrome over the DevTools Protocol; no dependencies.
 */

import { spawn, execFileSync } from "node:child_process";
import { writeFile, rm, mkdir, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// Derived from the pid so concurrent runs do not fight over one port.
const PORT = 9900 + (process.pid % 90);
const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/build-audit.mjs <clinic-slug>");
  process.exit(1);
}

const dir = path.join(process.cwd(), "audits", slug);
const html = path.join(dir, "index.html");
const pdfName = `${slug}-audit.pdf`;
const pdf = path.join(dir, pdfName);

if (!existsSync(html)) {
  console.error(`No report at ${html}`);
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

function fileUrl(p) {
  return "file:///" + p.replace(/\\/g, "/").replace(/ /g, "%20");
}

async function makePdf() {
  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-first-run",
      // Per-process profile. Two Chrome instances sharing one user-data-dir
      // fight over it and the second never opens its debugging port, so a
      // build cannot run while a capture batch is going.
      "--user-data-dir=" + path.join(process.cwd(), `.chrome-capture-profile-${process.pid}`),
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

    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url: fileUrl(html) });
    await loaded;
    await sleep(2500);

    const { data } = await client.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: false,
      paperWidth: 8.27,   // A4
      paperHeight: 11.69,
      marginTop: 0.5,
      marginBottom: 0.5,
      marginLeft: 0.4,
      marginRight: 0.4,
    });

    const buf = Buffer.from(data, "base64");
    await writeFile(pdf, buf);
    console.log(`  ✓ PDF   ${pdfName} (${Math.round(buf.length / 1024)} KB)`);
  } finally {
    // Chrome spawns renderer, GPU and network-service children. child.kill()
    // reaps only the parent; the rest survive and accumulate until no new
    // Chrome can launch at all. Kill the tree, then drop the profile.
    try {
      execFileSync("taskkill", ["/PID", String(chrome.pid), "/T", "/F"], { stdio: "ignore" });
    } catch {
      chrome.kill();
    }
    await rm(path.join(process.cwd(), `.chrome-capture-profile-${process.pid}`), {
      recursive: true,
      force: true,
      maxRetries: 3,
    });
  }
}

async function makeZip() {
  const staging = path.join(process.cwd(), "audits", `.stage-${slug}`);
  const zip = path.join(process.cwd(), "audits", `${slug}.zip`);

  await rm(staging, { recursive: true, force: true });
  await mkdir(staging, { recursive: true });

  // Only what belongs on the web server.
  await cp(html, path.join(staging, "index.html"));
  await cp(path.join(dir, "images"), path.join(staging, "images"), { recursive: true });
  if (existsSync(pdf)) await cp(pdf, path.join(staging, pdfName));

  await rm(zip, { force: true });
  execFileSync("powershell", [
    "-NoProfile",
    "-Command",
    `Compress-Archive -Path '${staging}\\*' -DestinationPath '${zip}' -Force`,
  ]);

  await rm(staging, { recursive: true, force: true });
  console.log(`  ✓ ZIP   audits/${slug}.zip`);
}

await makePdf();
await makeZip();
console.log(`\n  Upload audits/${slug}.zip to the subdomain and unzip in place.\n`);
