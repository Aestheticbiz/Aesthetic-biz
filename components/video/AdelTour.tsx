"use client";

import { useEffect } from "react";
import type { LiveServerMessage, Session } from "@google/genai";
import { TOUR, TOUR_INSTRUCTION, type TourCut } from "@/lib/tour";

/**
 * Adel's narrated video tour of /site-info (video mode only). Copied from
 * DebtReliefBiz (tdrg/components/SandyTour.tsx); the recorder in
 * crmsolutions/scripts/video/record-tour.mjs reads `window.__sandyTour`, so the
 * name stays, whatever the agent is called.
 *
 * As the page loads, Adel's session opens and she says line 1 into a buffer;
 * `window.__sandyTour.ready` turns true once it is buffered. The recorder then
 * fires `window.dispatchEvent(new Event("sandy:tour"))` (or "tour:start"); no click and no
 * microphone are needed. Her first word plays LEAD_IN seconds later, and the
 * rest follows one line at a time from lib/tour.ts, the page easing to each
 * line's scene as she starts it. Same Gemini Live engine and one-use token as
 * components/adel-voice-guide.tsx, AestheticBiz's own key.
 *
 * Audio tap for the recorder (headless capture cannot record sound): every
 * PCM chunk Adel sends is kept in `window.__sandyTour`, timed on the
 * playback timeline. Nothing is sent anywhere; it only sits in the page.
 *   { ready, cut, rate, chunks: [{ at, b64 }], lines: [{ section, startedAt, said }], sync: [{ ctx, wall }], running, done, error }
 * `sync` lines the audio up with the picture: one entry once the AudioContext
 * clock is running and one as each line starts playing, pairing the playback
 * clock (`ctx`, seconds) with Date.now() / 1000 (`wall`).
 * `done` turns true CLOSING_HOLD seconds after her last word, so the closing
 * scene (the web address) is on screen for at least that long.
 * `at` / `startedAt` are seconds on the playback clock (when the audio is
 * scheduled to play). If the browser keeps audio suspended (no autoplay), the
 * clock runs on performance.now() and nothing is audible, but the timings and
 * chunks are the same, so the recording can still be muxed.
 */

const ADEL_VOICE = "Aoede"; // the same voice as components/adel-voice-guide.tsx
const RATE = 24000;
const LEAD_IN = 0.8; // seconds of opening scene before her first word
const CLOSING_HOLD = 7; // seconds after her last word before `done`: the closing card (address, name, number) must be fully up for 4 s or more
const SCROLL_LEAD = 0.6; // seconds the page starts easing to a scene before her first word on it
const LINE_GAP = 0.35; // seconds of breath between lines
const SCROLL_MS = 1400;
const LINE_TIMEOUT_MS = 15000; // no audio for a line this long: ask once more, then move on

type Tap = {
  ready: boolean;
  cut: TourCut;
  rate: number;
  chunks: { at: number; b64: string }[];
  lines: { section: string; startedAt: number; said: string }[];
  sync: { ctx: number; wall: number }[];
  running: boolean;
  done: boolean;
  error?: string;
};
declare global {
  interface Window { __sandyTour?: Tap }
}

