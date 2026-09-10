/* ═══════════════════════════════════════════════════════════════════
   THE BOOKING FLOW
   ───────────────────────────────────────────────────────────────────
   Location → service → date → time → details → confirmation.

   Same five steps Boulevard uses, so the shape is familiar — except it
   never leaves the practice's own page, and it reads from the same diary
   the voice agent speaks from. Nothing is sent anywhere. No backend, by
   design:
   this is a demonstration, and it says so on every screen that matters.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const D = window.DEMO_DIARY;
  const P = (window.DEMO && window.DEMO.practice) || {};
  if (!D) return;

  const state = { step: 0, locationId: null, serviceId: null, date: null, time: null, ref: null };
  let root, body, crumbs, backBtn, lastFocus;

  const STEPS = ['Location', 'Treatment', 'Date', 'Time', 'Your details', 'Confirmed'];

  /* ── Shell ─────────────────────────────────────────────────────── */
  function build() {
    root = document.createElement('div');
    root.className = 'bk';
    root.id = 'booking';
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Book an appointment');
    root.innerHTML = `
      <div class="bk__scrim" data-close></div>
      <div class="bk__card">
        <header class="bk__head">
          <button class="bk__back" type="button" hidden aria-label="Back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div class="bk__title">
            <strong>Book an appointment</strong>
            <span class="bk__crumbs"></span>
          </div>
          <button class="bk__close" type="button" data-close aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </header>
        <div class="bk__body"></div>
        <p class="bk__note">Demonstration only &mdash; availability is invented and nothing is booked with the practice.</p>
      </div>`;
    document.body.appendChild(root);

    body = root.querySelector('.bk__body');
    crumbs = root.querySelector('.bk__crumbs');
    backBtn = root.querySelector('.bk__back');

    root.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    backBtn.addEventListener('click', back);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !root.hidden) close();
    });
  }

  function open() {
    lastFocus = document.activeElement;
    Object.assign(state, { step: 0, locationId: null, serviceId: null, date: null, time: null, ref: null });
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => root.classList.add('is-open'));
    render();
  }
  function close() {
    root.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { root.hidden = true; }, 220);
    lastFocus?.focus?.();
  }
  function go(step) { state.step = step; render(); }
  function back() { if (state.step > 0) go(state.step - 1); }

  /* ── Steps ─────────────────────────────────────────────────────── */
  function render() {
    crumbs.textContent = STEPS[state.step];
    backBtn.hidden = state.step === 0 || state.step === 5;
    body.scrollTop = 0;
    body.innerHTML = '';
    [stepLocation, stepService, stepDate, stepTime, stepDetails, stepDone][state.step]();
    const first = body.querySelector('button, input');
    if (first && state.step > 0) first.focus({ preventScroll: true });
  }

  function h(tag, cls, html) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html != null) el.innerHTML = html;
    return el;
  }

  function stepLocation() {
    body.appendChild(h('h4', 'bk__q', 'Which location suits you?'));
    const list = h('div', 'bk__opts');
    D.LOCATIONS.forEach((loc) => {
      const b = h('button', 'bk__opt', `
        <span class="bk__optmain">
          <strong>${loc.name}</strong>
          <span>${loc.address}</span>
          <em>${loc.hint}</em>
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`);
      b.type = 'button';
      b.addEventListener('click', () => { state.locationId = loc.id; go(1); });
      list.appendChild(b);
    });
    body.appendChild(list);
  }

  function stepService() {
    body.appendChild(h('h4', 'bk__q', 'What are you booking?'));
    const groups = [...new Set(D.SERVICES.map((s) => s.group))];
    groups.forEach((g) => {
      body.appendChild(h('p', 'bk__group', g));
      const list = h('div', 'bk__opts');
      D.SERVICES.filter((s) => s.group === g).forEach((svc) => {
        const b = h('button', 'bk__opt bk__opt--tight', `
          <span class="bk__optmain">
            <strong>${svc.name}</strong>
            <span>${svc.mins} min${svc.note ? ` &middot; ${svc.note}` : ''}</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`);
        b.type = 'button';
        b.addEventListener('click', () => { state.serviceId = svc.id; go(2); });
        list.appendChild(b);
      });
      body.appendChild(list);
    });
  }

  function stepDate() {
    body.appendChild(h('h4', 'bk__q', 'Pick a day'));
    const grid = h('div', 'bk__dates');
    D.nextDates(14).forEach((d) => {
      const open = D.slotsFor(state.locationId, d).length;
      const dt = new Date(`${d}T00:00:00`);
      const b = h('button', 'bk__date', `
        <em>${dt.toLocaleDateString('en-US', { weekday: 'short' })}</em>
        <strong>${dt.getDate()}</strong>
        <span>${dt.toLocaleDateString('en-US', { month: 'short' })}</span>
        <i>${open ? `${open} open` : 'closed'}</i>`);
      b.type = 'button';
      b.disabled = !open;
      b.addEventListener('click', () => { state.date = d; go(3); });
      grid.appendChild(b);
    });
    body.appendChild(grid);
  }

  function stepTime() {
    body.appendChild(h('h4', 'bk__q', D.formatDate(state.date)));
    const slots = D.slotsFor(state.locationId, state.date);
    const grid = h('div', 'bk__times');
    slots.forEach((t) => {
      const b = h('button', 'bk__time', D.formatTime(t));
      b.type = 'button';
      b.addEventListener('click', () => { state.time = t; go(4); });
      grid.appendChild(b);
    });
    body.appendChild(grid);
  }

  function summary() {
    const loc = D.location(state.locationId);
    const svc = D.service(state.serviceId);
    return `
      <dl class="bk__sum">
        <div><dt>Treatment</dt><dd>${svc.name} &middot; ${svc.mins} min</dd></div>
        <div><dt>When</dt><dd>${D.formatDate(state.date)} at ${D.formatTime(state.time)}</dd></div>
        <div><dt>Where</dt><dd>${loc.name} &mdash; ${loc.address}</dd></div>
      </dl>`;
  }

  function stepDetails() {
    body.appendChild(h('h4', 'bk__q', 'Almost done'));
    body.appendChild(h('div', null, summary()));

    const form = h('form', 'bk__form', `
      <label>First name<input name="name" type="text" autocomplete="given-name" required></label>
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Mobile <span>optional</span><input name="phone" type="tel" autocomplete="tel"></label>
      <button class="btn bk__submit" type="submit">Confirm appointment</button>`);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      state.name = data.name;
      state.ref = D.book({
        locationId: state.locationId, serviceId: state.serviceId,
        date: state.date, time: state.time, name: data.name,
      });
      go(5);
    });
    body.appendChild(form);
  }

  function stepDone() {
    const loc = D.location(state.locationId);
    body.appendChild(h('div', 'bk__done', `
      <span class="bk__tick" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>
      </span>
      <h4>You&rsquo;re booked, ${state.name || 'there'}.</h4>
      <p class="bk__ref">Reference ${state.ref}</p>
      ${summary()}
      <p class="bk__warn"><strong>This was a demonstration.</strong> No appointment has been placed with ${P.name || 'the practice'}, and nobody has been contacted.${P.phone ? ` To book for real, call <a href="tel:${P.phoneHref}">${P.phone}</a>.` : ''}</p>`));

    const done = h('button', 'btn bk__submit', 'Close');
    done.type = 'button';
    done.addEventListener('click', close);
    body.appendChild(done);

    /* Tell Sandy, so if she is mid-conversation she knows. */
    document.dispatchEvent(new CustomEvent('demo:booked', { detail: { ...state, location: loc.name } }));
  }

  /* ── Wire up every Book control on the page ────────────────────── */
  function init() {
    build();
    document.querySelectorAll('[data-book]').forEach((btn) => {
      btn.addEventListener('click', (e) => { e.preventDefault(); open(); });
    });
    window.DEMO_BOOKING = { open, close };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
