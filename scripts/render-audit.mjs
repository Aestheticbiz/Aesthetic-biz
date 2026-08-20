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
 *
 * SCOPE (deliberately narrow): this report answers one question — where and how
 * the website loses patients, and what that costs. The executive summary, the
 * /100 score and scorecard, the strengths list, the psychology table and the
 * 90-day roadmap were removed on purpose. A report that grades a site puts its
 * owner on the defensive; a report that shows them a number does not. Those
 * keys may still be present in audit.json and are simply ignored.
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

const currency = d.currency ?? "US$";

/**
 * Each leak states where the patient leaves, how, and — only when the JSON
 * supplies it — what it costs. A per-leak figure is never invented here: made-up
 * precision is worse than no figure at all.
 */
const leaks = d.findings
  .map(
    (f, i) => `
    <div class="card">
      <span class="label">Leak ${i + 1} · ${e(f.area)}</span>
      <h3>${rich(f.heading)}</h3>
      <p><strong>Where it happens:</strong> ${rich(f.evidence)}</p>
      <p><strong>How the patient is lost:</strong> ${rich(f.why)}</p>
      ${f.cost ? `<p class="leak-cost"><strong>What it costs:</strong> ${rich(f.cost)}</p>` : ""}
      <dl class="row"><dt>Basis</dt><dd>${e(f.confidence)}</dd></dl>
    </div>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Where ${e(d.clinic)} loses patients</title>
<style>
${css}
</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <p class="eyebrow">Private website review</p>
    <h1>Where ${e(d.clinic)} loses patients</h1>
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

<section style="border:0">
  <div class="wrap">
    <div class="calc">
      <h2>What the leak is worth</h2>
      <p class="lead">Five figures, entered by you. Nothing below is drawn from your analytics, estimated on your behalf, or sent anywhere — it recalculates in your browser as you type. The arithmetic is printed in full underneath.</p>
      <div class="fields">
        <div class="field"><label for="patients">New patients a month</label><input id="patients" type="number" min="0" step="1" value="25" /><small>People seen for the first time</small></div>
        <div class="field"><label for="value">Average first-visit value (${e(currency)})</label><input id="value" type="number" min="0" step="10" value="${e(d.avgValue ?? 600)}" /><small>Including anything taken home</small></div>
        <div class="field"><label for="returnRate">Share who return within 90 days (%)</label><input id="returnRate" type="number" min="0" max="90" step="1" value="30" /><small>Your best estimate is enough</small></div>
        <div class="field"><label for="spend">Marketing spend a month (${e(currency)})</label><input id="spend" type="number" min="0" step="100" value="3000" /><small>Ads, agency, intro discounts</small></div>
        <div class="field"><label for="margin">Gross margin on a visit (%)</label><input id="margin" type="number" min="1" max="95" step="1" value="65" /><small>After product and clinician time</small></div>
      </div>

      <div class="leak">
        <p class="leak-label" id="leakLabel">—</p>
        <p class="leak-figure" id="leakFigure">—</p>
        <p class="leak-sub" id="leakSub">—</p>
      </div>

      <div class="afford">
        <div><span>You can afford to pay, per patient</span><strong id="affordNow">—</strong><small>at your return rate today</small></div>
        <div><span>You could afford</span><strong id="affordTarget">—</strong><small id="affordTargetNote">—</small></div>
      </div>
      <p class="leak-read" id="affordRead"></p>

      <div class="metrics">
        <div><span>What a patient costs you now</span><strong id="mCac">—</strong></div>
        <div><span>What a patient is worth to you</span><strong id="mLtv">—</strong></div>
        <div><span>Value against cost</span><strong id="mRatio">—</strong></div>
        <div><span>Visits to pay back acquisition</span><strong id="mPayback">—</strong></div>
        <div><span>Visits an average patient makes</span><strong id="mVisitsNow">—</strong></div>
        <div><span>At the benchmark they would make</span><strong id="mVisitsTarget">—</strong></div>
      </div>

      <div class="workings">
        <p style="margin-bottom:8px"><strong style="color:#f7f4ec">Every step, shown in full:</strong></p>
        <p style="margin:0 0 6px"><code>expected visits = 1 ÷ (1 − return rate)</code></p>
        <p style="margin:0 0 6px"><code>margin per visit = first-visit value × gross margin</code></p>
        <p style="margin:0 0 6px"><code>lifetime value = expected visits × margin per visit</code></p>
        <p style="margin:0"><code>affordable spend per patient = lifetime value ÷ 3</code></p>
      </div>
      <p class="disclaim">A model built entirely on figures you supply — not a forecast, a projection or a guarantee, and not a measurement of your practice. Actual results depend on factors no website review can see.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>What was looked at</h2>
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
    <h2 id="findings">Where the patients leave</h2>
    <p class="lead">Each of these is a point at which somebody who wanted to book stops. They are listed in the order they cost you most.</p>
${leaks}
  </div>
</section>

<section>
  <div class="wrap">
    <h2>Limitations &amp; methodology</h2>
    <p class="fine">This review is based on the public homepage of ${e(d.domain)} viewed on ${e(d.date)} at 1366×768 and 390×844, page source retrieved the same day, and publicly visible business information. ${rich(d.limitations)}</p>
    <p class="fine">No private analytics, Google Business Profile insights, booking data or revenue figures were accessed, and none have been estimated. Leaks labelled <em>Observed</em> are directly visible; leaks labelled <em>Interpretive</em> are professional assessment and are identified as such. No legal, HIPAA, medical board or clinical compliance judgement is offered or implied — those require professional review. Every figure in the calculator is one you entered yourself.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="cta" id="talk">
      <div class="cta-grid">
        <div class="cta-copy">
          <h2>A short conversation, if it is useful</h2>
          <p>This report is yours to use whether or not we ever speak, and your existing web team can act on most of it.</p>
          <p>Where the leaks are structural rather than cosmetic — booking that lives on someone else's platform, no record that remembers a patient, nothing that brings them back after treatment — those are the problems we build for.</p>
          <ul class="why">
            <li>Every month the leaks stay open is another month of the same visitors deciding elsewhere.</li>
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
            <a class="btn-call" href="https://wa.me/27761809799?text=${encodeURIComponent(`Hi Ignatius — I've read the review for ${d.clinic}.`)}" target="_blank" rel="noopener"><span aria-hidden="true">💬</span> WhatsApp me</a>
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
window.AUDIT_CURRENCY = ${JSON.stringify(currency)};
${js}
</script>

</body>
</html>
`;

await writeFile(path.join(dir, "index.html"), html, "utf8");
console.log(`  ✓ HTML  audits/${slug}/index.html (${Math.round(html.length / 1024)} KB)`);
