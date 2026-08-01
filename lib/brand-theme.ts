export const BRAND_STORAGE_KEY = "aestheticbiz-brand-theme-v1";

export const BRAND_FONTS = [
  {
    id: "editorial",
    label: "Editorial",
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"Outfit", system-ui, sans-serif',
    google:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "modern",
    label: "Modern Sans",
    display: '"DM Sans", system-ui, sans-serif',
    body: '"DM Sans", system-ui, sans-serif',
    google:
      "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap",
  },
  {
    id: "classic",
    label: "Classic Serif",
    display: '"Libre Baskerville", Georgia, serif',
    body: '"Source Sans 3", system-ui, sans-serif',
    google:
      "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "soft",
    label: "Soft Spa",
    display: '"Fraunces", Georgia, serif',
    body: '"Nunito Sans", system-ui, sans-serif',
    google:
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito+Sans:wght@300;400;500;600;700&display=swap",
  },
] as const;

export type BrandFontId = (typeof BRAND_FONTS)[number]["id"];

export type BrandTheme = {
  primary: string;
  logoDataUrl: string | null;
  clinicName: string;
  fontId: BrandFontId;
};

export const DEFAULT_BRAND_THEME: BrandTheme = {
  primary: "#0F2647",
  logoDataUrl: null,
  clinicName: "",
  fontId: "editorial",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Derive navy / gold-adjacent accents from one primary brand colour. */
export function deriveBrandPalette(hex: string) {
  const raw = hex.replace("#", "").trim();
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw.padEnd(6, "0").slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16) || 15;
  const g = parseInt(full.slice(2, 4), 16) || 38;
  const b = parseInt(full.slice(4, 6), 16) || 71;

  const mix = (tr: number, tg: number, tb: number, t: number) => {
    const rr = Math.round(r + (tr - r) * t);
    const gg = Math.round(g + (tg - g) * t);
    const bb = Math.round(b + (tb - b) * t);
    return `#${[rr, gg, bb].map((x) => clamp(x, 0, 255).toString(16).padStart(2, "0")).join("")}`;
  };

  const mid = mix(clamp(r + 40, 0, 255), clamp(g + 40, 0, 255), clamp(b + 50, 0, 255), 0.35);
  // Accent can lean toward brand; gold stays warm metal — never mixed into navy
  // (mixing gold with primary made CTAs/type look trapped under blue).
  const accent = mix(147, 158, 186, 0.35);

  return {
    navy: `#${full}`,
    navyMid: mid,
    accent,
    gold: "#C8A882",
    goldDark: "#A8896A",
  };
}

export function getFont(fontId: BrandFontId) {
  return BRAND_FONTS.find((f) => f.id === fontId) ?? BRAND_FONTS[0];
}

export function applyBrandTheme(theme: BrandTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const palette = deriveBrandPalette(theme.primary);
  const font = getFont(theme.fontId);

  root.style.setProperty("--navy", palette.navy);
  root.style.setProperty("--navy-mid", palette.navyMid);
  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--gold", palette.gold);
  root.style.setProperty("--gold-dark", palette.goldDark);
  root.style.setProperty("--font-display", font.display);
  root.style.setProperty("--font-body", font.body);

  let link = document.getElementById("brand-font-link") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = "brand-font-link";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== font.google) link.href = font.google;
}

export function loadBrandTheme(): BrandTheme {
  if (typeof window === "undefined") return DEFAULT_BRAND_THEME;
  try {
    const raw = localStorage.getItem(BRAND_STORAGE_KEY);
    if (!raw) return DEFAULT_BRAND_THEME;
    const parsed = JSON.parse(raw) as Partial<BrandTheme>;
    const fontOk = BRAND_FONTS.some((f) => f.id === parsed.fontId);
    return {
      primary: typeof parsed.primary === "string" ? parsed.primary : DEFAULT_BRAND_THEME.primary,
      logoDataUrl: typeof parsed.logoDataUrl === "string" ? parsed.logoDataUrl : null,
      clinicName: typeof parsed.clinicName === "string" ? parsed.clinicName : "",
      fontId: fontOk ? (parsed.fontId as BrandFontId) : DEFAULT_BRAND_THEME.fontId,
    };
  } catch {
    return DEFAULT_BRAND_THEME;
  }
}

export function saveBrandTheme(theme: BrandTheme) {
  localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(theme));
}
