import Link from "next/link";
import type { Treatment } from "@/lib/catalog";
import { ProductMedia } from "@/components/ui/image-placeholder";

export default function TreatmentCardGrid({
  treatments,
  headingLevel = "h2",
}: {
  treatments: Treatment[];
  headingLevel?: "h1" | "h2";
}) {
  const HeadingTag = headingLevel;
  return (
    <>
      <div className="star-hub-header">
        <div>
          <div className="rule">
            <span />
            <span className="star-overline" style={{ margin: 0 }}>
              Our Treatments
            </span>
          </div>
          <HeadingTag className="star-h1" style={{ marginBottom: 0 }}>
            Medical Aesthetic
            <br />
            Excellence
          </HeadingTag>
        </div>
        <p className="star-prose" style={{ maxWidth: 280, margin: 0 }}>
          Doctor-led pathways with clear pricing, downtime guidance, and home-care products on every
          detail page.
        </p>
      </div>

      <div className="star-rec-grid">
        {treatments.map((t) => (
          <Link
            key={t.slug}
            href={`/treatments/${t.slug}`}
            className="star-product-card star-treatment-card"
          >
            <div className="img-wrap">
              <ProductMedia src={t.image} alt={t.alt} aspect="4 / 3" />
              <div className="hover-bar">Read More</div>
            </div>
            <div className="body">
              <p className="brand">{t.category}</p>
              <h3>{t.name}</h3>
              <p className="price">{t.priceFrom}</p>
            </div>
            <div className="star-points-bar">
              <span aria-hidden="true">★</span>
              <span>Earn AestheticBiz Points</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
