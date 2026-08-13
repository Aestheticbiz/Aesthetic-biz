/**
 * Prepare a batch of clinics for audit: capture both screenshots and pull the
 * homepage text into one file.
 *
 *   node scripts/prep-batch.mjs data/leads/friday-batch.json
 *
 * The text extract is the cheap half of the evidence — headline wording,
 * treatments, location, offers and navigation all come out of it, and reading
 * it costs a fraction of what reading a screenshot costs. Screenshots are still
 * required for anything about layout: what is cut off, covered, or off-screen.
 *
 * Failures are recorded rather than thrown, so one unreachable site does not
 * stop the batch. Anything listed as failed here needs a decision before it is
 * audited — a site we cannot see is a site we must not write about.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const listPath = process.argv[2];
if (!listPath) {
  console.error("Usage: node scripts/prep-batch.mjs <batch.json>");
  process.exit(1);
}

function textOf(html) {
  const head = {};
  head.title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [])[1]?.trim() ?? "";
  head.description =
    (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i) ?? [])[1] ?? "";
  head.viewport = /<meta[^>]*name=["']viewport["']/i.test(html) ? "present" : "MISSING";

  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&rsquo;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  return { ...head, body: body.slice(0, 1800) };
}

async function main() {
  const clinics = JSON.parse(await readFile(listPath, "utf8"));
  const notes = [];
  const failed = [];

  for (const c of clinics) {
    const dir = `audits/${c.slug}/images`;
    await mkdir(dir, { recursive: true });

    let shots = 0;
    for (const [name, w, h, s] of [
      ["audited-mobile.jpg", 390, 844, 2],
      ["audited-desktop.jpg", 1366, 768, 1.5],
    ]) {
      try {
        await run("node", ["scripts/capture-site.mjs", c.site, `${dir}/${name}`, w, h, s], {
          timeout: 120000,
        });
        shots += 1;
      } catch {
        /* recorded below */
      }
    }

    let extract = null;
    try {
      const res = await fetch(c.site, { headers: { "User-Agent": UA } });
      extract = textOf(await res.text());
      extract.status = res.status;
    } catch (error) {
      extract = { error: error.message };
    }

    if (shots < 2 || extract.error) {
      failed.push(`${c.slug} (shots ${shots}/2${extract.error ? ", text failed" : ""})`);
    }

    notes.push({ ...c, shots, ...extract });
    console.log(`  ${shots === 2 && !extract.error ? "✓" : "✗"} ${c.slug}  shots ${shots}/2`);
  }

  await writeFile("data/leads/friday-evidence.json", JSON.stringify(notes, null, 1), "utf8");
  console.log(`\n  Wrote data/leads/friday-evidence.json`);
  if (failed.length) console.log(`  Needs a decision before auditing:\n   - ${failed.join("\n   - ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
