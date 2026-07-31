import { PRODUCTS, TREATMENTS } from "@/lib/catalog";
import type { ReviewProductOption, ReviewScope } from "./types";

export type ReviewQuestion = {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
  minLength?: number;
  rows?: number;
};

export const REVIEW_QUESTIONS: ReviewQuestion[] = [
  {
    id: "visit_context",
    label: "What brought you to AestheticBiz?",
    placeholder: "e.g. Lip filler consult after researching Midtown options…",
    minLength: 20,
    rows: 2,
  },
  {
    id: "experience",
    label: "How was your experience with Dr. Hale and the team?",
    placeholder: "Consultation clarity, comfort during treatment, nurse support, aftercare…",
    hint: "Be specific — what stood out?",
    minLength: 40,
    rows: 4,
  },
  {
    id: "results",
    label: "How do you feel about your results so far?",
    placeholder: "Natural look, downtime, confidence, follow-up visits…",
    minLength: 30,
    rows: 4,
  },
  {
    id: "recommend",
    label: "Would you recommend AestheticBiz? Why?",
    placeholder: "Who would benefit most, and what would you tell a friend?",
    minLength: 25,
    rows: 3,
  },
];

export const VIDEO_PROMPTS = [
  "Introduce yourself and which treatment or product you’re reviewing",
  "What made you choose AestheticBiz / Dr. Hale?",
  "How do you feel about your results and the care you received?",
  "Would you recommend us — and to whom?",
];

export function getReviewSubjectOptions(): ReviewProductOption[] {
  const general: ReviewProductOption = {
    label: "General — clinic experience & care",
    slug: null,
    scope: "general",
    categoryLabel: "General",
  };

  const treatments = TREATMENTS.map((t) => ({
    label: t.name,
    slug: t.slug,
    scope: "treatment" as ReviewScope,
    categoryLabel: t.category,
  }));

  const products = PRODUCTS.map((p) => ({
    label: p.name,
    slug: p.slug,
    scope: "product" as ReviewScope,
    categoryLabel: "Skincare",
  }));

  return [general, ...treatments, ...products];
}

export function resolveSubjectOption(label: string): ReviewProductOption {
  return (
    getReviewSubjectOptions().find((o) => o.label === label) ?? {
      label,
      slug: null,
      scope: "general",
      categoryLabel: "General",
    }
  );
}

export function emptyAnswers(questions: ReviewQuestion[] = REVIEW_QUESTIONS) {
  return Object.fromEntries(questions.map((q) => [q.id, ""])) as Record<string, string>;
}

export function buildReviewAnswers(
  questions: ReviewQuestion[],
  answers: Record<string, string>,
) {
  return questions
    .map((q) => ({ question: q.label, answer: (answers[q.id] ?? "").trim() }))
    .filter((a) => a.answer.length > 0);
}

export function compileStructuredReview(
  questions: ReviewQuestion[],
  answers: Record<string, string>,
) {
  return questions
    .map((q) => {
      const a = (answers[q.id] ?? "").trim();
      return a ? `${q.label}\n${a}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

export function subjectField(option: ReviewProductOption) {
  if (option.scope === "general") return "[General] Clinic experience";
  return `[${option.categoryLabel}] ${option.label}`;
}
