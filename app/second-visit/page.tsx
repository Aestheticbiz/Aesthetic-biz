import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GlossaryTerm } from "@/components/glossary-term";
import { SecondVisitCalculator } from "@/components/second-visit-calculator";
import "./second-visit.css";

/**
 * /second-visit — the approved Second Visit landing page.
 *
 * Markup and class names are the approved design's, so its stylesheet (ported
 * verbatim and scoped to .sv2-page in second-visit.css) applies exactly as
 * authored. Two deliberate departures from the supplied file:
 *
 *   1. This is a server component with the calculator as its only client
 *      island. That is what lets GlossaryTerm render — it reads the glossary
 *      during the server render — and keeps shipped JavaScript to the calculator.
 *   2. The header logo uses the transparent wordmark rather than the square
 *      badge asset.
 *
 * Like /full-fee-patients this page carries its own header and footer and does
 * not mount SiteHeader / SiteFooter.
 */

export const metadata: Metadata = {
  title: "The Second Visit",
  description:
    "The first visit proves demand. The second visit builds the business. See what a stronger patient return journey could be worth in your practice — your figures, four minutes, no sign-up.",
  robots: { index: true, follow: true },
};

const DISCOVERY = "https://www.aestheticbiz.site/book-discovery";

const LOOP = [
  ["01", "Attract", "Earn the right local attention."],
  ["02", "Build trust", "Answer the questions behind the treatment."],
  ["03", "Book", "Make the next step clear and easy."],
  ["04", "Attend", "Confirm, prepare and reduce avoidable gaps."],
  ["05", "Return", "Give every suitable patient a remembered next step."],
  ["06", "Refer", "Turn a good experience into reviews and introductions."],
] as const;

const SYSTEM_ITEMS = [
  {
    title: "A website built around patient decisions",
    body: "Treatment pages answer real concerns, establish credibility and guide the right visitor towards a consultation.",
  },
  {
    title: "A booking journey that keeps moving",
    body: "Clear calls to action, immediate acknowledgement and visible follow-through prevent interested patients from disappearing.",
  },
  {
    title: "A return path for every suitable treatment",
    body: "Provider-approved reminders and rebooking journeys help patients remember the next step at the appropriate time.",
  },
  {
    title: "One owner scorecard",
    body: "See enquiries, response, bookings, attendance and return activity together—then improve the most expensive constraint first.",
  },
] as const;

const PARTNERSHIP = [
  {
    step: "01 / Diagnose",
    title: "Aesthetic Revenue Leak Audit",
    body: "Map the current patient journey, establish the available numbers and identify the most expensive likely constraint.",
  },
  {
    step: "02 / Build",
    title: "Connected Revenue Platform",
    body: "Design and connect the patient-facing website, decision journeys, booking, follow-through and measurement around the practice.",
  },
  {
    step: "03 / Improve",
    title: "90-Day Launch Support",
    body: "Validate the live journey, resolve platform defects, read early performance signals and prioritise the next commercial improvement.",
  },
] as const;

const FAQ = [
  {
    q: "My booking platform already sends reminders. Is this still relevant?",
    a: "Yes. A reminder is one step. We examine what happens before the booking, how quickly an enquiry is acknowledged, what builds trust, what happens after treatment and whether the owner can see the whole journey.",
  },
  {
    q: "Do I have to replace my current practice software?",
    a: "Not automatically. AestheticBiz is designed around the practice you already run. We first determine what should stay, what can connect and where replacement would genuinely create value.",
  },
  {
    q: "Are you guaranteeing that patients will return?",
    a: "No. Patient choices and clinical suitability cannot be guaranteed. We commit to the agreed scope, clear milestones, thorough testing and correcting agreed deliverables that do not meet the approved specification.",
  },
  {
    q: "Is this only for large, multi-location med spas?",
    a: "No. It is designed primarily for established, owner-led aesthetic practices with proven demand, a credible clinical offer and a patient journey that is not yet working as one measurable system.",
  },
] as const;

