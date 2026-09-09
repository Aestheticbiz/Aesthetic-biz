/* ═══════════════════════════════════════════════════════════════════
   ONE FILE PER PRACTICE. EDIT THIS, NOTHING ELSE.
   ───────────────────────────────────────────────────────────────────
   Same discipline as audit-master/audit-data.js: the page, the booking
   diary and Sandy's knowledge all read from here, so they cannot drift
   apart. If a fact is not in this file, Sandy is not allowed to say it.

   To build a new demo:
     1. node new-demo.mjs <slug> "<Practice Name>"
     2. drop their real logo, hero and treatment images into assets/
     3. fill in this file
     4. node build.mjs
     5. open index.html

   NEVER invent a credential, a review, a practitioner or a price.
   Anything left blank switches its section off rather than faking it.
   ═══════════════════════════════════════════════════════════════════ */

export default {

  /* ── 1. BRAND — the only two colour numbers on the whole site ──── */
  brand: {
    hue: 20,              // --brand-h : pull from their logo
    saturation: '18%',    // --brand-s : 10-25% for muted, 60-90% for vivid
    accentHue: 24,        // one highlight colour, separate from primary
    accentSaturation: '23%',
    accentLightness: '60%',
    primaryLightness: '18%',   // where the main brand colour sits on the scale
    radius: '0.125rem',        // 0 = architectural · 0.5rem = clinical
    fontHeading: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'DM Sans', system-ui, -apple-system, sans-serif",
    googleFonts: 'Cormorant+Garamond:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700',
    starHue: 31,          // rating stars
  },

  /* ── 2. WHICH SECTIONS EXIST ───────────────────────────────────
     false = the section is not rendered at all. Never delete markup
     by hand; a stray closing tag is how a broken page gets sent. */
  sections: {
    trust: true,
    treatments: true,
    results: true,        // before & after
    practitioners: false, // needs real names + photos, or leave off
    credentials: true,
    benefits: true,
    products: true,
    membership: true,
    financing: false,     // Cherry / PatientFi / Klarna
    loyalty: false,       // Allē / Aspire / Evolus Rewards
    offer: false,         // new-patient offer
    proof: true,
    faq: false,
    instagram: true,
    locations: true,
    sandy: true,
    upgrade: true,        // "the same agent can answer the phone"
  },

  /* ── 3. THE PRACTICE ───────────────────────────────────────────── */
  practice: {
    name: 'Bella Med Spa & Aesthetics',
    shortName: 'Bella',
    domain: 'bellamedspadfw.com',
    logoDark: 'assets/logo-dark.webp',    // for light backgrounds
    logoLight: 'assets/logo-light.webp',  // for dark backgrounds
    phone: '972-435-9814',
    phoneHref: '+19724359814',
    instagram: 'https://www.instagram.com/bella.medspa/',
    instagramHandle: '@bella.medspa',
    tagline: 'Advanced aesthetics. Personalized care. Lasting confidence.',
    story: 'Started in a single treatment room in Highland Park; now two locations across DFW.',
  },

  /* ── 4. HERO — who it is for, what you do, why care, one action ── */
  hero: {
    image: 'assets/hero-bella-dallas.webp',
    imageAlt: '',
    eyebrow: 'For women in Dallas & McKinney who want to age on their own terms',
    headline: 'The boutique medical spa in Dallas and McKinney.',
    sub: 'Injectables, skin, laser and medical wellness — assessed individually and planned around your face, not ordered off a menu.',
    cta: 'Book a consultation',
    fine: 'No obligation · Same-week appointments · Dallas & McKinney',
  },

  /* ── 5. PROOF — verifiable only ────────────────────────────────── */
  proof: {
    rating: '4.8',
    reviewCount: '523+',
    reviewSource: 'Google',
    award: 'Best of Advocate 2025',
    awardNote: 'Voted by Dallas readers',
    reviewers: ['Nicole Nichols', 'Felipa Gonzalez', 'Jarline Deleon', 'Ivonne Diaz', 'Jorge Vi'],
    stats: [
      { n: '4.8', label: 'Average Google rating' },
      { n: '523+', label: 'Reviews from real guests' },
      { n: '2025', label: 'Best of Advocate, Dallas' },
      { n: '2', label: 'Locations across DFW' },
    ],
  },

  /* ── 6. TRUST STRIP — four verified signals, icons by key ──────── */
  trust: [
    { icon: 'award', title: 'Best of Advocate 2025', note: 'Voted by Dallas readers' },
    { icon: 'shield', title: 'Nurse-led injectables', note: 'Delivered by the practice’s own nursing staff' },
    { icon: 'drop', title: 'Evolus partner clinic', note: 'Advanced injectable portfolio' },
    { icon: 'book', title: 'ZO® Skin Health', note: 'Physician-grade skincare in clinic' },
  ],

  /* ── 7. TREATMENTS — image-led panels ──────────────────────────── */
  treatments: {
    eyebrow: 'Treatments',
    heading: 'Four practices, one team, two rooms in DFW.',
    panels: [
      {
        name: 'Injectables', image: 'assets/svc-injectables.webp',
        href: 'https://bellamedspadfw.com/our-services/injectables/',
        items: ['Bella Tox · Mini Tox · Mature Tox', 'Filler · Non-surgical nose job',
                'Lip flip · Brow lift', 'Jawline slimming', 'Axilla — underarm sweating'],
      },
      {
        name: 'Skin', image: 'assets/svc-skin.webp',
        href: 'https://bellamedspadfw.com/our-services/skin-treatments/',
        items: ['VirtueRF microneedling', 'Facials · Peels', 'PDO threads',
                'Brows & lashes · Waxing', 'Skin analysis — in person or virtual'],
      },
      {
        name: 'Wellness', image: 'assets/svc-wellness.webp',
        href: 'https://bellamedspadfw.com/our-services/wellness/',
        items: ['Semaglutide GLP-1 shot', '6, 9 and 12-week programs',
                'B12 lipotropic', 'Peptides', 'Hair transplant'],
      },
      {
        name: 'Laser', image: 'assets/svc-laser.webp',
        href: 'https://bellamedspadfw.com/our-services/laser/',
        items: ['CO2 Cool Peel', 'Deep CO2 resurfacing', 'PlaDuo plasma', 'Laser hair removal'],
      },
    ],
  },

  /* ── 8. BEFORE & AFTER — empty categories show the honest slot ─── */
  results: {
    eyebrow: 'Results',
    heading: 'Before and after, by treatment.',
    lede: 'One pair at a time, chosen by category, so nobody has to scroll a wall of thumbnails to find the thing they came for.',
    categories: ['Injectables', 'Skin', 'Laser', 'Wellness'],
    pairs: {},   // e.g. Injectables: [{ before: 'assets/ba1-before.webp', after: 'assets/ba1-after.webp' }]
    emptyNote: '<strong>These frames are empty on purpose.</strong> Bella has before-and-after results on Instagram, but none of them are on the website — which is where someone deciding on a treatment actually looks. Drop the photographs in and this section fills itself.',
  },

  /* ── 9. PRACTITIONERS — off unless there are real people ───────── */
  practitioners: {
    eyebrow: 'Your team',
    heading: '',
    photo: 'assets/member-1.webp',
    photoCaption: '',
    people: [],  // { name, credential, role, photo, does }
  },

  /* ── 10. CREDENTIALS — the "who treats you" argument ───────────── */
  credentials: {
    eyebrow: 'Who treats you',
    heading: 'A needle in your face is not a haircut.',
    lede: 'The single most common reason someone leaves an aesthetics website without booking is that they never found out who would be treating them.',
    photo: 'assets/member-1.webp',
    photoCaption: 'The Bella team. Their own photograph — it does not appear on their website.',
    cards: [
      { title: 'Nurse injectors, on staff', body: 'Bella\'s own team wear the title Beauty Nurse. Injectables are delivered by qualified providers rather than a rotating list of visiting practitioners — but the website never says so, and never shows a face. Names, credentials and photographs belong here.' },
      { title: 'Recognised in Dallas', body: 'Bella holds a <strong>Best of Advocate 2025</strong> award, framed on the wall in the treatment room, alongside others. Not one of them appears on the website. An award a patient can see is worth more than an adjective they have to believe.' },
    ],
  },

  /* ── 11. BENEFITS ──────────────────────────────────────────────── */
  benefits: {
    eyebrow: 'For our patients',
    heading: 'What you get that a chain cannot give you.',
    items: [
      { title: 'One face, one plan', body: 'Treatments are planned around your anatomy and what you want to keep, not sold as a package. Mature Tox and Mini Tox exist because a 28-year-old and a 55-year-old are not the same brief.' },
      { title: 'Two rooms, same team', body: 'Dallas and McKinney run one standard of care. Book whichever is closer without wondering whether you are getting the B team.' },
      { title: 'Skin care that continues at home', body: 'ZO® Skin Health is dispensed in clinic and matched to the treatments you have, so your routine at home and your plan in clinic are the same plan.' },
      { title: 'A room that feels like a retreat', body: 'Bella started in a single treatment room in Highland Park. It still feels less like a clinic and more like somewhere you would choose to spend an hour.' },
    ],
  },

  /* ── 12. PRODUCTS — a rail, four visible ───────────────────────── */
  products: {
    eyebrow: 'Professional care at home',
    heading: 'ZO® Skin Health, dispensed in clinic.',
    lede: 'Bella\'s best sellers. Physician-grade, matched to your plan rather than picked off a shelf.',
    href: 'https://bellamedspadfw.com/products/',
    items: [
      { name: 'Gentle Cleanser', note: 'Best seller', image: 'assets/prod-gentle-cleanser.webp' },
      { name: 'Exfoliating Polish', note: 'Best seller', image: 'assets/prod-exfoliating-polish.webp' },
      { name: 'Complexion Renewal Pads', note: 'Best seller', image: 'assets/prod-complexion-renewal-pads.webp' },
      { name: 'Oil Control Pads', note: 'Best seller', image: 'assets/prod-oil-control-pads.webp' },
      { name: 'Daily Power Defense', note: 'Best seller', image: 'assets/prod-daily-power-defense.webp' },
      { name: 'Firming Serum', note: 'Best seller', image: 'assets/prod-firming-serum.webp' },
      { name: 'Wrinkle + Texture', note: 'Best seller', image: 'assets/prod-wrinkle-texture.webp' },
    ],
  },

  /* ── 13. MEMBERSHIP ────────────────────────────────────────────── */
  membership: {
    eyebrow: 'Exclusive membership',
    anchor: 'Member pricing on every visit, all year.',
    anchorSub: 'Plus priority booking at both locations and a plan that is reviewed as you go, rather than restarted every time.',
    cta: 'Explore membership',
    href: 'https://bellamedspadfw.com/membership-program/',
    images: ['assets/member-2.webp', 'assets/member-3.webp'],
    faq: [
      { q: "What's included", a: 'Member-only pricing on treatments, exclusive seasonal savings, and priority booking in Dallas and McKinney.' },
      { q: 'Your plan', a: 'A personalized treatment plan across the year, adjusted as your skin and goals change.' },
      { q: 'Laser membership', a: 'A separate laser membership runs alongside, for hair removal and resurfacing courses.' },
      { q: 'The number', a: 'Bella does not publish a monthly price. A visible “from” figure is the single fastest way to turn browsers into members.' },
    ],
  },

  /* ── 14. FINANCING — Cherry / PatientFi / Klarna ───────────────── */
  financing: {
    eyebrow: 'Paying for it',
    heading: '',
    lede: '',
    providers: [],   // { name, note }
  },

  /* ── 15. LOYALTY — Allē / Aspire / Evolus Rewards ──────────────── */
  loyalty: {
    eyebrow: 'Rewards',
    heading: '',
    lede: '',
    programs: [],    // { name, note }
  },

  /* ── 16. NEW-PATIENT OFFER ─────────────────────────────────────── */
  offer: { eyebrow: '', headline: '', body: '', cta: '', terms: '' },

  /* ── 17. FAQ — also feeds Sandy's answers ──────────────────────── */
  faq: {
    eyebrow: 'Questions',
    heading: '',
    items: [],       // { q, a }
  },

  /* ── 18. INSTAGRAM ─────────────────────────────────────────────── */
  instagram: {
    eyebrow: 'Instagram',
    heading: 'The room, the team, the days in between.',
    lede: 'Where Bella’s results actually live — and the reason the website should be showing them too.',
    tiles: [
      { image: 'assets/gram-1.webp', caption: 'Outside the Dallas room' },
      { image: 'assets/gram-2.webp', caption: 'In the treatment chair' },
      { image: 'assets/gram-3.webp', caption: 'The award wall' },
      { image: 'assets/gram-4.webp', caption: 'A natural face lift' },
      { image: 'assets/gram-5.webp', caption: 'Out in the neighbourhood' },
    ],
  },

  /* ── 19. LOCATIONS — drives the map, the picker and the diary ─── */
  locations: {
    eyebrow: 'Find us',
    heading: 'Two rooms, 35 miles apart.',
    lede: 'Choose the one you would actually drive to. The map, the parking and the directions follow.',
    items: [
      {
        id: 'dallas', name: 'Dallas',
        address: '412 S Llewellyn Ave, #150, Dallas, TX 75208',
        hint: 'Bishop Arts / Oak Cliff',
        parking: 'Street parking on S Llewellyn and the surrounding Bishop Arts blocks.',
        lat: 32.7417813, lon: -96.8319395,
        /* Invented clinic hours for the demo diary — day 1 = Monday */
        hours: { 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 19], 5: [9, 17], 6: [10, 15] },
      },
      {
        id: 'mckinney', name: 'McKinney',
        address: '3701 Eldorado Parkway, Suite D, McKinney, TX 75070',
        hint: 'North of Dallas, off Eldorado',
        parking: 'On-site parking at the Eldorado Parkway suites.',
        lat: 33.1679650, lon: -96.6680150,
        hours: { 1: [10, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 16], 6: [10, 14] },
      },
    ],
  },

  /* ── 20. BOOKABLE SERVICES — the demo diary ────────────────────── */
  bookable: [
    { id: 'consult', group: 'Start here', name: 'Consultation', mins: 30, note: 'In person or virtual' },
    { id: 'analysis', group: 'Start here', name: 'Skin analysis', mins: 30, note: 'In person or virtual' },
    { id: 'bella-tox', group: 'Injectables', name: 'Bella Tox', mins: 45 },
    { id: 'mini-tox', group: 'Injectables', name: 'Mini Tox', mins: 30 },
    { id: 'mature-tox', group: 'Injectables', name: 'Mature Tox', mins: 45 },
    { id: 'filler', group: 'Injectables', name: 'Filler', mins: 60 },
    { id: 'lip-flip', group: 'Injectables', name: 'Lip flip', mins: 30 },
    { id: 'axilla', group: 'Injectables', name: 'Axilla — underarm sweating', mins: 45 },
    { id: 'virtuerf', group: 'Skin', name: 'VirtueRF microneedling', mins: 75 },
    { id: 'facial', group: 'Skin', name: 'Facial', mins: 60 },
    { id: 'peel', group: 'Skin', name: 'Peel', mins: 45 },
    { id: 'pdo', group: 'Skin', name: 'PDO threads', mins: 90 },
    { id: 'glp1', group: 'Wellness', name: 'Semaglutide GLP-1 consultation', mins: 30 },
    { id: 'b12', group: 'Wellness', name: 'B12 lipotropic shot', mins: 15 },
    { id: 'coolpeel', group: 'Laser', name: 'CO2 Cool Peel', mins: 60 },
    { id: 'deep-co2', group: 'Laser', name: 'Deep CO2 resurfacing', mins: 90 },
    { id: 'lhr', group: 'Laser', name: 'Laser hair removal', mins: 30 },
  ],

  /* ── 21. SANDY ─────────────────────────────────────────────────── */
  sandy: {
    name: 'Sandy',
    role: 'AI receptionist',
    voice: 'Aoede',          // Leda, Kore, Sulafat, Despina also worth auditioning

    /* ── Turn-taking. These decide whether she feels quick or ponderous.
       Niki's originals (LOW/LOW, 800ms, proactivity on) were tuned for
       hesitant patients and made her uncomfortably slow here: replies
       arrived a question late because proactiveAudio adds a round trip
       deciding whether you were even talking to her.

       If she interrupts you mid-sentence, raise silenceMs first. If she
       feels slow, lower it. Do not turn proactivity back on unless you
       want her weighing whether to answer at all. */
    tuning: {
      startSensitivity: 'START_SENSITIVITY_LOW',   // LOW = background chatter won't trigger her
      endSensitivity: 'END_SENSITIVITY_HIGH',      // HIGH = notices you finished, quickly
      prefixPaddingMs: 60,
      silenceMs: 500,
      proactiveAudio: false,
      affectiveDialog: true,
      temperature: 0.65,
    },

    /* The recogniser has never heard these brand names and mangles them
       — "Bella Tox" came back as "Valor talks" and "Alphabet's Fast".
       Listing the likely mishearings lets her recover instead of saying
       she has never heard of her own treatments. */
    soundsLike: [
      '"Bella Tox" may be heard as valor tox, bell of tox, bella talks or barotox.',
      '"Mini Tox" may be heard as mini talks or many tox.',
      '"Bella Med Spa" may be heard as alamed spa or bella medspa.',
    ],
    greetingCard: 'Hi, this is Sandy at Bella Med Spa. I can explain any treatment, tell you what suits Dallas or McKinney, and take a booking for you. What are you thinking about?',
    panelLede: 'Ask me anything about Bella’s treatments, either location, or book a time. I answer out loud.',
    eyebrow: 'Your virtual assistant',
    heading: 'Meet Sandy, the front desk that never goes home.',
    lede: 'She knows every treatment Bella offers, both addresses, and how the booking works. Ask her out loud — she answers in about a second.',
    asks: [
      '“What’s the difference between Bella Tox and Mini Tox?”',
      '“Do you treat excessive underarm sweating?”',
      '“Can I do the 12-week Semaglutide program in McKinney?”',
      '“How much downtime after a Deep CO2?”',
      '“Book me a virtual skin analysis on Thursday.”',
    ],
    /* Extra facts Sandy may state that appear nowhere else on the page */
    extraFacts: [
      'Evolus partner clinic. ZO® Skin Health dispensed in clinic.',
      'Injectables are delivered by the practice’s own Beauty Nurses.',
    ],
  },

  /* ── 22. THE ASK — Ignatius's Discovery Call ───────────────────── */
  close: {
    heading: 'Turn the demo into a decision.',
    lede: 'Everything on this page came from bellamedspadfw.com and Bella’s own Instagram. Nothing was invented. A 60-minute Discovery Call with Ignatius covers what it takes to run properly — the phone line, the diary, the membership follow-up — and whether it is worth doing at all.',
    chips: ['Founder-led', 'Monday–Friday', 'Automatic timezone conversion', 'Google Calendar & Meet ready'],
    cardEyebrow: 'Your next step',
    cardHeading: 'Book a Discovery Call',
    cardBody: 'Pick a date, choose your local time and tell me what would make the conversation valuable.',
    cardLink: 'View available appointments',
    href: 'https://www.aestheticbiz.site/book-discovery',
  },

  /* ── 23. COMPLIANCE — required, and enforced by build.mjs ────────
     Distilled from the Star Aesthetic rewrite (Dr Rajeev Bangalee,
     16 Aug 2026), which maps almost one-for-one onto the US position:
     FTC truth-in-advertising, FDA drug promotion, and the state medical
     board. For Texas that is TMB rule 22 TAC §165.1, which requires a
     consumer to be able to determine WHICH LICENSED PHYSICIAN stands
     behind the practice. A trade name is not enough.

     Leave medicalDirector blank and the build warns loudly. Put a banned
     absolute anywhere in the copy and the build refuses outright. */
  compliance: {
    /* TMB §165.1 / equivalent. Never guess these — ask the practice. */
    medicalDirector: {
      name: '',            // e.g. 'Dr Jane Smith, MD'
      license: '',         // e.g. 'TMB Licence N1234'
      board: 'Texas Medical Board',
      verified: false,
    },

    /* Beside EVERY before/after gallery. Bangalee site-wide rule 6. */
    resultsVary: 'Individual results vary.',

    /* Rendered in the footer of every page. Bangalee's reusable text,
       adapted: the emergency line matters more than the boilerplate. */
    disclaimer: 'Information on this website is general and does not replace a medical consultation. Suitability, expected outcomes, alternatives, risks and costs are assessed individually. Results and recovery vary. Seek urgent medical advice if you develop severe or worsening pain, unusual skin colour change, visual symptoms, breathing difficulty or another concerning reaction after treatment.',

    /* Refuses the build if any of these appear. Bangalee rule 3, plus
       the FDA weight-loss additions. Extend it, never trim it. */
    bannedWords: [
      'risk-free', 'risk free', 'guaranteed', 'guarantee', 'painless',
      'pain-free', 'zero downtime', 'no downtime', 'permanently erase',
      'erase wrinkles', 'cure', 'detox', 'miracle', 'FDA-approved results',
      'same as Ozempic', 'lose weight fast',
    ],

    /* Reviews: FTC Endorsement Guides + Bangalee rule 5. */
    reviews: {
      permissionObtained: false,
      platform: 'Google',
      note: 'Rating and count taken from the practice’s own About page. Verify before sending.',
    },
  },

  /* ── 24. THE HONESTY LINE — never remove ───────────────────────── */
  demo: {
    builder: 'CRM Solutions',
    ribbonShort: 'built for {practice} by CRM Solutions.',
    ribbonLong: 'Not affiliated with, or operated by, {short}. Bookings made here are not real.',
    footNote: 'This is an unaffiliated demonstration built for {practice} by CRM Solutions / AestheticBiz to show what an AI receptionist and a rebuilt homepage would do on their own site. Content and images are {short}’s own, taken from {domain} and {handle}, used here for that purpose only, and the page will be removed on request. {sandy} is an AI assistant, gives no medical advice, and the bookings she takes here are not real appointments.',
  },
};
