import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking-wizard";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Custom AestheticBiz appointment booking — choose treatment, date and time without leaving the brand.",
};

export default function BookPage() {
  return (
    <>
      <PreviewBar>
        <strong>Custom booking demo</strong> · UI only — does not write to Square or a live
        calendar
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Appointments</span>
          <h1 className="section-title">Book inside the AestheticBiz brand</h1>
          <p className="section-lead">
            Today, patients leave to Square. This custom flow keeps them on-brand — and opens the
            door to packages, points, and retail.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell-narrow">
          <p className="booking-preview-note">
            Preview wizard · selecting options will not create a real appointment
          </p>
          <BookingWizard />
        </div>
      </section>

      <SiteFooter
        compact
        note="Custom booking replaces Square exit · CRM Solutions preview"
        source="aestheticbiz-book"
      />
    </>
  );
}
