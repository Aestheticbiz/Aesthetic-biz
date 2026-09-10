/* ═══════════════════════════════════════════════════════════════════
   Page behaviour. Nothing here should be noticeable.
   RULES.md section 7 — the thunk, not the show.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Reveal on scroll ────────────────────────────────────────── */
  function reveals() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || reduce) return;   /* stay visible */

    /* Only now do we allow anything to be hidden. */
    document.documentElement.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });

    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });

    /* Belt and braces: if the observer has not fired for anything after a
       beat — an odd embedded viewport, a background tab, a scroll container
       we do not own — show everything rather than serve a blank page. */
    setTimeout(function () {
      if (document.querySelector('.reveal.is-visible')) return;
      document.documentElement.classList.remove('js-reveal');
      io.disconnect();
    }, 1500);
  }

  /* ── Before / after category selector ────────────────────────── */
  /* One entry per category, keyed lowercase to match the tab buttons.
     Filled from demo-data.js via data.js, so adding a real pair there
     fills the section — no markup changes, nothing to keep in step. */
  var BA = (function () {
    var pairs = (window.DEMO && window.DEMO.results && window.DEMO.results.pairs) || {};
    var out = {};
    Object.keys(pairs).forEach(function (k) { out[k.toLowerCase()] = pairs[k]; });
    return out;
  }());

  function beforeAfter() {
    var tabs = document.getElementById('ba-tabs');
    var stage = document.getElementById('ba-stage');
    if (!tabs || !stage) return;

    var figs = stage.querySelectorAll('figure');

    function show(cat) {
      var pair = BA[cat] && BA[cat][0];
      var before = pair ? pair.before : 'assets/placeholder-before.svg';
      var after = pair ? pair.after : 'assets/placeholder-after.svg';
      figs[0].querySelector('img').src = before;
      figs[1].querySelector('img').src = after;
    }

    tabs.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button[data-cat]');
      if (!btn) return;
      tabs.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      });
      show(btn.dataset.cat);
    });

    /* Render the first category now, or the stage keeps the placeholder
       markup until somebody clicks a tab. */
    var first = tabs.querySelector('button[data-cat]');
    if (first) show(first.dataset.cat);
  }

  /* ── Location selector ───────────────────────────────────────── */
  function locations() {
    var tabs = document.getElementById('loc-tabs');
    if (!tabs) return;
    var panels = document.querySelectorAll('.loc__panel');

    tabs.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button[data-loc]');
      if (!btn) return;
      tabs.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      });
      panels.forEach(function (p) {
        p.hidden = p.dataset.panel !== btn.dataset.loc;
      });
    });
  }

  /* ── Membership crossfade — one image, slow, no sliding ──────── */
  function fader() {
    var box = document.getElementById('member-fader');
    if (!box || reduce) return;
    var imgs = box.querySelectorAll('img');
    if (imgs.length < 2) return;
    var i = 0;

    setInterval(function () {
      if (document.hidden) return;
      imgs[i].classList.remove('is-on');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('is-on');
    }, 5200);
  }

  /* ── Sandy: the floating button and the mobile bar both take you
        to her, then hand focus to the microphone. ─────────────── */
  function sandyJump() {
    ['sandy-fab', 'sandy-bar'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', function () {
        var target = document.getElementById('sandy');
        if (!target) return;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        var mic = document.getElementById('sandy-mic');
        if (mic) setTimeout(function () { mic.focus(); }, reduce ? 0 : 600);
      });
    });
  }

  /* ── Product rail — slide by a full page of cards ─────────────── */
  function rail() {
    var track = document.getElementById('prod-rail');
    if (!track) return;
    var wrap = track.closest('.rail');
    var btns = wrap.querySelectorAll('[data-rail]');

    function sync() {
      var max = track.scrollWidth - track.clientWidth - 2;
      btns.forEach(function (b) {
        b.disabled = b.dataset.rail === 'prev'
          ? track.scrollLeft <= 2
          : track.scrollLeft >= max;
      });
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        /* One card short of a full page keeps a visual anchor. */
        var card = track.querySelector('.prod');
        var step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
        var page = Math.max(step, track.clientWidth - step);
        track.scrollBy({ left: b.dataset.rail === 'prev' ? -page : page, behavior: reduce ? 'auto' : 'smooth' });
      });
    });

    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  function init() { reveals(); beforeAfter(); locations(); fader(); rail(); sandyJump(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
