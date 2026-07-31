"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  applyBrandTheme,
  DEFAULT_BRAND_THEME,
  loadBrandTheme,
  saveBrandTheme,
  type BrandTheme,
} from "@/lib/brand-theme";

type BrandContextValue = {
  theme: BrandTheme;
  setTheme: (next: BrandTheme | ((prev: BrandTheme) => BrandTheme)) => void;
  resetTheme: () => void;
  ready: boolean;
};

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<BrandTheme>(DEFAULT_BRAND_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadBrandTheme();
    setThemeState(loaded);
    applyBrandTheme(loaded);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyBrandTheme(theme);
    saveBrandTheme(theme);
  }, [theme, ready]);

  const setTheme: BrandContextValue["setTheme"] = (next) => {
    setThemeState((prev) => (typeof next === "function" ? next(prev) : next));
  };

  const resetTheme = () => setThemeState(DEFAULT_BRAND_THEME);

  return (
    <BrandContext.Provider value={{ theme, setTheme, resetTheme, ready }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
