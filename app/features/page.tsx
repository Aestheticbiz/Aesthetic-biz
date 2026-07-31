import type { Metadata } from "next";
import Link from "next/link";
import { discoveryUrl } from "@/lib/site";
import { PreviewBar } from "@/components/preview-bar";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Platform Features",
  description:
    "What the US$10,000 Patient Revenue Platform includes — booking, gifts, loyalty, retail, and a site worthy of Madison Avenue.",
};

export default function FeaturesPage() {
  return (
    <>
      <PreviewBar>
        <strong>For management</strong> · Platform feature breakdown ·{" "}
        <Link href="/audit">Full audit</Link> · <Link href="/">Site mockup</Link>
      </PreviewBar>
      <SiteHeader variant="platform" />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Patient Revenue Platform</span>
          <h1>Not a refresh — a Midtown revenue system</h1>
          <p>
            Treatments with imagery, featured retail, custom booking, gift cards, loyalty points,
            and a site worthy of Madison Avenue prices — one Patient Revenue Platform.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="compare-grid">
            <div className="compare-col before">
              <h3>What most medspas have today</h3>
              <ul>
                <li>Brochure site / Squarespace template</li>
                <li>Slow mobile PageSpeed · heavy home pages</li>
                <li>Thin titles · weak Google snippets</li>
                <li>Store &amp; Gift Cards links that 404</li>
                <li>Booking exits to Square / third-party</li>
                <li>No on-site loyalty / points story</li>
                <li>Products not featured as homepage revenue</li>
                <li>Maps reputation stronger than website experience</li>
              </ul>
            </div>
            <div className="compare-col after">
              <h3>What this US$10k platform delivers</h3>
              <ul>
                <li>Star-class Patient Revenue Platform</li>
                <li>Speed-first build · target 90+ mobile</li>
                <li>One clear title · full meta · question-led pages</li>
                <li>Working gift cards + featured shop on home</li>
                <li>Custom on-brand booking (demoed here)</li>
                <li>AestheticBiz Points for return visits &amp; basket size</li>
                <li>Treatment imagery + retail upsell path</li>
                <li>Website as brand ambassador for Maps traffic</li>
              </ul>
            </div>
          </div>

          <div className="feature-cards">
            <article className="feature-card">
              <div className="feature-card-icon">📅</div>
              <h3>Custom booking</h3>
              <p>
                On-brand appointment wizard — treatment → date → time → details. Patients never
                leave for Square.
              </p>
              <Link href="/book">Open booking demo →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-card-icon">🎁</div>
              <h3>Gift cards</h3>
              <p>
                Denominations, message, email delivery preview — holiday and referral ready.
              </p>
              <Link href="/gift-cards">Open gift cards →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-card-icon">★</div>
              <h3>AestheticBiz Points</h3>
              <p>
                Earn on treatments &amp; products; redeem on return. Designed to raise repeat
                visits and basket size.
              </p>
              <Link href="/rewards">Open rewards →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-card-icon">🛒</div>
              <h3>Featured retail</h3>
              <p>
                Homepage product grid using real clinical price points — not buried commerce.
              </p>
              <Link href="/#shop">See homepage shop →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-card-icon">✦</div>
              <h3>Treatment imagery</h3>
              <p>
                Visual treatment cards with from-prices and points chips — the opposite of
                accordion-only services.
              </p>
              <Link href="/#treatments">See treatments →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-card-icon">◎</div>
              <h3>Voice concierge</h3>
              <p>
                After-hours interest capture — demoed on request / launch scope (Clara pattern).
              </p>
              <Link href="/audit">Why the upgrade →</Link>
            </article>
          </div>

          <div className="section-header" style={{ marginTop: 24 }}>
            <span className="eyebrow">Investment</span>
            <h2 className="section-title">US$10,000 Patient Revenue Platform</h2>
            <p className="section-lead">
              50% deposit to start · 50% pre-launch. Built to rank, book, sell retail, and present
              your practice as a premium aesthetic destination.
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell">
          <div
            className="footer-bottom"
            style={{
              border: 0,
              paddingTop: 0,
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <span>Prepared by CRM Solutions · Ignatius Ackermann</span>
            <a
              className="btn btn-gold"
              href={discoveryUrl("aestheticbiz-features")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Discovery Call →
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
