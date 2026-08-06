/**
 * Free lead harvester. Pulls aesthetic clinics and med spas from OpenStreetMap
 * via the Overpass API — no key, no signup, no card, no cost.
 *
 *   node scripts/harvest-leads.mjs                       # OSM, all cities
 *   node scripts/harvest-leads.mjs miami dallas          # named cities
 *   node scripts/harvest-leads.mjs --google              # Google Places instead
 *   node scripts/harvest-leads.mjs --google --emails     # …and fetch public emails
 *
 * Writes data/leads/<source>-<city>.csv per city, in the shape prepare-list.mjs
 * expects. Run that afterwards to merge, dedupe and clean.
 *
 * WHICH SOURCE. Measured on Scottsdale: OSM returned 96 matching businesses but
 * only 5 with a website, because US small businesses are thinly tagged. That is
 * roughly 3 usable contacts per metro — not worth the time.
 *
 * Google Places returns a website for the large majority. It needs an API key
 * (PLACES_API_KEY), which means a Google Cloud account with a card on file, but
 * Maps Platform includes a monthly free credit that covers this volume many
 * times over. Set the key and pass --google.
 *
 * The --emails pass fetches each business's own homepage and /contact page and
 * reads published addresses. It is deliberately slow (one request a second) and
 * identifies itself. Do not remove either.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/** Public Overpass instances. They are donated and frequently overloaded, so
 *  we rotate on failure rather than giving up on a city. */
const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.osm.jp/api/interpreter",
];
const OUT_DIR = path.join(process.cwd(), "data", "leads");
const UA = "AestheticBiz-lead-research/1.0 (contact: ignatius@crmsolutions.app)";

/** Metro centres, so we never depend on a geocoder. radius in metres. */
const CITIES = [
  { key: "miami", name: "Miami", state: "FL", lat: 25.7617, lon: -80.1918, r: 30000 },
  { key: "losangeles", name: "Los Angeles", state: "CA", lat: 34.0522, lon: -118.2437, r: 35000 },
  { key: "newyork", name: "New York", state: "NY", lat: 40.7128, lon: -74.006, r: 30000 },
  { key: "dallas", name: "Dallas", state: "TX", lat: 32.7767, lon: -96.797, r: 35000 },
  { key: "houston", name: "Houston", state: "TX", lat: 29.7604, lon: -95.3698, r: 35000 },
  { key: "atlanta", name: "Atlanta", state: "GA", lat: 33.749, lon: -84.388, r: 30000 },
  { key: "phoenix", name: "Phoenix", state: "AZ", lat: 33.4484, lon: -112.074, r: 35000 },
  { key: "scottsdale", name: "Scottsdale", state: "AZ", lat: 33.4942, lon: -111.9261, r: 20000 },
  { key: "chicago", name: "Chicago", state: "IL", lat: 41.8781, lon: -87.6298, r: 30000 },
  { key: "denver", name: "Denver", state: "CO", lat: 39.7392, lon: -104.9903, r: 30000 },
  { key: "seattle", name: "Seattle", state: "WA", lat: 47.6062, lon: -122.3321, r: 30000 },
  { key: "austin", name: "Austin", state: "TX", lat: 30.2672, lon: -97.7431, r: 30000 },
  { key: "sandiego", name: "San Diego", state: "CA", lat: 32.7157, lon: -117.1611, r: 30000 },
  { key: "orlando", name: "Orlando", state: "FL", lat: 28.5383, lon: -81.3792, r: 30000 },
  { key: "tampa", name: "Tampa", state: "FL", lat: 27.9506, lon: -82.4572, r: 30000 },
  { key: "nashville", name: "Nashville", state: "TN", lat: 36.1627, lon: -86.7816, r: 30000 },
  { key: "charlotte", name: "Charlotte", state: "NC", lat: 35.2271, lon: -80.8431, r: 30000 },
  { key: "boston", name: "Boston", state: "MA", lat: 42.3601, lon: -71.0589, r: 25000 },
  { key: "philadelphia", name: "Philadelphia", state: "PA", lat: 39.9526, lon: -75.1652, r: 30000 },
  { key: "lasvegas", name: "Las Vegas", state: "NV", lat: 36.1699, lon: -115.1398, r: 30000 },
];

/** A name has to look like aesthetics, or we are just collecting hairdressers. */
const NAME_MATCH =
  /med.?spa|medspa|aesthetic|esthetic|derm|skin|laser|cosmetic|botox|filler|rejuven|anti.?aging|antiaging|beauty\s?(clinic|med)|plastic surgery|wellness (clinic|centre|center)|inject/i;

/** Names that are almost never an owner-run aesthetic practice. */
const NAME_REJECT = /barber|nail|tattoo|tanning|massage envy|hair salon|supercuts|great clips/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function buildQuery(city) {
  const around = `(around:${city.r},${city.lat},${city.lon})`;
  return `[out:json][timeout:90];
(
  nwr["shop"="beauty"]${around};
  nwr["leisure"="spa"]${around};
  nwr["amenity"="clinic"]${around};
  nwr["healthcare"="clinic"]${around};
  nwr["healthcare"="centre"]${around};
  nwr["office"="physician"]${around};
);
out center tags;`;
}

async function fetchCity(city) {
  let lastError;
  for (const mirror of OVERPASS_MIRRORS) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const res = await fetch(mirror, {
          method: "POST",
          headers: { "Content-Type": "text/plain", "User-Agent": UA },
          body: buildQuery(city),
          signal: AbortSignal.timeout(120000),
        });
        if (res.status === 429 || res.status === 504) {
          lastError = new Error(`${res.status}`);
          await sleep(5000);
          continue;
        }
        if (!res.ok) throw new Error(`Overpass ${res.status}`);
        const data = await res.json();
        return data.elements ?? [];
      } catch (error) {
        lastError = error;
        await sleep(3000);
      }
    }
  }
  throw lastError ?? new Error("all Overpass mirrors failed");
}

