import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SecondVisitSimple } from "@/components/second-visit-simple";
import { discoveryUrl } from "@/lib/site";
import "./second-visit-grok.css";

export const metadata: Metadata = {
  title: "The Second Visit — for clinic owners",
  description:
    "The first visit pays for the ads. The second visit pays you. Work it out for your practice in two minutes — no sign-up, nothing leaves your browser.",
  robots: { index: false, follow: false },
};

const LOOP = [
  {
    name: "They can book at eleven at night",
    body: "Half of these decisions happen after you have locked up. A phone number on the door is not an answer to someone deciding on a Sunday evening.",
    img: "/images/glossary/online-booking.png",
    alt: "Online booking on the clinic’s own site — treatment, date, time.",
  },
  {
    name: "You keep their record",
    body: "What they had, what they liked, when they are due. Yours — not a marketplace that shows your patients the clinic down the road on the same screen.",
    img: "/images/glossary/lead-generation.png",
    alt: "Patient enquiry and record staying on the clinic’s own platform.",
  },
  {
    name: "The cream sells while you are closed",
    body: "You already stock it. They run out on a Wednesday night. Right now that sale goes to Amazon or it does not happen.",
    img: "/images/glossary/online-retail.png",
    alt: "Skincare shop on the clinic’s own site, open after hours.",
  },
  {
    name: "Someone messages them when they are actually due",
    body: "Not when your diary looks empty. When their treatment has worn off. Coming back stops depending on a receptionist remembering.",
    img: "/images/glossary/loyalty-points.png",
    alt: "Rewards and recall as part of the clinic’s own system.",
  },
  {
    name: "The review is part of the visit",
    body: "Asked for while they are still in the chair, not begged for a week later. The next new patient then costs you less, because trust is doing the work ads were paying for.",
    img: "/images/glossary/video-reviews.png",
    alt: "Patient reviews collected as part of the visit.",
  },
] as const;

