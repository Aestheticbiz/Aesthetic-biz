"use client";

import Image from "next/image";
import { useBrand } from "@/lib/brand-context";
import { SITE } from "@/lib/site";

export function BrandLogoLockup({ as = "div" }: { as?: "div" | "span" }) {
  const { theme } = useBrand();
  const name = theme.clinicName.trim() || SITE.name;
  const Tag = as;

  /**
   * Show the AestheticBiz logo only when the visitor has not branded the demo
   * in the customizer — their upload or their clinic name always wins.
   *
   * This lockup sits in the footer, which is navy (.site-footer), so it uses
   * the light artwork. The navy logo is for the white header.
   */
  const showOwnLogo = !theme.logoDataUrl && !theme.clinicName.trim();

  return (
    <Tag className="footer-brand-lockup">
      {theme.logoDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={theme.logoDataUrl} alt={name} className="logo-image" />
      ) : showOwnLogo ? (
        <Image
          className="logo-image"
          src="/aestheticbiz-logo-transparent.png"
          alt={SITE.name}
          width={1456}
          height={343}
        />
      ) : (
        <div className="logo-main">{name}</div>
      )}
      {/* The artwork already reads "Aesthetic and Wellness" — don't repeat it. */}
      {!showOwnLogo && <div className="logo-sub">{SITE.tagline}</div>}
    </Tag>
  );
}
