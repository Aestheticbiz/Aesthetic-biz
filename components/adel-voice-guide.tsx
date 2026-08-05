"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isConversionRoute } from "@/lib/conversion-routes";
import {
  EndSensitivity,
  GoogleGenAI,
  Modality,
  ThinkingLevel,
  Type,
  type LiveServerMessage,
  type Session,
} from "@google/genai";

type VoiceStatus = "idle" | "connecting" | "active" | "error";

const ROUTES = {
  home: "/",
  treatments: "/treatments",
  shop: "/shop",
  book: "/book",
  rewards: "/rewards",
  gifts: "/gift-cards",
  reviews: "/reviews",
  about: "/about",
  contact: "/contact",
  features: "/features",
  audit: "/audit",
  biz: "/full-fee-patients",
  financial: "/financial",
  customizer: "/customizer",
  skinSurvey: "/skin-survey",
  submitReview: "/submit-review",
  discovery: "/book-discovery",
  glossary: "/glossary",
  glossaryFunnel: "/glossary/funnel",
  glossaryBooking: "/glossary/online-booking",
  glossaryLeads: "/glossary/lead-generation",
  glossaryCrm: "/glossary/crm",
  glossaryRetail: "/glossary/online-retail",
  glossaryUpsell: "/glossary/upsell-funnel",
  glossaryVouchers: "/glossary/gift-vouchers",
  glossaryLoyalty: "/glossary/loyalty-points",
  glossaryVideoReviews: "/glossary/video-reviews",
  glossaryAutomation: "/glossary/marketing-automation",
  glossaryVoice: "/glossary/voice-guide",
  glossaryMissedCall: "/glossary/missed-call-text-back",
  glossaryCalculator: "/glossary/profit-calculator",
  insights: "/insights",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
} as const;

const ALLOWED_PATHS = new Set(Object.values(ROUTES).map((route) => route.split("#")[0]));

function pageText(): string {
  if (typeof document === "undefined") return "";
  const main = document.querySelector("main") || document.body;
  return ((main as HTMLElement | null)?.innerText || "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 6500);
}

function routeIsAllowed(route: string): boolean {
  if (!route.startsWith("/") || route.startsWith("//")) return false;
  return ALLOWED_PATHS.has(route.split("#")[0]);
}

function scrollToSubject(subject: string): boolean {
  const query = subject.trim().toLowerCase();
  if (!query) return false;
  if (/(top|opening|hero|start)/.test(query)) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }
  if (/(footer|bottom)/.test(query)) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    return true;
  }
  const direct = document.getElementById(query);
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("h1,h2,h3,section[id],[data-section]"),
  );
  const match =
    direct ||
    candidates.find((element) =>
      (element.textContent || "").toLowerCase().includes(query),
    );
  if (!match) return false;
  match.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const length = Math.round(input.length / ratio);
  const output = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    output[index] = input[Math.floor(index * ratio)] ?? 0;
  }
  return output;
}

function pcmToBase64(input: Float32Array): string {
  const pcm = new Int16Array(input.length);
  for (let index = 0; index < input.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, input[index] ?? 0));
    pcm[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  const bytes = new Uint8Array(pcm.buffer);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index] ?? 0);
  }
  return btoa(binary);
}

function base64ToFloat32(value: string): Float32Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  const pcm = new Int16Array(bytes.buffer);
  const output = new Float32Array(pcm.length);
  for (let index = 0; index < pcm.length; index += 1) {
    const sample = pcm[index] ?? 0;
    output[index] = sample / (sample < 0 ? 0x8000 : 0x7fff);
  }
  return output;
}

