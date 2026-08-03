import type { Metadata } from "next";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkinSurveyForm } from "@/components/skin-survey-form";

export const metadata: Metadata = {
  title: "Skin Survey",
  description:
    "Free 3-minute Skin Health Score — personalised guidance before you book at AestheticBiz.",
};

export default function SkinSurveyPage() {
  return (
    <>
      <PreviewBar>
        <strong>Skin Survey</strong> · Lead-capture assessment demo · reviewed by Medical Director
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Free · ~3 minutes</span>
          <h1 className="section-title">What does your skin really need?</h1>
          <p className="section-lead">
            Answer a short set of questions. Receive a Skin Health Score with next-step guidance —
            then book a consult on-brand if you want a clinical plan.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell shell-narrow">
          <SkinSurveyForm />
        </div>
      </section>

      <SiteFooter
        compact
        note="Skin Survey demo · CRM Solutions preview"
        source="aestheticbiz-skin-survey"
      />
    </>
  );
}
