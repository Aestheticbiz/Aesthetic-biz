import Link from "next/link";
import {
  REVIEW_SECTIONS,
  reviewsHref,
  type ReviewCatalog,
  type ReviewSectionId,
} from "@/lib/reviews/navigation";

export default function ReviewsCategoryNav({
  catalog,
  section,
  productSlug,
}: {
  catalog: ReviewCatalog;
  section: ReviewSectionId;
  productSlug?: string;
}) {
  return (
    <nav className="rev-nav" aria-label="Review categories">
      {REVIEW_SECTIONS.map((s) => {
        const count =
          s.id === "general"
            ? catalog.general.length
            : s.id === "videos"
              ? catalog.videos.length
              : (catalog.bySection.get(s.id) ?? []).reduce((n, p) => n + p.reviewCount, 0);

        const firstProduct =
          s.id === "treatments" || s.id === "skincare"
            ? catalog.bySection.get(s.id)?.[0]?.slug
            : undefined;

        const href = reviewsHref(s.id, firstProduct);
        const active = section === s.id;

        return (
          <Link
            key={s.id}
            href={href}
            className={active ? "active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            {s.label}
            <span>{count}</span>
          </Link>
        );
      })}
      {productSlug ? (
        <span className="rev-nav-current">· {productSlug.replace(/-/g, " ")}</span>
      ) : null}
    </nav>
  );
}