function systemPrompt(pathname: string): string {
  return `You are Adel, AestheticBiz's voice guide for clinic owners and managers. You sell and explain a Patient Revenue Platform — a business operating system for one aesthetic clinic — not a brochure website and not clinical advice.

IDENTITY AND OPENING
- Speak first. Say: "Hello — I'm Adel. I walk clinic owners through the business components of this platform. May I ask who I'm speaking with?"
- Learn the visitor's first name within the first two turns.
- Do not use the words "AI", "artificial intelligence", or "chatbot" in marketing language. If asked what you are, say you are AestheticBiz's voice guide on this demo, powered by Google Gemini for the live conversation.
- English by default. Continue in another language when requested.

VOICE AND JUDGMENT
- Calm, warm, senior and commercially precise. Prefer 1–3 spoken sentences per turn.
- Ask about diary fill-rate, after-hours missed calls, retail sitting in cupboards, and review follow-up.
- Never invent results, client revenue, rankings or guarantees.
- When ready for a human, offer the Discovery Call with Ignatius at CRM Solutions.

THE PRODUCT
- CRM Solutions builds a Patient Revenue Platform dedicated to aesthetic practices (typical investment US$10,000 — 50% deposit / 50% pre-launch; USD for US and rest of world). AestheticBiz is the live demo brand.
- Delivery is a 90-day build: days 1–15 audit, 16–70 build, 71–90 launch and handover. The owner is needed for roughly three conversations. They own the asset outright at handover — no monthly licence, no retainer.
- Deposit-back guarantee: at day 15 the owner sees the audit and design direction; if they do not want to continue, the deposit is returned in full and they keep the audit. State this plainly when asked about risk or cancelling.
- Capacity is three practices per quarter because Ignatius builds them himself. That is arithmetic, not a sales tactic — say it that way.
- Never mention GoHighLevel, HighLevel, GHL, or other competitor platform brands by name.
- Core story: Capture → Convert → Commerce → Retain. Full detail lives on /features — navigate there when explaining the package.
- Status language you must use honestly:
  - Live in demo: working on AestheticBiz now.
  - In the platform package: included when CRM Solutions builds their clinic.
  - Next phase: named roadmap — do not pretend it is live.

CAPTURE (get patients in)
- Branded website & landing pages — Live (/).
- Skin Survey & lead forms — Live (/skin-survey).
- On-brand booking — Live (/book) — replaces Square/Calendly exits.
- SEO & Maps-ready pages — Package (/audit shows the gap).
- Ad Manager / paid ads creatives — Next phase (optional scope).

CONVERT (interest → booked revenue)
- CRM & enquiry pipeline — Package.
- Adel on-site voice guide — Live (this conversation). You explain the business system to owners; patient-facing concierge is launch scope.
- Phone Voice AI and missed-call text-back — Next phase. Carrier verification blocked go-live. Be transparent: you cannot answer their clinic phone yet.
- Email & SMS follow-up — Package.
- Workflow automations (e.g. survey → notify + email + book offer) — Package.
- Discovery Call calendar for CRM Solutions sales — Live (/book-discovery).

COMMERCE (sell more than chair time)
- Featured retail / shop — Live (/shop).
- Gift vouchers — Live (/gift-cards), US dollar denominations.
- Loyalty / AestheticBiz Points (~5% back) — Live (/rewards).
- Payments & deposits — Package.

RETAIN (fans, not one-visits)
- Reviews board & video reviews — Live (/reviews). Homepage samples plus clinic, treatment, skincare and labelled demo YouTube videos. FAQ on that page explains why reviews and each platform component matter for the bottom line toward 2030.
- Automated review requests — Package.
- Reactivation campaigns — Next phase.
- Admin operations console (bookings, inbox, surveys, voice log, payments, traffic) — Package.

DEMO TOYS (not the product core)
- Brand Customizer (/customizer): try logo/colours in-browser.
- Campaign landing (/full-fee-patients): the 90-day offer for practice owners.
- Profit calculator (/financial): what one extra patient a week is worth.

WHAT YOU DO NOT DO
- No medical treatment advice. Redirect: "Treatment decisions stay with the clinic — I cover the system that books, sells and retains."
- Do not claim phone answering, missed-call text-back, or a full ad/social media operating system is live.
- Do not invent legal advice — /privacy, /terms, /cookies.

THE GLOSSARY — YOUR REFERENCE LIBRARY
- /glossary holds one detailed page per business component. Each page carries: what it is, why it matters commercially, how it works here, honest status, and the questions owners ask.
- When you are asked how something works and you do not have the detail in this prompt, navigate_to the glossary page and read_site_page BEFORE answering. Do not guess and do not invent mechanics.
- Pages: funnel, online-booking, lead-generation, crm, online-retail, upsell-funnel, gift-vouchers, loyalty-points, video-reviews, marketing-automation, voice-guide, missed-call-text-back, profit-calculator.
- Upsell funnel: a one or two step offer shown after a patient adds to cart, with a bundle discount and an obvious skip. It is IN THE PLATFORM PACKAGE and is running live on Star Aesthetic Centre today — you may cite that as real proof. It is the fastest lever on average order value; a single accepted offer can multiply the basket.
- Specifics you may state directly: gift vouchers are US$100 / 250 / 500 / 1000; loyalty is roughly 5% back; reviews can be written or recorded on video in the browser (camera and microphone) or uploaded, and submissions are moderated before publishing.
- CRM structure follows the standard open-source CRM object model: Leads, Contacts and Organisations, Opportunities, Products/Services with Price Books, Quotes and Invoices, Activities and Documents, Cases, and Workflows. Say it is a standard model, not a proprietary one — that is the anti-lock-in argument. Do NOT name the specific CRM product by brand.
- Seasonal campaigns (Black Friday, festive gift vouchers) belong to marketing-automation and are IN THE PLATFORM PACKAGE — never describe them as running on this demo.

SITE TOOLS
- Prefer navigate_to /features (and scroll_to_section for Capture, Convert, Commerce, Retain, replaces, adel) when explaining the business package.
- Use read_site_page for exact published wording.
- Only navigate within: ${JSON.stringify(ROUTES)}.

PRIVACY AND SAFETY
- Do not request payment-card details, passwords, health data or confidential company files.
- Voice audio is processed for this live conversation. Privacy: /privacy and /cookies.

CURRENT PAGE
Path: ${pathname}
Visible page text:
${pageText()}`;
}

