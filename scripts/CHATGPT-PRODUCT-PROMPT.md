# ChatGPT script — AestheticBiz demo product (run 4×)

Copy everything below the line into ChatGPT. Change **PRODUCT NUMBER** each run (05, 06, 07, 08 — or 09+ if you want more). Paste the JSON reply back into the chat (or into `lib/catalog.ts`).

---

You are a medical-aesthetic copywriter for **AestheticBiz**, a Midtown Manhattan medical spa demo site (USD pricing). Write ONE retail skincare product as structured JSON only — no markdown fences, no commentary.

Rules:
- Brand name must be: `Demo Clinical`
- Product name: `Demo Product NN` (use the number I give)
- Slug: `demo-product-NN`
- SKU: `DEMO-NN`
- Price: integer USD between 34 and 95
- categoryTag: one of Cleanse | Brighten | Restore | Repair | Protect | Stimulate | Target
- step: one of Cleanse | Prevent & Restore | Protect | Stimulate | Target | Peel - Treatment
- Tone: clinical, confident, patient-friendly — NOT “AI demo”, NOT “lorem”, NOT mentioning other clinics or “cloned”
- US English
- shortDescription: 1–2 sentences HTML inside `<p>...</p>`
- benefits: exactly 4 short bullets
- description: 2–3 short HTML paragraphs in one string
- concerns: exactly 4 objects { concern, helps }
- timeline: exactly 3 objects { period, result } for 2 weeks / 4 weeks / 8 weeks
- miniFaqs: exactly 3 objects { question, answer }
- specs: Skin type, Main actives, Size, pH
- ingredients: exactly 4 objects { name, benefit }
- howToUse: one paragraph plain text (AM/PM)
- Do not invent real prescription drug claims; keep cosmeceutical-safe language

PRODUCT NUMBER: **05**

Return exactly this shape:

{
  "id": "prod-demo-05",
  "slug": "demo-product-05",
  "name": "Demo Product 05",
  "brand": "Demo Clinical",
  "brandSlug": "demo",
  "categoryTag": "",
  "step": "",
  "price": 0,
  "sku": "DEMO-05",
  "shortDescription": "<p></p>",
  "benefits": ["", "", "", ""],
  "description": "<p></p><p></p>",
  "concerns": [
    { "concern": "", "helps": "" },
    { "concern": "", "helps": "" },
    { "concern": "", "helps": "" },
    { "concern": "", "helps": "" }
  ],
  "timeline": [
    { "period": "2 weeks", "result": "" },
    { "period": "4 weeks", "result": "" },
    { "period": "8 weeks", "result": "" }
  ],
  "miniFaqs": [
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" }
  ],
  "specs": [
    { "label": "Skin type", "value": "" },
    { "label": "Main actives", "value": "" },
    { "label": "Size", "value": "30 ml / 1 fl oz" },
    { "label": "pH", "value": "" }
  ],
  "ingredients": [
    { "name": "", "benefit": "" },
    { "name": "", "benefit": "" },
    { "name": "", "benefit": "" },
    { "name": "", "benefit": "" }
  ],
  "howToUse": ""
}

---

## Image prompt (Grok / ChatGPT Images) — same product

After you have the JSON, generate a packshot:

> Photorealistic medical skincare product packshot on a cool stone slab, soft north light, shallow depth of field, white clinical bottle or tube labelled only “DEMO CLINICAL”, no readable brand logos of real companies, botanical accent out of focus, luxury medspa catalogue style, square 1:1, no text overlay, no watermark.

Save as `public/images/product-0N.jpg` and tell me — I’ll wire the path.
