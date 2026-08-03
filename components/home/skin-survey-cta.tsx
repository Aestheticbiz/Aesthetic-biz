import Link from "next/link";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

const CHECKS = [
  "Takes only 3 minutes to complete",
  "Completely free — no obligation",
  "Instant personalised results & recommendations",
] as const;

const BARS = [
  { label: "Skin Baseline", filled: 2 },
  { label: "Treatment Readiness", filled: 3 },
  { label: "Lifestyle Score", filled: 1 },
] as const;

export function SkinSurveyCta() {
  return (
    <section className="skin-survey-cta" id="skin-survey">
      <div className="skin-survey-texture" aria-hidden="true" />
      <div className="shell skin-survey-inner">
        <div className="skin-survey-copy">
          <p className="skin-survey-tag">— Free · 3 Minutes · Instant Results</p>
          <h2>
            What Does
            <br />
            Your Skin
            <br />
            <span>Really Need?</span>
          </h2>
          <p>
            Answer 12 questions. Receive your personalised{" "}
            <strong>Skin Health Score</strong> — with specific treatment and skincare
            recommendations reviewed by Dr. Hale.
          </p>
          <ul>
            {CHECKS.map((item) => (
              <li key={item}>
                <CheckCircle className="skin-survey-check" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/skin-survey" className="btn btn-gold">
            Discover your skin score <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <p className="skin-survey-note">
            Over 500 assessments completed · No credit card required
          </p>
        </div>

        <div className="skin-survey-visual" aria-hidden="true">
          <div className="skin-scorecard-shadow" />
          <div className="skin-scorecard-spine" />
          <div className="skin-scorecard">
            <div className="skin-scorecard-rule" />
            <div className="skin-scorecard-clinic">
              <p>AestheticBiz</p>
              <p>Dr. Hale · Medical Director</p>
            </div>
            <div className="skin-score-ring">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="207 277"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
              <div>
                <strong>?</strong>
                <span>/ 10</span>
              </div>
            </div>
            <p className="skin-scorecard-title">Skin Health</p>
            <p className="skin-scorecard-title gold">Score</p>
            <div className="skin-score-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} />
              ))}
            </div>
            <div className="skin-score-bars">
              {BARS.map(({ label, filled }) => (
                <div key={label} className="skin-score-bar-row">
                  <span>{label}</span>
                  <div>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <i key={j} className={j < filled ? "filled" : undefined} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="skin-scorecard-rule reverse" />
          </div>
        </div>
      </div>
    </section>
  );
}
