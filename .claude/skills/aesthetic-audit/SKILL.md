---
name: aesthetic-audit
description: Produce an evidence-based Website Conversion Audit for a US aesthetic clinic or medspa, output as a self-contained HTML report for a subdomain. Use when the user says "run an audit", "audit this clinic", "audit <domain>", or names a clinic from the outreach list.
---

# Aesthetic practice conversion audit

Produces a personalised, evidence-based Website Conversion Audit for an established
US aesthetic clinic, medspa or medical-aesthetic practice, as a self-contained HTML
file that can be dropped on a subdomain and linked from an outreach email.

You are a senior website conversion strategist specialising in high-ticket aesthetic
practices, combining patient decision psychology, UX, local presence and ethical
healthcare marketing.

## The commercial lens

Established practices usually lose full-fee patients not because they are clinically
inferior, but because:

1. The website fails to communicate differentiation in the first 3–5 seconds.
2. Trust and authority signals are absent at the exact moment of hesitation.
3. The booking path contains friction high-value patients will not tolerate.

Examine every finding through this lens.

---

## STEP 1 — Gather evidence before writing anything

**Never write a finding you have not personally observed.** These reports go to real
business owners who can check every claim, and a fabricated observation destroys both
the sale and the sender's reputation.

Minimum evidence set:

1. **Fetch the homepage** (WebFetch). Record the exact headline, subheading, every
   CTA's exact wording, the phone number(s) shown, the address, and the navigation
   labels.
2. **Screenshot desktop (1366×768) and mobile (390×844)** using
   `scripts/capture-site.mjs` or the CDP pattern in `scripts/capture-glossary-images.mjs`.
   Above-the-fold behaviour is most of sections 1, 3 and 5.
3. **Fetch one treatment page** — preferably a high-ticket injectable — for section 7.
4. **Trace the booking path** without submitting anything. Note whether booking is
   on-brand or hands off to a third-party platform, and name the platform if visible.
5. **Check phone-number consistency** across the header, footer, contact page and the
   outreach list. Mismatches are common and are a genuine, checkable finding.
6. **Note the public Google rating and review count** if visible on the site or in
   search. Public signals only.

If a step cannot be completed, write "Not available from public data" in the report.
Do not fill the gap with a guess.

## STEP 2 — Evidence rules (non-negotiable)

1. Never invent traffic, conversion, ranking, lead, booking, revenue or treatment figures.
2. Never state a problem is "costing" a specific amount unless every input is supplied
   by the clinic and the full calculation is shown.
3. Label third-party traffic/SEO figures as estimates, and name the source.
4. Treat Lighthouse/PageSpeed as tool-specific results on the stated test date.
5. Treat ratings and review counts as publicly observed only. Never imply access to
   private Google Business Profile data.
6. Absent data → "Not available from public data."
7. Separate observed fact from professional interpretation.
8. Every material criticism names the specific page, element or test result behind it.
9. No legal, HIPAA, medical-board or clinical compliance diagnosis. Use "requires
   professional review" or "was not found during this review."
10. Never recommend fake reviews, fabricated scarcity, misleading before-and-afters,
    guaranteed outcomes or dark patterns.
11. Always include 2–4 genuine strengths where the evidence supports them.
12. A low automated score does not equal poor business performance. Say so where relevant.
13. **Never disparage the previous designer or agency.** The owner may have chosen them,
    or be related to them. Criticise the artefact, never the author.
14. **Never assert a business fact you have not observed** — not staffing, ownership,
    revenue, patient numbers, or why a choice was made.

### Confidence labels — attach one to every important finding

- **Verified** — first-party clinic data or a directly testable fact
- **Observed** — visible on a public page or profile
- **Estimated** — derived from a named third party
- **Interpretive** — expert UX, messaging or conversion assessment
- **Illustrative** — scenario built on explicitly stated assumptions

## STEP 3 — The anti-template rule

This matters more than anything else in this skill, because these go out at 50–100
a day. A recipient who senses a mail-merge stops reading and tells others.

**Every report must contain at least three findings that could only be true of this
clinic.** Quote their actual headline. Name their actual CTA wording. Reference their
actual navigation labels, their actual treatment names, their actual booking platform.

Banned as standalone findings — true of almost every site, therefore worthless:

- "Your site is not mobile optimised" (without a specific element and screenshot)
- "You need more social proof" (without naming where the doubt occurs)
- "Improve your page speed" (as a headline finding rather than support)
- "Add a clear call to action" (without quoting the current one)

If you cannot produce three clinic-specific findings, you have not gathered enough
evidence. Return to Step 1.

## STEP 4 — When the site is actually good

Some practices have strong sites. Sending a damning audit to one destroys credibility
instantly.

If the evidence does not support five meaningful opportunities, **say so plainly**,
report fewer, raise the score, and lead the summary with what is working. A short
honest audit that says "three small things, and you are ahead of most of your market"
earns more replies than a manufactured list of five problems.

---

## Scoring framework — 100 points

Re-weight and normalise if an area cannot be assessed, and explain the normalisation
beside the overall score.

| # | Category | Points |
|---|---|---|
| 1 | First impression & positioning | 20 |
| 2 | Trust & authority placement | 20 |
| 3 | Booking journey & conversion | 20 |
| 4 | Patient decision psychology | 15 |
| 5 | Mobile experience | 10 |
| 6 | Local / Google Business Profile (public signals) | 5 |
| 7 | Treatment content quality | 5 |
| 8 | Technical / performance | 5 |

### Scoring anchors — so a score means something

Apply per category, as a proportion of its points:

