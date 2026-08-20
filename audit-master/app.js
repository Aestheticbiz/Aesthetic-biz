(() => {
  const d = window.AUDIT_DATA;
  if (!d || !Array.isArray(d.leaks) || d.leaks.length !== 3) {
    document.getElementById("audit").textContent =
      "Audit data is missing or must contain exactly three leaks.";
    return;
  }

  const esc = (v = "") =>
    String(v).replace(/[&<>'"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
  const link = (v) => esc(v);

  document.title = `Private website review - ${d.practice.name}`;

  /* ── Showcase: the demo you can drive, and a live client site ─────────── */
  const card = (c, kind) => `
    <article class="show-card show-${kind}">
      <a class="show-shot" href="${link(c.url)}" target="_blank" rel="noopener">
        <img src="${link(c.image)}" alt="${esc(c.name)}">
      </a>
      <div class="show-copy">
        <p class="show-kicker">${esc(c.kicker)}</p>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.body)}</p>
        <a class="button button-line" href="${link(c.url)}" target="_blank" rel="noopener">${esc(c.label)} &#8599;</a>
      </div>
    </article>`;

  /* ── Calculators: left column inputs, right column result ─────────────── */
  const field = (f) => `
    <label class="calc-field" for="${esc(f.id)}">
      <span class="calc-label">${esc(f.label)}</span>
      <span class="calc-input">
        ${f.money ? `<em>${esc(f.currency || "US$")}</em>` : ""}
        <input id="${esc(f.id)}" type="number" value="${esc(f.value)}"
               min="${esc(f.min)}" max="${esc(f.max)}" step="${esc(f.step)}">
        ${f.pct ? `<em>%</em>` : ""}
      </span>
    </label>`;

  const calcSection = (c, kind, resultId) => `
    <section class="calc-section calc-${kind}"><div class="wrap">
      <div class="calc-head">
        <p class="section-number">${esc(c.kicker)}</p>
        <h2>${esc(c.title)}</h2>
        <p class="lead">${esc(c.lead)}</p>
      </div>
      <div class="calc-grid">
        <div class="calc-inputs">
          ${c.fields.map((f) => field({ ...f, currency: c.currency })).join("")}
          <p class="calc-note">Your figures only. Nothing is saved or sent anywhere.</p>
        </div>
        <div class="calc-result" id="${resultId}" aria-live="polite"></div>
      </div>
    </div></section>`;

  const cal = d.calculators;

  document.getElementById("audit").innerHTML = `
    <header class="hero"><div class="wrap">
      <p class="eyebrow">Private website leak review</p>
      <h1>${esc(d.practice.name)}</h1>
      <p class="hero-title">${esc(d.report.title)}</p>
      <div class="meta">
        <div><span>Website</span><a href="${link(d.practice.websiteUrl)}" target="_blank" rel="noopener">${esc(d.practice.websiteLabel)}</a></div>
        <div><span>Location</span><strong>${esc(d.practice.location)}</strong></div>
        <div><span>Reviewed</span><strong>${esc(d.practice.reviewDate)}</strong></div>
      </div>
      <div class="report-actions">
        <a class="button button-gold" href="${link(d.report.pdfFile)}" download>Download PDF</a>
      </div>
    </div></header>

    <main>
      <section class="intro"><div class="wrap narrow">
        <p class="section-number">The short version</p><h2>${esc(d.report.title)}</h2>
        <p class="lead">${esc(d.report.summary)}</p>
        <aside class="strength"><span>What is already working</span><h3>${esc(d.strength.title)}</h3><p>${esc(d.strength.body)}</p></aside>
      </div></section>

      <section class="evidence"><div class="wrap">
        <div class="section-head"><div><p class="section-number">Evidence reviewed</p><h2>The first patient impression</h2></div><p>${esc(d.practice.devices)}</p></div>
        <div class="screens${d.screenshots.mobile ? "" : " screens-solo"}">
          <figure><img src="${link(d.screenshots.desktop.src)}" alt="${esc(d.screenshots.desktop.alt)}"><figcaption>${esc(d.screenshots.desktop.caption)}</figcaption></figure>
          ${d.screenshots.mobile ? `<figure><img src="${link(d.screenshots.mobile.src)}" alt="${esc(d.screenshots.mobile.alt)}"><figcaption>${esc(d.screenshots.mobile.caption)}</figcaption></figure>` : ""}
        </div>
      </div></section>

      <section class="leaks"><div class="wrap">
        <p class="section-number">The three priority leaks</p><h2>Where confidence can escape before booking</h2>
        <div class="leak-list">${d.leaks.map((x, i) => `
          <article class="leak"><div class="leak-no">0${i + 1}</div><div class="leak-copy">
            <p class="tag">${esc(x.category)}</p><h3>${esc(x.title)}</h3>
            <dl><div><dt>What we observed</dt><dd>${esc(x.observed)}</dd></div><div><dt>Why it matters</dt><dd>${esc(x.why)}</dd></div><div><dt>The opportunity</dt><dd>${esc(x.opportunity)}</dd></div></dl>
          </div></article>`).join("")}</div>
        ${d.report.alsoNoticed ? `<p class="also"><strong>Also noticed:</strong> ${esc(d.report.alsoNoticed)}</p>` : ""}
      </div></section>

      <!-- The repaired journey: words only. The demo moved to the cards below. -->
      <section class="future"><div class="wrap narrow">
        <p class="section-number">The opportunity</p>
        <h2>${esc(d.future.title)}</h2>
        <p class="lead">${esc(d.future.body)}</p>
      </div></section>

      <section class="showcase"><div class="wrap">
        <div class="section-head"><div>
          <p class="section-number">Not a mockup</p>
          <h2>${esc(d.showcase.sectionTitle)}</h2>
        </div><p>${esc(d.showcase.lead)}</p></div>
        <div class="show-grid">
          ${card(d.showcase.demo, "demo")}
          ${card(d.showcase.portfolio, "portfolio")}
        </div>
      </div></section>

      <section class="cta"><div class="wrap cta-grid">
        <div class="cta-copy">
          <p class="section-number">Next step</p>
          <h2>${esc(d.cta.heading)}</h2>
          <p>${esc(d.cta.body)}</p>
          <div class="cta-actions">
            <a class="button button-gold" href="${link(d.cta.callUrl)}">${esc(d.cta.callLabel)}</a>
          </div>
          ${d.cta.capacity ? `<p class="cta-capacity">${esc(d.cta.capacity)}</p>` : ""}
        </div>
        <div class="cta-img"><img src="${link(d.cta.image)}" alt="${esc(d.cta.imageAlt)}"></div>
      </div></section>

      ${calcSection(cal.newPatients, "one", "calc-out-new")}

      <section class="mechanism"><div class="wrap narrow">
        <p class="section-number">${esc(d.mechanism.kicker)}</p>
        <h2>${esc(d.mechanism.title)}</h2>
        <p class="lead">${esc(d.mechanism.lead)}</p>
        ${d.mechanism.body.map((t) => `<p>${esc(t)}</p>`).join("")}
        <p class="distinction">${esc(d.mechanism.distinction)}</p>
        ${d.mechanism.articleUrl ? `<p class="mechanism-action">
          <a class="button button-line" href="${link(d.mechanism.articleUrl)}" target="_blank" rel="noopener">${esc(d.mechanism.articleLabel)} &#8594;</a>
          <span class="mechanism-url">${esc(d.mechanism.articleLabel)}: ${esc(d.mechanism.articleUrl)}</span>
        </p>` : ""}
      </div></section>

      ${calcSection(cal.returning, "two", "calc-out-ret")}
    </main>

    <footer><div class="wrap footer-grid">
      <div class="author"><div><strong>${esc(d.author.name)}</strong><span>${esc(d.author.role)}</span></div></div>
      <a class="powered" href="${link(d.author.website)}" target="_blank" rel="noopener">
        Powered by <strong>CRM Solutions</strong>
        <span>Connected Revenue Platforms</span>
      </a>
    </div></footer>`;

  /* ── Calculator behaviour ─────────────────────────────────────────────── */
  const money = (n, cur) =>
    Number.isFinite(n) ? `${cur}${Math.round(n).toLocaleString("en-US")}` : "-";
  const num = (id) => {
    const el = document.getElementById(id);
    const v = parseFloat(el && el.value);
    return Number.isFinite(v) && v >= 0 ? v : 0;
  };

  function renderNewPatients() {
    const cur = cal.newPatients.currency;
    const patients = num("np-current");
    const value = num("np-value");
    const extra = num("np-extra");

    const perMonth = extra * value;
    // Shown back to them as a sanity check: a number they entered as patients,
    // expressed as the percentage it implies.
    const impliedPct = patients > 0 ? (extra / patients) * 100 : 0;

    document.getElementById("calc-out-new").innerHTML = `
      <p class="calc-kicker">Every month, at those figures</p>
      <p class="calc-figure">${money(perMonth, cur)}</p>
      <p class="calc-sub">${money(perMonth * 12, cur)} over twelve months</p>
      <p class="calc-delay">Every month it stays unrepaired is another ${money(perMonth, cur)}.</p>
      <dl class="calc-metrics">
        <div><dt>Additional new patients a year</dt><dd>${Math.round(extra * 12)}</dd></div>
        <div><dt>That is an uplift of</dt><dd>${impliedPct.toFixed(0)}%</dd></div>
      </dl>
      <p class="calc-explain">${extra} more patient${extra === 1 ? "" : "s"} a month is ${impliedPct.toFixed(0)}%
        more of the visitors you already attract - no extra advertising, no new treatments and no extra
        hours. A planning estimate built from your figures, not a forecast.</p>`;
  }

  function renderReturning() {
    const cur = cal.returning.currency;
    const value = num("rt-value");
    const margin = num("rt-margin") / 100;
    const visits = num("rt-visits");
    const years = num("rt-years");

    const perVisit = value * margin;
    const perYear = perVisit * visits;
    const lifetime = perYear * years;

    document.getElementById("calc-out-ret").innerHTML = `
      <p class="calc-kicker">Profit from one returning patient</p>
      <p class="calc-figure">${money(lifetime, cur)}</p>
      <p class="calc-sub">across ${years} year${years === 1 ? "" : "s"} of the relationship</p>
      <dl class="calc-metrics">
        <div><dt>Profit per visit</dt><dd>${money(perVisit, cur)}</dd></div>
        <div><dt>Profit per year</dt><dd>${money(perYear, cur)}</dd></div>
        <div><dt>Visits in the relationship</dt><dd>${Math.round(visits * years)}</dd></div>
        <div><dt>One extra returner a month is worth</dt><dd>${money(lifetime * 12, cur)}</dd></div>
      </dl>
      <p class="calc-explain">None of this carries an advertising cost - the patient is already yours.
        That is why the visits after the first one decide what a practice can afford to spend
        winning the next new patient.</p>`;
  }

  const all = [...cal.newPatients.fields, ...cal.returning.fields];
  for (const f of all) {
    const el = document.getElementById(f.id);
    if (!el) continue;
    el.addEventListener("input", () => { renderNewPatients(); renderReturning(); });
  }
  renderNewPatients();
  renderReturning();
})();
