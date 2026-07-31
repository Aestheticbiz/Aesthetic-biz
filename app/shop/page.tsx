import type { Metadata } from "next";
import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/shop/ProductCard";
import { BRANDS, PRODUCTS, productPrimaryImage } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop medical skincare at AestheticBiz — cleansers, serums, repair and daily defence curated for clinic patients.",
};

export default function ShopPage() {
  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <div className="star-page">
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e2e6" }}>
          <div className="star-shell" style={{ padding: "12px 0" }}>
            <nav className="star-breadcrumb" style={{ margin: 0 }}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span style={{ color: "#1a1a1f", fontWeight: 600 }}>Shop</span>
            </nav>
          </div>
        </div>

        <section className="star-hero" style={{ padding: "48px 0" }}>
          <div className="star-shell">
            <p className="star-overline">Medical skincare</p>
            <h1 className="star-h1">The products your treatment plan continues at home.</h1>
            <p className="star-prose" style={{ maxWidth: 560, fontSize: 17, margin: "0 0 24px" }}>
              Pharmaceutical-grade retail on the same platform as booking and loyalty — so patients
              never leave your brand to finish the prescription.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {BRANDS.map((b) => (
                <Link key={b.slug} href={`/shop/brands/${b.slug}`} className="star-btn star-btn-outline">
                  Shop {b.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "48px 0 96px" }}>
          <div className="star-shell">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 40, height: 1, background: "#939eba" }} />
              <span className="star-overline" style={{ margin: 0 }}>
                All Products
              </span>
            </div>
            <h2 className="star-h2">Browse the full range</h2>
            <div className="star-rec-grid" style={{ marginTop: 32 }}>
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  slug={p.slug}
                  brand={p.brand}
                  price={p.price}
                  imageUrl={productPrimaryImage(p)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter source="aestheticbiz-shop" />
    </>
  );
}