export default function SecondVisitGrokPage() {
  const discovery = discoveryUrl("second-visit-grok");

  return (
    <main className="svg-page">
      {/*
        THESIS: An appointment diary that proves the first visit pays the ads and the second visit pays the clinic — refusing the dark strategy-memo sales letter.
        OWN-WORLD: Light clinic paper, navy ink, gold only for money; diary slots, live bars, waiting-room photography.
        STORY: Owner sees empty slots, types three numbers, believes returning patients beat cheaper ads, books a call.
        FIRST VIEWPORT: Empty chair full-bleed, headline over it, calculator in the next fold.
        FORM: Appointment-book ledger. Concept seed unavailable this run; structure taken from the owner’s front desk, not the category hero.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <section className="svg-hero">
        <Image
          src="/images/second-visit-grok/empty-chair.png"
          alt="An empty treatment chair in a quiet clinic room, late in the day."
          fill
          priority
          sizes="100vw"
          className="svg-hero-img"
        />
        <div className="svg-hero-veil" />
        <div className="svg-hero-copy">
          <p className="svg-mark">AestheticBiz</p>
          <h1>
            The first visit pays for the ads.
            <em> The second visit pays you.</em>
          </h1>
          <p>
            You already treated these people. Most of them have not been back. That empty chair is
            not a marketing problem — it is a return problem.
          </p>
          <a className="svg-btn" href="#calculator">
            See it in your numbers
          </a>
        </div>
      </section>

      <section className="svg-band" id="calculator">
        <div className="svg-shell">
          <h2>Three figures you already know.</h2>
          <p className="svg-lead">
            How many new patients, what a visit invoices, what you spend on ads — and how many of
            ten come back. Two minutes. Nothing is saved.
          </p>
          <SecondVisitSimple />
        </div>
      </section>

      <section className="svg-split">
        <div className="svg-split-copy">
          <h2>The first visit is the worst sale you will ever make.</h2>
          <p>
            It has the ads attached. It is often the discounted one — the introductory price you
            offered to win them. On its own, it is the thinnest money in the practice.
          </p>
          <p>
            The second visit costs nothing to acquire. Full fee. That is where homecare actually
            sells, and where a third visit becomes likely. Almost nothing in a normal clinic is
            built to produce it. So the diary empties from the back — not because the ads stopped
            working, because the people they bought never returned.
          </p>
        </div>
        <figure className="svg-split-fig">
          <Image
            src="/images/second-visit-grok/diary.png"
            alt="A clinic appointment diary on the reception desk, some slots filled, some left blank."
            width={1200}
            height={900}
          />
          <figcaption>The diary already knows. The empty slots are people you paid to meet once.</figcaption>
        </figure>
      </section>

      <section className="svg-games">
        <div className="svg-shell">
          <h2>There are two games. Almost everyone is playing the wrong one.</h2>
          <figure className="svg-games-fig">
            <Image
              src="/images/second-visit-grok/two-games.png"
              alt="Two waiting rooms: a crowded promotional scramble on the left, a calm booked clinic on the right."
              width={1600}
              height={900}
            />
          </figure>
          <div className="svg-games-captions">
            <div>
              <h3>The crowded game</h3>
              <p>
                Cheaper ads. More Instagram. First-visit specials. Every clinic in your area is
                here, bidding for the same new patient. The price of that patient only goes up.
              </p>
            </div>
            <div>
              <h3>The quiet game</h3>
              <p>
                People who already trust you, coming back on time. No bidding war. This is the
                back of the business — and most clinics do not have one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svg-rise">
        <div className="svg-shell-narrow">
          <h2>Ads are not going to get cheaper. That is not in your control.</h2>
          <p>
            Facebook, Google, the whole internet — more clinics chasing the same eyes, every year.
            Spending your week hunting a cheaper click is fighting a river. The clinics that stay
            small are the ones still looking for that hack.
          </p>
          <p>
            What you can control is what happens after they walk in. How quickly they are seen.
            Whether anyone follows up. Whether they have a reason to come back when the work wears
            off. A clinic that makes more from each patient can pay more for the next one — and
            still come out ahead. That clinic is not hunting cheaper ads. It can simply buy the
            patients everyone else is complaining about.
          </p>
          <p className="svg-pull">
            All traffic works at some price. The practice that wins is the one that can afford
            the price.
          </p>
        </div>
      </section>

      <section className="svg-loop-sec">
        <div className="svg-shell">
          <h2>Five things a clinic has to own so the second visit actually happens.</h2>
          <p className="svg-lead">
            Not five website features. Five pieces of the practice that belong to you, working as
            one loop — which is why nobody builds it. Designers sell pages. Booking apps rent you
            your own patients.
          </p>
          <ol className="svg-loop">
            {LOOP.map((item) => (
              <li key={item.name}>
                <div className="svg-loop-copy">
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </div>
                <figure>
                  <Image src={item.img} alt={item.alt} width={960} height={640} />
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="svg-proof-sec">
        <div className="svg-shell">
          <h2>One live clinic. Not a folder of mockups.</h2>
          <div className="svg-proof">
            <figure>
              <Image
                src="/portfolio/star-aesthetic-desktop.jpg"
                alt="Star Aesthetic Centre homepage — doctor-led clinic in Durban North, live."
                width={1600}
                height={900}
              />
            </figure>
            <div>
              <p className="svg-proof-place">Doctor-led aesthetic clinic · Durban North</p>
              <h3>Star Aesthetic Centre</h3>
              <p>
                Twenty years of clinical reputation, finally matched online: booking that finishes
                on their own brand, pharmaceutical-grade skincare selling after hours, rewards and
                gift vouchers, reviews as part of the visit. Live. Running. Not a concept.
              </p>
              <p>
                <a href="https://www.staraesthetic.co.za" target="_blank" rel="noopener noreferrer">
                  Open staraesthetic.co.za
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svg-faq-sec">
        <div className="svg-shell-narrow">
          <h2>The three questions owners actually ask.</h2>
          <dl className="svg-faq">
            <div>
              <dt>My patients are loyal. Is this even my problem?</dt>
              <dd>
                The calculator will tell you, rather than us. Most people who do not return were
                not unhappy — they were unprompted. Nothing reached them when the treatment wore
                off. That is a system gap, not a verdict on the clinical work.
              </dd>
            </div>
            <div>
              <dt>Isn’t this just a website with extra buttons?</dt>
              <dd>
                A website ends at the enquiry and forgets them. This is the part that runs after
                the first visit — the record, the recall, the shelf, the review. The site is one
                piece of it. On its own it would not change the number you just calculated.
              </dd>
            </div>
            <div>
              <dt>How long before it is working?</dt>
              <dd>
                Ninety days from start to live, fixed. The first fifteen are spent walking through
                your practice the way a patient does. You get those findings whether or not anything
                is built afterwards.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="svg-close">
        <div className="svg-shell-narrow">
          <h2>You have already treated the patients this is about.</h2>
          <p>
            They came. The work was good. Most of them have not been back. Nothing in that number
            requires a single extra new patient — only that the ones you have already earned are
            given a reason, and a way, to return.
          </p>
          <a className="svg-btn" href={discovery}>
            Book a 20-minute call
          </a>
          <p className="svg-close-note">If it is not a fit, you will be told in the first five minutes.</p>
        </div>
      </section>

      <p className="svg-foot">
        AestheticBiz is a working demonstration practice by{" "}
        <a href="https://www.crmsolutions.app" target="_blank" rel="noopener noreferrer">
          CRM Solutions
        </a>
        . The calculator is an estimate from figures you supply, not a forecast.{" "}
        <Link href="/second-visit">The detailed numbers version →</Link>
      </p>
    </main>
  );
}
