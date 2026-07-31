export const SITE = {
  name: "AestheticBiz",
  tagline: "Aesthetic & Wellness",
  phone: "(347) 583-6395",
  phoneHref: "tel:+13475836395",
  address: "485 Madison Avenue",
  suite: "Suite 709 · New York, NY 10022",
  hours: "Tuesday–Saturday 10am–6pm",
  mapsEmbed:
    "https://maps.google.com/maps?q=485%20Madison%20Avenue%20Suite%20709%20New%20York%20NY%2010022&z=15&output=embed",
  discoveryBase: "/book-discovery?source=aestheticbiz",
  domain: "https://www.aestheticbiz.site",
  /** Live CRM Solutions calendar (same Mon–Fri 14:00/15:00/16:00 SAST hours) */
  discoveryLiveUrl: "https://www.crmsolutions.app/book-discovery-call",
} as const;

export function discoveryUrl(source: string) {
  return `/book-discovery?source=${encodeURIComponent(source)}`;
}

/** @deprecated use lib/catalog — kept for booking wizard labels */
export { TREATMENTS, PRODUCTS, BOOKING_OPTIONS } from "./catalog-compat";
