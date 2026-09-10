/* ═══════════════════════════════════════════════════════════════════
   ONE FILE PER PRACTICE. EDIT THIS, NOTHING ELSE.
   ───────────────────────────────────────────────────────────────────
   Same discipline as audit-master/audit-data.js: the page, the booking
   diary and Sandy's knowledge all read from here, so they cannot drift
   apart. If a fact is not in this file, Sandy is not allowed to say it.

   Every fact below is from conciergeaesthetics.com — the homepage trust
   strip, the company story, Meet Our Team, Start Here, the FAQs, the
   published price list, the Concierge Club page, Payment Plans, Offers
   and the treatment menu — or from their own before/after gallery.
   Nothing is invented.

   Concierge is the first practice able to fill every section the
   template has: practitioners, products, financing, loyalty AND a
   new-patient offer. Bella could fill none of the four; Elite two.

   NEVER invent a credential, a review, a practitioner or a price.
   Anything left blank switches its section off rather than faking it.
   ═══════════════════════════════════════════════════════════════════ */

export default {

  /* ── 1. BRAND — the only two colour numbers on the whole site ────
     Their identity is black, white and one champagne gold. The gold is
     rgb(196, 162, 119), sampled off the live homepage where it is the
     most-used non-neutral colour by a distance — hue 34, saturation
     39%, lightness 62%. The primary is that same hue pulled down to a
     warm near-black, which is how their own pages read.

     Their body face is Raleway, which Google Fonts serves. Their
     headings are avenir-next-lt-pro from Adobe Fonts, which we cannot
     load; Jost is the closest geometric substitute and is what Elite
     already uses. */
  brand: {
    hue: 32,
    saturation: '18%',
    accentHue: 34,
    accentSaturation: '39%',
    accentLightness: '62%',
    primaryLightness: '14%',   // warm near-black, not a colour
    radius: '0.25rem',         // their cards and buttons are near-square
    fontHeading: "'Jost', 'Avenir Next', system-ui, sans-serif",
    fontBody: "'Raleway', system-ui, -apple-system, sans-serif",
    googleFonts: 'Jost:wght@300;400;500;600&family=Raleway:wght@400;500;600;700',
    starHue: 40,
  },

  /* ── 2. WHICH SECTIONS EXIST ───────────────────────────────────
     false = the section is not rendered at all. Never delete markup
     by hand; a stray closing tag is how a broken page gets sent.

     Everything is ON. This is the first practice that earns it:
     · practitioners — five named people plus a named medical director
     · products      — 96 retail SKUs across eight brands, with photos
     · financing     — Cherry and CareCredit, both named on their site
     · loyalty       — the Concierge Club, with published figures
     · offer         — 10% off a first treatment, their own promotion */
  sections: {
    trust: true,
    treatments: true,
    results: true,
    practitioners: true,
    credentials: true,
    benefits: true,
    products: true,
    membership: true,
    financing: true,
    loyalty: true,
    offer: true,
    proof: true,
    faq: true,
    instagram: false,   // see section 18
    locations: true,
    sandy: true,
    upgrade: true,
  },

  /* ── 3. THE PRACTICE ───────────────────────────────────────────── */
  practice: {
    name: 'Concierge Aesthetics',
    shortName: 'Concierge',
    domain: 'conciergeaesthetics.com',
    logoDark: 'assets/logo-dark.webp',
    logoLight: 'assets/logo-light.webp',
    phone: '(949) 767-0000',
    phoneHref: '+19497670000',
    instagram: 'https://www.instagram.com/conciergeaesthetics',
    instagramHandle: '@conciergeaesthetics',
    tagline: 'Artistry + Precision + Restraint.',
    story: 'Founded in Irvine in 2009 by Stacy Vencill, PA-C, MPH, who started by renting a single treatment room from Concierge Family Practice under the mentorship of Dr. Neil Neimark, and opened the practice’s own facility on Waterworks Way in 2017. One clinic, near the Irvine Spectrum, serving Orange County.',
  },

  /* ── 4. HERO — who it is for, what you do, why care, one action ── */
  hero: {
    image: 'assets/hero-concierge.webp',
    imageAlt: 'A treatment in progress in the Concierge Aesthetics clinic in Irvine',
    /* RULES.md §6 bans the uppercase eyebrow above the H1, so the headline
       carries the category and the city itself — which is also RULES.md §3:
       name the category, do not describe a feature. Their own brand line,
       "Natural results. Expertly done. Never overdone.", never told a stranger
       what the business actually is, so it moves down to the sub. */
    eyebrow: '',
    headline: 'Injectables, laser and skin health in Irvine — natural results, never overdone.',
    sub: 'Planned across your whole face by physician assistants who have been injecting for years, under a named medical director. Seventeen years in Orange County, one clinic near the Irvine Spectrum.',
    cta: 'Book a consultation',
    fine: '5 stars from 533 reviews · Top 1% Allergan practice nationwide · 113 Waterworks Way, Irvine',
  },

  /* ── 5. PROOF — verifiable only ──────────────────────────────────
     533 is the practice's OWN published figure, shown on their
     homepage and reviews page as "5 Stars | 533 Reviews" and marked up
     as an AggregateRating of 5 from 528. It is a combined Google-and-
     Yelp count, not a Google count: Yelp alone shows 200. Verify the
     Google number before this page is sent anywhere. See
     compliance.reviews. */
  proof: {
    rating: '5.0',
    reviewCount: '533',
    reviewSource: 'Google and Yelp, as published by the practice',
    award: 'Allergan Top 500 Practice — top 1% nationwide',
    awardNote: 'Their own homepage badge',
    reviewers: []   /* Names removed: FTC endorsement rules want recorded permission, and a public review is not the same as consent to be quoted in advertising. Add them back only with compliance.reviews.permissionObtained = true. */,
    stats: [
      { n: '5.0', label: 'Stars across Google and Yelp' },
      { n: '533', label: 'Reviews, their own published count' },
      { n: '2009', label: 'Serving Orange County since' },
      { n: '10,000+', label: 'Treatments performed' },
    ],
  },

  /* ── 6. TRUST STRIP — four verified signals ─────────────────────
     These are Concierge's OWN badge files, lifted from their media
     library — four of the six they already run in a row under their
     homepage headline. RULES.md H8: real artwork, never typed-out
     names. They had the right instinct; the badges just sit twelve
     seconds down a page most visitors never see rendered. */
  trust: [
    { badge: 'assets/badge-allergan.webp', icon: 'award',
      title: 'Allergan Top 500 Practice', note: 'Top 1% nationwide' },
    { badge: 'assets/badge-top100.webp', icon: 'shield',
      title: 'Top 100 Injector', note: 'Best Aesthetic Providers in America' },
    { badge: 'assets/badge-kcal.webp', icon: 'book',
      title: 'Featured on KCAL News', note: 'Best Botox in Orange County' },
    { badge: 'assets/badge-reviews.webp', icon: 'drop',
      title: 'Hundreds of 5-star reviews', note: 'Google and Yelp' },
  ],

  /* ── 7. TREATMENTS — image-led panels ───────────────────────────
     Item lists are Concierge's own, taken straight from their
     treatment menu. The five panels are their own five categories.

     ⚠ RULES.md H5 — ZERO STOCK PHOTOGRAPHY — IS FAILED HERE, KNOWINGLY.
     All five of these are licensed stock models. They are Concierge's OWN
     licensed stock, lifted from their own five treatment-category pages, not
     stock we went and found — but H5 is written as an absolute and this does
     not clear it.

     Two things were tried and are worse. Their own before/after AFTER frames,
     cropped square, lose the burnt-in AFTER label to the panel's portrait crop
     and read as clinical mugshots behind privacy bars. Their real interiors
     — lobby, front desk, waiting room — do not tell you what the treatment is,
     and there are only six of them for ten image slots on this page.

     The call is Ignatius's: ship on their own brand imagery, or ask Concierge
     for real treatment photography before send. Do not quietly swap in stock
     from somewhere else, which would fail the gate AND the honesty line. */
  treatments: {
    eyebrow: 'Treatments',
    heading: 'Five kinds of work, one team, one suite on Waterworks Way.',
    panels: [
      {
        name: 'Dermal fillers', image: 'assets/svc-fillers.webp',
        href: 'https://www.conciergeaesthetics.com/treatments/dermal-fillers/',
        items: ['Lip filler · Cheek filler · Chin filler', 'Jawline · Temple · Under eye',
                'Neck (tech neck) · Hand filler · Earlobe filler', 'BioFiller — made from your own plasma',
                'Filler dissolving'],
      },
      {
        name: 'Injectables', image: 'assets/svc-injectables.webp',
        href: 'https://www.conciergeaesthetics.com/treatments/injectables/',
        items: ['Botox Cosmetic · Dysport', 'Lip flip', 'Sculptra · Radiesse hyperdilute',
                'Kybella — double chin', 'Asclera vein treatment'],
      },
      {
        name: 'Laser + energy', image: 'assets/svc-laser.webp',
        href: 'https://www.conciergeaesthetics.com/treatments/laser-and-energy-treatments/',
        items: ['CoolPeel CO2 · DEKA Pulse CO2', 'Morpheus8 — face and body',
                'Laser Genesis · IPL photofacial', 'Laser hair removal',
                'Laser vein treatment · Laser nail fungus', 'ThermiVa'],
      },
      {
        name: 'Skin health', image: 'assets/svc-skin.webp',
        href: 'https://www.conciergeaesthetics.com/treatments/skin-health/',
        items: ['HydraFacial — Signature, Deluxe, Platinum', 'SkinPen microneedling',
                'Chemical peels · Perfect Derma Peel', 'Custom facials · dermaplaning',
                'AnteAGE exosomes', 'Brows, lashes and sugaring'],
      },
      {
        name: 'Wellness', image: 'assets/svc-wellness.webp',
        href: 'https://www.conciergeaesthetics.com/treatments/wellness/',
        items: ['Medical weight loss — tirzepatide', 'Vitamin infusion IV',
                'Wellness boosters — NAD, glutathione, B12, magnesium', 'Nutrafol for hair'],
      },
    ],
  },

  /* ── 8. BEFORE & AFTER ──────────────────────────────────────────
     Concierge's own gallery images, published on their before-and-
     after page as single 2560×853 strips with BEFORE and AFTER burnt
     in, their logo in the corner and their own variance line already
     printed on the photograph. Each has been split down the middle so
     the page can show the two frames at a size somebody can read.

     They have 129 of these. Fourteen are on this page.

     Permission is NOT yet recorded — see compliance.reviews. The build
     warns about this and it must be settled before send. */
  results: {
    eyebrow: 'Results',
    heading: 'Before and after, from their own gallery.',
    lede: 'Concierge publish 129 of these. They are among the best result photographs of any practice we have looked at — and they sit behind a gallery link on a homepage that takes twelve seconds to paint.',
    categories: ['Lips', 'Filler', 'Laser + energy', 'Tox'],
    pairs: {
      Lips: [
        { before: 'assets/ba-lips-5yr-before.webp', after: 'assets/ba-lips-5yr-after.webp' },
        { before: 'assets/ba-lips-first-before.webp', after: 'assets/ba-lips-first-after.webp' },
        { before: 'assets/ba-lips-kysse-before.webp', after: 'assets/ba-lips-kysse-after.webp' },
      ],
      Filler: [
        { before: 'assets/ba-undereye-before.webp', after: 'assets/ba-undereye-after.webp' },
        { before: 'assets/ba-fullface-before.webp', after: 'assets/ba-fullface-after.webp' },
        { before: 'assets/ba-hands-before.webp', after: 'assets/ba-hands-after.webp' },
        { before: 'assets/ba-earlobe-before.webp', after: 'assets/ba-earlobe-after.webp' },
        { before: 'assets/ba-sculptra-before.webp', after: 'assets/ba-sculptra-after.webp' },
      ],
      'Laser + energy': [
        { before: 'assets/ba-coolpeel-before.webp', after: 'assets/ba-coolpeel-after.webp' },
        { before: 'assets/ba-morpheus8-before.webp', after: 'assets/ba-morpheus8-after.webp' },
        { before: 'assets/ba-ipl-before.webp', after: 'assets/ba-ipl-after.webp' },
        { before: 'assets/ba-nailfungus-before.webp', after: 'assets/ba-nailfungus-after.webp' },
      ],
      Tox: [
        { before: 'assets/ba-male-botox-before.webp', after: 'assets/ba-male-botox-after.webp' },
        { before: 'assets/ba-nefertiti-before.webp', after: 'assets/ba-nefertiti-after.webp' },
      ],
    },
    emptyNote: '',
  },

  /* ── 9. PRACTITIONERS — every name is from their own team page ───
     Photographs are theirs too, one per person, which is rarer than it
     should be. Dr. Yoelin's biography is his own, condensed. */
  practitioners: {
    eyebrow: 'Your team',
    heading: 'The people who would actually treat you.',
    photo: 'assets/team.webp',
    photoCaption: 'The Concierge providers, from their own website.',
    people: [
      { name: 'Steven G. Yoelin, MD', credential: 'Medical Director', role: 'Board-certified ophthalmologist, Newport Beach', does: 'Runs clinical trials on facial injectables and teaches injection technique nationally. He is the physician who stands behind the practice — named, on their own team page.', photo: 'assets/member-yoelin.webp' },
      { name: 'Stacy Vencill, PA-C', credential: 'Founder and owner', role: 'Aesthetic injector, MPH', does: 'Started the practice in 2009 in one rented treatment room. Patients name her more than anyone else in the reviews.', photo: 'assets/member-stacy.webp' },
      { name: 'Susie Ergun, PA', credential: 'Physician assistant', role: 'Aesthetic injector and laser', does: 'Injectables and the laser menu.', photo: 'assets/member-susie.webp' },
      { name: 'Laura Yee, PA-C', credential: 'Physician assistant', role: 'Aesthetic injector and laser', does: 'Injectables, CoolPeel and the energy devices.', photo: 'assets/member-laura.webp' },
      { name: 'Catherine Kooiman', credential: 'Medical aesthetician', role: 'Skin health', does: 'Facials, peels, microneedling and the at-home plan that goes with them.', photo: 'assets/member-catherine.webp' },
      { name: 'Shere Cox', credential: 'Aesthetics coordinator', role: 'Front of house', does: '' },
      { name: 'Tina Spagnolo', credential: 'Back office coordinator', role: 'Behind the scenes', does: '' },
    ],
  },

  /* ── 10. CREDENTIALS — the "who treats you" argument ─────────────
     Concierge are the rare practice that already answers this. So the
     argument on this page is not "you are hiding your physician" — it
     is "you answered the hardest question and then buried the answer
     behind twelve seconds of loading". Both cards are measured, not
     asserted: the numbers come from the live homepage. */
  credentials: {
    eyebrow: 'Who treats you',
    heading: 'A needle in your face is not a haircut.',
    lede: 'The single most common reason someone leaves an aesthetics website without booking is that they never found out who would be treating them.',
    photo: 'assets/gram-1.webp',
    photoCaption: 'The Concierge front desk — their own photograph.',
    cards: [
      { title: 'They answer the question almost nobody answers', body: 'Concierge name <strong>Steven G. Yoelin, MD</strong>, a board-certified ophthalmologist, as medical director, and their own FAQ says plainly that injections are performed by physician assistants overseen by a medical director. Under California law a PA practises under physician supervision, and a visitor can work out from this website exactly who that physician is. Most practices we audit cannot say that. It is a genuine advantage — and it currently sits on a sub-page of a sub-menu.' },
      { title: 'The homepage takes twelve seconds to show anything', body: 'Measured on the live site from a desktop connection on 9 September 2026: first paint <strong>12.6 seconds</strong>, server response 2.5 seconds, <strong>639 images and 250 requests</strong> on one page, 5.3 MB cold. An email pop-up covers the hero before the hero has drawn. Google Analytics and the Meta pixel are both installed, so the practice is paying for traffic that arrives at a blank screen. Nothing on this page is a new photograph or a new claim — it is the same content, rendered in under a second.' },
    ],
  },

  /* ── 11. BENEFITS ──────────────────────────────────────────────── */
  benefits: {
    eyebrow: 'For their patients',
    heading: 'What seventeen years in one town actually buys you.',
    items: [
      { title: 'A consultation that is a real appointment', body: 'Thirty minutes, one-to-one, $100 — credited against treatment on the day or refunded with a day’s notice. Their own words: there is no pressure to decide in the room, and sometimes the answer is fewer treatments, or none.' },
      { title: 'The whole face, not the one line you noticed', body: 'Proportion and balance are assessed before anything is recommended, which is what "Artistry + Precision + Restraint" means in practice. Photographs go on your record so the next visit starts from evidence.' },
      { title: 'Prices before the needles come out', body: 'Concierge publish an entire price list — every filler area, every laser package, every product — and confirm exact costs at the consultation. Very few practices in Orange County do either.' },
      { title: 'The same hands, year after year', body: 'Patients in their own reviews talk about ten years with the same injector. Four clinical providers, one medical director, one location — you can ask for the same person every visit.' },
    ],
  },

  /* ── 12. PRODUCTS — 96 SKUs across eight brands ──────────────────
     Their own product photography, from their own shop. Prices are
     their own published figures. Skinbetter Science is stocked and
     listed but has no product photograph on the site, so it is named
     in the lede rather than shown with a borrowed image. */
  products: {
    eyebrow: 'Professional care at home',
    heading: 'Eight medical-grade brands, dispensed in clinic.',
    lede: 'AlumierMD, AnteAGE MD, Colorescience, SkinMedica, Skinbetter Science, Nutrafol, Latisse and Upneeq — ninety-six products, matched to your plan rather than picked off a shelf.',
    href: 'https://www.conciergeaesthetics.com/skincare/',
    items: [
      { name: 'SkinMedica Dermal Repair Cream', note: '$135', image: 'assets/prod-1.webp' },
      { name: 'SkinMedica E|C Dark Spot Cream', note: '$90', image: 'assets/prod-2.webp' },
      { name: 'AlumierMD Enzymatic Peel', note: '$95', image: 'assets/prod-3.webp' },
      { name: 'AlumierMD MicroDerm Polish', note: '$76', image: 'assets/prod-4.webp' },
      { name: 'AlumierMD Acne Clarifying Cleanser', note: '$55', image: 'assets/prod-5.webp' },
      { name: 'Colorescience Sunforgettable Brush', note: '$70', image: 'assets/prod-6.webp' },
      { name: 'AnteAGE MD Biogel', note: '$50', image: 'assets/prod-7.webp' },
      { name: 'AlumierMD Retinol Eye Gel', note: 'In clinic', image: 'assets/prod-8.webp' },
    ],
  },

  /* ── 13. MEMBERSHIP — the Concierge Club, their own figures ────── */
  membership: {
    eyebrow: 'Membership',
    anchor: 'The Concierge Club — $250 a month, fifty places.',
    anchorSub: 'Founding-member pricing, locked for the life of the membership. Their own programme, their own numbers.',
    cta: 'See the Concierge Club',
    href: 'https://www.conciergeaesthetics.com/concierge-club/',
    images: ['assets/gram-2.webp', 'assets/lobby.webp'],
    faq: [
      { q: '$200 monthly Beauty Bank', a: 'Two hundred dollars of treatment credit every month — $2,400 a year — against whatever you actually come in for.' },
      { q: '$1 off every unit of Botox and Dysport', a: 'Every visit, on their own wording, without waiting for a sale.' },
      { q: '10% off select treatments, 15% off all skincare', a: 'CoolPeel, Morpheus8, IPL, HydraFacial, microneedling and PRP hair are the named treatments. The skincare discount covers every brand they stock.' },
      { q: '$200 birthday credit and a $100 gift card', a: 'A birthday credit each year, plus a hundred-dollar card to give to someone who has never been in.' },
      { q: 'The terms, in their own words', a: 'A $99 enrolment fee and a twelve-month initial agreement, then month to month. Thirty days’ notice to cancel, and one thirty-day pause a year for medical reasons or travel. Fifty memberships, no waitlist.' },
    ],
  },

  /* ── 14. FINANCING — both providers named on their own page ────── */
  financing: {
    eyebrow: 'Paying for it',
    heading: 'Two ways to spread it, already set up.',
    lede: 'Concierge are approved with both. They also take Apple Pay, their own gift cards, and Visa, Mastercard, AMEX and Discover.',
    /* The renderer takes { name, note } only — no logo slot, so their
       Cherry and CareCredit badge files are deliberately not shipped.
       Worth adding to the template the way trust[] takes a badge. */
    providers: [
      { name: 'Cherry', note: 'Terms up to six months, 0% plans available, applying does not affect your credit score.' },
      { name: 'CareCredit', note: 'Longer-term patient financing for qualified applicants.' },
    ],
  },

  /* ── 15. LOYALTY — the two manufacturer programmes they run ────── */
  loyalty: {
    eyebrow: 'Rewards',
    heading: 'Points you are probably already earning.',
    lede: 'Both programmes are the manufacturers’ own. Concierge are enrolled in each, which is the only reason your treatments count.',
    programs: [
      { name: 'Allē by Allergan', note: 'Points on Botox Cosmetic, Juvéderm and SkinMedica skincare, plus more than forty other eligible products and treatments. Allē is the one discount that stacks with the others.' },
      { name: 'ASPIRE by Galderma', note: 'Points on the Galderma treatments — Dysport, Sculptra and the Restylane family — redeemable against future treatment.' },
    ],
  },

  /* ── 16. NEW-PATIENT OFFER — their own, currently on a sub-page ── */
  offer: {
    eyebrow: 'First visit',
    headline: '10% off your first treatment.',
    body: 'Concierge’s own new-patient offer. The $100 consultation is thirty minutes with a provider, and it is credited against treatment if you go ahead on the day — or refunded if you give at least twenty-four hours’ notice.',
    cta: 'Book the consultation',
    terms: 'Their own terms: discounts are not combinable, except Allē. Some restrictions apply.',
  },

  /* ── 17. FAQ — also feeds Sandy's answers ──────────────────────
     Drawn from Concierge's own FAQ page, Start Here and the price
     list, kept in their voice. Deliberately no treatment prices in
     this block: it feeds Sandy's prompt and Sandy does not quote
     figures. The membership and consultation numbers live in
     sections 13 and 16, on the page, where they belong. */
  faq: {
    eyebrow: 'Questions',
    heading: 'The things people ask before they book.',
    items: [
      {
        q: 'I have never had anything done. Where do I start?',
        a: 'With a consultation — thirty minutes, one-to-one with a provider. They ask what is actually bothering you, look at your face as a whole rather than the one line you noticed, take photographs for your record and walk you through a plan with exact costs before anything happens. There is no pressure to decide in the room.',
      },
      {
        q: 'How much is a consultation?',
        a: 'It is a paid appointment rather than a sales visit, and the fee is credited towards your treatment if you go ahead on the day. If you decide not to, it is refunded as long as you give at least twenty-four hours’ notice. The figure is on this page.',
      },
      {
        q: 'Who will be treating me? Is it a doctor?',
        a: 'Injections are performed by physician assistants who are overseen by a medical director. That medical director is Dr. Steven G. Yoelin, a board-certified ophthalmologist who runs clinical trials on facial injectables and teaches injection technique. You can see every provider by name on this page.',
      },
      {
        q: 'How do I choose which provider to book with?',
        a: 'Their own answer: you will be in great hands with any of them, and they are happy to recommend one. If you tell me what you are coming in for I can point you at the right diary.',
      },
      {
        q: 'Can I have the consultation and the treatment on the same day?',
        a: 'In most cases yes, for Botox and filler. Whether that is the right call is the provider’s judgement on the day rather than something to promise in advance.',
      },
      {
        q: 'Will I look like I have had something done?',
        a: 'That is the most common worry, and it is the whole basis of how this practice works — artistry, precision and restraint, guided by what enhances your features rather than what changes them. Sometimes the recommendation is fewer treatments, or none.',
      },
      {
        q: 'How long does a treatment take?',
        a: 'It varies with what is being done, but for injectables most people are in and out inside half an hour. Numbing time is included in your appointment, so there is no need to arrive early for it.',
      },
      {
        q: 'Is there any downtime after injectables?',
        a: 'Minor swelling or bruising can happen. Most people expect to get back to their day straight away. Resurfacing lasers are a different conversation — ask about the specific treatment and your provider will be straight with you about recovery.',
      },
      {
        q: 'How soon do results show, and how long do they last?',
        a: 'For the wrinkle relaxers you can start to see something in three or four days, with the full effect over one to two weeks. Filler shows almost immediately and then settles over a few weeks. Maintenance is usually talked about as three or four times a year for relaxers, and one or two for filler, depending on the product and on you.',
      },
      {
        q: 'How many sessions of laser hair removal will I need?',
        a: 'Generally eight to ten visits for the best result, and the exact number depends on the area, the hair and the growth cycle. Patients tend to describe the sensation as a rubber band against the skin rather than as painful.',
      },
      {
        q: 'What about microneedling — when do I see something?',
        a: 'Changes can start within days or weeks, and keep developing for around six months while collagen production stays active. A topical anaesthetic is applied first, and most people go back to their normal day immediately, with the skin a little pink for one to three days.',
      },
      {
        q: 'What are Allē points and can I use them here?',
        a: 'Allē is Allergan’s own rewards programme. Points can be used across Allergan’s range — Botox, Juvéderm filler and SkinMedica skincare. Concierge are enrolled, which is what makes your treatments count, and Allē is the one discount that combines with the others.',
      },
      {
        q: 'How does the Concierge Club work?',
        a: 'It is a monthly membership with a treatment credit that builds every month, a per-unit saving on the wrinkle relaxers, a discount on select treatments and on all skincare, and a birthday credit. There are fifty places and founding pricing is locked in. The figures are set out on the membership section of this page — I do not quote them out loud.',
      },
      {
        q: 'Can I pay it off over time?',
        a: 'Yes. Concierge work with Cherry and with CareCredit, and applying with Cherry does not affect your credit score. They also take Apple Pay, gift cards and the usual credit cards.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Twenty-four hours’ notice for appointments under two hours, forty-eight for anything longer. If you arrive more than ten minutes late you may be asked to reschedule. Late cancellations carry a service fee.',
      },
      {
        q: 'Can I bring my child or my dog?',
        a: 'Children are welcome in the building but should have another adult with them rather than come into the treatment room, so you get the provider’s full attention. Pets are asked to stay at home; service animals are always welcome.',
      },
      {
        q: 'When are you open?',
        a: 'Monday, Tuesday, Thursday and Friday nine to five, and Wednesday nine to six. Closed at the weekend.',
      },
      {
        q: 'Where are you?',
        a: '113 Waterworks Way, Suite 340, Irvine — the Irvine Medical Arts Building, on Waterworks between Laguna Canyon Road and Endeavor Road, near the Irvine Spectrum. Coming off either freeway you exit at Sand Canyon and make a U-turn at Laguna Canyon; it is the newer tan medical building on the right.',
      },
    ],
  },

  /* ── 18. INSTAGRAM — off. RULES.md H5, zero stock photography.
     Concierge have six real photographs of their own clinic and one of their
     own team. Every one is doing a job somewhere else on this page — hero,
     the wellness panel, the credentials card and the membership block. The
     rest of their library is licensed stock models, which is precisely what
     H5 exists to keep off a page. Five tiles of that would fail the gate for
     decoration. */
  instagram: {
    eyebrow: '', heading: '', lede: '', tiles: [],
  },


  /* ── 19. LOCATIONS — drives the map, the picker and the diary ───
     Hours are Concierge's own, from their contact page. */
  locations: {
    eyebrow: 'Find us',
    heading: 'One clinic, on Waterworks Way.',
    lede: 'The Irvine Medical Arts Building, between Laguna Canyon Road and Endeavor Road, near the Irvine Spectrum.',
    items: [
      {
        id: 'irvine', name: 'Irvine',
        address: '113 Waterworks Way, Suite 340, Irvine, CA 92618',
        hint: 'The newer tan medical building, off Sand Canyon',
        parking: 'Parking at the Irvine Medical Arts Building.',
        lat: 33.6533, lon: -117.7566,
        /* day 1 = Monday. Closed Saturday and Sunday. */
        hours: { 1: [9, 17], 2: [9, 17], 3: [9, 18], 4: [9, 17], 5: [9, 17] },
      },
    ],
  },

  /* ── 20. BOOKABLE SERVICES — the demo diary ─────────────────────
     Their treatments; the durations are a plausible demonstration
     diary, not Concierge's real appointment lengths. The page says so. */
  bookable: [
    { id: 'consult', group: 'Start here', name: 'Consultation', mins: 30, note: '$100, credited to treatment' },
    { id: 'botox', group: 'Injectables', name: 'Botox Cosmetic', mins: 30 },
    { id: 'dysport', group: 'Injectables', name: 'Dysport', mins: 30 },
    { id: 'lipflip', group: 'Injectables', name: 'Lip flip', mins: 30 },
    { id: 'sculptra', group: 'Injectables', name: 'Sculptra', mins: 45 },
    { id: 'radiesse', group: 'Injectables', name: 'Radiesse hyperdilute', mins: 45 },
    { id: 'kybella', group: 'Injectables', name: 'Kybella', mins: 30 },
    { id: 'asclera', group: 'Injectables', name: 'Asclera vein treatment', mins: 30 },
    { id: 'lips', group: 'Dermal fillers', name: 'Lip filler', mins: 45 },
    { id: 'cheek', group: 'Dermal fillers', name: 'Cheek filler', mins: 45 },
    { id: 'chin', group: 'Dermal fillers', name: 'Chin filler', mins: 45 },
    { id: 'jawline', group: 'Dermal fillers', name: 'Jawline filler', mins: 60 },
    { id: 'undereye', group: 'Dermal fillers', name: 'Under eye filler', mins: 45 },
    { id: 'temple', group: 'Dermal fillers', name: 'Temple filler', mins: 45 },
    { id: 'hand', group: 'Dermal fillers', name: 'Hand filler', mins: 45 },
    { id: 'earlobe', group: 'Dermal fillers', name: 'Earlobe filler', mins: 30 },
    { id: 'biofiller', group: 'Dermal fillers', name: 'BioFiller', mins: 60 },
    { id: 'dissolve', group: 'Dermal fillers', name: 'Filler dissolving', mins: 30 },
    { id: 'coolpeel', group: 'Laser + energy', name: 'CoolPeel CO2', mins: 60 },
    { id: 'deka', group: 'Laser + energy', name: 'DEKA Pulse CO2', mins: 90 },
    { id: 'morpheus8', group: 'Laser + energy', name: 'Morpheus8', mins: 75 },
    { id: 'genesis', group: 'Laser + energy', name: 'Laser Genesis', mins: 45 },
    { id: 'ipl', group: 'Laser + energy', name: 'IPL photofacial', mins: 45 },
    { id: 'lhr', group: 'Laser + energy', name: 'Laser hair removal', mins: 30 },
    { id: 'vein', group: 'Laser + energy', name: 'Laser vein treatment', mins: 30 },
    { id: 'nail', group: 'Laser + energy', name: 'Laser nail fungus', mins: 30 },
    { id: 'thermiva', group: 'Laser + energy', name: 'ThermiVa', mins: 45 },
    { id: 'hydrafacial', group: 'Skin health', name: 'HydraFacial', mins: 60 },
    { id: 'skinpen', group: 'Skin health', name: 'SkinPen microneedling', mins: 60 },
    { id: 'peel', group: 'Skin health', name: 'Chemical peel', mins: 45 },
    { id: 'facial', group: 'Skin health', name: 'Concierge custom facial', mins: 50 },
    { id: 'dermaplane', group: 'Skin health', name: 'Dermaplaning facial', mins: 50 },
    { id: 'exosomes', group: 'Skin health', name: 'AnteAGE exosomes', mins: 45 },
    { id: 'sugaring', group: 'Skin health', name: 'Sugaring', mins: 30 },
    { id: 'brows', group: 'Skin health', name: 'Brows and lashes', mins: 30 },
    { id: 'weightloss', group: 'Wellness', name: 'Medical weight loss consultation', mins: 30 },
    { id: 'iv', group: 'Wellness', name: 'Vitamin infusion IV', mins: 45 },
    { id: 'booster', group: 'Wellness', name: 'Wellness booster shot', mins: 15 },
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
       has — appointment length — and answers "Morpheus8 is seventy-five
       minutes, CoolPeel is sixty". True, useless.

       Two or three sentences each: what it is, what it involves, who
       tends to choose it. No prices, no outcome promises, no durations
       unless asked. Drafted from Concierge's own treatment pages. */
    talkingPoints: {
      Consultation: 'Where everything starts. Thirty minutes one-to-one with a provider, who asks what is bothering you, looks at your face as a whole, takes photographs for your record and gives you exact costs before anything happens. It is a paid appointment that is credited against treatment on the day, and there is no pressure to decide in the room.',
      'Botox Cosmetic': 'The wrinkle relaxer most people have heard of. It softens the lines that come from movement — forehead, frown lines, crow’s feet. Results tend to start showing in three or four days and settle over a week or two.',
      Dysport: 'Another wrinkle relaxer, from Galderma rather than Allergan. It works on the same movement lines, and which one suits you is a conversation with your injector rather than a preference you need to arrive with. Treatments earn ASPIRE points.',
      'Lip flip': 'A very small amount of relaxer at the top lip so it rolls outward slightly when you smile. It is not filler and adds no volume — people choose it when they want a subtle change to how the lip sits.',
      Sculptra: 'A biostimulator rather than a filler. Instead of adding volume on the day, it prompts your own collagen over a series of treatments, so the change comes in gradually. Chosen for overall facial volume rather than for shaping one feature.',
      'Radiesse hyperdilute': 'Radiesse thinned down and used across a broader area to support skin quality and stimulate collagen, rather than to build structure in one spot. Often discussed for the neck, chest and hands.',
      Kybella: 'An injectable that dissolves fat under the chin. It is done as a course, in vials, and whether it suits you depends on what is actually creating the fullness — which is what the consultation is for.',
      'Asclera vein treatment': 'An injectable for small surface veins, most often on the legs. Done per vial, usually across more than one visit.',
      'Lip filler': 'Hyaluronic acid filler placed in the lip itself. Concierge treat plumping and hydration separately from lip lines, and their gallery has a lot of lip work in it, including a case followed over five years.',
      'Cheek filler': 'Filler used to restore volume and support in the mid-face. It is one of the areas where full-face assessment matters most, because cheeks affect how everything below them sits.',
      'Chin filler': 'Filler used to balance the chin against the rest of the profile. Frequently discussed alongside jawline work rather than on its own.',
      'Jawline filler': 'Filler placed along the jaw to define the line between face and neck. It is a structural treatment, so the assessment looks at chin, cheeks and neck together.',
      'Under eye filler': 'Filler in the tear trough to soften hollowing under the eye. It is one of the most technique-sensitive areas on the face, which is why it is only ever done after an in-person assessment.',
      'Temple filler': 'Filler at the temples, where hollowing changes the shape of the upper face. People often notice the effect without being able to name the area.',
      'Hand filler': 'Filler on the back of the hand to restore lost volume there. Concierge publish before and after photographs of it.',
      'Earlobe filler': 'A small amount of filler in a stretched or thinned earlobe, usually so earrings sit properly again. Quick, and more common than people expect.',
      BioFiller: 'Filler made from a component of your own blood, prepared in clinic, rather than from a manufactured product. Chosen by people who would rather not have a synthetic filler placed.',
      'Filler dissolving': 'An enzyme that breaks down hyaluronic acid filler. Concierge list it as its own treatment, which is worth knowing — it means the practice will take filler out as readily as put it in.',
      'CoolPeel CO2': 'A CO2 laser used in a way that resurfaces the very top of the skin while keeping heat out of the deeper tissue. It is usually done as a course of three, with maintenance afterwards.',
      'DEKA Pulse CO2': 'The deeper, more intensive CO2 resurfacing on the menu. It needs real planning around your calendar, so recovery gets covered properly at the consultation.',
      Morpheus8: 'Radiofrequency delivered through microneedles, so it works on texture and firmness below the surface as well as on top. Sold as a course of three, on face, neck, chest, hands or body.',
      'Laser Genesis': 'A gentler laser aimed at redness, tone and overall evenness, with no real recovery period. Often chosen as maintenance between the bigger treatments.',
      'IPL photofacial': 'Intense pulsed light for pigment, sun damage and redness. Usually a short course, and often paired with a skincare plan from the aesthetician.',
      'Laser hair removal': 'A course of treatments timed to the hair growth cycle, which is why it is spaced out. Generally eight to ten visits, depending on the area and on your hair.',
      'Laser vein treatment': 'A laser used on small surface veins, on the face or legs. A consultation establishes whether the veins you are seeing are the kind this treats.',
      'Laser nail fungus': 'A laser treatment for fungal nails. Concierge publish before and after photographs of it, which almost nobody does.',
      ThermiVa: 'A radiofrequency treatment for vaginal rejuvenation, sold as a package of three with annual maintenance. It is a private conversation and the consultation is exactly that.',
      HydraFacial: 'Cleansing, exfoliation, extraction and hydration in one treatment. Concierge run three levels of it, and the aesthetician will tell you which one your skin actually needs rather than selling you the top one.',
      'SkinPen microneedling': 'Very fine needles create controlled micro-channels that prompt the skin to rebuild collagen over the following weeks. A topical anaesthetic goes on first. Changes keep developing for around six months.',
      'Chemical peel': 'A controlled exfoliation that lifts surface build-up so newer skin comes through. Concierge run the Perfect Derma Peel as well as a no-downtime option for events.',
      'Concierge custom facial': 'A facial built around your skin on the day rather than a fixed protocol, in a fifty or eighty minute version. The aesthetician will also look at what you are using at home.',
      'Dermaplaning facial': 'A blade removes surface dead skin and fine vellus hair, leaving the skin smoother and helping products absorb. Often added to a facial.',
      'AnteAGE exosomes': 'A regenerative add-on applied after microneedling or laser to support the skin’s own repair. It is an add-on to a treatment rather than something booked on its own.',
      Sugaring: 'Hair removal using a sugar paste rather than wax. Concierge offer it across most areas, including for men.',
      'Brows and lashes': 'Brow and lash tinting, and brow shaping, with the aesthetician.',
      'Medical weight loss': 'A medically supervised programme using tirzepatide, dosed in steps and reviewed as you go. The first appointment is a conversation about your history and whether it is appropriate for you at all — I cannot answer that part, and neither can a website.',
      'Vitamin infusion IV': 'Hydration and nutrients by drip, with optional add-ons. Usually part of a wider wellness plan rather than a one-off.',
      'Wellness booster shot': 'Quick injections — NAD, glutathione, lipo B12, vitamin C and magnesium are the ones on the menu. They are boosters alongside a plan, not treatments on their own.',
      'Concierge Club': 'Their membership. A treatment credit that lands every month, a saving on every unit of the wrinkle relaxers, a discount on select treatments and on all skincare, and a birthday credit each year. There are fifty places and founding pricing is locked in for the life of the membership. I do not read the figures out loud — they are set out on the membership section of this page, and the front desk will walk you through them.',
    },

    /* The recogniser has never heard these brand names and mangles
       them. Listing the likely mishearings lets her recover instead of
       denying that her own treatments exist. */
    soundsLike: [
      '"Concierge Aesthetics" may be heard as con see air j, concierge esthetics or conservative aesthetics.',
      '"CoolPeel" may be heard as cool peel, cool pill or coal peel.',
      '"DEKA" may be heard as decca, deka or the car.',
      '"Morpheus8" may be heard as morpheus eight, orpheus eight or morphius.',
      '"ThermiVa" may be heard as thermiva, thermi va, thermal va or turmeric.',
      '"Kybella" may be heard as kibella, key bella or cabella.',
      '"Sculptra" may be heard as sculptra, sculpture or scupltra.',
      '"Radiesse" may be heard as radiance, radius or radiese.',
      '"Asclera" may be heard as a sclera, asclera or ask lara.',
      '"Dysport" may be heard as dysport, this port or the sport.',
      '"BioFiller" may be heard as bio filler or by a filler.',
      '"SkinPen" may be heard as skin pen or skinpin.',
      '"AnteAGE" may be heard as ante age, anti age or auntie age.',
      '"AlumierMD" may be heard as alumier, aluminium or a loo me air.',
      '"Allē" may be heard as alley, alle or ally.',
      '"ASPIRE" may be heard as aspire or a spire.',
      '"Yoelin" may be heard as yolin, yo lin or joelin.',
      '"Vencill" may be heard as vensil, van sill or pencil.',
      '"Waterworks Way" may be heard as water works way or waterworks weigh.',
    ],
    greetingCard: 'Hi, this is Sandy at Concierge Aesthetics in Irvine. I can explain any treatment, tell you who would be treating you, and take a booking. What are you thinking about?',
    panelLede: 'Ask me anything about Concierge’s treatments, the Concierge Club or the opening hours, and I can book you a time. I answer out loud.',
    eyebrow: 'Your virtual assistant',
    heading: 'Meet Sandy, the front desk that never goes home.',
    lede: 'She knows every treatment Concierge offer, who performs them, the opening hours and how the booking works. Ask her out loud — she answers in about a second.',
    asks: [
      '“What is the difference between CoolPeel and Morpheus8?”',
      '“Who would be doing my injections?”',
      '“What do I get with the Concierge Club?”',
      '“Can I come on a Wednesday after five?”',
      '“Book me a consultation next week.”',
    ],
    /* Extra facts Sandy may state that appear nowhere else on the page */
    extraFacts: [
      'Concierge Aesthetics have been in Orange County since 2009 and moved into their own facility on Waterworks Way in 2017. The clinic is at 113 Waterworks Way, Suite 340, Irvine, in the Irvine Medical Arts Building near the Irvine Spectrum.',
      'The practice was founded by Stacy Vencill, PA-C, MPH, who owns it and still injects.',
      'The medical director is Dr. Steven G. Yoelin, a board-certified ophthalmologist in Newport Beach who runs clinical trials on facial injectables.',
      'Injections are performed by physician assistants overseen by the medical director.',
      'Open Monday, Tuesday, Thursday and Friday nine to five, and Wednesday nine to six. Closed Saturday and Sunday.',
      'Concierge are an Allergan Top 500 practice — the top one per cent nationwide — and have been featured on KCAL News for Botox in Orange County.',
      'Payment: Apple Pay, gift cards, Visa, Mastercard, AMEX and Discover, plus Cherry and CareCredit financing for qualified applicants.',
      'Cancellations need twenty-four hours for appointments under two hours and forty-eight hours for longer ones. Arriving more than ten minutes late may mean rescheduling.',
      'Numbing time is included in the appointment, so there is no need to arrive early for it.',
      'Medical-grade skincare stocked in clinic: AlumierMD, AnteAGE MD, Colorescience, SkinMedica, Skinbetter Science, Nutrafol, Latisse and Upneeq.',
      'Children are welcome in the building with another adult to supervise them, but not in the treatment room. Pets stay at home; service animals are always welcome.',
    ],
  },

  /* ── 22. THE ASK — Ignatius's Discovery Call ───────────────────── */
  close: {
    heading: 'Turn the demo into a decision.',
    lede: 'Everything on this page came from conciergeaesthetics.com — your own photographs, your own prices, your own team, your own gallery. Nothing was invented and nothing was bought in. A 60-minute Discovery Call with Ignatius covers what it takes to run properly — the phone line, the diary, the Concierge Club follow-up — and whether it is worth doing at all.',
    chips: ['Founder-led', 'Monday–Friday', 'Automatic timezone conversion', 'Google Calendar & Meet ready'],
    cardEyebrow: 'Your next step',
    cardHeading: 'Book a Discovery Call',
    cardBody: 'Pick a date, choose your local time and tell me what would make the conversation valuable.',
    cardLink: 'View available appointments',
    href: 'https://www.aestheticbiz.site/book-discovery',
  },

  /* ── 23. COMPLIANCE — required, and enforced by build.mjs ────────
     California rather than Texas here. There is no state rule numbered
     like the TMB one, but the same principle applies: a consumer must
     be able to tell which licensed physician stands behind a practice,
     and under California's corporate-practice-of-medicine position a
     physician assistant injects under physician supervision.

     Concierge already meet this. Dr. Yoelin is named as medical
     director on their own team page and their own FAQ says injections
     are performed by PAs overseen by a medical director. The licence
     number is not published, so verified stays false until we ask.

     Leave medicalDirector blank and the build warns loudly. Put a
     banned absolute anywhere in the copy and the build refuses. */
  compliance: {
    medicalDirector: {
      name: 'Steven G. Yoelin, MD',
      license: '',
      board: 'Medical Board of California',
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
      platform: 'Google and Yelp',
      note: 'The 5.0 / 533 figure is the practice’s own published combined Google-and-Yelp count, marked up on their homepage as an AggregateRating of 5 from 528. Yelp alone shows 200. Verify the Google figure before send, and note that a self-serving AggregateRating on an organisation is against Google’s own structured-data guidance — worth raising with them either way. The named reviewers are first-name-and-initial as published on their own reviews page. The before/after images are Concierge’s own gallery photographs and already carry their variance line burnt in, but patient permission for use on a third-party page has NOT been obtained — settle that before this page goes anywhere public.',
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
