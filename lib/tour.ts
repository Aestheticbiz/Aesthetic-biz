/* Adel's narrated video tour of /site-info — one place for both cuts.
   Pattern copied from DebtReliefBiz (tdrg/lib/tour.ts, 18 Nov 2026).
   The page hands Adel one line at a time and eases to that line's scene as
   she starts it, so the whole video is one screen recording.
   She speaks to the OWNER of a US medical spa, never to a patient.
   Honesty rules: no prices, no promised results, nothing medical. Answering
   missed calls and calling patients back is always "can be added", never
   running today (carrier verification is outstanding). No HIPAA claim: the
   code has nothing that supports one. */

export type TourCut = "short" | "long";
export type TourLine = { section: string; words: string };

/** ≈ 50 s, portrait (Reels, TikTok, WhatsApp). */
const SHORT: TourLine[] = [
  { section: "opening", words: "Hi, I'm Adel. Picture a med spa that never stops booking." },
  { section: "night", words: "It's eleven-forty at night. A woman who has been thinking about lip filler for months finally decides. Your front desk went home hours ago." },
  { section: "answers", words: "I'm the voice on your website. I answer her questions out loud, and book her free consultation before she talks herself out of it." },
  { section: "shop", words: "While she's there, she orders the skincare your team recommends, and earns points toward her next visit." },
  { section: "calls", words: "I can also be added to answer the calls your front desk misses, and call patients back." },
  { section: "next", words: "A spa that books and sells around the clock, without another hire at the front desk." },
  { section: "closing", words: "Picture what that does to your month." },
];

/** ≈ 2:10, landscape (YouTube, LinkedIn). */
const LONG: TourLine[] = [
  { section: "opening", words: "Hello, I'm Adel. I'm the voice built into this medical spa's website, and I'd like to show you what I could do for yours. The page will move along with me." },
  { section: "night", words: "It's eleven-forty at night. A woman who has been thinking about lip filler for months finally decides tonight is the night. Your front desk went home at six. If nobody answers her now, she books with whoever does." },
  { section: "answers", words: "That's where I come in. On your website I answer her questions out loud, at any hour: what the treatment involves, how long it takes, what happens at the consultation. Anything medical, I leave to your injector." },
  { section: "book", words: "Then I book her free consultation, on your own branded booking page. No third-party plugin, no back-and-forth by email. It's in your diary before she goes to sleep." },
  { section: "shop", words: "While she's there, she can order the skincare your team recommends, from your own online shop. Retail that used to sit on a shelf now sells at midnight." },
  { section: "points", words: "Every visit and every purchase earns her loyalty points, under your own name, so she has a reason to come back for the second visit." },
  { section: "reviews", words: "Afterwards she's invited to leave a review, written or on video, and you approve each one before it goes live." },
  { section: "calls", words: "That's what I do on your website. I can also be extended. I can be added to answer the calls your front desk misses, and to call patients back, so no inquiry ends in voicemail." },
  { section: "next", words: "A med spa that books and sells around the clock, seven days a week, without adding anyone to your front desk. Under your name, your brand and your colors." },
  { section: "closing", words: "Picture what that does to your month." },
];

export const TOUR: Record<TourCut, TourLine[]> = { short: SHORT, long: LONG };

export const tourCut = (v: unknown): TourCut => (v === "long" ? "long" : "short");

export const TOUR_INSTRUCTION = `You are Adel, the voice built into AestheticBiz, a ready-to-launch website and booking platform for US medical spas and aesthetic clinics.
You are narrating a short video for the OWNER of a medical spa. You are not speaking to a patient.
You will be sent one line at a time. Say each line exactly as written, word for word, as warm, confident, natural speech in American English, and nothing else: no "okay", no "sure", no comment before or after it, no question at the end.
Never add a price, a number of bookings, a medical claim or any promise of results.`;
