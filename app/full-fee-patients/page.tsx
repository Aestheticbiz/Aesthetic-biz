import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProfitCalculatorCta } from "@/components/profit-calculator-cta";
import { discoveryUrl } from "@/lib/site";
import "./full-fee.css";

export const metadata: Metadata = {
  title: "The 90-Day Full-Fee Patient Platform",
  description:
    "For established aesthetic practices: we do not build websites. We build the online business behind the practice — booking, retail, rewards and reputation working as one system. Ninety days, founder-led, three practices per quarter.",
  robots: { index: true, follow: true },
};

const FOR_YOU = [
  "You have been trading five years or more and your clinical reputation is genuinely good.",
  "Your website is three years old or older, and you already know it.",
  "Most new enquiries ask for your cheapest treatment instead of your best one.",
  "You carry retail stock that the website has never once sold for you.",
  "You are the owner. You can decide this without a committee.",
] as const;

const NOT_FOR_YOU = [
  "You opened in the last year and are still finding your feet.",
  "You are collecting quotes and the lowest number wins.",
  "You want a brochure site that looks nice and does nothing.",
  "You want to be talked out of your prices rather than helped to defend them.",
] as const;

const OVERHEARD = [
  "Are you upgrading your website soon?",
  "Can I not order online?",
  "I tried to book last night — there was nowhere to do it.",
  "My friend recommended you. I couldn’t find a single review.",
] as const;

const PHASES = [
  {
    days: "Days 1–15",
    name: "The Audit",
    body: "I go through your practice the way a patient does — on a phone, at nine at night, with no patience. Every place the enquiry leaks, every place the price gets argued down, every place the retail dies. You get the findings whether or not we build anything.",
  },
  {
    days: "Days 16–70",
    name: "The Build",
    body: "Your front door is rebuilt around full-fee patients: booking that finishes on your brand, treatment pages that justify your pricing before the consult, retail that sells after the visit, rewards and gift vouchers that bring people back, and reviews working where new patients actually look.",
  },
  {
    days: "Days 71–90",
    name: "Launch & Handover",
    body: "It goes live, your team is trained on it, and you are shown exactly how to run it without me. No retainer trap. No junior taking over. You own the asset outright.",
  },
] as const;

const OUTCOMES = [
  "Patients who book at eleven at night without speaking to anyone",
  "Enquiries that ask when you are available, not what you charge",
  "Retail that sells while the clinic is closed",
  "Reviews arriving without your front desk having to beg for them",
  "A front door that finally matches the standard of the work",
] as const;

const WORK = [
  {
    name: "Star Aesthetic Centre",
    place: "Doctor-led aesthetic clinic · Durban North",
    body: "Twenty years of clinical reputation, finally matched online. Booking, pharmaceutical-grade skincare commerce, rewards and gift vouchers — live and running.",
    href: "https://www.staraesthetic.co.za",
    label: "staraesthetic.co.za",
  },
  {
    name: "Lava SA",
    place: "Specialist commerce",
    body: "A technical catalogue buyers used to need a phone call to understand, rebuilt as a premium buying experience that answers the questions before they are asked.",
    href: "https://www.lava-sa.com",
    label: "lava-sa.com",
  },
  {
    name: "Storvac Systems",
    place: "Decision-support commerce",
    body: "Buyers who could not size their own solution, guided to the right one before a salesperson ever picked up the phone.",
    href: "https://www.crmsolutions.app/work/storvac",
    label: "crmsolutions.app",
  },
] as const;

const FAQ = [
  {
    q: "Why should I trust this when you have one aesthetic clinic to show me?",
    a: "You shouldn’t trust it. You should open it. Star Aesthetic is live, it is doctor-led, and it does everything I am describing — go and book a fake appointment on it. Then open this demo practice and do the same. Twenty-five years of building commercial platforms is behind it, but the work is the argument, not the CV.",
  },
  {
    q: "US$10,000 is a lot for a website.",
    a: "It is — which is exactly why I stopped building them. A website is a brochure that happens to be online, and you can buy one for a tenth of this. What gets built here is the online business behind the practice: it takes the booking, sells the retail, keeps the patient and asks for the review, while you are asleep. If it recovers three full-fee patients a month it has paid for itself before the year is out. If you don’t believe it will, the call will be short and neither of us wastes a morning.",
  },
  {
    q: "I don’t have time to manage a project like this.",
    a: "That is the point of the 90 days being structured. You are needed for roughly three conversations: the audit findings, the design direction, and the sign-off before launch. Everything between those is my job, not yours.",
  },
  {
    q: "What happens to my existing bookings and patient data?",
    a: "Nothing breaks. We migrate what you have, keep what is working, and cut over on a date you choose. No practice goes dark during a rebuild.",
  },
  {
    q: "Do I get locked into a monthly fee?",
    a: "No. You own it outright at handover. Hosting and support are available if you want them and optional if you don’t.",
  },
] as const;

