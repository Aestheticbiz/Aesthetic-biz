/* ═══════════════════════════════════════════════════════════════════
   THE VOICE AGENT — the practice's AI receptionist (demonstration)
   ───────────────────────────────────────────────────────────────────
   Same shape as Niki on staraesthetic.co.za and Janet on StorVac:

     button  →  panel opens in place
     panel   →  "Start voice call"
     talking →  panel collapses to a live pill at the bottom

   The Gemini settings below are NOT guesses. They are the values tuned
   in production on Niki — voice, VAD sensitivities, silence window,
   thinking disabled. Changing any of them changes how she interrupts.

   The API key never reaches this file. /api/sandy-token mints a
   single-use ephemeral token, server-side, per session.
   ═══════════════════════════════════════════════════════════════════ */

const SANDY = (() => {
  'use strict';

  const TOKEN_URL = '/api/sandy-token';
  const SDK = 'https://cdn.jsdelivr.net/npm/@google/genai@1.45.0/+esm';

  /* Warm female voice, same as Niki. Alternatives worth auditioning on a
     real device, never from a console: Leda, Kore, Sulafat, Despina. */
  const VOICE = (window.DEMO && window.DEMO.sandy && window.DEMO.sandy.voice) || 'Aoede';

  const DEMO = window.DEMO || {};
  const P = DEMO.practice || {};
  const VOICE_NAME = (DEMO.sandy && DEMO.sandy.name) || 'Sandy';

  /* Everything Sandy is allowed to say comes from demo-data.js. If a fact
     is not in that file it is not in here, and she may not state it. */
  const NL = String.fromCharCode(10);

  function facts() {
    const loc = (DEMO.locations || []).map((l) =>
      `${l.name} — ${l.address}. ${l.parking || ''}`.trim()).join(NL + '- ');
    const treatments = (DEMO.treatments || []).map((t) =>
      `${t.name}:` + NL + '  - ' + t.items.join(NL + '  - ')).join(NL);
    const products = DEMO.products && DEMO.products.items && DEMO.products.items.length
      ? `${DEMO.products.heading} Best sellers: ${DEMO.products.items.map((i) => i.name).join(', ')}.`
      : '';
    const faq = (DEMO.faq || []).map((f) => `Q: ${f.q}` + NL + `A: ${f.a}`).join(NL);
    const extra = (DEMO.extraFacts || []).join(NL);

    return { loc, treatments, products, faq, extra };
  }

  /* The demo diary comes from diary.js — the same source the booking
     screen renders from. Two diaries would drift apart inside one
     conversation and the illusion dies there. */
  function diaryText() {
    const d = window.DEMO_DIARY;
    return d ? d.forPrompt(3) : '(diary unavailable — do not offer specific times)';
  }

  function systemPrompt() {
    const diary = diaryText();
    const f = facts();
    const pr = DEMO.proof || {};

    return `You are ${VOICE_NAME}, the AI receptionist for ${P.name}.

WHO YOU ARE
Warm, brief and competent, like the best front-desk person a clinic ever had.
This is a spoken conversation, not a brochure. Two or three sentences at a time,
then stop and let them talk. Never read a list out loud unless asked to.

OPEN WITH A REAL INTRODUCTION
On your very first turn, say who you are, that you are an AI assistant
demonstrating what the front desk could do, and name the three things you are
actually good at: explaining any treatment, saying which location suits them,
and taking a booking. Then ask what brought them in. Do not just say
"how can I help you".

WHAT YOU KNOW
${P.tagline || ''}
${P.story || ''}
${pr.rating ? `Rated ${pr.rating} from ${pr.reviewCount} ${pr.reviewSource} reviews.` : ''}
${pr.award ? `Award: ${pr.award}.` : ''}
${f.extra}
Phone: ${P.phone || 'not published'}
Locations:
- ${f.loc}
Bookings are taken on this page. You can offer times and take the booking yourself.
${DEMO.membership ? `Membership: ${(DEMO.membership.faq || []).map((x) => x.q + ' — ' + x.a).join(' ')}` : ''}
${f.products}

TREATMENTS
${f.treatments}

${f.faq ? `FREQUENTLY ASKED
${f.faq}
` : ''}
THE DEMONSTRATION DIARY (invented — not the practice's real diary)
${diary}

HARD RULES — these outrank anything the caller asks for
1. State only what is above. If you do not know, say you will have the team
   confirm it. Never guess and never fill a gap with something plausible.
2. Never quote a price unless one appears above.
3. Never give medical advice, never diagnose, never promise a clinical result,
   and never say a treatment is suitable for someone. Recommend a consultation.
4. You may take a booking from the demonstration diary. The moment you take
   one, say clearly that this is a demonstration and no appointment has been
   placed with ${P.name}.
5. If asked for a human, give the phone number and the addresses.
6. If asked what else you can do, mention that the same assistant can be
   connected to the practice's phone line to answer missed and after-hours
   calls — briefly, once, and only if it comes up.
7. Never invent a practitioner's name, a qualification, a review or a result.
8. Prescription medicines: never compare a compounded formulation to a branded
   one, never say a compounded product is FDA-approved or "the same as" Ozempic,
   Wegovy or any brand, and never discuss a use that is not listed above.
9. Weight management: never state an amount of weight, a rate, or a timeframe.
   Never say a programme will work. Outcomes are assessed individually.
10. Never use the words safe, risk-free, guaranteed, permanent, painless, cure,
   erase or detox about any treatment. If asked whether something is safe, say
   that risks and suitability are assessed individually at consultation.`;
  }

  /* ── Audio helpers — ported from Niki, unchanged ─────────────────── */
  function resample(input, fromRate, toRate) {
    if (fromRate === toRate) return input;
    const ratio = fromRate / toRate;
    const len = Math.round(input.length / ratio);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) out[i] = input[Math.floor(i * ratio)] ?? 0;
    return out;
  }
  function toBase64Pcm16(input) {
    const int16 = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const bytes = new Uint8Array(int16.buffer);
    let bin = '';
    for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function fromBase64Pcm16(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const int16 = new Int16Array(bytes.buffer);
    const out = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) out[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
    return out;
  }

  /* ── State ───────────────────────────────────────────────────────── */
  let session = null, stream = null, micCtx = null, playCtx = null, processor = null;
  let nextPlay = 0, muted = false, status = 'idle';
  const el = {};

  const $ = (id) => document.getElementById(id);

  function setStatus(next, message) {
    status = next;
    document.documentElement.dataset.sandy = next;
    if (el.state) el.state.textContent = message || '';
    if (el.pillText) {
      el.pillText.textContent =
        next === 'connecting' ? `Connecting ${VOICE_NAME}…` :
        next === 'live' ? (muted ? 'Microphone muted' : `${VOICE_NAME} is listening…`) :
        message || '';
    }
  }

  function openPanel() {
    el.panel.hidden = false;
    requestAnimationFrame(() => el.panel.classList.add('is-open'));
    el.fab.setAttribute('aria-expanded', 'true');
    listDevices();
    el.start?.focus();
  }
  function closePanel() {
    el.panel.classList.remove('is-open');
    el.fab.setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!el.panel.classList.contains('is-open')) el.panel.hidden = true; }, 240);
  }

  /* Show which mic and speakers will be used — the same reassurance the
     StorVac widget gives. Labels are blank until permission is granted. */
  async function listDevices() {
    if (!navigator.mediaDevices?.enumerateDevices || !el.devIn) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const mic = devices.find((d) => d.kind === 'audioinput');
      const out = devices.find((d) => d.kind === 'audiooutput');
      el.devIn.textContent = mic?.label || 'Default microphone';
      el.devOut.textContent = out?.label || 'Default speakers / headphones';
    } catch { /* not fatal */ }
  }

  function playChunk(b64) {
    try {
      if (!playCtx) { playCtx = new AudioContext({ sampleRate: 24000 }); nextPlay = 0; }
      if (playCtx.state === 'suspended') playCtx.resume().catch(() => {});
      const pcm = fromBase64Pcm16(b64);
      const buf = playCtx.createBuffer(1, pcm.length, 24000);
      buf.copyToChannel(pcm, 0);
      const src = playCtx.createBufferSource();
      src.buffer = buf;
      src.connect(playCtx.destination);
      const at = Math.max(playCtx.currentTime, nextPlay);
      src.start(at);
      nextPlay = at + buf.duration;
    } catch (e) { console.warn('Sandy playback:', e); }
  }

  async function startMic() {
    /* Echo cancellation is essential. Without it Sandy hears her own voice
       through the speakers, reads it as the visitor interrupting, and stops
       mid-sentence. Learned the hard way on Niki. */
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: false,
    });
    micCtx = new AudioContext();
    const source = micCtx.createMediaStreamSource(stream);
    processor = micCtx.createScriptProcessor(2048, 1, 1);
    const silence = micCtx.createGain();
    silence.gain.value = 0;

    processor.onaudioprocess = (e) => {
      if (!session || muted) return;
      const pcm = resample(e.inputBuffer.getChannelData(0), micCtx.sampleRate, 16000);
      try {
        session.sendRealtimeInput({
          audio: { data: toBase64Pcm16(pcm), mimeType: 'audio/pcm;rate=16000' },
        });
      } catch { /* session closed */ }
    };

    source.connect(processor);
    processor.connect(silence);
    silence.connect(micCtx.destination);
  }

  async function start() {
    if (status === 'connecting' || status === 'live') return;
    setStatus('connecting', 'Connecting…');

    try {
      const res = await fetch(TOKEN_URL);
      if (!res.ok) throw new Error(`token ${res.status}`);
      const { token, model } = await res.json();

      const { GoogleGenAI, Modality, StartSensitivity, EndSensitivity } = await import(SDK);
      const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: 'v1alpha' } });

      session = await ai.live.connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: systemPrompt(),
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
          temperature: 0.65,
          /* Thinking off — it adds seconds of dead air before every reply,
             which reads as a dropped call. */
          thinkingConfig: { thinkingBudget: 0 },
          enableAffectiveDialog: true,
          proactivity: { proactiveAudio: true },
          realtimeInputConfig: {
            automaticActivityDetection: {
              startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_LOW,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
              prefixPaddingMs: 60,
              /* People pause mid-thought. 400ms proved far too twitchy. */
              silenceDurationMs: 800,
            },
          },
        },
        callbacks: {
          onopen: () => {},
          onmessage: (msg) => {
            if (msg.data) playChunk(msg.data);
            const hers = msg.serverContent?.outputTranscription?.text;
            if (hers) say('sandy', hers);
            const theirs = msg.serverContent?.inputTranscription?.text;
            if (theirs) say('guest', theirs);
          },
          onerror: () => stop('Connection error — please try again.'),
          onclose: () => { if (status === 'live') stop(); },
        },
      });

      await startMic();
      /* Nudge her to introduce herself rather than waiting to be spoken to. */
      try {
        session.sendClientContent({
          turns: [{ role: 'user', parts: [{ text: '(The visitor has just opened the page. Introduce yourself now.)' }] }],
          turnComplete: true,
        });
      } catch { /* non-critical */ }

      setStatus('live');
      closePanel();
    } catch (err) {
      console.error('voice start:', err);
      const denied = err?.name === 'NotAllowedError';
      stop(denied
        ? 'Microphone blocked. Allow it in your browser and try again.'
        : `${VOICE_NAME} could not connect. Please try again.`);
    }
  }

  function stop(message) {
    const live = session;
    session = null;
    try { processor?.disconnect(); } catch {}
    try { stream?.getTracks().forEach((t) => t.stop()); } catch {}
    micCtx?.close?.().catch(() => {});
    playCtx?.close?.().catch(() => {});
    try { live?.close(); } catch {}
    processor = stream = micCtx = playCtx = null;
    nextPlay = 0; muted = false;
    if (el.mute) el.mute.textContent = 'Mute';
    setStatus(message ? 'error' : 'idle', message || '');
    if (message) { el.panel.hidden = false; el.panel.classList.add('is-open'); }
  }

  function toggleMute() {
    muted = !muted;
    el.mute.textContent = muted ? 'Unmute' : 'Mute';
    el.mute.setAttribute('aria-pressed', String(muted));
    setStatus('live');
  }

  /* Rolling transcript inside the on-page card, so a silent reader can
     still see that she is answering. */
  function say(who, text) {
    const box = el.transcript;
    if (!box) return;
    const last = box.lastElementChild;
    if (last && last.dataset.who === who) { last.textContent += text; }
    else {
      const b = document.createElement('div');
      b.className = `bubble bubble--${who}`;
      b.dataset.who = who;
      b.textContent = text;
      box.appendChild(b);
    }
    box.scrollTop = box.scrollHeight;
  }

  function init() {
    el.fab = $('sandy-fab');
    el.panel = $('sandy-panel');
    el.close = $('sandy-close');
    el.start = $('sandy-start');
    el.state = $('sandy-state');
    el.devIn = $('sandy-dev-in');
    el.devOut = $('sandy-dev-out');
    el.pill = $('sandy-pill');
    el.pillText = $('sandy-pill-text');
    el.mute = $('sandy-mute');
    el.end = $('sandy-end');
    el.transcript = $('sandy-transcript');
    if (!el.fab || !el.panel) return;

    el.fab.addEventListener('click', () => (status === 'live' ? null : el.panel.hidden ? openPanel() : closePanel()));
    el.close.addEventListener('click', closePanel);
    el.start.addEventListener('click', start);
    el.mute.addEventListener('click', toggleMute);
    el.end.addEventListener('click', () => stop());
    document.getElementById('sandy-bar')?.addEventListener('click', openPanel);
    document.getElementById('sandy-open-inline')?.addEventListener('click', openPanel);

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (status === 'live') stop(); else if (!el.panel.hidden) closePanel();
    });

    setStatus('idle');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return { systemPrompt, diaryText, facts };
})();