function toRow(el, city) {
  const t = el.tags ?? {};
  const name = t.name ?? "";
  if (!name || !NAME_MATCH.test(name) || NAME_REJECT.test(name)) return null;

  const website = t.website ?? t["contact:website"] ?? t.url ?? "";
  const phone = t.phone ?? t["contact:phone"] ?? "";
  const email = t.email ?? t["contact:email"] ?? "";

  return {
    email,
    FIRSTNAME: "",
    business: name,
    city: t["addr:city"] || city.name,
    state: t["addr:state"] || city.state,
    title: "",
    website,
    phone,
  };
}

/* ── Google Places ────────────────────────────────────────────────────── */

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const PLACES_FIELDS =
  "places.displayName,places.formattedAddress,places.websiteUri,places.nationalPhoneNumber,nextPageToken";

/** Several phrasings per city, because one query never returns the whole market. */
const PLACES_QUERIES = [
  "med spa",
  "medical aesthetics clinic",
  "botox and filler clinic",
  "laser skin clinic",
  "aesthetic clinic",
];

async function fetchCityGoogle(city, apiKey) {
  const rows = [];
  const seen = new Set();

  for (const q of PLACES_QUERIES) {
    let pageToken;
    for (let page = 0; page < 3; page += 1) {
      const body = {
        textQuery: `${q} in ${city.name}, ${city.state}`,
        pageSize: 20,
        ...(pageToken ? { pageToken } : {}),
      };

      const res = await fetch(PLACES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": PLACES_FIELDS,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Places ${res.status}: ${text.slice(0, 160)}`);
      }

      const data = await res.json();
      for (const place of data.places ?? []) {
        const name = place.displayName?.text ?? "";
        if (!name || NAME_REJECT.test(name)) continue;
        const key = name.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        rows.push({
          email: "",
          FIRSTNAME: "",
          business: name,
          city: city.name,
          state: city.state,
          title: "",
          website: place.websiteUri ?? "",
          phone: place.nationalPhoneNumber ?? "",
        });
      }

      pageToken = data.nextPageToken;
      if (!pageToken) break;
      await sleep(1200);
    }
    await sleep(600);
  }

  return rows;
}

/** Reads published addresses off a business's own homepage and contact page. */
async function findEmail(website) {
  const base = website.startsWith("http") ? website : `https://${website}`;
  const candidates = [base, `${base.replace(/\/$/, "")}/contact`];

  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(12000),
        redirect: "follow",
      });
      if (!res.ok) continue;
      const html = await res.text();

      const mailto = html.match(/mailto:([^"'?>\s]+@[^"'?>\s]+)/i);
      if (mailto) return mailto[1].toLowerCase();

      const plain = html.match(/[\w.+-]+@[\w-]+\.[\w.]{2,}/);
      if (plain && !/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(plain[0])) {
        return plain[0].toLowerCase();
      }
    } catch {
      /* unreachable, timed out, or blocked — move on */
    } finally {
      await sleep(1000);
    }
  }
  return "";
}

async function main() {
  const args = process.argv.slice(2);
  const wantEmails = args.includes("--emails");
  const useGoogle = args.includes("--google");
  const apiKey = process.env.PLACES_API_KEY;
  const named = args.filter((a) => !a.startsWith("--")).map((a) => a.toLowerCase());
  const cities = named.length ? CITIES.filter((c) => named.includes(c.key)) : CITIES;

  if (useGoogle && !apiKey) {
    console.error("  --google needs PLACES_API_KEY in the environment.\n");
    console.error("  PowerShell:  $env:PLACES_API_KEY = 'your-key'");
    console.error("  Bash:        export PLACES_API_KEY=your-key\n");
    process.exit(1);
  }

  const source = useGoogle ? "google" : "osm";

  if (cities.length === 0) {
    console.error(`No matching city. Available: ${CITIES.map((c) => c.key).join(", ")}`);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  let grandTotal = 0;
  let withEmail = 0;

  for (const city of cities) {
    process.stdout.write(`  ${city.name.padEnd(16)}`);
    let rows;
    try {
      if (useGoogle) {
        rows = await fetchCityGoogle(city, apiKey);
      } else {
        const elements = await fetchCity(city);
        const seen = new Set();
        rows = [];
        for (const el of elements) {
          const row = toRow(el, city);
          if (!row) continue;
          const key = row.business.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          rows.push(row);
        }
      }
    } catch (error) {
      console.log(`failed — ${error.message}`);
      await sleep(3000);
      continue;
    }

    if (wantEmails) {
      for (const row of rows) {
        if (row.email || !row.website) continue;
        row.email = await findEmail(row.website);
      }
    }

    const usable = rows.filter((r) => r.email);
    grandTotal += rows.length;
    withEmail += usable.length;

    const headers = ["email", "FIRSTNAME", "business", "city", "state", "title", "website", "phone"];
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => csvEscape(r[h])).join(",")),
    ].join("\n");

    const file = path.join(OUT_DIR, `${source}-${city.key}.csv`);
    await writeFile(file, csv + "\n", "utf8");

    console.log(`${String(rows.length).padStart(4)} found  ${String(usable.length).padStart(4)} with email`);

    // Overpass is a donated public service. Do not hammer it.
    await sleep(3000);
  }

  console.log(`\n  ${grandTotal} businesses, ${withEmail} with an email address.`);
  if (!wantEmails) {
    console.log(`  Re-run with --emails to look up published addresses (slow).`);
  }
  console.log(`\n  Next: node scripts/prepare-list.mjs data/leads/osm-*.csv --out data/leads/send-osm.csv\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
