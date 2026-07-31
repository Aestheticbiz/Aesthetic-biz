"use client";

import { useBrand } from "@/lib/brand-context";
import { SITE } from "@/lib/site";

export function BrandLogoLockup({ as = "div" }: { as?: "div" | "span" }) {
  const { theme } = useBrand();
  const name = theme.clinicName.trim() || SITE.name;
  const Tag = as;

  return (
    <Tag className="footer-brand-lockup">
      {theme.logoDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={theme.logoDataUrl} alt={name} className="logo-image" />
      ) : (
        <div className="logo-main">{name}</div>
      )}
      <div className="logo-sub">{SITE.tagline}</div>
    </Tag>
  );
}
