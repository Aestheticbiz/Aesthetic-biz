"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useBrand } from "@/lib/brand-context";
import { SITE } from "@/lib/site";

const PATIENT_LINKS = [
  { href: "/treatments", label: "Treatments" },
  { href: "/shop", label: "Shop" },
  { href: "/book", label: "Book" },
  { href: "/reviews", label: "Reviews" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
] as const;

type SiteHeaderProps = {
  variant?: "patient" | "platform";
};

export function SiteHeader({ variant = "patient" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme } = useBrand();
  const brandName = theme.clinicName.trim() || SITE.name;

  const links =
    variant === "platform"
      ? [
          { href: "/", label: "Mockup" },
          { href: "/full-fee-patients", label: "For owners" },
          { href: "/financial", label: "Numbers" },
          { href: "/audit", label: "Audit" },
          { href: "/treatments", label: "Treatments" },
          { href: "/shop", label: "Shop" },
          { href: "/features", label: "Features" },
          { href: "/book-discovery", label: "Discovery" },
        ]
      : PATIENT_LINKS;

  return (
    <header className="site-header">
      <div className="shell">
        <Link className="logo" href="/" onClick={() => setOpen(false)}>
          {theme.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logoDataUrl} alt={brandName} className="logo-image" />
          ) : (
            <span className="logo-main">{brandName}</span>
          )}
          <span className="logo-sub">
            {variant === "platform" ? "Platform features" : SITE.tagline}
          </span>
        </Link>
        <nav
          className={`nav${open ? " open" : ""}`}
          id="mainNav"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active =
              link.href === pathname ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
                {link.href === "/cart" && cartCount > 0 ? (
                  <span className="cart-badge">{cartCount}</span>
                ) : null}
              </Link>
            );
          })}
          <Link
            className="btn btn-navy btn-sm"
            href={variant === "platform" ? "/" : "/book"}
            onClick={() => setOpen(false)}
          >
            {variant === "platform" ? "View site →" : "Book Now »"}
          </Link>
        </nav>
        <button
          className={`nav-toggle${open ? " open" : ""}`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
