export type TreatmentFaq = { question: string; answer: string };

export type Treatment = {
  slug: string;
  category: string;
  categorySlug: string;
  name: string;
  tagline: string;
  priceFrom: string;
  priceNumber: number;
  duration: string;
  downtime: string;
  downtimeDetail: string;
  image: string | null;
  alt: string;
  heroText: string;
  whatIs: string;
  howWorks: string[];
  expectedResults: string;
  suitableFor: string[];
  faqs: TreatmentFaq[];
  recommendedProductSlugs: string[];
  pricingRows?: { label: string; price: string }[];
};

export type ProductImage = { url: string | null; alt_text: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  categoryTag: string;
  step: string;
  price: number;
  sku: string;
  shortDescription: string;
  benefits: string[];
  description: string;
  concerns: { concern: string; helps: string }[];
  timeline: { period: string; result: string }[];
  miniFaqs: { question: string; answer: string }[];
  specs: { label: string; value: string }[];
  ingredients: { name: string; benefit: string }[];
  howToUse: string;
  images: ProductImage[];
  relatedSlugs: string[];
  treatmentSlugs: string[];
};

export const BRANDS = [
  {
    slug: "demo",
    name: "Demo Clinical",
    tagline: "High-performance medical skincare for every step of the routine.",
    description:
      "Demo Clinical stands in for a pharmaceutical-grade skincare house — purify, stimulate, restore, protect and target — curated for AestheticBiz patients across Midtown.",
  },
] as const;

/** Extra lifestyle / editorial assets for About, Contact, Blog */
export const CONTENT_IMAGES = {
  acne: "/images/content/acne-treatment-sample-image.jpg",
  sweating: "/images/content/excessive-sweating-treatment-sample-image.jpg",
  jawChin: "/images/content/jaw-chin-contouring-treatment-demo-image.jpg",
  lipFiller: "/images/content/lip-filler-treatment-demo-image.jpg",
  pigmentation: "/images/content/pigmentation-treatment-sample-image.jpg",
  varicose: "/images/content/varicose-veins-treatment-sample-image.jpg",
  vitaminDrip: "/images/content/vitamin-drip-treatment-sample-image.jpg",
  weightLoss: "/images/content/weight-loss-programme-sample-image.jpg",
} as const;

function galleryForProduct(n: number, name: string): ProductImage[] {
  const base = `/images/product-${String(n).padStart(2, "0")}`;
  return [
    { url: `${base}.jpg`, alt_text: name },
    { url: `${base}-1.jpg`, alt_text: `${name} — angle 1` },
    { url: `${base}-2.jpg`, alt_text: `${name} — angle 2` },
    { url: `${base}-3.jpg`, alt_text: `${name} — angle 3` },
    { url: `${base}-4.jpg`, alt_text: `${name} — lifestyle` },
  ];
}

function makeProduct(
  n: number,
  opts: {
    name: string;
    price: number;
    categoryTag: string;
    step: string;
    short: string;
    description: string;
    benefits: string[];
    concerns: { concern: string; helps: string }[];
    ingredients: { name: string; benefit: string }[];
    specs: { label: string; value: string }[];
    howToUse: string;
    treatmentSlugs: string[];
  },
): Product {
  const slug = `demo-product-${String(n).padStart(2, "0")}`;
  return {
    id: `prod-demo-${String(n).padStart(2, "0")}`,
    slug,
    name: opts.name,
    brand: "Demo Clinical",
    brandSlug: "demo",
    categoryTag: opts.categoryTag,
    step: opts.step,
    price: opts.price,
    sku: `DEMO-${String(n).padStart(2, "0")}`,
    shortDescription: `<p>${opts.short}</p>`,
    benefits: opts.benefits,
    description: opts.description,
    concerns: opts.concerns,
    timeline: [
      { period: "2 weeks", result: "Skin feels more comfortable; surface glow begins to improve." },
      { period: "4 weeks", result: "Tone looks more even; texture feels refined with consistent use." },
      { period: "8 weeks", result: "Cumulative clarity and resilience alongside your treatment plan." },
    ],
    miniFaqs: [
      {
        question: "Can I use this with retinol?",
        answer: "Usually on alternate nights unless your clinician advises otherwise.",
      },
      {
        question: "Is it suitable after peels?",
        answer: "Many patients resume gentle care within 24–72 hours — confirm for your exact protocol.",
      },
      {
        question: "Morning or night?",
        answer: "Follow the how-to-use steps below; most SKUs work AM under SPF and/or PM after cleansing.",
      },
    ],
    specs: opts.specs,
    ingredients: opts.ingredients,
    howToUse: opts.howToUse,
    images: galleryForProduct(n, opts.name),
    relatedSlugs: [],
    treatmentSlugs: opts.treatmentSlugs,
  };
}

