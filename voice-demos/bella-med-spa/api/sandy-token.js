/**
 * GET /api/sandy-token   (Vercel serverless function, Node runtime)
 *
 * Issues a SHORT-LIVED, SINGLE-USE ephemeral token so the browser can open a
 * Gemini Live session. GEMINI_API_KEY never leaves the server. Even if the
 * ephemeral token is intercepted it is close to useless: one use, one pinned
 * model, the session must start within 60 seconds, and it dies after 30 minutes.
 *
 * Same approach as Niki's /api/gemini-token on staraesthetic.co.za, with one
 * addition: liveConnectConstraints pins the model, which Adel's version on
 * aestheticbiz does not do. Do not "simplify" this by shipping the real key
 * to the page.
 */
import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';

/* Crude per-instance throttle. Vercel may run several instances, so this is a
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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (tooMany(ip)) return res.status(429).json({ error: 'Too many requests' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'Voice is not configured. Add GEMINI_API_KEY to the project environment.',
      code: 'VOICE_NOT_CONFIGURED',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: 'v1alpha' } });
    const now = Date.now();

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        newSessionExpireTime: new Date(now + 60_000).toISOString(),
        expireTime: new Date(now + 30 * 60_000).toISOString(),
        liveConnectConstraints: { model: MODEL },
        httpOptions: { apiVersion: 'v1alpha' },
      },
    });

    return res.status(200).json({ token: token.name, model: MODEL });
  } catch (err) {
    console.error('sandy-token error:', err);
    return res.status(502).json({ error: 'Could not create session token' });
  }
}
