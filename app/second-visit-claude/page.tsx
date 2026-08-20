import type { Metadata } from "next";
import Link from "next/link";
import "./second-visit-claude.css";

export const metadata: Metadata = {
  title: "Second Visit — Claude",
  description:
    "Internal reference: positioning CRM Solutions and AestheticBiz around the second visit — the one belief, why websites feel worthless to their owners, and what to do before the next mailer.",
  robots: { index: false, follow: false },
};

const MEMO_URL = "https://claude.ai/code/artifact/9726956f-8158-4e75-aa05-3e395c274ba4";

export default function SecondVisitClaudePage() {
  return (
    <main className="svc-page">
      <div className="svc-shell">
        {/* ── Masthead ──────────────────────────────────────────────── */}
        <header className="svc-mast">
          <div className="svc-eyebrow">Reference · kept for the record</div>
          <h1>Second Visit — Claude</h1>
          <div className="svc-meta">
            <span>18 August 2026</span>
            <span>CRM Solutions / AestheticBiz</span>
            <span>Positioning</span>
          </div>
        </header>

        {/* ── Intro ─────────────────────────────────────────────────── */}
        <div className="svc-intro">
          <p>
            I read your two codebases first — <em>/biz</em>, <em>/financial</em>,{" "}
            <em>/full-fee-patients</em> on aestheticbiz, and the 18 outreach emails in crmsolutions.
            The full memo is here:
          </p>
          <div className="svc-linkcard">
            <span>Full positioning memo</span>
            <a href={MEMO_URL} target="_blank" rel="noopener noreferrer">
              {MEMO_URL.replace("https://", "")}
            </a>
          </div>
          <p>The short version:</p>
        </div>

        {/* ── Why it didn't convert ─────────────────────────────────── */}
        <section className="svc-section">
          <h2>Why “online businesses” didn’t convert them</h2>
          <p>
            It was the right instinct but it’s still the same axis. Booking, retail, rewards,
            vouchers, reviews — to a clinic owner every one of those is <em>a thing a website
            does</em>. You widened the feature list on the axis every web company competes on. Red
            ocean, bigger invoice. The tell is in your own email: you have to write{" "}
            <em>“This is not a generic template or an automated website report.”</em> When a pitch
            has to deny its category, the reader already filed it there.
          </p>
        </section>

        {/* ── The one belief ────────────────────────────────────────── */}
        <section className="svc-section">
          <h2>The one belief</h2>
          <p>Idea → mechanism → product:</p>
          <div className="svc-belief">
            <ul className="svc-list">
              <li>
                <div>
                  <strong>Idea:</strong>{" "}
                  <em>
                    An aesthetic practice earns its living on the second visit — and the entire
                    industry spends its money on the first one.
                  </em>{" "}
                  Ads, SEO, Instagram, Fresha, discounted first Botox: all buy first visits, which
                  are the cheapest, most price-shopped, least loyal patients that exist. The
                  second/fourth/eleventh visit — full fee, zero acquisition cost, buys retail — is
                  left to a receptionist’s memory. That is why the diary empties, why discounting
                  spirals, why the retail cupboard is full.
                </div>
              </li>
              <li>
                <div>
                  <strong>Mechanism:</strong> <em>The Full-Fee Loop</em> — five owned assets (front
                  door, patient record, 24/7 shelf, recall/rewards engine, reputation flywheel).
                  Nobody builds it because designers sell pages and booking apps rent you your own
                  patients.
                </div>
              </li>
              <li>
                <div>
                  <strong>Product:</strong> AestheticBiz installs the loop in 90 days. The website
                  becomes a <em>component</em>, demoted in every sentence — the way P90X demoted “a
                  workout tape.”
                </div>
              </li>
            </ul>
          </div>
          <p>If they accept the idea, every competitor is suddenly selling the expensive end.</p>
        </section>

        {/* ── Why websites feel worthless ───────────────────────────── */}
        <section className="svc-section">
          <h2>Why websites feel worthless</h2>
          <p>
            Not ugliness — five structural facts, the big one being there’s no P&amp;L line called
            “website.” Every other asset in the clinic has a utilisation number. The fix is a habit,
            not a feature: <strong>report a revenue number every month, unprompted.</strong> The
            month they read “your platform produced R84,300,” it stops being a cost and becomes
            equipment.
          </p>
        </section>

        {/* ── Emotional bond ────────────────────────────────────────── */}
        <section className="svc-section">
          <h2>Emotional bond</h2>
          <p>
            You already own the strongest lever and may not know it —{" "}
            <em>“Why am I the only one still worrying about this at eleven at night?”</em> on /biz is
            the best sentence in either business. Lead with it. Then carry a risk they expected to
            carry alone (a written day-90 standard with a consequence), then give them an identity
            and a monthly ritual.
          </p>
        </section>

        {/* ── Replacing the 45 minutes ──────────────────────────────── */}
        <section className="svc-section">
          <h2>Replacing the 45 minutes</h2>
          <p>
            Henry’s point isn’t the webinar, it’s one compressed encounter carrying the belief. For
            this buyer it’s a <strong>four-minute Second-Visit Calculator</strong> — you already have
            both halves in the /financial one-patient calculator and the Revenue Leak Audit. Four
            inputs, no gate, one output line: <em>“Your practice is leaving R1.4m a year on the
            second visit.”</em> Belief created by their own arithmetic, not your assertion.
          </p>
        </section>

        {/* ── Pushbacks ─────────────────────────────────────────────── */}
        <section className="svc-section">
          <h2>Two things I’d push back on</h2>
          <ol className="svc-numbered">
            <li>
              <div>
                <strong>Hold Wednesday’s mailer.</strong> The current draft criticises their site in
                paragraph two and offers a mockup — both website artefacts. The memo has a full
                rewrite that opens with a question they can’t answer and never mentions a website.
                Send it to ten, compare reply rate to the fifteen already out.
              </div>
            </li>
            <li>
              <div>
                <strong>Your bottleneck isn’t messaging, it’s evidence.</strong> Your own
                /full-fee-patients page pre-empts{" "}
                <em>“Why should I trust this when you have one aesthetic clinic to show me?”</em> —
                the fact you had to write that answer is the signal. Star Aesthetic Centre is your
                yellowtail bottle. Instrument it, run a quarter, publish dated real numbers. One
                clinic with a real number beats fifty beautiful mockups, and it’s the only item on
                the list that actually converts you from web developer to partner.
              </div>
            </li>
          </ol>
        </section>

        <p className="svc-foot">
          Internal reference — not linked from the site navigation and excluded from search engines.{" "}
          <Link href="/full-fee-patients">The 90-Day Full-Fee Patient Platform →</Link>
        </p>
      </div>
    </main>
  );
}
