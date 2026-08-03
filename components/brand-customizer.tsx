"use client";

import Link from "next/link";

/** Floating entry → brand customizer page for curious clinic owners. */
export function BrandCustomizer() {
  return (
    <Link href="/customizer" className="brand-launcher">
      Customizer
    </Link>
  );
}
