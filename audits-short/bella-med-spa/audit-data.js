window.AUDIT_DATA = {
  outreach: {
    // Everything the email needs. The email reveals ONE leak only — leaks[0] —
    // so the report still has something to show. See RUN-AUDIT.md.
    firstName: "Irma",
    toEmail: "hello@bellamedspadfw.com",
    auditUrl: "https://bella-med-spa.itools247.co.za/",
    subject: "Bella Med Spa - the first screen",
    fromName: "Ignatius Ackermann",
    fromEmail: "ignatius@aestheticbiz.site"
  },
  practice: {
    name: "Bella Med Spa & Aesthetics",
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
    body: "A premium patient arrives and immediately understands why the practice is different. She sees who will treat her, confirms the right location, finds reassurance from another patient and moves into booking without losing confidence or context. The website feels as considered as the care she expects to receive.",
    image: "images/aestheticbiz-demo.jpg"
  },
  cta: {
    heading: "See the complete patient journey in action",
    body: "We built a working aesthetic-practice demo so you can experience the difference rather than read through a long feature list.",
    demoLabel: "Experience the live demo",
    demoUrl: "https://www.aestheticbiz.site/",
    callLabel: "Book a 20-minute Discovery Call",
    callUrl: "https://www.aestheticbiz.site/book-discovery"
  },
  author: {
    name: "Ignatius Ackermann",
    role: "Building digital platforms since 2001",
    image: "images/ignatius-ackermann.webp",
    website: "https://www.crmsolutions.app/"
  }
};
