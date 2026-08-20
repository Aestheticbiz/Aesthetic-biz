window.AUDIT_DATA = {
  outreach: {
    // Everything the email needs. The email reveals ONE leak only — leaks[0] —
    // so the report still has something to show. See RUN-AUDIT.md.
    firstName: "Irma",
    toEmail: "hello@bellamedspadfw.com",
    auditUrl: "https://bella-med-spa.itools247.co.za/",
    // Pattern: "<First name> - I reviewed <practice>'s patient journey"
    subject: "Irma - I reviewed Bella Med Spa's patient journey",
    fromName: "Ignatius Ackermann",
    fromEmail: "ignatius@aestheticbiz.site",
    // One specific thing they already do well, in a short phrase that completes
    // "...particularly ___". Evidence that you actually looked. Keep it factual.
    credit: "the prominent booking option and the patient reviews you have published"
  },
  practice: {
    name: "Bella Med Spa & Aesthetics",
    // How the practice is referred to in prose. The full legal name reads badly
    // in a possessive ("Bella Med Spa & Aesthetics’s"), so keep this short.
    shortName: "Bella Med Spa",
    websiteLabel: "bellamedspadfw.com",
    websiteUrl: "https://bellamedspadfw.com/",
    location: "Dallas & McKinney, TX",
    reviewDate: "12 August 2026",
    devices: "Desktop 1366 x 768 / Mobile 390 x 844"
  },
  report: {
    title: "Three places where premium patients may hesitate",
    summary: "Bella Med Spa has a calm, professional website with a prominent booking action and genuine patient proof. This is not a case for rebuilding everything. The clearest opportunity is to remove three moments of uncertainty between a first visit and a confident booking.",
    pdfFile: "bella-med-spa-audit.pdf",
    alsoNoticed: "The booking journey moves to a third-party platform. Where possible, preserve Bella's branding and location context throughout that handoff."
  },
  strength: {
    title: "A strong foundation is already in place",
    body: "The homepage is polished, mobile-friendly and asks visitors to book rather than merely browse. Eight named patient reviews provide genuine proof. The opportunity is to move the best existing information closer to the booking decision."
  },
  screenshots: {
    desktop: { src: "images/audited-desktop.jpg", alt: "Bella Med Spa homepage on desktop", caption: "Desktop first screen reviewed at 1366 x 768." },
    mobile: { src: "images/audited-mobile.jpg", alt: "Bella Med Spa homepage on mobile", caption: "Mobile first screen reviewed at 390 x 844." }
  },
  leaks: [
    {
      category: "Positioning",
      title: "The strongest selling message is visually hidden",
      observed: "The largest headline reads \"Bella Med Spa & Aesthetics\". The more persuasive line - \"advanced cosmetic treatments delivered with medical precision in a welcoming, boutique environment\" - appears beneath it in smaller type.",
      why: "A visitor who clicked the practice name already knows who they reached. The first screen delays the answer to the more important question: why choose Bella?",
      opportunity: "Promote the patient-focused positioning line to the headline and let the logo carry the practice name."
    },
    {
      category: "Authority",
      title: "Medical precision needs visible human proof",
      observed: "The homepage promises treatments delivered with \"medical precision\", but the first booking screen does not identify the treating practitioner or show a relevant qualification beside that promise.",
      why: "For higher-value treatments, patients often want to know who will treat them before they are ready to commit.",
      opportunity: "Introduce the practitioner, appropriate credentials and a real photograph close to the primary booking action."
    },
    {
      category: "Trust and location",
      title: "Reassurance appears after the decision point",
      observed: "Eight patient reviews are published lower on the homepage, while neither Dallas nor McKinney is identified beside the first booking action.",
      why: "The visitor must move beyond the booking decision to find reassurance and must hunt to confirm whether the practice is near them.",
      opportunity: "Place one short review, the review count and both locations directly beneath the hero booking action."
    }
  ],
  future: {
    title: "What the repaired journey feels like",
    body: "A premium patient arrives and immediately understands why the practice is different. She sees who will treat her, confirms the right location, finds reassurance from another patient and moves into booking without losing confidence or context. The website feels as considered as the care she expects to receive."
  },
  cta: {
    heading: "A short conversation, if it is useful",
    body: "This review is yours to use whether or not we ever speak, and your existing web team can act on most of it. Where the leaks are structural rather than cosmetic, that is what we build. Twenty minutes, no slides - and if it is not a fit, you will be told in the first five.",
    demoLabel: "Experience the live demo",
    demoUrl: "https://www.aestheticbiz.site/",
    callLabel: "Book a 20-minute Discovery Call",
    capacity: "Founder-led, and deliberately limited: three practices a quarter.",
    // This section speaks to the practice OWNER, not to a patient. The founder
    // portrait suits it: the call is with a person, and it reinforces the
    // founder-led claim above. Swap the path here to change it.
    image: "images/ignatius-ackermann.webp",
    imageAlt: "Ignatius Ackermann, who runs the Discovery Call",
    callUrl: "https://www.aestheticbiz.site/book-discovery"
  },

  // Two cards: the demo you can drive, and a live client site. Same shape on
  // desktop (side by side) and stacked on mobile.
  showcase: {
    sectionTitle: "What this looks like built",
    lead: "One is a demonstration practice you can use like a patient would. The other is a real clinic, live and trading. Neither is a mockup.",
    demo: {
      kicker: "Demo site - take it for a test drive",
      name: "aestheticbiz.site",
      body: "A complete demonstration practice. Book an appointment, add skincare to a cart, buy a gift voucher, leave a review - all of it works. Experience the improved patient journey rather than read about it.",
      image: "images/aestheticbiz-demo.jpg",
      url: "https://www.aestheticbiz.site/",
      label: "Experience the demo"
    },
    portfolio: {
      kicker: "Portfolio - a live client practice",
      name: "Star Aesthetic Centre",
      body: "A doctor-led clinic in Durban North with twenty years of clinical reputation, rebuilt and running: booking, pharmaceutical-grade skincare, rewards and gift vouchers. Real patients, real bookings.",
      image: "images/star-aesthetic-portfolio.jpg",
      url: "https://www.staraesthetic.co.za/",
      label: "Open staraesthetic.co.za"
    }
  },


  // Sits between the two calculators. This is the only place the report says
  // what AestheticBiz actually is - and it does it by continuing the diagnosis,
  // not by pitching. Keep it short; the moment it reads as a sales page the
  // rest of the report loses its credibility.
  mechanism: {
    kicker: "Why the second visit decides everything",
    title: "The first visit proves demand. The second visit builds the business.",
    lead: "Most marketing stops when the appointment is booked. AestheticBiz connects the complete patient journey - so more of the people you worked hard to attract have a clear reason to return.",
    body: [
      "Marketing usually has an owner. The treatment has an owner. But the journey between “that went well” and “I should book again” often belongs to nobody.",
      "AestheticBiz gives that journey an owner. We connect the website, booking path, follow-up and measurement so the practice can see where value is being lost - and improve the right constraint first.",
      "It also decides what you can afford. A practice whose patients return can pay more for the same enquiry than one whose patients do not, and still profit - which is why rising advertising costs hurt some practices far more than others."
    ],
    // The one line that separates this from a web agency. No adjectives.
    distinction: "An agency hands over a website and moves on. We stay with the journey and the numbers it produces, because the second visit is where the practice actually earns.",
    // Secondary action, deliberately not gold: gold means "Book a Discovery
    // Call" everywhere else in this report. Someone ready to book should not
    // have to choose between two equally loud buttons.
    articleLabel: "Read the article",
    articleUrl: "https://www.aestheticbiz.site/second-visit"
  },
  // Both calculators are hidden from the PDF - they are interactive, and a
  // frozen set of numbers on paper only invites argument.
  calculators: {
    newPatients: {
      kicker: "Calculator one",
      title: "What the leak is worth",
      lead: "Every month, some visitors who wanted to book did not. Put your own figures against that - including how many more patients you think repairing the three leaks would bring.",
      currency: "US$",
      fields: [
        { id: "np-current", label: "New patients per month, now", value: 25, min: 1, max: 300, step: 1 },
        { id: "np-value", label: "Average first-visit value", value: 500, min: 50, max: 5000, step: 25, money: true },
        { id: "np-extra", label: "Additional new patients a month you would expect", value: 3, min: 1, max: 100, step: 1 }
      ]
    },
    returning: {
      kicker: "Calculator two",
      title: "What a returning patient is worth",
      lead: "The first visit is the expensive one. This is the profit in every visit after it.",
      currency: "US$",
      fields: [
        { id: "rt-value", label: "Average visit value", value: 500, min: 50, max: 5000, step: 25, money: true },
        { id: "rt-margin", label: "Gross margin per visit", value: 65, min: 10, max: 95, step: 1, pct: true },
        { id: "rt-visits", label: "Visits a returning patient makes per year", value: 3, min: 1, max: 12, step: 1 },
        { id: "rt-years", label: "Years the relationship lasts", value: 3, min: 1, max: 10, step: 1 }
      ]
    }
  },
  author: {
    name: "Ignatius Ackermann",
    role: "Building digital platforms since 2001",
    image: "images/ignatius-ackermann.webp",
    website: "https://www.crmsolutions.app/"
  }
};
