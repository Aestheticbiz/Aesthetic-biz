import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BrandCustomizerForm } from "@/components/brand-customizer-form";
import { BrandLivePreview } from "@/components/brand-live-preview";

export const metadata: Metadata = {
  title: "Brand Customizer",
  description:
    "Try AestheticBiz as your clinic — brand colour, logo, and typeface. Changes apply across the whole demo in your browser.",
};

export default function CustomizerPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Demo playground</span>
          <h1>Make this your clinic</h1>
          <p>
            Pick a colour, upload a logo, choose a typeface. Everything updates across the site in
            this browser so prospects can spend 20 minutes in <em>their</em> brand.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell customizer-layout">
          <div className="customizer-controls">
            <h2 className="section-title" style={{ fontSize: "clamp(28px, 3vw, 36px)" }}>
              Brand controls
            </h2>
            <BrandCustomizerForm
              footer={
                <Link href="/" className="btn btn-navy btn-sm">
                  Explore the site →
                </Link>
              }
            />
          </div>
          <div className="customizer-preview">
            <h2 className="section-title" style={{ fontSize: "clamp(28px, 3vw, 36px)" }}>
              Live preview
            </h2>
            <BrandLivePreview />
          </div>
        </div>
      </section>

      <SiteFooter source="aestheticbiz-customizer" />
    </>
  );
}
