/**
 * build.mjs — renders index.html, css/tokens.css and js/data.js from
 * demo-data.js. Run it after every edit to that file:
 *
 *     node build.mjs
 *
 * Why a build step when the handoff said "no build step": that ruling was
 * about Next.js production builds, which take the dev server down. This is
 * a dependency-free node script that writes three files in under a second,
 * exactly like audit-master/build.mjs, which already runs daily at volume.
 * The alternative was 187 hand-edits per clone.
 *
 * Paths contain a space ("Local Sites"), so use fileURLToPath — hand-built
 * file:/// URLs fail silently here.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const D = (await import(path.join(here, 'demo-data.js').replace(/\\/g, '/').replace(/^([A-Za-z]):/, 'file:///$1:'))).default;

const S = D.sections;
const C = D.compliance;
const esc = (s = '') => String(s).replace(/&(?!#?\w+;)/g, '&amp;');
const fill = (t, map) => Object.entries(map).reduce((a, [k, v]) => a.replaceAll(`{${k}}`, v), t);

/* ── Icons ─────────────────────────────────────────────────────────── */
const ICON = {
  award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.4-1.6 7.4L12 18l5.4 2.8-1.6-7.4"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Z"/><path d="M9 12h6M12 9v6"/>',
  drop: '<path d="M12 3c3 3 4.5 5.5 4.5 8a4.5 4.5 0 0 1-9 0c0-2.5 1.5-5 4.5-8Z"/><path d="M5 20h14"/>',
  book: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  star: '<path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.4l6-.9Z"/>',
};
const icon = (k, cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ICON.star}</svg>`;

const MIC = '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 18v4"/>';
const CHAT = '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z"/>';
const IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none"/></svg>';
const stroke = (body, w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const head = (eyebrow, heading, lede, width = '46rem') => `
      <div style="max-width:${width};margin-bottom:var(--space-12)">
        ${eyebrow ? `<span class="eyebrow eyebrow--dark">${esc(eyebrow)}</span>` : ''}
        ${heading ? `<h2>${esc(heading)}</h2>` : ''}
        ${lede ? `<p class="lede">${lede}</p>` : ''}
      </div>`;

/* ── Sections ──────────────────────────────────────────────────────── */
const sec = {};

sec.trust = () => `
  <section class="trust s-base">
    <div class="shell trust__in">
      ${D.trust.map((t) => `<div class="trust__item${t.badge ? ' trust__item--badge' : ''}">
        ${t.badge ? `<img class="trust__badge" src="${t.badge}" alt="${esc(t.title)}" loading="lazy" width="72" height="72">` : icon(t.icon)}
        <div><strong>${esc(t.title)}</strong><span>${esc(t.note)}</span></div>
      </div>`).join('\n      ')}
    </div>
  </section>`;

sec.treatments = () => `
  <section class="section s-tint" id="treatments">
    <div class="wide">${head(D.treatments.eyebrow, D.treatments.heading, '', '46rem')}</div>
    <div class="wide">
      <div class="panels">
        ${D.treatments.panels.map((p) => `<a class="panel reveal" href="${p.href}" target="_blank" rel="noopener">
          <img src="${p.image}" alt="${esc(p.name)} at ${esc(D.practice.name)}" loading="lazy">
          <div>
            <p class="panel__name">${esc(p.name)}</p>
            <div class="panel__reveal"><ul class="panel__list">${p.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>
            <p class="panel__more">Explore &rarr;</p>
          </div>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.results = () => {
  const cats = D.results.categories;
  const hasAny = Object.values(D.results.pairs || {}).some((v) => v && v.length);
  return `
  <section class="section s-base" id="results">
    <div class="shell">
      ${head(D.results.eyebrow, D.results.heading, D.results.lede)}
      <div class="tabs" role="tablist" aria-label="Result categories" id="ba-tabs">
        ${cats.map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${c.toLowerCase()}">${esc(c)}</button>`).join('\n        ')}
      </div>
      <div class="ba" id="ba-stage">
        <figure><img src="assets/placeholder-before.svg" alt="Before" width="800" height="1000"><figcaption>Before</figcaption></figure>
        <figure><img src="assets/placeholder-after.svg" alt="After" width="800" height="1000"><figcaption>After</figcaption></figure>
      </div>
      <p class="ba__vary">${esc(C.resultsVary)}</p>
      ${hasAny ? '' : `<p class="ba__note">${D.results.emptyNote}</p>`}
    </div>
  </section>`;
};

sec.practitioners = () => `
  <section class="section s-tint" id="team">
    <div class="shell">
      ${head(D.practitioners.eyebrow, D.practitioners.heading, '')}
      <div class="credits">
        ${D.practitioners.people.map((p) => `<div class="credit">
          ${p.photo ? `<img src="${p.photo}" alt="${esc(p.name)}" loading="lazy" style="aspect-ratio:1;object-fit:cover;border-radius:50%;width:5rem;margin-bottom:var(--space-4)">` : ''}
          <h3>${esc(p.name)}</h3>
          <p><strong>${esc(p.credential || '')}</strong>${p.role ? ` &middot; ${esc(p.role)}` : ''}</p>
          ${p.does ? `<p>${esc(p.does)}</p>` : ''}
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.credentials = () => `
  <section class="section s-tint">
    <div class="shell">
      ${head(D.credentials.eyebrow, D.credentials.heading, D.credentials.lede)}
      ${D.credentials.photo ? `<figure class="who__photo reveal">
        <img src="${D.credentials.photo}" alt="The team at ${esc(D.practice.name)}" loading="lazy">
        ${D.credentials.photoCaption ? `<figcaption>${esc(D.credentials.photoCaption)}</figcaption>` : ''}
      </figure>` : ''}
      <div class="credits">
        ${D.credentials.cards.map((c) => `<div class="credit"><h3>${esc(c.title)}</h3><p>${c.body}</p></div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.benefits = () => `
  <section class="section s-base">
    <div class="shell">
      ${head(D.benefits.eyebrow, D.benefits.heading, '', '46rem')}
      <div class="benefits">
        ${D.benefits.items.map((b, i) => `<div class="benefit reveal">
          <span class="benefit__n">${String(i + 1).padStart(2, '0')}</span>
          <h3>${esc(b.title)}</h3><p>${b.body}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.products = () => `
  <section class="section s-tint" id="products">
    <div class="shell">
      ${head(D.products.eyebrow, D.products.heading, D.products.lede)}
      <div class="rail">
        <button class="rail__btn rail__btn--prev" type="button" data-rail="prev" aria-label="Previous products">${stroke('<path d="m15 18-6-6 6-6"/>')}</button>
        <div class="prods" id="prod-rail" tabindex="0" aria-label="${esc(D.products.heading)}">
          ${D.products.items.map((p) => `<a class="prod reveal" href="${D.products.href}" target="_blank" rel="noopener">
            <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
            <strong>${esc(p.name)}</strong><span>${esc(p.note || '')}</span>
          </a>`).join('\n          ')}
        </div>
        <button class="rail__btn rail__btn--next" type="button" data-rail="next" aria-label="More products">${stroke('<path d="m9 18 6-6-6-6"/>')}</button>
      </div>
    </div>
  </section>`;

sec.membership = () => `
  <section class="section s-dark" id="membership">
    <div class="shell">
      <div class="member__grid">
        <div class="reveal">
          <div class="member__icon" aria-hidden="true">${stroke('<path d="M12 3.2c2.6 2.6 3.9 4.8 3.9 6.9a3.9 3.9 0 0 1-7.8 0c0-2.1 1.3-4.3 3.9-6.9Z"/><path d="M4.5 14.5c2 1.2 3.4 2.9 4.2 5M19.5 14.5c-2 1.2-3.4 2.9-4.2 5"/><path d="M12 14v7"/>', 1.5)}</div>
          <span class="eyebrow">${esc(D.membership.eyebrow)}</span>
          <p class="member__anchor">${esc(D.membership.anchor)}</p>
          <p class="member__anchorsub">${esc(D.membership.anchorSub)}</p>
          <a class="btn" href="${D.membership.href}" target="_blank" rel="noopener">${esc(D.membership.cta)}</a>
          <div class="member__faq">
            ${D.membership.faq.map((f) => `<div><h4>${esc(f.q)}</h4><p>${esc(f.a)}</p></div>`).join('\n            ')}
          </div>
        </div>
        <div class="fader reveal" id="member-fader" aria-hidden="true">
          ${D.membership.images.map((src, i) => `<img class="${i === 0 ? 'is-on' : ''}" src="${src}" alt="" loading="lazy">`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>`;

sec.financing = () => `
  <section class="section s-base" id="financing">
    <div class="shell">
      ${head(D.financing.eyebrow, D.financing.heading, D.financing.lede)}
      <div class="benefits">
        ${D.financing.providers.map((p) => `<div class="benefit reveal"><h3>${esc(p.name)}</h3><p>${esc(p.note)}</p></div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.loyalty = () => `
  <section class="section s-wash" id="loyalty">
    <div class="shell">
      ${head(D.loyalty.eyebrow, D.loyalty.heading, D.loyalty.lede)}
      <div class="benefits">
        ${D.loyalty.programs.map((p) => `<div class="benefit reveal"><h3>${esc(p.name)}</h3><p>${esc(p.note)}</p></div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.offer = () => `
  <section class="section s-dark" id="offer">
    <div class="shell" style="text-align:center;max-width:44rem">
      <span class="eyebrow">${esc(D.offer.eyebrow)}</span>
      <h2>${esc(D.offer.headline)}</h2>
      <p class="lede" style="margin-inline:auto">${esc(D.offer.body)}</p>
      <a class="btn" href="#booking" data-book>${esc(D.offer.cta)}</a>
      ${D.offer.terms ? `<p style="margin-top:var(--space-4);font-size:var(--text-xs);color:var(--color-on-dark-faint)">${esc(D.offer.terms)}</p>` : ''}
    </div>
  </section>`;

sec.proof = () => `
  <section class="section s-wash">
    <div class="shell">
      <div class="stats">
        ${D.proof.stats.map((s) => `<div class="reveal"><div class="stat__n">${esc(s.n)}</div><p class="stat__l">${esc(s.label)}</p></div>`).join('\n        ')}
      </div>
      ${D.proof.reviewers.length ? `<p class="reviewers reveal">Reviewed publicly by ${D.proof.reviewers.map((r) => `<b>${esc(r)}</b>`).join('')}</p>` : ''}
    </div>
  </section>`;

sec.faq = () => `
  <section class="section s-base" id="faq">
    <div class="shell">
      ${head(D.faq.eyebrow, D.faq.heading, '')}
      <div class="faq">
        ${D.faq.items.map((f) => `<details class="faq__item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.instagram = () => `
  <section class="section s-base gram-sec">
    <svg class="gram-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none"/></svg>
    <div class="wide gram-lay">
      <div class="gram-head reveal">
        <span class="eyebrow eyebrow--dark">${esc(D.instagram.eyebrow)}</span>
        <h2>${esc(D.instagram.heading)}</h2>
        <p class="lede">${D.instagram.lede}</p>
        <a class="gram-handle" href="${D.practice.instagram}" target="_blank" rel="noopener">${IG}<span>${esc(D.practice.instagramHandle)}</span></a>
      </div>
      <div class="gram-wall">
        ${D.instagram.tiles.map((t) => `<a href="${D.practice.instagram}" target="_blank" rel="noopener">
          <img src="${t.image}" alt="${esc(t.caption)} — ${esc(D.practice.name)} on Instagram" loading="lazy">
          <span class="gram-cap">${IG}${esc(t.caption)}</span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>`;

sec.locations = () => `
  <section class="section s-tint" id="locations">
    <div class="shell">
      ${head(D.locations.eyebrow, D.locations.heading, D.locations.lede)}
      <div class="loc__grid">
        <div class="loc__pick" role="tablist" aria-label="Locations" id="loc-tabs">
          ${D.locations.items.map((l, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-loc="${l.id}">
            <strong>${esc(l.name)}</strong><span>${esc(l.address)}<br>${esc(l.hint)}</span>
          </button>`).join('\n          ')}
        </div>
        <div>
          ${D.locations.items.map((l, i) => {
            const bb = [l.lon - 0.006, l.lat - 0.006, l.lon + 0.006, l.lat + 0.006].map((n) => n.toFixed(4)).join('%2C');
            return `<div class="loc__panel" data-panel="${l.id}"${i === 0 ? '' : ' hidden'}>
            <iframe class="loc__map" loading="lazy" title="Map — ${esc(D.practice.name)}, ${esc(l.name)}" referrerpolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=${bb}&amp;layer=mapnik&amp;marker=${l.lat}%2C${l.lon}"></iframe>
            <div class="loc__meta">
              <div><strong>Parking</strong><span>${esc(l.parking)}</span></div>
              <div><strong>Call</strong><span><a href="tel:${D.practice.phoneHref}">${esc(D.practice.phone)}</a></span></div>
              <div><strong>Directions</strong><span><a href="https://www.google.com/maps/dir/?api=1&amp;destination=${encodeURIComponent(l.address)}" target="_blank" rel="noopener">Open route planner &rarr;</a></span></div>
            </div>
          </div>`;
          }).join('\n          ')}
        </div>
      </div>
    </div>
  </section>`;

sec.sandy = () => `
  <section class="section s-dark" id="sandy">
    <div class="shell">
      <div class="sandy__grid">
        <div class="reveal">
          <span class="eyebrow">${esc(D.sandy.eyebrow)}</span>
          <h2>${esc(D.sandy.heading)}</h2>
          <p class="lede">${esc(D.sandy.lede)}</p>
          <ul class="asks">${D.sandy.asks.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
        </div>
        <div class="card-dark reveal">
          <div class="sandy__head">
            <div class="orb" aria-hidden="true">${stroke(MIC)}</div>
            <div><div class="sandy__name">${esc(D.sandy.name)}</div><div class="sandy__role">${esc(D.practice.shortName)} &middot; ${esc(D.sandy.role)}</div></div>
          </div>
          <div class="transcript" id="sandy-transcript" aria-live="polite">
            <div class="bubble bubble--sandy">${esc(D.sandy.greetingCard)}</div>
          </div>
          <button class="btn mic" id="sandy-open-inline" type="button">${stroke(MIC)}<span>Talk to ${esc(D.sandy.name)}</span></button>
          <p class="sandy__status" id="sandy-status">Demonstration only. Any appointment ${esc(D.sandy.name)} takes here is not placed with ${esc(D.practice.shortName)}.</p>
        </div>
      </div>
    </div>
  </section>`;

sec.upgrade = () => `
  <section class="section s-base">
    <div class="shell">
      <div class="sandy__grid">
        <div class="reveal">
          <span class="eyebrow eyebrow--dark">The upgrade</span>
          <h2>The same ${esc(D.sandy.name)} can answer the phone.</h2>
          <p class="lede">What you just spoke to is the website half. The identical agent &mdash; same treatment knowledge, same booking rules, same voice &mdash; can be connected to a phone line to catch the calls nobody gets to.</p>
          <p><strong>Unanswered calls.</strong> ${esc(D.sandy.name)} picks up when the line rings out because the room is busy.<br>
          <strong>After hours and weekends.</strong> She answers questions and takes bookings while the doors are shut.<br>
          <strong>Overflow.</strong> When two calls arrive at once, the second one stops going to voicemail.</p>
          <p style="color:var(--color-copy-muted);font-size:var(--text-sm)">Nothing about your existing number changes. You keep it, you keep answering it, and ${esc(D.sandy.name)} only takes what you would otherwise have lost. You can listen to every call and read every booking she makes.</p>
        </div>
        <div class="reveal">
          <ol class="steps">
            <li><strong>${esc(D.sandy.name)} gets her own number</strong><span>A dedicated line, never published to your guests.</span></li>
            <li><strong>You set the forwarding rules</strong><span>Busy, no answer, or after hours &mdash; your choice, with your carrier, reversible in a minute.</span></li>
            <li><strong>She answers what you miss</strong><span>Same knowledge she has here. She can also hand a caller straight to a human.</span></li>
            <li><strong>Bookings land in your system</strong><span>Connected to your real diary once you say so &mdash; never before.</span></li>
          </ol>
        </div>
      </div>
    </div>
  </section>`;

/* ── Page ──────────────────────────────────────────────────────────── */
const ORDER = ['trust', 'treatments', 'results', 'practitioners', 'credentials', 'benefits',
  'products', 'membership', 'financing', 'loyalty', 'offer', 'proof', 'faq',
  'instagram', 'locations', 'sandy', 'upgrade'];

const v = Date.now();
const P = D.practice;
const ribbonVars = { practice: P.name, short: P.shortName, domain: P.domain, handle: P.instagramHandle, sandy: D.sandy.name };

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(P.name)}</title>
<meta name="description" content="${esc(D.hero.sub)}">
<meta name="robots" content="noindex, nofollow, noarchive">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${D.brand.googleFonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/engine.css?v=${v}">
<link rel="stylesheet" href="css/tokens.css?v=${v}">
<link rel="stylesheet" href="css/theme.css?v=${v}">
<link rel="icon" href="${P.logoDark}">
</head>
<body>

<div class="ribbon">
  <strong>Demonstration page</strong> &mdash; ${esc(fill(D.demo.ribbonShort, ribbonVars))}<span class="ribbon__long">
  ${esc(fill(D.demo.ribbonLong, ribbonVars))}</span>
</div>

<header class="head">
  <div class="shell head__in">
    <a class="head__logo" href="#top" aria-label="${esc(P.name)}"><img src="${P.logoDark}" alt="${esc(P.name)}"></a>
    <nav class="head__nav" aria-label="Primary">
      ${S.treatments ? '<a href="#treatments">Treatments</a>' : ''}
      ${S.results ? '<a href="#results">Results</a>' : ''}
      ${S.products ? '<a href="#products">Products</a>' : ''}
      ${S.membership ? '<a href="#membership">Membership</a>' : ''}
      ${S.locations ? '<a href="#locations">Locations</a>' : ''}
    </nav>
    <div class="head__act">
      <a class="icon-btn" href="tel:${P.phoneHref}" aria-label="Call ${esc(P.name)}">${stroke('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"/>')}</a>
      <a class="btn" href="#booking" data-book>Book now</a>
    </div>
  </div>
</header>

<main id="top">
  <section class="hero">
    <div class="hero__bg"><img src="${D.hero.image}" alt="${esc(D.hero.imageAlt)}" fetchpriority="high"></div>
    <div class="shell hero__in">
      <span class="eyebrow">${esc(D.hero.eyebrow)}</span>
      <h1>${esc(D.hero.headline)}</h1>
      <p class="hero__sub">${esc(D.hero.sub)}</p>
      <div class="proofrow">
        ${D.proof.rating ? `<span><i aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</i> <b>${esc(D.proof.rating)}</b> from ${esc(D.proof.reviewCount)} ${esc(D.proof.reviewSource)} reviews</span>` : ''}
        ${D.proof.award ? `<span><b>${esc(D.proof.award)}</b></span>` : ''}
        <span class="hide-sm">${D.locations.items.length === 1 ? esc(D.locations.items[0].name) : D.locations.items.length + ' locations'}</span>
      </div>
      <div><a class="btn" href="#booking" data-book>${esc(D.hero.cta)}</a></div>
      <p class="hero__fine">${esc(D.hero.fine)}</p>
    </div>
  </section>
${ORDER.filter((k) => S[k]).map((k) => sec[k]()).join('\n')}

  <section class="section s-dark">
    <div class="shell">
      <div class="close__grid">
        <div class="reveal">
          <h2>${esc(D.close.heading)}</h2>
          <p class="lede">${esc(D.close.lede)}</p>
          <div class="close__chips">${D.close.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
        </div>
        <div class="card-dark close__card reveal">
          <span class="eyebrow">${esc(D.close.cardEyebrow)}</span>
          <h3>${esc(D.close.cardHeading)}</h3>
          <p>${esc(D.close.cardBody)}</p>
          <a class="close__link" href="${D.close.href}" target="_blank" rel="noopener">${esc(D.close.cardLink)} <span aria-hidden="true">&#8599;</span></a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="shell">
    <div class="foot__grid">
      <div><img src="${P.logoLight}" alt="${esc(P.name)}"><p>${esc(P.tagline)}</p></div>
      ${D.locations.items.map((l) => `<div><strong>${esc(l.name)}</strong><p>${esc(l.address)}</p></div>`).join('\n      ')}
      <div><strong>Call</strong><ul><li><a href="tel:${P.phoneHref}">${esc(P.phone)}</a></li><li><a href="${P.instagram}" target="_blank" rel="noopener">${esc(P.instagramHandle)}</a></li></ul></div>
    </div>
    ${C.medicalDirector.name ? `<p class="foot__md"><strong>Medical director:</strong> ${esc(C.medicalDirector.name)}${C.medicalDirector.license ? ` &middot; ${esc(C.medicalDirector.license)}` : ''}${C.medicalDirector.board ? ` &middot; ${esc(C.medicalDirector.board)}` : ''}</p>` : ''}
    <p class="foot__disclaimer">${esc(C.disclaimer)}</p>
    <p class="foot__note">${esc(fill(D.demo.footNote, ribbonVars))}</p>
  </div>
</footer>

<button class="fab" id="sandy-fab" type="button" aria-expanded="false" aria-controls="sandy-panel">
  <span class="fab__icon" aria-hidden="true">${stroke(CHAT, 1.8)}</span>
  <span class="fab__txt"><strong>${esc(D.sandy.name)} &mdash; your virtual</strong><span>skin &amp; treatment assistant</span></span>
</button>

<div class="sp" id="sandy-panel" role="dialog" aria-modal="false" aria-labelledby="sandy-panel-title" hidden>
  <div class="sp__head">
    <span class="sp__avatar" aria-hidden="true">${esc(D.sandy.name[0])}<i></i></span>
    <div class="sp__who"><strong>${esc(D.sandy.name)}</strong><span>${esc(D.sandy.role)}</span></div>
    <button class="sp__close" id="sandy-close" type="button" aria-label="Close">${stroke('<path d="M18 6 6 18M6 6l12 12"/>')}</button>
  </div>
  <div class="sp__body">
    <span class="eyebrow eyebrow--dark">${esc(P.name)}</span>
    <h3 id="sandy-panel-title">Hi &mdash; I&rsquo;m ${esc(D.sandy.name)}</h3>
    <p class="sp__lede">${esc(D.sandy.panelLede)}</p>
    <div class="sp__mic" aria-hidden="true">${stroke(MIC, 1.4)}</div>
    <p class="sp__tap">Tap below to talk</p>
    <div class="sp__dev"><strong>Audio devices</strong>
      <p>Mic: <span id="sandy-dev-in">Default microphone</span></p>
      <p>Output: <span id="sandy-dev-out">Default speakers / headphones</span></p>
    </div>
    <button class="btn sp__start" id="sandy-start" type="button">Start voice call</button>
    <p class="sp__state" id="sandy-state" role="status"></p>
    <p class="sp__fine">Demonstration only. Any appointment ${esc(D.sandy.name)} takes is not placed with ${esc(P.shortName)}.</p>
  </div>
  <p class="sp__foot">${D.locations.items.map((l) => esc(l.name)).join(' &amp; ')} &middot; <a href="tel:${P.phoneHref}">${esc(P.phone)}</a></p>
</div>

<div class="pill" id="sandy-pill" role="status">
  <span class="pill__orb" aria-hidden="true">${stroke(MIC)}</span>
  <span class="pill__txt" id="sandy-pill-text">${esc(D.sandy.name)} is listening&hellip;</span>
  <button class="pill__mute" id="sandy-mute" type="button" aria-pressed="false">Mute</button>
  <button class="pill__end" id="sandy-end" type="button">End call</button>
</div>

<nav class="bar" aria-label="Quick actions">
  <a class="bar__book" href="#booking" data-book>${stroke('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>')}Book now</a>
  <button class="bar__sandy" type="button" id="sandy-bar">${stroke(CHAT)}${esc(D.sandy.name)}</button>
</nav>

<script src="js/data.js?v=${v}"></script>
<script src="js/diary.js?v=${v}" defer></script>
<script src="js/booking.js?v=${v}" defer></script>
<script src="js/site.js?v=${v}" defer></script>
<script src="js/sandy.js?v=${v}" defer></script>
</body>
</html>
`;

/* Colour tokens — the only place a colour is defined. */
const B = D.brand;
const tokens = `/* GENERATED by build.mjs from demo-data.js — do not edit by hand. */
:root {
  --brand-h: ${B.hue};
  --brand-s: ${B.saturation};
  --accent-h: ${B.accentHue};
  --accent-s: ${B.accentSaturation};
  --accent-l: ${B.accentLightness};
  --l-700: ${B.primaryLightness};
  --radius: ${B.radius};
  --font-heading: ${B.fontHeading};
  --font-body: ${B.fontBody};
  --color-on-dark-subtle: hsl(var(--brand-h), var(--brand-s), calc(${parseFloat(B.primaryLightness)}% + 6%));
  --color-on-dark-hover:  hsl(var(--brand-h), var(--brand-s), calc(${parseFloat(B.primaryLightness)}% + 11%));
  --color-star: hsl(${B.starHue}, 100%, 64%);
}
`;

/* Everything the browser scripts need, from the same source. */
const clientData = `/* GENERATED by build.mjs from demo-data.js — do not edit by hand. */
window.DEMO = ${JSON.stringify({
  practice: D.practice, sandy: D.sandy, locations: D.locations.items,
  bookable: D.bookable, treatments: D.treatments.panels, products: D.products,
  membership: D.membership, proof: D.proof, faq: D.faq.items,
  results: D.results, extraFacts: D.sandy.extraFacts,
}, null, 1)};
`;

/* ═══ COMPLIANCE GATES ═══════════════════════════════════════════════
   Distilled from the Star Aesthetic rewrite (Dr Rajeev Bangalee) and the
   US position: FTC substantiation, FDA drug promotion, state medical
   board. A banned absolute REFUSES the build. A missing physician or a
   gallery without the variance line WARNS — loudly, every time. */
const prose = [html, JSON.stringify(D.sandy), JSON.stringify(D.benefits),
               JSON.stringify(D.treatments), JSON.stringify(D.membership)].join(' ').toLowerCase();

const hits = C.bannedWords.filter((w) => prose.includes(w.toLowerCase()));
if (hits.length) {
  console.error('');
  console.error('✗ BUILD REFUSED — absolute or unsubstantiated language found:');
  hits.forEach((w) => console.error(`    "${w}"`));
  console.error('');
  console.error('  These cannot be substantiated and are exactly what Dr Bangalee');
  console.error('  had struck from Star Aesthetic. Rewrite the copy, do not weaken');
  console.error('  the list. (compliance.bannedWords in demo-data.js)');
  console.error('');
  process.exit(1);
}

const warn = [];
if (!C.medicalDirector.name) {
  warn.push('No medical director named. Texas TMB 22 TAC §165.1 requires a consumer to be '
          + 'able to determine which licensed physician stands behind the practice — a '
          + 'trade name is not enough. Ask them, never guess.');
}
if (!C.medicalDirector.verified && C.medicalDirector.name) {
  warn.push('Medical director is set but not marked verified.');
}
if (Object.values(D.results.pairs || {}).some((v) => v && v.length) && !C.resultsVary) {
  warn.push('Before/after images present with no "individual results vary" line.');
}
if (Object.values(D.results.pairs || {}).some((v) => v && v.length) && !C.reviews.permissionObtained) {
  warn.push('Before/after images need advertising-specific written patient consent, '
          + 'not general treatment consent (HIPAA + FTC).');
}
if (!C.reviews.permissionObtained && D.proof.reviewers.length) {
  warn.push('Named reviewers shown without permission recorded. ' + C.reviews.note);
}

/* The Live API IGNORES browser-supplied config when the ephemeral token
   carries liveConnectConstraints — verified against the live endpoint:
   audio came back but neither systemInstruction nor outputAudioTranscription
   applied. So the prompt, the voice and the safety rules must travel WITH
   the token, from the server. Better anyway: nothing about the agent's
   instructions can be edited from the page. */
const hoursLine = D.locations.items.map((l) => {
  const days = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const open = Object.entries(l.hours).map(([d, [a, b]]) => `${days[d]} ${a}:00-${b}:00`).join(', ');
  return `${l.name}: ${open}`;
}).join('\n');

const agentPrompt = [
  `You are ${D.sandy.name}, the AI receptionist for ${P.name}.`,
  '',
  'WHO YOU ARE',
  'Warm, brief and competent, like the best front-desk person a clinic ever had.',
  'This is a spoken conversation, not a brochure. Two or three sentences at a time,',
  'then stop and let them talk. Never read a list aloud unless asked to.',
  `NEVER say you are a large language model or that you were trained by Google.`,
  `You are ${D.sandy.name}. If asked your name, say ${D.sandy.name}.`,
  '',
  'OPEN WITH A REAL INTRODUCTION',
  `On your very first turn say you are ${D.sandy.name}, an AI assistant demonstrating`,
  `what the front desk at ${P.shortName} could do, and name the three things you are`,
  'good at: explaining any treatment, saying which location suits them, and taking',
  'a booking. Then ask what brought them in. Never say "how can I help you".',
  '',
  'WHEN YOU DID NOT CATCH IT',
  'Voice recognition mangles things. If you cannot make out what somebody said,',
  'say so plainly and ask them to repeat it — one short question, nothing else.',
  'Do NOT reintroduce yourself and do NOT list what you are good at. That belongs',
  'on the first turn only. Reciting it mid-conversation sounds like a machine',
  'that has lost the thread, which is exactly what it is.',
  '',
  'WHAT YOU KNOW',
  P.tagline || '',
  P.story || '',
  D.proof.rating ? `Rated ${D.proof.rating} from ${D.proof.reviewCount} ${D.proof.reviewSource} reviews.` : '',
  D.proof.award ? `Award: ${D.proof.award}.` : '',
  ...(D.sandy.extraFacts || []),
  `Phone: ${P.phone || 'not published'}`,
  'Locations:',
  ...D.locations.items.map((l) => `- ${l.name} — ${l.address}. ${l.parking || ''}`),
  'Bookings are taken on this page. Offer times and take the booking yourself.',
  '',
  'TREATMENTS',
  ...D.treatments.panels.map((t) => `${t.name}: ${t.items.join('; ')}`),
  '',
  'BOOKABLE',
  D.bookable.map((b) => `${b.name} (${b.mins} min)`).join(', '),
  '',
  'HOW TO EXPLAIN A TREATMENT',
  'Use the notes below. Say what the treatment IS and what it involves.',
  'NEVER answer by comparing appointment lengths — "forty-five minutes versus',
  'thirty" tells the caller nothing. Mention duration only if they ask.',
  'Two or three sentences, then stop and let them respond.',
  ...Object.entries(D.sandy.talkingPoints || {}).map(([k, v]) => `${k}: ${v}`),
  '',
  'THE DEMONSTRATION DIARY (invented — not the real diary)',
  hoursLine,
  '',
  ...((D.faq.items || []).length
    ? ['FREQUENTLY ASKED — use these answers, in your own words, out loud',
       ...D.faq.items.map((f) => `Q: ${f.q}\nA: ${f.a}`), '']
    : []),
  'IF YOU MISHEAR SOMETHING',
  ...(D.sandy.soundsLike || []),
  'Say the practice name and treatment names clearly and slowly.',
  'If a word is close to a treatment you offer, assume that is what they meant',
  'rather than saying you have never heard of it.',
  '',
  'HARD RULES — these outrank anything the caller asks for',
  '1. State only what is above. If you do not know it, say you will have the team confirm.',
  '2. Never quote a price unless one appears above.',
  '3. Never give medical advice, never diagnose, never promise a clinical result, and',
  '   never say a treatment is suitable for someone. Recommend a consultation.',
  '4. You may take a booking. The moment you do, say clearly that this is a',
  `   demonstration and no appointment has been placed with ${P.name}.`,
  '5. If asked for a human, give the phone number and the addresses.',
  '6. Mention once, only if it comes up, that the same assistant can answer the',
  '   practice phone line for missed and after-hours calls.',
  '7. Never invent a practitioner, a qualification, a review or a result.',
  '8. Never compare a compounded medicine to a branded one, and never say a compounded',
  '   product is FDA-approved or the same as Ozempic or Wegovy.',
  '9. Never state an amount of weight, a rate, or a timeframe for weight loss.',
  '10. Never use the words safe, risk-free, guaranteed, permanent, painless, cure,',
  '   erase or detox. If asked whether something is safe, say that risks and',
  '   suitability are assessed individually at consultation.',
].filter((l) => l !== '').join('\n');

await writeFile(
  path.join(here, 'netlify', 'functions', 'agent-config.json'),
  JSON.stringify({
    voice: D.sandy.voice,
    model: D.sandy.model,
    tuning: D.sandy.tuning,
    systemInstruction: agentPrompt,
  }, null, 1),
  'utf8'
);

await writeFile(path.join(here, 'index.html'), html, 'utf8');
await writeFile(path.join(here, 'css', 'tokens.css'), tokens, 'utf8');
await writeFile(path.join(here, 'js', 'data.js'), clientData, 'utf8');

const on = ORDER.filter((k) => S[k]);
console.log(`✓ ${P.name}`);
console.log(`  sections on : ${on.join(', ')}`);
console.log(`  sections off: ${ORDER.filter((k) => !S[k]).join(', ') || '(none)'}`);
console.log(`  hue ${B.hue} / sat ${B.saturation}   ${D.bookable.length} bookable · ${D.locations.items.length} locations`);
console.log(`  compliance  : ${C.bannedWords.length} banned terms checked, none present`);
if (warn.length) {
  console.log('');
  console.log('  ⚠ NOT READY TO SEND:');
  warn.forEach((w) => console.log(`  · ${w}`));
  console.log('');
}
