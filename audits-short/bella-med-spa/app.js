(() => {
  const d = window.AUDIT_DATA;
  if (!d || !Array.isArray(d.leaks) || d.leaks.length !== 3) {
    document.getElementById("audit").textContent = "Audit data is missing or must contain exactly three leaks.";
    return;
  }
  const esc = (v = "") => String(v).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const link = v => esc(v);
  document.title = `Private website review - ${d.practice.name}`;
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
        <button class="button button-line" type="button" onclick="window.print()">Print / Save PDF</button>
      </div>
    </div></header>

    <main>
      <section class="intro"><div class="wrap narrow">
        <p class="section-number">The short version</p><h2>${esc(d.report.title)}</h2><p class="lead">${esc(d.report.summary)}</p>
        <aside class="strength"><span>What is already working</span><h3>${esc(d.strength.title)}</h3><p>${esc(d.strength.body)}</p></aside>
      </div></section>

      <section class="evidence"><div class="wrap">
        <div class="section-head"><div><p class="section-number">Evidence reviewed</p><h2>The first patient impression</h2></div><p>${esc(d.practice.devices)}</p></div>
        <div class="screens">
          <figure><img src="${link(d.screenshots.desktop.src)}" alt="${esc(d.screenshots.desktop.alt)}"><figcaption>${esc(d.screenshots.desktop.caption)}</figcaption></figure>
          <figure><img src="${link(d.screenshots.mobile.src)}" alt="${esc(d.screenshots.mobile.alt)}"><figcaption>${esc(d.screenshots.mobile.caption)}</figcaption></figure>
        </div>
      </div></section>

      <section class="leaks"><div class="wrap">
        <p class="section-number">The three priority leaks</p><h2>Where confidence can escape before booking</h2>
        <div class="leak-list">${d.leaks.map((x,i) => `
          <article class="leak"><div class="leak-no">0${i+1}</div><div class="leak-copy">
            <p class="tag">${esc(x.category)}</p><h3>${esc(x.title)}</h3>
            <dl><div><dt>What we observed</dt><dd>${esc(x.observed)}</dd></div><div><dt>Why it matters</dt><dd>${esc(x.why)}</dd></div><div><dt>The opportunity</dt><dd>${esc(x.opportunity)}</dd></div></dl>
          </div></article>`).join("")}</div>
        ${d.report.alsoNoticed ? `<p class="also"><strong>Also noticed:</strong> ${esc(d.report.alsoNoticed)}</p>` : ""}
      </div></section>

      <section class="future"><div class="wrap future-grid"><div>
        <p class="section-number">The opportunity</p><h2>${esc(d.future.title)}</h2><p class="lead">${esc(d.future.body)}</p>
      </div><img src="${link(d.future.image)}" alt="AestheticBiz working demonstration website"></div></section>

      <section class="cta"><div class="wrap cta-grid"><div><p class="section-number">Next step</p><h2>${esc(d.cta.heading)}</h2><p>${esc(d.cta.body)}</p></div><div class="cta-actions">
        <a class="button button-gold" href="${link(d.cta.demoUrl)}" target="_blank" rel="noopener">${esc(d.cta.demoLabel)}</a>
        <a class="button button-light" href="${link(d.cta.callUrl)}">${esc(d.cta.callLabel)}</a>
      </div></div></section>
    </main>
    <footer><div class="wrap footer-grid"><div class="author"><img src="${link(d.author.image)}" alt="${esc(d.author.name)}"><div><strong>${esc(d.author.name)}</strong><span>${esc(d.author.role)}</span></div></div><a href="${link(d.author.website)}" target="_blank" rel="noopener">CRM Solutions</a></div></footer>`;
})();
