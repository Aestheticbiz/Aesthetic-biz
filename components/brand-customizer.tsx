"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isConversionRoute } from "@/lib/conversion-routes";

/** Floating entry → brand customizer page for curious clinic owners. */
export function BrandCustomizer() {
  const pathname = usePathname();

  if (isConversionRoute(pathname)) return null;

  return (
    <Link href="/customizer" className="brand-launcher">
      Customizer
    </Link>
  );
}
