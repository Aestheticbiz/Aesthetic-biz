import Link from "next/link";
import { ArrowRight, Gift, Star } from "lucide-react";

const REWARD_EXAMPLES = [
  { treatment: "Botox", earn: "$25" },
  { treatment: "Lip Filler", earn: "$23" },
  { treatment: "Skin Peel", earn: "$11" },
] as const;

const GIFT_AMOUNTS = [
  { label: "$100", value: "100" },
  { label: "$250", value: "250" },
  { label: "$500", value: "500" },
  { label: "$1,000", value: "1000" },
] as const;

export function PerksSection() {
  return (
    <section className="section perks-section" id="member-benefits">
      <div className="shell">
        <div className="perks-label">
          <span className="perks-label-rule" aria-hidden="true" />
          <span className="eyebrow">Member Benefits</span>
        </div>

        <div className="perks-grid">
          <article className="perk-card perk-card-rewards">
            <div className="perk-watermark" aria-hidden="true">
              <Star size={140} strokeWidth={0.5} />
            </div>
            <div className="perk-card-body">
              <div className="perk-meta">
                <span className="perk-icon perk-icon-gold">
                  <Star size={18} strokeWidth={1.5} />
                </span>
                <span className="perk-kicker">AestheticBiz Points</span>
              </div>
              <h3>
                Earn 5% Back
                <br />
                <span className="perk-accent">On Every Dollar</span>
                <br />
                You Spend
              </h3>
              <p>
                Every treatment and product purchase earns you rewards — automatically credited to
                your account and redeemable against your next visit.
              </p>
              <div className="perk-earn-grid">
                {REWARD_EXAMPLES.map(({ treatment, earn }) => (
                  <div key={treatment} className="perk-earn">
                    <strong>{earn}</strong>
                    <span>{treatment}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/rewards" className="btn btn-gold">
              Join the programme <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>

          <article className="perk-card perk-card-gifts">
            <div className="perk-watermark perk-watermark-dark" aria-hidden="true">
              <Gift size={140} strokeWidth={0.5} />
            </div>
            <div className="perk-card-body">
              <div className="perk-meta">
                <span className="perk-icon perk-icon-navy">
                  <Gift size={18} strokeWidth={1.5} />
                </span>
                <span className="perk-kicker perk-kicker-navy">Gift Vouchers</span>
              </div>
              <h3>
                Give the Gift
                <br />
                <span className="perk-accent">of Confidence</span>
              </h3>
              <p>
                The perfect gift for someone you love. Choose a denomination, add a personal
                message, and we&apos;ll send a beautifully designed voucher directly to them.
              </p>
              <div className="perk-denom-grid">
                {GIFT_AMOUNTS.map(({ label, value }) => (
                  <Link
                    key={value}
                    href={`/gift-cards?amount=${value}`}
                    className="perk-denom"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/gift-cards" className="btn btn-navy">
              Send a gift voucher <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
