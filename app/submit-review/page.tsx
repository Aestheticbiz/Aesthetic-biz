import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import ReviewFormClient from "@/components/reviews/ReviewFormClient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Leave a Patient Review",
  description:
    "Share a written or video patient review of your AestheticBiz Midtown experience.",
};

type Props = { searchParams: Promise<{ subject?: string; tab?: string }> };

export default async function SubmitReviewPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <main>
        <section className="section">
          <div className="shell" style={{ maxWidth: 720 }}>
            <span className="eyebrow">Share your experience</span>
            <h1 className="section-title">Leave a patient review</h1>
            <p className="section-lead">
              Written reviews or a short video (up to 90 seconds). Choose the treatment or product
              you want to speak about — or leave a general clinic review.
            </p>
            <p style={{ marginBottom: 28 }}>
              <Link href="/reviews" style={{ color: "var(--accent)", fontWeight: 600 }}>
                ← Back to patient reviews
              </Link>
            </p>
            <ReviewFormClient initialSubject={params.subject?.trim() || ""} />
          </div>
        </section>
      </main>
      <SiteFooter note="Submit review · AestheticBiz demo" />
    </>
  );
}
