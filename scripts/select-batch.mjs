/**
 * Pick the next N clinics to audit, from every lead file we hold.
 *
 *   node scripts/select-batch.mjs audits15 25
 *
 * Writes data/leads/<name>.json, ready for prep-batch.mjs.
 *
 * The lead files do not agree with each other: some are comma-delimited, one is
 * semicolons, some are quoted, some carry a BOM, and the column ORDER differs
 * between them — send-full.csv puts business before city, the batch files put
 * it after. So columns are matched by header name, never by position. Parsing
 * these positionally silently produces a website column full of city names.
 *
 * Exclusions come from two places: the domain in every finished audit.json, and
 * every clinic in a batch that has been selected but not yet written. Miss the
 * second and you hand back the same 25 clinics you picked yesterday.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const LEADS = "data/leads";

const name = process.argv[2];
const want = Number(process.argv[3] ?? 25);

if (!name) {
  console.error("Usage: node scripts/select-batch.mjs <batch-name> [count]");
  process.exit(1);
}

const norm = (url) =>
  String(url || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0]
    .toLowerCase();

const clean = (s) => String(s ?? "").replace(/^﻿/, "").replace(/^"|"$/g, "").trim();

/** Split on whichever delimiter the header actually uses. */
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (!lines.length) return [];

  const header = clean(lines[0]);
  const delim = (header.match(/;/g)?.length ?? 0) > (header.match(/,/g)?.length ?? 0) ? ";" : ",";
  const cols = header.split(delim).map((c) => clean(c).toLowerCase());

  return lines.slice(1).map((line) => {
    const cells = line.split(delim);
    const row = {};
    cols.forEach((c, i) => {
      row[c] = clean(cells[i]);
    });
    return row;
  });
}

async function excluded() {
  const out = new Set([
    // Reviewed and deliberately not pursued.
    "belangemedspa.com", // audited before the JSON pipeline, so it has no audit.json
    "bodypreserve.com",
    "thebeautyspot.com",
    "manhattan-medspa.com",
  ]);

  for (const dir of await readdir("audits", { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name.startsWith("_")) continue;
    const p = path.join("audits", dir.name, "audit.json");
    if (!existsSync(p)) continue;
    try {
      out.add(norm(JSON.parse(await readFile(p, "utf8")).domain));
    } catch {
      /* unreadable audit.json — skip rather than stop the batch */
    }
  }

  // Batches already chosen but not yet written up.
  for (const f of await readdir(LEADS)) {
    if (!f.endsWith(".json") || f.endsWith("-evidence.json")) continue;
    try {
      const rows = JSON.parse(await readFile(path.join(LEADS, f), "utf8"));
      if (Array.isArray(rows)) rows.forEach((r) => out.add(norm(r.site)));
    } catch {
      /* not a batch file */
    }
  }

  out.delete("");
  return out;
}

async function main() {
  const skip = await excluded();
  const seen = new Set();
  const picked = [];

  const files = (await readdir(LEADS)).filter((f) => f.endsWith(".csv"));

  for (const file of files) {
    const rows = parseCsv(await readFile(path.join(LEADS, file), "utf8"));

    for (const r of rows) {
      if (picked.length >= want) break;

      const site = r.website;
      if (!site || !/^https?:/i.test(site)) continue;
      if (/facebook|instagram|linktr|wixsite|godaddysites|square\.site/i.test(site)) continue;

      const host = norm(site);
      if (!host || skip.has(host) || seen.has(host)) continue;
      seen.add(host);

      picked.push({
        slug: host.replace(/\.[a-z.]+$/, "").replace(/[^a-z0-9]+/g, "-"),
        site,
        email: r.email,
        biz: r.business,
        city: r.city,
        state: r.state,
        fn: r.firstname,
        source: file,
      });
    }
    if (picked.length >= want) break;
  }

  await writeFile(path.join(LEADS, `${name}.json`), JSON.stringify(picked, null, 1), "utf8");

  console.log(`  ${picked.length}/${want} selected — ${skip.size} domains excluded\n`);
  picked.forEach((p, i) =>
    console.log(
      `  ${String(i + 1).padStart(2)}. ${(p.biz || p.slug).slice(0, 34).padEnd(35)}${((p.city || "") + ", " + (p.state || "")).padEnd(22)}${p.email}`,
    ),
  );
  if (picked.length < want) console.log(`\n  Short by ${want - picked.length} — the lead files are running low.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