export default function SecondVisitPage() {
  return (
    <main className="sv2-page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AestheticBiz home">
          <Image
            className="brand-logo"
            src="/aestheticbiz-logo-transparent.png"
            alt="Aesthetic Biz — Aesthetic and Wellness"
            width={1456}
            height={343}
            priority
            unoptimized
          />
        </a>
        <a className="header-link" href={DISCOVERY}>
          Book a Discovery Call <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero section" id="top">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">For established, owner-led aesthetic practices</p>
            <h1>
              The first visit proves demand.
              <em>The second visit builds the business.</em>
            </h1>
            <p className="hero-intro">
              Most marketing stops when the appointment is booked. AestheticBiz connects the
              complete patient journey—so more of the people you worked hard to attract have a
              clear reason to return.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#calculator">
                Calculate the second-visit opportunity
              </a>
              <a className="text-link" href="#revenue-loop">
                See the Aesthetic Revenue Loop <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="microcopy">Uses your numbers. No inflated promises. No obligation.</p>
          </div>

          <div className="hero-visual" aria-label="The value of a patient relationship">
            <div className="journey-card first-card">
              <span>First visit</span>
              <strong>Attention becomes a patient</strong>
              <small>Important—but often expensive to earn.</small>
            </div>
            <div className="journey-line" aria-hidden="true">
              <span />
            </div>
            <div className="journey-card second-card">
              <span>Second visit</span>
              <strong>A transaction becomes a relationship</strong>
              <small>The beginning of retention, referrals and lifetime value.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section problem-section">
        <div className="shell narrow-shell">
          <p className="eyebrow">The real commercial problem</p>
          <h2>You may not need more leads first.</h2>
          <p className="lead">
            A practice can have a beautiful website, paid campaigns, a booking system and a capable
            team—and still lose value between the first enquiry and the next appointment.
          </p>

          <div className="cost-strip">
            <article>
              <span>Before the first visit</span>
              <h3>You pay to be found and chosen.</h3>
              <p>Brand, content, search, advertising, reviews, calls and staff time.</p>
            </article>
            <article>
              <span>After the treatment</span>
              <h3>The relationship is often left to memory.</h3>
              <p>No clear next step. No timely reminder. No visible return journey.</p>
            </article>
            <article className="accent-card">
              <span>The opportunity</span>
              <h3>Earn more from trust you already created.</h3>
              <p>Not by pushing treatment—by making good follow-through normal.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section calculator-section" id="calculator">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">The second-visit calculator</p>
              <h2>What could a stronger return journey be worth?</h2>
            </div>
            <p>
              Move six sliders. The calculation uses only the figures you enter; it does not assume
              a result or invent a patient.
            </p>
          </div>

          <SecondVisitCalculator />

          <p className="proof-note glossary-note">
            Every term in that panel, in plain language:{" "}
            <GlossaryTerm slug="cac">cost to acquire a patient</GlossaryTerm>,{" "}
            <GlossaryTerm slug="ltv">what a patient is worth</GlossaryTerm>,{" "}
            <GlossaryTerm slug="ltv-cac-ratio">value against cost</GlossaryTerm>,{" "}
            <GlossaryTerm slug="payback-period">payback</GlossaryTerm>,{" "}
            <GlossaryTerm slug="repeat-rate">return rate</GlossaryTerm>,{" "}
            <GlossaryTerm slug="attrition">the patients who quietly stop</GlossaryTerm>,{" "}
            <GlossaryTerm slug="aov">average visit value</GlossaryTerm> and{" "}
            <GlossaryTerm slug="front-end-back-end">front end and back end</GlossaryTerm> — all in
            the <Link href="/glossary">platform glossary</Link>.
          </p>
        </div>
      </section>

      <section className="section truth-section">
        <div className="shell truth-grid">
          <div>
            <p className="eyebrow">Why the number matters</p>
            <h2>The calculator is not the promise. It reveals the missing job.</h2>
          </div>
          <div className="truth-copy">
            <p>
              Marketing usually has an owner. The treatment has an owner. But the journey between
              “that went well” and “I should book again” often belongs to nobody.
            </p>
            <p>
              AestheticBiz gives that journey an owner. We connect the website, booking path,
              follow-up and measurement so the practice can see where value is being lost—and
              improve the right constraint first.
            </p>
            <p>
              It also decides what you can afford. A practice whose patients return can pay more
              for the same enquiry than one whose patients do not, and still profit — which is why{" "}
              <GlossaryTerm slug="cost-per-lead">rising advertising costs</GlossaryTerm> hurt some
              practices far more than others.
            </p>
          </div>
        </div>
      </section>

      <section className="section loop-section" id="revenue-loop">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">The mechanism</p>
            <h2>One patient. One connected revenue journey.</h2>
            <p className="lead">
              More traffic cannot repair a broken journey. The Aesthetic Revenue Loop strengthens
              every step from first attention to a patient who returns and refers.
            </p>
          </div>

          <div className="loop-grid">
            {LOOP.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section system-section">
        <div className="shell system-grid">
          <div className="system-intro">
            <p className="eyebrow">What AestheticBiz builds</p>
            <h2>Not another website to admire. A system the practice can use.</h2>
            <p>
              The website is one part. The commercial value comes from how the complete journey
              works together—and how clearly the owner can see it.
            </p>
            <a className="text-link" href="#partnership">
              See the partnership <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="system-list">
            {SYSTEM_ITEMS.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section founder-section" id="founder">
        <div className="shell founder-grid">
          <figure className="founder-portrait">
            <Image
              src="/ignatius-ackermann.webp"
              alt="Ignatius Ackermann, founder of AestheticBiz"
              width={1000}
              height={1000}
              sizes="(max-width: 960px) 100vw, 46vw"
            />
            <figcaption>Ignatius Ackermann · Founder, AestheticBiz</figcaption>
          </figure>

          <div className="founder-copy">
            <p className="eyebrow">Why founder-led matters</p>
            <h2>No junior handoff after the sale.</h2>
            <p className="founder-lead">
              Ignatius Ackermann has built commercial digital platforms across changing
              technologies and business models since 2001.
            </p>
            <p>
              He remains directly involved from diagnosis and strategy through architecture, build
              and measurement—so the person who understands the commercial problem is still there
              when the system goes live.
            </p>
            <div className="founder-principles" aria-label="Working principles">
              <span>Business model before feature list</span>
              <span>Evidence before claims</span>
              <span>Patient journey before page decoration</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section proof-section" id="proof">
        <div className="shell proof-grid">
          <div>
            <p className="eyebrow">Evidence before claims</p>
            <h2>Built around a real aesthetic practice.</h2>
          </div>
          <article className="proof-card">
            <a
              className="proof-image-link"
              href="https://www.staraesthetic.co.za"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit the Star Aesthetic Centre website"
            >
              <Image
                className="proof-image"
                src="/star-aesthetic-hero.webp"
                alt="Star Aesthetic Centre website hero section"
                width={1351}
                height={609}
                sizes="(max-width: 960px) 100vw, 58vw"
              />
            </a>
            <div className="proof-card-copy">
              <div className="proof-topline">
                <span>Doctor-led aesthetic clinic · Durban North</span>
                <span>Live platform</span>
              </div>
              <h3>Star Aesthetic Centre</h3>
              <p>
                A premium treatment platform that turns complex choices into a calm, credible
                consultation journey—with original treatment content, clearer pathways and visible
                clinical leadership.
              </p>
              <a href="https://www.staraesthetic.co.za" target="_blank" rel="noreferrer">
                Visit staraesthetic.co.za <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <p className="proof-note">
            We show what was built and why. We do not publish revenue claims without verified
            client data and permission.
          </p>
        </div>
      </section>

      <section className="section partnership-section" id="partnership">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">The AestheticBiz Revenue Partnership</p>
              <h2>Diagnose. Build. Improve.</h2>
            </div>
            <p>
              Founder-led from first diagnosis through launch. No page-count package, no junior
              handoff and no disappearing after the site goes live.
            </p>
          </div>

          <div className="partnership-grid">
            {PARTNERSHIP.map((item) => (
              <article key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="investment-row">
            <div>
              <span>AestheticBiz Revenue Platform</span>
              <strong>From US$10,000</strong>
              <small>50% deposit · 50% upon completion, before launch</small>
            </div>
            <p>
              Final investment follows the practice, the patient journeys, integrations and the
              value of the constraint—not an arbitrary number of pages.
            </p>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div>
            <p className="eyebrow">Before you ask</p>
            <h2>The questions practice owners actually ask.</h2>
          </div>
          <div className="faq-list">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="shell final-cta-inner">
          <p className="eyebrow">A focused commercial conversation</p>
          <h2>You have already done the hard work of earning the first visit.</h2>
          <p>Let’s examine what would make more of those patient relationships continue.</p>
          <a className="button button-primary" href={DISCOVERY}>
            Book a Discovery Call <span aria-hidden="true">↗</span>
          </a>
          <small>If the economics do not justify a US$10,000+ engagement, Ignatius will say so.</small>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div>
            <a className="brand" href="#top" aria-label="AestheticBiz home">
              <Image
                className="brand-logo footer-logo"
                src="/aestheticbiz-logo-transparent.png"
                alt="Aesthetic Biz — Aesthetic and Wellness"
                width={1456}
                height={343}
                unoptimized
              />
            </a>
            <p>A specialised aesthetic-practice initiative by CRM Solutions.</p>
          </div>
          <div>
            <span>Built for the long term</span>
            <p>
              Founder-led from Durban, South Africa. Working remotely with established US
              practices.
            </p>
          </div>
          <div>
            <span>Next step</span>
            <a href={DISCOVERY}>Book a Discovery Call ↗</a>
            <Link href="/glossary">Platform glossary →</Link>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 CRM Solutions. All rights reserved.</span>
          <span>Evidence before claims · Patient journey before feature list</span>
        </div>
      </footer>
    </main>
  );
}
