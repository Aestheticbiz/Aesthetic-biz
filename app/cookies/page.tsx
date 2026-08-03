import type { Metadata } from "next";
import Link from "next/link";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How AestheticBiz uses essential and optional cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <>
      <PreviewBar>
        <strong>Legal</strong> · Cookie Policy
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Site technologies</span>
          <h1 className="section-title">Cookie Policy</h1>
          <p className="section-lead">Effective 3 August 2026</p>
        </div>
      </section>

      <article className="section legal-doc">
        <div className="shell shell-narrow legal-copy">
          <section>
            <h2>1. What we use</h2>
            <ul>
              <li>
                <strong>Essential</strong> — session, security and preference storage required for
                cart, brand customizer preview and form flows.
              </li>
              <li>
                <strong>Optional analytics</strong> — only if measurement tools are enabled and you
                consent where a banner is present.
              </li>
              <li>
                <strong>Voice session</strong> — Adel processes live audio for the conversation you
                start; that is not stored as a marketing cookie, but is personal data under the{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </li>
            </ul>
          </section>
          <section>
            <h2>2. Your choices</h2>
            <p>
              You can clear site data in your browser at any time. Declining optional analytics does
              not block browsing the demo. Essential storage may still be required for cart and
              customizer previews.
            </p>
          </section>
          <section>
            <h2>3. More detail</h2>
            <p>
              For personal information beyond cookies, read the <Link href="/privacy">Privacy Policy</Link>{" "}
              and <Link href="/terms">Terms of Use</Link>.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter source="aestheticbiz-cookies" />
    </>
  );
}
