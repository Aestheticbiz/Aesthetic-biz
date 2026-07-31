import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DefaultPreviewBar } from "@/components/preview-bar";
import ReviewsCategoryNav from "@/components/reviews/ReviewsCategoryNav";
import ReviewsSectionContent, {
  type SubjectSpotlight,
} from "@/components/reviews/ReviewsSectionContent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRODUCTS, TREATMENTS, productPrimaryImage } from "@/lib/catalog";
import {
  REVIEW_SECTIONS,
  resolveDefaultSection,
  reviewsHref,
  type ReviewSectionId,
} from "@/lib/reviews/navigation";
import { getReviewCatalog } from "@/lib/reviews/queries";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read AestheticBiz patient reviews — clinic experience, treatments, skincare, and video stories from Midtown Manhattan.",
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ section?: string; product?: string }> };

function parseSection(value: string | undefined): ReviewSectionId | null {
  if (!value) return null;
  return REVIEW_SECTIONS.some((s) => s.id === value) ? (value as ReviewSectionId) : null;
}

export default async function ReviewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const catalog = await getReviewCatalog();
  let section = parseSection(params.section?.trim());
  const productSlug = params.product?.trim();

  if (!section && catalog.totalReviewCount > 0) {
    const defaultSection = resolveDefaultSection(catalog);
    const firstProduct =
      defaultSection === "treatments" || defaultSection === "skincare"
        ? catalog.bySection.get(defaultSection)?.[0]?.slug
        : undefined;
    redirect(reviewsHref(defaultSection, firstProduct));
  }

  section = section ?? "general";

  const subjectMeta = new Map<string, SubjectSpotlight>();
  for (const t of TREATMENTS) {
    subjectMeta.set(t.slug, {
      slug: t.slug,
      name: t.name,
      image: t.image,
      description: t.tagline,
    });
  }
  for (const p of PRODUCTS) {
    subjectMeta.set(p.slug, {
      slug: p.slug,
      name: p.name,
      image: productPrimaryImage(p),
      description: p.shortDescription.replace(/<[^>]+>/g, ""),
    });
  }

  const spotlight = productSlug ? subjectMeta.get(productSlug) ?? null : null;

  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <main>
        <section className="section rev-hero-band">
          <div className="shell">
            <span className="eyebrow">Patient reviews</span>
            <h1 className="section-title">What patients say</h1>
            <p className="section-lead">
              Verified-style clinic, treatment, skincare, and video reviews — the social proof
              engine every AestheticBiz demo should show prospects.
            </p>
            <p className="rev-avg" style={{ marginTop: 12 }}>
              {catalog.averageRating.toFixed(1)}★ average · {catalog.totalReviewCount} reviews
            </p>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link className="btn btn-gold" href="/submit-review">
                Leave a patient review →
              </Link>
              <Link className="btn btn-outline-dark" href="/book">
                Book a consultation
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="shell">
            <ReviewsCategoryNav
              catalog={catalog}
              section={section}
              productSlug={productSlug}
            />
            <div style={{ marginTop: 36 }}>
              <ReviewsSectionContent
                catalog={catalog}
                section={section}
                productSlug={productSlug}
                spotlight={spotlight}
                subjectMeta={subjectMeta}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter note="Patient reviews · AestheticBiz · CRM Solutions preview" />
    </>
  );
}
