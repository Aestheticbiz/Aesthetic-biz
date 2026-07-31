import StructuredReviewBody from "@/components/reviews/StructuredReviewBody";
import { DEFAULT_REVIEW_AVATAR } from "@/lib/reviews/constants";
import type { DisplayReview, ReviewAnswer } from "@/lib/reviews/types";

export type TestimonialCardProps = {
  name: string;
  location?: string;
  tagLine?: string;
  avatarUrl?: string;
  rating?: number;
  headline?: string;
  quote?: string;
  text?: string;
  answers?: ReviewAnswer[];
  videoUrl?: string;
  isVideo?: boolean;
  showStructured?: boolean;
  className?: string;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="rev-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "on" : ""}>
          ★
        </span>
      ))}
    </div>
  );
}

export function displayReviewToTestimonial(review: DisplayReview): TestimonialCardProps {
  return {
    name: review.name,
    location: review.location,
    tagLine: review.productLabel || (review.date ? `Patient · ${review.date}` : undefined),
    avatarUrl: review.avatarUrl,
    rating: review.rating,
    headline: review.headline,
    text: review.text,
    answers: review.answers,
    videoUrl: review.videoUrl,
    isVideo: review.isVideo,
  };
}

export default function ReviewTestimonialCard({
  name,
  location,
  tagLine,
  avatarUrl,
  rating = 5,
  headline,
  quote,
  text,
  answers,
  videoUrl,
  isVideo,
  showStructured = true,
  className = "",
}: TestimonialCardProps) {
  const bodyText = quote ?? text;
  const hasStructured = showStructured && answers && answers.length > 0;
  const avatarSrc = avatarUrl || DEFAULT_REVIEW_AVATAR;

  return (
    <article className={`rev-card ${className}`.trim()}>
      <div className="rev-card-top">
        <StarRow rating={rating} />
        {isVideo ? <span className="rev-video-badge">Video</span> : null}
      </div>

      {headline ? <h3 className="rev-headline">{headline}</h3> : null}

      {isVideo && videoUrl ? (
        <video src={videoUrl} controls playsInline className="rev-video" />
      ) : hasStructured ? (
        <StructuredReviewBody answers={answers!} compact />
      ) : bodyText ? (
        <blockquote className="rev-quote">&ldquo;{bodyText}&rdquo;</blockquote>
      ) : null}

      <footer className="rev-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarSrc} alt="" className="rev-avatar" />
        <div>
          <p className="rev-name">{name}</p>
          {location ? <p className="rev-meta">{location}</p> : null}
          {tagLine ? <p className="rev-tag">{tagLine}</p> : null}
        </div>
      </footer>
    </article>
  );
}
