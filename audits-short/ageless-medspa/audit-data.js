window.AUDIT_DATA = {
  outreach: {
    // Everything the email needs. The email reveals ONE leak only — leaks[0] —
    // so the report still has something to show. See RUN-AUDIT.md.
    firstName: "Dr. Sypien",
    toEmail: "info@agelessmedspa.net",
    auditUrl: "https://audit.aestheticbiz.site/ageless-medspa/",
    // Pattern: "<First name> - I reviewed <practice>'s patient journey"
    subject: "Dr. Sypien - I reviewed Ageless MedSpa's patient journey",
    fromName: "Ignatius Ackermann",
    fromEmail: "ignatius@aestheticbiz.site",
    // One specific thing they already do well, in a short phrase that completes
    // "...particularly ___". Evidence that you actually looked. Keep it factual.
    credit: "leading with physician-led care rather than the practice name, and putting your phone number, address and email above the fold"
  },
  practice: {
    name: "Ageless MedSpa by Dr. Sypien",
    // How the practice is referred to in prose. The full legal name reads badly
    // in a possessive ("Bella Med Spa & Aesthetics’s"), so keep this short.
    shortName: "Ageless MedSpa",
    websiteLabel: "agelessmedspa.com",
    websiteUrl: "https://agelessmedspa.com/",
    location: "Chicago, IL",
    reviewDate: "20 August 2026",
    devices: "Desktop 1366 x 768 / Mobile 390 x 844"
  },
  report: {
    title: "Three places where a first-time patient may hesitate",
    summary: "Ageless MedSpa opens well. The first screen leads with physician-led care rather than the practice name, and the phone number, address and email are visible before a visitor scrolls. This is not a case for rebuilding anything. The clearest opportunity is what happens next - the path from that promise to a confirmed appointment asks more of a first-time patient than it needs to.",
    pdfFile: "ageless-medspa-audit.pdf",
    alsoNoticed: "Chicago is not named beside the first booking action, though the street address does appear in the bar above it."
  },
  strength: {
    title: "The promise on the first screen is the right one",
    body: "The headline sells the difference - physician-led care - rather than repeating the practice name. Phone, address and email sit above the fold, and a booking action is present on every screen. The work now is protecting that promise all the way through to a booked appointment."
  },
  screenshots: {
    desktop: { src: "images/audited-desktop.png", alt: "Ageless MedSpa homepage on desktop", caption: "Desktop first screen, reviewed 20 August 2026 at 1366 x 768." },
    mobile: { src: "images/audited-mobile.png", alt: "Ageless MedSpa homepage on mobile", caption: "Mobile first screen, reviewed 20 August 2026 at 390 x 844." }
  },
  leaks: [
    {
      category: "Booking journey",
      title: "The booking action leaves your website",
      observed: "Every BOOK NOW button resolves to agelessmedspa.zenoti.com/webstoreNew/services. The patient is moved off agelessmedspa.com to a different domain to choose a service and complete the appointment.",
      why: "A first-time patient who has just decided to trust a physician-led practice is handed to an unfamiliar address. The page carries the Ageless name, but the domain, the layout and the navigation all change at the moment confidence matters most.",
      opportunity: "Keep the choosing and booking steps on agelessmedspa.com, or carry the practice header, address and reassurance through the handoff so the patient never appears to leave."
    },
    {
      category: "Decision load",
      title: "Seventy menu links stand between interest and a choice",
      observed: "The main navigation offers eleven top-level categories - Injectables, Laser Treatments, Microneedling, Facials, Peels, Body Treatments, Permanent Makeup, Ageless Wellness, Shop, About and Contact - opening to roughly seventy individual treatment links, among them Gold Microinfusion, EZgel PRF, Bright & Tight and Pico Laser.",
      why: "A returning patient knows which one she wants. A first-time patient does not, and a menu organised by technology rather than by concern asks her to self-diagnose before she can book.",
      opportunity: "Offer a short path by concern - lines and wrinkles, pigmentation, skin laxity, hair - ahead of the full treatment index, so a new patient can reach a consultation without naming a device."
    },
    {
      category: "Authority",
      title: "The physician-led promise has no face on the first screen",
      observed: "The headline reads “Discover the difference in physician-led care” and the logo carries “by Dr. Sypien M.D.”, but the first screen shows no photograph of the physician, no stated qualification and no patient rating beside the booking action.",
      why: "Physician-led is the strongest claim on the page and the reason a patient would pay more here than at a salon. On the first screen it is an assertion rather than something the visitor can see.",
      opportunity: "Place Dr. Sypien - photograph, qualification and one short patient rating - inside the first screen, next to the booking action the claim is meant to support."
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
