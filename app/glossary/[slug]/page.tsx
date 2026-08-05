import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { discoveryUrl } from "@/lib/site";
import { GLOSSARY, getEntry } from "@/lib/glossary";
import "../glossary.css";

export function generateStaticParams() {
  return GLOSSARY.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return { title: "Not found" };

  return {
    title: entry.term,
    description: entry.oneLine,
    robots: { index: true, follow: true },
  };
}

export default async function GlossaryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const related = entry.related
    .map((relatedSlug) => getEntry(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const statusClass = `gl-status-${entry.status.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />

      <main className="gl-page gl-entry">
        <nav className="gl-breadcrumb" aria-label="Breadcrumb">
          <Link href="/glossary">Glossary</Link>
          <span aria-hidden="true">/</span>
          <span>{entry.term}</span>
        </nav>

        <header className="gl-entry-head">
          <p className="gl-eyebrow">{entry.category}</p>
          <h1>{entry.term}</h1>
          <p className="gl-entry-oneline">{entry.oneLine}</p>
          <p className={`gl-status ${statusClass}`}>{entry.status}</p>
        </header>

        <div className="gl-entry-body">
          <section className="gl-block">
            <h2>What it is</h2>
            <p>{entry.whatItIs}</p>
          </section>

          <section className="gl-block">
            <h2>Why it matters to your bottom line</h2>
            <ul className="gl-reasons">
              {entry.whyItMatters.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </section>

          <section className="gl-block">
            <h2>How it works here</h2>
            <ol className="gl-steps">
              {entry.howItWorks.map((item) => (
                <li key={item.step}>
                  <h3>{item.step}</h3>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          {entry.image && (
            <figure className="gl-shot">
              <Image
                src={entry.image.src}
                alt={entry.image.alt}
                width={entry.image.width}
                height={entry.image.height}
                sizes="(max-width: 860px) 100vw, 780px"
              />
              <figcaption>{entry.image.caption}</figcaption>
            </figure>
          )}

          {entry.demo && (
            <section className="gl-demo">
              <div>
                <p className="gl-demo-label">See it working</p>
                <p className="gl-demo-copy">
                  This is live on the demo practice — use it rather than take our word for it.
                </p>
              </div>
              <Link className="gl-demo-btn" href={entry.demo.href}>
                {entry.demo.label} →
              </Link>
            </section>
          )}

          <section className="gl-block">
            <h2>Questions owners ask</h2>
            <dl className="gl-qa">
              {entry.questions.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {related.length > 0 && (
            <section className="gl-block">
              <h2>Related</h2>
              <ul className="gl-related">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/glossary/${item.slug}`}>
                      <strong>{item.term}</strong>
                      <span>{item.oneLine}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="gl-cta">
            <h2>Want this working in your practice?</h2>
            <p>
              A short Discovery conversation is enough to know whether it belongs there — and what
              it would cost to keep doing without it.
            </p>
            <div className="gl-cta-actions">
              <a className="gl-cta-btn" href={discoveryUrl("glossary")}>
                Book a 20-Minute Discovery Call
              </a>
              <Link className="gl-cta-alt" href="/full-fee-patients">
                See the 90-day plan →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter source="aestheticbiz-glossary" />
    </>
  );
}
