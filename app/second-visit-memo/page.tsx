import type { Metadata } from "next";
import Link from "next/link";
import "./second-visit-memo.css";

export const metadata: Metadata = {
  title: "The Second Visit — positioning memo",
  description:
    "Internal memo: the one belief for the aesthetic vertical, the blue-ocean four actions, the four-minute diagnostic that replaces a webinar, and the rewritten outreach.",
  robots: { index: false, follow: false },
};

const FOUR_ACTIONS = [
  {
    action: "Eliminate",
    tone: "cut",
    items: [
      "The design conversation — mockups, revisions, colour preferences, page counts",
      "The fixed-price project-and-handover model",
      "The criticism-first audit",
      "Competing on quotes against web designers",
    ],
  },
  {
    action: "Reduce",
    tone: "cut",
    items: [
      "Bespoke build per client — one platform, clinic-specific content",
      "Packages: one offer, the 90-Day Full-Fee Platform",
      "Pre-sale calls before the prospect has seen their own number",
      "Feature lists in all outbound copy",
    ],
  },
  {
    action: "Raise",
    tone: "grow",
    items: [
      "Proof density — one live clinic with dated, real numbers",
      "Speed and certainty: live in 90 days, fixed",
      "Price, deliberately, above the web-design market",
      "Reporting cadence — monthly, in the owner’s language",
    ],
  },
  {
    action: "Create",
    tone: "grow",
    items: [
      "The second-visit diagnostic — four minutes, their own numbers",
      "The monthly revenue scorecard as a ritual",
      "The patient database as a transferable owned asset",
      "Risk-shared pricing tied to one number you own",
      "A room of aesthetic-practice owners who compare scorecards",
    ],
  },
] as const;

const SEQUENCE = [
  {
    when: "Now",
    what: (
      <>
        <strong>Hold the mailer.</strong> Sending the current draft spends the list on the old axis.
        The list is the scarce asset, not the week.
      </>
    ),
  },
  {
    when: "Day 1–3",
    what: (
      <>
        <strong>Write the idea down as one paragraph</strong> and put it at the top of /biz, the
        outreach, and the opening of the discovery call. One paragraph, one axis, everywhere.
      </>
    ),
  },
  {
    when: "Day 3–7",
    what: (
      <>
        <strong>Ship the Second-Visit Calculator</strong> at a clean URL. Four inputs, one output
        line, no gate before the number.
      </>
    ),
  },
  {
    when: "Day 7",
    what: (
      <>
        <strong>Send the rewritten email to ten clinics only.</strong> Measure reply rate against the
        fifteen already sent. That comparison is worth more than this whole memo.
      </>
    ),
  },
  {
    when: "Day 7+",
    what: (
      <>
        <strong>Instrument Star</strong> for the five loop numbers and start the monthly scorecard —
        for Star first, so the ritual exists before you sell it.
      </>
    ),
  },
  {
    when: "Day 90",
    what: (
      <>
        <strong>Publish Star’s quarter.</strong> Real numbers, dated. That is the point at which the
        pitch stops needing to be persuasive.
      </>
    ),
  },
] as const;