export const TREATMENTS: Treatment[] = [
  {
    slug: "acne-treatment",
    category: "Medical Skin",
    categorySlug: "medical-skin",
    name: "Acne Treatment",
    tagline: "Clear skin changes everything — medical acne care for teens and adults.",
    priceFrom: "From $150",
    priceNumber: 150,
    duration: "30–60 minutes",
    downtime: "Minimal — 24–48 hours mild redness or peeling after peels",
    downtimeDetail:
      "Peels may flake for 2–5 days. Prescription home care can cause brief dryness as skin adapts. Microneedling for scarring: 24–48 hours redness.",
    image: "/images/acne-treatment-sample-image.jpg",
    alt: "Acne treatment consultation",
    heroText:
      "Acne is a <strong>medical condition</strong>, not a hygiene failure. AestheticBiz builds a personalised plan — in-clinic treatments plus pharmaceutical-grade home care — so breakouts, marks, and confidence all move in the right direction.",
    whatIs:
      "<p>Acne is chronic inflammation of the pilosebaceous unit. Excess oil, dead cells, and bacteria drive comedones, papules, pustules, and cysts. Hormones, genetics, and stress all play a role.</p><p>We treat mild to severe acne, adult hormonal patterns along the jawline, and the dark marks or texture left behind.</p>",
    howWorks: [
      "Skin assessment — Grade type, triggers, and prior treatments.",
      "Personalised plan — In-clinic modalities + home-care stack.",
      "In-clinic care — Peels, extractions facials, or microneedling for scarring as indicated.",
      "Home-care programme — Clinic retail matched to your skin.",
      "Follow-up — Adjust the protocol as clarity improves.",
    ],
    expectedResults:
      "Weeks 1–2: possible purge. Weeks 3–4: fewer new breakouts. Weeks 6–12: clearer texture and fading marks with consistent care.",
    suitableFor: [
      "Teens and adults with persistent breakouts",
      "Hormonal jawline / chin acne",
      "Post-acne marks and shallow scarring",
      "Patients ready for a medical plan, not another shelf cycle",
    ],
    faqs: [
      {
        question: "Is adult acne treatable?",
        answer:
          "Yes — hormonal adult acne is extremely common, especially in women, and responds well to a structured medical programme.",
      },
      {
        question: "How many visits will I need?",
        answer:
          "Most patients see meaningful change across <strong>3–6 visits</strong> plus daily home care. Severe cystic acne may need a longer course.",
      },
      {
        question: "Will it come back?",
        answer:
          "Triggers can return, but maintenance skincare and periodic clinic visits keep most patients clear long-term.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-02",
      "demo-product-07",
      "demo-product-01",
      "demo-product-03",
    ],
    pricingRows: [
      { label: "Acne facial / medical cleanse", price: "$150" },
      { label: "Acne peel session", price: "$180" },
      { label: "Series of 3", price: "$450" },
    ],
  },
  {
    slug: "pigmentation-treatment",
    category: "Medical Skin",
    categorySlug: "medical-skin",
    name: "Pigmentation Treatment",
    tagline: "Even tone programmes for melasma, sun spots, and post-inflammatory marks.",
    priceFrom: "From $220",
    priceNumber: 220,
    duration: "30–60 minutes",
    downtime: "1–7 days depending on modality",
    downtimeDetail:
      "Light peels: mild flake. Deeper pigment protocols or laser may need social downtime — planned at consultation with strict SPF guidance.",
    image: "/images/pigmentation-treatment-sample-image.jpg",
    alt: "Pigmentation treatment",
    heroText:
      "Uneven pigment is one of the most common Midtown concerns. We combine assessment, peels or energy-based options, and a <strong>tyrosinase-inhibiting home routine</strong> so results last.",
    whatIs:
      "<p>Pigmentation includes melasma, sun-induced spots, and post-inflammatory hyperpigmentation after acne or injury. Melanin production must be calmed carefully — aggressive DIY acids often worsen it.</p>",
    howWorks: [
      "Consult & wood-lamp / photo assessment",
      "Protocol selection — Peel, topical programme, or device",
      "In-clinic sessions on a controlled cadence",
      "Daily pigment + SPF home care",
      "Maintenance to prevent rebound",
    ],
    expectedResults:
      "Brighter, more even tone over 6–12 weeks. Melasma is managed, not “cured” — sun discipline is non-negotiable.",
    suitableFor: [
      "Melasma and patchy facial pigment",
      "Sun spots and mottled tone",
      "Dark marks after acne",
    ],
    faqs: [
      {
        question: "Can pigmentation be permanent?",
        answer:
          "Some pigment fades fully; melasma often needs ongoing management. Honest expectations are set at consult.",
      },
      {
        question: "Do I need SPF every day?",
        answer: "Yes — without daily broad-spectrum SPF, pigment programmes underperform.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-08",
      "demo-product-05",
      "demo-product-01",
      "demo-product-02",
    ],
    pricingRows: [
      { label: "Pigment peel", price: "$220" },
      { label: "Corrective series of 3", price: "$600" },
    ],
  },
  {
    slug: "lip-filler",
    category: "Injectables",
    categorySlug: "injectables",
    name: "Lip Filler",
    tagline: "Natural volume, definition, and balance with hyaluronic acid.",
    priceFrom: "From $450",
    priceNumber: 450,
    duration: "30–45 minutes",
    downtime: "24–48 hours swelling; bruising possible",
    downtimeDetail:
      "Swelling peaks early. Avoid intense exercise, heat, and alcohol for 24 hours. Final shape settles by about two weeks.",
    image: "/images/lip-filler-treatment-demo-image.jpg",
    alt: "Lip filler treatment",
    heroText:
      "<strong>Lip filler</strong> uses hyaluronic acid to restore shape, refine the border, or add soft volume — proportion-first, never overfilled.",
    whatIs:
      "<p>HA filler integrates with lip tissue, attracts water for hydration, and is reversible with hyaluronidase if needed. Longevity is typically 6–12 months in a mobile area.</p>",
    howWorks: [
      "Consultation & proportion mapping",
      "Photos & consent",
      "Numbing for comfort",
      "Precise placement with needle or cannula",
      "Shape, ice, and written aftercare",
    ],
    expectedResults:
      "Immediate volume with swelling; refined result at 72 hours to 2 weeks. Duration 6–12 months.",
    suitableFor: [
      "Thin or ageing lips",
      "Asymmetry or flat cupid’s bow",
      "Patients wanting hydration more than size",
    ],
    faqs: [
      {
        question: "Will it look natural?",
        answer:
          "Conservative, anatomy-led placement is the standard. Many first treatments start at 0.5 ml.",
      },
      {
        question: "Can it be reversed?",
        answer: "Yes — HA filler can be dissolved if required.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-03",
      "demo-product-04",
      "demo-product-01",
      "demo-product-05",
    ],
    pricingRows: [
      { label: "0.5 ml", price: "$450" },
      { label: "1.0 ml", price: "$650" },
    ],
  },
  {
    slug: "jaw-chin-contouring",
    category: "Injectables",
    categorySlug: "injectables",
    name: "Jaw & Chin Contouring",
    tagline: "Define your profile — filler projection and masseter slimming options.",
    priceFrom: "From $550",
    priceNumber: 550,
    duration: "30–60 minutes",
    downtime: "Mild swelling / tenderness 24–72 hours",
    downtimeDetail:
      "Avoid heavy chewing and facial massage for a short period after masseter toxin. Filler: expect mild swelling.",
    image: "/images/jaw-chin-contouring-treatment-demo-image.jpg",
    alt: "Jaw and chin contouring",
    heroText:
      "A softer or sharper jawline can be built <strong>without surgery</strong> — hyaluronic acid for chin/jaw projection, and neuromodulator for bulky masseters when indicated.",
    whatIs:
      "<p>Chin and jaw filler restores balance in profile. Masseter Botox can slim a square jaw driven by muscle bulk or grinding. Plans are customised after facial assessment.</p>",
    howWorks: [
      "Profile & bite / bruxism assessment",
      "Choose filler, toxin, or combination",
      "Placement or injection map",
      "Aftercare and review",
    ],
    expectedResults:
      "Filler: immediate contour with settle over 1–2 weeks. Masseter slimming: gradual over 4–8 weeks.",
    suitableFor: [
      "Weak chin projection",
      "Soft jawline wanting definition",
      "Clenching-related masseter bulk",
    ],
    faqs: [
      {
        question: "Is this the same as surgical jaw surgery?",
        answer: "No — this is non-surgical contouring with injectables. Surgery is a different pathway.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-06",
      "demo-product-04",
      "demo-product-03",
      "demo-product-01",
    ],
    pricingRows: [
      { label: "Chin / jaw filler (per ml)", price: "From $550" },
      { label: "Masseter slimming", price: "From $400" },
    ],
  },
  {
    slug: "excessive-sweating",
    category: "Wellness",
    categorySlug: "wellness",
    name: "Excessive Sweating Treatment",
    tagline: "Hyperhidrosis relief — months of confidence from a short clinic visit.",
    priceFrom: "From $800",
    priceNumber: 800,
    duration: "30–45 minutes",
    downtime: "None — return to work immediately",
    downtimeDetail: "Avoid strenuous exercise and hot baths for 24 hours. Dress normally the same day.",
    image: "/images/excessive-sweating-treatment-sample-image.jpg",
    alt: "Excessive sweating treatment",
    heroText:
      "If sweating is running your wardrobe and your calendar, that is <strong>hyperhidrosis</strong> — a medical condition with a highly effective injectable solution for underarms, hands, or feet.",
    whatIs:
      "<p>Primary focal hyperhidrosis means overactive nerve signals to sweat glands. Botulinum toxin blocks those signals in the mapped zone for typically 6–9 months.</p>",
    howWorks: [
      "Consultation & diagnosis",
      "Starch-iodine mapping of sweat zones",
      "Optional anaesthetic",
      "Precise intradermal injections",
      "Immediate return to normal activity",
    ],
    expectedResults:
      "Reduction noticeable by days 5–7; full effect around day 14. Relief commonly lasts 6–9 months.",
    suitableFor: [
      "Underarm, palm, or sole hyperhidrosis",
      "Patients limited socially or at work by sweating",
      "Those who failed strong antiperspirants",
    ],
    faqs: [
      {
        question: "Will I overheat if I stop sweating there?",
        answer:
          "No — you still have millions of sweat glands elsewhere. Thermoregulation remains intact.",
      },
      {
        question: "Is it the same product used for wrinkles?",
        answer:
          "Same toxin class; technique and dosing differ for sweat glands versus facial muscles.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-07",
      "demo-product-02",
      "demo-product-05",
      "demo-product-03",
    ],
    pricingRows: [
      { label: "Underarms (typical)", price: "From $800" },
      { label: "Palms / other areas", price: "Quoted at consult" },
    ],
  },
  {
    slug: "vitamin-drips",
    category: "Wellness",
    categorySlug: "wellness",
    name: "Vitamin Drips",
    tagline: "IV nutrient therapy for energy, recovery, and immune support narratives.",
    priceFrom: "From $180",
    priceNumber: 180,
    duration: "30–60 minutes",
    downtime: "None",
    downtimeDetail: "Sit comfortably during infusion; resume the day afterward unless advised.",
    image: "/images/vitamin-drip-treatment-sample-image.jpg",
    alt: "Vitamin drip therapy",
    heroText:
      "<strong>Vitamin drips</strong> deliver hydration and nutrients intravenously — popular for travel recovery, busy seasons, and wellness programmes under clinical oversight.",
    whatIs:
      "<p>IV nutrient therapy bypasses the gut for rapid delivery. Formulas may include vitamin C, B-complex, minerals, and antioxidants. Suitability is screened before every drip.</p>",
    howWorks: [
      "Health screen & formula choice",
      "Cannula placement",
      "Monitored infusion",
      "Aftercare & optional series booking",
    ],
    expectedResults:
      "Many patients report feeling refreshed the same day; benefits vary by formula and baseline health.",
    suitableFor: [
      "Busy professionals needing recovery support",
      "Pre/post travel wellness",
      "Patients cleared medically for IV therapy",
    ],
    faqs: [
      {
        question: "Is a drip a substitute for a balanced diet?",
        answer: "No — it complements lifestyle and medical care; it does not replace food or prescriptions.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-05",
      "demo-product-03",
      "demo-product-06",
      "demo-product-04",
    ],
    pricingRows: [
      { label: "Hydration / recovery drip", price: "$180" },
      { label: "Immunity / performance blends", price: "From $220" },
    ],
  },
  {
    slug: "weight-loss-programme",
    category: "Wellness",
    categorySlug: "wellness",
    name: "Medical Weight Loss Programme",
    tagline: "Physician-supervised weight management with structured follow-up.",
    priceFrom: "Consult for plan",
    priceNumber: 0,
    duration: "Ongoing programme visits",
    downtime: "None for clinic visits",
    downtimeDetail:
      "Medication side effects (if prescribed) are discussed and monitored. Lifestyle changes are part of the plan.",
    image: "/images/weight-loss-programme-sample-image.jpg",
    alt: "Medical weight loss programme",
    heroText:
      "Sustainable weight change needs more than willpower. Our <strong>medical weight loss programme</strong> combines assessment, nutrition guidance, and — where appropriate — prescription pathways under review.",
    whatIs:
      "<p>A structured programme may include metabolic screening, coaching, and evidence-based medications when clinically indicated. Not every patient is a candidate for every drug class.</p>",
    howWorks: [
      "Intake consult & labs as needed",
      "Personalised plan (nutrition + activity + medical options)",
      "Regular check-ins and dose review",
      "Maintenance phase to protect results",
    ],
    expectedResults:
      "Meaningful loss over months with adherence; individual results vary. Focus is sustainable change, not crash diets.",
    suitableFor: [
      "Adults with BMI / health criteria for medical weight care",
      "Patients wanting supervised, not DIY, protocols",
    ],
    faqs: [
      {
        question: "Do you prescribe GLP-1 medications?",
        answer:
          "When clinically appropriate and available under local regulations — decided only after assessment.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-06",
      "demo-product-07",
      "demo-product-05",
      "demo-product-04",
    ],
    pricingRows: [
      { label: "Programme enrolment", price: "Quoted at consult" },
      { label: "Follow-up visits", price: "Package pricing" },
    ],
  },
  {
    slug: "varicose-veins",
    category: "Body",
    categorySlug: "body",
    name: "Varicose Veins Treatment",
    tagline: "Assessment and treatment pathways for visible leg veins.",
    priceFrom: "Consult for plan",
    priceNumber: 0,
    duration: "Varies by modality",
    downtime: "Depends on treatment chosen",
    downtimeDetail:
      "Sclerotherapy may need compression stockings for a period. Walking is usually encouraged. Exact aftercare is modality-specific.",
    image: "/images/varicose-veins-treatment-sample-image.jpg",
    alt: "Varicose veins treatment",
    heroText:
      "Spider and varicose veins are more than cosmetic for many patients. We start with <strong>proper assessment</strong>, then discuss sclerotherapy or referral pathways when deeper venous disease is suspected.",
    whatIs:
      "<p>Small surface veins often respond to sclerotherapy. Larger varicosities may need duplex ultrasound and specialist input. Honesty about what belongs in a medspa versus vascular care builds trust.</p>",
    howWorks: [
      "Clinical assessment of vein pattern",
      "Discuss options / imaging if indicated",
      "Treatment session(s)",
      "Compression & activity guidance",
      "Review for touch-ups",
    ],
    expectedResults:
      "Fading of treated surface veins over weeks; multiple sessions often needed for best cosmetic outcome.",
    suitableFor: [
      "Spider veins and small varicosities",
      "Patients seeking aesthetic improvement of legs",
    ],
    faqs: [
      {
        question: "Is one session enough?",
        answer: "Often a series is required. We set expectations after seeing the vein map.",
      },
    ],
    recommendedProductSlugs: [
      "demo-product-05",
      "demo-product-03",
      "demo-product-01",
      "demo-product-07",
    ],
    pricingRows: [
      { label: "Sclerotherapy session", price: "Quoted at consult" },
      { label: "Package of sessions", price: "Package pricing" },
    ],
  },
];

export const PRODUCTS: Product[] = [
  makeProduct(1, {
    name: "Demo Clinical Radiance Serum",
    price: 68,
    categoryTag: "Brighten",
    step: "Target",
    short:
      "Amber dropper serum for dullness and early photoageing — clinic favourite after pigment and acne programmes.",
    description:
      "<p><strong>Demo Clinical Radiance Serum</strong> is a lightweight antioxidant concentrate for Midtown patients who want clearer-looking tone between visits.</p><p>Layer under moisturiser and SPF by day, or after cleansing at night when your clinician clears actives.</p>",
    benefits: [
      "Supports a brighter, more even-looking complexion",
      "Pairs with pigment and acne treatment plans",
      "Dropper format for precise, hygienic dosing",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Dull, tired-looking skin",
        helps: "Antioxidant support helps skin look fresher with consistent use.",
      },
      {
        concern: "Uneven tone",
        helps: "Brightening complex targets mottled appearance over weeks.",
      },
      {
        concern: "Post-acne marks",
        helps: "Complements medical acne programmes once inflammation settles.",
      },
      {
        concern: "Early photoageing",
        helps: "Daily defence against environmental stressors that accelerate ageing.",
      },
    ],
    ingredients: [
      { name: "Demo Brightening Complex", benefit: "Clearer-looking tone" },
      { name: "Vitamin C derivative", benefit: "Antioxidant glow" },
      { name: "Hyaluronic acid", benefit: "Surface hydration" },
      { name: "Vitamin E", benefit: "Comfort and stability" },
    ],
    specs: [
      { label: "Skin type", value: "Normal, combination, dry" },
      { label: "Format", value: "Dropper serum · 30 ml" },
      { label: "Main actives", value: "Brightening complex · antioxidants" },
      { label: "pH", value: "5.0 – 5.5" },
    ],
    howToUse:
      "AM/PM: After cleansing, apply 3–4 drops to face and neck. Follow with moisturiser; always finish daytime with SPF 50. Introduce slowly if using with prescription retinoids.",
    treatmentSlugs: ["pigmentation-treatment", "acne-treatment"],
  }),
  makeProduct(2, {
    name: "Demo Clinical Clarify Gel",
    price: 42,
    categoryTag: "Cleanse",
    step: "Cleanse",
    short: "Soft-matte tube cleanser for congested, breakout-prone skin — first step before peels and acne visits.",
    description:
      "<p><strong>Demo Clinical Clarify Gel</strong> removes oil and residue without stripping — the wash we recommend before acne facials and pigment prep.</p><p>Use morning and night; follow with treatment serums as directed.</p>",
    benefits: [
      "Gently clarifies without harsh foam burn",
      "Ideal pre-treatment cleanse for acne programmes",
      "Travel-friendly squeeze tube",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Congestion & blackheads",
        helps: "Daily cleanse keeps pores clearer between extractions.",
      },
      {
        concern: "Oily T-zone",
        helps: "Balances shine without over-drying cheeks.",
      },
      {
        concern: "Makeup / SPF residue",
        helps: "Lifts the day without abrasive scrubbing.",
      },
      {
        concern: "Pre-peel prep",
        helps: "Clean canvas for in-clinic peels and assessments.",
      },
    ],
    ingredients: [
      { name: "Mild surfactants", benefit: "Effective cleanse" },
      { name: "Niacinamide", benefit: "Barrier-friendly clarity" },
      { name: "Panthenol", benefit: "Comfort after wash" },
      { name: "Green tea extract", benefit: "Soothing antioxidant" },
    ],
    specs: [
      { label: "Skin type", value: "Oily, combination, acne-prone" },
      { label: "Format", value: "Squeeze tube · 150 ml" },
      { label: "Main actives", value: "Niacinamide · botanicals" },
      { label: "pH", value: "5.0 – 5.8" },
    ],
    howToUse:
      "AM/PM: Wet face, massage a pea-sized amount for 30–60 seconds, rinse. Pat dry. Follow with serum and moisturiser.",
    treatmentSlugs: ["acne-treatment", "pigmentation-treatment"],
  }),
  makeProduct(3, {
    name: "Demo Clinical Hydra Essence",
    price: 58,
    categoryTag: "Restore",
    step: "Prevent & Restore",
    short: "Frosted dropper essence for dehydration and post-procedure comfort.",
    description:
      "<p><strong>Demo Clinical Hydra Essence</strong> floods the surface with humectants — the bottle we send patients home with after injectables and peels when skin feels tight.</p>",
    benefits: [
      "Instant surface hydration",
      "Layers under richer creams or SPF",
      "Clinic-adjacent comfort formula",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Dehydration & tightness",
        helps: "Humectants help skin feel comfortable within days.",
      },
      {
        concern: "Post-filler dryness",
        helps: "Gentle enough once your injector clears topical care.",
      },
      {
        concern: "Flaky texture",
        helps: "Supports smoother makeup and SPF application.",
      },
      {
        concern: "Barrier stress",
        helps: "Lightweight recovery between stronger actives.",
      },
    ],
    ingredients: [
      { name: "Multi-weight hyaluronic acid", benefit: "Surface plumpness" },
      { name: "Glycerin", benefit: "Humectant comfort" },
      { name: "Beta-glucan", benefit: "Soothing support" },
      { name: "Panthenol", benefit: "Barrier comfort" },
    ],
    specs: [
      { label: "Skin type", value: "All, including sensitive" },
      { label: "Format", value: "Dropper essence · 30 ml" },
      { label: "Main actives", value: "HA · beta-glucan" },
      { label: "pH", value: "5.2 – 5.6" },
    ],
    howToUse:
      "AM/PM: After cleansing, apply 3–5 drops to damp skin. Press in, then seal with moisturiser. Daytime: SPF last.",
    treatmentSlugs: ["lip-filler", "acne-treatment", "jaw-chin-contouring"],
  }),
  makeProduct(4, {
    name: "Demo Clinical Overnight Repair",
    price: 72,
    categoryTag: "Repair",
    step: "Prevent & Restore",
    short: "Night lotion in a tall matte bottle — recovery for depleted skin after contouring or peels.",
    description:
      "<p><strong>Demo Clinical Overnight Repair</strong> is the PM workhorse after jawline filler, peels, or busy Midtown weeks when barrier comfort slips.</p>",
    benefits: [
      "Overnight comfort and resilience",
      "Supports recovery narratives post-injectable",
      "Layers over serums without pilling",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Depleted, stressed skin",
        helps: "Lipids and peptides support a rested look by morning.",
      },
      {
        concern: "Post-procedure recovery",
        helps: "Resume when your clinician clears richer textures.",
      },
      {
        concern: "Fine dehydration lines",
        helps: "Night hydration softens the look of dryness lines.",
      },
      {
        concern: "Uneven texture",
        helps: "Consistent use refines how skin feels under makeup.",
      },
    ],
    ingredients: [
      { name: "Peptide blend", benefit: "Supportive firmness feel" },
      { name: "Ceramides", benefit: "Barrier lipids" },
      { name: "Squalane", benefit: "Non-greasy emollience" },
      { name: "Niacinamide", benefit: "Tone and barrier" },
    ],
    specs: [
      { label: "Skin type", value: "Normal, dry, combination" },
      { label: "Format", value: "Lotion bottle · 50 ml" },
      { label: "Main actives", value: "Peptides · ceramides" },
      { label: "pH", value: "5.0 – 5.5" },
    ],
    howToUse:
      "PM: After essence/serum, smooth 1–2 pumps over face and neck. Avoid active eyes unless directed. AM: lighter moisturiser + SPF.",
    treatmentSlugs: ["lip-filler", "jaw-chin-contouring"],
  }),
  makeProduct(5, {
    name: "Demo Clinical Daily Defence",
    price: 54,
    categoryTag: "Protect",
    step: "Protect",
    short: "Pump antioxidant serum — the daytime defence layer under SPF after pigment protocols.",
    description:
      "<p><strong>Demo Clinical Daily Defence</strong> is non-negotiable in pigment and wellness plans: antioxidants by day, SPF on top, every commute and lunch walk.</p>",
    benefits: [
      "Environmental antioxidant support",
      "Essential after pigmentation programmes",
      "Pump for clean office-desk reapplication of serum step",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Pigment rebound",
        helps: "Daily antioxidants + SPF habits protect your investment.",
      },
      {
        concern: "Urban pollution exposure",
        helps: "Defence layer for Midtown outdoor/indoor transitions.",
      },
      {
        concern: "Dull midday skin",
        helps: "Keeps complexion looking fresher under makeup.",
      },
      {
        concern: "Post-drip glow maintenance",
        helps: "Complements wellness visits with at-home discipline.",
      },
    ],
    ingredients: [
      { name: "Vitamin C derivative", benefit: "Daytime antioxidant" },
      { name: "Ferulic support complex", benefit: "Stability boost" },
      { name: "Niacinamide", benefit: "Barrier and tone" },
      { name: "Vitamin E", benefit: "Comfort" },
    ],
    specs: [
      { label: "Skin type", value: "All (patch-test sensitive)" },
      { label: "Format", value: "Pump serum · 30 ml" },
      { label: "Main actives", value: "Antioxidant complex" },
      { label: "pH", value: "3.5 – 4.5" },
    ],
    howToUse:
      "AM: After cleansing (and essence if used), 1–2 pumps on face and neck. Wait 60 seconds, moisturiser if needed, then SPF 50.",
    treatmentSlugs: ["pigmentation-treatment", "vitamin-drips", "varicose-veins"],
  }),
  makeProduct(6, {
    name: "Demo Clinical Firm Peptide",
    price: 78,
    categoryTag: "Stimulate",
    step: "Stimulate",
    short: "Screw-cap peptide concentrate for firmness narratives in contouring and body programmes.",
    description:
      "<p><strong>Demo Clinical Firm Peptide</strong> supports the look of firmer skin at home while you invest in jawline contouring or medical weight-loss pathways.</p>",
    benefits: [
      "Peptide support for firmness feel",
      "Complements injectable contouring plans",
      "Elegant screw-cap bottle for travel",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Soft jaw / lower-face laxity feel",
        helps: "Home-care layer alongside clinic contouring.",
      },
      {
        concern: "Crepey texture",
        helps: "Consistent peptides improve how skin feels over weeks.",
      },
      {
        concern: "Post-weight-change skin quality",
        helps: "Supportive care during supervised programmes.",
      },
      {
        concern: "Makeup settling into lines",
        helps: "Better surface quality under foundation.",
      },
    ],
    ingredients: [
      { name: "Signal peptide complex", benefit: "Firmness support" },
      { name: "Matrixyl-style peptides", benefit: "Texture narrative" },
      { name: "Hyaluronic acid", benefit: "Hydration" },
      { name: "Bakuchiol", benefit: "Gentle renewal feel" },
    ],
    specs: [
      { label: "Skin type", value: "Normal, dry, mature" },
      { label: "Format", value: "Serum bottle · 30 ml" },
      { label: "Main actives", value: "Peptide complex" },
      { label: "pH", value: "5.0 – 5.5" },
    ],
    howToUse:
      "PM (or AM under SPF): After cleansing, apply 3–4 drops or a thin layer. Follow with Overnight Repair. Avoid eye contour unless directed.",
    treatmentSlugs: ["jaw-chin-contouring", "weight-loss-programme"],
  }),
  makeProduct(7, {
    name: "Demo Clinical Barrier Cream",
    price: 62,
    categoryTag: "Restore",
    step: "Prevent & Restore",
    short: "Rich jar cream for barrier repair — acne programmes, dryness after actives, and Midtown winter air.",
    description:
      "<p><strong>Demo Clinical Barrier Cream</strong> is the jar patients reach for when retinoids, peels, or clinic actives leave skin tight. Seal the routine; protect the investment.</p>",
    benefits: [
      "Rich occlusive comfort without heavy fragrance",
      "Ideal after acne and sweating treatment plans",
      "Jar format for controlled scoop hygiene",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Compromised barrier",
        helps: "Ceramides and lipids restore comfortable feel.",
      },
      {
        concern: "Retinoid dryness",
        helps: "Buffer nights when actives feel too strong.",
      },
      {
        concern: "Flaking after peels",
        helps: "Softens visible flake once cleared to moisturise.",
      },
      {
        concern: "Tight cheeks with oily T-zone",
        helps: "Use strategically on dry zones only if preferred.",
      },
    ],
    ingredients: [
      { name: "Ceramide NP", benefit: "Barrier lipids" },
      { name: "Cholesterol", benefit: "Lipid balance" },
      { name: "Shea butter", benefit: "Emollient comfort" },
      { name: "Centella", benefit: "Soothing botanical" },
    ],
    specs: [
      { label: "Skin type", value: "Dry, dehydrated, post-active" },
      { label: "Format", value: "Jar cream · 50 ml" },
      { label: "Main actives", value: "Ceramides · lipids" },
      { label: "pH", value: "5.0 – 5.5" },
    ],
    howToUse:
      "AM/PM: Scoop a pea-sized amount with a clean spatula or washed hands. Warm between fingers; press over face. Daytime: SPF after. Can buffer retinoids.",
    treatmentSlugs: ["acne-treatment", "excessive-sweating"],
  }),
  makeProduct(8, {
    name: "Demo Clinical Pigment Corrector",
    price: 88,
    categoryTag: "Target",
    step: "Target",
    short: "Pump intensive for stubborn pigment marks — melasma maintenance and post-inflammatory spots.",
    description:
      "<p><strong>Demo Clinical Pigment Corrector</strong> is the targeted step in every AestheticBiz pigment plan: tyrosinase-inhibiting home care between peels, never skipping SPF.</p>",
    benefits: [
      "Targets the look of dark spots over weeks",
      "Built for melasma maintenance programmes",
      "Pump dosing for consistent application",
      "Earn AestheticBiz Points on every purchase",
    ],
    concerns: [
      {
        concern: "Melasma patches",
        helps: "Supports clinic pigment protocols with daily discipline.",
      },
      {
        concern: "Sun spots",
        helps: "Brightens the appearance of mottled tone.",
      },
      {
        concern: "Post-inflammatory marks",
        helps: "Pairs with acne clearance once spots are quiet.",
      },
      {
        concern: "Uneven jawline tone",
        helps: "Spot or full-face as directed by your clinician.",
      },
    ],
    ingredients: [
      { name: "Niacinamide", benefit: "Tone and barrier" },
      { name: "Tranexamic acid", benefit: "Pigment appearance" },
      { name: "Alpha-arbutin", benefit: "Spot clarity" },
      { name: "Licorice root", benefit: "Soothing brightener" },
    ],
    specs: [
      { label: "Skin type", value: "Normal, combination (patch-test)" },
      { label: "Format", value: "Pump serum · 30 ml" },
      { label: "Main actives", value: "TXA · arbutin · niacinamide" },
      { label: "pH", value: "4.5 – 5.5" },
    ],
    howToUse:
      "PM (or AM under SPF if tolerated): 1 pump to marks or full face after cleansing. Moisturise. Strict SPF 50 every morning — non-negotiable with pigment care.",
    treatmentSlugs: ["pigmentation-treatment", "acne-treatment"],
  }),
].map((p, _, all) => {
  const related = all
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => {
      const aShared = a.treatmentSlugs.some((t) => p.treatmentSlugs.includes(t)) ? 0 : 1;
      const bShared = b.treatmentSlugs.some((t) => p.treatmentSlugs.includes(t)) ? 0 : 1;
      return aShared - bShared;
    })
    .slice(0, 4)
    .map((x) => x.slug);
  return { ...p, relatedSlugs: related };
});

export function getTreatment(slug: string) {
  return TREATMENTS.find((t) => t.slug === slug);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}

export function productsByStep(brandSlug: string) {
  const steps: string[] = [];
  const map = new Map<string, Product[]>();
  for (const p of PRODUCTS.filter((x) => x.brandSlug === brandSlug)) {
    if (!map.has(p.step)) {
      map.set(p.step, []);
      steps.push(p.step);
    }
    map.get(p.step)!.push(p);
  }
  return steps.map((step) => ({ step, products: map.get(step)! }));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function productPrimaryImage(p: Product): string | null {
  return p.images.find((i) => i.url)?.url ?? null;
}

/** Old demo slugs → new treatment URLs */
export const TREATMENT_SLUG_REDIRECTS: Record<string, string> = {
  "demo-skin-treatment-01": "acne-treatment",
  "demo-skin-treatment-02": "pigmentation-treatment",
  "demo-skin-treatment-03": "jaw-chin-contouring",
  "demo-skin-treatment-04": "acne-treatment",
  "demo-lip-treatment-01": "lip-filler",
  "demo-lip-treatment-02": "lip-filler",
  "demo-laser-treatment": "excessive-sweating",
  "demo-treatment-package": "weight-loss-programme",
};
