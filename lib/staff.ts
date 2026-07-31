/** Demo clinical team + centre story for AestheticBiz Midtown */

export const CENTRE = {
  name: "AestheticBiz",
  legalName: "AestheticBiz Midtown Aesthetic Centre",
  founded: "2019",
  neighbourhood: "Midtown Manhattan",
  addressLine: "485 Madison Avenue, Suite 709",
  cityLine: "New York, NY 10022",
  tagline: "Doctor-led aesthetics with nurse-supported care",
  summary:
    "AestheticBiz is a boutique medical spa on Madison Avenue — injectables, medical skin, wellness drips, and pharmaceutical-grade retail under one roof. Consultations are doctor-led; treatment days are supported by our lead aesthetic nurse so patients feel guided from first visit through aftercare.",
  pillars: [
    {
      title: "Doctor-led plans",
      body: "Every pathway starts with a medical assessment — not a menu upsell.",
    },
    {
      title: "Nurse-supported visits",
      body: "Prep, aftercare, and retail coaching from a dedicated aesthetic nurse.",
    },
    {
      title: "Results that travel home",
      body: "In-clinic work plus a product routine Dr. Hale personally endorses.",
    },
  ],
  facts: [
    { label: "Opened", value: "2019" },
    { label: "Focus", value: "Face · Skin · Wellness" },
    { label: "Brands", value: "Demo Clinical retail" },
    { label: "Loyalty", value: "AestheticBiz Points" },
  ],
} as const;

export const DOCTOR = {
  slug: "dr-jonathan-hale",
  name: "Dr. Jonathan Hale",
  shortName: "Dr. Hale",
  firstName: "Jonathan",
  role: "Medical Director · Aesthetic Medicine",
  credentials: [
    "MD · Aesthetic Medicine",
    "Board-certified physician",
    "Injectables & medical skin",
    "15+ years clinical practice",
  ],
  image: "/images/staff/dr-jonathan-hale.jpg",
  imageAlt: "Dr. Jonathan Hale, Medical Director at AestheticBiz",
  imageSecondary: "/images/staff/dr-jonathan-hale-2.jpg",
  quote:
    "My goal is simple — natural results you still recognise as yourself. Every treatment and every product on this shelf is something I would recommend to a patient in my chair.",
  bio: "Dr. Jonathan Hale leads AestheticBiz’s clinical protocols across injectables, medical acne and pigment programmes, hyperhidrosis, and wellness pathways. He personally reviews retail recommendations so home care protects in-clinic results.",
  recommendsLabel: "Dr. Hale recommends",
} as const;

export const NURSE = {
  slug: "elise-hart",
  name: "Elise Hart, RN",
  shortName: "Elise",
  firstName: "Elise",
  role: "Lead Aesthetic Nurse",
  credentials: [
    "Registered Nurse",
    "Injectable assist & aftercare",
    "Patient education lead",
    "Retail routine coaching",
  ],
  image: "/images/staff/elise-hart.jpg",
  imageAlt: "Elise Hart, RN — Lead Aesthetic Nurse at AestheticBiz",
  imageSecondary: "/images/staff/elise-hart-2.jpg",
  quote:
    "Patients remember how they felt leaving the suite. My job is calm prep, clear aftercare, and a routine they can actually stick to at home.",
  bio: "Elise Hart supports Dr. Hale on treatment days — patient prep, comfort, post-procedure guidance, and walking Midtown patients through the Demo Clinical products that match their plan.",
} as const;

export const TEAM = [DOCTOR, NURSE] as const;

/** Short clinical notes shown in “Dr. Hale recommends” on product pages */
export const PRODUCT_DOCTOR_NOTES: Record<string, string> = {
  "demo-product-01":
    "I reach for this radiance serum when tone looks tired after pigment or acne work — light enough for Midtown mornings, strong enough to matter over eight weeks.",
  "demo-product-02":
    "Clarify Gel is the cleanse I want before peels and acne facials. It clears residue without the stripped, reactive feeling that derails a programme.",
  "demo-product-03":
    "Hydra Essence is my post-injectable comfort step. When lips or jawline feel tight, this dropper gets skin drinkable again before richer cream.",
  "demo-product-04":
    "Overnight Repair is the PM lotion I pair with contouring and peel recovery — peptides and ceramides while you sleep, not another harsh active.",
  "demo-product-05":
    "Daily Defence under SPF is non-negotiable after pigment protocols. Antioxidants by day are how we protect the investment we make in clinic.",
  "demo-product-06":
    "Firm Peptide supports the firmness story we build with jawline work and body programmes — home care that matches the injectable plan.",
  "demo-product-07":
    "Barrier Cream is the jar I send home when retinoids or peels leave skin irritable. Seal the routine; keep the barrier quiet.",
  "demo-product-08":
    "Pigment Corrector is the targeted step in every melasma and PIH plan I write — consistent dosing, strict SPF, no shortcuts.",
};

export function doctorNoteForProduct(slug: string): string {
  return (
    PRODUCT_DOCTOR_NOTES[slug] ??
    `${DOCTOR.shortName} includes this SKU in clinic retail protocols when it matches the patient’s treatment plan and skin tolerance.`
  );
}