export default function SecondVisitMemoPage() {
  return (
    <main className="svm-page">
      <div className="svm-shell">
        {/* ── Masthead ──────────────────────────────────────────────── */}
        <header className="svm-mast">
          <div className="svm-eyebrow">Positioning memo · CRM Solutions / AestheticBiz</div>
          <h1>
            The clinic makes its money on the <em>second visit</em>
          </h1>
          <p className="svm-standfirst">
            One belief, one mechanism, one product — and the four-minute thing that replaces a
            webinar nobody will watch. Written against the AestheticBiz outreach currently in flight.
          </p>
          <div className="svm-meta">
            <span>18 August 2026</span>
            <span>Ignatius Ackermann</span>
            <span>Aesthetic practice vertical</span>
          </div>
        </header>

        {/* ── Why it didn't convert ─────────────────────────────────── */}
        <section className="svm-section">
          <h2>Why “online businesses” didn’t convert them either</h2>
          <p className="svm-lede">
            Moving from <em>websites</em> to <em>online businesses</em> was the right instinct and it
            changed nothing, for one reason: to the buyer it is still a longer list of website
            features. Booking, retail, rewards, vouchers, reviews — every item on that list is a
            thing a website does. You widened the offer along the same axis the whole industry
            competes on. That is a red-ocean move with a bigger invoice.
          </p>
          <p>
            The tell is already in your own cold email. You have to write the sentence{" "}
            <em>“This is not a generic template or an automated website report.”</em> When a pitch
            has to deny its category, the reader has already filed it in that category. Denial is not
            differentiation.
          </p>
          <p>
            The second tell is the audit itself. A website audit opens with what is wrong with
            something the owner paid for and probably chose personally. That produces defensiveness,
            not belief. Nobody has ever been converted by being marked out of ten.
          </p>
          <p className="svm-pull">
            You cannot become the answer while you are still arguing about the same question everyone
            else is asking.
          </p>
          <p>
            So the job is not a better pitch for a better website. It is to change the question — to
            make what you sell the only sane response to a problem they now believe they have, and
            which none of your competitors are even discussing.
          </p>
        </section>

        {/* ── The one belief ────────────────────────────────────────── */}
        <section className="svm-section">
          <div className="svm-eyebrow">The one belief</div>
          <h2>Idea, mechanism, product</h2>
          <p>
            Henry’s structure is right, and so is the 80/20 — nearly all the work is the idea. Here
            is the chain for aesthetic practices. Each link only has to survive one test: would a
            clinic owner argue with it?
          </p>

          <div className="svm-chain">
            <article className="svm-link">
              <span className="svm-step">The idea</span>
              <h3>
                An aesthetic practice earns its living on the second visit — and the entire industry
                spends its money on the first one.
              </h3>
              <p>
                Ads, SEO, Instagram, discounted first-treatment offers, booking marketplaces: every
                rand buys a first visit. First visits are the least profitable, most price-sensitive,
                least loyal patients that exist. The second, fourth and eleventh visit — full fee, no
                acquisition cost, buys retail, brings a friend — is left to a receptionist’s memory
                and a paper card. That is why the diary empties, why the discounting spiral starts,
                and why there is a cupboard of product nobody buys.
              </p>
            </article>
            <div className="svm-joint" />
            <article className="svm-link">
              <span className="svm-step">The mechanism</span>
              <h3>
                The Full-Fee Loop — five owned assets that turn one visit into a lifetime patient
                without the doctor chasing anyone.
              </h3>
              <p>
                An owned front door that books at eleven at night. An owned patient record, not a
                marketplace’s. An owned shelf that sells while the clinic is dark. An owned recall and
                rewards engine that brings people back on schedule. An owned reputation flywheel that
                asks for the review so the front desk never has to. Nobody builds this because web
                designers sell pages and booking apps rent you your own patients — the loop belongs to
                no one’s job description.
              </p>
            </article>
            <div className="svm-joint" />
            <article className="svm-link">
              <span className="svm-step">The product</span>
              <h3>
                AestheticBiz — the platform that installs the Full-Fee Loop in a working clinic in 90
                days.
              </h3>
              <p>
                The website is a component of the loop, not the offer. Demote it in every sentence you
                write, the way P90X demoted “a workout tape.” You are not selling a site with retail
                bolted on; you are selling the loop, and the site is where part of it happens to live.
              </p>
            </article>
          </div>

          <p>
            Test it against the alternatives. If the owner accepts the idea, then the SEO agency, the
            Meta ads guy, the web designer and the booking app are all selling first visits — which is
            now, in their mind, the expensive end. You are the only one standing on the other side of
            the counter. That is the blue ocean: not a better website, a different axis.
          </p>
        </section>

        {/* ── Why websites feel worthless ───────────────────────────── */}
        <section className="svm-section">
          <h2>Why the current website feels worthless to its owner</h2>
          <p>
            You asked what leaves owners feeling their site has little or no value. It is not
            ugliness. It is five structural facts:
          </p>
          <ol className="svm-numbered">
            <li>
              <div>
                <strong>There is no line in the P&amp;L called “website”.</strong> Every other asset in
                that clinic — a laser, a room, a therapist — has a utilisation number. The website has
                a hosting invoice and nothing on the other side of the ledger.
              </div>
            </li>
            <li>
              <div>
                <strong>It ends at the enquiry.</strong> It has no memory. It has never once spoken to
                the same patient twice. It is a brochure that forgets you the moment you close the tab.
              </div>
            </li>
            <li>
              <div>
                <strong>Google Business Profile and Instagram already do its visible job</strong> —
                photos, hours, message us. For the job the owner thinks it has, the site genuinely is
                redundant. Their instinct is correct.
              </div>
            </li>
            <li>
              <div>
                <strong>It was sold as a project.</strong> Built, handed over, dead. Nobody ever came
                back with a number, so the relationship itself taught them the thing has no ongoing
                value.
              </div>
            </li>
            <li>
              <div>
                <strong>It was priced against other websites,</strong> which trained them to treat it
                as a cost to minimise rather than equipment to buy.
              </div>
            </li>
          </ol>
          <div className="svm-callout">
            <span className="svm-tag">The turnaround</span>
            <p>
              <strong>Give the asset a P&amp;L line and report it every month, unprompted.</strong>{" "}
              Bookings created, retail sold, recalls converted, reviews collected, rebook rate. The
              month an owner reads “your platform produced R84,300 this month” is the month it stops
              being a cost and becomes equipment — and the month you stop being a supplier. Everything
              else in this memo is downstream of that one habit.
            </p>
          </div>
        </section>

        {/* ── Four actions ──────────────────────────────────────────── */}
        <section className="svm-section">
          <div className="svm-eyebrow">Blue Ocean · four actions</div>
          <h2>Eliminate, reduce, raise, create</h2>
          <p>
            Casella’s cost saving came from killing oak barrels, ageing and forty varietals to sell two
            wines. Yours comes from killing bespoke. One hardened platform for one industry is what
            lets you charge above the local web-design market while costing less to deliver. Fifty
            custom builds for fifty clinics is a red-ocean cost structure wearing a blue-ocean pitch.
          </p>
          <div className="svm-grid4">
            {FOUR_ACTIONS.map((col) => (
              <div
                key={col.action}
                className={`svm-cell ${col.tone === "cut" ? "svm-cut" : "svm-grow"}`}
              >
                <h3>{col.action}</h3>
                <ul>
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Emotional bond ────────────────────────────────────────── */}
        <section className="svm-section">
          <h2>Where the emotional bond actually comes from</h2>
          <p>Not from adjectives. Three mechanisms, in order of power:</p>
          <ol className="svm-numbered">
            <li>
              <div>
                <strong>Being seen.</strong> You already own this and may not realise how strong it is.
                The line on your /biz page —{" "}
                <em>“Why am I the only one still worrying about this at eleven at night?”</em> — is the
                single best asset in either business. It is the private thought a clinic owner has
                never said out loud to a supplier. Lead with it. Everything before it is warm-up.
              </div>
            </li>
            <li>
              <div>
                <strong>Carrying a risk they expected to carry alone.</strong> Bonds form at the moment
                somebody else picks up the downside. Concretely: a day-90 outcome standard, in writing,
                with a stated consequence if you miss it. Not a guarantee of effort — a guarantee tied
                to the one number you claim to own.
              </div>
            </li>
            <li>
              <div>
                <strong>An identity and a ritual.</strong> Give them a name for what they become —{" "}
                <em>a full-fee practice</em> — and a monthly moment they look forward to. Belief is
                maintained by something turning up with evidence on a schedule, not by a launch.
              </div>
            </li>
          </ol>
          <p>
            One more, structural: doctor-led clinics bond with <strong>people</strong>, not agencies.
            “CRM Solutions” sounds like software procurement and “AestheticBiz” reads like a directory
            listing. You are the trust asset — your face, your name, twenty-five years, your one
            clinic. If you ever rename, name the category you are creating rather than the company.
          </p>
        </section>

        {/* ── Replacing the webinar ─────────────────────────────────── */}
        <section className="svm-section">
          <h2>The four-minute thing that replaces the 45-minute webinar</h2>
          <p>
            You are right that a clinic owner will not sit through 45 minutes. But Henry’s point is not
            the webinar — it is <strong>one compressed encounter that carries the whole belief</strong>
            . The format is free. For this buyer, the format is a diagnostic they operate themselves.
          </p>
          <p>
            Build <strong>The Second-Visit Calculator</strong>. You already have both halves: the
            one-patient calculator on /financial and the Revenue Leak Audit. Merge them and aim them at
            the idea. Four inputs, and no email gate before the result.
          </p>
          <div className="svm-tablewrap">
            <table>
              <thead>
                <tr>
                  <th>They enter</th>
                  <th>It returns</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New patients seen per month</td>
                  <td className="svm-was">—</td>
                </tr>
                <tr>
                  <td>Average treatment value</td>
                  <td className="svm-was">—</td>
                </tr>
                <tr>
                  <td>Roughly what share return within 90 days</td>
                  <td>
                    <strong>Their second-visit rate against what the loop produces</strong>
                  </td>
                </tr>
                <tr>
                  <td>Retail sold in an average month</td>
                  <td>
                    <strong>Retail per patient against benchmark</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>The single output line:</strong> “Your practice is leaving R1.4m a year on
                    the second visit.” Then one sentence of mechanism, then one button.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This does the webinar’s job better than the webinar: the belief is created by{" "}
            <em>their own numbers</em>, not your assertion. Nobody argues with arithmetic they typed
            themselves. It is the P90X moment, self-administered, in four minutes.
          </p>
          <p>
            Support it with short assets and never long ones: a six-minute film that spends five
            minutes on the idea and does not name the product until the end; a one-page scorecard they
            can mark themselves in ninety seconds; and the personalised audit you already produce —
            reframed from “your website is failing” to “here is your second-visit number, worked out
            from your own public booking flow.”
          </p>
        </section>

        {/* ── Rewritten outreach ────────────────────────────────────── */}
        <section className="svm-section">
          <h2>Rewrite the outreach before Wednesday</h2>
          <p>
            Your current opener criticises their website in paragraph two, then offers a review and a
            homepage concept. Both are website artefacts. Here is the same email carrying the belief
            instead — same length, same politeness, different axis.
          </p>
          <div className="svm-email">
            <div className="svm-email-hdr">Subject: the patients you already treated</div>
            <div className="svm-email-body">
              <p>Hi Angelica,</p>
              <p>
                A question rather than a pitch. Of the patients Bel Angé treated in the first quarter
                of this year, roughly what share came back within ninety days?
              </p>
              <p>
                Most established practices I look at cannot answer it, and the ones who can are usually
                under 30%. It is the most expensive unknown in the business, because a returning
                patient pays full fee, costs nothing to acquire and buys product — while everything the
                industry sells you (ads, SEO, social, booking apps) buys first visits, which are the
                cheapest and most price-shopped patients there are.
              </p>
              <p>
                That is usually the real reason a diary that used to have a waiting list now needs a
                promotion to fill.
              </p>
              <p>
                I work with a small number of established aesthetic practices on exactly that gap. I
                put together the arithmetic for Bel Angé using what is publicly visible in your booking
                flow — four minutes, no sign-up: aestheticbiz.site/second-visit
              </p>
              <p>
                If the number surprises you, reply and I will show you what we did about it at Star
                Aesthetic Centre and what it has produced since.
              </p>
              <p className="svm-sig">
                Ignatius Ackermann · CRM Solutions · Durban, South Africa
                <br />
                Reply “no thanks” and I will remove your details.
              </p>
            </div>
          </div>
          <p className="svm-note">
            What changed and why: no compliment-then-criticism sandwich · no mockup, no audit link, no
            hero image · it opens with one question they cannot answer, which is what creates the itch
            · the product appears once, at the end, as a consequence · the proof offered is a working
            clinic with numbers rather than a concept.
          </p>
        </section>

        {/* ── The constraint ────────────────────────────────────────── */}
        <section className="svm-section">
          <h2>The honest constraint</h2>
          <p>
            Your /full-fee-patients page already pre-empts the objection:{" "}
            <em>“Why should I trust this when you have one aesthetic clinic to show me?”</em> The fact
            that you had to write that answer tells you where the real bottleneck sits. It is not the
            framing. It is the evidence.
          </p>
          <div className="svm-callout svm-hard">
            <span className="svm-tag">Do this before scaling the message</span>
            <p>
              Belief runs on evidence. One clinic with ninety days of published, dated, real numbers —
              rebook rate, retail revenue, bookings taken after hours, reviews collected — will convert
              more aesthetic practices than fifty beautiful mockups ever will.{" "}
              <strong>Star Aesthetic Centre is your yellowtail bottle.</strong> Instrument it, run it
              for a quarter, publish the numbers with the dates on them. That single artefact is what
              turns the pitch from a claim into a demonstration.
            </p>
          </div>
          <p>
            Everything in this memo is cheap to do except that one, and that one is what actually moves
            you from web developer to partner. The rest is packaging for it.
          </p>
        </section>

        {/* ── Sequence ──────────────────────────────────────────────── */}
        <section className="svm-section">
          <h2>Sequence</h2>
          <ul className="svm-week">
            {SEQUENCE.map((row) => (
              <li key={row.when}>
                <span className="svm-when">{row.when}</span>
                <span className="svm-what">{row.what}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="svm-foot">
          Internal memo — not linked from the site navigation and excluded from search engines. This
          is strategy written for the operator, not a page for prospects.{" "}
          <Link href="/second-visit-claude">The short version →</Link>
        </p>
      </div>
    </main>
  );
}
