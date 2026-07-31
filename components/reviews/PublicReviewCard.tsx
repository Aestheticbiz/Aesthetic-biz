import ReviewTestimonialCard, {
  displayReviewToTestimonial,
} from "@/components/reviews/ReviewTestimonialCard";
import type { DisplayReview } from "@/lib/reviews/types";

export default function PublicReviewCard({
  review,
  showStructured = true,
  className = "",
}: {
  review: DisplayReview;
  showStructured?: boolean;
  className?: string;
}) {
  return (
    <ReviewTestimonialCard
      {...displayReviewToTestimonial(review)}
      showStructured={showStructured}
      className={className}
    />
  );
}
