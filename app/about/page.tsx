import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import StaffGrid from "@/components/staff/StaffGrid";
import { CONTENT_IMAGES } from "@/lib/catalog";
import { CENTRE } from "@/lib/staff";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet AestheticBiz Midtown — Dr. Jonathan Hale, Elise Hart RN, and doctor-led aesthetic care on Madison Avenue.",
};

export default function AboutPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <main>
        <section className="hero" style={{ minHeight: "58vh" }}>
          <div
            className="hero-bg"
            style={{ backgroundImage: `url('${CONTENT_IMAGES.jawChin}')` }}
          />
          <div className="hero-overlay" />
          <div className="shell">
            <div className="hero-location">About · {SITE.name}</div>
            <h1>
              Clinical care with <em>Madison Avenue presence.</em>
            </h1>
            <p className="hero-lead">{CENTRE.summary}</p>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <span className="eyebrow">The centre</span>
            <h2 className="section-title">{CENTRE.legalName}</h2>
            <p className="section-lead" style={{ maxWidth: 640 }}>
              Opened in {CENTRE.founded} in {CENTRE.neighbourhood}. {CENTRE.tagline} — from first
              consult through AestheticBiz Points at checkout.
            </p>
            <div className="centre-pillars">
              {CENTRE.pillars.map((p) => (
                <article key={p.title} className="centre-pillar">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
            <div className="centre-facts">
              {CENTRE.facts.map((f) => (
                <div key={f.label} className="centre-fact">
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="shell">
            <div className="section-header">
              <span className="eyebrow">Clinical team</span>
              <h2 className="section-title">Who looks after you</h2>
              <p className="section-lead">
                Doctor-led assessments. Nurse-supported treatment days. Real faces before the menu —
                the trust signal every Midtown patient looks for.
              </p>
            </div>
            <StaffGrid />
            <p style={{ marginTop: 32 }}>
              <Link className="btn btn-navy" href="/book">
                Book with the team →
              </Link>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="shell about-split">
            <div>
              <span className="eyebrow">Our approach</span>
              <h2 className="section-title">Assessment first. Plans that last.</h2>
              <p className="section-lead" style={{ marginBottom: 20 }}>
                From acne and pigment to lip filler, hyperhidrosis, IV drips, and medical weight
                care — every pathway starts with a consultation, clear downtime, and home-care Dr.
                Hale endorses.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link className="btn btn-navy" href="/treatments">
                  View treatments
                </Link>
                <Link className="btn btn-outline-dark" href="/shop">
                  Shop recommended retail
                </Link>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CONTENT_IMAGES.lipFiller}
              alt="Lip filler and injectables at AestheticBiz"
              className="about-portrait"
            />
          </div>
        </section>
      </main>
      <SiteFooter note="About AestheticBiz · CRM Solutions preview" />
    </>
  );
}
