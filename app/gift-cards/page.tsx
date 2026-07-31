import type { Metadata } from "next";
import { GiftCardForm } from "@/components/gift-card-form";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: `Send an ${SITE.name} gift card — facials, peels, and Midtown medical spa experiences.`,
};

export default function GiftCardsPage() {
  return (
    <>
      <PreviewBar>
        <strong>Gift Cards</strong> · Branded voucher commerce — denominations, message, email
        delivery
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Gifting</span>
          <h1 className="section-title">Give the gift of confidence</h1>
          <p className="section-lead">
            A branded AestheticBiz voucher — not a dead menu link. Perfect for holidays,
            birthdays, and referral thank-yous. Recipients redeem against treatments or retail.
          </p>
        </div>
      </section>

      <section className="section">
        <GiftCardForm />
      </section>

      <SiteFooter
        compact
        note="Gift commerce restored · CRM Solutions preview"
        source="aestheticbiz-gifts"
      />
    </>
  );
}
