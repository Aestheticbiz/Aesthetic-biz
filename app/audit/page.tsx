import type { Metadata } from "next";
import Link from "next/link";
import { discoveryUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Audit — Sample",
  description:
    "Sample commercial website audit for AestheticBiz — the kind of plain-language report CRM Solutions delivers before a Patient Revenue Platform build.",
};

export default function AuditPage() {
  return (
    <>
      <div className="topnote">
        AestheticBiz platform demo · <Link href="/">View website mockup</Link> ·{" "}
        <Link href="/features">Features</Link>
      </div>

      <div className="audit-wrap">
        <header className="audit-hero">
          <p className="meta-line">
            CRM Solutions · Sample commercial website audit · AestheticBiz demo
          </p>
          <h1>What a Midtown medspa audit looks like</h1>
          <p>
            This page is the audit format we send management — plain language, screenshots, and a
            clear path from brochure site to Patient Revenue Platform. AestheticBiz itself is the
            “after” demo.
          </p>
          <div className="audit-nav">
            <Link href="/">View the new mockup</Link>
            <Link href="/features" className="ghost">
              Platform features
            </Link>
            <a
              href={discoveryUrl("aestheticbiz-audit")}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost"
            >
              Book Discovery Call
            </a>
          </div>
        </header>

        <div className="fact-grid">
          <div className="fact bad">
            <span className="k">Mobile speed</span>
            <span className="v">~40</span>
            <span className="h">Typical Squarespace / heavy theme score</span>
          </div>
          <div className="fact mid">
            <span className="k">Home weight</span>
            <span className="v">3.7MB+</span>
            <span className="h">Images + plugins before first useful paint</span>
          </div>
          <div className="fact bad">
            <span className="k">Broken commerce</span>
            <span className="v">404</span>
            <span className="h">Store / Gift Cards menu links that go nowhere</span>
          </div>
          <div className="fact ok">
            <span className="k">Maps trust</span>
            <span className="v">5.0★</span>
            <span className="h">Reputation often stronger than the website</span>
          </div>
        </div>

        <div className="plain">
          <p>
            <strong>In plain English:</strong> patients find you on Google Maps, then land on a
            site that feels older than your prices. Booking sends them to Square. Gift cards and
            retail are missing or broken. Loyalty is not part of the story.
          </p>
          <p>
            AestheticBiz shows the rebuild: on-brand booking, featured shop, gift cards, points,
            and a homepage that looks like a US$10k practice.
          </p>
        </div>

        <h2 className="section-h">Before — what we typically find</h2>
        <p className="lead">
          Screenshots from a live Midtown audit (anonymized pattern). Same problems show up across
          US aesthetic clinics.
        </p>

        <div className="shot-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/before-overview.png" alt="Typical brochure site overview" />
          <div>
            <span className="tag-bad">Before</span>
            <h3>Brochure layout, thin hierarchy</h3>
            <ul className="explain">
              <li>
                <strong>Hero does not sell the brand</strong> — generic stock or weak typography
                for Madison Avenue pricing.
              </li>
              <li>
                <strong>Services buried</strong> — accordion lists instead of priced treatment
                cards with imagery.
              </li>
              <li>
                <strong>No retail path</strong> — products not on the homepage as revenue.
              </li>
            </ul>
          </div>
        </div>

        <div className="shot-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/before-speed.png" alt="PageSpeed mobile score example" />
          <div>
            <span className="tag-bad">Speed</span>
            <h3>Mobile PageSpeed in the 40s</h3>
            <ul className="explain">
              <li>
                <strong>Heavy home page</strong> — multi-megabyte loads punish paid ads and Maps
                traffic.
              </li>
              <li>
                <strong>Plugin booking</strong> — third-party widgets slow first interaction.
              </li>
            </ul>
          </div>
        </div>

        <div className="shot-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/before-headings.png" alt="Thin heading structure example" />
          <div>
            <span className="tag-bad">SEO</span>
            <h3>Titles and headings that do not compete</h3>
            <ul className="explain">
              <li>
                <strong>Duplicate / thin titles</strong> — Google snippets look like a template.
              </li>
              <li>
                <strong>No question-led pages</strong> — patients searching “best facial Midtown”
                get nothing useful.
              </li>
            </ul>
          </div>
        </div>

        <h2 className="section-h">After — AestheticBiz demo</h2>
        <div className="result-grid">
          <div className="result">
            <h4>Custom booking</h4>
            <p>Treatment → date → time → details inside the brand. CRM lead + confirmation path.</p>
          </div>
          <div className="result">
            <h4>Gift cards + shop</h4>
            <p>Working commerce surfaces on the homepage — not 404 menu links.</p>
          </div>
          <div className="result">
            <h4>AestheticBiz Points</h4>
            <p>Return visits and basket size — loyalty as a revenue system, not a gimmick.</p>
          </div>
          <div className="result">
            <h4>Speed-first Next.js</h4>
            <p>Modern stack ready for Vercel / Cloudflare — target 90+ mobile when launched.</p>
          </div>
        </div>

        <div className="compare2">
          <div className="col-b">
            <h3>Keep doing this</h3>
            <ul>
              <li>Brochure site with Square exit</li>
              <li>Broken Store / Gift Cards URLs</li>
              <li>No loyalty story on-site</li>
              <li>Hope Maps reviews close the sale alone</li>
            </ul>
          </div>
          <div className="col-a">
            <h3>Build AestheticBiz-class</h3>
            <ul>
              <li>Patient Revenue Platform (this demo)</li>
              <li>Book + shop + gifts + points in one brand</li>
              <li>Audit → mockup → deposit → launch</li>
              <li>Website matches Midtown pricing</li>
            </ul>
          </div>
        </div>

        <div className="foot-cta">
          <h2>Ready for your own audit + mockup?</h2>
          <p>
            US$10,000 Patient Revenue Platform · 50% deposit to start · 50% pre-launch. This site
            is the live demo on aestheticbiz.site.
          </p>
          <a
            href={discoveryUrl("aestheticbiz-audit")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Discovery Call →
          </a>
        </div>
      </div>

      <style>{`
        .audit-wrap { max-width: 920px; margin: 0 auto; padding: 0 24px 80px; }
        .audit-hero { padding: 48px 0 28px; border-bottom: 1px solid #E2E2E6; }
        .audit-hero h1 { font-family: var(--font-display); font-size: clamp(34px, 5vw, 52px); color: #0F2647; line-height: 1.12; margin: 0 0 14px; }
        .audit-hero p { color: #636374; font-size: 17px; line-height: 1.65; margin: 0; max-width: 62ch; }
        .fact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 28px 0; }
        @media (min-width: 800px) { .fact-grid { grid-template-columns: repeat(4, 1fr); } }
        .fact { background: #fff; border: 1px solid #E2E2E6; padding: 16px; }
        .fact.bad { background: #FFF8F6; border-color: #F0C7C0; }
        .fact.ok { background: #F3FAF6; border-color: #B7E0CC; }
        .fact.mid { background: #FFF9F0; border-color: #F0D9B0; }
        .fact .k { display: block; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #7A87A6; font-weight: 650; margin-bottom: 8px; }
        .fact .v { font-size: 26px; font-weight: 650; color: #0F2647; letter-spacing: -.02em; line-height: 1.1; }
        .fact.bad .v { color: #B42318; }
        .fact .h { display: block; margin-top: 8px; font-size: 12px; color: #636374; line-height: 1.4; }
        .plain { background: #F7F7F8; border-left: 3px solid #C8A882; padding: 18px 20px; margin: 18px 0 28px; }
        .plain strong { color: #0F2647; }
        .plain p { margin: 0 0 10px; color: #636374; font-size: 15px; line-height: 1.65; }
        .plain p:last-child { margin: 0; }
        .shot-block { display: grid; gap: 20px; margin: 36px 0; padding: 24px; background: #fff; border: 1px solid #E2E2E6; }
        @media (min-width: 900px) { .shot-block { grid-template-columns: 1.1fr .9fr; align-items: start; } }
        .shot-block img { width: 100%; border: 1px solid #E2E2E6; }
        .shot-block h3 { font-family: var(--font-display); font-size: 28px; color: #0F2647; margin: 0 0 10px; }
        .tag-bad { display: inline-block; background: #B42318; color: #fff; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; font-weight: 650; padding: 4px 8px; margin-bottom: 10px; }
        .explain { list-style: none; margin: 0; padding: 0; }
        .explain li { margin: 0 0 12px; color: #636374; font-size: 14px; line-height: 1.55; }
        .explain strong { color: #0F2647; }
        .result-grid { display: grid; gap: 12px; margin: 24px 0; }
        @media (min-width: 700px) { .result-grid { grid-template-columns: 1fr 1fr; } }
        .result { padding: 20px; background: #0F2647; color: #fff; }
        .result h4 { margin: 0 0 8px; font-size: 16px; color: #C8A882; }
        .result p { margin: 0; font-size: 14px; color: rgba(255,255,255,.78); line-height: 1.55; }
        .compare2 { display: grid; gap: 12px; margin: 24px 0; }
        @media (min-width: 800px) { .compare2 { grid-template-columns: 1fr 1fr; } }
        .col-b, .col-a { padding: 22px; border: 1px solid #E2E2E6; }
        .col-b { background: #FFF8F6; }
        .col-a { background: #F3FAF6; }
        .col-b h3, .col-a h3 { margin: 0 0 14px; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
        .col-b h3 { color: #B42318; }
        .col-a h3 { color: #1A6B4A; }
        .col-b ul, .col-a ul { list-style: none; margin: 0; padding: 0; }
        .col-b li, .col-a li { margin: 0 0 10px; font-size: 14px; color: #636374; line-height: 1.45; }
        .audit-nav { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0 0; }
        .audit-nav a { display: inline-flex; padding: 10px 16px; background: #0F2647; color: #fff; font-size: 13px; font-weight: 600; text-decoration: none; }
        .audit-nav a.ghost { background: transparent; color: #0F2647; border: 1px solid #0F2647; }
        .section-h { font-family: var(--font-display); font-size: clamp(28px, 3.5vw, 40px); color: #0F2647; margin: 48px 0 12px; }
        .lead { color: #636374; font-size: 16px; line-height: 1.65; max-width: 62ch; margin: 0 0 20px; }
        .foot-cta { margin-top: 56px; padding: 40px 28px; background: #0F2647; color: #fff; text-align: center; }
        .foot-cta h2 { font-family: var(--font-display); font-size: 36px; margin: 0 0 12px; color: #fff; }
        .foot-cta p { margin: 0 auto 22px; max-width: 48ch; color: rgba(255,255,255,.75); }
        .foot-cta a { display: inline-flex; padding: 14px 22px; background: #C8A882; color: #0F2647; font-weight: 650; text-decoration: none; }
        .meta-line { font-size: 13px; color: #7A87A6; margin-bottom: 10px; }
        .topnote { background: #0F2647; color: rgba(255,255,255,.85); font-size: 12px; padding: 10px 24px; text-align: center; letter-spacing: .04em; }
        .topnote a { color: #C8A882; }
      `}</style>
    </>
  );
}
