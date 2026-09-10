/**
 * new-demo.mjs — scaffold a new practice demo from _template.
 *
 *     node new-demo.mjs bella-med-spa "Bella Med Spa & Aesthetics"
 *
 * Copies the template, stamps the name into demo-data.js, and stops.
 * It deliberately does NOT invent content: everything else you fill in
 * by hand from their own site, then run `node build.mjs` in the folder.
 *
 * Paths here contain a space ("Local Sites") — use fileURLToPath, never
 * a hand-built file:/// URL.
 */
import { cp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const [slug, ...nameParts] = process.argv.slice(2);
const name = nameParts.join(' ');

if (!slug || !name) {
  console.error('Usage: node new-demo.mjs <slug> "<Practice Name>"');
  console.error('   eg: node new-demo.mjs ageless-medspa "Ageless MedSpa"');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Slug must be lowercase letters, digits and hyphens only.');
  process.exit(1);
}

const dest = path.join(here, slug);
try {
  await access(dest);
  console.error(`${slug}/ already exists. Refusing to overwrite it.`);
  process.exit(1);
} catch { /* good — it does not exist */ }

await cp(path.join(here, '_template'), dest, { recursive: true });
await mkdir(path.join(dest, 'assets'), { recursive: true });

/* Stamp the name so the first build produces something coherent. */
const dataPath = path.join(dest, 'demo-data.js');
let data = await readFile(dataPath, 'utf8');
const short = name.split(/\s+/)[0];
data = data
  .replace("name: 'Bella Med Spa & Aesthetics',", `name: ${JSON.stringify(name)},`)
  .replace("shortName: 'Bella',", `shortName: ${JSON.stringify(short)},`);
await writeFile(dataPath, data, 'utf8');

/* package.json and netlify.toml both carry the template's name. Left alone
   they follow every new demo around, and the Base directory line in the
   toml is the one somebody reads while setting the Netlify project up. */
const pkgPath = path.join(dest, 'package.json');
const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
pkg.name = `${slug}-demo`;
pkg.description = `Talking demo page for ${name}. Static HTML; the only server-side piece is the Gemini ephemeral-token function.`;
await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}
`, 'utf8');

const tomlPath = path.join(dest, 'netlify.toml');
const toml = await readFile(tomlPath, 'utf8');
await writeFile(tomlPath, toml.replace(new RegExp('voice-demos[/][a-z0-9-]+', 'g'), `voice-demos/${slug}`), 'utf8');

console.log(`✓ ${slug}/ created for "${name}"`);
console.log('');
console.log('Next, in order:');
console.log(`  1. put their real logo, hero and treatment images in ${slug}/assets/`);
console.log(`     (logo-dark.webp, logo-light.webp, hero-*.webp, svc-*.webp)`);
console.log(`  2. fill in ${slug}/demo-data.js — every field, no invented facts`);
console.log('     · brand.hue / brand.saturation from their logo colour');
console.log('     · sections: turn off anything they cannot fill');
console.log(`  3. cd ${slug} && node build.mjs`);
console.log('  4. open index.html and walk the ten gates in RULES.md');
