import type { Metadata } from "next";
import Link from "next/link";
import { discoveryUrl } from "@/lib/site";
import {
  BUSINESS_STAGES,
  PACKAGE_INVESTMENT,
  REPLACES_ROWS,
  STATUS_LABEL,
  type ComponentStatus,
} from "@/lib/business-components";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Business Platform Components",
  description:
    "The Patient Revenue Platform as a business system — capture, convert, commerce and retain. What is live in the AestheticBiz demo, what ships in the package, and what comes next.",
};

function StatusPill({ status }: { status: ComponentStatus }) {
  return <span className={`biz-status biz-status-${status}`}>{STATUS_LABEL[status]}</span>;
}

export default function FeaturesPage() {
  return (
    <>
      <PreviewBar>
        <strong>For management</strong> · Business components ·{" "}
        <Link href="/audit">Audit</Link> · <Link href="/biz">Owner landing</Link> ·{" "}
        <Link href="/">Patient demo</Link>
      </PreviewBar>
      <SiteHeader variant="platform" />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Patient Revenue Platform</span>
          <h1>A business operating system for one clinic — not another brochure site</h1>
          <p>
            GoHighLevel sells an all-in-one stack to agencies. We sell a tighter system to aesthetic
            practices: website, booking, retail, loyalty, reviews, CRM follow-up and operations —
            built around how a Midtown (or Main Street) clinic actually makes money.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <div className="section-header">
            <span className="eyebrow">How to read this page</span>
            <h2 className="section-title">Live · Package · Next phase</h2>
            <p className="section-lead">
              Adel and this page tell the same story. We do not pretend phone Voice AI is live when
              carrier verification blocked it. You get honesty with the investment.
            </p>
          </div>
          <div className="biz-legend">
            <div>
              <StatusPill status="live" />
              <p>Working in this AestheticBiz demo — click through and try it.</p>
            </div>
            <div>
              <StatusPill status="package" />
              <p>Included when CRM Solutions builds your Patient Revenue Platform.</p>
            </div>
            <div>
              <StatusPill status="later" />
              <p>Roadmap / phase two — named so you know what is coming, not vapor.</p>
            </div>
          </div>
        </div>
      </section>

      {BUSINESS_STAGES.map((stage) => (
        <section
          key={stage.id}
          className="section"
          id={stage.id}
          data-section={stage.label}
        >
          <div className="shell">
            <div className="section-header">
              <span className="eyebrow">{stage.label}</span>
              <h2 className="section-title">{stage.title}</h2>
              <p className="section-lead">{stage.lead}</p>
            </div>
            <ul className="biz-component-list">
              {stage.components.map((item) => (
                <li key={item.name}>
                  <div className="biz-component-top">
                    <h3>{item.name}</h3>
                    <StatusPill status={item.status} />
                  </div>
                  <p>{item.outcome}</p>
                  <div className="biz-component-meta">
                    {item.replaces && (
                      <span>
                        Replaces / reduces: <em>{item.replaces}</em>
                      </span>
                    )}
                    {item.demoHref && (
                      <Link href={item.demoHref}>
                        {item.status === "live" ? "Open demo →" : "See related →"}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section section-alt" id="replaces">
        <div className="shell">
          <div className="section-header">
            <span className="eyebrow">Tool stack reality</span>
            <h2 className="section-title">What clinics usually stitch together</h2>
            <p className="section-lead">
              Not a $1,500/mo agency SaaS comparison. The quiet cost is disconnected tools plus empty
              chairs and unsold retail.
            </p>
          </div>
          <div className="biz-replaces-table">
            <div className="biz-replaces-head">
              <span>Platform capability</span>
              <span>Typical patchwork</span>
              <span>Rough cost of the patchwork</span>
              <span>Patient Revenue Platform</span>
            </div>
            {REPLACES_ROWS.map((row) => (
              <div key={row.feature} className="biz-replaces-row">
                <strong>{row.feature}</strong>
                <span>{row.other}</span>
                <span>{row.otherCost}</span>
                <span className="biz-replaces-yes">Included in build</span>
              </div>
            ))}
            <div className="biz-replaces-foot">
              <div>
                <span>Investment</span>
                <strong>{PACKAGE_INVESTMENT.total}</strong>
                <p>{PACKAGE_INVESTMENT.split}</p>
              </div>
              <p>{PACKAGE_INVESTMENT.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="adel">
        <div className="shell adel-features-panel">
          <div>
            <span className="eyebrow">Adel</span>
            <h2 className="section-title">Your guide to the business components</h2>
            <p className="section-lead">
              Adel specialises in this page — how each component affects the diary, the till and
              retention. She does not advise on treatments. She will not claim phone answering is
              live until it is.
            </p>
            <p className="section-lead" style={{ marginTop: 0 }}>
              Use the Adel launcher (bottom right) and ask: “Walk me through Capture” or “What is
              still next phase?”
            </p>
          </div>
          <div className="adel-features-aside">
            <p>
              <strong>On-site voice</strong> — live when <code>GEMINI_API_KEY</code> is set.
            </p>
            <p>
              <strong>Phone Voice AI</strong> — next phase (verification not completed).
            </p>
            <Link className="btn btn-navy" href={discoveryUrl("aestheticbiz-features")}>
              Book a Discovery Call →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter source="aestheticbiz-features" />
    </>
  );
}
