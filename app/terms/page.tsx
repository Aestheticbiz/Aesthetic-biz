import type { Metadata } from "next";
import Link from "next/link";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the AestheticBiz Patient Revenue Platform demonstration site.",
};

export default function TermsPage() {
  return (
    <>
      <PreviewBar>
        <strong>Legal</strong> · Terms of Use · Demo site
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Using this site</span>
          <h1 className="section-title">Terms of Use</h1>
          <p className="section-lead">Effective 3 August 2026</p>
        </div>
      </section>

      <article className="section legal-doc">
        <div className="shell shell-narrow legal-copy">
          <section>
            <h2>1. Demo purpose</h2>
            <p>
              AestheticBiz is a demonstration of a Patient Revenue Platform built by CRM Solutions.
              Content, prices, treatments, staff names and reviews are illustrative unless clearly
              marked as a live client engagement elsewhere.
            </p>
          </section>
          <section>
            <h2>2. No medical advice</h2>
            <p>
              Nothing on this site is medical advice. Treatment decisions belong to qualified
              clinicians. Adel explains platform features for business owners — not clinical care.
            </p>
          </section>
          <section>
            <h2>3. Forms and bookings</h2>
            <p>
              Many forms are preview-only and do not create a clinical appointment. Discovery Call
              bookings may be routed to CRM Solutions&apos; live calendar when configured.
            </p>
          </section>
          <section>
            <h2>4. Intellectual property</h2>
            <p>
              Site design, copy structure and platform patterns are owned by CRM Solutions or its
              licensors. Do not copy the demo for commercial use without a written engagement.
            </p>
          </section>
          <section>
            <h2>5. Platform engagements</h2>
            <p>
              Published investment figures (for example US$10,000 with staged payments) are guidance
              for Discovery conversations. Scope, deliverables and contracts are confirmed in writing
              before work begins. See also CRM Solutions&apos; published commitment terms on{" "}
              <a href="https://www.crmsolutions.app" target="_blank" rel="noopener noreferrer">
                crmsolutions.app
              </a>
              .
            </p>
          </section>
          <section>
            <h2>6. Limitation</h2>
            <p>
              The demo is provided as-is for evaluation. CRM Solutions is not liable for decisions
              made solely on the basis of this demonstration without a signed agreement.
            </p>
          </section>
          <section>
            <h2>7. Related policies</h2>
            <p>
              <Link href="/privacy">Privacy Policy</Link> · <Link href="/cookies">Cookie Policy</Link>
            </p>
          </section>
        </div>
      </article>

      <SiteFooter source="aestheticbiz-terms" />
    </>
  );
}
