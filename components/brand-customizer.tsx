"use client";

import Link from "next/link";

/** Floating entry point → dedicated customizer page (room to grow options). */
export function BrandCustomizer() {
  return (
    <Link href="/customizer" className="brand-launcher">
      Make it yours
    </Link>
  );
}
