"use client";

import { useRef, useState } from "react";
import { BRAND_FONTS } from "@/lib/brand-theme";
import { useBrand } from "@/lib/brand-context";

const MAX_LOGO_BYTES = 900_000;

export function BrandCustomizer() {
  const { theme, setTheme, resetTheme } = useBrand();
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function onLogo(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG or JPG).");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      alert("Logo must be under 900KB for this demo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setTheme((t) => ({ ...t, logoDataUrl: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <button
        type="button"
        className="brand-launcher"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        Make it yours
      </button>

      {open ? (
        <div className="brand-panel-root" role="dialog" aria-label="Brand customizer">
          <button
            type="button"
            className="brand-panel-backdrop"
            aria-label="Close customizer"
            onClick={() => setOpen(false)}
          />
          <aside className="brand-panel">
            <header className="brand-panel-head">
              <div>
                <p className="brand-panel-kicker">Demo playground</p>
                <h2>Make this your clinic</h2>
                <p className="brand-panel-sub">
                  Colour, logo, and type — stay 20 minutes and feel the platform as yours.
                </p>
              </div>
              <button type="button" className="brand-panel-close" onClick={() => setOpen(false)}>
                ×
              </button>
            </header>

            <div className="brand-panel-body">
              <label className="brand-field">
                <span>Clinic name</span>
                <input
                  type="text"
                  value={theme.clinicName}
                  placeholder="e.g. Lumina Aesthetics"
                  onChange={(e) => setTheme((t) => ({ ...t, clinicName: e.target.value }))}
                />
              </label>

              <label className="brand-field">
                <span>Brand colour</span>
                <div className="brand-color-row">
                  <input
                    type="color"
                    value={theme.primary}
                    onChange={(e) => setTheme((t) => ({ ...t, primary: e.target.value }))}
                    aria-label="Pick brand colour"
                  />
                  <input
                    type="text"
                    value={theme.primary}
                    onChange={(e) => setTheme((t) => ({ ...t, primary: e.target.value }))}
                    spellCheck={false}
                  />
                </div>
              </label>

              <fieldset className="brand-field">
                <legend>Typeface</legend>
                <div className="brand-font-grid">
                  {BRAND_FONTS.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      className={theme.fontId === font.id ? "active" : undefined}
                      onClick={() => setTheme((t) => ({ ...t, fontId: font.id }))}
                      style={{ fontFamily: font.display }}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="brand-field">
                <span>Logo</span>
                <div className="brand-logo-row">
                  {theme.logoDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={theme.logoDataUrl} alt="Your logo preview" className="brand-logo-preview" />
                  ) : (
                    <div className="brand-logo-empty">No logo yet</div>
                  )}
                  <div className="brand-logo-actions">
                    <button type="button" className="btn btn-navy btn-sm" onClick={() => fileRef.current?.click()}>
                      Upload logo
                    </button>
                    {theme.logoDataUrl ? (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setTheme((t) => ({ ...t, logoDataUrl: null }))}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      onLogo(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </div>
              </div>
            </div>

            <footer className="brand-panel-foot">
              <button type="button" className="btn btn-ghost btn-sm" onClick={resetTheme}>
                Reset demo brand
              </button>
              <button type="button" className="btn btn-navy btn-sm" onClick={() => setOpen(false)}>
                Done — explore site
              </button>
            </footer>
          </aside>
        </div>
      ) : null}
    </>
  );
}
