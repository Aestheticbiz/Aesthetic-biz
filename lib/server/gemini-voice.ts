import { GoogleGenAI } from "@google/genai";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, max-age=0",
};

export async function handleGeminiVoiceToken(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...JSON_HEADERS, allow: "POST" },
    });
  }

  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(request.url).origin;
  if (origin && origin !== expectedOrigin) {
    return new Response(JSON.stringify({ error: "Origin not allowed." }), {
      status: 403,
      headers: JSON_HEADERS,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "Adel is awaiting her Gemini connection. Add GEMINI_API_KEY to the environment.",
        code: "VOICE_NOT_CONFIGURED",
      }),
      { status: 503, headers: JSON_HEADERS },
    );
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { apiVersion: "v1alpha" },
    });

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(),
        httpOptions: { apiVersion: "v1alpha" },
      },
    });

    return new Response(
      JSON.stringify({
        token: token.name,
        model: "gemini-3.1-flash-live-preview",
        apiVersion: "v1alpha",
      }),
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    console.error("Gemini voice token error", error);
    return new Response(
      JSON.stringify({
        error: "The voice connection could not be prepared. Please try again.",
        code: "VOICE_TOKEN_FAILED",
      }),
      { status: 502, headers: JSON_HEADERS },
    );
  }
}
