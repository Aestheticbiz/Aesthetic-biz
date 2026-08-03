import type { DisplayReview } from "./types";

export type ReviewSectionId =
  | "general"
  | "treatments"
  | "skincare"
  | "videos";

export type ReviewSection = {
  id: ReviewSectionId;
  label: string;
  description: string;
};

export const REVIEW_SECTIONS: ReviewSection[] = [
  {
    id: "general",
    label: "Clinic experience",
    description: "Overall care, consult quality, and Midtown studio experience.",
  },
  {
    id: "treatments",
    label: "Treatments",
    description: "Patient reviews tied to acne, pigment, injectables, wellness and more.",
  },
  {
    id: "skincare",
    label: "Skincare",
    description: "Demo Clinical retail — what patients say about home-care routines.",
  },
  {
    id: "videos",
    label: "Video reviews",
    description:
      "Short video stories. YouTube embeds below are labelled DEMO samples — not real AestheticBiz patients.",
  },
];

export type ReviewSubjectEntry = {
  slug: string;
  label: string;
  reviewCount: number;
  reviews: DisplayReview[];
};

export type ReviewCatalog = {
  general: DisplayReview[];
  videos: DisplayReview[];
  bySection: Map<ReviewSectionId, ReviewSubjectEntry[]>;
  bySlug: Map<string, DisplayReview[]>;
  totalReviewCount: number;
  averageRating: number;
};

export function reviewsHref(section: ReviewSectionId, product?: string) {
  const params = new URLSearchParams({ section });
  if (product) params.set("product", product);
  return `/reviews?${params.toString()}`;
}

export function buildReviewCatalog(
  reviews: DisplayReview[],
  subjectLabels: Map<string, string>,
): ReviewCatalog {
  const general: DisplayReview[] = [];
  const videos: DisplayReview[] = [];
  const bySlug = new Map<string, DisplayReview[]>();

  for (const r of reviews) {
    if (r.isVideo) videos.push(r);
    if (r.scope === "general" && !r.isVideo) general.push(r);

    const slug = r.treatmentSlug || r.productSlug;
    if (slug && !r.isVideo) {
      const list = bySlug.get(slug) ?? [];
      list.push(r);
      bySlug.set(slug, list);
    }
  }

  const treatmentEntries: ReviewSubjectEntry[] = [];
  const skincareEntries: ReviewSubjectEntry[] = [];

  for (const [slug, list] of bySlug) {
    const entry: ReviewSubjectEntry = {
      slug,
      label: subjectLabels.get(slug) ?? slug,
      reviewCount: list.length,
      reviews: list,
    };
    if (list[0]?.scope === "product") skincareEntries.push(entry);
    else treatmentEntries.push(entry);
  }

  treatmentEntries.sort((a, b) => b.reviewCount - a.reviewCount);
  skincareEntries.sort((a, b) => b.reviewCount - a.reviewCount);

  const bySection = new Map<ReviewSectionId, ReviewSubjectEntry[]>([
    ["treatments", treatmentEntries],
    ["skincare", skincareEntries],
    ["general", []],
    ["videos", []],
  ]);

  const rated = reviews.filter((r) => !r.isVideo || r.rating);
  const averageRating =
    rated.length === 0
      ? 0
      : rated.reduce((s, r) => s + r.rating, 0) / rated.length;

  return {
    general,
    videos,
    bySection,
    bySlug,
    totalReviewCount: reviews.length,
    averageRating,
  };
}

export function resolveDefaultSection(catalog: ReviewCatalog): ReviewSectionId {
  if (catalog.general.length) return "general";
  if ((catalog.bySection.get("treatments") ?? []).length) return "treatments";
  if ((catalog.bySection.get("skincare") ?? []).length) return "skincare";
  if (catalog.videos.length) return "videos";
  return "general";
}