function fromB64(b64: string) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const int16 = new Int16Array(bytes.buffer, 0, bytes.length >> 1);
  const out = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) out[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
  return out;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Eases the page so the scene sits in view: a full-screen scene flush with the top, anything else centred. */
function easeTo(id: string) {
  const el = document.getElementById(`tour-${id}`);
  if (!el) return;
  document.querySelectorAll(".is-touring").forEach((x) => x !== el && x.classList.remove("is-touring"));
  el.classList.add("is-touring");
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const offset = el.hasAttribute("data-scene") ? 0 : r.height < vh * 0.9 ? (vh - r.height) / 2 : Math.min(32, vh * 0.04);
  const max = document.documentElement.scrollHeight - vh;
  const to = Math.max(0, Math.min(max, window.scrollY + r.top - offset));
  const from = window.scrollY;
  if (Math.abs(to - from) < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return void window.scrollTo(0, to);
  const t0 = performance.now();
  let landed = false;
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / SCROLL_MS);
    window.scrollTo(0, from + (to - from) * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else landed = true;
  };
  requestAnimationFrame(step);
  // A hidden or throttled tab pauses animation frames: land on the scene anyway.
  window.setTimeout(() => { if (!landed) window.scrollTo(0, to); }, SCROLL_MS + 150);
}

export function AdelTour({ cut }: { cut: TourCut }) {
  useEffect(() => {
    const script = TOUR[cut];
    const tap: Tap = { ready: false, cut, rate: RATE, chunks: [], lines: [], sync: [], running: false, done: false };
    window.__sandyTour = tap;

    let session: Session | null = null;
    let connecting: Promise<void> | null = null;
    let ctx: AudioContext | null = null;
    let audible = false;
    let started = false;
    let t0 = 0;
    let playHead = 0;
    let step = -1;
    let lineStarted = false;
    let lineDone = false; // the current line has all its audio
    let retried = false;
    let stopped = false;
    let pre: string[] = []; // line 1, buffered before the recorder starts the tour
    const said: string[] = []; // transcript per step
    const lineOf: number[] = []; // step → index in tap.lines
    const timers: number[] = [];
    const later = (fn: () => void, sec: number) => timers.push(window.setTimeout(fn, Math.max(0, sec) * 1000));
    const now = () => (audible && ctx ? ctx.currentTime : (performance.now() - t0) / 1000);
    const mark = () => tap.sync.push({ ctx: now(), wall: Date.now() / 1000 });

    const finish = (error?: string) => {
      if (stopped) return;
      stopped = true;
      if (error) tap.error = error;
      tap.running = false;
      tap.ready = true;
      tap.done = true;
      try { session?.close(); } catch {}
      window.dispatchEvent(new CustomEvent("tour:done", { detail: { error } }));
    };

    let watchdog = 0;
    const say = () => {
      try { session?.sendRealtimeInput({ text: `Say this now, exactly as written: "${script[step].words}"` }); } catch {}
    };
    const arm = () => {
      window.clearTimeout(watchdog);
      watchdog = window.setTimeout(() => {
        if (lineStarted || pre.length || stopped) return;
        if (!retried) { retried = true; say(); arm(); }
        else if (started) nextLine();
      }, LINE_TIMEOUT_MS);
    };
    const nextLine = () => {
      if (stopped) return;
      step += 1;
      if (step >= script.length) {
        // Done once the last word has played and the closing scene has held for CLOSING_HOLD.
        later(() => finish(), playHead - now() + CLOSING_HOLD);
        return;
      }
      lineStarted = false;
      lineDone = false;
      retried = false;
      say();
      arm();
    };
    /** Audio arrives faster than she speaks: hand over the next line just before this one ends. */
    const queueNext = () => later(nextLine, playHead - now() - 0.6);

    const schedule = (b64: string) => {
      const pcm = fromB64(b64);
      const dur = pcm.length / RATE;
      let at = Math.max(now() + 0.05, playHead);
      if (!lineStarted) {
        lineStarted = true;
        at = step === 0 ? now() + LEAD_IN : Math.max(now() + 0.05, playHead + LINE_GAP);
        const section = script[step].section;
        lineOf[step] = tap.lines.push({ section, startedAt: at, said: said[step] ?? "" }) - 1;
        later(() => { mark(); easeTo(section); }, at - now() - SCROLL_LEAD);
      }
      tap.chunks.push({ at, b64 });
      if (audible && ctx) {
        const buf = ctx.createBuffer(1, pcm.length, RATE);
        buf.copyToChannel(pcm, 0);
        const node = ctx.createBufferSource();
        node.buffer = buf;
        node.connect(ctx.destination);
        node.start(at);
      }
      playHead = at + dur;
    };

    const onAudio = (b64: string) => {
      if (stopped || step < 0 || step >= script.length) return;
      if (started) schedule(b64);
      else pre.push(b64);
    };

    /** Opens Adel's session as the page loads and has her say line 1 into a buffer, so the tour starts at once. */
    const connect = () =>
      (connecting ??= (async () => {
        try {
          const tok = await fetch("/api/gemini-voice-token", { method: "POST" });
          const { token, model, code } = await tok.json().catch(() => ({}));
          if (!token) return finish(code ?? `token ${tok.status}`);

          const { GoogleGenAI, Modality, ThinkingLevel } = await import("@google/genai");
          const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: "v1alpha" } });
          let ready: () => void = () => {};
          const setupDone = new Promise<void>((r) => (ready = r));

          const onMessage = (m: LiveServerMessage) => {
            if (m.setupComplete) ready();
            if (m.data) onAudio(m.data);
            const text = m.serverContent?.outputTranscription?.text;
            if (text && step >= 0 && step < script.length) {
              said[step] = (said[step] ?? "") + text;
              if (lineOf[step] !== undefined) tap.lines[lineOf[step]].said = said[step];
            }
            if (m.serverContent?.turnComplete && (lineStarted || pre.length)) {
              window.clearTimeout(watchdog);
              lineDone = true;
              if (started) queueNext();
              else tap.ready = true; // line 1 is buffered: the recorder can start
            }
          };

          session = await ai.live.connect({
            model,
            config: {
              responseModalities: [Modality.AUDIO],
              systemInstruction: TOUR_INSTRUCTION,
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: ADEL_VOICE } } },
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
              outputAudioTranscription: {},
            },
            callbacks: {
              onmessage: onMessage,
              onerror: () => finish("connection error"),
              onclose: () => { if (!stopped && step < script.length) finish("connection closed"); },
            },
          });
          await Promise.race([setupDone, new Promise((r) => setTimeout(r, 6000))]);
          nextLine();
        } catch (e) {
          finish(e instanceof Error ? e.message : "could not connect");
        }
      })());

    const start = async () => {
      if (tap.running || stopped) return;
      tap.running = true;
      try {
        // Rewind to the top so the recording always opens on the opening scene.
        window.scrollTo(0, 0);
        ctx = new AudioContext({ sampleRate: RATE });
        await Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 400))]);
        audible = ctx.state === "running";
        t0 = performance.now();
        // currentTime holds at 0 until the audio device starts: sync once the clock moves.
        for (let i = 0; audible && ctx.currentTime === 0 && i < 50; i++) await new Promise((r) => setTimeout(r, 20));
        mark();

        started = true;
        const buffered = pre;
        pre = [];
        buffered.forEach(schedule);
        if (lineDone) queueNext();
        void connect(); // already open when the page connected on load
      } catch (e) {
        finish(e instanceof Error ? e.message : "could not start");
      }
    };

    void connect();
    const onTour = () => void start();
    window.addEventListener("sandy:tour", onTour);
    window.addEventListener("tour:start", onTour);
    return () => {
      window.removeEventListener("sandy:tour", onTour);
      window.removeEventListener("tour:start", onTour);
      stopped = true;
      timers.forEach(clearTimeout);
      window.clearTimeout(watchdog);
      try { session?.close(); } catch {}
      ctx?.close().catch(() => {});
    };
  }, [cut]);

  return null;
}
