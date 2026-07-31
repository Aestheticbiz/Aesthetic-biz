import Link from "next/link";
import PublicReviewCard from "@/components/reviews/PublicReviewCard";
import {
  REVIEW_SECTIONS,
  reviewsHref,
  type ReviewCatalog,
  type ReviewSectionId,
  type ReviewSubjectEntry,
} from "@/lib/reviews/navigation";

export type SubjectSpotlight = {
  slug: string;
  name: string;
  image: string | null;
  description: string;
};

export default function ReviewsSectionContent({
  catalog,
  section,
  productSlug,
  spotlight,
  subjectMeta,
}: {
  catalog: ReviewCatalog;
  section: ReviewSectionId;
  productSlug?: string;
  spotlight?: SubjectSpotlight | null;
  subjectMeta?: Map<string, SubjectSpotlight>;
}) {
  const sectionConfig = REVIEW_SECTIONS.find((s) => s.id === section)!;

  if (section === "general") {
    return (
      <div>
        <header className="rev-section-head">
          <p className="eyebrow">Service &amp; care</p>
          <h2 className="section-title">{sectionConfig.label}</h2>
          <p className="section-lead">{sectionConfig.description}</p>
        </header>
        {catalog.general.length === 0 ? (
          <p className="rev-empty">No general clinic reviews yet.</p>
        ) : (
          <div className="rev-grid">
            {catalog.general.map((review) => (
              <PublicReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (section === "videos") {
    return (
      <div>
        <header className="rev-section-head">
          <p className="eyebrow">Video stories</p>
          <h2 className="section-title">{sectionConfig.label}</h2>
          <p className="section-lead">{sectionConfig.description}</p>
        </header>
        {catalog.videos.length === 0 ? (
          <p className="rev-empty">No video reviews yet.</p>
        ) : (
          <div className="rev-grid">
            {catalog.videos.map((review) => (
              <PublicReviewCard key={review.id} review={review} showStructured={false} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const products = catalog.bySection.get(section) ?? [];

  if (!productSlug) {
    return (
      <SubjectPicker
        sectionId={section}
        products={products}
        sectionLabel={sectionConfig.label}
        subjectMeta={subjectMeta}
      />
    );
  }

  const entry = products.find((p) => p.slug === productSlug);
  const reviews = entry?.reviews ?? catalog.bySlug.get(productSlug) ?? [];

  return (
    <div>
      {spotlight ? (
        <div className="rev-spotlight">
          {spotlight.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={spotlight.image} alt={spotlight.name} />
          ) : null}
          <div>
            <p className="eyebrow">
              {section === "treatments" ? "Treatment reviews" : "Product reviews"}
            </p>
            <h2 className="section-title">{spotlight.name}</h2>
            <p className="section-lead">{spotlight.description}</p>
            <p className="rev-avg">
              {reviews.length
                ? `${(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}★ · ${reviews.length} reviews`
                : "No reviews yet"}
            </p>
          </div>
        </div>
      ) : null}

      {products.length > 1 ? (
        <div className="rev-subject-chips">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={reviewsHref(section, p.slug)}
              className={p.slug === productSlug ? "active" : undefined}
            >
              {subjectMeta?.get(p.slug)?.name ?? p.label}
            </Link>
          ))}
        </div>
      ) : null}

      {reviews.length === 0 ? (
        <p className="rev-empty">
          No reviews for this item yet.{" "}
          <Link href={`/submit-review?subject=${encodeURIComponent(spotlight?.name ?? "")}`}>
            Be the first →
          </Link>
        </p>
      ) : (
        <div className="rev-grid">
          {reviews.map((review) => (
            <PublicReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubjectPicker({
  sectionId,
  products,
  sectionLabel,
  subjectMeta,
}: {
  sectionId: ReviewSectionId;
  products: ReviewSubjectEntry[];
  sectionLabel: string;
  subjectMeta?: Map<string, SubjectSpotlight>;
}) {
  if (products.length === 0) {
    return <p className="rev-empty">No reviews in {sectionLabel.toLowerCase()} yet.</p>;
  }

  return (
    <div>
      <header className="rev-section-head">
        <p className="eyebrow">Choose one</p>
        <h2 className="section-title">{sectionLabel}</h2>
        <p className="section-lead">Select a treatment or product to read patient reviews.</p>
      </header>
      <div className="rev-picker-grid">
        {products.map((product) => {
          const meta = subjectMeta?.get(product.slug);
          return (
            <Link
              key={product.slug}
              href={reviewsHref(sectionId, product.slug)}
              className="rev-picker-card"
            >
              {meta?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.image} alt="" />
              ) : (
                <div className="rev-picker-ph" />
              )}
              <div>
                <span>
                  {product.reviewCount} review{product.reviewCount === 1 ? "" : "s"}
                </span>
                <h3>{meta?.name ?? product.label}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
