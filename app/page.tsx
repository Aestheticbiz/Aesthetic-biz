import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DemoForm } from "@/components/demo-form";
import { PerksSection } from "@/components/home/perks-section";
import { SkinSurveyCta } from "@/components/home/skin-survey-cta";
import PublicReviewCard from "@/components/reviews/PublicReviewCard";
import ProductCard from "@/components/shop/ProductCard";
import DoctorTrust from "@/components/staff/DoctorTrust";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { ProductMedia } from "@/components/ui/image-placeholder";
import { getFeaturedReviews } from "@/lib/reviews/queries";
import {
  PRODUCTS,
  TREATMENTS,
  productPrimaryImage,
} from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default async function HomePage() {
  const featuredReviews = await getFeaturedReviews(3);
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />

      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/lip-filler-treatment-demo-image.jpg')" }}
        />
        <div className="hero-overlay" />
        <div className="shell">
          <div className="hero-location">Midtown Manhattan · Medical Spa</div>
          <h1>
            Reveal calm <em>clinical confidence.</em>
          </h1>
          <p className="hero-tagline">Madison Avenue</p>
          <p className="hero-lead">
            Acne, pigment, lip filler, contouring, hyperhidrosis, drips, and clinical retail —
            booked on a branded AestheticBiz platform, not a third-party plugin.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#treatments">
              Explore Treatments →
            </a>
            <Link className="btn btn-outline" href="/book">
              Book Appointment
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>5.0★</strong>
              <span>Google · 49 reviews</span>
            </div>
            <div className="hero-stat">
              <strong>485</strong>
              <span>Madison Avenue</span>
            </div>
            <div className="hero-stat">
              <strong>Custom</strong>
              <span>On-brand booking</span>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="shell">
          <div className="trust-item">
            <strong>Dr. Hale</strong>
            <span>Medical Director</span>
          </div>
          <div className="trust-item">
            <strong>Elise Hart, RN</strong>
            <span>Lead Aesthetic Nurse</span>
          </div>
          <div className="trust-item">
            <strong>Tue–Sat</strong>
            <span>10am – 6pm</span>
          </div>
          <div className="trust-item">
            <strong>{SITE.phone}</strong>
            <span>Call the studio</span>
          </div>
        </div>
      </div>

      <section className="section" id="treatments">
        <div className="shell">
          <div className="section-header">
            <span className="eyebrow">Our Treatments</span>
            <h2 className="section-title">Medical spa excellence</h2>
            <p className="section-lead">
              Signature pathways with real imagery, clear pricing, and AestheticBiz Points on
              every visit — the depth patients expect from a top Midtown practice.
            </p>
          </div>
          <ScrollRail label="Treatments">
            {TREATMENTS.map((t) => (
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
          </ScrollRail>
          <p style={{ marginTop: 28, textAlign: "center" }}>
            <Link className="btn btn-outline-dark" href="/treatments">
              View all treatments →
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-alt" id="shop">
        <div className="shell">
          <div className="section-header">
            <span className="eyebrow">Extend your results</span>
            <h2 className="section-title">Featured products</h2>
            <p className="section-lead">
              Retail belongs on the homepage — not behind a broken Store link. Demo products
              patients can add to any visit.
            </p>
          </div>
          <ScrollRail label="Featured products">
            {PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                slug={p.slug}
                brand={p.brand}
                price={p.price}
                imageUrl={productPrimaryImage(p)}
              />
            ))}
          </ScrollRail>
          <p style={{ marginTop: 28, textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-navy" href="/shop">
              Open shop →
            </Link>
            <Link className="btn btn-outline-dark" href="/gift-cards">
              View gift cards →
            </Link>
          </p>
        </div>
      </section>

      <PerksSection />

      <DoctorTrust />

      <SkinSurveyCta />

      <section className="section" id="reviews">
        <div className="shell">
          <div className="section-header center">
            <span className="eyebrow">Patient reviews</span>
            <h2 className="section-title">Real confidence. Real reviews.</h2>
            <p className="reviews-aggregate">
              <strong>Written + video</strong> <span>· Midtown patients · AestheticBiz board</span>
            </p>
          </div>
          <div className="rev-grid">
            {featuredReviews.map((review) => (
              <PublicReviewCard key={review.id} review={review} showStructured={false} />
            ))}
          </div>
          <p style={{ marginTop: 28, textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-navy" href="/reviews">
              View all patient reviews →
            </Link>
            <Link className="btn btn-outline-dark" href="/submit-review">
              Leave a review
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-alt" id="book-cta">
        <div className="shell" style={{ display: "grid", gap: 40, alignItems: "start" }}>
          <div>
            <span className="eyebrow">Appointments</span>
            <h2 className="section-title">Book inside AestheticBiz — not Square.</h2>
            <p className="section-lead">
              Custom appointment pages keep the patient in your brand, open the door to packages,
              points, and retail upsells, and look like a US$10k practice.
            </p>
            <Link className="btn btn-navy" href="/book">
              Open booking demo →
            </Link>
          </div>
          <DemoForm
            title="Request a consultation"
            subtitle="Preview form · does not submit live"
            submitLabel="Request consultation →"
            alertMessage="Preview only — live platform emails the studio and creates a CRM lead."
          >
            <div className="form-row">
              <label>Full name</label>
              <input required placeholder="Your name" />
            </div>
            <div className="form-row">
              <label>Phone</label>
              <input required type="tel" placeholder="(347) …" />
            </div>
            <div className="form-row">
              <label>Interest</label>
              <select defaultValue="Lip Filler">
                <option>Acne Treatment</option>
                <option>Pigmentation Treatment</option>
                <option>Lip Filler</option>
                <option>Jaw & Chin Contouring</option>
                <option>Excessive Sweating</option>
                <option>Vitamin Drips</option>
                <option>Weight Loss Programme</option>
                <option>Varicose Veins</option>
                <option>Not sure — consult</option>
              </select>
            </div>
          </DemoForm>
        </div>
      </section>
      <style>{`@media(min-width:900px){#book-cta .shell{grid-template-columns:1.1fr 0.9fr}}`}</style>

      <section className="section" id="visit">
        <div className="shell" style={{ display: "grid", gap: 28 }}>
          <div>
            <span className="eyebrow">Visit us</span>
            <h2 className="section-title">{SITE.address}</h2>
            <p className="section-lead">
              {SITE.suite} · {SITE.hours} · {SITE.phone}
            </p>
          </div>
          <iframe
            title="AestheticBiz on Google Maps"
            src={SITE.mapsEmbed}
            style={{
              width: "100%",
              height: 360,
              border: "1px solid var(--border)",
              background: "#ddd",
            }}
            loading="lazy"
          />
        </div>
      </section>

      <SiteFooter source="aestheticbiz-home" />
    </>
  );
}
