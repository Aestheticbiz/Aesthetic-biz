/**
 * GET /api/sandy-token
 *
 * Issues a SHORT-LIVED, SINGLE-USE ephemeral token so the browser can open a
 * Gemini Live session. GEMINI_API_KEY never leaves the server. Even if the
 * ephemeral token is intercepted it is close to useless: one use, one pinned
 * model, the session must start within 60 seconds, and it dies after 30 minutes.
 *
 * Same approach as Niki on staraesthetic.co.za — do not "simplify" this by
 * shipping the real key to the page.
 */
import { GoogleGenAI } from '@google/genai';

const SANDY_MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';

/* Crude in-memory throttle. Netlify may run several instances, so this is a
   speed bump against a scraper minting tokens in bulk, not a security control.
   The real protections are single-use tokens and the model pin above. */
const hits = new Map();
function tooMany(ip, max = 10, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { n: 1, reset: now + windowMs });
    return false;
  }
  rec.n += 1;
  return rec.n > max;
}

export default async (req, context) => {
  const ip =
    context?.ip ||
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';

  if (tooMany(ip)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Gemini API key not configured' }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: 'v1alpha' } });
    const now = Date.now();

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        newSessionExpireTime: new Date(now + 60_000).toISOString(),
        expireTime: new Date(now + 30 * 60_000).toISOString(),
        liveConnectConstraints: { model: SANDY_MODEL },
        httpOptions: { apiVersion: 'v1alpha' },
      },
    });

    return Response.json(
      { token: token.name, model: SANDY_MODEL },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('sandy-token error:', err);
    return Response.json({ error: 'Could not create session token' }, { status: 500 });
  }
};

export const config = { path: '/api/sandy-token' };
