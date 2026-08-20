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
  category: "Capture" | "Convert" | "Commerce" | "Retain" | "Measure";
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
      "A conversational guide built into the website. On this demo it is aimed at clinic owners: Adel explains what each component does and why it matters commercially, and can navigate the site while she talks. The patient-facing version of the same idea is live on Star Aesthetic Centre, where a consultant called Niki helps patients find treatments and products. Neither gives clinical advice, and neither answers your practice telephone — that is a separate capability and it is not yet available.",
    whyItMatters: [
      "Owners evaluating a platform have specific questions and no appetite for reading twelve pages to find the answer to one of them.",
      "Speaking is faster than clicking. Somebody can ask 'how do gift vouchers work' and be on the page in a sentence.",
      "It demonstrates the capability rather than describing it, which is the whole argument of a demo site.",
      "On the patient side it answers the questions that would otherwise go unasked — what a treatment involves, what suits their skin, what to use at home — at the hour when nobody is at the front desk.",
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
        a: "It already does, on a real practice. Star Aesthetic Centre runs a patient-facing consultant called Niki that helps people find the right treatment and the right products. Adel here is the owner-facing version. A patient-facing consultant is part of the platform package for your build rather than something running on this demo site.",
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
    related: ["payback-period", "ltv", "funnel", "online-retail", "online-booking"],
  },
  {
    slug: "cac",
    term: "Customer Acquisition Cost (CAC)",
    oneLine:
      "What it actually costs you to put one new patient in the chair, once every rand of marketing is counted.",
    status: "In the platform package",
    category: "Measure",
    whatItIs:
      "Take everything you spent to get new patients in a period — ads, boosted posts, the agency, the printed cards, the referral incentive — and divide it by the number of new patients that period produced. That is your CAC. Most practices have never calculated it, and almost none calculate it per channel, which is where the useful version lives: Google might be costing you R400 a patient while Instagram costs R1,900.",
    whyItMatters: [
      "Until you know CAC you cannot tell a good month from a lucky one. Revenue went up, but did it go up more than what you paid to make it go up?",
      "CAC only means something next to what a patient is worth to you. R1,200 to acquire is ruinous if they never come back, and a bargain if they stay four years.",
      "Blended CAC hides the truth. One channel is almost always subsidising another, and you cannot cut the bad one until you can see it separately.",
    ],
    howItWorks: [
      {
        step: "Count the spend honestly",
        detail:
          "Everything aimed at new patients, not just the ad platform invoice. Agency fees, creative, the discount on the introductory offer — all of it is acquisition cost.",
      },
      {
        step: "Attribute the source",
        detail:
          "Every enquiry that lands in the CRM carries where it came from. Without that, per-channel CAC is guesswork and you are back to a blended number that tells you nothing.",
      },
      {
        step: "Divide, then compare",
        detail:
          "Spend ÷ new patients, per channel, per month. The number on its own is neutral. Set against lifetime value it becomes the most important figure in the practice.",
      },
    ],
    questions: [
      {
        q: "Do referrals count as acquisition cost?",
        a: "If you paid for them — a voucher, a discount, a thank-you gift — yes, and they usually come out as the cheapest channel you have, which is an argument for spending more attention there rather than less.",
      },
      {
        q: "My marketing is just me posting on Instagram. Is my CAC zero?",
        a: "No. Your time is the most expensive input in the practice. Cost it at what an hour of your clinical time earns and the number stops looking free very quickly.",
      },
    ],
    related: ["ltv", "ltv-cac-ratio", "cost-per-lead", "lead-generation"],
  },

  {
    slug: "cost-per-lead",
    term: "Cost Per Lead (CPL, CPC, CPM)",
    oneLine:
      "What one enquiry costs you — and the three abbreviations every advertising platform reports it in.",
    status: "In the platform package",
    category: "Measure",
    whatItIs:
      "A lead is somebody who has raised a hand: an enquiry, a form, a call, a booking request. Cost per lead is spend divided by leads. The related abbreviations are CPC — cost per click, what you pay for one visit to your site — and CPM — cost per mille, what you pay for a thousand people to see the ad. CPL is the one that matters commercially, because clicks and impressions do not book appointments.",
    whyItMatters: [
      "The cost of online advertising rises every year and will keep rising. Every practice competing for the same patients pushes the price up, and no clever setting reverses that.",
      "Because that cost is largely outside your control, the winnable game is what happens after the lead arrives — how fast you respond, how many times you follow up, and what the patient is worth over time.",
      "A practice that can afford a higher cost per lead than its competitors can simply buy the market. That capacity comes from the back end, never from the ad account.",
    ],
    howItWorks: [
      {
        step: "Separate the three",
        detail:
          "CPM is what you pay for attention, CPC for a visit, CPL for a hand raised. A cheap CPC with an expensive CPL means the traffic is arriving and leaving — that is a site problem, not an ad problem.",
      },
      {
        step: "Track the lead, not the click",
        detail:
          "Enquiries land in one place with their source attached, so you can see which channel produces people who actually book rather than people who merely arrive.",
      },
      {
        step: "Judge it against lead value",
        detail:
          "A R300 lead is expensive or cheap only relative to what an average lead earns you. That comparison is the whole decision.",
      },
    ],
    questions: [
      {
        q: "My cost per lead went up. Should I turn the ads off?",
        a: "Not on that fact alone. If lead value went up more, the rising cost is affordable. Turning off a channel because its cost rose, without checking what it returns, is how practices shrink their way to a problem.",
      },
      {
        q: "Why do platforms report so many different numbers?",
        a: "Because most of them describe activity rather than outcome. Impressions, reach and engagement are inputs. Leads, bookings and revenue are outcomes. Only the outcomes belong in a business decision.",
      },
    ],
    related: ["cac", "lead-value", "lead-generation", "speed-to-lead"],
  },

  {
    slug: "lead-value",
    term: "Average Lead Value",
    oneLine:
      "What one enquiry is worth to you on average — the number that tells you what you can afford to pay for the next one.",
    status: "Next phase",
    category: "Measure",
    whatItIs:
      "Total revenue for a period divided by the total number of leads that period generated. If a quarter produced 400 enquiries and R1.2m of revenue, each enquiry was worth R3,000 — whether or not it booked. It counts the ones who never replied, which is exactly why it is useful: it prices the average, not the best case.",
    whyItMatters: [
      "It converts marketing from an anxiety into an arithmetic. Once you know an enquiry is worth R3,000, paying R400 for one stops being a cost you resent and becomes a trade you would take all day.",
      "It is the number that gives you permission to spend. Practices that do not know it default to spending as little as possible, which quietly caps how large they can become.",
      "It exposes the real lever. Improving lead value by a third does more for the business than shaving a fifth off cost per lead, and unlike ad costs it is entirely within your control.",
    ],
    howItWorks: [
      {
        step: "Count every lead",
        detail:
          "Including the ones that went nowhere. Excluding them inflates the number and produces confident, wrong decisions.",
      },
      {
        step: "Attach the revenue",
        detail:
          "Revenue over the same window, divided by that lead count. Do it per channel once the volume is there — lead value differs enormously by source.",
      },
      {
        step: "Recalculate quarterly",
        detail:
          "As retention and retail improve, lead value rises, which raises what you can afford to bid. That is the flywheel: a better back end buys you a bigger front end.",
      },
    ],
    questions: [
      {
        q: "Should I use first-visit revenue or lifetime revenue?",
        a: "Run both. First-visit lead value tells you what you can afford if you need the cash back immediately. Lifetime lead value tells you what you could afford if you were willing to wait — and the gap between the two numbers is the argument for building a back end.",
      },
      {
        q: "Why is this listed as next phase?",
        a: "Because it needs revenue attributed back to the enquiry that produced it, reported monthly. The data is captured; the reporting layer that puts it in front of you is on the roadmap and is not described here as though it already exists.",
      },
    ],
    related: ["cost-per-lead", "ltv", "cac", "profit-calculator"],
  },

  {
    slug: "ltv",
    term: "Lifetime Value (LTV)",
    oneLine:
      "What one patient is worth across the whole relationship, not the first appointment — treatments, retail and referrals included.",
    status: "Next phase",
    category: "Measure",
    whatItIs:
      "Average transaction value multiplied by how often a patient buys in a year, multiplied by how many years they stay. A patient spending R2,400 a visit, coming three times a year, staying four years is worth R28,800 — before a single product off the shelf. Most owners have the first number in their head and have never multiplied it by the other two.",
    whyItMatters: [
      "It reframes the first appointment correctly: as the least valuable transaction in the relationship, and usually the only one the practice markets for.",
      "It is the ceiling on what you can spend to acquire. Whoever in your market has the highest lifetime value can outbid everyone else for the same patient and still profit. That is a structural advantage no ad tactic overcomes.",
      "It puts a price on retention work. If lifetime value is R28,800, an extra year of loyalty is worth R7,200 a patient — which makes a recall system look inexpensive rather than optional.",
    ],
    howItWorks: [
      {
        step: "Average transaction value",
        detail:
          "What a patient spends in a typical visit, including anything they take home with them.",
      },
      {
        step: "Visits per year",
        detail:
          "Not what your treatment protocol says they should book. What they actually book, which is usually well below the clinical ideal.",
      },
      {
        step: "Years retained",
        detail:
          "The inverse of your attrition rate. Lose 40% of patients a year and the average relationship lasts two and a half years, whatever your best patients look like.",
      },
    ],
    questions: [
      {
        q: "I have no idea how long patients stay. Where do I start?",
        a: "Pull the patients you first saw two years ago and count how many have been in during the last twelve months. That single figure is enough to begin, and it is usually a sobering afternoon.",
      },
      {
        q: "Should referrals count towards lifetime value?",
        a: "Yes, and it changes the picture. A patient who sends two friends is worth three relationships. It is also the cheapest growth available to an aesthetic practice, which is why the loyalty and review components exist.",
      },
    ],
    related: ["ltv-cac-ratio", "repeat-rate", "attrition", "loyalty-points"],
  },

  {
    slug: "ltv-cac-ratio",
    term: "LTV:CAC Ratio",
    oneLine:
      "What a patient is worth divided by what they cost to get — the single number that says whether the business can scale.",
    status: "Next phase",
    category: "Measure",
    whatItIs:
      "Lifetime value divided by acquisition cost. Below 1:1 you are paying more for patients than they will ever bring, and growth accelerates the loss. Around 3:1 is generally considered healthy. Well above 5:1 usually means you are under-investing in marketing rather than running a brilliant business — you could be buying more patients than you are.",
    whyItMatters: [
      "It is the difference between growth that funds itself and growth that consumes the practice. Two clinics with identical revenue can sit on opposite sides of that line.",
      "It settles arguments. Whether to raise prices, whether to spend more on ads, whether the loyalty programme is worth running — all of them resolve to their effect on this ratio.",
      "It is the mathematical form of the whole argument: you win a market not by paying less for patients, but by being able to afford more for them than anyone else can.",
    ],
    howItWorks: [
      {
        step: "Establish both halves",
        detail:
          "Lifetime value and acquisition cost, calculated over the same period and the same patient cohort. Mixing timeframes produces a flattering number that is not true.",
      },
      {
        step: "Read the ratio",
        detail:
          "Under 3:1 the constraint is usually retention or price, not marketing. Over 5:1 the constraint is usually that you are not spending enough.",
      },
      {
        step: "Improve the numerator first",
        detail:
          "Acquisition cost is set largely by an auction you do not control. Lifetime value is set by you. Almost every durable improvement to this ratio comes from the top half.",
      },
    ],
    questions: [
      {
        q: "What if my ratio is enormous — say 20:1?",
        a: "That is rarely a triumph. It usually means a practice living on referrals and word of mouth with no acquisition engine at all, which is comfortable until the referrals slow down. A 20:1 ratio is an instruction to invest, not a reason to celebrate.",
      },
      {
        q: "How often should I check it?",
        a: "Quarterly is enough. It moves too slowly to be a monthly number and too fast to be an annual one.",
      },
    ],
    related: ["ltv", "cac", "payback-period", "front-end-back-end"],
  },

  {
    slug: "aov",
    term: "Average Order Value (AOV)",
    oneLine:
      "What a patient spends in a single visit — the number that moves fastest when the offer is structured well.",
    status: "In the platform package",
    category: "Measure",
    whatItIs:
      "Total revenue divided by number of transactions. In an aesthetic practice it is the treatment plus anything else that leaves with the patient: homecare, a package, a voucher, a pre-booked follow-up. Also called average transaction value or average ticket.",
    whyItMatters: [
      "It is the quickest of the three lifetime-value levers to move. Frequency and retention take quarters to shift; average order value can change in a fortnight with a properly sequenced recommendation.",
      "It falls through the floor when the practice competes on price. Every discounted introductory offer trains the patient to expect the lower number on the next visit too.",
      "Retail is where most practices lose it. A cupboard of pharmaceutical-grade product that never gets recommended is average order value sitting on a shelf.",
    ],
    howItWorks: [
      {
        step: "Measure it per treatment",
        detail:
          "The blended figure hides everything. Some treatments carry retail naturally and some never do, and only the split tells you where the opportunity is.",
      },
      {
        step: "Structure the recommendation",
        detail:
          "Homecare presented as part of the clinical outcome rather than as a sale at the counter. The upsell path exists so this happens by design rather than depending on who is on the desk.",
      },
      {
        step: "Keep selling after the visit",
        detail:
          "Online retail means the reorder does not require a phone call or a trip, which is where most repeat product revenue is quietly lost.",
      },
    ],
    questions: [
      {
        q: "Is raising prices the same as raising average order value?",
        a: "It is one way, and usually the fastest, but it is not the only one. Adding a second item to the same visit raises it without asking anyone to accept a higher price for the same thing.",
      },
      {
        q: "My patients are price-sensitive. Won't this push them away?",
        a: "Some of them, yes — and typically the ones with the lowest lifetime value. The patients who arrive asking for your cheapest treatment are rarely the ones who stay four years.",
      },
    ],
    related: ["ltv", "online-retail", "upsell-funnel", "repeat-rate"],
  },

  {
    slug: "repeat-rate",
    term: "Repeat Rate (Rebook Rate)",
    oneLine:
      "The share of patients who come back within a set window — the most under-measured number in aesthetic practice.",
    status: "In the platform package",
    category: "Measure",
    whatItIs:
      "Of the patients you treated in a given period, how many returned within ninety days, or within a year. Ask most owners and you get an impression rather than a figure. It is the number that decides whether you are building a practice or running a very busy first-visit shop.",
    whyItMatters: [
      "The second visit is where the money is. It carries no acquisition cost, tends to be full fee rather than the introductory offer, and is where retail actually sells.",
      "Every point of repeat rate compounds. Moving 30% to 45% does not add 15% to revenue — it lengthens the average relationship, which multiplies lifetime value.",
      "A falling repeat rate is the earliest warning a practice gets, and it appears months before the diary looks empty. By the time you are discounting to fill days, this number dropped two quarters ago.",
    ],
    howItWorks: [
      {
        step: "Pick a window and hold it",
        detail:
          "Ninety days for most injectables and facials, twelve months for anything annual. The window matters less than never changing it, so the trend stays readable.",
      },
      {
        step: "Rebook before they leave",
        detail:
          "The highest-converting moment for the next appointment is while the patient is still in the room and pleased. Every hour after that, the odds fall.",
      },
      {
        step: "Recall the ones who drift",
        detail:
          "Automated recall at the clinically right interval, so returning does not depend on the patient remembering or the front desk having a quiet afternoon.",
      },
    ],
    questions: [
      {
        q: "What is a good repeat rate?",
        a: "For an established aesthetic practice, under 30% within ninety days signals a retention problem rather than a marketing one. Above 50% you have something most of your competitors do not, and it should be defended before it is grown.",
      },
      {
        q: "Isn't this just how loyal my patients are?",
        a: "Partly, but far less than owners assume. Most non-return is not dissatisfaction — it is that nothing prompted the patient at the moment the treatment wore off. That is a system gap, not a loyalty verdict.",
      },
    ],
    related: ["attrition", "ltv", "marketing-automation", "loyalty-points"],
  },

  {
    slug: "attrition",
    term: "Attrition (Churn)",
    oneLine:
      "The share of patients who quietly stop coming — the leak that has to be refilled before any growth counts.",
    status: "Next phase",
    category: "Measure",
    whatItIs:
      "The percentage of active patients who do not return within the period that defines active for your practice. It is the mirror image of repeat rate and the reason a clinic can market hard all year and finish where it started. Aesthetic attrition is almost never announced — nobody resigns from a clinic, they simply stop appearing.",
    whyItMatters: [
      "It sets how hard you have to run to stand still. Lose 40% of your patients a year and the first 40% of everything you acquire is replacement, not growth.",
      "It determines how long relationships last, which determines lifetime value, which determines what you can afford to spend to acquire. Attrition sits upstream of nearly every other number here.",
      "It is invisible without measurement. A busy week feels like a healthy practice, and a practice can feel busy right up until the month it does not.",
    ],
    howItWorks: [
      {
        step: "Define active",
        detail:
          "Usually seen within the last twelve months. Whatever you choose, keep it fixed — a moving definition makes the trend meaningless.",
      },
      {
        step: "Count the disappeared",
        detail:
          "Patients active a year ago who have not returned since, as a share of that starting group. That percentage is your attrition rate.",
      },
      {
        step: "Reactivate before you replace",
        detail:
          "A lapsed patient already knows and trusts you, and costs a fraction of a stranger to bring back. Most practices spend on strangers while a reactivatable list sits untouched in the records.",
      },
    ],
    questions: [
      {
        q: "Some attrition is normal, surely?",
        a: "Yes — people move, budgets change, priorities shift. The question is never whether you have attrition but whether it is 20% or 50%, and no practice can answer that from memory.",
      },
      {
        q: "How do I bring lapsed patients back without sounding desperate?",
        a: "By having a reason that is about them rather than about your diary — the interval on their treatment has passed, a new option suits what they came for, their points are sitting unused. The system knows who is due and why, which is what makes the message land as care rather than as a promotion.",
      },
    ],
    related: ["repeat-rate", "ltv", "marketing-automation", "crm"],
  },

  {
    slug: "payback-period",
    term: "Payback Period",
    oneLine:
      "How long it takes a new patient to repay what you spent acquiring them — the number that governs cash flow.",
    status: "Live in demo",
    category: "Measure",
    whatItIs:
      "If a patient costs R1,200 to acquire and contributes R800 of margin per visit, they pay you back on the second visit. Payback period is measured in visits or months, not rands, and it answers a different question from lifetime value: not whether the patient is profitable, but when.",
    whyItMatters: [
      "A practice can be profitable on paper and still run out of cash, because the profit arrives eleven months after the advertising invoice does.",
      "It sets your safe growth rate. A short payback period means you can reinvest quickly and scale; a long one means every new patient is a loan you are funding.",
      "It is the honest test of whether an introductory offer works. Discounted first visits usually push payback past the point where most patients have already disappeared.",
    ],
    howItWorks: [
      {
        step: "Use margin, not revenue",
        detail:
          "What the visit leaves behind after product, consumables and the clinician's time. Revenue-based payback is always flattering and always wrong.",
      },
      {
        step: "Count in visits",
        detail:
          "Acquisition cost divided by margin per visit gives you how many visits to break even. Then apply your repeat rate to see what share of patients actually get that far.",
      },
      {
        step: "Test it against fixed costs",
        detail:
          "The calculator holds your fixed costs constant and shows what one extra patient a week does to the payback picture. That comparison is the whole argument in one screen.",
      },
    ],
    questions: [
      {
        q: "What is an acceptable payback period?",
        a: "For a practice funding growth from its own cash flow, inside three months is comfortable and inside one visit is exceptional. Beyond six months you are effectively lending money to your own marketing.",
      },
      {
        q: "Where can I see this for my practice?",
        a: "The profit calculator works it through with your own figures. Nothing you type leaves your browser.",
      },
    ],
    demo: { href: "/financial", label: "Open the calculator" },
    related: ["cac", "ltv-cac-ratio", "profit-calculator", "repeat-rate"],
  },

  {
    slug: "front-end-back-end",
    term: "Front End & Back End",
    oneLine:
      "The first sale versus everything that follows it — and the reason the first sale is the least profitable one you make.",
    status: "Live in demo",
    category: "Measure",
    whatItIs:
      "The front end is what brings a patient in for the first time: the ad, the introductory treatment, the consultation. The back end is everything after — repeat treatments, homecare, packages, vouchers, referrals. Practices that try to make the whole business profitable on the front end alone are competing with one hand tied, because acquisition costs rise every year and the front end is exactly where those costs land.",
    whyItMatters: [
      "The first transaction is the most expensive revenue in the practice: it carries the full acquisition cost and is usually discounted to win the patient in the first place.",
      "A strong back end is what lets you outspend competitors on the front end. If a patient is worth four times more to you than to the clinic down the road, you can pay four times more to reach them and still profit.",
      "Most practices have no deliberate back end at all. Not because there is nothing to sell — the retail cupboard is full — but because nothing in the business is designed to sell it after the patient has left.",
    ],
    howItWorks: [
      {
        step: "Front end: earn the first visit",
        detail:
          "Findable pages, a booking flow that finishes at eleven at night, and enquiries that reach a human quickly. Judged on volume and cost, not profit.",
      },
      {
        step: "Back end: earn the relationship",
        detail:
          "Homecare that reorders online, packages, gift vouchers bought by people who have never visited, loyalty that gives a reason to return, and reviews that bring the next patient in cheaply.",
      },
      {
        step: "Fund the front end from the back",
        detail:
          "As back-end revenue grows, lifetime value grows, which raises what you can afford to pay for a new patient. That is the flywheel — and it only turns in one direction.",
      },
    ],
    questions: [
      {
        q: "I have nothing else to sell them. What is my back end?",
        a: "Almost every practice has more than it thinks: homecare, maintenance intervals, packages, vouchers, and treatments the patient does not know you offer. Where a genuine gap exists, complementary partners — dermatology, wellness, cosmetic dentistry — can fill it through introductions rather than new stock.",
      },
      {
        q: "Isn't this just upselling by another name?",
        a: "Upselling is a moment at the counter. A back end is a structure: the patient who bought once is given a sensible next step, at the right interval, whether or not anyone remembers to mention it.",
      },
    ],
    related: ["ltv", "upsell-funnel", "online-retail", "gift-vouchers"],
  },

  {
    slug: "speed-to-lead",
    term: "Speed to Lead",
    oneLine:
      "How long an enquiry waits before a human responds — the cheapest conversion improvement available to any practice.",
    status: "In the platform package",
    category: "Measure",
    whatItIs:
      "The elapsed time between an enquiry arriving and somebody actually contacting that person, plus how many attempts are made before you give up. Both are entirely within your control, cost nothing to improve, and are ignored by almost every practice that is busy optimising its advertising instead.",
    whyItMatters: [
      "Aesthetic enquiries are comparison-shopping. The patient contacted three clinics on a Sunday evening, and the one that replies first is usually the one that books them.",
      "Most practices stop after one attempt. The second, third and fourth follow-up convert people the first one missed — those patients were busy, not uninterested.",
      "You can double bookings from the same advertising spend by changing nothing except response time and follow-up discipline. No channel optimisation available anywhere returns that much.",
    ],
    howItWorks: [
      {
        step: "Land every enquiry in one place",
        detail:
          "Web form, phone, message and booking request all arriving in the same queue with the patient's stated need attached — so nothing sits unread in an inbox nobody owns.",
      },
      {
        step: "Acknowledge immediately, automatically",
        detail:
          "An instant confirmation holds the patient's attention while a human gets to them. A missed call that answers itself with a message keeps a lead that would otherwise ring the next clinic.",
      },
      {
        step: "Follow a written sequence",
        detail:
          "A defined number of attempts across defined days, visible to whoever is on the desk. Not memory, not goodwill — a procedure with a calendar attached.",
      },
    ],
    questions: [
      {
        q: "What is a good response time?",
        a: "Minutes rather than hours during the day, and something automatic outside it. The steepest drop in conversion happens inside the first hour, which is precisely the window most practices lose.",
      },
      {
        q: "How many follow-up attempts is too many?",
        a: "Fewer than most owners fear. Five to seven attempts across two weeks is normal commercial practice and reads as attentive rather than pushy when each contact carries something useful.",
      },
    ],
    related: ["crm", "missed-call-text-back", "cost-per-lead", "lead-generation"],
  },
];

export function getEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((entry) => entry.slug === slug);
}

/** Ordered by the funnel stage each term belongs to, for the index page. */
export const CATEGORY_ORDER = ["Capture", "Convert", "Commerce", "Retain", "Measure"] as const;
