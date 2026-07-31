import type { Metadata } from "next";
import { DemoForm } from "@/components/demo-form";
import { PreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "AestheticBiz Points — Rewards",
  description:
    "Earn AestheticBiz Points on treatments and products — redeem on your next Midtown visit.",
};

export default function RewardsPage() {
  return (
    <>
      <PreviewBar>
        <strong>AestheticBiz Points</strong> · Loyalty that increases return visits and basket
        size
      </PreviewBar>
      <SiteHeader />

      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Loyalty</span>
          <h1 className="section-title">Earn AestheticBiz Points on every visit</h1>
          <p className="section-lead">
            Points turn one-time Midtown patients into regulars — and make it natural to add
            retail or a package. That is how you grow <strong>basket size</strong> (the total a
            patient spends with you over a visit or relationship).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="benefits-grid" style={{ marginBottom: 48 }}>
            <article className="benefit-card">
              <div className="benefit-icon">1</div>
              <h3>Earn</h3>
              <p>
                Treatments and product purchases earn points automatically when members check out
                on the AestheticBiz platform.
              </p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon">2</div>
              <h3>Return</h3>
              <p>
                Email/SMS reminders bring patients back before skin goals slip — filling midweek
                chairs.
              </p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon">3</div>
              <h3>Redeem</h3>
              <p>
                Points apply to future treatments or retail — increasing willingness to say yes to
                the add-on.
              </p>
            </article>
          </div>

          <h2 className="section-title" style={{ fontSize: 32, marginBottom: 16 }}>
            Example earnings
          </h2>
          <p className="section-lead" style={{ marginBottom: 20 }}>
            Illustrative preview rates (final program set with management).
          </p>
          <table className="points-table">
            <thead>
              <tr>
                <th>Purchase</th>
                <th>Spend</th>
                <th>Example points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pigmentation peel</td>
                <td>$220</td>
                <td className="points-earned">+220 pts</td>
              </tr>
              <tr>
                <td>Acne facial</td>
                <td>$150</td>
                <td className="points-earned">+150 pts</td>
              </tr>
              <tr>
                <td>Lip Filler (0.5 ml)</td>
                <td>$450</td>
                <td className="points-earned">+450 pts</td>
              </tr>
              <tr>
                <td>Demo Clinical Radiance Serum</td>
                <td>$68</td>
                <td className="points-earned">+68 pts</td>
              </tr>
              <tr>
                <td>Demo Clinical Clarify Gel</td>
                <td>$42</td>
                <td className="points-earned">+42 pts</td>
              </tr>
            </tbody>
          </table>

          <DemoForm
            title="Join AestheticBiz Points"
            subtitle="Demo signup"
            submitLabel="Create member account (demo)"
            alertMessage="Preview only — live platform creates the member account."
            style={{ maxWidth: 480, marginTop: 40 }}
          >
            <div className="form-row">
              <label>Full name</label>
              <input required placeholder="Your name" />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" required placeholder="you@email.com" />
            </div>
            <div className="form-row">
              <label>Phone</label>
              <input type="tel" required placeholder="(347) …" />
            </div>
          </DemoForm>
        </div>
      </section>

      <SiteFooter
        compact
        note="Loyalty increases return visits & basket size · CRM Solutions preview"
        source="aestheticbiz-rewards"
      />
    </>
  );
}
