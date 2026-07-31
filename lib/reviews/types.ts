export type ReviewScope = "general" | "treatment" | "product";

export type ReviewAnswer = {
  question: string;
  answer: string;
};

export type DisplayReview = {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  headline?: string;
  text?: string;
  answers?: ReviewAnswer[];
  videoUrl?: string;
  isVideo?: boolean;
  productLabel?: string;
  treatmentSlug?: string | null;
  productSlug?: string | null;
  scope: ReviewScope;
  avatarUrl?: string;
  source: "seed" | "pending" | "db";
};

export type ReviewBlock = {
  average_rating: number;
  total_reviews: number;
  reviews: DisplayReview[];
};

export type ReviewProductOption = {
  label: string;
  slug: string | null;
  scope: ReviewScope;
  categoryLabel: string;
};
