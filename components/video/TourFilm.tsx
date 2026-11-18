import type { ReactNode } from "react";
import { AdelTour } from "@/components/video/AdelTour";
import { SceneObserver } from "@/components/video/SceneObserver";
import "./film.css";
import { TOUR, type TourCut } from "@/lib/tour";

/**
 * /site-info?video=1 — Adel's tour as one film (pattern from DebtReliefBiz,
 * tdrg/components/video/TourFilm.tsx). Every line of the cut is a full-screen
 * dark scene (data-scene): one big headline, one short line and ONE visual,
 * which is the real Midtown demo wherever it can be (captures from
 * scripts/capture-previews.mjs, prices blanked). No prices, no results, nothing
 * medical. Animations start when a scene is on screen (`is-on`, SceneObserver).
 * Colours: the engine block at the top of film.css; tokens only here.
 *
 * Without `narrated` (plain /site-info) the same scenes scroll as a static page.
 */

export function TourFilm({ cut, narrated = true }: { cut: TourCut; narrated?: boolean }) {
  const visits = new Set(TOUR[cut].map((l) => l.section));
  const scenes: Record<string, ReactNode> = {
    opening: <Opening key="opening" />,
    night: (
      <Scene key="night" id="night" title="11:40 PM. She's finally ready to book." line="Your front desk went home hours ago.">
        <AfterHours />
      </Scene>
    ),
    answers: (
      <Scene key="answers" id="answers" chip="Live on your website" title="Adel answers her, out loud." line="Any hour. Then books the free consultation.">
        <Phone src="/previews/m-home.webp" alt="The demo spa's home page on a phone">
          <AdelCall />
        </Phone>
      </Scene>
    ),
    book: (
      <Scene key="book" id="book" title="Booked on your own page." line="No third-party plugin. In your diary tonight.">
        <Phone src="/previews/m-book.webp" alt="The demo spa's booking page on a phone">
          <Toast d={1.2} top>✓ Free consultation booked · Thu 10:30 AM</Toast>
          <Toast d={2.6}>In your diary · 11:46 PM</Toast>
        </Phone>
      </Scene>
    ),
    shop: (
      <Scene key="shop" id="shop" title="Your skincare sells at midnight." line="From your own online shop.">
        <Phone src="/previews/m-shop.webp" alt="The demo spa's skincare shop on a phone">
          <Toast d={1.4}>✓ Order placed · Radiance Serum · 11:52 PM</Toast>
        </Phone>
      </Scene>
    ),
    points: (
      <Scene key="points" id="points" title="A reason to come back." line="Loyalty points on every visit and purchase, in your name.">
        <Phone src="/previews/m-rewards.webp" alt="The demo spa's loyalty points page on a phone">
          <Toast d={1.4}>★ Points earned · AestheticBiz Points</Toast>
        </Phone>
      </Scene>
    ),
    reviews: (
      <Scene key="reviews" id="reviews" chip="Demo · sample reviews" title="Reviews, written or on video." line="You approve each one before it goes live.">
        <Browser src="/previews/reviews.webp" alt="The demo spa's reviews page" url="midtown demo · Reviews">
          <Toast d={1.4}>New video review · waiting for your approval</Toast>
        </Browser>
      </Scene>
    ),
    calls: (
      <Scene key="calls" id="calls" chip="Can be added" title="Missed calls answered. Patients called back." line="So no inquiry ends in voicemail.">
        <Ringing />
      </Scene>
    ),
    next: (
      <Scene key="next" id="next" title="Your name. Your brand. Your colors." line="Booking and selling around the clock, without another front-desk hire.">
        <Browser src="/previews/customizer.webp" alt="The brand customizer re-theming the demo spa" url="your spa · brand" />
      </Scene>
    ),
    closing: <Closing key="closing" />,
  };

  const order = ["opening", "night", "answers", "book", "shop", "points", "reviews", "calls", "next", "closing"];
  return (
    <div data-video={cut} className="film">
      {narrated && <AdelTour cut={cut} />}
      <SceneObserver />
      {order.filter((s) => visits.has(s)).map((s) => scenes[s])}
    </div>
  );
}

/* ── Building blocks ─────────────────────────────────────────────── */

function Scene({ id, title, line, chip, children }: { id: string; title: string; line?: string; chip?: string; children: ReactNode }) {
  return (
    <section id={`tour-${id}`} data-scene className="film-scene">
      <div className="film-grid">
        <div className="film-copy">
          {chip && <p className="film-chip">{chip}</p>}
          <h2 className="film-title">{title}</h2>
          {line && <p className="film-line">{line}</p>}
        </div>
        <div className="film-visual">{children}</div>
      </div>
    </section>
  );
}

function Phone({ src, alt, children }: { src: string; alt: string; children?: ReactNode }) {
  return (
    <div className="film-phone">
      <div className="film-screen film-screen--pan">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
      {children}
    </div>
  );
}