function VoiceGlyph({ muted = false }: { muted?: boolean }) {
  return muted ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M9.5 9.6v2.3a2.5 2.5 0 0 0 3.9 2.1M14.5 9.6V7a2.5 2.5 0 0 0-4.8-1M6.8 14.8A6 6 0 0 0 17 15M12 18v3M9 21h6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9.5" y="3" width="5" height="12" rx="2.5" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" />
    </svg>
  );
}

export function AdelVoiceGuide() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");

  const sessionRef = useRef<Session | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playAtRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const mutedRef = useRef(false);
  const endedByUserRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const stopPlayback = useCallback(() => {
    sourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        /* ignore */
      }
    });
    sourcesRef.current.clear();
    playAtRef.current = 0;
    setSpeaking(false);
  }, []);

  const teardown = useCallback(
    async (userEnded = false) => {
      endedByUserRef.current = userEnded;
      stopPlayback();
      processorRef.current?.disconnect();
      processorRef.current = null;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      try {
        sessionRef.current?.close();
      } catch {
        /* ignore */
      }
      sessionRef.current = null;
      await inputContextRef.current?.close().catch(() => undefined);
      await outputContextRef.current?.close().catch(() => undefined);
      inputContextRef.current = null;
      outputContextRef.current = null;
      setMuted(false);
      setStatus("idle");
    },
    [stopPlayback],
  );

  useEffect(() => {
    return () => {
      void teardown(false);
    };
  }, [teardown]);

  const playAudio = useCallback((base64: string) => {
    const context = outputContextRef.current || new AudioContext({ sampleRate: 24000 });
    outputContextRef.current = context;
    if (context.state === "suspended") void context.resume();
    const samples = base64ToFloat32(base64);
    const buffer = context.createBuffer(1, samples.length, 24000);
    buffer.copyToChannel(new Float32Array(samples), 0);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    const startsAt = Math.max(context.currentTime + 0.02, playAtRef.current);
    source.start(startsAt);
    playAtRef.current = startsAt + buffer.duration;
    sourcesRef.current.add(source);
    setSpeaking(true);
    source.onended = () => {
      sourcesRef.current.delete(source);
      if (sourcesRef.current.size === 0) setSpeaking(false);
    };
  }, []);

  const handleToolCall = useCallback(
    async (message: LiveServerMessage) => {
      const calls = message.toolCall?.functionCalls ?? [];
      if (!calls.length || !sessionRef.current) return;

      const responses = await Promise.all(
        calls.map(async (call) => {
          const args = (call.args || {}) as Record<string, string>;
          let response: Record<string, unknown>;

          if (call.name === "navigate_to") {
            const route = args.route || "";
            if (!routeIsAllowed(route)) {
              response = { success: false, error: "That route is not approved." };
            } else {
              router.push(route);
              response = { success: true, route, message: "The approved page is opening." };
            }
          } else if (call.name === "scroll_to_section") {
            const found = scrollToSubject(args.subject || "");
            response = {
              success: found,
              subject: args.subject,
              message: found ? "The relevant section is in view." : "No matching section was found.",
            };
          } else if (call.name === "read_site_page") {
            const route = args.route || pathname;
            if (!routeIsAllowed(route)) {
              response = { success: false, error: "That route is not approved." };
            } else if (route.split("#")[0] === pathname) {
              response = { success: true, route, publishedText: pageText() };
            } else {
              try {
                const result = await fetch(route, { credentials: "same-origin" });
                const html = await result.text();
                const documentCopy = new DOMParser().parseFromString(html, "text/html");
                documentCopy.querySelectorAll("script,style,svg,noscript").forEach((node) => {
                  node.remove();
                });
                const text = (documentCopy.body?.textContent || "")
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 6500);
                response = { success: result.ok, route, publishedText: text };
              } catch {
                response = { success: false, route, error: "The page could not be read." };
              }
            }
          } else {
            response = { success: false, error: "Unknown tool." };
          }

          return { id: call.id, name: call.name, response };
        }),
      );

      sessionRef.current?.sendToolResponse({ functionResponses: responses });
    },
    [pathname, router],
  );

  const handleMessage = useCallback(
    (message: LiveServerMessage) => {
      if (message.serverContent?.interrupted) stopPlayback();
      const audio = message.data;
      if (audio) playAudio(audio);
      if (message.toolCall?.functionCalls?.length) void handleToolCall(message);
    },
    [handleToolCall, playAudio, stopPlayback],
  );

  const start = useCallback(async () => {
    setStatus("connecting");
    setError("");
    endedByUserRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      const tokenResult = await fetch("/api/gemini-voice-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const tokenBody = (await tokenResult.json()) as {
        token?: string;
        model?: string;
        apiVersion?: string;
        error?: string;
      };
      if (!tokenResult.ok || !tokenBody.token) {
        throw new Error(tokenBody.error || "Adel's voice connection is not available yet.");
      }

      const ai = new GoogleGenAI({
        apiKey: tokenBody.token,
        httpOptions: { apiVersion: tokenBody.apiVersion || "v1alpha" },
      });

      const session = await ai.live.connect({
        model: tokenBody.model || "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemPrompt(pathname),
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
          },
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          realtimeInputConfig: {
            automaticActivityDetection: {
              disabled: false,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
              silenceDurationMs: 1200,
            },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          tools: [
            {
              functionDeclarations: [
                {
                  name: "navigate_to",
                  description: "Open an approved AestheticBiz page for the visitor.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      route: {
                        type: Type.STRING,
                        description: `One exact route from: ${Object.values(ROUTES).join(", ")}`,
                      },
                    },
                    required: ["route"],
                  },
                },
                {
                  name: "scroll_to_section",
                  description: "Bring a relevant section of the current page into view.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      subject: {
                        type: Type.STRING,
                        description: "The visible heading or subject to bring into view.",
                      },
                    },
                    required: ["subject"],
                  },
                },
                {
                  name: "read_site_page",
                  description: "Read the published text of an approved page before explaining it.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      route: {
                        type: Type.STRING,
                        description: "An exact approved AestheticBiz route.",
                      },
                    },
                    required: ["route"],
                  },
                },
              ],
            },
          ],
        },
        callbacks: {
          onmessage: handleMessage,
          onerror: () => {
            setError("The live voice connection was interrupted. Please try again.");
            setStatus("error");
          },
          onclose: () => {
            if (!endedByUserRef.current) {
              setStatus((current) => (current === "active" ? "idle" : current));
            }
          },
        },
      });
      sessionRef.current = session;

      const inputContext = new AudioContext();
      inputContextRef.current = inputContext;
      await inputContext.resume();
      const source = inputContext.createMediaStreamSource(stream);
      const processor = inputContext.createScriptProcessor(4096, 1, 1);
      const silentGain = inputContext.createGain();
      silentGain.gain.value = 0;
      processorRef.current = processor;
      source.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(inputContext.destination);
      processor.onaudioprocess = (event) => {
        if (mutedRef.current || !sessionRef.current) return;
        const samples = event.inputBuffer.getChannelData(0);
        sessionRef.current.sendRealtimeInput({
          audio: {
            data: pcmToBase64(resample(samples, inputContext.sampleRate, 16000)),
            mimeType: "audio/pcm;rate=16000",
          },
        });
      };

      setStatus("active");
      setOpen(false);
      session.sendRealtimeInput({
        text: "The visitor has deliberately started the voice conversation. Speak your opening now.",
      });
    } catch (caught) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setError(caught instanceof Error ? caught.message : "The voice connection could not start.");
      setStatus("error");
      setOpen(true);
    }
  }, [handleMessage, pathname]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (next) sessionRef.current?.sendRealtimeInput({ audioStreamEnd: true });
  };

  // Paid-traffic conversion pages: the floating launcher lands on the primary
  // CTA on phones, and these pages never introduce Adel. Keep them clean.
  if (isConversionRoute(pathname)) return null;

  if (status === "active") {
    return (
      <div className="adel-active-bar" role="status" aria-live="polite">
        <span className={`adel-live-dot ${speaking ? "speaking" : ""}`} />
        <div>
          <strong>{speaking ? "Adel is speaking…" : muted ? "Microphone muted" : "Adel is listening…"}</strong>
          <small>Platform voice guide</small>
        </div>
        <button
          type="button"
          className="adel-control"
          onClick={toggleMute}
          aria-label={muted ? "Unmute microphone" : "Mute microphone"}
        >
          <VoiceGlyph muted={muted} />
          <span>{muted ? "Unmute" : "Mute"}</span>
        </button>
        <button type="button" className="adel-end" onClick={() => void teardown(true)}>
          End
        </button>
      </div>
    );
  }

  return (
    <>
      {open && (
        <section className="adel-panel" aria-label="Adel platform voice guide">
          <header>
            <div className="adel-avatar" aria-hidden="true">
              A
            </div>
            <div>
              <strong>Adel</strong>
              <span>
                <i /> Platform voice guide
              </span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Adel">
              ×
            </button>
          </header>
          <div className="adel-panel-body">
            <h2>
              Ask how the
              <br />
              business runs.
            </h2>
            <p className="adel-intro">
              Adel walks the business components — capture, convert, commerce and retain — then
              opens /features or the demo that proves the point.
            </p>
            <div className="adel-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
              <VoiceGlyph />
            </div>
            {error && <p className="adel-error">{error}</p>}
            <button
              type="button"
              className="adel-start"
              onClick={() => void start()}
              disabled={status === "connecting"}
            >
              {status === "connecting" ? (
                <>
                  <i /> Connecting securely…
                </>
              ) : (
                <>
                  <VoiceGlyph /> Start voice conversation
                </>
              )}
            </button>
            <p className="adel-privacy">
              By starting, you consent to live audio processing for this conversation.{" "}
              <a href="/privacy">Privacy</a>
            </p>
          </div>
        </section>
      )}
      {!open && (
        <button
          type="button"
          className="adel-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open Adel, your platform voice guide"
        >
          <span className="adel-launcher-icon">
            <VoiceGlyph />
          </span>
          <span>
            <strong>Adel</strong>
            <small>Platform voice guide</small>
          </span>
        </button>
      )}
    </>
  );
}
