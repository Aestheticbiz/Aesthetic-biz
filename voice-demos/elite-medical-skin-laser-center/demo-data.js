/* ═══════════════════════════════════════════════════════════════════
   ONE FILE PER PRACTICE. EDIT THIS, NOTHING ELSE.
   ───────────────────────────────────────────────────────────────────
   Same discipline as audit-master/audit-data.js: the page, the booking
   diary and Sandy's knowledge all read from here, so they cannot drift
   apart. If a fact is not in this file, Sandy is not allowed to say it.

   Every fact below is from myeliteskin.com (About, Meet the Team, FAQs,
   Get In Touch, the treatment pages and the injectables page), from
   their own Instagram-format result cards, or from the Google rating
   carried by two independent directories. Nothing is invented.

   NEVER invent a credential, a review, a practitioner or a price.
   Anything left blank switches its section off rather than faking it.
   ═══════════════════════════════════════════════════════════════════ */

export default {

  /* ── 1. BRAND — the only two colour numbers on the whole site ────
     Sampled from their own logo file: rgb(37, 98, 117) is hue 194 at
     52% saturation, 30% lightness. The blush is theirs too — it is the
     background of every price card and icon tile they publish. */
  brand: {
    hue: 194,
    saturation: '52%',
    accentHue: 6,              // their blush, pulled up to a usable weight
    accentSaturation: '45%',
    accentLightness: '62%',
    primaryLightness: '30%',
    radius: '0.5rem',          // their own graphics are pill-soft, not architectural
    fontHeading: "'Jost', 'Futura', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, -apple-system, sans-serif",
    googleFonts: 'Jost:wght@300;400;500;600&family=Inter:wght@400;500;600;700',
    starHue: 40,
  },

  /* ── 2. WHICH SECTIONS EXIST ───────────────────────────────────
     false = the section is not rendered at all. Never delete markup
     by hand; a stray closing tag is how a broken page gets sent.

     products is OFF on purpose. Elite retail five medical-grade
     brands — Skinbetter Science, EltaMD, PCA Skin, SkinMedica and
     Glymed+ — and not one product photograph exists on their site to
     build a rail from. Their shop sells packages instead. That absence
     is a finding for the memo, not something to fake with stock.

     financing is OFF for the same reason: the nav promises "Treat
     yourself now. Pay Later." and the page behind it renders nothing,
     so we do not know who their provider is. */
  sections: {
    trust: true,
    treatments: true,
    results: true,        // real pairs, from their own result cards
    practitioners: true,  // ten real names off their own team page
    credentials: true,
    benefits: true,
    products: false,
    membership: true,
    financing: false,
    loyalty: false,
    offer: false,
    proof: true,
    faq: true,
    instagram: true,
    locations: true,
    sandy: true,
    upgrade: true,
  },

  /* ── 3. THE PRACTICE ───────────────────────────────────────────── */
  practice: {
    name: 'Elite Medical Skin and Laser Center',
    shortName: 'Elite',
    domain: 'myeliteskin.com',
    logoDark: 'assets/logo-dark.webp',
    logoLight: 'assets/logo-light.webp',
    phone: '281-214-7777',
    phoneHref: '+12812147777',
    instagram: 'https://www.instagram.com/myeliteskin',
    instagramHandle: '@myeliteskin',
    tagline: 'Love the skin you’re in.',
    story: 'Founded in Spring in 2007 by Tonya Cariker, working with Dr. Christine Cheng. One clinic on Richards Road, serving Spring and The Woodlands.',
  },

  /* ── 4. HERO — who it is for, what you do, why care, one action ── */
  hero: {
    image: 'assets/hero-elite.webp',
    imageAlt: 'An Elite provider treating a client in the Spring clinic',
    eyebrow: 'Spring and The Woodlands, since 2007',
    headline: 'The award-winning medical spa in Spring, Texas.',
    sub: 'Injectables, laser, body contouring, skin and medical wellness — planned around your skin by providers who have been on this team for years, not weeks.',
    cta: 'Book a consultation',
    fine: '4.8 from 389 Google reviews · Open until 9pm Tuesday to Thursday · Richards Road, Spring',
  },

  /* ── 5. PROOF — verifiable only ──────────────────────────────────
     The 4.8 / 389 is a Google figure carried by two directories, not
     published by Elite anywhere on their own site. Verify before send;
     see compliance.reviews below. */
  proof: {
    rating: '4.8',
    reviewCount: '389',
    reviewSource: 'Google',
    award: 'RCA Best Botox, Spring TX 2026',
    awardNote: 'Reviewers Choice Award, from verified Google reviews',
    reviewers: []   /* Names removed: FTC endorsement rules want recorded permission, and a public review is not the same as consent to be quoted in advertising. Add them back only with compliance.reviews.permissionObtained = true. */,
    stats: [
      { n: '4.8', label: 'Average Google rating' },
      { n: '389', label: 'Google reviews' },
      { n: '2007', label: 'Serving Spring since' },
      { n: '12', label: 'Awards and partner recognitions' },
    ],
  },

  /* ── 6. TRUST STRIP — four verified signals ─────────────────────
     These are Elite's OWN badge files, lifted from their media library — the
     same four they run under the headline on their homepage. RULES.md H8:
     real artwork, never typed-out names. `icon` stays as the fallback for a
     practice that has no badge to show. */
  trust: [
    { badge: 'assets/badge-hydrafacial.webp', icon: 'drop',
      title: 'HydraFacial ALI Gold Partner', note: '2025 and 2026' },
    { badge: 'assets/badge-best-of-2026.webp', icon: 'award',
      title: 'Best of 2026, The Woodlands', note: 'Business Hall of Fame — six consecutive years' },
    { badge: 'assets/badge-rca-botox.webp', icon: 'shield',
      title: 'RCA Best Botox 2026', note: 'Spring, TX — from verified Google reviews' },
    { badge: 'assets/badge-microneedling.webp', icon: 'book',
      title: 'Microneedling Provider Award', note: 'Excellence in skin rejuvenation, 2025' },
  ],

  /* ── 7. TREATMENTS — image-led panels ───────────────────────────
     Item lists are Elite's own, from their treatment pages. */
  treatments: {
    eyebrow: 'Treatments',
    heading: 'Five kinds of work, one team, one room on Richards Road.',
    panels: [
      {
        name: 'Injectables', image: 'assets/svc-injectables.webp',
        href: 'https://myeliteskin.com/injectables-spring-tx/',
        items: ['Botox · Xeomin · Jeuveau · Daxxify', 'Juvéderm · Radiesse · RHA',
                'Revanesse Lips · Revanesse Versa', 'SKINVIVE — injectable hydration', 'PDO thread lift'],
      },
      {
        name: 'Skin', image: 'assets/svc-skin.webp',
        href: 'https://myeliteskin.com/non-invasive-cosmetic-skin-treatments/',
        items: ['HydraFacial · Keravive', 'Microneedling · Microneedling with VAMP',
                'Chemical peel · Dermaplaning', 'Diamond Glow · HydroJelly mask',
                'PRP cocktail facial · PRP/PRF injections', 'VISIA complexion analysis'],
      },
      {
        name: 'Laser', image: 'assets/svc-laser.webp',
        href: 'https://myeliteskin.com/laser-hair-removal-spring-tx/',
        items: ['Laser hair removal', 'Laser tattoo removal', 'Laser vein removal',
                'Pixel laser resurfacing', 'ClearLift · Bright & Lift', 'Photorejuvenation · Laser skin tightening'],
      },
      {
        name: 'Body', image: 'assets/svc-body.webp',
        href: 'https://myeliteskin.com/cooltone-coolsculpt/',
        items: ['CoolSculpting', 'CoolTone — including pelvic floor', 'Viora body contouring',
                'Body HydraFacial · Body microneedling', 'PRP hair restoration', 'Skin tag removal'],
      },
      {
        name: 'Wellness', image: 'assets/svc-wellness.webp',
        href: 'https://myeliteskin.com/peptide-therapy/',
        items: ['Peptide therapy — GHK-Cu, BPC-157, Sermorelin', '90-day Glow Up programme',
                '90-day Metabolic Makeover', 'EVEXIPEL hormone pellet therapy',
                'IV drip therapy · B12 lipotropic', 'Nutrition coaching'],
      },
    ],
  },

  /* ── 8. BEFORE & AFTER ──────────────────────────────────────────
     These are Elite's own result cards, published as square Instagram
     images with the title band and the BEFORE / AFTER labels burnt in.
     Each has been cropped down the middle so the page can show the two
     frames side by side at a size somebody can actually read.

     Permission is NOT yet recorded — see compliance.reviews. The build
     warns about this and it must be settled with Elite before send. */
  results: {
    eyebrow: 'Results',
    heading: 'Before and after, from their own cases.',
    lede: 'Elite publish these on Instagram as square cards with the labels printed on top. Here they are on the website, where somebody deciding on a treatment is actually looking.',
    categories: ['Injectables', 'Body'],
    pairs: {
      Injectables: [
        { before: 'assets/ba-filler-1-before.webp', after: 'assets/ba-filler-1-after.webp' },
        { before: 'assets/ba-filler-2-before.webp', after: 'assets/ba-filler-2-after.webp' },
        { before: 'assets/ba-filler-3-before.webp', after: 'assets/ba-filler-3-after.webp' },
        { before: 'assets/ba-filler-4-before.webp', after: 'assets/ba-filler-4-after.webp' },
      ],
      Body: [
        { before: 'assets/ba-cs-abdomen-before.webp', after: 'assets/ba-cs-abdomen-after.webp' },
      ],
    },
    emptyNote: '',
  },

  /* ── 9. PRACTITIONERS — every name is from their own team page ───
     No photographs: Elite publish staff portraits but do not caption
     which face belongs to which name, and guessing would be worse than
     leaving the frames empty. The names, roles and years are theirs. */
  practitioners: {
    eyebrow: 'Your team',
    heading: 'The people who would actually treat you.',
    photo: 'assets/member-1.webp',
    photoCaption: 'The Elite team, from their own Instagram.',
    people: [
      { name: 'Rachel Snider', credential: 'Clinical Director and Educator', role: '12 years in laser and esthetics', does: 'Clinical standards, and training other providers.' },
      { name: 'Mackenzie Shinall', credential: 'Aesthetic RN', role: 'Nurse injector', does: 'Injectables. Nine years, and has trained other injectors.' },
      { name: 'Julia Gravois', credential: 'Lead Treatment Provider', role: 'With Elite since 2016', does: 'Laser hair removal and esthetic services.' },
      { name: 'Cindy Blake', credential: 'Office Manager', role: 'With Elite since 2013', does: 'Started on reception, became a provider, now runs the front of house.' },
      { name: 'Bethany Culley', credential: 'Treatment Provider', role: 'Certified in laser hair removal and CoolSculpting', does: '' },
      { name: 'Lauren Woodford', credential: 'Certified Esthetician and Laser Tech', role: 'Treatment Provider', does: '' },
      { name: 'Danielle Lopez', credential: 'Licensed Esthetician', role: 'Treatment Provider', does: '' },
      { name: 'Kelli Renken', credential: 'Licensed Laser Technician', role: 'Treatment Provider', does: '' },
      { name: 'Chelsea Elkington', credential: 'Certified Nutrition Coach', role: 'Nutrition Specialist', does: 'Certified through the National Academy of Sports Medicine.' },
      { name: 'Paula Alberto', credential: 'Massage Therapist', role: 'CoolSculpting Specialist', does: '25 years and more in practice.' },
    ],
  },

  /* ── 10. CREDENTIALS — the "who treats you" argument ───────────── */
  credentials: {
    eyebrow: 'Who treats you',
    heading: 'A needle in your face is not a haircut.',
    lede: 'The single most common reason someone leaves an aesthetics website without booking is that they never found out who would be treating them.',
    photo: 'assets/member-1.webp',
    photoCaption: 'The Elite team — their own photograph, from Instagram rather than their website.',
    cards: [
      { title: 'Thirteen people named, no physician among them', body: 'Elite name thirteen staff on their team page and answer "who performs treatments" with estheticians, a nurse injector and a nutrition specialist. <strong>Texas Medical Board rule 22 TAC §165.1</strong> requires a consumer to be able to work out which licensed physician stands behind a practice. Dr. Christine Cheng appears once, in the founder’s story, and never as the physician of record. That is one line of text away from being fixed.' },
      { title: 'Four awards shown, eight left as scrolling text', body: 'Elite run four real badges under their homepage headline — HydraFacial ALI Gold Partner, Best of 2026 for The Woodlands, RCA Best Botox and the Microneedling Provider Award. That is the right instinct, and the badges are borrowed straight onto this page. The other eight — Allergan CoolSculpting Gold Partner, #1 CoolTone provider in Texas, Best of the Best Houston, The Aesthetic Awards, PCA Skin + EltaMD, Skinbetter Science and the RCA membership recognition — exist only on the About page, set as a moving strip of capitals a visitor reads as decoration. <strong>Twelve recognitions, four of them working.</strong>' },
    ],
  },

  /* ── 11. BENEFITS ──────────────────────────────────────────────── */
  benefits: {
    eyebrow: 'For our clients',
    heading: 'What eighteen years in one town actually buys you.',
    items: [
      { title: 'The same hands, visit after visit', body: 'Providers here are measured in years — twelve, ten, since 2013, since 2016. You can ask for the same person each time, and the person who assessed your skin in January is likely to be the one treating it in November.' },
      { title: 'Assessed, not ordered off a menu', body: 'VISIA complexion analysis photographs what is under the surface — sun damage, texture, pores, redness — before anyone recommends anything. The plan starts from your skin rather than from this month’s promotion.' },
      { title: 'Open when you finish work', body: 'Until 9pm Tuesday, Wednesday and Thursday. Almost nothing else in Spring is, and it is the reason a lot of people can have treatment at all.' },
      { title: 'One place for skin, body and the inside', body: 'Laser, injectables, body contouring, hormone therapy, peptides and nutrition coaching under one roof, so the person planning your skin can see the rest of the picture.' },
    ],
  },

  /* ── 12. PRODUCTS — off. See sections above. ────────────────────── */
  products: {
    eyebrow: '', heading: '', lede: '', href: '', items: [],
  },

  /* ── 13. MEMBERSHIP — Elite publish these prices themselves ────── */
  membership: {
    eyebrow: 'Membership',
    anchor: 'Three tiers, from $189 a month.',
    anchorSub: 'Recognised by the Reviewers Choice Awards as a top membership programme in 2026. Month to month, and changeable at any time.',
    cta: 'Explore membership',
    href: 'https://myeliteskin.com/membership/',
    images: ['assets/member-2.webp', 'assets/member-3.webp'],
    faq: [
      { q: 'Silver — $189 a month', a: 'One Tier 1 treatment a month, or a discounted Tier 2 treatment. Reduced rate on Botox and fillers, 5% off skincare and advertised specials, and a neck treatment included every visit.' },
      { q: 'Gold — $289 a month', a: 'Two Tier 1 treatments a month, or one Tier 2. Ten per cent off skincare and advertised specials, and the same reduced injectable rate.' },
      { q: 'Platinum — $389 a month', a: 'Four Tier 1 treatments a month, or two Tier 2. Fifteen per cent off skincare and advertised specials.' },
      { q: 'Changing your mind', a: 'Memberships are month to month and can be adjusted at any time — Elite’s own answer, on their own FAQ page. It is the sentence that removes the reason most people hesitate, and it currently sits eleven screens down a page nobody reaches.' },
    ],
  },

  /* ── 14. FINANCING — off. See sections above. ───────────────────── */
  financing: { eyebrow: '', heading: '', lede: '', providers: [] },

  /* ── 15. LOYALTY — off, no published programme to point at. ─────── */
  loyalty: { eyebrow: '', heading: '', lede: '', programs: [] },

  /* ── 16. NEW-PATIENT OFFER ─────────────────────────────────────── */
  offer: { eyebrow: '', headline: '', body: '', cta: '', terms: '' },

  /* ── 17. FAQ — also feeds Sandy's answers ──────────────────────
     Drawn from Elite's own FAQ page and the FAQ block on their
     injectables page, kept in their voice. Deliberately no prices
     here: this block feeds Sandy's prompt and Sandy does not quote
     figures. The membership numbers live in section 13 instead. */
  faq: {
    eyebrow: 'Questions',
    heading: 'The things people ask before they book.',
    items: [
      {
        q: 'I have never had anything done. Where do I start?',
        a: 'With a consultation. A provider looks at your skin, listens to what is actually bothering you and explains the options and what each involves. Plenty of people book one and decide to do nothing that day — that is a normal outcome, not a wasted appointment.',
      },
      {
        q: 'What is a med spa, and how is it different from a dermatologist?',
        a: 'Cosmetic skincare is about appearance and prevention. Dermatology diagnoses and treats medical skin conditions. Elite sit on the cosmetic side, with medical-grade technology and licensed providers — and will tell you when something belongs with a dermatologist instead.',
      },
      {
        q: 'Who will be treating me?',
        a: 'The team includes licensed estheticians, laser technicians, an aesthetic RN who does the injecting, and a nutrition coach. Several have been here a decade or more, and you can ask for the same provider every visit.',
      },
      {
        q: 'How do I know which tox or filler is right for me?',
        a: 'That is exactly what the consultation is for. Tox relaxes the muscles that create movement lines; filler adds volume or definition. Which one, where, and how much is a judgement about your face, not a package you pick in advance.',
      },
      {
        q: 'Will I look frozen or overdone?',
        a: 'That is the most common worry we hear. The approach is to enhance rather than overdo — tell your injector what you want to keep, not only what you want changed.',
      },
      {
        q: 'How long do results last?',
        a: 'It depends on the product and the area. Tox is usually talked about in months, filler in a year or more, and both vary by person. Your provider will give you a realistic range for your own plan rather than a number off a chart.',
      },
      {
        q: 'Does it hurt?',
        a: 'Most clients describe injectables as a quick pinch. Numbing cream is used, lidocaine is used for certain fillers, and some fillers contain a numbing agent already. Laser and resurfacing feel different again — ask about the specific treatment you are considering.',
      },
      {
        q: 'How much downtime should I plan for?',
        a: 'It varies by treatment. After injectables most people carry on with their day, with some redness or swelling that settles. Resurfacing needs real planning. Tell us about any event you have coming up and we will time it properly.',
      },
      {
        q: 'How should I prepare?',
        a: 'Generally, avoid sun exposure, retinols and exfoliants beforehand as directed. Elite publish pre and post-treatment instructions for every treatment they offer, and your provider will point you at the right one.',
      },
      {
        q: 'What is VISIA?',
        a: 'A complexion analysis camera. It photographs what is going on under the surface — sun damage, texture, pores, redness — so the plan starts from evidence about your skin rather than from a guess.',
      },
      {
        q: 'Do you treat men?',
        a: 'Yes. Every treatment is available to men, and a good number of the clients here are.',
      },
      {
        q: 'How does the membership work?',
        a: 'Three tiers — Silver, Gold and Platinum — month to month, each including a set number of treatments plus a reduced rate on injectables and a discount on skincare. It can be changed or cancelled at any time by speaking to the front desk. Ask me about a tier and I will tell you what is in it; the figures are set out further down this page.',
      },
      {
        q: 'When are you open?',
        a: 'Monday nine to five, Tuesday and Thursday nine to nine, Wednesday nine to eight, Friday nine to three. Closed at the weekend. The late evenings are the reason a lot of people manage to come at all.',
      },
      {
        q: 'Where are you?',
        a: '25501 Richards Road, Suite 102, Spring, Texas — just west of I-45 North, off Rayford Sawdust and Richards Road. There is parking at the suites.',
      },
    ],
  },

  /* ── 18. INSTAGRAM ─────────────────────────────────────────────── */
  instagram: {
    eyebrow: 'Instagram',
    heading: 'The room and the machines.',
    lede: 'Elite’s own photographs. Almost none of them are on their website, which is the only place a stranger looks before deciding.',
    tiles: [
      { image: 'assets/gram-1.webp', caption: 'In the treatment room' },
      { image: 'assets/gram-2.webp', caption: 'CoolTone on the arm' },
      { image: 'assets/gram-3.webp', caption: 'Laser tattoo removal' },
      { image: 'assets/gram-4.webp', caption: 'Laser hair removal' },
      { image: 'assets/gram-5.webp', caption: 'On the treatment chair' },
    ],
  },

  /* ── 19. LOCATIONS — drives the map, the picker and the diary ───
     Hours are Elite's own, from Get In Touch. Note their page states
     both "Tuesday - Thursday: 9am-9pm" and "Wednesday: 9am-8pm" in
     consecutive lines; the diary uses the more conservative Wednesday.
     Worth them fixing — it is the kind of contradiction that turns a
     visitor into a phone call to check. */
  locations: {
    eyebrow: 'Find us',
    heading: 'One clinic, off Rayford Sawdust.',
    lede: 'West of I-45 North, on Richards Road, serving Spring and The Woodlands.',
    items: [
      {
        id: 'spring', name: 'Spring',
        address: '25501 Richards Rd, Suite 102, Spring, TX 77386',
        hint: 'Just west of I-45 North, off Rayford Sawdust',
        parking: 'Parking on site at the Richards Road suites.',
        lat: 30.1265679, lon: -95.4333877,
        /* day 1 = Monday. Closed Saturday and Sunday. */
        hours: { 1: [9, 17], 2: [9, 21], 3: [9, 20], 4: [9, 21], 5: [9, 15] },
      },
    ],
  },

  /* ── 20. BOOKABLE SERVICES — the demo diary ────────────────────── */
  bookable: [
    { id: 'consult', group: 'Start here', name: 'Consultation', mins: 30, note: 'Free' },
    { id: 'visia', group: 'Start here', name: 'VISIA complexion analysis', mins: 30 },
    { id: 'botox', group: 'Injectables', name: 'Botox', mins: 30 },
    { id: 'xeomin', group: 'Injectables', name: 'Xeomin', mins: 30 },
    { id: 'juvederm', group: 'Injectables', name: 'Juvéderm filler', mins: 60 },
    { id: 'radiesse', group: 'Injectables', name: 'Radiesse', mins: 60 },
    { id: 'lips', group: 'Injectables', name: 'Revanesse lip filler', mins: 45 },
    { id: 'skinvive', group: 'Injectables', name: 'SKINVIVE', mins: 30 },
    { id: 'pdo', group: 'Injectables', name: 'PDO thread lift', mins: 90 },
    { id: 'hydrafacial', group: 'Skin', name: 'HydraFacial', mins: 60 },
    { id: 'keravive', group: 'Skin', name: 'HydraFacial Keravive', mins: 60 },
    { id: 'microneedling', group: 'Skin', name: 'Microneedling', mins: 60 },
    { id: 'peel', group: 'Skin', name: 'Chemical peel', mins: 45 },
    { id: 'dermaplaning', group: 'Skin', name: 'Dermaplaning', mins: 45 },
    { id: 'diamondglow', group: 'Skin', name: 'Diamond Glow facial', mins: 60 },
    { id: 'prp-facial', group: 'Skin', name: 'PRP cocktail facial', mins: 75 },
    { id: 'lhr', group: 'Laser', name: 'Laser hair removal', mins: 30 },
    { id: 'tattoo', group: 'Laser', name: 'Laser tattoo removal', mins: 30 },
    { id: 'vein', group: 'Laser', name: 'Laser vein removal', mins: 30 },
    { id: 'pixel', group: 'Laser', name: 'Pixel laser resurfacing', mins: 75 },
    { id: 'clearlift', group: 'Laser', name: 'ClearLift', mins: 45 },
    { id: 'photofacial', group: 'Laser', name: 'Photorejuvenation', mins: 45 },
    { id: 'coolsculpting', group: 'Body', name: 'CoolSculpting', mins: 60 },
    { id: 'cooltone', group: 'Body', name: 'CoolTone', mins: 30 },
    { id: 'viora', group: 'Body', name: 'Viora body contouring', mins: 45 },
    { id: 'prp-hair', group: 'Body', name: 'PRP hair restoration', mins: 60 },
    { id: 'peptides', group: 'Wellness', name: 'Peptide therapy consultation', mins: 30 },
    { id: 'hormones', group: 'Wellness', name: 'EVEXIPEL hormone consultation', mins: 30 },
    { id: 'iv', group: 'Wellness', name: 'IV drip therapy', mins: 45 },
    { id: 'b12', group: 'Wellness', name: 'B12 lipotropic shot', mins: 15 },
    { id: 'nutrition', group: 'Wellness', name: 'Nutrition coaching', mins: 30 },
  ],

  /* ── 21. SANDY ─────────────────────────────────────────────────── */
  sandy: {
    name: 'Sandy',
    role: 'AI receptionist',
    voice: 'Aoede',

    /* ── Turn-taking: copied from Adel on aestheticbiz, which is the one
       that actually sounds good in production. Do not re-derive these.

       The counter-intuitive part: Adel WAITS LONGER than Niki (1200ms vs
       800ms) and still feels quick. The lag was never the silence window
       — it was proactivity and affectiveDialog, both of which add a round
       trip before she will answer, and which Adel simply does not set. */
    model: 'gemini-3.1-flash-live-preview',
    tuning: {
      endSensitivity: 'END_SENSITIVITY_LOW',
      silenceMs: 1400,
      thinkingLevel: 'LOW',
      proactiveAudio: false,
      affectiveDialog: false,
    },

    /* ── What she actually SAYS about each treatment ───────────────
       Without these she falls back on the only structured data she
       has — appointment length — and answers "CoolTone is thirty
       minutes, CoolSculpting is sixty". True, useless.

       Two or three sentences each: what it is, what it involves, who
       tends to choose it. No prices, no outcome promises, no weight
       figures, no durations unless asked. Drafted from Elite's own
       treatment and injectables pages. */
    talkingPoints: {
      Botox: 'The wrinkle relaxer most people have heard of. It softens the lines that come from movement — forehead, frown lines, crow’s feet — and is also used for jaw clenching and for excessive sweating. It suits somebody who wants the familiar, well-understood option.',
      Xeomin: 'Sometimes called a clean tox because it has no additional proteins in the formula. It is often discussed with people who have had a lot of injectables over the years and want a stripped-back alternative.',
      'Juvéderm filler': 'A hyaluronic acid filler used for lips, smile lines, cheeks and jawline. It adds volume and contour rather than relaxing movement, which is the fundamental difference between filler and tox.',
      Radiesse: 'A filler that adds structure and also encourages your own collagen. It is chosen for cheeks, jawline and deeper smile lines where shape is the point. It is not used in lips.',
      'Revanesse lip filler': 'A filler designed specifically for lips, aiming for soft volume with less swelling afterwards. Chosen by people who want a natural but noticeable change to the lip itself.',
      SKINVIVE: 'An injectable that is about hydration rather than volume. It uses a modified hyaluronic acid to smooth and hydrate the cheeks, so it suits dullness, dryness and crepey texture rather than lines you want filled.',
      'PDO thread lift': 'Dissolvable threads placed under the skin to reposition tissue and encourage collagen along the thread line as they dissolve. Chosen for the jawline, cheeks and neck by people looking for something between injectables and surgery.',
      HydraFacial: 'Cleansing, exfoliation, extraction and hydration in one treatment, tailored after a look at your skin. Elite are an ALI Gold Partner for it, which is HydraFacial’s own recognition. It suits regular maintenance between clinical treatments.',
      'HydraFacial Keravive': 'The scalp version. It cleanses and hydrates the scalp itself, and is usually discussed alongside hair concerns rather than facial skin.',
      Microneedling: 'Very fine needles create controlled micro-channels that prompt the skin to rebuild collagen over the following weeks. Usually a short course rather than a single visit. Elite hold an Aesthetic Laser Microneedling Provider Award for it.',
      'Chemical peel': 'A controlled exfoliation that lifts away surface build-up so newer skin comes through. Strength is chosen to match your skin and how much recovery time you can take.',
      Dermaplaning: 'A blade is used to remove surface dead skin and fine vellus hair, which leaves the skin smoother and helps products absorb. Often combined with a facial.',
      'Diamond Glow facial': 'Exfoliation, extraction and a serum infusion in one pass. A good option when somebody wants visible freshening without recovery time.',
      'PRP cocktail facial': 'Uses a component of your own blood, prepared in clinic, applied alongside microneedling to support the skin’s repair process. Chosen for overall texture and tone.',
      'Laser hair removal': 'A course of treatments that targets hair while it is in its active growth phase, which is why it is spaced across several sessions. This is the treatment Elite have been voted best in The Woodlands for four separate years, and there is a membership built around it.',
      'Laser tattoo removal': 'A laser breaks up the ink so the body can gradually clear it. It takes a series of sessions spaced out over months, and the number depends on the ink, the age of the tattoo and where it is.',
      'Laser vein removal': 'Treats small surface veins, most often on the legs and face. A consultation establishes whether the veins you are seeing are the kind this treats.',
      'Pixel laser resurfacing': 'A fractional resurfacing laser for texture, tone and sun damage. It is the more intensive end of the laser menu and needs planning around your calendar, so aftercare gets covered properly at consultation.',
      ClearLift: 'A gentler laser option for tone and firmness, often chosen by people who cannot take time away from work and want something they can have and carry on with their day.',
      Photorejuvenation: 'Light-based treatment aimed at redness, pigment and general unevenness. Usually a short course, and often paired with a skincare plan.',
      CoolSculpting: 'A non-invasive body contouring treatment that cools targeted fat cells. Elite are an Allergan CoolSculpting Gold Partner. It is for specific pockets rather than overall size, and the consultation is about whether it fits what you are actually asking for.',
      CoolTone: 'Uses magnetic muscle stimulation to strengthen, tone and firm muscle in the abdomen, glutes and thighs — Elite’s own description. They are the number one CoolTone provider in Texas. There is also a pelvic floor application, which clients do talk about.',
      'Viora body contouring': 'A body contouring treatment used on its own or alongside CoolTone and CoolSculpting as part of a plan. Which combination suits you is a consultation question.',
      'PRP hair restoration': 'Uses a component of your own blood to support the scalp and hair follicles. Done as a series, and discussed alongside the rest of the hair loss options.',
      'Peptide therapy': 'Peptides are short chains of amino acids that act as messengers, supporting processes your body already runs — repair, recovery, skin quality. Elite run it as a medically guided programme with an RN overseeing it, not as a one-off injection.',
      'EVEXIPEL hormone consultation': 'Bioidentical hormone pellet therapy, starting with a consultation about your history and whether it is appropriate for you. It is a medical programme with monitoring, so the first appointment is a conversation.',
      'IV drip therapy': 'Hydration and nutrients delivered by drip, usually as part of a wider wellness plan rather than on its own.',
      'B12 lipotropic shot': 'A quick vitamin injection, normally part of a wellness or weight programme rather than a standalone treatment.',
      'Nutrition coaching': 'With a certified nutrition coach on the team, so the food side of a wellness plan is handled by somebody qualified rather than left as a leaflet.',
      'VISIA complexion analysis': 'A complexion analysis camera that photographs what is below the surface — sun damage, texture, pores, redness, porphyrins. It turns "my skin looks tired" into something specific enough to plan around.',
      Membership: 'Three tiers — Silver, Gold and Platinum. Silver includes one Tier 1 treatment a month or a discounted Tier 2, five per cent off skincare and advertised specials, and a complimentary neck treatment every visit. Gold doubles the treatments to two Tier 1 or one Tier 2 and takes the discount to ten per cent. Platinum is four Tier 1 or two Tier 2 with fifteen per cent off. All three carry a reduced rate on Botox and fillers, run month to month, and can be changed or cancelled any time. I do not quote figures out loud — the prices are on the membership section of this page.',
      Consultation: 'Where everything starts, and it is free. A provider looks at your skin, listens to what is bothering you, explains the options, and you decide from there.',
    },

    /* The recogniser has never heard these brand names and mangles
       them. Listing the likely mishearings lets her recover instead of
       denying that her own treatments exist. */
    soundsLike: [
      '"CoolTone" may be heard as cool town, cool tune or cold tone.',
      '"CoolSculpting" may be heard as cool sculpting, cool scalping or coal sculpting.',
      '"HydraFacial" may be heard as hydro facial or hydra facial.',
      '"Keravive" may be heard as kera vive, kara vive or caravive.',
      '"Viora" may be heard as viora, fiora, veeora or via.',
      '"SKINVIVE" may be heard as skin vive, skin five or skinny five.',
      '"Revanesse" may be heard as revenues, rev a ness or renaissance.',
      '"Juvéderm" may be heard as juvederm, juva derm or java derm.',
      '"Xeomin" may be heard as zeomin, xeo min or see o min.',
      '"EVEXIPEL" may be heard as evexipel, evexa pell or evexia.',
      '"VISIA" may be heard as visia, vizia or visa.',
      '"ClearLift" may be heard as clear lift or clear left.',
      '"Elite Medical Skin and Laser Center" may be heard as elite medical or my elite skin.',
    ],
    greetingCard: 'Hi, this is Sandy at Elite Medical Skin and Laser Center. I can explain any treatment, tell you what the memberships include, and take a booking for you. What are you thinking about?',
    panelLede: 'Ask me anything about Elite’s treatments, the memberships or the opening hours, and I can book you a time. I answer out loud.',
    eyebrow: 'Your virtual assistant',
    heading: 'Meet Sandy, the front desk that never goes home.',
    lede: 'She knows every treatment Elite offer, the opening hours, the memberships and how the booking works. Ask her out loud — she answers in about a second.',
    asks: [
      '“What is the difference between CoolTone and CoolSculpting?”',
      '“What is in the Gold membership?”',
      '“Do you do laser hair removal on the back?”',
      '“Can I come after work on a Thursday?”',
      '“Book me a consultation next week.”',
    ],
    /* Extra facts Sandy may state that appear nowhere else on the page */
    extraFacts: [
      'Elite have been in Spring since 2007. The clinic is at 25501 Richards Road, Suite 102, just west of I-45 North off Rayford Sawdust.',
      'Consultations are free.',
      'Open Monday nine to five, Tuesday and Thursday nine to nine, Wednesday nine to eight, Friday nine to three. Closed Saturday and Sunday.',
      'Pre and post-treatment instructions are published for every treatment, and clients are pointed to the right one before they come in.',
      'Medical-grade skincare stocked in clinic includes Skinbetter Science, EltaMD, PCA Skin, SkinMedica and Glymed+.',
    ],
  },

  /* ── 22. THE ASK — Ignatius's Discovery Call ───────────────────── */
  close: {
    heading: 'Turn the demo into a decision.',
    lede: 'Everything on this page came from myeliteskin.com and Elite’s own Instagram. Nothing was invented. A 60-minute Discovery Call with Ignatius covers what it takes to run properly — the phone line, the diary, the membership follow-up — and whether it is worth doing at all.',
    chips: ['Founder-led', 'Monday–Friday', 'Automatic timezone conversion', 'Google Calendar & Meet ready'],
    cardEyebrow: 'Your next step',
    cardHeading: 'Book a Discovery Call',
    cardBody: 'Pick a date, choose your local time and tell me what would make the conversation valuable.',
    cardLink: 'View available appointments',
    href: 'https://www.aestheticbiz.site/book-discovery',
  },

  /* ── 23. COMPLIANCE — required, and enforced by build.mjs ────────
     For Texas that is TMB rule 22 TAC §165.1, which requires a
     consumer to be able to determine WHICH LICENSED PHYSICIAN stands
     behind the practice. A trade name is not enough, and neither is a
     physician mentioned once inside a founder's biography.

     Leave medicalDirector blank and the build warns loudly. Put a
     banned absolute anywhere in the copy and the build refuses. */
  compliance: {
    /* Dr. Christine Cheng co-founded Elite with Tonya Cariker in 2007
       and is named in the About page story. That is NOT the same as
       being the named medical director of record, and we must not
       promote her to one. Ask Elite before filling this in. */
    medicalDirector: {
      name: '',
      license: '',
      board: 'Texas Medical Board',
      verified: false,
    },

    resultsVary: 'Individual results vary.',

    disclaimer: 'Information on this website is general and does not replace a medical consultation. Suitability, expected outcomes, alternatives, risks and costs are assessed individually. Results and recovery vary. Seek urgent medical advice if you develop severe or worsening pain, unusual skin colour change, visual symptoms, breathing difficulty or another concerning reaction after treatment.',

    bannedWords: [
      'risk-free', 'risk free', 'guaranteed', 'guarantee', 'painless',
      'pain-free', 'zero downtime', 'no downtime', 'permanently erase',
      'erase wrinkles', 'cure', 'detox', 'miracle', 'FDA-approved results',
      'same as Ozempic', 'lose weight fast',
    ],

    reviews: {
      permissionObtained: false,
      platform: 'Google',
      note: 'The 4.8 / 389 figure is a Google rating carried by two independent directories; Elite publish no count on their own site. Verify it before send. The before/after images are Elite’s own published result cards, but patient permission for use on a third-party page has NOT been obtained — settle that with Elite before this page goes anywhere public.',
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
