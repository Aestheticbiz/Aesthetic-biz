import type { Metadata } from "next";
import Link from "next/link";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AestheticBiz and CRM Solutions handle personal information on this demo site.",
};

export default function PrivacyPage() {
  return (
    <>
      <PreviewBar>
        <strong>Legal</strong> · Privacy Policy · Demo site operated with CRM Solutions
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Your information</span>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-lead">Effective 3 August 2026 · Written for clinic owners and patients using this demo.</p>
        </div>
      </section>

      <article className="section legal-doc">
        <div className="shell shell-narrow legal-copy">
          <section>
            <h2>1. Who is responsible</h2>
            <p>
              AestheticBiz is a Patient Revenue Platform demonstration operated by CRM Solutions
              (Durban, South Africa / serving US and international clinics). Privacy enquiries:{" "}
              <Link href="/contact">Contact</Link> or{" "}
              <a href="https://www.crmsolutions.app/contact" target="_blank" rel="noopener noreferrer">
                crmsolutions.app/contact
              </a>
              .
            </p>
          </section>
          <section>
            <h2>2. Information we collect</h2>
            <ul>
              <li>Name, email, phone and enquiry details you submit on forms.</li>
              <li>Discovery Call date, timezone and correspondence.</li>
              <li>Skin Survey answers and resulting score (demo preview).</li>
              <li>Browser, device, referring page and basic security logs.</li>
              <li>
                Live audio and conversation content when you deliberately start Adel, the platform
                voice guide.
              </li>
            </ul>
            <p>
              Please do not share payment-card details, passwords, medical records or confidential
              company files with Adel or through public demo forms.
            </p>
          </section>
          <section>
            <h2>3. Why we use it</h2>
            <ul>
              <li>Respond to enquiries and demonstrate the platform.</li>
              <li>Schedule Discovery Calls with CRM Solutions.</li>
              <li>Improve the demo experience and protect the website.</li>
              <li>Process Adel voice sessions when you start a conversation.</li>
            </ul>
          </section>
          <section>
            <h2>4. Service providers</h2>
            <p>
              Information may be processed by hosting, email, calendar, analytics and Google Gemini
              (for Adel voice) under their terms. We do not sell personal information.
            </p>
          </section>
          <section>
            <h2>5. Cookies and measurement</h2>
            <p>
              Essential technologies deliver secure site features. Optional analytics remain off
              until you consent where controls are offered. See the{" "}
              <Link href="/cookies">Cookie Policy</Link>.
            </p>
          </section>
          <section>
            <h2>6. Your choices</h2>
            <p>
              Subject to applicable law, you may request access, correction or deletion of personal
              information we hold. Contact us via the Contact page. This policy may be updated when
              services or providers change.
            </p>
          </section>
          <p className="legal-note">
            Practical draft for the AestheticBiz demo. Confirm Information Officer / PAIA details
            before treating this as a production clinic policy.
          </p>
        </div>
      </article>

      <SiteFooter source="aestheticbiz-privacy" />
    </>
  );
}
