/**
 * Render the branded HTML outreach email from a clinic's plain-text draft.
 *
 *   node scripts/render-email.mjs <slug>      # one clinic
 *   node scripts/render-email.mjs --all       # every clinic with a draft
 *
 * Reads  audits/<slug>/outreach-email.txt   (the wording, hard-wrapped)
 *        audits/<slug>/audit.json           (clinic name, for the WhatsApp deep link)
 * Writes audits/<slug>/outreach-email.html
 *
 * The .txt stays the plain-text alternative — send both parts where the mail
 * client allows it. Keep editing the .txt and re-running this; the HTML is
 * generated and should never be hand-edited.
 *
 * Email HTML is not web HTML. Tables, inline styles, no webfonts, no flexbox,
 * absolute image URLs. Outlook renders through Word, which ignores border-radius
 * and cannot decode WebP — hence the JPEG portrait in audits/_assets/.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ASSETS = "https://audit.aestheticbiz.site/_assets";
const WHATSAPP = "27761809799";

// CAN-SPAM requires a valid physical postal address and a working opt-out in
// commercial email. A non-US address is fine; an invented or omitted one is its
// own violation. The opt-out must keep working for at least 30 days after the
// send, so this inbox has to stay live and be actioned into a suppression list.
const POSTAL_ADDRESS =
  "104 Lothian Road, Parkhill, Durban North, KwaZulu-Natal 4051, South Africa";
const UNSUBSCRIBE = "unsubscribe@aestheticbiz.site";

const e = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Parse the .txt draft into { subject, to, blocks, url }. */
function parseDraft(raw) {
  const sepIndex = raw.indexOf("------");
  if (sepIndex === -1) throw new Error("no ------ separator found");

  const head = raw.slice(0, sepIndex);
  const subject = (head.match(/^SUBJECT:\s*(.+)$/m) ?? [])[1]?.trim() ?? "";
  const to = (head.match(/^TO:\s*(\S+)/m) ?? [])[1]?.trim() ?? "";

  const body = raw.slice(raw.indexOf("\n", sepIndex) + 1).trim();

  let url = "";
  const blocks = [];

  for (const chunk of body.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;

    // The report link and its lead-in ("Full report:") share a block.
    const urlLine = lines.find((l) => l.startsWith("https://audit."));
    if (urlLine) {
      url = urlLine;
      continue; // the lead-in becomes the button label instead
    }

    // Trailing sign-off — rendered as part of the signature card.
    if (lines.length === 1 && /^Ignatius$/i.test(lines[0])) continue;

    blocks.push(lines.join(" "));
  }

  if (!url) throw new Error("no https://audit. report link found");
  return { subject, to, blocks, url };
}

