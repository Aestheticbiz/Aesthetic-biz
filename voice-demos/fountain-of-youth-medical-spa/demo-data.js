/* ═══════════════════════════════════════════════════════════════════
   ONE FILE PER PRACTICE. EDIT THIS, NOTHING ELSE.
   ───────────────────────────────────────────────────────────────────
   Same discipline as audit-master/audit-data.js: the page, the booking
   diary and Sandy's knowledge all read from here, so they cannot drift
   apart. If a fact is not in this file, Sandy is not allowed to say it.

   Every fact below is from fountainmedicalspa.com — the home page, the
   Our Team page, About Dr Nhi Le, Memberships, Contact and the gallery.
   Nothing is invented.

   This is demo 3, and it is the first with a NAMED MEDICAL DIRECTOR and
   the first where the practitioners section runs with real faces. The
   portrait-to-name mapping was proved from the order of the markup on
   their own team page, not guessed.

   NEVER invent a credential, a review, a practitioner or a price.
   Anything left blank switches its section off rather than faking it.
   ═══════════════════════════════════════════════════════════════════ */

export default {

  /* ── 1. BRAND — the only two colour numbers on the whole site ────
     Sampled from their own logo lockup: the wordmark is rgb(110, 69, 149),
     hue 271 at 37% saturation. "MEDICAL SPA" beneath it is their blue,
     rgb(1, 152, 214), which becomes the accent. */
  brand: {
    hue: 271,
    saturation: '37%',
    accentHue: 197,
    accentSaturation: '70%',
    accentLightness: '45%',
    primaryLightness: '32%',
    radius: '0.375rem',
    fontHeading: "'Jost', 'Futura', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, -apple-system, sans-serif",
    googleFonts: 'Jost:wght@300;400;500;600&family=Inter:wght@400;500;600;700',
    starHue: 40,
  },

  /* ── 2. WHICH SECTIONS EXIST ───────────────────────────────────
     Four sections are OFF, and each absence is a finding rather than a
     gap to paper over:

     products — they run a Skin Bar carrying iS Clinical and RevitaLash,
       and publish exactly one photograph of it. Not enough for a rail.
     instagram — @fountainofyouthmedicalspa exists, but nothing on the
       website is a usable tile. Almost every scene image on their site
       is agency stock: washed-out lobbies, models at basins, a chandelier.
       The real photographs they own are the team, six staff portraits,
       the storefront and the gallery — and that is the whole of it.
     financing / loyalty / offer — nothing published to point at. */
  sections: {
    trust: true,
    treatments: true,
    results: true,        // their own gallery, provenance flagged below
    practitioners: true,  // six real people, six real faces
    credentials: true,
    benefits: true,
    products: false,
    membership: true,
    financing: false,
    loyalty: false,
    offer: false,
    proof: true,
    faq: true,
    instagram: false,
    locations: true,
    sandy: true,
    upgrade: true,
  },

  /* ── 3. THE PRACTICE ───────────────────────────────────────────── */
  practice: {
    name: 'Fountain of Youth Medical Spa',
    shortName: 'Fountain of Youth',
    domain: 'fountainmedicalspa.com',
    logoDark: 'assets/logo-dark.webp',
    logoLight: 'assets/logo-light.webp',   // white knockout of their own lockup; they publish no light variant
    phone: '361-576-9100',
    phoneHref: '+13615769100',
    instagram: 'https://www.instagram.com/fountainofyouthmedicalspa',
    instagramHandle: '@fountainofyouthmedicalspa',
    tagline: 'Look and feel your best, at any age.',
    story: 'Victoria’s first medical spa, opened in 2007 and led by Dr. Nhi Le, MD — a board-certified internist who also runs Texas Medical & Wellness Clinic next door.',
  },

  /* ── 4. HERO — who it is for, what you do, why care, one action ── */
  hero: {
    image: 'assets/hero-foy.webp',
    imageAlt: 'Dr. Nhi Le, MD with the Fountain of Youth team in Victoria, Texas',
    eyebrow: 'Victoria, Texas — the first medical spa in town, since 2007',
    headline: 'A medical spa with a doctor actually behind it.',
    sub: 'Injectables, lasers, non-surgical lifting, hormones and regenerative medicine — planned by a board-certified internist who treats the cause as well as the face.',
    cta: 'Book a consultation',
    fine: 'Dr. Nhi Le, MD · Open until 6pm Monday to Thursday · 4701 N Navarro Street, Victoria',
  },

  /* ── 5. PROOF — verifiable only ──────────────────────────────────
     No rating is shown, deliberately. Their own site hard-codes
     `"ratingValue":5, "reviewCount":112` into its schema, which is a
     rating a business is not permitted to declare about itself, and
     directories carry a different count again. The build now leaves the
     hero star line out entirely when rating is blank. What goes on the
     page instead is the part that is checkable: the year, the doctor,
     the boards, and three patients who put their names to reviews on
     the practice's own site. */
  proof: {
    rating: '',
    reviewCount: '',
    reviewSource: '',
    award: 'Victoria’s first medical spa',
    awardNote: 'Opened 2007',
    reviewers: []   /* Names removed: FTC endorsement rules want recorded permission, and a public review is not the same as consent to be quoted in advertising. Add them back only with compliance.reviews.permissionObtained = true. */,
    stats: [
      { n: '2007', label: 'Victoria’s first medical spa' },
      { n: '16+', label: 'Years Dr. Le has practised internal medicine' },
      { n: '6', label: 'Boards and colleges she belongs to' },
      { n: '80+', label: 'Treatments offered under one roof' },
    ],
  },

  /* ── 6. TRUST STRIP — Dr Le's own credential marks ───────────────
     These are the association logos Elite's page taught us to look for:
     real artwork off their own site, never typed-out names. */
  trust: [
    { badge: 'assets/badge-abim.webp', icon: 'shield',
      title: 'American Board of Internal Medicine', note: 'Dr. Le is board-certified' },
    { badge: 'assets/badge-tma.webp', icon: 'award',
      title: 'Texas Medical Association', note: 'Member practice' },
    { badge: 'assets/badge-a4m.webp', icon: 'book',
      title: 'A4M — Anti-Aging Medicine', note: 'Fellowship completed 2013' },
    { badge: 'assets/badge-aslms.webp', icon: 'drop',
      title: 'American Society for Laser Medicine & Surgery', note: 'Energy-based technology' },
  ],

  /* ── 7. TREATMENTS — image-led panels ───────────────────────────
     The panel art is their own gallery photography, because nothing
     else on their site is real. Item lists are theirs, from the menu. */
  treatments: {
    eyebrow: 'Treatments',
    heading: 'Eighty treatments, one doctor deciding which one you need.',
    panels: [
      {
        name: 'Injectables', image: 'assets/svc-injectables.webp',
        href: 'https://www.fountainmedicalspa.com/',
        items: ['BOTOX® · Dysport® · DAXXIFY®', 'Jeuveau® · XEOMIN® · Letybo®',
                'JUVÉDERM® · Restylane® · RHA®', 'Radiesse® · Sculptra®',
                'Lip enhancement · Hand rejuvenation', 'Kybella® · Sclerotherapy'],
      },
      {
        name: 'Non-surgical lift', image: 'assets/svc-lift.webp',
        href: 'https://www.fountainmedicalspa.com/',
        items: ['YLift®', 'VolumaLift™', 'PRP facelift', 'Non-surgical facelift',
                'Non-surgical nose job', 'Sofwave™ skin tightening'],
      },
      {
        name: 'Threads & skin', image: 'assets/svc-threads.webp',
        href: 'https://www.fountainmedicalspa.com/',
        items: ['MINT™ thread lift', 'RF microneedling · SkinStylus™ · Dermapen®',
                'CO2 fractional · Fraxel Dual · PicoSure® Focus™',
                'IPL photofacial · RevLite®', 'Celebrity Peel · Champagne Facial',
                'HydraFacial™ · DiamondGlow™ · AQUAGOLD®'],
      },
      {
        name: 'Wellness & regenerative', image: 'assets/svc-skinbar.webp',
        href: 'https://www.fountainmedicalspa.com/',
        items: ['Bio-identical hormones · thyroid testing', 'Medical weight loss · peptide therapy',
                'PRP · exosomes · stem cell therapy', 'IV therapy · NAD+ · Myers’ Cocktail',
                'EMSCULPT NEO® · EMSELLA® chair', 'Galleri® multi-cancer screening'],
      },
    ],
  },

  /* ── 8. BEFORE & AFTER ──────────────────────────────────────────
     Their gallery publishes these as separate before and after files,
     already named by treatment, which is more than most practices manage.

     PROVENANCE IS NOT SETTLED. The Botox set is shot against a uniform
     purple studio backdrop in the house style of manufacturer clinical
     photography, and YLift® is a licensed procedure that ships marketing
     assets to its providers. The thread lift and YLift frames look like
     genuine clinic photographs. We must not describe any of them as
     "Dr. Le's own patients" until she confirms which are hers — hence
     the wording below, and see compliance.reviews. */
  results: {
    eyebrow: 'Results',
    heading: 'Before and after, from their gallery.',
    lede: 'Forty-six frames sit on a gallery page most visitors never reach. Here they are beside the treatment that produced them.',
    categories: ['Injectables', 'Threads', 'YLift'],
    pairs: {
      Injectables: [
        { before: 'assets/ba-botox-1-before.webp', after: 'assets/ba-botox-1-after.webp' },
        { before: 'assets/ba-botox-2-before.webp', after: 'assets/ba-botox-2-after.webp' },
        { before: 'assets/ba-botox-3-before.webp', after: 'assets/ba-botox-3-after.webp' },
      ],
      Threads: [
        { before: 'assets/ba-thread-1-before.webp', after: 'assets/ba-thread-1-after.webp' },
        { before: 'assets/ba-thread-2-before.webp', after: 'assets/ba-thread-2-after.webp' },
      ],
      YLift: [
        { before: 'assets/ba-ylift-1-before.webp', after: 'assets/ba-ylift-1-after.webp' },
        { before: 'assets/ba-ylift-2-before.webp', after: 'assets/ba-ylift-2-after.webp' },
        { before: 'assets/ba-ylift-3-before.webp', after: 'assets/ba-ylift-3-after.webp' },
      ],
    },
    emptyNote: '',
  },

  /* ── 9. PRACTITIONERS — six real people, six real faces ──────────
     First demo of the three where this section runs properly. Each
     portrait was matched to its name by the order of the markup on
     their Our Team page, not by guessing which face looked like which
     job. Bios are condensed from their own words. */
  practitioners: {
    eyebrow: 'Your team',
    heading: 'Six people, and you can see all of them.',
    photo: 'assets/member-1.webp',
    photoCaption: 'The Fountain of Youth team, Victoria.',
    people: [
      { name: 'Nhi Le, MD', credential: 'Medical Director', role: 'Board-certified internist', photo: 'assets/dr-nhi-le.webp',
        does: 'Advanced certification in Functional and Regenerative Medicine. Medical degree from St. George’s University School of Medicine. Sixteen years in internal medicine, ten in aesthetic and anti-aging. Her patients call her Dr. Lei.' },
      { name: 'Melissa Garcia', credential: 'Patient Coordinator', role: 'With Dr. Le since 2005', photo: 'assets/melissa-garcia.webp',
        does: 'Clinic and spa coordinator, and staff supervisor. Trains the team in clinical procedure.' },
      { name: 'Jessica Sierra', credential: 'Certified Medical Assistant', role: 'Operations Manager', photo: 'assets/jessica-sierra.webp',
        does: 'Ten years in the medical field and fifteen in business and management. Works across both the clinic and the spa.' },
      { name: 'Adriana Arriaga', credential: 'RN Injector', role: 'Registered nurse', photo: 'assets/adriana-arriaga.webp',
        does: 'Injectables — tox and filler.' },
      { name: 'Donna Garcia', credential: 'Billing Specialist', role: '', photo: 'assets/donna-garcia.webp', does: '' },
      { name: 'Shelby Reeves', credential: 'Medical Aesthetician', role: '', photo: 'assets/shelby-reeves.webp', does: '' },
    ],
  },

  /* ── 10. CREDENTIALS — the "who treats you" argument ───────────── */
  credentials: {
    eyebrow: 'Who treats you',
    heading: 'A needle in your face is not a haircut.',
    lede: 'The single most common reason someone leaves an aesthetics website without booking is that they never found out who would be treating them. Fountain of Youth already has the answer. It is just buried.',
    photo: 'assets/dr-nhi-le-tall.webp',
    photoCaption: 'Dr. Nhi Le, MD — Medical Director. Their own photograph.',
    cards: [
      { title: 'You have the thing everybody else is missing', body: 'Across the aesthetic practices we review, almost none name a physician a consumer can identify — which is what <strong>Texas Medical Board rule 22 TAC §165.1</strong> actually asks for. Fountain of Youth names one, with a board certification, a medical school and sixteen years behind her. That belongs on the first screen, beside the booking button, not three clicks into an About menu.' },
      { title: 'The press already wrote your headline', body: 'Three magazine features sit in the media library — the Victoria Advocate Health &amp; Lifestyle piece, <em>Success Lives Next Door</em>, and “Look and feel younger with Dr. Nhi Le.” They are scans nobody can read at the size they are shown. A pull-quote and a masthead from any one of them would do more work than the stock photograph currently occupying that space.' },
    ],
  },

  /* ── 11. BENEFITS ──────────────────────────────────────────────── */
  benefits: {
    eyebrow: 'For our patients',
    heading: 'What a physician-led spa does differently.',
    items: [
      { title: 'The cause, not only the face', body: 'Dr. Le is an internist first. Hormones, thyroid, metabolism and micronutrients are all tested here, so when tiredness is showing in your skin, the conversation can go further than a treatment for the skin.' },
      { title: 'One doctor, one plan', body: 'The person deciding your injectable plan is the same person who can read your bloodwork. That is unusual in aesthetics, and it is the reason a plan here tends to hold together.' },
      { title: 'The first in Victoria', body: 'Open since 2007. Long enough that the coordinator who books you has been with the practice since 2005, and long enough to have seen what does and does not last.' },
      { title: 'Everything under one roof', body: 'Injectables, lasers, non-surgical lifting, threads, hormones, weight management, IV therapy and regenerative treatments — without being referred across town for each one.' },
    ],
  },

  /* ── 12. PRODUCTS — off. See sections above. ────────────────────── */
  products: { eyebrow: '', heading: '', lede: '', href: '', items: [] },

  /* ── 13. MEMBERSHIP — their own three tiers and their own prices ── */
  membership: {
    eyebrow: 'Membership',
    anchor: 'Three memberships, from $79 a month.',
    anchorSub: 'Each one banks a monthly amount against treatment and carries a standing discount. Published on their site, and worth far more prominence than it currently gets.',
    cta: 'Explore membership',
    href: 'https://www.fountainmedicalspa.com/about-fountain-of-youth/memberships/',
    images: ['assets/member-2.webp', 'assets/member-3.webp'],
    faq: [
      { q: 'Tox Vault — $79 a month', a: 'Every dollar banks toward future treatment, with 15% off all tox and filler, and a complimentary dermaplane facial on signing up.' },
      { q: 'Elite VIP Skin Rejuvenation — $269 a month', a: 'A fifty-minute rejuvenating session each month — Celebrity Peel, Champagne Facial, IPL or microneedling — plus 20% off all services and 15% off skincare and supplements.' },
      { q: 'Ultimate Ageless VIP — $469 a month', a: 'A premium monthly treatment such as RF microneedling, Sofwave or Fraxel, with 25% off services and 25% off in-store skincare, and Sculptra and neck Sofwave milestones along the way.' },
      { q: 'Why it matters', a: 'A membership turns a visitor who books once into a patient who comes back monthly. Fountain of Youth already built three of them. They currently live behind an About menu, which is the single easiest thing on this whole page to fix.' },
    ],
  },

  /* ── 14–16. OFF ─────────────────────────────────────────────────── */
  financing: { eyebrow: '', heading: '', lede: '', providers: [] },
  loyalty: { eyebrow: '', heading: '', lede: '', programs: [] },
  offer: { eyebrow: '', headline: '', body: '', cta: '', terms: '' },

  /* ── 17. FAQ — also feeds Sandy's answers ──────────────────────
     No prices here: this block feeds Sandy's prompt and Sandy does not
     quote figures. The membership numbers live in section 13 instead. */
  faq: {
    eyebrow: 'Questions',
    heading: 'The things people ask before they book.',
    items: [
      {
        q: 'I have never had anything done. Where do I start?',
        a: 'With a consultation. Dr. Le or a member of the team looks at your skin, listens to what is actually bothering you, and explains the options and what each involves. Plenty of people book one and decide to do nothing that day — that is a perfectly normal outcome.',
      },
      {
        q: 'Is there really a doctor here?',
        a: 'Yes. Dr. Nhi Le, MD is the medical director. She is a board-certified internist with advanced certification in Functional and Regenerative Medicine, and she also runs Texas Medical and Wellness Clinic. That is unusual for a medical spa and it is the reason the wellness side of the menu exists.',
      },
      {
        q: 'Who will actually be treating me?',
        a: 'Injectables are given by Adriana, our RN injector, and skin treatments by Shelby, our medical aesthetician, with Dr. Le overseeing. You can ask for the same provider each visit, and most patients do.',
      },
      {
        q: 'Why would a med spa run blood tests?',
        a: 'Because tiredness, weight and skin quality often trace back to something measurable — thyroid, hormones, micronutrients. Dr. Le is an internist, so she can investigate that rather than treat only what shows on the surface. It is optional, and it starts with a conversation.',
      },
      {
        q: 'What is the difference between tox and filler?',
        a: 'Tox relaxes the muscles that create movement lines. Filler adds volume or structure where the face has lost it. Which one, where, and how much is a judgement about your face rather than a package you choose in advance.',
      },
      {
        q: 'What is a YLift?',
        a: 'A non-surgical lift done with filler placed deep along the bone structure to restore the scaffolding of the face, rather than filling lines at the surface. It is one of the things this practice is known for, and there is a gallery of results.',
      },
      {
        q: 'How long do results last?',
        a: 'It depends on the treatment and on you. Tox is generally discussed in months, filler in a year or more, and threads and lifts differently again. Your provider will give you a realistic range for your own plan rather than a number off a chart.',
      },
      {
        q: 'Does it hurt?',
        a: 'Most people describe injectables as a quick pinch, and numbing is used where it helps. Lasers and resurfacing feel different again. Ask about the specific treatment you are considering and we will tell you honestly what to expect.',
      },
      {
        q: 'How much downtime should I plan for?',
        a: 'It varies from none to a genuine recovery period, depending on what you have. Tell us about any event you have coming up and we will time the plan around it.',
      },
      {
        q: 'How does the membership work?',
        a: 'There are three, and each one banks a monthly amount toward treatment and carries a standing discount on services and skincare. Ask me about a specific one and I will tell you what is in it — the figures are set out further down this page.',
      },
      {
        q: 'Do you treat men?',
        a: 'Yes, and there is a part of the menu written for it — the Gentleman’s Facial, tox, body contouring, hair restoration and the hormone side of the practice.',
      },
      {
        q: 'When are you open?',
        a: 'Monday to Thursday nine to six, Friday nine to five. Closed Saturday and Sunday.',
      },
      {
        q: 'Where are you?',
        a: '4701 North Navarro Street in Victoria, Texas. Ask me for directions and I will point you at the route planner.',
      },
    ],
  },

  /* ── 18. INSTAGRAM — off. See sections above. ───────────────────── */
  instagram: { eyebrow: '', heading: '', lede: '', tiles: [] },

  /* ── 19. LOCATIONS — drives the map, the picker and the diary ───
     ONE location is published, and this is a finding. The site's own
     page title reads "Fountain of Youth Medical Spa Victoria - Med Spa
     Rockport", and the header carries a Victoria/Rockport switcher — but
     no Rockport address, phone or hours exist anywhere on the site, and
     the memberships page says "our Victoria, Texas location", singular.
     Somebody searching Rockport arrives and cannot find out whether
     there is anywhere to go. We publish only what they publish. */
  locations: {
    eyebrow: 'Find us',
    heading: 'North Navarro Street, Victoria.',
    lede: 'The first medical spa in Victoria, and still the one with a doctor in the building.',
    items: [
      {
        id: 'victoria', name: 'Victoria',
        address: '4701 N Navarro Street, Victoria, TX 77904',
        hint: 'North Navarro, Victoria',
        parking: 'Parking on site.',
        lat: 28.8543, lon: -97.0086,
        /* day 1 = Monday. Closed Saturday and Sunday. */
        hours: { 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 17] },
      },
    ],
  },

  /* ── 20. BOOKABLE SERVICES — the demo diary ────────────────────── */
  bookable: [
    { id: 'consult', group: 'Start here', name: 'Consultation', mins: 30 },
    { id: 'wellness-consult', group: 'Start here', name: 'Wellness consultation with Dr. Le', mins: 45 },
    { id: 'botox', group: 'Injectables', name: 'BOTOX®', mins: 30 },
    { id: 'daxxify', group: 'Injectables', name: 'DAXXIFY®', mins: 30 },
    { id: 'xeomin', group: 'Injectables', name: 'XEOMIN®', mins: 30 },
    { id: 'juvederm', group: 'Injectables', name: 'JUVÉDERM® filler', mins: 60 },
    { id: 'restylane', group: 'Injectables', name: 'Restylane®', mins: 60 },
    { id: 'sculptra', group: 'Injectables', name: 'Sculptra®', mins: 60 },
    { id: 'lips', group: 'Injectables', name: 'Lip enhancement', mins: 45 },
    { id: 'kybella', group: 'Injectables', name: 'Kybella®', mins: 45 },
    { id: 'ylift', group: 'Lifting', name: 'YLift®', mins: 90 },
    { id: 'volumalift', group: 'Lifting', name: 'VolumaLift™', mins: 90 },
    { id: 'mint', group: 'Lifting', name: 'MINT™ thread lift', mins: 90 },
    { id: 'prp-facelift', group: 'Lifting', name: 'PRP facelift', mins: 75 },
    { id: 'sofwave', group: 'Lifting', name: 'Sofwave™ skin tightening', mins: 60 },
    { id: 'rf-microneedling', group: 'Skin', name: 'RF microneedling', mins: 75 },
    { id: 'microneedling', group: 'Skin', name: 'SkinStylus™ microneedling', mins: 60 },
    { id: 'hydrafacial', group: 'Skin', name: 'HydraFacial™', mins: 60 },
    { id: 'diamondglow', group: 'Skin', name: 'DiamondGlow™ facial', mins: 60 },
    { id: 'celebrity-peel', group: 'Skin', name: 'Celebrity Peel', mins: 60 },
    { id: 'champagne', group: 'Skin', name: 'Champagne Facial', mins: 60 },
    { id: 'aquagold', group: 'Skin', name: 'AQUAGOLD® Fine Touch', mins: 45 },
    { id: 'co2', group: 'Lasers', name: 'CO2 fractional resurfacing', mins: 90 },
    { id: 'fraxel', group: 'Lasers', name: 'Fraxel Dual resurfacing', mins: 75 },
    { id: 'picosure', group: 'Lasers', name: 'PicoSure® Focus™', mins: 45 },
    { id: 'ipl', group: 'Lasers', name: 'IPL photofacial', mins: 45 },
    { id: 'lhr', group: 'Lasers', name: 'Laser hair removal', mins: 30 },
    { id: 'tattoo', group: 'Lasers', name: 'Laser tattoo removal', mins: 30 },
    { id: 'emsculpt', group: 'Body', name: 'EMSCULPT NEO®', mins: 45 },
    { id: 'emsella', group: 'Body', name: 'EMSELLA® chair', mins: 30 },
    { id: 'hormones', group: 'Wellness', name: 'Bio-identical hormone consultation', mins: 45 },
    { id: 'testing', group: 'Wellness', name: 'Hormone and thyroid testing', mins: 30 },
    { id: 'weight', group: 'Wellness', name: 'Medical weight loss consultation', mins: 45 },
    { id: 'peptides', group: 'Wellness', name: 'Peptide therapy consultation', mins: 30 },
    { id: 'iv', group: 'Wellness', name: 'IV therapy', mins: 45 },
    { id: 'nad', group: 'Wellness', name: 'NAD+ therapy', mins: 90 },
    { id: 'prp', group: 'Regenerative', name: 'PRP', mins: 60 },
    { id: 'exosomes', group: 'Regenerative', name: 'Exosomes', mins: 60 },
  ],

  /* ── 21. SANDY ─────────────────────────────────────────────────── */
  sandy: {
    name: 'Sandy',
    role: 'AI receptionist',
    voice: 'Aoede',

    /* Adel's settings. Do not re-derive them — see HANDOFF.md section 3.
       proactiveAudio and affectiveDialog stay off; they were the cause of
       the long pauses, not the silence window. */
    model: 'gemini-3.1-flash-live-preview',
    tuning: {
      endSensitivity: 'END_SENSITIVITY_LOW',
      silenceMs: 1400,
      thinkingLevel: 'LOW',
      proactiveAudio: false,
      affectiveDialog: false,
    },

    /* Two or three sentences per treatment: what it is, what it
       involves, who tends to choose it. No prices, no outcome promises,
       no weight figures. Drafted from their own menu. */
    talkingPoints: {
      'BOTOX®': 'The wrinkle relaxer most people have heard of. It softens the lines that come from movement — forehead, frown lines, crow’s feet. A good first treatment for somebody who has never had anything done.',
      'DAXXIFY®': 'A newer wrinkle relaxer, sometimes chosen by people who want to stretch the interval between appointments. Whether it suits you is a consultation question.',
      'XEOMIN®': 'A stripped-back formulation with no additional proteins, often discussed with people who have had injectables for years.',
      'JUVÉDERM® filler': 'A hyaluronic acid filler for lips, cheeks, smile lines and jawline. It adds volume and contour rather than relaxing movement, which is the fundamental difference between filler and tox.',
      'Restylane®': 'Another hyaluronic acid family, with different products suited to different depths and areas. Which family gets used is decided at consultation.',
      'Sculptra®': 'Works gradually by encouraging your own collagen rather than filling immediately, so it suits somebody thinking in terms of a year rather than a week.',
      'Lip enhancement': 'Filler placed in the lip itself for shape and volume. The conversation is mostly about how much change you actually want, which is usually less than people expect.',
      'Kybella®': 'An injectable used under the chin. A series rather than a single visit, and suitability is assessed first.',
      'YLift®': 'A non-surgical lift. Filler is placed deep along the bone structure to restore the scaffolding of the face, rather than filling lines at the surface. It is one of the things this practice is known for, and there is a gallery of results on their site.',
      'VolumaLift™': 'A lifting approach built on volume restoration, discussed alongside YLift when working out which suits your face.',
      'MINT™ thread lift': 'Dissolvable threads placed under the skin to reposition tissue and encourage collagen along the thread line. A middle option between injectables and surgery.',
      'PRP facelift': 'Uses a component of your own blood, prepared in clinic, to support the skin’s own repair processes. Often combined with microneedling.',
      'Sofwave™ skin tightening': 'An energy-based treatment for laxity that does not break the surface of the skin, so people generally carry on with their day afterwards.',
      'RF microneedling': 'Fine needles create controlled micro-channels while delivering heat below the surface, prompting the skin to rebuild collagen over the following weeks. Usually a short course.',
      'HydraFacial™': 'Cleansing, exfoliation, extraction and hydration in one treatment. Good for regular maintenance between clinical treatments.',
      'Celebrity Peel': 'One of the signature facials here, chosen when somebody wants visible freshening before an event.',
      'Champagne Facial': 'The indulgent end of the facial menu, and one of the treatments included in the Elite VIP membership each month.',
      'AQUAGOLD® Fine Touch': 'A micro-channel device that delivers a tailored blend into the very top layer of skin. Chosen for overall glow rather than for a specific line.',
      'CO2 fractional resurfacing': 'The more intensive resurfacing option, for texture and established sun damage. It needs real planning around your calendar, so aftercare and timing get covered carefully at consultation.',
      'Fraxel Dual resurfacing': 'Fractional resurfacing aimed at tone, texture and pigment, usually as a short course.',
      'IPL photofacial': 'Light-based treatment for redness, pigment and unevenness. Normally a course, and often paired with a skincare plan.',
      'Laser hair removal': 'A course of treatments targeting hair while it is in its active growth phase, which is why it is spaced over several sessions.',
      'EMSCULPT NEO®': 'A body treatment that works on muscle and fat at the same time, without surgery. Suitability is discussed first.',
      'EMSELLA® chair': 'A chair you sit on, fully clothed, used for pelvic floor strength. People are often surprised this exists — it comes up a lot in the intimate wellness side of the practice.',
      'Hormone and thyroid testing': 'Bloodwork rather than guesswork. Thyroid, sex hormones and adrenal function are all tested here, and Dr. Le reads them herself because she is an internist. It is usually where the conversation starts if you are tired, gaining weight, or not feeling like yourself.',
      'Functional and screening tests': 'A fuller panel than most people expect from a medical spa — micronutrients, food sensitivity, gut health, cardiovascular and metabolic markers, genetic testing, urine heavy metals, and the Galleri multi-cancer screening test. These are optional, they are ordered by a physician, and which ones are worth doing is a consultation question rather than a menu you pick from.',
      'Bio-identical hormone consultation': 'Dr. Le is an internist, so hormones are properly investigated here rather than guessed at. It starts with a conversation and testing, not a prescription.',
      'Medical weight loss consultation': 'A medically supervised programme that begins with a consultation about your history and whether it is appropriate for you, with monitoring throughout.',
      'Peptide therapy consultation': 'Peptides are short chains of amino acids that act as messengers, supporting processes your body already runs. Run here as a medically guided programme.',
      'IV therapy': 'Hydration and nutrients by drip — there is a menu of them, from a Myers’ Cocktail to NAD+. Usually part of a wider plan.',
      PRP: 'Uses a component of your own blood to support repair. Used on the face, and also for hair and for joints on the regenerative side of the practice.',
      Membership: 'Three of them, each banking a monthly amount toward treatment and carrying a standing discount on services and skincare. I do not quote figures out loud — they are set out on the membership section of this page, and the front desk will walk you through them.',
      Consultation: 'Where everything starts. Somebody looks at your skin and listens to what is bothering you, explains the options, and you decide from there.',
    },

    /* The recogniser mangles brand names. Listing the likely mishearings
       lets her recover instead of denying her own treatments exist. */
    soundsLike: [
      '"YLift" may be heard as why lift, y lift, wi-fi lift or uplift.',
      '"Sofwave" may be heard as soft wave, sof wave or soap wave.',
      '"AQUAGOLD" may be heard as aqua gold or acquired gold.',
      '"DAXXIFY" may be heard as daxify, dax defy or taxify.',
      '"Jeuveau" may be heard as juvo, jouveau or youво.',
      '"Xeomin" may be heard as zeomin, xeo min or see o min.',
      '"Fraxel" may be heard as fractal, frackle or fraxil.',
      '"PicoSure" may be heard as pico sure or peek o sure.',
      '"EMSELLA" may be heard as em sella, mm sella or umbrella.',
      '"EMSCULPT" may be heard as em sculpt or m sculpt.',
      '"Sculptra" may be heard as sculptura or sculpt draw.',
      '"Dr. Nhi Le" is pronounced "Dr. Lei", and may be heard as doctor Lee, doctor Nee or doctor Lay.',
      '"Fountain of Youth" may be heard as fountain of you or mountain of youth.',
    ],
    greetingCard: 'Hi, this is Sandy at Fountain of Youth Medical Spa in Victoria. I can explain any treatment, tell you about Dr. Le, and take a booking for you. What are you thinking about?',
    panelLede: 'Ask me anything about the treatments, the memberships or Dr. Le, and I can book you a time. I answer out loud.',
    eyebrow: 'Your virtual assistant',
    heading: 'Meet Sandy, the front desk that never goes home.',
    lede: 'She knows all eighty treatments, who is on the team, the opening hours and how the booking works. Ask her out loud — she answers in about a second.',
    asks: [
      '“What is a YLift?”',
      '“Is there actually a doctor there?”',
      '“What is the difference between tox and filler?”',
      '“Do you do hormone testing?”',
      '“Book me a consultation on Thursday.”',
    ],
    extraFacts: [
      'Fountain of Youth opened in 2007 and was the first medical spa in Victoria, Texas.',
      'Dr. Nhi Le, MD is the medical director — a board-certified internist with advanced certification in Functional and Regenerative Medicine, and a fellowship in anti-aging medicine completed in 2013.',
      'The clinic is at 4701 North Navarro Street, Victoria, Texas 77904. Open Monday to Thursday nine to six and Friday nine to five. Closed at the weekend.',
      'Adriana Arriaga is the RN injector, Shelby Reeves the medical aesthetician, Melissa Garcia the patient coordinator and Jessica Sierra the operations manager.',
      'Testing available here includes thyroid, sex hormones, adrenal function, micronutrients, food sensitivity, gut health, cardiovascular and metabolic markers, genetic testing, urine heavy metals, and the Galleri multi-cancer screening test.',
      'The Skin Bar carries iS Clinical and RevitaLash.',
    ],
  },

  /* ── 22. THE ASK — Ignatius's Discovery Call ───────────────────── */
  close: {
    heading: 'Turn the demo into a decision.',
    lede: 'Everything on this page came from fountainmedicalspa.com. Nothing was invented. A 60-minute Discovery Call with Ignatius covers what it takes to run properly — the phone line, the diary, the membership follow-up — and whether it is worth doing at all.',
    chips: ['Founder-led', 'Monday–Friday', 'Automatic timezone conversion', 'Google Calendar & Meet ready'],
    cardEyebrow: 'Your next step',
    cardHeading: 'Book a Discovery Call',
    cardBody: 'Pick a date, choose your local time and tell me what would make the conversation valuable.',
    cardLink: 'View available appointments',
    href: 'https://www.aestheticbiz.site/book-discovery',
  },

  /* ── 23. COMPLIANCE — required, and enforced by build.mjs ────────
     For the first time across the three demos, the medical director is
     a real, named, verifiable person: Dr. Nhi Le, MD, titled MEDICAL
     DIRECTOR on the practice's own team page. The TMB licence number is
     NOT published anywhere on their site and has not been invented —
     ask her for it, and the last warning clears. */
  compliance: {
    medicalDirector: {
      name: 'Dr. Nhi Le, MD',
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
      note: 'TWO things to settle before this page goes anywhere public. (1) The before/after frames come from their own gallery, but provenance is unconfirmed — the Botox set is shot on a uniform purple studio backdrop in the house style of manufacturer clinical photography, and YLift is a licensed procedure that supplies marketing assets to its providers. Ask Dr. Le which frames are her own patients, and get advertising-specific written consent for those. Remove the rest. (2) Their own site hard-codes "ratingValue":5, "reviewCount":112 into its schema — a rating a business may not declare about itself under Google\'s structured data policy, and a different count from the directories. No rating appears on this page as a result.',
    },
  },

  /* ── 24. THE HONESTY LINE — never remove ───────────────────────── */
  demo: {
    builder: 'CRM Solutions',
    ribbonShort: 'built for {practice} by CRM Solutions.',
    ribbonLong: 'Not affiliated with, or operated by, {short}. Bookings made here are not real.',
    footNote: 'This is an unaffiliated demonstration built for {practice} by CRM Solutions / AestheticBiz to show what an AI receptionist and a rebuilt homepage would do on their own site. Content and images are {short}’s own, taken from {domain}, used here for that purpose only, and the page will be removed on request. {sandy} is an AI assistant, gives no medical advice, and the bookings she takes here are not real appointments.',
  },
};
