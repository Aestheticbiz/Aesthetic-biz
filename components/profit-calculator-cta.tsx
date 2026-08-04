import Link from "next/link";
import "./profit-calculator-cta.css";

/**
 * Owner-facing CTA for /financial. Deliberately loud and full-bleed — it carries
 * the single most persuasive argument on the site, so it must not be missable.
 * Used on the campaign landing page and low on the demo homepage.
 */
export function ProfitCalculatorCta() {
  return (
    <section className="pcta" id="profit-calculator">
      <div className="pcta-inner">
        <header className="pcta-head">
          <p className="pcta-eyebrow">For practice owners</p>
          <h2>What is one extra patient a week worth to you?</h2>
          <span className="pcta-rule" aria-hidden="true" />
          <p className="pcta-sub">
            Not a guess. Your rent, your salaries, your fees — and the profit number at the end of
            it.
          </p>
        </header>

        <div className="pcta-panel">
          <div className="pcta-copy">
            <h3>Most owners have never put this on paper.</h3>
            <p>
              Your rent, your staff and your utilities do not change when one more patient walks
              through the door. That is why a rounding error in volume is a landslide in profit —
              and almost nobody runs the arithmetic.
            </p>
            <ul className="pcta-list">
              <li>Replace every figure with your own — rent, salaries, fees, retail</li>
              <li>Rename your treatments, add the ones we missed</li>
              <li>See the monthly and annual difference the moment you type</li>
            </ul>

            <Link className="pcta-btn" href="/financial">
              Open the profit calculator →
            </Link>

            <p className="pcta-note">
              Two minutes. No sign-up, no email, no download — nothing you type ever leaves your
              browser.
            </p>
          </div>

          <div className="pcta-visual">
            <div className="pcta-card">
              <p className="pcta-card-label">Net profit / month</p>

              <div className="pcta-card-row">
                <span>Today</span>
                <b>US$17,560</b>
              </div>
              <div className="pcta-card-row pcta-card-row-after">
                <span>One patient a week later</span>
                <b>US$23,462</b>
              </div>

              <div className="pcta-card-delta">
                <strong>+34%</strong>
                <span>more profit from 2.4% more patients</span>
              </div>

              <p className="pcta-card-foot">
                Example figures. Put your own in and the numbers move with you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
