import { PRODUCTS as CATALOG_PRODUCTS, TREATMENTS as CATALOG_TREATMENTS } from "./catalog";

export const TREATMENTS = CATALOG_TREATMENTS.map((t) => ({
  slug: t.slug,
  category: t.category,
  name: t.name,
  price: t.priceFrom,
  priceLabel: t.priceNumber ? `$${t.priceNumber}` : "Consult",
  image: t.image ?? "",
  alt: t.alt,
}));

export const PRODUCTS = CATALOG_PRODUCTS.map((p) => ({
  name: p.name,
  brand: p.brand,
  price: `$${p.price}`,
  image: p.images.find((i) => i.url)?.url ?? "",
  slug: p.slug,
}));

export const BOOKING_OPTIONS = CATALOG_TREATMENTS.map((t) => ({
  name: t.name,
  price: t.priceNumber ? `$${t.priceNumber}` : "Consult",
  label: t.priceNumber ? `$${t.priceNumber} · Earn points` : "Consultation first",
}));
