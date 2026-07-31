import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import TreatmentCardGrid from "@/components/treatments/TreatmentCardGrid";
import { TREATMENTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Explore AestheticBiz treatments — medical facials, peels, microneedling, lip filler, laser and packages.",
};

export default function TreatmentsHubPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <div className="star-page">
        <main className="star-shell" style={{ padding: "48px 0 80px" }}>
          <nav className="star-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span style={{ color: "#1a1a1f", fontWeight: 600 }}>Treatments</span>
          </nav>
          <TreatmentCardGrid treatments={TREATMENTS} headingLevel="h1" />
          <div
            style={{
              marginTop: 64,
              paddingTop: 48,
              borderTop: "1px solid #e2e2e6",
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="star-prose" style={{ margin: 0, maxWidth: 480 }}>
              Not sure which pathway fits? Open the booking demo — on a live build this becomes a
              real consultation request into CRM.
            </p>
            <Link href="/book" className="star-btn star-btn-accent">
              Book Consultation →
            </Link>
          </div>
        </main>
      </div>
      <SiteFooter source="aestheticbiz-treatments" />
    </>
  );
}
