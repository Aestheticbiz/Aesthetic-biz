import type { ReviewAnswer, ReviewScope } from "./types";

export type SeedReview = {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  headline?: string;
  text?: string;
  answers?: ReviewAnswer[];
  videoUrl?: string;
  isVideo?: boolean;
  scope: ReviewScope;
  treatmentSlug?: string | null;
  productSlug?: string | null;
  productLabel?: string;
  avatarUrl?: string;
};

export type SeedFile = {
  general: SeedReview[];
  treatments: Record<string, SeedReview[]>;
  products: Record<string, SeedReview[]>;
  videos: SeedReview[];
};

/** Bundled seed — ships with the Next build (Vercel-safe). */
export const REVIEW_SEED: SeedFile = {
  general: [
    {
      id: "seed-gen-01",
      name: "Priya M.",
      location: "Upper East Side",
      date: "12.06.2026",
      rating: 5,
      headline: "Calm, clinical, never pushy",
      text: "Dr. Hale explained options without rushing me into injectables. Elise walked me through aftercare and the home routine. Midtown energy, but the suite feels private.",
      scope: "general",
      productLabel: "Clinic experience",
    },
    {
      id: "seed-gen-02",
      name: "Rachel K.",
      location: "Midtown East",
      date: "03.05.2026",
      rating: 5,
      headline: "Booking and follow-up finally match the brand",
      text: "I booked online, got clear reminders, and left with products that matched my plan. Feels like a real practice system — not a plugin bolted onto a pretty site.",
      scope: "general",
      productLabel: "Clinic experience",
    },
    {
      id: "seed-gen-03",
      name: "Elena W.",
      location: "Murray Hill",
      date: "27.06.2026",
      rating: 5,
      headline: "The website felt as considered as the suite",
      text: "From the treatment pages to gift cards and points, everything felt like one practice — not a brochure with a Square button taped on. That alone made me trust the consult.",
      scope: "general",
      productLabel: "Clinic experience",
    },
  ],
  treatments: {
    "lip-filler": [
      {
        id: "seed-lip-01",
        name: "Samantha L.",
        location: "Chelsea",
        date: "18.06.2026",
        rating: 5,
        headline: "Soft, natural — exactly what I asked for",
        text: "I wanted hydration more than size. Swelling settled by day three and the shape still looks like me. Dr. Hale’s proportion talk beforehand made all the difference.",
        answers: [
          {
            question: "What brought you to AestheticBiz?",
            answer: "I wanted subtle lip filler after seeing overdone results elsewhere.",
          },
          {
            question: "How was your experience with Dr. Hale and the team?",
            answer: "Consult was thorough. Elise kept me comfortable and sent clear aftercare the same day.",
          },
          {
            question: "How do you feel about your results so far?",
            answer: "Natural border definition — friends notice I look rested, not ‘done’.",
          },
          {
            question: "Would you recommend AestheticBiz? Why?",
            answer: "Yes — especially if you want conservative, anatomy-led injectables.",
          },
        ],
        scope: "treatment",
        treatmentSlug: "lip-filler",
        productLabel: "Lip Filler",
      },
      {
        id: "seed-lip-02",
        name: "Megan T.",
        location: "Verified patient",
        date: "02.04.2026",
        rating: 5,
        headline: "0.5 ml was the right call",
        text: "Started conservative. Will top up later if needed. No pressure to go bigger on day one.",
        scope: "treatment",
        treatmentSlug: "lip-filler",
        productLabel: "Lip Filler",
      },
      {
        id: "seed-lip-03",
        name: "Hannah J.",
        location: "West Village",
        date: "11.07.2026",
        rating: 5,
        headline: "Sample review — balanced and calm",
        text: "Demo sample: clear pricing on the site, easy booking, and a consult that matched what I read online. The platform story patients notice before they ever sit in the chair.",
        scope: "treatment",
        treatmentSlug: "lip-filler",
        productLabel: "Lip Filler · Sample",
      },
    ],
    "acne-treatment": [
      {
        id: "seed-acne-01",
        name: "Jordan A.",
        location: "Brooklyn",
        date: "22.05.2026",
        rating: 5,
        headline: "Finally a medical plan, not another shelf cycle",
        text: "Peels plus Clarify Gel and Barrier Cream at home. Weeks 3–4 I saw fewer new breakouts. Honest about the purge window.",
        scope: "treatment",
        treatmentSlug: "acne-treatment",
        productLabel: "Acne Treatment",
      },
      {
        id: "seed-acne-02",
        name: "Casey N.",
        location: "Astoria",
        date: "08.07.2026",
        rating: 5,
        headline: "Sample review — plan I could follow",
        text: "Demo sample: in-clinic visits plus products I could reorder from the shop. The retail path is why I did not fall back to random drugstore cycling.",
        scope: "treatment",
        treatmentSlug: "acne-treatment",
        productLabel: "Acne Treatment · Sample",
      },
      {
        id: "seed-acne-03",
        name: "Riley P.",
        location: "Verified patient",
        date: "19.06.2026",
        rating: 5,
        headline: "Sample review — skin survey then consult",
        text: "Demo sample: I took the Skin Survey first, then booked. Felt guided instead of guessing which facial to buy.",
        scope: "treatment",
        treatmentSlug: "acne-treatment",
        productLabel: "Acne Treatment · Sample",
      },
    ],
    "pigmentation-treatment": [
      {
        id: "seed-pig-01",
        name: "Aisha R.",
        location: "Harlem",
        date: "09.06.2026",
        rating: 5,
        headline: "Tone looks more even — SPF is non-negotiable",
        text: "Pigment peel series plus the corrector Dr. Hale recommended. Melasma isn’t ‘gone forever’ and they were honest about that — which I appreciated.",
        scope: "treatment",
        treatmentSlug: "pigmentation-treatment",
        productLabel: "Pigmentation Treatment",
      },
    ],
  },
  products: {
    "demo-product-01": [
      {
        id: "seed-prod-01a",
        name: "Maya L.",
        location: "SoHo",
        date: "15.06.2026",
        rating: 5,
        headline: "Radiance Serum between pigment visits",
        text: "Ordered after my consult from the shop — not a DM. Skin looks less dull by week three with Daily Defence under SPF.",
        scope: "product",
        productSlug: "demo-product-01",
        productLabel: "Demo Clinical Radiance Serum",
      },
      {
        id: "seed-prod-01b",
        name: "Sofia G.",
        location: "Verified patient",
        date: "02.07.2026",
        rating: 5,
        headline: "Sample review — retail that matches the plan",
        text: "Demo sample: the product page explained when to use it with my peel plan. That clarity is what turns a visit into a routine patients keep buying.",
        scope: "product",
        productSlug: "demo-product-01",
        productLabel: "Demo Clinical Radiance Serum · Sample",
      },
      {
        id: "seed-prod-01c",
        name: "Ivy C.",
        location: "Gramercy",
        date: "24.05.2026",
        rating: 5,
        headline: "Sample review — earned points on checkout",
        text: "Demo sample: points on the product made the second bottle an easy yes. Loyalty that shows up in the basket, not a punch card in a drawer.",
        scope: "product",
        productSlug: "demo-product-01",
        productLabel: "Demo Clinical Radiance Serum · Sample",
      },
    ],
    "demo-product-03": [
      {
        id: "seed-prod-03",
        name: "Olivia S.",
        location: "Verified patient",
        date: "20.05.2026",
        rating: 5,
        headline: "Hydra Essence after lip filler",
        text: "Skin felt tight the evening after — this dropper fixed the comfort issue without irritating the area.",
        scope: "product",
        productSlug: "demo-product-03",
        productLabel: "Demo Clinical Hydra Essence",
      },
    ],
    "demo-product-08": [
      {
        id: "seed-prod-08",
        name: "Nina V.",
        location: "Verified patient",
        date: "01.06.2026",
        rating: 5,
        headline: "Pigment Corrector is part of my nightly stack",
        text: "Paired with Daily Defence + SPF after my peel series. Marks look quieter at eight weeks.",
        scope: "product",
        productSlug: "demo-product-08",
        productLabel: "Demo Clinical Pigment Corrector",
      },
    ],
  },
  videos: [
    {
      id: "seed-vid-yt-01",
      name: "Demo Patient A",
      location: "Sample · Midtown",
      date: "10.06.2026",
      rating: 5,
      headline: "Demo video review — clinic experience",
      text: "Placeholder YouTube embed for the AestheticBiz demo. Not a real AestheticBiz patient.",
      videoUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
      isVideo: true,
      scope: "general",
      productLabel: "DEMO · Sample video review",
    },
    {
      id: "seed-vid-yt-02",
      name: "Demo Patient B",
      location: "Sample · Chelsea",
      date: "05.05.2026",
      rating: 5,
      headline: "Demo video review — treatment story",
      text: "Placeholder YouTube embed for the AestheticBiz demo. Not a real AestheticBiz patient.",
      videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      isVideo: true,
      scope: "treatment",
      treatmentSlug: "lip-filler",
      productLabel: "DEMO · Sample video review",
    },
    {
      id: "seed-vid-yt-03",
      name: "Demo Patient C",
      location: "Sample · Brooklyn",
      date: "22.04.2026",
      rating: 5,
      headline: "Demo video review — why the platform matters",
      text: "Placeholder YouTube embed for the AestheticBiz demo. Not a real AestheticBiz patient.",
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      isVideo: true,
      scope: "general",
      productLabel: "DEMO · Sample video review",
    },
  ],
};
