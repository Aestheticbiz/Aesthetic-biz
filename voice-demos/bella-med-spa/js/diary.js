/* ═══════════════════════════════════════════════════════════════════
   THE DEMONSTRATION DIARY
   ───────────────────────────────────────────────────────────────────
   One source of truth, loaded before booking.js and sandy.js, so the
   voice agent and the booking screen can never disagree. If Sandy
   offers Thursday 15:00 in Dallas, that is the slot the screen shows.

   Availability here is INVENTED. Most practices publish no opening hours
   and no prices, so nothing built from this file is presented as fact —
   every surface that uses it is labelled as a demonstration.

   Locations, services and opening hours all come from demo-data.js via
   js/data.js — this file holds only the logic.

   Ported from the shape of aestheticbiz lib/discovery.ts, deliberately
   NOT sharing its code: that file is the sales calendar (SAST, 60-min
   slots) and its slot hours are already duplicated in crmsolutions.
   ═══════════════════════════════════════════════════════════════════ */

window.DEMO_DIARY = (() => {
  'use strict';

  const DEMO = window.DEMO || {};

  const LOCATIONS = (DEMO.locations || []).map((l) => ({
    id: l.id, name: l.name, address: l.address,
    hint: [l.hint, l.parking && l.parking.split('.')[0]].filter(Boolean).join(' · '),
  }));

  const SERVICES = DEMO.bookable || [];

  /* Opening pattern per location, straight from demo-data.js. */
  const HOURS = {};
  (DEMO.locations || []).forEach((l) => { HOURS[l.id] = l.hours || {}; });

  /* Slots already taken, so the diary looks lived-in rather than empty.
     Keyed "location|YYYY-MM-DD|HH:MM". Seeded deterministically from the
     date so it does not reshuffle on every render. */
  const held = new Set();
  const booked = [];

  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  /* Next N open days, starting tomorrow — nobody books a med spa for
     "in ten minutes", and same-day availability reads as desperate. */
  function nextDates(count = 14) {
    const out = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);
    while (out.length < count) {
      if (d.getDay() !== 0) out.push(iso(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function slotsFor(locationId, dateStr) {
    const day = new Date(`${dateStr}T00:00:00`).getDay();
    const window = HOURS[locationId]?.[day];
    if (!window) return [];

    const [open, close] = window;
    const slots = [];
    for (let h = open; h < close; h++) {
      for (const m of [0, 30]) {
        const time = `${pad(h)}:${pad(m)}`;
        const key = `${locationId}|${dateStr}|${time}`;
        if (booked.some((b) => b.key === key)) continue;
        /* ~30% of slots look taken. Deterministic, so it is stable. */
        if (hash(key) % 10 < 3) { held.add(key); continue; }
        slots.push(time);
      }
    }
    return slots;
  }

  /* Reference prefix from the practice's initials, so it reads as theirs. */
  const PREFIX = ((DEMO.practice && DEMO.practice.name) || 'DEMO')
    .split(/\s+/).map((w) => w[0]).join('').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'DEM';

  function book(entry) {
    const key = `${entry.locationId}|${entry.date}|${entry.time}`;
    const ref = `${PREFIX}-${String(hash(key + Date.now()) % 100000).padStart(5, '0')}`;
    booked.push({ ...entry, key, ref, at: new Date().toISOString() });
    return ref;
  }

  const location = (id) => LOCATIONS.find((l) => l.id === id);
  const service = (id) => SERVICES.find((s) => s.id === id);

  function formatDate(dateStr) {
    return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    });
  }
  function formatTime(t) {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'pm' : 'am';
    const hr = h % 12 === 0 ? 12 : h % 12;
    return m ? `${hr}:${pad(m)}${ampm}` : `${hr}${ampm}`;
  }

  /* A short, speakable summary for Sandy's system prompt, built from the
     same data the screen renders. */
  function forPrompt(days = 3) {
    const dates = nextDates(days * 2).slice(0, days);
    return LOCATIONS.map((loc) => {
      const lines = dates.map((d) => {
        const s = slotsFor(loc.id, d).slice(0, 4).map(formatTime);
        return s.length ? `  ${formatDate(d)}: ${s.join(', ')}` : null;
      }).filter(Boolean);
      return `${loc.name}:\n${lines.join('\n')}`;
    }).join('\n');
  }

  return {
    LOCATIONS, SERVICES,
    nextDates, slotsFor, book, location, service,
    formatDate, formatTime, forPrompt,
    get bookings() { return booked.slice(); },
  };
})();
