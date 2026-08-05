/**
 * Turns a raw lead export (Apollo, Orbital, a scrape, anything with an email
 * column) into a phpList-ready import file — and refuses to let the faults
 * that were in the first test batch through silently.
 *
 *   node scripts/prepare-list.mjs data/leads/raw-export.csv
 *   node scripts/prepare-list.mjs data/leads/raw-export.csv --keep-role-accounts
 *
 * Writes <input>.phplist.csv beside the input and prints a quality report.
 * Nothing in data/leads is committed — it is gitignored.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROLE_PREFIXES = [
  "info", "office", "admin", "contact", "hello", "enquiries", "enquiry",
  "reception", "frontdesk", "front.desk", "officemanager", "bookings",
  "appointments", "support", "sales", "team", "mail", "clinic", "spa",
];

/** Words that mean a "first name" field is really a business name. */
const BUSINESS_WORDS = [
  "clinic", "medspa", "med spa", "aesthetic", "aesthetics", "spa", "centre",
  "center", "laser", "skin", "beauty", "wellness", "institute", "llc", "inc",
  "ltd", "group", "studio", "lounge", "co.", "&",
];

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else quoted = !quoted;
    } else if (ch === "," && !quoted) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((v) => v.trim());
}

function csvEscape(value) {
  const str = String(value ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

/** Finds a column by any of several likely header names. */
function pick(headers, ...candidates) {
  const lower = headers.map((h) => h.toLowerCase().replace(/[^a-z]/g, ""));
  for (const candidate of candidates) {
    const idx = lower.indexOf(candidate.toLowerCase().replace(/[^a-z]/g, ""));
    if (idx !== -1) return idx;
  }
  return -1;
}

function looksLikeBusinessName(value) {
  if (!value) return false;
  const lower = value.toLowerCase();
  if (BUSINESS_WORDS.some((w) => lower.includes(w))) return true;
  // Real first names are one word. "Monaco MedSpa" is not a first name.
  return value.trim().split(/\s+/).length > 1;
}

function isRoleAccount(email) {
  const local = email.split("@")[0].toLowerCase();
  return ROLE_PREFIXES.some((p) => local === p || local.startsWith(`${p}.`) || local.startsWith(`${p}-`));
}

async function main() {
  const input = process.argv[2];
  const keepRole = process.argv.includes("--keep-role-accounts");

  if (!input) {
    console.error("Usage: node scripts/prepare-list.mjs <input.csv> [--keep-role-accounts]");
    process.exit(1);
  }

  const raw = await readFile(input, "utf8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const headers = splitCsvLine(lines[0]);

  const cols = {
    email: pick(headers, "email", "emailaddress", "workemail", "primaryemail"),
    first: pick(headers, "firstname", "first", "givenname", "contactfirstname"),
    last: pick(headers, "lastname", "last", "surname", "familyname"),
    full: pick(headers, "name", "fullname", "contactname"),
    business: pick(headers, "business", "company", "companyname", "organisation", "organization", "account"),
    city: pick(headers, "city", "town", "locality"),
    state: pick(headers, "state", "province", "region"),
    website: pick(headers, "website", "url", "domain", "companywebsite"),
    phone: pick(headers, "phone", "phonenumber", "telephone", "mobile"),
    title: pick(headers, "title", "jobtitle", "role", "position"),
  };

  if (cols.email === -1) {
    console.error(`No email column found. Headers were: ${headers.join(", ")}`);
    process.exit(1);
  }

  const seenEmail = new Set();
  const seenDomain = new Map();
  const rows = [];
  const stats = {
    total: 0,
    invalidEmail: 0,
    duplicateEmail: 0,
    extraPerClinic: 0,
    roleAccounts: 0,
    businessNameAsFirstName: 0,
    missingFirstName: 0,
    kept: 0,
  };

  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    stats.total += 1;

    const email = (cells[cols.email] ?? "").toLowerCase().trim();
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      stats.invalidEmail += 1;
      continue;
    }
    if (seenEmail.has(email)) {
      stats.duplicateEmail += 1;
      continue;
    }

    const role = isRoleAccount(email);
    if (role) stats.roleAccounts += 1;
    if (role && !keepRole) continue;

    // One contact per clinic. Three people at the same practice reads as a blast.
    const domain = email.split("@")[1];
    const perDomain = seenDomain.get(domain) ?? 0;
    if (perDomain >= 1) {
      stats.extraPerClinic += 1;
      continue;
    }

    // Work out a usable first name, or none at all — never a business name.
    let first = cols.first !== -1 ? (cells[cols.first] ?? "").trim() : "";
    if (!first && cols.full !== -1) first = (cells[cols.full] ?? "").trim().split(/\s+/)[0] ?? "";
    if (looksLikeBusinessName(first)) {
      stats.businessNameAsFirstName += 1;
      first = "";
    }
    if (!first) stats.missingFirstName += 1;

    seenEmail.add(email);
    seenDomain.set(domain, perDomain + 1);
    stats.kept += 1;

    rows.push({
      email,
      FIRSTNAME: first,
      business: cols.business !== -1 ? cells[cols.business] ?? "" : "",
      city: cols.city !== -1 ? cells[cols.city] ?? "" : "",
      state: cols.state !== -1 ? cells[cols.state] ?? "" : "",
      title: cols.title !== -1 ? cells[cols.title] ?? "" : "",
      website: cols.website !== -1 ? cells[cols.website] ?? "" : "",
      phone: cols.phone !== -1 ? cells[cols.phone] ?? "" : "",
    });
  }

  const outHeaders = ["email", "FIRSTNAME", "business", "city", "state", "title", "website", "phone"];
  const out = [
    outHeaders.join(","),
    ...rows.map((r) => outHeaders.map((h) => csvEscape(r[h])).join(",")),
  ].join("\n");

  const outPath = input.replace(/\.csv$/i, "") + ".phplist.csv";
  await writeFile(outPath, out + "\n", "utf8");

  const pct = (n) => (stats.total ? `${Math.round((n / stats.total) * 100)}%` : "0%");

  console.log(`\n  ${path.basename(input)} → ${path.basename(outPath)}\n`);
  console.log(`  rows in                     ${stats.total}`);
  console.log(`  invalid email               ${stats.invalidEmail}`);
  console.log(`  duplicate email             ${stats.duplicateEmail}`);
  console.log(`  extra contacts per clinic   ${stats.extraPerClinic}`);
  console.log(`  role accounts               ${stats.roleAccounts} (${pct(stats.roleAccounts)})${keepRole ? " — kept" : " — dropped"}`);
  console.log(`  business name in FIRSTNAME  ${stats.businessNameAsFirstName} (blanked)`);
  console.log(`  no usable first name        ${stats.missingFirstName}`);
  console.log(`\n  KEPT                        ${stats.kept}\n`);

  if (stats.kept < 750) {
    console.log(`  ⚠  ${stats.kept} contacts. The booking maths needs roughly 750–1,000`);
    console.log(`     for 5–10 discovery calls. Treat anything smaller as a test.\n`);
  }
  if (stats.roleAccounts / Math.max(stats.total, 1) > 0.5) {
    console.log(`  ⚠  Over half this list is reception inboxes. Those reach a`);
    console.log(`     receptionist, not the owner who can authorise US$10,000.\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
