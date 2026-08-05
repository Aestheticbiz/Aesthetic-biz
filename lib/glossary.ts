/**
 * The glossary is the platform's reference layer. It exists for two audiences:
 * clinic owners reading the site, and Adel, who reads these pages with her
 * read_site_page tool when a visitor asks how something works.
 *
 * HONESTY RULE: `status` must match the language Adel uses in her system prompt.
 * "Live in demo" means it is working on AestheticBiz right now. "In the platform
 * package" means it is built when CRM Solutions builds the clinic. "Next phase"
 * means roadmap — never describe it as available.
 */

export type GlossaryStatus = "Live in demo" | "In the platform package" | "Next phase";

export type GlossaryEntry = {
  slug: string;
  term: string;
  /** One sentence. Used verbatim in the hover popup — keep it under ~140 chars. */
  oneLine: string;
  status: GlossaryStatus;
  category: "Capture" | "Convert" | "Commerce" | "Retain";
  whatItIs: string;
  /** The commercial argument. This is the part owners actually care about. */
  whyItMatters: string[];
  howItWorks: { step: string; detail: string }[];
  questions: { q: string; a: string }[];
  /** Where to see it on the demo, if it is live. */
  demo?: { href: string; label: string };
  /**
   * Screenshot of the real thing, captured from the running site by
   * scripts/capture-glossary-images.mjs. Never hand-drawn or mocked up —
   * re-run the script when the UI changes. Dimensions are the file's own,
   * captured at 2x for sharpness.
   */
  image?: { src: string; alt: string; caption: string; width: number; height: number };
  related: string[];
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "funnel",
    term: "Funnel",
    oneLine:
      "The path a stranger takes from first finding your practice to becoming a patient who returns and refers.",
    status: "Live in demo",
    category: "Capture",
    whatItIs:
      "A funnel is simply the ordered set of steps somebody passes through between not knowing you exist and paying you money — and then the steps that bring them back. It is called a funnel because each stage loses people. The question is never whether you have one; every practice has a funnel. The question is whether anyone designed it, or whether it happened by accident.",
    whyItMatters: [
      "Most aesthetic practices lose the majority of interested people at one or two specific points, and cannot say which. The commonest is the gap between interest and booking: somebody decides at nine at night and has nowhere to complete it.",
      "Fixing a leak costs far less than generating more traffic. If a hundred people reach your site and four book, moving four to six is a fifty percent revenue increase with no extra marketing spend.",
      "A designed funnel is measurable. You can see where people stop, which means you can argue about evidence instead of opinion.",
    ],
    howItWorks: [
      {
        step: "Capture",
        detail:
          "Somebody arrives — from search, a referral, an ad, or a card in a bag — and lands on pages built to be found and to be trusted. The Skin Assessment gives the undecided a low-commitment first step.",
      },
      {
        step: "Convert",
        detail:
          "Interest becomes a booked appointment without leaving your brand. Enquiries land in one place with the patient's name, need and intent attached, rather than in a voicemail nobody checks.",
      },
      {
        step: "Commerce",
        detail:
          "The relationship earns beyond chair time — retail after the visit, gift vouchers bought by people who have never visited, deposits taken up front.",
      },
      {
        step: "Retain",
        detail:
          "Reviews are collected rather than hoped for, loyalty gives a reason to come back, and past patients can be reactivated rather than replaced.",
      },
    ],
    questions: [
      {
        q: "What do I have to do to run this after handover?",
        a: "Far less than you would expect, because the point of the design is that the front door works without a person operating it. You own the asset outright and are shown exactly how it runs. Where a human is genuinely needed — following up a hot enquiry, for instance — the system tells your team who to call and why.",
      },
      {
        q: "Where do most clinics leak?",
        a: "After-hours booking is the largest single gap, followed by retail that has no online path and reviews that are never asked for. The profit calculator lets you put your own numbers against the first of those.",
      },
    ],
    demo: { href: "/", label: "Walk the demo practice" },
    related: ["online-booking", "lead-generation", "crm", "profit-calculator"],
  },

  {
    slug: "online-booking",
    term: "Online Booking",
    oneLine:
      "Patients book an appointment on your own site, at any hour, without being handed off to a third-party screen.",
    status: "Live in demo",
    category: "Convert",
    whatItIs:
      "A booking flow that lives inside your website rather than sending the patient to an external scheduling tool. The patient chooses a treatment, sees availability, and confirms — all on pages carrying your name, your photography and your prices.",
    whyItMatters: [
      "Every handoff to a third-party booking screen loses people. The patient who was ready thirty seconds ago now faces an unfamiliar brand, a sign-up form, and a moment of doubt about whether they are still dealing with you.",
      "Roughly half of aesthetic enquiries happen outside working hours. A phone number is not an answer to somebody deciding at eleven at night — by morning they have booked with whoever made it easy.",
      "Booking on your own domain means the enquiry data is yours. You can see which treatments people try to book, when, and where they abandon.",
    ],
    howItWorks: [
      {
        step: "Choose",
        detail:
          "The patient picks a treatment from your actual menu, with your pricing and your description — not a generic service list.",
      },
      {
        step: "Confirm",
        detail:
          "Name, contact and preferred time are captured in one short step. Deposits can be taken here when that is part of your build.",
      },
      {
        step: "Land",
        detail:
          "The booking arrives with the patient's stated need attached, so whoever prepares for that appointment already knows what it is about.",
      },
    ],
    questions: [
      {
        q: "We already use a scheduling tool. Does this replace it?",
        a: "It can, or it can sit in front of it. The important change is that the patient never sees the handoff — the moment of doubt happens at the seam between your brand and somebody else's.",
      },
      {
        q: "What about double bookings?",
        a: "Availability is driven by one source of truth. The failure mode worth avoiding is two systems that each think they own the diary, which is exactly what a bolted-on plugin produces.",
      },
    ],
    demo: { href: "/book", label: "Try the booking flow" },
    image: {
      src: "/images/glossary/online-booking.png",
      alt: "The booking wizard, showing treatment selection on the practice's own branded page",
      caption: "Booking finishes on your own site. The patient never meets another company's logo.",
      width: 1872,
      height: 1484,
    },
    related: ["funnel", "crm", "missed-call-text-back"],
  },

  {
    slug: "lead-generation",
    term: "Lead Generation",
    oneLine:
      "Turning anonymous visitors into named people you can follow up — the Skin Assessment is the main tool for it here.",
    status: "Live in demo",
    category: "Capture",
    whatItIs:
      "Lead generation is the practice of giving a visitor a reason to identify themselves before they are ready to book. Most people who visit an aesthetic website are not ready to commit to a treatment and a price on their first visit — but they will answer questions about their own skin, because the answers are about them.",
    whyItMatters: [
      "The gap between 'interested' and 'ready to book' can be weeks. Without a capture step, everyone in that gap is lost, because you never learned who they were.",
      "A completed assessment tells you what somebody is concerned about in their own words. That is a far better starting point for a consultation than a cold enquiry saying 'how much is Botox'.",
      "It shifts the first conversation from price to problem. Somebody who has just described their pigmentation concerns is no longer shopping for the cheapest option — they are looking for the right answer.",
    ],
    howItWorks: [
      {
        step: "Offer",
        detail:
          "The Skin Assessment is presented as something useful to the visitor rather than as a form — a short set of questions about their skin, not about their budget.",
      },
      {
        step: "Answer",
        detail:
          "Questions step through one at a time with a visible progress indicator, which is what keeps completion rates up compared with a long single-page form.",
      },
      {
        step: "Capture",
        detail:
          "Their answers and contact details arrive together, so the follow-up references what they actually said.",
      },
      {
        step: "Follow up",
        detail:
          "Routing the result to the right person, and the automated email or SMS that follows, is part of the platform package rather than the demo.",
      },
    ],
    questions: [
      {
        q: "Is this just a quiz?",
        a: "The difference between a quiz and lead generation is what happens next. A quiz entertains; this captures a named person with a stated concern and hands them to somebody who can help. If nothing happens after submission, it is a quiz.",
      },
      {
        q: "Why would a patient bother completing it?",
        a: "Because it is about them and it is free. People will answer a great many questions about their own face. They will not fill in a form headed 'request a quote'.",
      },
    ],
    demo: { href: "/skin-survey", label: "Take the Skin Assessment" },
    image: {
      src: "/images/glossary/lead-generation.png",
      alt: "The Skin Assessment asking one question at a time with a progress bar",
      caption:
        "One question at a time with visible progress — which is what keeps people finishing it.",
      width: 1872,
      height: 1000,
    },
    related: ["funnel", "crm", "marketing-automation"],
  },

  {
    slug: "crm",
    term: "CRM",
    oneLine:
      "One place where every enquiry, patient and follow-up lives, so nothing depends on somebody remembering.",
    status: "In the platform package",
    category: "Convert",
    whatItIs:
      "Customer Relationship Management — in practice, a single record for each person who has ever contacted your practice, holding what they asked about, what they booked, what they bought, and what should happen next. It replaces the arrangement most practices actually run on: a spreadsheet, a shared inbox, a WhatsApp thread and somebody's memory. The structure below follows the established open-source CRM model — the same object types a mature system uses — rather than an invented one, so nothing about your data is proprietary to us and you are never locked in.",
    whyItMatters: [
      "Enquiries do not get lost because people are careless. They get lost because they arrive in four places at once and no single place shows what is outstanding.",
      "The revenue in an aesthetic practice is overwhelmingly repeat revenue. A patient who had filler nine months ago is due — but only a system that knows the date will tell you, and only if the date was recorded somewhere other than a diary.",
      "When a key staff member leaves, the relationships stay with the practice rather than walking out with them.",
      "It makes follow-up survivable. Chasing forty warm enquiries is impossible by memory and routine by system.",
    ],
    howItWorks: [
      {
        step: "Leads",
        detail:
          "Anyone who has raised a hand but is not yet a patient — a Skin Assessment submission, a contact form, an unanswered call. A lead is either qualified and converted, or closed with a reason. Nothing sits in limbo.",
      },
      {
        step: "Contacts and Organisations",
        detail:
          "The patient themselves, and where relevant the organisation behind them — a corporate account buying vouchers, or a referring practice. A converted lead becomes a contact and keeps its history.",
      },
      {
        step: "Opportunities",
        detail:
          "A treatment plan under consideration, with an expected value and a stage. This is what turns 'she's thinking about it' into a number you can forecast and a date somebody has to act on.",
      },
      {
        step: "Products, Services and Price Books",
        detail:
          "Your treatment menu and retail stock as structured records, with price books for member, package and standard pricing — so a quote is assembled from real prices rather than typed from memory.",
      },
      {
        step: "Quotes and Invoices",
        detail:
          "The priced proposal a patient takes away, and the bill that follows it. Both attached to the contact, so what was offered and what was paid are never separate stories.",
      },
      {
        step: "Activities and Documents",
        detail:
          "Appointments, call-backs and tasks on a shared calendar; consent forms, before-and-after images and treatment records filed against the person they belong to.",
      },
      {
        step: "Cases",
        detail:
          "Anything raised after treatment — a concern, a question, a complaint. Tracked to resolution rather than resolved in a WhatsApp thread nobody else can see.",
      },
      {
        step: "Workflows",
        detail:
          "The rules that fire without anyone remembering: assessment submitted, notify and acknowledge; treatment due, remind; enquiry untouched for two days, escalate.",
      },
    ],
    questions: [
      {
        q: "I use a spreadsheet and WhatsApp. What actually changes?",
        a: "Two things. Nothing falls through when somebody is on leave or the practice is busy, and you can see the shape of your business rather than only the last thing that happened. A spreadsheet records the past; a pipeline tells you what to do this morning.",
      },
      {
        q: "What happens to an enquiry that arrives at 11pm?",
        a: "It becomes a record immediately with the person's name and stated need. The automated acknowledgement that goes back to them, and the task that lands with your team for the morning, are part of the package build.",
      },
      {
        q: "Is the CRM included?",
        a: "Yes — the enquiry pipeline is part of the platform package rather than an extra subscription. What is on the demo site is the front end; the operations console is built with your clinic.",
      },
      {
        q: "Am I locked into your system?",
        a: "No, and the structure above is the reason. It follows the standard CRM object model — leads, contacts, opportunities, products, quotes, cases — rather than something invented for you. Your data exports in a shape any mature CRM will accept, so leaving is a migration rather than a rebuild.",
      },
      {
        q: "Do I need every one of those modules?",
        a: "Almost certainly not on day one. Most practices start with leads, contacts and activities, and grow into opportunities and price books once the volume justifies it. The point of the model is that the room is already there when you need it.",
      },
    ],
    related: ["funnel", "marketing-automation", "lead-generation", "online-booking"],
  },

  {
    slug: "online-retail",
    term: "Online Retail",
    oneLine:
      "Selling the skincare you already stock through your own site, so product moves when the clinic is closed.",
    status: "Live in demo",
    category: "Commerce",
    whatItIs:
      "A shop built into the practice website, carrying the same clinical-grade products you sell at the front desk. Patients browse by brand or concern, see what you actually recommend, and buy without a phone call.",
    whyItMatters: [
      "Retail stock is money already spent. Product sitting in a cupboard is working capital doing nothing, and every month it sits is margin lost.",
      "The natural moment to reorder homecare is not during clinic hours. It is when somebody notices the bottle is nearly empty — usually in the evening, usually with a phone in hand.",
      "Retail margin is earned without chair time. It is the only revenue in the practice that does not consume a room, a practitioner and an hour.",
      "Recommending a product you cannot easily sell trains patients to buy it somewhere else — often a grey-market seller who undercuts you on the brand you introduced them to.",
    ],
    howItWorks: [
      {
        step: "Browse",
        detail:
          "Products are presented by brand and by concern, with the clinical framing that justifies the price — not as an anonymous grid.",
      },
      {
        step: "Add to cart",
        detail:
          "A cart drawer keeps the patient on the page they were reading rather than pulling them into a separate checkout journey too early.",
      },
      {
        step: "Check out",
        detail:
          "Payment handling and fulfilment are configured for your practice as part of the build.",
      },
    ],
    questions: [
      {
        q: "Can a patient buy without ever booking?",
        a: "Yes, and that is often the first transaction in the relationship. Somebody who buys a cleanser is far easier to convert to a treatment later than a stranger.",
      },
      {
        q: "How does the front desk know something sold?",
        a: "Orders arrive in the operations console alongside bookings, so retail and treatment revenue are visible in one place rather than in two systems that never reconcile.",
      },
    ],
    demo: { href: "/shop", label: "Browse the demo shop" },
    image: {
      src: "/images/glossary/online-retail.png",
      alt: "The shop showing clinical skincare products with pricing",
      caption:
        "The same clinical-grade stock you sell at the front desk, available at eleven at night.",
      width: 2632,
      height: 1756,
    },
    related: ["upsell-funnel", "gift-vouchers", "loyalty-points", "profit-calculator"],
  },

  {
    slug: "upsell-funnel",
    term: "Upsell Funnel",
    oneLine:
      "A one or two step offer shown the moment a patient adds to cart — the single fastest way to raise average order value.",
    status: "In the platform package",
    category: "Commerce",
    whatItIs:
      "After a patient adds a product to their basket — and before they reach checkout — they are shown a small number of clinically sensible companions at a bundle discount. They can add one, change the quantity, or skip the step entirely. Each product carries its own funnel, configured per product, so the offer is a routine that makes sense rather than a random cross-sell.",
    whyItMatters: [
      "The moment is what makes it work. The patient has already decided to buy — intent is proven, the card is out, and the hesitation that stops a cold shopper is gone.",
      "A single accepted offer can multiply the order. Adding one serum to a cleanser purchase can take the basket to three times its original value, on a customer you had already won and paid nothing more to reach.",
      "It sells the routine rather than the product, which is what a clinic should be doing anyway. Cleanser then retinol is a clinical progression, not a bolt-on.",
      "The margin is close to pure. There is no additional acquisition cost, no extra chair time, and no staff conversation — the uplift lands straight on the bottom line.",
      "It is the retail equivalent of the front desk saying 'and are you using anything at night?' — except it happens every single time, without anyone remembering.",
    ],
    howItWorks: [
      {
        step: "Configure per product",
        detail:
          "Each product gets its own funnel of one or two steps, with the companion products chosen deliberately. A suggestion tool can pre-fill a sensible routine, which you then adjust.",
      },
      {
        step: "Set the incentive",
        detail:
          "A bundle discount gives a reason to say yes now rather than later. The original price stays visible beside it, so the saving is legible.",
      },
      {
        step: "Preview before it goes live",
        detail:
          "The offer is previewed exactly as the patient will see it, on desktop and on mobile, before it is switched on. Off means hidden from shoppers.",
      },
      {
        step: "Offer, then get out of the way",
        detail:
          "The patient adds, adjusts quantity, or skips. There is a plain 'no thanks' on every step — pressure would cost you the original order, which is the one thing worth protecting.",
      },
    ],
    questions: [
      {
        q: "Will this annoy patients?",
        a: "Only if it is done badly. One or two steps, clinically relevant products, a visible discount and an obvious way to skip — that reads as a recommendation. Five steps of unrelated stock reads as a supermarket till, and costs you the trust you are actually selling.",
      },
      {
        q: "Is this live anywhere?",
        a: "Yes. It runs on Star Aesthetic Centre today, which is a doctor-led practice with real patients and real stock. It is part of the platform package rather than something on this demo site.",
      },
      {
        q: "Who decides what gets offered?",
        a: "You do, product by product. That matters in aesthetics more than in ordinary retail — recommending the wrong actives together is a clinical problem, not just a commercial one.",
      },
    ],
    related: ["online-retail", "loyalty-points", "profit-calculator", "crm"],
  },

  {
    slug: "gift-vouchers",
    term: "Gift Vouchers",
    oneLine:
      "Prepaid value someone buys for another person — revenue that arrives before any treatment is delivered.",
    status: "Live in demo",
    category: "Commerce",
    whatItIs:
      "A voucher bought online, in a set denomination, and redeemed against treatments or retail. On the demo these run at US$100, US$250, US$500 and US$1,000. The buyer is very often somebody who has never set foot in your practice.",
    whyItMatters: [
      "It is prepaid revenue. Cash arrives now for a service delivered later, which is the most favourable working-capital position any practice can be in.",
      "It brings in new patients at zero acquisition cost. A voucher recipient is a new person who arrives already paid for and already predisposed to like you, because somebody they trust chose you.",
      "It captures demand you are otherwise blind to — the partner, the parent, the friend who wants to give a treatment but has no way to buy one at ten at night in December.",
      "Redemption is rarely exact. People spend more than the voucher value far more often than they spend less.",
    ],
    howItWorks: [
      {
        step: "Choose a value",
        detail: "Fixed denominations remove the hesitation that an open amount field creates.",
      },
      {
        step: "Personalise",
        detail:
          "The buyer adds who it is for and a message, which is what makes it a gift rather than a transaction.",
      },
      {
        step: "Deliver and redeem",
        detail:
          "Delivery to the recipient and redemption against a booking or a retail purchase are configured for your practice in the build.",
      },
    ],
    questions: [
      {
        q: "Do vouchers expire, and who tracks the liability?",
        a: "Expiry and terms are set for your practice during the build, and the outstanding balance is visible in the operations console. Unredeemed value is a liability on your books, so it is worth having it on a screen rather than in a drawer.",
      },
      {
        q: "When do vouchers actually sell?",
        a: "Overwhelmingly in the festive season, and around birthdays and Mother's Day. That seasonality is the argument for having the campaign side in place before November rather than during it.",
      },
    ],
    demo: { href: "/gift-cards", label: "Buy a demo voucher" },
    image: {
      src: "/images/glossary/gift-vouchers.png",
      alt: "Gift voucher purchase form with US$100, 250, 500 and 1,000 options beside a live preview of the voucher",
      caption:
        "Fixed denominations and a live preview — the buyer sees the gift before they pay for it.",
      width: 2472,
      height: 1560,
    },
    related: ["online-retail", "marketing-automation", "loyalty-points"],
  },

  {
    slug: "loyalty-points",
    term: "Loyalty Points",
    oneLine:
      "A visible reward for coming back, so repeat visits stop depending on the patient remembering you.",
    status: "Live in demo",
    category: "Retain",
    whatItIs:
      "A points programme where treatments and product purchases earn a balance the patient can see and spend. On the demo it runs at roughly five percent back, earned automatically at checkout.",
    whyItMatters: [
      "A new patient costs money to find. A returning patient costs nothing, so the second visit is dramatically more profitable than the first.",
      "It gives a reason to choose you over a cheaper option nearby that is not holding any of their accumulated value.",
      "It raises basket size without a staff script. A patient with points near a threshold will add the serum.",
      "It creates a reason to make contact that is not a sales message — a balance reminder is welcome in a way that a promotion is not.",
    ],
    howItWorks: [
      {
        step: "Earn",
        detail: "Points accrue automatically on treatments and retail at checkout — nothing to stamp or remember.",
      },
      {
        step: "See",
        detail:
          "The balance is visible to the patient, which is the entire mechanism. Points nobody can see change no behaviour.",
      },
      {
        step: "Spend",
        detail: "Balances come off treatments or products, bringing the patient back into the practice to use them.",
      },
    ],
    questions: [
      {
        q: "Is this not just a discount?",
        a: "A discount is given away at the moment of sale and never returns. Points are earned now and only cost you anything when the patient comes back — which is the behaviour you were trying to buy.",
      },
    ],
    demo: { href: "/rewards", label: "See the rewards programme" },
    image: {
      src: "/images/glossary/loyalty-points.png",
      alt: "Points table showing example treatments and the points each one earns",
      caption: "Points are earned automatically at checkout — nothing to stamp, nothing to remember.",
      width: 2472,
      height: 682,
    },
    related: ["online-retail", "crm", "marketing-automation"],
  },

  {
    slug: "video-reviews",
    term: "Video Reviews",
    oneLine:
      "Patients record a spoken review on camera instead of typing one — proof that is far harder to doubt than text.",
    status: "Live in demo",
    category: "Retain",
    whatItIs:
      "A review submission form with two routes: write a review, or record one on video. The video option records in the browser using the patient's camera and microphone, or accepts a file they have already recorded. Prompts are offered so the patient is not staring at a blank screen wondering what to say.",
    whyItMatters: [
      "Written reviews are now widely assumed to be purchasable. A real face saying a real sentence is credibility that cannot be bought in bulk.",
      "In aesthetics the buying decision is emotional and anxious. A prospective patient wants to see somebody who was nervous, went ahead, and is glad they did — text cannot carry that.",
      "Video review content is reusable across the site and social channels, so one patient's ninety seconds keeps working for months.",
      "Asking at the right moment matters more than the format. The automated request that goes out after a visit is part of the platform package.",
    ],
    howItWorks: [
      {
        step: "Choose a format",
        detail: "The patient picks writing or video. Most will write; the ones who record are worth disproportionately more.",
      },
      {
        step: "Record or upload",
        detail:
          "Recording happens in the browser with camera and microphone. A patient who would rather film it themselves can upload the file instead.",
      },
      {
        step: "Review before publishing",
        detail:
          "Submissions are moderated rather than going live automatically, so the practice keeps control of what appears.",
      },
    ],
    questions: [
      {
        q: "What stops a competitor leaving a fake review?",
        a: "Moderation before publication. Nothing appears on the board because somebody submitted it — the practice approves it first.",
      },
      {
        q: "Will patients actually do this?",
        a: "A minority will, and that is enough. Three good video reviews outperform thirty written ones, because the objection they answer is 'can I believe this'.",
      },
    ],
    demo: { href: "/submit-review", label: "Try submitting a review" },
    image: {
      src: "/images/glossary/video-reviews.png",
      alt: "Review submission form with tabs for writing a review or recording one on video",
      caption: "Write it or record it. The ones who record are worth disproportionately more.",
      width: 1512,
      height: 2864,
    },
    related: ["marketing-automation", "crm", "funnel"],
  },

  {
    slug: "marketing-automation",
    term: "Marketing Automation",
    oneLine:
      "Follow-up that happens on its own — the reminder, the reactivation, the seasonal campaign nobody has time to send.",
    status: "In the platform package",
    category: "Retain",
    whatItIs:
      "Email and SMS sequences that fire from something happening rather than from somebody remembering. A Skin Assessment is submitted and an acknowledgement goes out. A treatment is due for repeat and a reminder arrives. December approaches and a gift voucher campaign goes to everyone who bought one last year.",
    whyItMatters: [
      "The follow-up that makes the most money is the one nobody has time to do. Reactivating a lapsed patient is cheaper than finding a new one and it almost never happens manually.",
      "Aesthetic revenue is seasonal, and the seasons are predictable. Black Friday and the festive period are the two largest voucher and package windows in the year — and both need to be set up weeks before they arrive, not during.",
      "Timing beats copy. A repeat reminder that lands when the treatment is genuinely wearing off converts far better than a clever message sent at random.",
      "It removes the awkwardness. Nobody at the front desk enjoys phoning a patient to ask for a review or to sell a package.",
    ],
    howItWorks: [
      {
        step: "A trigger",
        detail:
          "Something happens — an assessment is completed, a treatment date passes, a voucher goes unredeemed, a date approaches.",
      },
      {
        step: "A sequence",
        detail: "One or several messages go out over days or weeks, by email or SMS, and stop when the patient responds.",
      },
      {
        step: "A handover",
        detail:
          "When somebody engages, they surface in the pipeline as a person for your team to actually speak to.",
      },
    ],
    questions: [
      {
        q: "Black Friday is coming. What could this do for me?",
        a: "The realistic version is a voucher and package campaign to your existing patient list, built on who bought what last year, scheduled in advance and sent without anyone doing it manually on the day. This is part of the platform package — it is built with your clinic rather than something running on the demo.",
      },
      {
        q: "Email only, or SMS too?",
        a: "Both are in scope for the build. SMS carries far higher open rates and is better suited to reminders; email suits anything that needs explaining or selling.",
      },
      {
        q: "Is this available right now?",
        a: "Not on the demo. The workflows are configured when CRM Solutions builds your practice, because they have to be built around your treatment cycles and your patient list.",
      },
    ],
    related: ["crm", "gift-vouchers", "video-reviews", "lead-generation"],
  },

  {
    slug: "voice-guide",
    term: "Voice Guide",
    oneLine:
      "A spoken guide on the site that explains the business system to owners — this is Adel, and you are using her now.",
    status: "Live in demo",
    category: "Convert",
    whatItIs:
      "A voice interface built into the website. On this demo it is aimed at clinic owners: Adel explains what each component does and why it matters commercially, and can navigate the site while she talks. She does not give clinical advice and does not answer your practice telephone.",
    whyItMatters: [
      "Owners evaluating a platform have specific questions and no appetite for reading twelve pages to find the answer to one of them.",
      "Speaking is faster than clicking. Somebody can ask 'how do gift vouchers work' and be on the page in a sentence.",
      "It demonstrates the capability rather than describing it, which is the whole argument of a demo site.",
    ],
    howItWorks: [
      {
        step: "Ask",
        detail: "The visitor speaks a question. The conversation is live, not a scripted menu.",
      },
      {
        step: "Answer and navigate",
        detail:
          "Adel answers and can take the visitor to the relevant page, including these glossary pages, which she reads to keep her answers accurate.",
      },
      {
        step: "Hand over",
        detail: "When somebody wants a human, she offers the Discovery Call with Ignatius at CRM Solutions.",
      },
    ],
    questions: [
      {
        q: "Could a version of this help my patients rather than owners?",
        a: "A patient-facing concierge — helping somebody find the right treatment and reach booking — is launch scope for a practice build rather than something running on this demo.",
      },
      {
        q: "Can it answer my clinic's phone?",
        a: "No. Telephone answering is a separate capability and it is next phase, not live. See Missed-Call Text-Back for the honest current position.",
      },
      {
        q: "What is it, exactly?",
        a: "A voice guide on this demo, using Google Gemini for the live conversation. It is not a person and does not pretend to be.",
      },
    ],
    related: ["missed-call-text-back", "funnel", "crm"],
  },

  {
    slug: "missed-call-text-back",
    term: "Missed-Call Text-Back",
    oneLine:
      "An automatic text to anyone whose call you could not take — currently next phase, not live.",
    status: "Next phase",
    category: "Convert",
    whatItIs:
      "When a call to the practice goes unanswered, an SMS goes out within seconds saying the practice will come back to them, and inviting them to reply or book online. It converts a hang-up into a conversation.",
    whyItMatters: [
      "A missed call in aesthetics is usually a lost patient, not a delayed one. The caller is comparing three clinics and dials the next number.",
      "The recovery window is minutes. A callback the following morning reaches somebody who has already booked elsewhere.",
      "It costs nothing per recovered patient once configured, which makes it one of the highest-return items on the roadmap.",
    ],
    howItWorks: [
      {
        step: "The call is missed",
        detail: "Ring-out, engaged, or outside hours.",
      },
      {
        step: "An SMS goes out",
        detail: "Immediately, from the practice number, acknowledging the call and offering a way to continue.",
      },
      {
        step: "The reply lands in the pipeline",
        detail: "Their response arrives as a record for the team, not as a voicemail nobody plays.",
      },
    ],
    questions: [
      {
        q: "Is this available now?",
        a: "No. It is next phase. Carrier verification of the sending number is outstanding, and until that clears, this cannot go live. It is described here so the roadmap is clear, not to suggest it is running.",
      },
      {
        q: "Why is verification difficult?",
        a: "Networks require registration of any number sending automated messages, to control spam. It is a process rather than a technical obstacle, but it gates the launch date and it is honest to say so.",
      },
    ],
    related: ["voice-guide", "crm", "online-booking"],
  },

  {
    slug: "profit-calculator",
    term: "Profit Calculator",
    oneLine:
      "An editable model of your own practice showing what one extra patient a week does to annual profit.",
    status: "Live in demo",
    category: "Convert",
    whatItIs:
      "A calculator holding rent, salaries, treatment fees, patient volumes and retail. Every figure starts as an estimate and is meant to be replaced with yours. It then shows what happens to monthly and annual profit if the practice adds a small number of patients per week and improves retail.",
    whyItMatters: [
      "Your fixed costs do not move when one more patient walks in. Rent, salaries and utilities are already paid, so the extra fee converts almost entirely into profit rather than at your average margin.",
      "That is why a rounding error in patient volume is a landslide in profit. On the example figures, a 2.4% increase in patients produces roughly a 34% increase in annual profit.",
      "Most owners have genuinely never put this on paper. The number is far larger than intuition suggests, and seeing it changes what a platform investment looks like.",
      "It also shows payback. If the build recovers a handful of full-fee patients a month, it pays for itself within months rather than years.",
    ],
    howItWorks: [
      {
        step: "Replace the figures",
        detail:
          "Rent, each staff member, each treatment and its monthly volume, retail turnover and your margins. Treatments can be renamed, added or removed.",
      },
      {
        step: "Set the uplift",
        detail: "Choose how many extra patients a week to model, and what happens to retail.",
      },
      {
        step: "Read the difference",
        detail:
          "Monthly and annual profit today against after, with the percentage lift and the payback period.",
      },
    ],
    questions: [
      {
        q: "Are these figures a forecast?",
        a: "No, and it would be dishonest to present them as one. It is a planning model built on your own numbers to make the size of the opportunity concrete. No result is promised.",
      },
      {
        q: "Does anything I type get sent anywhere?",
        a: "No. It saves in your own browser and nowhere else. There is no sign-up and no email required.",
      },
    ],
    demo: { href: "/financial", label: "Open the calculator" },
    image: {
      src: "/images/glossary/profit-calculator.png",
      alt: "Calculator panel comparing today's profit against profit after one extra patient a week, with fixed costs unchanged in both columns",
      caption:
        "Fixed costs are identical in both columns. That is the entire argument, in one screen.",
      width: 1182,
      height: 1888,
    },
    related: ["funnel", "online-retail", "online-booking"],
  },
];

export function getEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((entry) => entry.slug === slug);
}

/** Ordered by the funnel stage each term belongs to, for the index page. */
export const CATEGORY_ORDER = ["Capture", "Convert", "Commerce", "Retain"] as const;