export default function FullFeePatientsPage() {
  const discovery = discoveryUrl("full-fee-patients");

  return (
    <main className="ff-page">
      {/*
        CONVERSION PAGE (campaign destination). Companion to /biz, which is the emotional long-read.
        DISCIPLINE: one named offer, one time frame, one mechanism, ONE primary CTA above the fold.
        REGISTER: direct-response structure in a voice that respects a 20-year clinician.
        NOTE TO OWNER: the deposit-back guarantee and the three-per-quarter cap are commercial
        commitments — confirm you will honour both exactly as written before this page goes live.
      */}
      <header className="ff-top">
        <Link href="/full-fee-patients" className="ff-mark">
          <strong>AestheticBiz</strong>
          <span>By CRM Solutions</span>
        </Link>
        <a className="ff-top-cta" href={discovery}>
          Book a Discovery Call
        </a>
      </header>

      {/* ── Above the fold: one promise, one button ───────────────────── */}
      <section className="ff-hero">
        <div className="ff-hero-media" aria-hidden="true">
          <Image src="/images/hero-01.jpg" alt="" fill priority sizes="100vw" />
          <div className="ff-hero-shade" />
        </div>

        <div className="ff-hero-inner">
          <p className="ff-qualifier">
            For established aesthetic &amp; med-spa practices — five years trading or more
          </p>

          <h1>
            In 90 days, stop losing full-fee patients to clinics that are not better than you — only
            easier to book.
          </h1>

          <p className="ff-hero-lede">
            We do not build websites. The <strong>90-Day Full-Fee Patient Platform</strong> builds
            the online business behind your practice — booking, retail, rewards and reputation
            working as one system — so the patients who can afford your best work stop quietly
            choosing somebody else. Founder-led. Three practices per quarter.
          </p>

          <a className="ff-btn ff-btn-primary ff-btn-lg" href={discovery}>
            Book a 20-Minute Discovery Call
          </a>

          <p className="ff-hero-risk">
            Twenty minutes, no pitch deck, no slide about our values. If it is not a fit, I will say
            so in the first five minutes and give you back the other fifteen.
          </p>

          <Link className="ff-hero-alt" href="/">
            Or walk the live demo practice first →
          </Link>
        </div>
      </section>

      {/* ── Qualify hard: magnetic and repulsive ──────────────────────── */}
      <section className="ff-qualify">
        <div className="ff-qualify-inner">
          <h2>This is deliberately not for everyone.</h2>
          <p className="ff-qualify-lede">
            I build one practice at a time, personally. That makes me expensive and slow, and it
            makes me wrong for most clinics. Read both columns honestly before you book anything.
          </p>

          <div className="ff-qualify-grid">
            <div className="ff-qualify-col ff-qualify-yes">
              <h3>Worth your twenty minutes if</h3>
              <ul>
                {FOR_YOU.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="ff-qualify-col ff-qualify-no">
              <h3>Please don’t book if</h3>
              <ul>
                {NOT_FOR_YOU.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem, compressed ───────────────────────────────────── */}
      <section className="ff-problem">
        <div className="ff-problem-inner">
          <p className="ff-eyebrow">Why full-fee patients quietly leave</p>
          <h2>It never arrives as bad news. It arrives as a polite question.</h2>

          <ul className="ff-quotes">
            {OVERHEARD.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p>
            You answered every one of them kindly and went back to work, because somebody was waiting
            in the room. None of them sounded like a crisis — which is exactly what made them
            dangerous. A crisis gets a meeting. A polite question gets a nod.
          </p>
          <p>
            And those are only the ones you heard. The referral who looked you up at half past nine,
            found nowhere to book and nothing to read, and opened the next result instead never said
            anything at all. You will never know her name. You will only see her as a quarter that is
            slightly smaller than it should have been.
          </p>

          <p className="ff-thesis">
            You are not losing to better clinicians.
            <br />
            You are losing to easier ones.
          </p>
        </div>
      </section>

      {/* ── The mechanism: what the 90 days actually is ───────────────── */}
      <section className="ff-mechanism">
        <div className="ff-mechanism-inner">
          <p className="ff-eyebrow">The mechanism</p>
          <h2>Ninety days. Three phases. You are needed for three conversations.</h2>

          <ol className="ff-phases">
            {PHASES.map((phase) => (
              <li key={phase.name}>
                <span className="ff-phase-days">{phase.days}</span>
                <h3>{phase.name}</h3>
                <p>{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The outcome ───────────────────────────────────────────────── */}
      <section className="ff-outcome">
        <div className="ff-outcome-inner">
          <p className="ff-eyebrow">What day 91 looks like</p>
          <h2>Picture the Tuesday after launch.</h2>
          <ul className="ff-outcome-list">
            {OUTCOMES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="ff-outcome-close">
            Not louder. Not busier. Calmer, fuller, and worth considerably more.
          </p>
        </div>

        <div className="ff-outcome-grid">
          <figure>
            <Image
              src="/images/treatment-01.jpg"
              alt="Practitioner consulting with a patient in clinic"
              fill
              sizes="(max-width: 820px) 100vw, 33vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/treatment-02.jpg"
              alt="Patient receiving a facial treatment"
              fill
              sizes="(max-width: 820px) 100vw, 33vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/treatment-03.jpg"
              alt="Patient receiving a laser treatment"
              fill
              sizes="(max-width: 820px) 100vw, 33vw"
            />
          </figure>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────── */}
      <section className="ff-work">
        <div className="ff-work-head">
          <p className="ff-eyebrow">Proof you can open in another tab</p>
          <h2>I do not have a wall of testimonials. I have work that is live.</h2>
          <p>Judge it the way your patients judge you — by what happens the moment somebody clicks.</p>
        </div>
        <div className="ff-work-grid">
          {WORK.map((project) => (
            <article className="ff-work-card" key={project.name}>
              <h3>{project.name}</h3>
              <p className="ff-work-place">{project.place}</p>
              <p>{project.body}</p>
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {project.label} →
              </a>
            </article>
          ))}
        </div>
        <p className="ff-work-foot">
          Built by Ignatius Ackermann,{" "}
          <a href="https://www.crmsolutions.app" target="_blank" rel="noopener noreferrer">
            CRM Solutions
          </a>{" "}
          — commercial digital platforms since 2001. You deal with me from the first call to the
          handover. No junior takes over after the sale.
        </p>
      </section>

      {/* ── The offer, plainly ────────────────────────────────────────── */}
      <section className="ff-offer">
        <div className="ff-offer-inner">
          <div className="ff-offer-copy">
            <p className="ff-eyebrow ff-eyebrow-light">The offer, without the dance</p>
            <h2>The 90-Day Full-Fee Patient Platform</h2>
            <p className="ff-offer-position">
              A website is a brochure that happens to be online. An online business takes the
              booking, sells the retail, keeps the patient and asks for the review — while you are
              asleep. That is the difference between a cost and a machine, and it is the whole reason
              this costs what it costs.
            </p>
            <p>
              One practice, built end to end, in ninety days. You own the asset outright at handover
              — no monthly licence, no platform you can be evicted from, no retainer you have to keep
              paying to keep the lights on.
            </p>
            <p>
              I take three practices per quarter because I build them myself. When the quarter is
              full, the next start date is the following one. That is the only scarcity here and it
              is arithmetic, not a tactic.
            </p>

            <div className="ff-guarantee">
              <h3>The deposit-back guarantee</h3>
              <p>
                At day 15 you see the audit and the design direction. If you do not want to continue,
                say so and your deposit is returned in full — and you keep the audit. You risk a
                fortnight of email, not five thousand dollars.
              </p>
            </div>
          </div>

          <aside className="ff-offer-panel">
            <span className="ff-panel-label">Investment</span>
            <strong className="ff-panel-price">US$10,000</strong>
            <p className="ff-panel-terms">
              US$5,000 to reserve your quarter · US$5,000 on approval, before launch
            </p>
            <ul>
              <li>Full patient-journey audit, yours to keep</li>
              <li>Complete front-door rebuild, launched</li>
              <li>Booking, retail, rewards, gift vouchers, reviews</li>
              <li>Team trained, then handed over outright</li>
              <li>Founder-led from first call to launch day</li>
            </ul>
            <a className="ff-btn ff-btn-primary ff-btn-block" href={discovery}>
              Book a 20-Minute Discovery Call
            </a>
            <p className="ff-panel-foot">Three practices per quarter. No obligation on the call.</p>
          </aside>
        </div>
      </section>

      <ProfitCalculatorCta />

      {/* ── Objections ────────────────────────────────────────────────── */}
      <section className="ff-faq">
        <div className="ff-faq-inner">
          <h2>The questions owners actually ask.</h2>
          <dl>
            {FAQ.map((item) => (
              <div className="ff-faq-item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Close ─────────────────────────────────────────────────────── */}
      <section className="ff-close">
        <div className="ff-close-inner">
          <h2>You have already built the hard part.</h2>
          <p>
            The skill, the reputation, the room full of people who trust you with their faces — that
            took twenty years and cannot be bought. This is the part that carries it forward, and it
            takes ninety days.
          </p>
          <a className="ff-btn ff-btn-primary ff-btn-lg" href={discovery}>
            Book a 20-Minute Discovery Call
          </a>
          <p className="ff-close-risk">
            If it is not a fit, I will tell you in the first five minutes.
          </p>
        </div>
      </section>

      <p className="ff-foot">
        AestheticBiz is a working demonstration practice by{" "}
        <a href="https://www.crmsolutions.app" target="_blank" rel="noopener noreferrer">
          CRM Solutions
        </a>
        . Treatments, products and patients shown here are illustrative.{" "}
        <Link href="/">Walk the live demo practice at aestheticbiz.site →</Link>
      </p>
    </main>
  );
}
