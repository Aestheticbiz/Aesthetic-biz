/**
 * Starts a new audit folder from this master.
 *
 *   node audit-master/new-audit.mjs bella-med-spa
 *
 * Creates audits-short/<slug>/ with everything needed, leaving the master
 * untouched. Screenshots come across as placeholders so the folder renders
 * immediately — replace them before sending.
 */

import { cp, mkdir, access, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: node audit-master/new-audit.mjs <slug>");
  console.error("  slug: lowercase letters, numbers and hyphens, e.g. bella-med-spa");
  process.exit(1);
}

// fileURLToPath decodes %20; hand-parsing import.meta.url does not, which
// breaks on paths like "Local Sites".
const master = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(master, "..");
const dest = path.join(root, "audits-short", slug);

try {
  await access(dest);
  const existing = await readdir(dest);
  console.error(`\n  audits-short/${slug} already exists (${existing.length} files). Delete it first, or pick another slug.\n`);
  process.exit(1);
} catch {
  /* good — it does not exist yet */
}

await mkdir(dest, { recursive: true });

// The hosted files, the data, and the build helper. The instructions and
// README stay in the master; they are not per-practice.
for (const f of ["index.html", "styles.css", "app.js", "audit-data.js", "build.mjs"]) {
  await cp(path.join(master, f), path.join(dest, f));
}
await cp(path.join(master, "images"), path.join(dest, "images"), { recursive: true });

console.log(`
  Created audits-short/${slug}

  1. Edit audits-short/${slug}/audit-data.js   (follow audit-master/CLAUDE-AUDIT-SCRIPT.md)
  2. Replace images/audited-desktop.jpg and images/audited-mobile.jpg
  3. cd audits-short/${slug} && node build.mjs
  4. Open index.html and email.html and read them both
  5. Upload index.html styles.css app.js audit-data.js images/ and the PDF
`);
