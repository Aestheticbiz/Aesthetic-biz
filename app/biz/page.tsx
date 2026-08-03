import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { discoveryUrl } from "@/lib/site";
import "./biz.css";

export const metadata: Metadata = {
  title: "Your work is exceptional. Your Online Profile is arguing otherwise.",
  description:
    "Established aesthetic practices are not losing to better clinicians. They are losing to easier ones. See the practice on the other side — built, live, and clickable today.",
  robots: { index: true, follow: true },
};

/** Overheard, in the patient’s own words. The warning nobody recognises as one. */
const OVERHEARD = [
  "Are you upgrading your website soon?",
  "Can I not order online?",
  "I tried to book last night — there was nowhere to do it.",
  "Why didn’t I hear about the promotion?",
  "My friend recommended you. I couldn’t find a single review.",
  "I couldn’t find your address on Google.",
] as const;

/** The same warning, months later, in the owner’s voice. */
const INTERIOR = [
  { label: "Margin", line: "Why am I discounting to fill a diary that used to have a waiting list?" },
  { label: "Volume", line: "Why does the same month take more effort than it did two years ago?" },
  { label: "Mix", line: "Why is every enquiry for the cheapest thing on the menu?" },
  {
    label: "Retail",
    line: "Why is there a cupboard full of quality product I paid for and nobody buys?",
  },
  { label: "Team", line: "Why does my front desk sound tired when they answer the phone?" },
  { label: "Nights", line: "Why am I the only one still worrying about this at eleven at night?" },
] as const;

/** Work you can open — framed as proof, not soft testimonials. */
const WORK = [
  {
    name: "Star Aesthetic Centre",
    place: "Durban North · doctor-led clinic",
    body: "Twenty years of reputation, finally matched online — booking, pharmaceutical-grade retail, rewards and gift vouchers, live.",
    href: "https://www.staraesthetic.co.za",
    label: "Open staraesthetic.co.za",
    image: "/portfolio/star-aesthetic-desktop.jpg",
    featured: true,
  },
  {
    name: "Lava SA",
    place: "Specialist commerce",
    body: "A catalogue buyers used to need a phone call to understand — rebuilt as a premium path that answers before they ask.",
    href: "https://www.lava-sa.com",
    label: "Open lava-sa.com",
    image: "/portfolio/lava-sa-desktop.jpg",
    featured: false,
  },
  {
    name: "Storvac Systems",
    place: "Decision-support commerce",
    body: "Complex buyers guided to the right solution before a salesperson ever picks up the phone.",
    href: "https://www.crmsolutions.app/work/storvac",
    label: "See the case study",
    image: "/portfolio/storvac-desktop.jpg",
    featured: false,
  },
] as const;

