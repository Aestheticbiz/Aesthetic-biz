/**
 * Renders an audit report from data.
 *
 *   node scripts/render-audit.mjs <clinic-slug>
 *
 * Reads audits/<slug>/audit.json, writes audits/<slug>/index.html using the
 * shared shell in scripts/audit/. Every clinic-specific word lives in the JSON;
 * nothing about the layout is retyped per report.
 *
 * This exists because hand-writing each report as HTML does not survive past
 * about five clinics, and the plan is fifty a day.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/render-audit.mjs <clinic-slug>");
  process.exit(1);
}

const dir = path.join(process.cwd(), "audits", slug);
const css = await readFile(path.join(process.cwd(), "scripts/audit/report.css"), "utf8");
const js = await readFile(path.join(process.cwd(), "scripts/audit/report.js"), "utf8");
const d = JSON.parse(await readFile(path.join(dir, "audit.json"), "utf8"));

/** Escape for HTML text. Copy comes from JSON, so quotes and ampersands are real. */
const e = (s) =>
  String(s ?? "")
    .replace(/&(?!(amp|lt|gt|quot|#\d+|[a-z]+);)/gi, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Allows deliberate inline markup (<strong>, <em>) in JSON copy. */
const rich = (s) => String(s ?? "");

const statusPill = (status) => {
  const map = { Solid: "p-ok", Gap: "p-warn", Structural: "p-bad", "Not assessed": "p-none" };
  return `<span class="pill ${map[status] ?? "p-none"}">${e(status)}</span>`;
};

const scoreRows = d.scorecard
  .map(
    (r) => `<tr><td>${e(r.category)}</td><td>${e(r.score)}</td><td>${statusPill(r.status)}</td><td>${rich(r.finding)}</td></tr>`,
  )
  .join("\n          ");

const strengths = d.strengths
  .map((s) => `<li><strong>${rich(s.title)}</strong> <em>(${e(s.confidence)})</em> ${rich(s.body)}</li>`)
  .join("\n      ");

const findings = d.findings
  .map(
    (f, i) => `
    <div class="card">
      <span class="label">${i + 1} · ${e(f.area)}</span>
      <h3>${rich(f.heading)}</h3>
      <p><strong>Evidence:</strong> ${rich(f.evidence)}</p>
      <p><strong>Why it matters to a full-fee patient:</strong> ${rich(f.why)}</p>
      <p><strong>Recommended:</strong> ${rich(f.recommended)}</p>
      <dl class="row"><dt>Confidence</dt><dd>${e(f.confidence)}</dd><dt>Effort</dt><dd>${e(f.effort)}</dd><dt>Timeframe</dt><dd>${e(f.timeframe)}</dd></dl>
    </div>`,
  )
  .join("\n");

const psychRows = d.psychology
  .map((p) => `<tr><td><strong>${rich(p.principle)}</strong></td><td>${rich(p.plain)}</td><td>${rich(p.site)}</td></tr>`)
  .join("\n          ");

const roadmapRows = d.roadmap
  .map((r) => `<tr><td><strong>${e(r.window)}</strong></td><td>${e(r.focus)}</td><td>${rich(r.actions)}</td></tr>`)
  .join("\n          ");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Website Conversion Audit — ${e(d.clinic)}</title>
<style>
${css}
</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <p class="eyebrow">Private website conversion audit</p>
    <h1>${e(d.clinic)}</h1>
    <p>${rich(d.subtitle)}</p>
    <div class="meta">
      <div><span>Website</span><strong>${e(d.domain)}</strong></div>
      <div><span>Location</span><strong>${e(d.location)}</strong></div>
      <div><span>Review date</span><strong>${e(d.date)}</strong></div>
      <div><span>Devices tested</span><strong>Desktop 1366 · Mobile 390</strong></div>
    </div>
    <p style="margin:22px 0 0"><a class="btn-pdf" href="${e(slug)}-audit.pdf" download>Download this report as a PDF ↓</a></p>
  </div>
</header>

<section>
  <div class="wrap">
    <h2>Executive summary</h2>
    ${d.summary.map((p) => `<p>${rich(p)}</p>`).join("\n    ")}
  </div>
</section>

<section>
  <div class="wrap">
    <h2>At a glance</h2>
    <div class="scorewrap">
      <div class="bigscore">${e(d.score)}<small>/100</small></div>
      <div style="flex:1;min-width:230px"><p style="margin:0">${rich(d.scoreNote)}</p></div>
    </div>
    <div class="tblwrap">
      <table>
        <thead><tr><th>Category</th><th>Score</th><th>Status</th><th>One-line finding</th></tr></thead>
        <tbody>
          ${scoreRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>What the practice is already doing well</h2>
    <p class="lead">${rich(d.strengthsLead)}</p>
    <ul class="clean">
      ${strengths}
    </ul>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>The evidence</h2>
    <div class="shots">
      <figure>
        <img src="images/audited-desktop.jpg" alt="${e(d.clinic)} homepage on a 1366-pixel desktop screen" />
        <figcaption>${rich(d.captionDesktop)}</figcaption>
      </figure>
      <figure>
        <img src="images/audited-mobile.jpg" alt="${e(d.clinic)} homepage on a 390-pixel mobile screen" />
        <figcaption>${rich(d.captionMobile)}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 id="findings">Priority opportunities</h2>
${findings}
  </div>
</section>

<section>
  <div class="wrap">
    <h2>Patient decision psychology</h2>
    <div class="tblwrap">
      <table>
        <thead><tr><th>Principle</th><th>In plain English</th><th>What the site shows</th></tr></thead>
        <tbody>
          ${psychRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section style="border:0;padding-bottom:0">
  <div class="wrap">
    <div class="calc">
      <h2>Illustrative growth scenario</h2>
      <p class="lead">This is a model, not a measurement. Every figure below starts as an illustrative placeholder — replace them with your own numbers and the scenarios update immediately. Nothing here is drawn from your analytics, and no result is predicted or guaranteed.</p>
      <div class="fields">
        <div class="field"><label for="visitors">Monthly website visitors</label><input id="visitors" type="number" min="0" value="2000" /><small>Illustrative — from your analytics</small></div>
        <div class="field"><label for="curRate">Current visitor → enquiry %</label><input id="curRate" type="number" min="0" max="100" step="0.1" value="1.5" /><small>Illustrative</small></div>
        <div class="field"><label for="bookRate">Enquiry → booking %</label><input id="bookRate" type="number" min="0" max="100" step="1" value="40" /><small>Illustrative</small></div>
        <div class="field"><label for="attend">Attendance %</label><input id="attend" type="number" min="0" max="100" step="1" value="80" /><small>Illustrative</small></div>
        <div class="field"><label for="value">Average first-visit value (US$)</label><input id="value" type="number" min="0" step="10" value="${e(d.avgValue ?? 600)}" /><small>Illustrative</small></div>
      </div>
      <div class="scen">
        <div><h4>Conservative</h4><p class="rate">Proposed enquiry rate <strong id="r1">2.0%</strong></p><p class="out" id="o1">—</p><p class="cap">additional first-visit revenue / month</p><p class="cap" id="p1"></p></div>
        <div><h4>Target</h4><p class="rate">Proposed enquiry rate <strong id="r2">2.5%</strong></p><p class="out" id="o2">—</p><p class="cap">additional first-visit revenue / month</p><p class="cap" id="p2"></p></div>
        <div><h4>Strong</h4><p class="rate">Proposed enquiry rate <strong id="r3">3.0%</strong></p><p class="out" id="o3">—</p><p class="cap">additional first-visit revenue / month</p><p class="cap" id="p3"></p></div>
      </div>
      <div class="workings">
        <p style="margin-bottom:8px"><strong style="color:#f7f4ec">Every step, shown in full:</strong></p>
        <p style="margin:0 0 6px"><code>current enquiries = visitors × current rate</code> → <span id="w1">—</span></p>
        <p style="margin:0 0 6px"><code>improved enquiries = visitors × proposed rate</code></p>
        <p style="margin:0 0 6px"><code>additional attended = (improved − current) × booking % × attendance %</code></p>
        <p style="margin:0"><code>additional revenue = additional attended × average first-visit value</code></p>
      </div>
      <p class="disclaim">Only the proposed enquiry rate changes between the three scenarios; every other input stays as you entered it. This is an illustrative scenario built on stated assumptions — not a forecast, a projection or a guarantee. Actual results depend on factors no website review can measure.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>90-day improvement roadmap</h2>
    <div class="tblwrap">
      <table>
        <thead><tr><th>Window</th><th>Focus</th><th>Actions</th></tr></thead>
        <tbody>
          ${roadmapRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>Limitations &amp; methodology</h2>
    <p class="fine">This review is based on the public homepage of ${e(d.domain)} viewed on ${e(d.date)} at 1366×768 and 390×844, page source retrieved the same day, and publicly visible business information. ${rich(d.limitations)}</p>
    <p class="fine">No private analytics, Google Business Profile insights, booking data or revenue figures were accessed, and none have been estimated. Findings labelled <em>Observed</em> are directly visible; findings labelled <em>Interpretive</em> are professional assessment and are identified as such. No legal, HIPAA, medical board or clinical compliance judgement is offered or implied — those require professional review. Figures in the growth scenario are illustrative placeholders supplied by this report, not measurements of your practice.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="cta" id="talk">
      <div class="cta-grid">
        <div class="cta-copy">
          <h2>A short conversation, if it is useful</h2>
          <p>Most of what is above can be done by your existing web team, and this report is yours to use whether or not we ever speak.</p>
          <p>Where the gaps are structural rather than cosmetic — booking that lives on someone else's platform, trust signals with nowhere to sit, no loop that brings a patient back after treatment — those are the problems we build for.</p>
          <ul class="why">
            <li>The changes above compound: each month they are not made is a month of the same visitors deciding elsewhere.</li>
            <li>Aesthetic demand is seasonal. Work started now is live before the year-end run.</li>
            <li>Twenty minutes, no slides. If it is not a fit, you will be told in the first five.</li>
          </ul>
          <p style="margin-bottom:0"><a class="btn" href="https://www.aestheticbiz.site/book-discovery?source=audit-${e(slug)}">Book a 20-minute conversation →</a></p>
          <div class="signoff">
            <img src="images/ignatius-ackermann.webp" alt="Ignatius Ackermann, CRM Solutions" />
            <div class="who">
              <strong>Ignatius Ackermann</strong>
              <span>CRM Solutions · building commercial platforms since 2001<br />Reply on WhatsApp — usually within a few hours</span>
            </div>
            <a class="btn-call" href="https://wa.me/27761809799?text=${encodeURIComponent(`Hi Ignatius — I've read the audit for ${d.clinic}.`)}" target="_blank" rel="noopener"><span aria-hidden="true">💬</span> WhatsApp me</a>
          </div>
        </div>
        <div class="cta-img" style="background-image:url('images/booking-online.webp')" role="img" aria-label="A patient booking an appointment online from home"></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>What this looks like built</h2>
    <p class="lead">Two working examples — not mockups. Both are live and clickable.</p>
    <div class="work">
      <figure>
        <a href="https://www.aestheticbiz.site/" target="_blank" rel="noopener"><img src="images/aestheticbiz-demo.jpg" alt="AestheticBiz demonstration practice homepage" /></a>
        <figcaption><strong>aestheticbiz.site</strong> — a complete demonstration practice: booking, retail, gift vouchers, rewards and reviews. Book a test appointment on it yourself.
          <a class="visit" href="https://www.aestheticbiz.site/" target="_blank" rel="noopener">Open the demo practice →</a></figcaption>
      </figure>
      <figure>
        <a href="https://www.staraesthetic.co.za/" target="_blank" rel="noopener"><img src="images/star-aesthetic-portfolio.jpg" alt="Star Aesthetic Centre homepage" /></a>
        <figcaption><strong>staraesthetic.co.za</strong> — a doctor-led practice with twenty years of reputation, rebuilt and running: booking, skincare commerce, rewards and vouchers.
          <a class="visit" href="https://www.staraesthetic.co.za/" target="_blank" rel="noopener">Open staraesthetic.co.za →</a></figcaption>
      </figure>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <p style="margin:0 0 6px">Prepared for ${e(d.clinic)} · ${e(d.date)} · This report is confidential to the recipient.</p>
    <p style="margin:0">Powered by CRM Solutions — <a href="https://www.crmsolutions.app">www.crmsolutions.app</a></p>
  </div>
</footer>

<script>
${js}
</script>

</body>
</html>
`;

await writeFile(path.join(dir, "index.html"), html, "utf8");
console.log(`  ✓ HTML  audits/${slug}/index.html (${Math.round(html.length / 1024)} KB)`);