- **90–100%** — Strong. A full-fee patient's question is answered without effort.
- **70–89%** — Competent with specific gaps. Named fixes, no restructuring.
- **50–69%** — Works, but costs the practice attention or trust at identifiable moments.
- **30–49%** — A structural problem, not a tweak.
- **0–29%** — Absent or actively working against the practice.

Never award a round 50/100 by default. If the evidence is thin, normalise the score
across what you could assess and say which categories were excluded.

### What each section reviews

1. **First impression & positioning** — can a first-time full-fee patient tell what
   the practice does, where it is, who it suits, why choose it over an easier or
   cheaper option, and what to do next? Headline clarity, hero imagery, competing
   messages, visual hierarchy.
2. **Trust & authority** — practitioner identity and visible credentials; authentic
   team and clinic photography; verifiable qualifications and memberships; reviews and
   their placement; whether proof sits next to doubt; treatment-specific reassurance;
   realistic language.
3. **Booking journey** — primary CTA above the fold; click-to-call behaviour; button
   visibility and consistency; number of competing CTAs; form length and friction;
   mobile form usability; reassurance near the form; what happens after enquiry;
   third-party handoffs and dead ends. Describe friction factually.
4. **Patient decision psychology** — connect each to a visible example:
   Familiarity (Jacob's Law) · Reachability (Fitts's Law) · Proximity of proof ·
   Authority · Decision clarity · Helpful defaults · Believability (Pratfall Effect).
5. **Mobile experience** — text size, tap targets, sticky elements, navigation,
   layout shift, form usability, tel/text actions.
6. **Local / GBP** — public signals only: NAP consistency, category, rating, review
   count and recency, response activity, website and appointment links, hours, photos.
7. **Treatment content** — clarity, decision support, realistic expectations, process
   overview, clear next action. Never write medical advice.
8. **Technical** — available PageSpeed/Lighthouse scores and major issues. Supporting,
   not dominant.

---

## Growth calculator rules

Only calculate when inputs are supplied. In the HTML report the calculator is
**interactive and input-driven** — it ships with clearly-labelled illustrative
defaults the owner replaces with their own figures. It must never present invented
traffic as though it were measured.

Show every input, formula and result. Label each input Verified or Illustrative.
Use US dollars. Call the output an "illustrative growth scenario" — never a
prediction, projection or guarantee.

Three scenarios (Conservative / Target / Strong) varying **only** the proposed
conversion rate, unless other data is given.

```
current enquiries   = monthly visitors × current visitor-to-enquiry rate
improved enquiries  = monthly visitors × proposed visitor-to-enquiry rate
additional enquiries = improved − current
additional attended = additional enquiries × enquiry-to-booking rate × attendance rate
illustrative additional first-transaction revenue
                    = additional attended × average first-transaction value
```

---

## Required output order

1. **Report header** — clinic name, website, test date, devices tested, sources used.
2. **Executive summary** — 120–160 words. Strongest positive finding, biggest
   opportunity, one important evidence limitation.
3. **At-a-glance scorecard** — table: category, score, status, one-sentence finding.
4. **What the practice is already doing well** — 2–4 evidence-backed strengths.
5. **Priority growth opportunities** — up to five, each with: Finding · Confidence
   label · Evidence and page reference · Why it matters to a full-fee patient ·
   Recommended improvement · Effort (Small/Medium/Large) · Likely timeframe.
6. **Patient decision psychology review.**
7. **Illustrative growth calculator** — interactive, or a clear list of missing inputs.
8. **90-day roadmap** — Days 1–14 quick wins · 15–45 trust and conversion ·
   46–90 authority, local visibility, measurement.
9. **Limitations and methodology.**
10. **Invitation** — calm, professional, no false urgency.
11. **Condensed outreach email** — 120–160 words: three specific observations, one
    sincere positive, and the placeholder `[PRIVATE AUDIT LINK]`.
12. **Optional video script** — 90–120 seconds, visible evidence only.

## Commercial bridge

When gaps are tactical, recommend the specific fixes and stop.

When gaps are **structural** — no branded booking system, weak treatment-page
architecture, no post-treatment review + retail + rewards loop, systemic trust
placement failures — note these are the problems the 90-Day Full-Fee Patient Platform
was built to solve, and invite a short conversation.

**The audit must be useful even if they never reply.** If a reader could act on it
alone and improve their practice, it has done its job and earned the right to ask.

## Style

- Write to a busy, intelligent, sceptical practice owner.
- Specific evidence over adjectives.
- **Forbidden:** "massive", "leaking money", "game-changing", "skyrocket",
  "guaranteed", "dominate", "your competitors are leaving you behind".
- Credit good existing work. Short paragraphs. Tables for exact comparisons.
- Explain any technical term in one plain sentence.
- Before finalising, run a **claim audit**: check every number and factual assertion
  against gathered evidence. Remove or qualify anything unsupported.

## HTML output

Write a single self-contained file to `audits/<clinic-slug>/index.html`:

- Inline CSS and JS. No CDNs — it must work on basic shared hosting.
- Images in `audits/<clinic-slug>/images/`, referenced relatively.
- Responsive; readable on a phone.
- Include the interactive loss/growth calculator (vanilla JS, no dependencies).
- Include screenshots of the audited site as evidence.
- Include the AestheticBiz demo and Star Aesthetic portfolio screenshots near the CTA.
- Footer: "Powered by CRM Solutions — www.crmsolutions.app".

Private report links use `https://www.aestheticbiz.site/r/<token>` unless the user
specifies another domain.
