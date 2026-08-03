/**
 * Patient Revenue Platform — business components for aesthetic clinics.
 * Status is honest for Adel + sales: demo live vs package vs later.
 */

export type ComponentStatus = "live" | "package" | "later";

export type BusinessComponent = {
  name: string;
  outcome: string;
  status: ComponentStatus;
  replaces?: string;
  demoHref?: string;
};

export type BusinessStage = {
  id: string;
  label: string;
  title: string;
  lead: string;
  components: BusinessComponent[];
};

export const STATUS_LABEL: Record<ComponentStatus, string> = {
  live: "Live in demo",
  package: "In the platform package",
  later: "Next phase",
};

/** Capture → Convert → Commerce → Retain — scoped for one clinic. */
export const BUSINESS_STAGES: BusinessStage[] = [
  {
    id: "capture",
    label: "Capture",
    title: "Get the right patients in the door",
    lead: "Stop leaking interest to third-party booking screens, dead Store links, and a site that Maps traffic does not trust.",
    components: [
      {
        name: "Branded website & landing pages",
        outcome:
          "The clinic looks like the prices it charges. Campaign pages (e.g. /biz) continue the outreach story without a template feel.",
        status: "live",
        replaces: "Squarespace / Wix brochure sites",
        demoHref: "/",
      },
      {
        name: "Skin Survey & lead forms",
        outcome:
          "First-time patients self-qualify in minutes. Answers become a CRM lead — not a screenshot in someone’s inbox.",
        status: "live",
        replaces: "Typeform + disconnected CRM paste",
        demoHref: "/skin-survey",
      },
      {
        name: "On-brand booking",
        outcome:
          "Appointments stay inside your brand. Fewer abandoned Square exits; diary fills with patients who already saw retail and points.",
        status: "live",
        replaces: "Square Appointments / Calendly bolt-ons",
        demoHref: "/book",
      },
      {
        name: "SEO & Maps-ready pages",
        outcome:
          "Titles, treatment pages and speed so Google/Maps traffic lands on a practice — not a brochure that undercuts the clinic.",
        status: "package",
        replaces: "Thin template SEO",
        demoHref: "/audit",
      },
      {
        name: "Ad Manager / ads creative",
        outcome:
          "Optional: landing pages and tracking for Google/Meta — not a full ad-agency OS. Scoped per engagement.",
        status: "later",
        replaces: "Standalone landing-page tools",
      },
    ],
  },
  {
    id: "convert",
    label: "Convert",
    title: "Turn interest into booked revenue",
    lead: "The front desk cannot chase every enquiry at 9pm. The system has to hold the conversation until a human takes over.",
    components: [
      {
        name: "CRM & enquiry pipeline",
        outcome:
          "Contact, survey and booking interest in one place — status, follow-up, and no lost WhatsApps.",
        status: "package",
        replaces: "HubSpot lite / spreadsheet CRM",
      },
      {
        name: "Adel — on-site voice guide",
        outcome:
          "Clinic owners exploring this demo get a commercial walkthrough of the platform. Patients can be guided on launch scope; Adel is not a phone agent yet.",
        status: "live",
        replaces: "Generic chat widget with no clinic context",
        demoHref: "/features#adel",
      },
      {
        name: "Phone Voice AI & missed-call text-back",
        outcome:
          "Answer or text back when the line is missed — after hours and during treatments. Carrier verification blocked launch; this is next phase, not vaporware.",
        status: "later",
        replaces: "CallRail + separate AI phone vendors",
      },
      {
        name: "Email & SMS follow-up",
        outcome:
          "Confirmations, reminders, and nurture sequences so leads do not go cold between enquiry and visit.",
        status: "package",
        replaces: "Mailchimp + Twilio stitched with Zapier",
      },
      {
        name: "Workflow automations",
        outcome:
          "If Skin Survey completes → notify studio + send score email + offer booking. Rules you can explain to staff.",
        status: "package",
        replaces: "Zapier / Make glue",
      },
      {
        name: "Discovery / sales calendar (for you)",
        outcome:
          "CRM Solutions Discovery Calls book on a live calendar — same discipline your clinic should offer patients.",
        status: "live",
        demoHref: "/book-discovery",
      },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    title: "Sell more than the chair time",
    lead: "Retail, gifts and loyalty belong on the same platform as booking — or the cupboard stays full and the diary stays thin.",
    components: [
      {
        name: "Featured retail / shop",
        outcome:
          "Homepage products with real price points. Patients add home care before or after the visit.",
        status: "live",
        replaces: "Broken Store menu / Instagram DM orders",
        demoHref: "/shop",
      },
      {
        name: "Gift vouchers",
        outcome:
          "Denominations, message, email delivery — holiday and referral revenue that does not leave your brand.",
        status: "live",
        replaces: "Paper gift cards / third-party vouchers",
        demoHref: "/gift-cards",
      },
      {
        name: "Loyalty / AestheticBiz Points",
        outcome:
          "~5% back on spend. Raises return visits and basket size without sounding pushy at the desk.",
        status: "live",
        replaces: "Punch cards / unused POS points",
        demoHref: "/rewards",
      },
      {
        name: "Payments & deposits",
        outcome:
          "Secure checkout for packages, deposits and gift purchase — provider shown at payment time.",
        status: "package",
        replaces: "Manual EFT + card terminals only",
      },
    ],
  },
  {
    id: "retain",
    label: "Retain",
    title: "Create fans, not one-visit patients",
    lead: "Maps reputation is already working. The website and follow-up must keep that reputation earning.",
    components: [
      {
        name: "Reviews board & video reviews",
        outcome:
          "Written + video trust on your domain — not only on Google where you cannot control the journey.",
        status: "live",
        replaces: "Podium widgets bolted onto a weak site",
        demoHref: "/reviews",
      },
      {
        name: "Automated review requests",
        outcome:
          "After a visit, ask for the review while the experience is fresh — workflow, not sticky notes.",
        status: "package",
        replaces: "Manual SMS from the receptionist’s phone",
      },
      {
        name: "Reactivation campaigns",
        outcome:
          "Birthday, seasonal and “haven’t seen you” sequences for lapsed patients.",
        status: "later",
        replaces: "One-off Mailchimp blasts",
      },
      {
        name: "Admin operations console",
        outcome:
          "Bookings, contact inbox, survey results, voice log, payments and traffic — if the public site creates a row, management can act on it.",
        status: "package",
        replaces: "Resend inbox as ‘the CRM’",
      },
    ],
  },
];

/** Compact “replaces stack” for the comparison strip — aesthetic clinic reality. */
export const REPLACES_ROWS = [
  {
    feature: "Branded site + booking",
    other: "Squarespace + Square Appointments",
    otherCost: "$70+/mo + fees",
  },
  {
    feature: "Surveys & lead capture",
    other: "Typeform + spreadsheet",
    otherCost: "$50+/mo",
  },
  {
    feature: "Email / SMS follow-up",
    other: "Mailchimp + Twilio",
    otherCost: "$100+/mo",
  },
  {
    feature: "Loyalty + gift commerce",
    other: "POS points + paper vouchers",
    otherCost: "Leakage",
  },
  {
    feature: "Reviews on your domain",
    other: "Birdeye / Podium alone",
    otherCost: "$150+/mo",
  },
  {
    feature: "CRM + automations",
    other: "HubSpot lite + Zapier",
    otherCost: "$150+/mo",
  },
] as const;

export const PACKAGE_INVESTMENT = {
  total: "US$10,000",
  split: "50% deposit · 50% pre-launch",
  note: "One Patient Revenue Platform for a single clinic — not a $97/mo agency SaaS. Scope confirmed on Discovery Call.",
} as const;
