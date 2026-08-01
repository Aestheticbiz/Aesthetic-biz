"use client";

import { useBrand } from "@/lib/brand-context";
import { SITE } from "@/lib/site";

export function BrandLivePreview() {
  const { theme } = useBrand();
  const name = theme.clinicName.trim() || SITE.name;

  return (
    <div className="brand-live-preview">
      <div className="brand-live-hero">
        <div className="brand-live-hero-inner">
          {theme.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logoDataUrl} alt={name} className="brand-live-logo" />
          ) : (
            <div className="brand-live-name">{name}</div>
          )}
          <p className="brand-live-tag">{SITE.tagline}</p>
          <h3 className="brand-live-headline">
            Reveal calm <em>clinical confidence.</em>
          </h3>
          <div className="brand-live-actions">
            <span className="btn btn-gold btn-sm">Book consultation</span>
            <span className="btn btn-outline btn-sm">View treatments</span>
          </div>
        </div>
      </div>
      <div className="brand-live-card">
        <p className="brand-live-card-kicker">Sample card</p>
        <h4>Lip Filler</h4>
        <p>From $450 · Earn {name} Points</p>
        <span className="btn btn-navy btn-sm">Read more</span>
      </div>
    </div>
  );
}
