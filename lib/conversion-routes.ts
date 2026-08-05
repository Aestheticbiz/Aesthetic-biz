/**
 * Pages that exist to convert paid or outbound traffic. Floating launchers are
 * suppressed here: on phones they land on top of the primary CTA, and none of
 * these pages introduce the widget they belong to.
 */
export const CONVERSION_ROUTES = [
  "/full-fee-patients",
  "/financial",
  "/book-discovery",
] as const;

export function isConversionRoute(pathname: string): boolean {
  return CONVERSION_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
