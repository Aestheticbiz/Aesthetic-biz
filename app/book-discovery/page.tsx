import type { Metadata } from "next";
import { DiscoveryBookingWizard } from "@/components/discovery-booking-wizard";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a 60-minute Discovery Call with Ignatius Ackermann — Monday to Friday, 14:00–16:00 and 18:00–20:00 SAST.",
};

export default function BookDiscoveryPage() {
  return (
    <>
      <PreviewBar>
        <strong>Discovery Call</strong> · Mon–Fri 14:00 / 15:00 / 16:00 / 18:00 / 19:00 / 20:00 SAST · 60 minutes
      </PreviewBar>
      <SiteHeader variant="platform" />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">A focused commercial conversation</span>
          <h1 className="section-title">Book a Discovery Call</h1>
          <p className="section-lead">
            A 60-minute founder-led conversation about the constraint, the economics, and whether a
            Patient Revenue Platform is the right next step for your practice.
          </p>
          <ul className="discovery-agenda">
            <li>
              <span>01</span> Your most expensive likely revenue constraint
            </li>
            <li>
              <span>02</span> The current numbers and commercial opportunity
            </li>
            <li>
              <span>03</span> A practical next decision — whether or not we work together
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell-narrow">
          <DiscoveryBookingWizard />
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell" style={{ maxWidth: 720 }}>
          <span className="eyebrow">What to expect</span>
          <h2 className="section-title">Useful before it becomes a sales conversation</h2>
          <p className="section-lead">
            Bring your current website, the business goal, any relevant lead or sales numbers, and
            the one commercial problem you most want to solve.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            If the economics do not justify a US$10,000+ engagement, Ignatius will say so. You will
            leave the call with a clear view either way — there is no obligation and no follow-up
            sequence.
          </p>
        </div>
      </section>

      <SiteFooter note="Discovery Call · AestheticBiz" source="aestheticbiz-discovery" />
    </>
  );
}
