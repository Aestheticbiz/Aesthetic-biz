import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/shop/ProductCard";
import TreatmentReviewsSection from "@/components/reviews/TreatmentReviewsSection";
import {
  getProduct,
  getTreatment,
  productPrimaryImage,
  TREATMENT_SLUG_REDIRECTS,
  TREATMENTS,
} from "@/lib/catalog";
import { getReviewsForSlug } from "@/lib/reviews/queries";
import { DOCTOR } from "@/lib/staff";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const redirected = TREATMENT_SLUG_REDIRECTS[slug];
  const t = getTreatment(redirected ?? slug);
  if (!t) return { title: "Treatment Not Found" };
  return {
    title: t.name,
    description: t.tagline,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  if (TREATMENT_SLUG_REDIRECTS[slug]) {
    redirect(`/treatments/${TREATMENT_SLUG_REDIRECTS[slug]}`);
  }
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const recommended = treatment.recommendedProductSlugs
    .map((s) => getProduct(s))
    .filter(Boolean);
  const reviewBlock = await getReviewsForSlug(treatment.slug);

  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <article className="star-page">
        <section className="star-hero">
          <div className="star-shell">
            <nav className="star-breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/treatments">Treatments</Link>
              <span>›</span>
              <span style={{ color: "#1a1a1f" }}>{treatment.name}</span>
            </nav>

            <div className="star-hero-grid">
              <div>
                <p className="star-overline">{treatment.category.toUpperCase()}</p>
                <h1 className="star-h1">{treatment.name}</h1>
                <p className="star-lead">{treatment.tagline}</p>
                <div
                  className="star-prose"
                  style={{ marginBottom: 32, fontSize: 17 }}
                  dangerouslySetInnerHTML={{ __html: treatment.heroText }}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  <Link href="/book" className="star-btn star-btn-accent">
                    Book Consultation
                  </Link>
                  <Link href="/shop" className="star-btn star-btn-outline">
                    Browse Shop
                  </Link>
                </div>
              </div>

              <div className="star-glance">
                <h3 className="star-h3">At a Glance</h3>
                <ul>
                  <li>
                    <span className="star-glance-icon" aria-hidden>
                      $
                    </span>
                    <div>
                      <strong>Investment</strong>
                      <span>{treatment.priceFrom}</span>
                    </div>
                  </li>
                  <li>
                    <span className="star-glance-icon" aria-hidden>
                      ⏱
                    </span>
                    <div>
                      <strong>Duration</strong>
                      <span>{treatment.duration}</span>
                    </div>
                  </li>
                  <li>
                    <span className="star-glance-icon" aria-hidden>
                      ◌
                    </span>
                    <div>
                      <strong>Downtime</strong>
                      <span>{treatment.downtime}</span>
                    </div>
                  </li>
                </ul>
                <div style={{ marginTop: 28 }}>
                  <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                    {treatment.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={treatment.image}
                        alt={treatment.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="img-placeholder" style={{ height: "100%", aspectRatio: "auto" }}>
                        <span>Generate: {treatment.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="treatment-clinician">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={DOCTOR.image} alt={DOCTOR.imageAlt} />
                  <div>
                    <strong>Assessed by {DOCTOR.shortName}</strong>
                    <span>
                      Doctor-led plan · home-care products he personally recommends
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="star-main">
          <div className="star-shell star-main-grid">
            <div className="star-stack">
              <div>
                <h2 className="star-h2">What is {treatment.name}?</h2>
                <div
                  className="star-prose"
                  dangerouslySetInnerHTML={{ __html: treatment.whatIs }}
                />
              </div>

              <div>
                <h2 className="star-h2">How it Works</h2>
                <div className="star-steps">
                  {treatment.howWorks.map((step, i) => {
                    const [title, ...rest] = step.split(" — ");
                    const body = rest.join(" — ");
                    return (
                      <div key={step} className="star-step">
                        <div className="star-step-num">{i + 1}</div>
                        <div>
                          <strong>{title}</strong>
                          {body ? <p>{body}</p> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {treatment.pricingRows?.length ? (
                <div>
                  <h2 className="star-h2">Pricing</h2>
                  <table className="pricing-table">
                    <thead>
                      <tr>
                        <th>Area / option</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treatment.pricingRows.map((row) => (
                        <tr key={row.label}>
                          <td>{row.label}</td>
                          <td>{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              <div>
                <h2 className="star-h2">Expected Results &amp; Timeline</h2>
                <div className="star-panel">
                  <p className="star-prose" style={{ margin: 0 }}>
                    {treatment.expectedResults}
                  </p>
                  <h4
                    style={{
                      margin: "28px 0 10px",
                      fontWeight: 700,
                      color: "#1a1a1f",
                    }}
                  >
                    Downtime &amp; Aftercare:
                  </h4>
                  <p className="star-prose" style={{ margin: 0 }}>
                    {treatment.downtimeDetail}
                  </p>
                </div>
              </div>

              {treatment.faqs.length > 0 ? (
                <div>
                  <h2 className="star-h2">Frequently Asked Questions</h2>
                  <div className="star-faq">
                    {treatment.faqs.map((faq) => (
                      <details key={faq.question} open>
                        <summary>{faq.question}</summary>
                        <div
                          className="faq-body"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </details>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="star-sidebar">
              <div className="star-side-card">
                <h3 className="star-h3">Who Is This For?</h3>
                <ul className="star-check-list">
                  {treatment.suitableFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="star-side-card navy">
                <h3 className="star-h3">Ready to start?</h3>
                <p>
                  Book a consultation to discuss a tailored plan. On the live platform this creates
                  a CRM lead and confirmation path.
                </p>
                <Link href="/book" className="star-btn star-btn-white star-btn-block">
                  Book Your Consultation
                </Link>
              </div>

              <div className="star-side-card" style={{ background: "#fff", border: "1px solid #e2e2e6" }}>
                <h3 className="star-h3">AestheticBiz Points</h3>
                <p className="star-prose" style={{ margin: "0 0 16px" }}>
                  Earn on treatments and retail — redeem on return visits.
                </p>
                <Link href="/rewards" className="star-btn star-btn-outline star-btn-block">
                  How points work →
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {recommended.length > 0 ? (
          <section className="star-rec">
            <div className="star-shell">
              <p className="star-overline">{DOCTOR.recommendsLabel}</p>
              <h2 className="star-h2">Products for Your {treatment.name} Journey</h2>
              <p className="star-prose" style={{ maxWidth: 640, marginBottom: 32 }}>
                Home-care {DOCTOR.shortName} pairs with this pathway — prepare, protect, and prolong
                results between visits.
              </p>
              <div className="star-rec-grid">
                {recommended.map((p) =>
                  p ? (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      slug={p.slug}
                      brand={p.brand}
                      price={p.price}
                      imageUrl={productPrimaryImage(p)}
                    />
                  ) : null,
                )}
              </div>
            </div>
          </section>
        ) : null}

        <TreatmentReviewsSection
          treatmentName={treatment.name}
          treatmentSlug={treatment.slug}
          reviewBlock={reviewBlock}
        />

        <section className="star-disclaimer">
          <div className="star-shell">
            <p style={{ margin: 0, maxWidth: 720 }}>
              <strong style={{ color: "#525866" }}>Medical disclaimer:</strong> Demo content only.
              Treatment results vary. Information does not replace a personal consultation.
            </p>
          </div>
        </section>
      </article>
      <SiteFooter source="aestheticbiz-treatment-detail" />
    </>
  );
}
