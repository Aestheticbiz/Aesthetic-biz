import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { GLOSSARY, CATEGORY_ORDER } from "@/lib/glossary";
import "./glossary.css";

export const metadata: Metadata = {
  title: "Platform glossary",
  description:
    "Plain-language reference for every business component of the platform — funnels, CRM, gift vouchers, video reviews, marketing automation and lead generation — with what each one is, why it matters commercially, and whether it is live.",
  robots: { index: true, follow: true },
};

const CATEGORY_BLURB: Record<string, string> = {
  Capture: "Getting the right people to find you and identify themselves.",
  Convert: "Turning interest into a booked, paid appointment.",
  Commerce: "Earning beyond chair time.",
  Retain: "Making the second visit likelier than the first.",
};

export default function GlossaryIndexPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />

      <main className="gl-page">
        <header className="gl-intro">
          <p className="gl-eyebrow">Platform glossary</p>
          <h1>Every moving part, in plain language.</h1>
          <p className="gl-lede">
            One page per component: what it is, why it matters to your bottom line, how it works
            here, and — stated honestly — whether it is running on this demo today, included when
            we build your practice, or still on the roadmap.
          </p>
          <p className="gl-hint">
            Wherever one of these terms appears elsewhere on the site, hovering over it shows a
            one-line summary and a link back here.
          </p>
        </header>

        {CATEGORY_ORDER.map((category) => {
          const entries = GLOSSARY.filter((entry) => entry.category === category);
          if (entries.length === 0) return null;

          return (
            <section className="gl-group" key={category}>
              <div className="gl-group-head">
                <h2>{category}</h2>
                <p>{CATEGORY_BLURB[category]}</p>
              </div>
              <ul className="gl-grid">
                {entries.map((entry) => (
                  <li key={entry.slug}>
                    <Link href={`/glossary/${entry.slug}`} className="gl-card">
                      <span
                        className={`gl-status gl-status-${entry.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {entry.status}
                      </span>
                      <h3>{entry.term}</h3>
                      <p>{entry.oneLine}</p>
                      <span className="gl-card-more">Read more →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="gl-foot-note">
          <h2>Why the status labels matter</h2>
          <dl>
            <div>
              <dt>Live in demo</dt>
              <dd>Working on this site right now. Click through and use it yourself.</dd>
            </div>
            <div>
              <dt>In the platform package</dt>
              <dd>
                Built for you when CRM Solutions builds your practice. Not on the demo, because it
                has to be configured around your treatments and your patient list.
              </dd>
            </div>
            <div>
              <dt>Next phase</dt>
              <dd>
                On the roadmap and not yet available. Named here so the plan is clear — never
                described as though you could have it tomorrow.
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <SiteFooter source="aestheticbiz-glossary" />
    </>
  );
}
