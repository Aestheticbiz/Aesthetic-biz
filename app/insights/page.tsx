import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTENT_IMAGES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "AestheticBiz clinical insights — acne, pigment, injectables, wellness, and recovery guidance.",
};

const POSTS = [
  {
    slug: "acne-clearance-timeline",
    title: "What to expect in the first 12 weeks of medical acne care",
    excerpt:
      "Purge windows, peel cadence, and why home care decides whether clinic results stick.",
    image: CONTENT_IMAGES.acne,
    href: "/treatments/acne-treatment",
  },
  {
    slug: "pigment-and-spf",
    title: "Melasma, peels, and the SPF habit that protects your investment",
    excerpt:
      "Why pigment programmes fail without daily broad-spectrum protection — and what we prescribe at home.",
    image: CONTENT_IMAGES.pigmentation,
    href: "/treatments/pigmentation-treatment",
  },
  {
    slug: "lip-filler-settle",
    title: "Lip filler: swelling timeline and natural proportion tips",
    excerpt:
      "Day-of swelling vs final shape at two weeks — how we keep results soft and balanced.",
    image: CONTENT_IMAGES.lipFiller,
    href: "/treatments/lip-filler",
  },
  {
    slug: "hyperhidrosis-confidence",
    title: "Hyperhidrosis treatment: months of dryness from one visit",
    excerpt:
      "How underarm toxin mapping works, when results kick in, and what thermoregulation myths to ignore.",
    image: CONTENT_IMAGES.sweating,
    href: "/treatments/excessive-sweating",
  },
] as const;

export default function InsightsPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <main>
        <section className="section">
          <div className="shell">
            <div className="section-header">
              <span className="eyebrow">Insights</span>
              <h1 className="section-title">Clinical notes for patients</h1>
              <p className="section-lead">
                Short reads tied to real AestheticBiz pathways — useful content for SEO demos and
                patient education.
              </p>
            </div>
            <div className="insights-grid">
              {POSTS.map((post) => (
                <article key={post.slug} className="insights-card">
                  <Link href={post.href}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt="" />
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter note="Insights · AestheticBiz · CRM Solutions preview" />
    </>
  );
}
