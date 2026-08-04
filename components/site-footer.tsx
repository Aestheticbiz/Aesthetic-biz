import Link from "next/link";
import { BrandLogoLockup } from "@/components/brand-logo-lockup";
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
            <BrandLogoLockup />
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
            <h4>For practice owners</h4>
            <Link href="/full-fee-patients">The 90-day platform</Link>
            <Link href="/financial">Profit calculator</Link>
            <Link href="/audit">Online business audit</Link>
            <Link href="/features">Business components</Link>
            <Link href="/customizer">Customizer</Link>
            <Link href="/skin-survey">Skin Survey</Link>
            <Link href="/book-discovery">Book a Discovery Call</Link>
            <a href="https://crmsolutions.app" target="_blank" rel="noopener noreferrer">
              CRM Solutions
            </a>
          </div>
          <div className="footer-col">
            <h4>Contact &amp; legal</h4>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <Link href="/#visit">{SITE.address}, Suite 709</Link>
            <Link href="/#visit">Tue–Sat 10am–6pm</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{note}</span>
          <span className="footer-legal-inline">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href={discoveryUrl(source)}>Book a Discovery Call →</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