function Browser({ src, alt, url, children }: { src: string; alt: string; url: string; children?: ReactNode }) {
  return (
    <div className="film-browser">
      <div className="film-browser-bar">
        <span /><span /><span />
        <em>{url}</em>
      </div>
      <div className="film-browser-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
      {children}
    </div>
  );
}

function Toast({ children, d, top = false }: { children: ReactNode; d: number; top?: boolean }) {
  return (
    <p className={`film-toast pop ${top ? "film-toast--top" : ""}`} style={{ ["--d" as string]: `${d}s` }}>
      {children}
    </p>
  );
}

function Wave({ label = "Adel is speaking" }: { label?: string }) {
  return (
    <span className="film-wave">
      <span className="film-orb" aria-hidden />
      <span className="film-bars" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}
      </span>
      {label}
    </span>
  );
}

/* Adel's live conversation over the real home page. Nothing medical: she hands that to the injector. */
function AdelCall() {
  return (
    <div className="film-call pop" style={{ ["--d" as string]: "0.6s" }}>
      <Wave />
      <p className="film-bubble film-bubble--caller pop" style={{ ["--d" as string]: "1.6s" }}>What happens at a lip filler consultation?</p>
      <p className="film-bubble pop" style={{ ["--d" as string]: "3s" }}>Your injector plans it with you first. Shall I book you a free one?</p>
    </div>
  );
}

/* 11:40 PM: the front desk is closed, the website is not. */
function AfterHours() {
  const rows: [string, string, boolean][] = [
    ["Front desk", "Closed since 6 PM", false],
    ["Spa phone", "Voicemail", false],
    ["Your website", "Adel is answering", true],
  ];
  return (
    <div className="film-board">
      <div className="film-board-head">
        <span>Your med spa · 11:40 PM</span>
        <span className="film-board-closed">After hours</span>
      </div>
      <ul className="film-board-rows">
        {rows.map(([k, v, on], i) => (
          <li key={k} className={`pop ${on ? "is-live" : ""}`} style={{ ["--d" as string]: `${0.4 + i * 0.7}s` }}>
            <span>{k}</span>
            {on ? <Wave label={v} /> : <em>{v}</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Can be added: the spa line rings, the front desk is busy, Adel picks up. */
function Ringing() {
  return (
    <div className="film-phone film-phone--call">
      <div className="film-callscreen">
        <p className="film-callscreen-k">Incoming call · your spa line</p>
        <div className="film-ring" aria-hidden><span /><span /><span /><b>☎</b></div>
        <p className="film-callscreen-n">New patient</p>
        <p className="film-step pop" style={{ ["--d" as string]: "0.9s" }}>Front desk busy</p>
        <p className="film-arrow pop" style={{ ["--d" as string]: "1.6s" }} aria-hidden>↓</p>
        <div className="pop" style={{ ["--d" as string]: "2.2s" }}><Wave label="Adel answers" /></div>
        <p className="film-step film-step--ok pop" style={{ ["--d" as string]: "3.4s" }}>✓ Consultation booked</p>
        <p className="film-step pop" style={{ ["--d" as string]: "4.4s" }}>↻ Call-backs to patients</p>
      </div>
    </div>
  );
}

function Opening() {
  return (
    <section id="tour-opening" data-scene className="film-scene film-opening is-on">
      <div className="film-backdrop" aria-hidden>
        <picture>
          <source media="(max-width: 767px)" srcSet="/previews/m-home.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/previews/home.webp" alt="" />
        </picture>
      </div>
      <div className="film-opening-inner">
        <p className="film-presents"><span aria-hidden />CRM Solutions presents</p>
        <div>
          <p className="film-clock" aria-label="11:40 PM">
            11<span className="film-colon">:</span>40 <small>PM</small>
          </p>
          <h1 className="film-hero">Picture a med spa that never stops booking.</h1>
        </div>
        <p className="film-demo-note">Midtown Manhattan Medical Spa · an AestheticBiz demo</p>
      </div>
    </section>
  );
}

/* WhatsApp glyph in the engine's accent (currentColor), beside the number. */
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-label="WhatsApp" role="img" className="film-close-wa">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

function Closing() {
  return (
    <section id="tour-closing" data-scene className="film-scene">
      {/* A video link can't be clicked: the address is the hero. All traffic goes to
          CRM Solutions; no aestheticbiz address here. International number: viewers are in the US. */}
      <div className="film-close">
        <h2 className="film-close-lead">Picture what that does to your month.</h2>
        <p className="film-close-url pop" style={{ ["--d" as string]: "0.2s" }}>crmsolutions.app/call</p>
        <p className="film-close-cta pop" style={{ ["--d" as string]: "0.5s" }}>Book a Discovery Call</p>
        <div className="film-close-person pop" style={{ ["--d" as string]: "0.8s" }}>
          <p className="film-close-name">Ignatius Ackermann</p>
          <p className="film-close-phone">
            <IconWhatsApp />
            +27 76 180 9799
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/crm-solutions-logo-reversed.svg" alt="CRM Solutions" width={350} height={96} className="film-close-logo pop" style={{ ["--d" as string]: "1.1s" }} />
      </div>
    </section>
  );
}
