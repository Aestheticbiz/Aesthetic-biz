/**
 * Finishes an audit folder once audit.json + outreach-email.txt exist.
 *
 *   node scripts/finish-audit.mjs <slug> [<slug> ...]
 *
 * Fills the [PRIVATE AUDIT LINK] placeholder with the slug's real report URL,
 * then runs render-audit -> render-email -> build-audit for each slug and
 * verifies the output actually mentions this clinic and not the reference one.
 *
 * Exists because the placeholder-and-three-scripts dance is identical for every
 * clinic, and doing it by hand is where the batch stalls.
 */

import { readFile, writeFile, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error("Usage: node scripts/finish-audit.mjs <slug> [<slug> ...]");
  process.exit(1);
}

const run = (script, slug) =>
  execFileSync("node", [path.join("scripts", script), slug], {
    stdio: ["ignore", "inherit", "inherit"],
  });

// Every report references these four alongside its own two screenshots. A
// capture run only produces the screenshots, so without this the zip ships with
// four broken images in the sections that carry the pitch.
const SHARED_IMAGES = [
  "aestheticbiz-demo.jpg",
  "booking-online.webp",
  "ignatius-ackermann.webp",
  "star-aesthetic-portfolio.jpg",
];
const SHARED_FROM = path.join("audits", "anew-you-medical-aesthetics", "images");

const results = [];

for (const slug of slugs) {
  const dir = path.join("audits", slug);
  const emailTxt = path.join(dir, "outreach-email.txt");
  const auditJson = path.join(dir, "audit.json");

  console.log(`\n=== ${slug} ===`);

  if (!existsSync(auditJson) || !existsSync(emailTxt)) {
    console.log("  ✗ SKIP — audit.json or outreach-email.txt missing");
    results.push({ slug, ok: false, why: "inputs missing" });
    continue;
  }

  try {
    // 1. Placeholder -> real report URL.
    const txt = await readFile(emailTxt, "utf8");
    const url = `https://audit.aestheticbiz.site/${slug}/`;
    if (txt.includes("[PRIVATE AUDIT LINK]")) {
      await writeFile(emailTxt, txt.replaceAll("[PRIVATE AUDIT LINK]", url));
      console.log(`  ✓ LINK  ${url}`);
    }

    // 2. Make sure the shared brand images are present before zipping.
    for (const img of SHARED_IMAGES) {
      const dest = path.join(dir, "images", img);
      if (!existsSync(dest)) await cp(path.join(SHARED_FROM, img), dest);
    }

    // 3. Render + build.
    run("render-audit.mjs", slug);
    run("render-email.mjs", slug);
    run("build-audit.mjs", slug);

    // 4. Verify: the report must name this clinic, must not carry the
    //    reference clinic's name, and must ship every image it references.
    const html = await readFile(path.join(dir, "index.html"), "utf8");
    const data = JSON.parse(await readFile(auditJson, "utf8"));
    const name = data.clinic ?? "";
    // The renderer escapes &, <, > — compare against the escaped form or any
    // clinic whose name contains an ampersand reads as a false failure.
    const escape = (s) =>
      s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const namedHere =
      Boolean(name) &&
      (html.includes(name) || html.includes(escape(name))) &&
      html.includes(data.domain);
    const leaked = /anew[- ]?you/i.test(html);
    const hasZip = existsSync(path.join("audits", `${slug}.zip`));

    // Every image the report asks for must actually be on disk, or the live
    // page shows a broken box where the evidence should be.
    const referenced = [...new Set(html.match(/images\/[A-Za-z0-9._-]+/g) ?? [])];
    const brokenImgs = referenced.filter(
      (rel) => !existsSync(path.join(dir, rel.replace("/", path.sep))),
    );

    const ok = Boolean(namedHere && !leaked && hasZip && brokenImgs.length === 0);
    console.log(
      `  ${ok ? "✓ PASS" : "✗ FAIL"}  name="${name}" inHtml=${namedHere} refLeak=${leaked} zip=${hasZip} imgs=${referenced.length - brokenImgs.length}/${referenced.length}`,
    );
    if (brokenImgs.length) console.log(`         missing: ${brokenImgs.join(", ")}`);
    results.push({ slug, ok, name, namedHere, leaked, hasZip, brokenImgs });
  } catch (err) {
    console.log(`  ✗ FAIL — ${err.message.split("\n")[0]}`);
    results.push({ slug, ok: false, why: err.message.split("\n")[0] });
  }
}

console.log("\n──────── SUMMARY ────────");
for (const r of results) {
  console.log(`  ${r.ok ? "PASS" : "FAIL"}  ${r.slug}${r.why ? ` — ${r.why}` : ""}`);
}
const passed = results.filter((r) => r.ok).length;
console.log(`\n  ${passed}/${results.length} ready to upload\n`);
