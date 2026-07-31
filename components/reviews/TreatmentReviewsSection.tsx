import Link from "next/link";
import PublicReviewCard from "@/components/reviews/PublicReviewCard";
import type { ReviewBlock } from "@/lib/reviews/types";

export default function TreatmentReviewsSection({
  treatmentName,
  treatmentSlug,
  reviewBlock,
}: {
  treatmentName: string;
  treatmentSlug: string;
  reviewBlock: ReviewBlock;
}) {
  const submitHref = `/submit-review?subject=${encodeURIComponent(treatmentName)}`;
  const cards = reviewBlock.reviews.slice(0, 3);

  return (
    <section className="star-rec rev-treatment-block" id="patient-reviews">
      <div className="star-shell">
        <p className="star-overline">Patient reviews</p>
        <div className="rev-treatment-head">
          <div>
            <h2 className="star-h2">What patients say about {treatmentName}</h2>
            <p className="star-prose" style={{ maxWidth: 560 }}>
              {reviewBlock.total_reviews > 0
                ? `${reviewBlock.average_rating.toFixed(1)}★ average from ${reviewBlock.total_reviews} review${reviewBlock.total_reviews === 1 ? "" : "s"}`
                : "Be the first to share your experience with this treatment."}
            </p>
          </div>
          <Link href={submitHref} className="star-btn star-btn-accent">
            Leave a review →
          </Link>
        </div>

        {cards.length > 0 ? (
          <div className="rev-grid" style={{ marginTop: 28 }}>
            {cards.map((review) => (
              <PublicReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : null}

        <div className="rev-submit-panel">
          <div>
            <h3>Had this treatment?</h3>
            <p>
              Share a written patient review or a short video. Your story helps Midtown patients
              choose with confidence — and shows prospects how AestheticBiz captures social proof.
            </p>
          </div>
          <div className="rev-submit-panel-actions">
            <Link href={submitHref} className="btn btn-navy">
              Submit your review →
            </Link>
            <Link
              href={`/reviews?section=treatments&product=${treatmentSlug}`}
              className="btn btn-outline-dark"
            >
              All {treatmentName} reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
