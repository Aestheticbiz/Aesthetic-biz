import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { PRODUCTS, TREATMENTS } from "@/lib/catalog";
import { DEFAULT_REVIEW_AVATAR } from "./constants";
import { buildReviewCatalog, type ReviewCatalog } from "./navigation";
import { REVIEW_SEED, type SeedReview } from "./seed-data";
import type { DisplayReview, ReviewAnswer, ReviewBlock, ReviewScope } from "./types";

type PendingReview = SeedReview & {
  email?: string;
  approved?: boolean;
  createdAt?: string;
  reviewBody?: string;
};

const dataDir = () => path.join(process.cwd(), "data");
const pendingPath = () => path.join(dataDir(), "pending-reviews.json");

function normalize(r: SeedReview, source: DisplayReview["source"]): DisplayReview {
  return {
    id: r.id,
    name: r.name,
    location: r.location,
    date: r.date,
    rating: r.rating,
    headline: r.headline,
    text: r.text,
    answers: r.answers,
    videoUrl: r.videoUrl,
    isVideo: Boolean(r.isVideo || r.videoUrl),
    productLabel: r.productLabel,
    treatmentSlug: r.treatmentSlug ?? null,
    productSlug: r.productSlug ?? null,
    scope: r.scope,
    avatarUrl: r.avatarUrl || DEFAULT_REVIEW_AVATAR,
    source,
  };
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function loadAllApprovedReviews(): Promise<DisplayReview[]> {
  // Bundled seed ships with the Next build (Vercel-safe). Pending submissions still come from disk.
  const pending = await readJson<PendingReview[]>(pendingPath(), []);
  const out: DisplayReview[] = [];
  const seen = new Set<string>();

  const pushUnique = (r: SeedReview, source: DisplayReview["source"]) => {
    if (seen.has(r.id)) return;
    seen.add(r.id);
    out.push(normalize(r, source));
  };

  for (const r of REVIEW_SEED.general) pushUnique(r, "seed");
  for (const list of Object.values(REVIEW_SEED.treatments)) {
    for (const r of list) pushUnique(r, "seed");
  }
  for (const list of Object.values(REVIEW_SEED.products)) {
    for (const r of list) pushUnique(r, "seed");
  }
  for (const r of REVIEW_SEED.videos) pushUnique(r, "seed");

  // Demo: show pending submissions immediately so the form feels live
  for (const r of pending) {
    if (r.approved === false) continue;
    pushUnique(r, "pending");
  }

  return out;
}

export async function getReviewCatalog(): Promise<ReviewCatalog> {
  const reviews = await loadAllApprovedReviews();
  const labels = new Map<string, string>();
  for (const t of TREATMENTS) labels.set(t.slug, t.name);
  for (const p of PRODUCTS) labels.set(p.slug, p.name);
  return buildReviewCatalog(reviews, labels);
}

export async function getReviewsForSlug(slug: string): Promise<ReviewBlock> {
  const all = await loadAllApprovedReviews();
  const reviews = all.filter(
    (r) => !r.isVideo && (r.treatmentSlug === slug || r.productSlug === slug),
  );
  const average_rating =
    reviews.length === 0
      ? 0
      : reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { average_rating, total_reviews: reviews.length, reviews };
}

export async function getFeaturedReviews(limit = 3): Promise<DisplayReview[]> {
  const all = await loadAllApprovedReviews();
  return all
    .filter((r) => !r.isVideo && r.text)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export type SubmitWrittenInput = {
  name: string;
  email: string;
  city: string;
  rating: number;
  headline: string;
  review: string;
  answers: ReviewAnswer[];
  subjectLabel: string;
  scope: ReviewScope;
  treatmentSlug: string | null;
  productSlug: string | null;
};

export async function saveWrittenReview(input: SubmitWrittenInput) {
  await mkdir(dataDir(), { recursive: true });
  const pending = await readJson<PendingReview[]>(pendingPath(), []);
  const now = new Date();
  const entry: PendingReview = {
    id: `pending-${now.getTime()}`,
    name: input.name.trim(),
    location: input.city.trim() || "Verified patient",
    date: now.toLocaleDateString("en-GB").replace(/\//g, "."),
    rating: input.rating,
    headline: input.headline.trim(),
    text: input.review.trim(),
    answers: input.answers,
    scope: input.scope,
    treatmentSlug: input.treatmentSlug,
    productSlug: input.productSlug,
    productLabel: input.subjectLabel,
    email: input.email.trim(),
    approved: true,
    createdAt: now.toISOString(),
    reviewBody: input.review,
  };
  pending.unshift(entry);
  await writeFile(pendingPath(), JSON.stringify(pending, null, 2), "utf8");
  return entry;
}

export type SubmitVideoInput = {
  name: string;
  email: string;
  city?: string;
  subjectLabel: string;
  scope: ReviewScope;
  treatmentSlug: string | null;
  productSlug: string | null;
  videoUrl: string;
};

export async function saveVideoReview(input: SubmitVideoInput) {
  await mkdir(dataDir(), { recursive: true });
  const pending = await readJson<PendingReview[]>(pendingPath(), []);
  const now = new Date();
  const entry: PendingReview = {
    id: `pending-vid-${now.getTime()}`,
    name: input.name.trim(),
    location: input.city?.trim() || "Verified patient",
    date: now.toLocaleDateString("en-GB").replace(/\//g, "."),
    rating: 5,
    headline: `Video review — ${input.subjectLabel}`,
    videoUrl: input.videoUrl,
    isVideo: true,
    scope: input.scope,
    treatmentSlug: input.treatmentSlug,
    productSlug: input.productSlug,
    productLabel: `${input.subjectLabel} · Video review`,
    email: input.email.trim(),
    approved: true,
    createdAt: now.toISOString(),
  };
  pending.unshift(entry);
  await writeFile(pendingPath(), JSON.stringify(pending, null, 2), "utf8");
  return entry;
}