export default function BizLandingPage() {
  const discovery = discoveryUrl("aestheticbiz-biz");
  const featured = WORK.find((w) => w.featured)!;
  const sideWork = WORK.filter((w) => !w.featured);

  return (
    <main className="biz-page">
      {/*
        THESIS: Established owner is not losing to better clinicians — only to easier ones.
        EMOTION: recognition → invisible loss → interior doubt → leadership decision → light prosperity → proof → act.
        REGISTER: pride wounded, never pride attacked. Dark for pain; light from the future onward.
        OWN-WORLD: Night navy over clinic photography → canvas/cream prosperity; gold rail; Cormorant/Outfit.
      */}
      <header className="biz-top">
        <Link href="/biz" className="biz-mark">
          <strong>AestheticBiz</strong>
          <span>For clinic owners</span>
        </Link>
        <div className="biz-top-links">
          <Link href="/">Clinic demo</Link>
          <Link href="/features">Business components</Link>
          <a className="biz-top-cta" href={discovery}>
            Book a conversation
          </a>
        </div>
      </header>

      <section className="biz-hero">
        <div className="biz-hero-media" aria-hidden="true">
          <Image src="/images/hero-01.jpg" alt="" fill priority sizes="100vw" />
          <div className="biz-hero-shade" />
        </div>
        <div className="biz-hero-inner">
          <p className="biz-eyebrow">For established aesthetic practices</p>
          <h1>
            <span className="biz-h1-line">Your work is exceptional.</span>
            <span className="biz-h1-line">Your Online Profile is arguing otherwise.</span>
          </h1>
          <p className="biz-hero-lede">
            Every new patient meets your website long before they meet you. Right now it is quietly
            talking some of them into a cheaper clinic — and you will never hear about a single one.
          </p>
          <div className="biz-hero-actions">
            <a className="biz-btn biz-btn-primary" href="#warning">
              See what it is costing
            </a>
            <Link className="biz-btn biz-btn-ghost" href="/">
              Walk the 2030 practice
            </Link>
          </div>
        </div>
      </section>

      <section className="biz-section" id="warning">
        <p className="biz-eyebrow biz-eyebrow-dark">The quiet warning</p>
        <div className="biz-story">
          <h2>It never arrives as bad news. It arrives as a polite question.</h2>

          <ul className="biz-quotes">
            {OVERHEARD.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p>
            You answered every one of them. Kindly. Completely. And then you went back to work,
            because someone was waiting in the room and the day was already long.
          </p>
          <p>
            None of them sounded like a crisis. <strong>That is exactly what made them dangerous.</strong>{" "}
            A crisis gets a meeting. A polite question gets a nod.
          </p>
          <p className="biz-cut">
            They were not questions. They were people telling you, as gently as they knew how, that
            your practice is easier to admire than it is to buy from.
          </p>
        </div>
      </section>

      <section className="biz-scene">
        <div className="biz-scene-inner">
          <h2>And then there is the one you never heard.</h2>
          <p>
            Somewhere in the last ninety days, a woman sat in your reception and decided you were the
            one. She meant it. On the way home she told her sister about you — used your name, said it
            warmly, said it twice.
          </p>
          <p>
            Her sister looked you up that night. Half past nine. Phone in hand, feet on the sofa.
          </p>
          <p>
            She found a page that took too long to open. No way to book at that hour. No reviews she
            could read. Nothing to tell her what it costs, what it feels like, or who would be holding
            the needle.
          </p>
          <p>
            She did not complain. She did not phone. She did not leave a review. She simply went back
            and opened the next result — a clinic that is not better than you, only easier to say yes
            to — and booked there instead.
          </p>
          <p className="biz-scene-quiet">
            You will never know her name. You will never know she existed. You will only ever see her
            as a number at the end of a quarter that is slightly smaller than it should have been.
          </p>
          <p className="biz-pull">
            You are not losing to better clinicians.
            <br />
            You are losing to easier ones.
          </p>
        </div>
      </section>

      <section className="biz-pain">
        <figure className="biz-pain-visual">
          <Image
            src="/images/hero-03.jpg"
            alt="A quiet clinic reception with empty waiting chairs"
            fill
            sizes="(max-width: 1120px) 100vw, 1120px"
          />
          <figcaption>Paid for. Staffed. Waiting.</figcaption>
        </figure>
        <div className="biz-pain-inner">
          <h2>Then the questions stop being theirs.</h2>
          <ul className="biz-pain-list">
            {INTERIOR.map((item) => (
              <li key={item.label}>
                <b>{item.label}</b>
                <span>{item.line}</span>
              </li>
            ))}
          </ul>
          <p className="biz-pain-close">
            You already know the answer. You have known it for a while. It is the one part of this
            business you have not upgraded since the day you opened — and it is the first part every
            new patient touches.
          </p>
        </div>
      </section>

      <section className="biz-section" id="decision">
        <p className="biz-eyebrow biz-eyebrow-dark">The decision nobody else can make</p>
        <div className="biz-story">
          <h2>The train has already started moving.</h2>
          <p>
            Your competitors are on it. Not all of them. Not even the best of them — just the ones who
            decided earlier. You are on the platform with a coffee in your hand, doing the arithmetic,
            watching carriages full of other people’s patients slide past.
          </p>
          <p>
            And there is a voice that says <em>wait</em>. Wait until the quarter is better. Wait until
            there is time to think about it properly. Wait until it is unavoidable.
          </p>
          <p>
            <strong>
              That voice has cost more good practices their independence than any competitor ever has.
            </strong>{" "}
            This is not a technology decision. It is a leadership decision — the kind only the owner
            can make, and the kind you will be asked about either way. By your staff. By your family.
            By whoever is running this practice in 2030.
          </p>
          <p className="biz-cut">
            You do not have to run for the train. You have to decide before the platform is the only
            thing left to stand on.
          </p>
        </div>
      </section>

      {/* Light half begins — solution and future */}
      <div className="biz-light">
        <section className="biz-vision">
          <div className="biz-vision-inner">
            <p className="biz-eyebrow">The practice on the other side</p>
            <h2>Picture a Tuesday three years from now.</h2>
            <p>
              You arrive at nine and the diary is already full — most of it booked while you were
              asleep, none of it by anyone on your team.
            </p>
            <p>
              Two of yesterday’s patients reordered their homecare without phoning anybody. A gift
              voucher was bought at midnight by a husband who has never set foot in your building.
              Three new reviews arrived this week and nobody had to ask for them.
            </p>
            <p>
              The enquiries in your inbox are not asking what your cheapest option is. They are asking
              when you are available.
            </p>
            <p>
              Your front desk is not repeating themselves down the phone. They are looking after the
              person standing in front of them.
            </p>
            <p>
              And your name — the one on the door, the one you spent twenty years earning — carries a
              weight in this city that no discount can buy back.
            </p>
            <p className="biz-pull biz-pull-light">
              Not louder. Not busier.
              <br />
              Calmer, fuller, and worth considerably more.
            </p>
          </div>
        </section>

        <section className="biz-filled" aria-label="Rooms earning">
          <div className="biz-filled-grid">
            <figure>
              <Image
                src="/images/treatment-01.jpg"
                alt="Practitioner consulting with a patient in clinic"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
              <figcaption>Consults that convert</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/treatment-02.jpg"
                alt="Patient receiving a facial treatment"
                fill
                sizes="(max-width: 820px) 100vw, 25vw"
              />
              <figcaption>Rooms earning</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/treatment-03.jpg"
                alt="Patient receiving a laser treatment"
                fill
                sizes="(max-width: 820px) 100vw, 25vw"
              />
              <figcaption>Diary filling itself</figcaption>
            </figure>
          </div>
        </section>

        <section className="biz-work">
          <div className="biz-work-head">
            <p className="biz-eyebrow">Proof that survives a click</p>
            <h2>
              We do not ask you to trust testimonials.
              <em> We ask you to open the work.</em>
            </h2>
            <p>
              Judge us the way your patients judge you — by what happens the moment somebody clicks.
              Commercial platforms by CRM Solutions since 2001. Founder-led, start to finish.
            </p>
          </div>

          <div className="biz-work-stage">
            <a
              className="biz-work-feature"
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={featured.image}
                alt={`${featured.name} website`}
                fill
                sizes="(max-width: 900px) 100vw, 65vw"
              />
              <div className="biz-work-feature-copy">
                <span>{featured.place}</span>
                <strong>{featured.name}</strong>
                <p>{featured.body}</p>
                <em>{featured.label} ↗</em>
              </div>
            </a>

            <div className="biz-work-stack">
              {sideWork.map((project) => (
                <a
                  key={project.name}
                  className="biz-work-side"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="biz-work-side-media">
                    <Image
                      src={project.image}
                      alt={`${project.name} website`}
                      fill
                      sizes="(max-width: 900px) 100vw, 35vw"
                    />
                  </div>
                  <div className="biz-work-side-copy">
                    <span>{project.place}</span>
                    <strong>{project.name}</strong>
                    <p>{project.body}</p>
                    <em>{project.label} ↗</em>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="biz-adel" id="adel">
          <p className="biz-adel-name">Adel</p>
          <div className="biz-adel-copy">
            <h2>Your private guide to the practice of 2030.</h2>
            <p>
              Adel explains the business package — Capture, Convert, Commerce, Retain — the same
              map as{" "}
              <Link href="/features">/features</Link>. What is live in the demo, what ships in the
              build, and what is still next phase (including phone answering, which is not live yet).
              She does not advise on treatments.
            </p>
            <p>
              Use the Adel launcher on any page, or open the components page first and ask her to
              walk a section. Prefer a human conversation? Book a Discovery Call with Ignatius.
            </p>
          </div>
        </section>

        <section className="biz-proof">
          <div className="biz-proof-inner">
            <div>
              <h2>Do not take our word for it. Go and use it.</h2>
              <p>
                AestheticBiz is not a mockup. It is a complete aesthetic practice, built and live and
                clickable. Book an appointment on it. Buy a product. Redeem a voucher. Read the reviews.
                Break it if you can.
              </p>
              <p>
                Nobody buys a practice’s future from a brochure. Walk through it first, then decide
                whether the conversation is worth having.
              </p>
              <div className="biz-proof-actions">
                <Link className="biz-btn biz-btn-primary" href="/">
                  Enter the live demo
                </Link>
                <Link className="biz-btn biz-btn-outline" href="/features">
                  See business components
                </Link>
              </div>
            </div>
            <aside className="biz-proof-panel">
              <span>Typical investment</span>
              <strong>US$10,000</strong>
              <ul>
                <li>US$5,000 to reserve capacity and begin</li>
                <li>US$5,000 on final approval, before launch</li>
                <li>Founder-led throughout — deliberately limited capacity</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="biz-cta">
          <div className="biz-cta-panel">
            <div className="biz-cta-copy">
              <p className="biz-cta-kicker">A focused commercial conversation</p>
              <h2>Turn recognition into a decision.</h2>
              <p>
                Book a Discovery Call with Ignatius. We will examine the constraint, the relevant
                numbers, and whether a Patient Revenue Platform is the sensible next step for your
                practice — or whether it is not.
              </p>
              <ul className="biz-cta-badges">
                <li>Founder-led</li>
                <li>Monday–Friday</li>
                <li>Your timezone</li>
                <li>Google Calendar &amp; Meet</li>
              </ul>
            </div>
            <aside className="biz-cta-card">
              <span>Your next step</span>
              <h3>Book a Discovery Call</h3>
              <p>
                Select a date, choose your local time, and tell us what would make the conversation
                valuable.
              </p>
              <a href={discovery}>
                View available appointments <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </section>

        <p className="biz-foot">
          AestheticBiz · a working demonstration practice by{" "}
          <a href="https://www.crmsolutions.app" target="_blank" rel="noopener noreferrer">
            CRM Solutions
          </a>
          . Treatments, products and patients shown here are illustrative.
        </p>
      </div>
    </main>
  );
}
