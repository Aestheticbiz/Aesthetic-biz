import Link from "next/link";

const FAQ = [
  {
    q: "Why do on-site patient reviews matter to the business — not just to vanity?",
    a: "Maps and Google already send strangers to your door. If they land on a weak site with no proof, they bounce. Reviews on your domain keep trust inside your brand, raise consult conversion, and give the front desk language patients already believe. In 2030, the practices that win are the ones that own the story after the click — not only the star rating on someone else’s platform.",
  },
  {
    q: "How do reviews contribute to the bottom line?",
    a: "They shorten the decision cycle. A patient who reads three credible stories books faster, asks fewer fear questions, and is more likely to accept a full plan (treatment + retail). That is diary fill and basket size — not “engagement.” Automated review requests after a visit (platform package) turn happy outcomes into compounding proof without sticky-note reminders.",
  },
  {
    q: "What does a branded website actually change for revenue?",
    a: "It stops the silent leak where Maps traffic meets a brochure that undercuts your prices. Clear treatment pages, speed, and a Midtown-grade presentation make premium fees feel consistent. The site is not decoration — it is the first sales floor patients enter before they ever call.",
  },
  {
    q: "Why keep booking on-brand instead of Square or Calendly?",
    a: "Every hand-off to a third-party screen is a drop-off. On-brand booking keeps the patient in your world, opens the door to packages, points and retail, and fills the diary with people who already saw your proof and products. Empty chairs are the expensive alternative.",
  },
  {
    q: "How do the Skin Survey and lead forms grow the practice?",
    a: "They capture intent when someone is curious but not ready to call. Answers become a CRM lead with a Skin Health Score — so follow-up is specific, not “just checking in.” That is how after-hours interest becomes tomorrow’s consult instead of a lost scroll.",
  },
  {
    q: "What do gift vouchers and loyalty points do for cashflow?",
    a: "Gifts pull forward holiday and referral spend. Points (~5% back) bring patients back and make the second product an easy yes. Both keep money and relationships inside your system — instead of paper vouchers and punch cards that never get redeemed with you.",
  },
  {
    q: "Why does featured retail belong on the homepage?",
    a: "Chair time alone is a ceiling. Home-care and clinical retail extend every visit into weeks of revenue. When products sit on the homepage with real prices — not a broken Store link — the cupboard empties into patient carts instead of staff samples.",
  },
  {
    q: "What do CRM, email/SMS and automations protect you from?",
    a: "Lost WhatsApps and “we’ll call them Monday.” Pipeline + reminders + survey-to-booking workflows mean interest does not die between enquiry and visit. That is conversion insurance for a clinic that cannot staff a 24/7 sales desk.",
  },
  {
    q: "Where does Adel fit — and what is still next phase?",
    a: "Adel is the on-site voice guide for owners exploring this Patient Revenue Platform: she explains business components, not treatments. Phone Voice AI and missed-call text-back are next phase — named honestly until carrier verification and go-live are done. Do not buy a story that pretends the phone is already answered.",
  },
  {
    q: "What should an aesthetic practice look like by 2030?",
    a: "One connected system: attract → book → treat → sell retail → earn reviews → return. Website, booking, commerce, loyalty, reputation and follow-up working as one Patient Revenue Platform — not a patchwork of monthly tools that never speak to each other. That is the business AestheticBiz demonstrates.",
  },
] as const;

export function ReviewsBusinessFaq() {
  return (
    <section className="section section-alt" id="reviews-faq">
      <div className="shell shell-narrow">
        <div className="section-header">
          <span className="eyebrow">For practice owners</span>
          <h2 className="section-title">Why this board exists — and what each piece earns</h2>
          <p className="section-lead">
            Patient reviews are one component of the Patient Revenue Platform. Use these answers when
            you evaluate what actually moves the diary and the till toward 2030.
          </p>
        </div>
        <div className="rev-faq-list">
          {FAQ.map((item) => (
            <details key={item.q} className="rev-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <p className="rev-faq-more">
          Full component map:{" "}
          <Link href="/features">Business components</Link>
          {" · "}
          <Link href="/biz">Owner landing</Link>
        </p>
      </div>
    </section>
  );
}
