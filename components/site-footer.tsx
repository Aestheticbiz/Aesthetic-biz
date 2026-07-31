import Link from "next/link";
import { discoveryUrl, SITE } from "@/lib/site";

type SiteFooterProps = {
  note?: string;
  source?: string;
  compact?: boolean;
};

export function SiteFooter({
  note = "Prepared by CRM Solutions · AestheticBiz demo · Preview only",
  source = "aestheticbiz",
  compact = false,
}: SiteFooterProps) {
  if (compact) {
    return (
      <footer className="site-footer">
        <div className="shell">
          <div className="footer-bottom" style={{ border: 0, paddingTop: 0 }}>
            <span>{note}</span>
            <Link href={discoveryUrl(source)}>Book a Discovery Call →</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-main">{SITE.name}</div>
            <div className="logo-sub">{SITE.tagline}</div>
            <p>
              Midtown Manhattan medical spa demo — facials, laser, peels, retail,
              gifts &amp; rewards on one Patient Revenue Platform.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/treatments">Treatments</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/book">Book</Link>
            <Link href="/reviews">Patient Reviews</Link>
            <Link href="/submit-review">Leave a Review</Link>
            <Link href="/about">About</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/gift-cards">Gift Cards</Link>
            <Link href="/rewards">AestheticBiz Points</Link>
          </div>
          <div className="footer-col">
            <h4>For management</h4>
            <Link href="/audit">Website audit</Link>
            <Link href="/features">Platform features</Link>
            <Link href="/book-discovery">Discovery Call</Link>
            <a href="https://crmsolutions.app" target="_blank" rel="noopener noreferrer">
              CRM Solutions
            </a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <Link href="/#visit">{SITE.address}, Suite 709</Link>
            <Link href="/#visit">Tue–Sat 10am–6pm</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{note}</span>
          <Link href={discoveryUrl(source)}>Book a Discovery Call →</Link>
        </div>
      </div>
    </footer>
  );
}