function render({ subject, blocks, url, clinic }) {
  const greeting = blocks[0] ?? "Hello,";
  const paragraphs = blocks.slice(1);

  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hi Ignatius — I've read the review for ${clinic}.`,
  )}`;

  const p = (text) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:26px;color:#3d3733;">${e(text)}</p>`;

  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${e(subject)}</title>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  @media only screen and (max-width:620px){
    .wrap{width:100% !important}
    .pad{padding-left:22px !important;padding-right:22px !important}
    .stack{display:block !important;width:100% !important;text-align:center !important}
    .stack-img{margin:0 auto 12px !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#efe9e1;-webkit-font-smoothing:antialiased;">

<!-- Preheader: the grey line beside the subject in most inboxes. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
  A short independent review of ${e(clinic)} — yours to use whether or not we ever speak.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#efe9e1;">
<tr><td align="center" style="padding:28px 12px;">

  <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #e2dbd1;">

    <!-- Masthead -->
    <tr><td class="pad" style="padding:26px 40px 20px;border-top:3px solid #a8894f;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:.02em;color:#2b2622;font-weight:normal;">
          Aesthetic<span style="color:#a8894f;">Biz</span>
        </td>
        <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:#8d8378;">
          Independent website review
        </td>
      </tr></table>
    </td></tr>

    <tr><td class="pad" style="padding:0 40px;"><div style="height:1px;background:#e2dbd1;font-size:0;line-height:0;">&nbsp;</div></td></tr>

    <!-- Body -->
    <tr><td class="pad" style="padding:28px 40px 8px;font-family:Georgia,'Times New Roman',serif;">
      <p style="margin:0 0 18px;font-size:16px;line-height:26px;color:#2b2622;">${e(greeting)}</p>
      ${paragraphs.map(p).join("\n      ")}
    </td></tr>

    <!-- Report button -->
    <tr><td class="pad" align="center" style="padding:14px 40px 30px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td bgcolor="#a8894f" style="mso-padding-alt:16px 34px;">
          <a href="${e(url)}" target="_blank"
             style="display:inline-block;padding:16px 34px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;letter-spacing:.03em;color:#ffffff;text-decoration:none;">
            Open the full report &rarr;
          </a>
        </td>
      </tr></table>
      <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#8d8378;">
        Or paste this into your browser:<br>
        <a href="${e(url)}" style="color:#a8894f;text-decoration:underline;">${e(url)}</a>
      </p>
    </td></tr>

    <!-- Signature -->
    <tr><td class="pad" style="padding:0 40px;"><div style="height:1px;background:#e2dbd1;font-size:0;line-height:0;">&nbsp;</div></td></tr>
    <tr><td class="pad" style="padding:24px 40px 26px;background:#faf7f3;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td class="stack" width="76" valign="top" style="width:76px;">
          <img class="stack-img" src="${ASSETS}/ignatius.jpg" width="64" height="64" alt="Ignatius Ackermann"
               style="display:block;width:64px;height:64px;border:1px solid #e2dbd1;">
        </td>
        <td class="stack" valign="middle" style="font-family:Arial,Helvetica,sans-serif;">
          <div style="font-size:15px;font-weight:bold;color:#2b2622;">Ignatius Ackermann</div>
          <div style="font-size:13px;line-height:20px;color:#6b625a;">
            CRM Solutions &middot; building commercial platforms since 2001
          </div>
          <div style="font-size:13px;line-height:20px;margin-top:6px;">
            <a href="${wa}" target="_blank" style="color:#a8894f;text-decoration:none;font-weight:bold;">Reply on WhatsApp</a>
            <span style="color:#b8ada1;">&nbsp;|&nbsp;</span>
            <a href="https://www.aestheticbiz.site/" target="_blank" style="color:#a8894f;text-decoration:none;">www.aestheticbiz.site</a>
          </div>
        </td>
      </tr></table>
    </td></tr>

    <!-- Legal footer -->
    <tr><td class="pad" style="padding:18px 40px 24px;background:#efe9e1;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:18px;color:#8d8378;">
      <p style="margin:0 0 8px;">
        Powered by <a href="https://www.crmsolutions.app/" target="_blank" style="color:#8d8378;text-decoration:underline;">CRM Solutions</a>
        &middot; ${e(POSTAL_ADDRESS)}
      </p>
      <p style="margin:0;">
        You received this because your practice is publicly listed as an aesthetic provider. This is a one-off review, not a subscription.
        <a href="mailto:${UNSUBSCRIBE}?subject=Unsubscribe&amp;body=Please%20do%20not%20contact%20this%20address%20again."
           style="color:#8d8378;text-decoration:underline;">Unsubscribe</a>
        and you will not be contacted again.
      </p>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>
`;
}

async function one(slug) {
  const dir = path.join("audits", slug);
  const txt = path.join(dir, "outreach-email.txt");
  if (!existsSync(txt)) throw new Error(`${txt} not found`);

  const draft = parseDraft(await readFile(txt, "utf8"));

  let clinic = slug;
  const jsonPath = path.join(dir, "audit.json");
  if (existsSync(jsonPath)) {
    clinic = JSON.parse(await readFile(jsonPath, "utf8")).clinic ?? slug;
  }

  const outPath = path.join(dir, "outreach-email.html");
  const html = render({ ...draft, clinic });
  await writeFile(outPath, html, "utf8");
  console.log(`  ✓ ${outPath} (${Math.round(Buffer.byteLength(html) / 1024)} KB) — "${draft.subject}"`);
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node scripts/render-email.mjs <slug> | --all");
    process.exit(1);
  }

  let slugs = [arg];
  if (arg === "--all") {
    const entries = await readdir("audits", { withFileTypes: true });
    slugs = entries
      .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d) => d.name)
      .filter((s) => existsSync(path.join("audits", s, "outreach-email.txt")));
  }

  let failed = 0;
  for (const slug of slugs) {
    try {
      await one(slug);
    } catch (error) {
      failed += 1;
      console.error(`  ✗ ${slug}: ${error.message}`);
    }
  }
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
