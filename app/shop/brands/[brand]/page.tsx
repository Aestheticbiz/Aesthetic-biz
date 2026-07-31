import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/shop/ProductCard";
import {
  BRANDS,
  getBrand,
  productPrimaryImage,
  productsByStep,
} from "@/lib/catalog";

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return { title: "Brand Not Found" };
  return {
    title: `${b.name} | Shop`,
    description: b.tagline,
  };
}

export default async function BrandShopPage({ params }: Props) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();

  const groups = productsByStep(brand);

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
              <Link href="/shop">Shop</Link>
              <span>/</span>
              <span style={{ color: "#1a1a1f", fontWeight: 600 }}>{b.name}</span>
            </nav>
          </div>
        </div>

        <section style={{ background: "#fff", borderBottom: "1px solid #e2e2e6", padding: "40px 0" }}>
          <div
            className="star-shell"
            style={{
              display: "grid",
              gap: 28,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: 24,
              }}
              className="star-hero-grid"
            >
              <div
                className="img-placeholder"
                style={{ minHeight: 160, aspectRatio: "16 / 7" }}
              >
                <span>{b.name} brand mark — generate</span>
              </div>
              <div>
                <p className="star-overline">{b.name}</p>
                <h1 className="star-h1" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                  {b.tagline}
                </h1>
                <p className="star-prose" style={{ margin: 0 }}>
                  {b.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="star-shell brand-layout">
          <aside className="brand-sidebar">
            <h3>Refine</h3>
            <ul>
              {groups.map((g) => (
                <li key={g.step}>
                  <a href={`#step-${g.step.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    {g.step}
                  </a>
                </li>
              ))}
            </ul>
            <h3>Cart</h3>
            <p className="star-prose" style={{ fontSize: 13, margin: "0 0 16px" }}>
              Items stay in your cart as you browse the routine.
            </p>
            <Link href="/cart" className="star-btn star-btn-outline star-btn-block">
              View cart
            </Link>
            <h3 style={{ marginTop: 28 }}>Need advice?</h3>
            <p className="star-prose" style={{ fontSize: 13, margin: "0 0 12px" }}>
              Book a consultation and leave with a prescribed home-care list.
            </p>
            <Link href="/book" className="star-btn star-btn-navy star-btn-block">
              Book now
            </Link>
          </aside>

          <div>
            {groups.map((g) => (
              <div
                key={g.step}
                className="step-block"
                id={`step-${g.step.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <h2>{g.step}</h2>
                <div className="star-rec-grid">
                  {g.products.map((p) => (
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
            ))}
          </div>
        </div>
      </div>
      <SiteFooter source="aestheticbiz-brand" />
    </>
  );
}
