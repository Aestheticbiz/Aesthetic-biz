import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import AddToCartControls from "@/components/shop/AddToCartControls";
import ProductCard from "@/components/shop/ProductCard";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import StickyAddBar from "@/components/shop/StickyAddBar";
import DoctorRecommends from "@/components/staff/DoctorRecommends";
import { ProductMedia } from "@/components/ui/image-placeholder";
import {
  formatMoney,
  getProduct,
  getTreatment,
  PRODUCTS,
  productPrimaryImage,
} from "@/lib/catalog";
import { DOCTOR } from "@/lib/staff";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product Not Found" };
  return {
    title: `${p.name} — ${p.brand}`,
    description: `${p.name} by ${p.brand}. Medical skincare at AestheticBiz.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = product.relatedSlugs
    .map((s) => getProduct(s))
    .filter(Boolean)
    .slice(0, 4);
  const treatmentLinks = product.treatmentSlugs
    .map((s) => getTreatment(s))
    .filter(Boolean);
  const primaryImage = productPrimaryImage(product);
  const installment = Math.round(product.price / 4);

  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <div className="star-page product-page-pad" style={{ background: "#fff" }}>
        <section style={{ padding: "40px 0 24px" }}>
          <div className="star-shell">
            <nav className="star-breadcrumb" style={{ fontSize: 12 }}>
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/shop">Shop</Link>
              <span>›</span>
              <Link href={`/shop/brands/${product.brandSlug}`}>{product.brand}</Link>
              <span>›</span>
              <span style={{ color: "#1a1a1f" }}>{product.name}</span>
            </nav>

            <div className="star-hero-grid product">
              <ProductImageGallery images={product.images} productName={product.name} />

              <div>
                <span className="category-pill">{product.categoryTag}</span>
                <p className="star-overline" style={{ marginBottom: 8 }}>
                  {product.brand}
                </p>
                <h1 className="star-h1" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                  {product.name}
                </h1>
                <div
                  className="star-prose"
                  style={{ marginBottom: 20 }}
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
                <hr style={{ border: 0, borderTop: "1px solid #e2e2e6", margin: "0 0 20px" }} />

                <div style={{ marginBottom: 6 }}>
                  <span className="star-price-lg">{formatMoney(product.price)}</span>
                </div>
                <p style={{ fontSize: 12, color: "#636374", marginBottom: 18 }}>
                  SKU: {product.sku}
                </p>

                <AddToCartControls
                  productId={product.id}
                  productSlug={product.slug}
                  productName={product.name}
                  productImage={primaryImage ?? ""}
                  productPrice={product.price}
                />

                <p style={{ margin: "10px 0 0", fontSize: 13 }}>
                  <Link href="/cart" style={{ color: "#939eba", fontWeight: 600 }}>
                    View cart
                  </Link>
                  <span style={{ color: "#c5c8d1" }}> · </span>
                  <span style={{ color: "#636374" }}>Calculate shipping at checkout</span>
                </p>

                <div className="pay-row" aria-label="Payment methods">
                  {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"].map((m) => (
                    <span key={m} className="pay-chip">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="installment-box">
                  <strong>Pay in 4</strong> interest-free payments of{" "}
                  <strong>{formatMoney(installment)}</strong>. Subject to approval — demo message
                  only.
                </div>

                <div className="star-trust">
                  <div className="star-trust-row">Free delivery on orders over $80</div>
                  <div className="star-trust-row">Secure checkout · SSL encrypted</div>
                  <div className="star-trust-row">30-day returns on unopened products</div>
                  <div className="star-trust-row">
                    {DOCTOR.shortName} recommended · medical skincare
                  </div>
                </div>

                <DoctorRecommends productSlug={product.slug} productName={product.name} />

                <div className="star-side-card" style={{ marginTop: 24, background: "#f7f7f8" }}>
                  <h3 className="star-h3">AestheticBiz Points</h3>
                  <p className="star-prose" style={{ margin: 0 }}>
                    Earn points on this purchase and redeem on your next visit or order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="funnel-section alt">
          <div className="star-shell" style={{ maxWidth: 920 }}>
            <h2 className="star-h2">About This Product</h2>
            <ul className="funnel-bullets">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div
              className="star-prose"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>

        <section className="funnel-section">
          <div className="star-shell" style={{ maxWidth: 920 }}>
            <h2 className="star-h2">Skin Concerns &amp; How It Helps</h2>
            <div className="funnel-grid-2">
              {product.concerns.map((c) => (
                <div key={c.concern} className="funnel-card">
                  <h4>{c.concern}</h4>
                  <p>{c.helps}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="funnel-section alt">
          <div className="star-shell" style={{ maxWidth: 920 }}>
            <h2 className="star-h2">Expected Results</h2>
            <div className="funnel-grid-3">
              {product.timeline.map((t) => (
                <div key={t.period} className="funnel-card">
                  <span className="period">{t.period}</span>
                  <p>{t.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="funnel-section">
          <div className="star-shell" style={{ maxWidth: 920 }}>
            <h2 className="star-h2">Good to Know</h2>
            <div className="funnel-grid-3">
              {product.miniFaqs.map((f) => (
                <div key={f.question} className="funnel-card">
                  <h4>{f.question}</h4>
                  <p>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="funnel-section alt">
          <div className="star-shell" style={{ maxWidth: 920 }}>
            <h2 className="star-h2">Specifications</h2>
            <div className="funnel-grid-4">
              {product.specs.map((s) => (
                <div key={s.label} className="funnel-card">
                  <h4>{s.label}</h4>
                  <p>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="funnel-section">
          <div className="star-shell" style={{ maxWidth: 920 }}>
            <h2 className="star-h2">Key Ingredients</h2>
            <div className="funnel-grid-2">
              {product.ingredients.map((ing) => (
                <div key={ing.name} className="funnel-card">
                  <h4>{ing.name}</h4>
                  <p>{ing.benefit}</p>
                </div>
              ))}
            </div>
            <h3 className="star-h3" style={{ marginTop: 40 }}>
              How to Use
            </h3>
            <p className="star-prose">{product.howToUse}</p>
          </div>
        </section>

        <section className="funnel-section alt">
          <div className="star-shell" style={{ maxWidth: 900 }}>
            <div className="cta-banner">
              <div className="thumb">
                <ProductMedia src={primaryImage} alt={product.name} />
              </div>
              <div>
                <span className="star-overline">{product.brand}</span>
                <h2 className="star-h2" style={{ marginBottom: 8 }}>
                  {product.name}
                </h2>
                <div className="star-price-lg" style={{ fontSize: "1.5rem" }}>
                  {formatMoney(product.price)}
                </div>
              </div>
              <AddToCartControls
                productId={product.id}
                productSlug={product.slug}
                productName={product.name}
                productImage={primaryImage ?? ""}
                productPrice={product.price}
                showQuantity={false}
              />
            </div>
          </div>
        </section>

        {treatmentLinks.length > 0 ? (
          <section className="funnel-section">
            <div className="star-shell">
              <h2 className="star-h2">Recommended for These Treatments</h2>
              <p className="star-prose" style={{ marginBottom: 20 }}>
                Often included in home-care protocols for the following treatments.
              </p>
              <div className="star-chips">
                {treatmentLinks.map((t) =>
                  t ? (
                    <Link key={t.slug} href={`/treatments/${t.slug}`} className="star-chip">
                      {t.name} <span>→</span>
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="funnel-section alt">
            <div className="star-shell">
              <h2 className="star-h2">People Also Bought</h2>
              <div className="star-rec-grid">
                {related.map((p) =>
                  p ? (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      slug={p.slug}
                      brand={p.brand}
                      price={p.price}
                      imageUrl={productPrimaryImage(p)}
                    />
                  ) : null,
                )}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <StickyAddBar
        productId={product.id}
        productSlug={product.slug}
        productName={product.name}
        productImage={primaryImage}
        productPrice={product.price}
      />
      <SiteFooter source="aestheticbiz-product" />
    </>
  );
}
