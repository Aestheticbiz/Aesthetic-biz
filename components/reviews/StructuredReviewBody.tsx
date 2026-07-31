import type { ReviewAnswer } from "@/lib/reviews/types";

export default function StructuredReviewBody({
  answers,
  compact = false,
}: {
  answers: ReviewAnswer[];
  compact?: boolean;
}) {
  return (
    <div className={`review-structured${compact ? " compact" : ""}`}>
      {answers.map((a) => (
        <div key={a.question} className="review-structured-item">
          <p className="q">{a.question}</p>
          <p className="a">{a.answer}</p>
        </div>
      ))}
    </div>
  );
}
