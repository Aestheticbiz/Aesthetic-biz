import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { DemoForm } from "@/components/demo-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTENT_IMAGES } from "@/lib/catalog";
import { DOCTOR, NURSE } from "@/lib/staff";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit AestheticBiz at ${SITE.address} or book a Midtown consultation online.`,
};

export default function ContactPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <main>
        <section className="hero" style={{ minHeight: "52vh" }}>
          <div
            className="hero-bg"
            style={{ backgroundImage: `url('${CONTENT_IMAGES.vitaminDrip}')` }}
          />
          <div className="hero-overlay" />
          <div className="shell">
            <div className="hero-location">Contact · Midtown</div>
            <h1>
              Visit the studio. <em>Or book online.</em>
            </h1>
            <p className="hero-lead">
              {SITE.address}, Suite 709 · Tue–Sat 10am–6pm · {SITE.phone}
            </p>
            <div className="hero-actions">
              <Link className="btn btn-gold" href="/book">
                Book appointment →
              </Link>
              <a className="btn btn-outline" href={SITE.phoneHref}>
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell contact-split">
            <div>
              <span className="eyebrow">Studio details</span>
              <h2 className="section-title">How to find us</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 24 }}>
                Steps from Madison Avenue. Street-level arrival, suite reception on 709. Street
                parking and nearby garages — ask the desk when you confirm your slot.
              </p>
              <ul className="contact-facts">
                <li>
                  <strong>Address</strong>
                  <br />
                  {SITE.address}, Suite 709
                </li>
                <li>
                  <strong>Hours</strong>
                  <br />
                  Tuesday – Saturday · 10am – 6pm
                </li>
                <li>
                  <strong>Phone</strong>
                  <br />
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </li>
              </ul>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CONTENT_IMAGES.sweating}
                alt="AestheticBiz clinic atmosphere"
                className="contact-photo"
              />
              <div className="contact-doctor-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={DOCTOR.image} alt={DOCTOR.imageAlt} />
                <div>
                  <strong>{DOCTOR.name}</strong>
                  <span>{DOCTOR.role}</span>
                  <p>
                    Consultations are doctor-led. On treatment days you&apos;ll also meet{" "}
                    {NURSE.name} for prep and aftercare. Prefer to book online? Use the booking
                    wizard — or send a note and the desk will reply.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <span className="eyebrow">Message the desk</span>
              <h2 className="section-title">Send a note</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.7 }}>
                Demo form — submissions are preview-only for AestheticBiz prospects.
              </p>
              <DemoForm
                title="Contact the desk"
                subtitle="Preview form · does not submit live"
                submitLabel="Send message →"
                alertMessage="Preview only — live platform emails the studio and creates a CRM lead."
              >
                <div className="form-row">
                  <label>Full name</label>
                  <input required placeholder="Your name" />
                </div>
                <div className="form-row">
                  <label>Email</label>
                  <input required type="email" placeholder="you@email.com" />
                </div>
                <div className="form-row">
                  <label>Message</label>
                  <textarea required rows={4} placeholder="How can we help?" />
                </div>
              </DemoForm>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter note="Contact AestheticBiz · CRM Solutions preview" />
    </>
  );
}
