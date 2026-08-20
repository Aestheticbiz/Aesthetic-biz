/**
 * Builds everything an audit needs to go out, from audit-data.js alone.
 *
 *   node build.mjs            (run inside an audit folder)
 *
 * Produces, beside index.html:
 *   <pdfFile>   — the four-page PDF, printed with headless Edge or Chrome
 *   email.html  — the HTML email, ready to paste into your mail client
 *   email.txt   — the plain-text alternative
 *
 * Why generate the email here rather than write it per clinic: the email must
 * quote the first leak exactly as the report states it. Retyping it by hand is
 * how the email and the report drift apart, and a prospect who spots the
 * difference stops trusting both.
 *
 * The email deliberately reveals ONE leak. The report is what shows the rest.
 */

import { readFile, writeFile, access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const run = promisify(execFile);
const here = process.cwd();

/* ── Load audit-data.js without a browser ─────────────────────────────── */
const raw = await readFile(path.join(here, "audit-data.js"), "utf8");
const win = {};
new Function("window", raw)(win);
const d = win.AUDIT_DATA;
if (!d) throw new Error("audit-data.js did not set window.AUDIT_DATA");

const missing = ["outreach", "practice", "report", "leaks"].filter((k) => !d[k]);
if (missing.length) throw new Error(`audit-data.js is missing: ${missing.join(", ")}`);
if (d.leaks.length !== 3) throw new Error(`Expected exactly 3 leaks, found ${d.leaks.length}`);

const { outreach: o, practice: p, report: r } = d;
const leak = d.leaks[0];

/* Placeholders that mean the file was never edited for this practice. */
const stale = [
  ["outreach.firstName", o.firstName, "Irma"],
  ["outreach.auditUrl", o.auditUrl, "https://bella-med-spa.itools247.co.za/"],
  ["practice.name", p.name, "Bella Med Spa & Aesthetics"],
].filter(([, actual, sample]) => actual === sample);

/* ── The email ────────────────────────────────────────────────────────── */
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const bodyLines = [
  `Hi ${o.firstName},`,
  `I reviewed the first-time patient journey on ${p.name}'s website. The site is polished, but I found three points where a premium patient may hesitate before booking.`,
  // Using the leak title as a label keeps this sentence grammatical whatever
  // the title says. Lowercasing it into "The first is …" does not.
  `The first: ${leak.title}. ${leak.observed}`,
  `I marked that and two other booking leaks in a short, three-minute review:`,
];

const closing = "No form and no obligation — yours to use either way.";

const emailText = [
  `To: ${o.toEmail}`,
  `Subject: ${o.subject}`,
  "",
  ...bodyLines,
  "",
  o.auditUrl,
  "",
  closing,
  "",
  o.fromName,
  o.fromEmail,
  "",
  `If you would prefer no further messages, reply "no thanks" and I will remove your details.`,
].join("\n");

const emailHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.subject)}</title>
</head>
<body style="margin:0;padding:24px 0;background:#f3f2ef;">
  <!-- Preview pane only: the grey band and the header strip below are for your
       eye. Copy from "Subject:" downward when sending. -->
  <div style="max-width:640px;margin:0 auto 14px;font:13px -apple-system,Segoe UI,Arial,sans-serif;color:#6b6f76;">
    <strong style="color:#101820;">To</strong> ${esc(o.toEmail)} &nbsp;·&nbsp;
    <strong style="color:#101820;">Subject</strong> ${esc(o.subject)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f2ef;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #e3e1dd;">
        <tr><td style="padding:34px 34px 8px;font:16px/1.65 -apple-system,Segoe UI,Arial,sans-serif;color:#22262c;">
${bodyLines.map((l) => `          <p style="margin:0 0 18px;">${esc(l)}</p>`).join("\n")}
          <p style="margin:0 0 26px;">
            <a href="${esc(o.auditUrl)}" style="display:inline-block;background:#0f2647;color:#ffffff;text-decoration:none;padding:14px 24px;font-weight:600;">View ${esc(p.name)}'s private website review</a>
          </p>
          <p style="margin:0 0 22px;color:#5c6069;font-size:15px;">${esc(closing)}</p>
          <p style="margin:0 0 4px;">${esc(o.fromName)}</p>
          <p style="margin:0 0 30px;font-size:14px;color:#6b6f76;">
            <a href="mailto:${esc(o.fromEmail)}" style="color:#6b6f76;">${esc(o.fromEmail)}</a>
          </p>
        </td></tr>
        <tr><td style="padding:16px 34px 26px;border-top:1px solid #eeece8;font:12px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#8b8f96;">
          If you would prefer no further messages, reply &ldquo;no thanks&rdquo; and I will remove your details.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

await writeFile(path.join(here, "email.html"), emailHtml, "utf8");
await writeFile(path.join(here, "email.txt"), emailText, "utf8");

/* ── The PDF ──────────────────────────────────────────────────────────── */
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

let pdfPages = null;
if (!browser) {
  console.log("  ! Chrome/Edge not found — PDF skipped. Use the Print / Save PDF button.");
} else {
  const out = path.join(here, r.pdfFile);
  const pageUrl = pathToFileURL(path.join(here, "index.html")).href;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /**
   * Headless printing is unreliable when a normal Edge/Chrome is already open:
   * the launch can attach to the running instance and ignore --print-to-pdf, and
   * even when it works the process sometimes returns before the file is flushed.
   *
   * So: a private --user-data-dir per attempt, then poll for the file, then retry.
   * Observed failing roughly one run in two without this; stable with it.
   */
  let wrote = false;
  for (let attempt = 1; attempt <= 3 && !wrote; attempt++) {
    try {
      await run(browser, [
        "--headless=new", "--disable-gpu", "--no-sandbox", "--no-pdf-header-footer",
        "--virtual-time-budget=9000",
        `--user-data-dir=${path.join(os.tmpdir(), `audit-pdf-${process.pid}-${attempt}`)}`,
        `--print-to-pdf=${out}`,
        pageUrl,
      ]);
    } catch {
      /* the browser exiting non-zero still sometimes produces the file */
    }
    for (let waited = 0; waited < 6000 && !wrote; waited += 300) {
      try { await access(out); wrote = true; } catch { await sleep(300); }
    }
    if (!wrote && attempt < 3) console.log(`  … print attempt ${attempt} produced nothing, retrying`);
  }

  if (!wrote) {
    throw new Error(
      `The browser did not write ${r.pdfFile} after 3 attempts.\n` +
      `  Close any open Edge/Chrome windows and run again, or open index.html and use Print / Save PDF.`
    );
  }
  const pdf = await readFile(out);
  pdfPages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
}

/* ── Report ───────────────────────────────────────────────────────────── */
console.log(`\n  ${p.name}`);
console.log(`  ✓ email.html + email.txt   (reveals leak 1 of 3)`);
if (pdfPages !== null) {
  const ok = pdfPages <= 4;
  console.log(`  ${ok ? "✓" : "✗"} ${r.pdfFile}  — ${pdfPages} page${pdfPages === 1 ? "" : "s"}${ok ? "" : "  OVER THE 4-PAGE LIMIT"}`);
}
if (stale.length) {
  console.log("\n  ! Still holding sample values — edit audit-data.js:");
  for (const [field, value] of stale) console.log(`      ${field} = ${JSON.stringify(value)}`);
}
console.log("\n  Upload: index.html styles.css app.js audit-data.js images/ " + r.pdfFile + "\n");
