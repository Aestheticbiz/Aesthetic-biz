"use client";

import Link from "next/link";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/catalog";

export default function CartPage() {
  const { state, dispatch, subtotal } = useCart();
  const { items } = state;

  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader />
      <div className="star-page">
        {items.length === 0 ? (
          <div className="star-empty">
            <h1 className="star-h1" style={{ fontSize: "2rem" }}>
              Your cart is empty
            </h1>
            <p className="star-prose">Add some demo products to get started.</p>
            <Link href="/shop" className="star-btn star-btn-navy">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="star-shell" style={{ padding: "48px 0 96px" }}>
            <h1 className="star-h1" style={{ fontSize: "2rem", marginBottom: 32 }}>
              Your Cart
            </h1>
            <div className="star-cart-layout">
              <div className="star-cart-table">
                {items.map((item) => (
                  <div key={item.id} className="star-cart-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} />
                    <div>
                      <Link
                        href={`/shop/products/${item.slug}`}
                        style={{ fontWeight: 600, fontSize: 15 }}
                      >
                        {item.name}
                      </Link>
                      <div style={{ fontSize: 13, color: "#636374", marginTop: 4 }}>
                        {formatMoney(item.price)}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
                        }
                        style={{
                          marginTop: 8,
                          border: 0,
                          background: "transparent",
                          color: "#939eba",
                          fontSize: 12,
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="star-qty" style={{ justifySelf: "start" }}>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                    <div style={{ fontWeight: 700, textAlign: "right" }}>
                      {formatMoney(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <aside className="star-summary">
                <h2 className="star-h3">Order summary</h2>
                <div className="star-summary-row">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="star-summary-row">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="star-summary-row total">
                  <span>Total</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <button
                  type="button"
                  className="star-btn star-btn-accent star-btn-block"
                  style={{ marginTop: 16 }}
                  onClick={() =>
                    alert(
                      "Demo cart only — live AestheticBiz checkout would take payment and create the order + points.",
                    )
                  }
                >
                  Checkout (demo)
                </button>
                <Link
                  href="/shop"
                  className="star-btn star-btn-outline star-btn-block"
                  style={{ marginTop: 10 }}
                >
                  Continue shopping
                </Link>
              </aside>
            </div>
          </div>
        )}
      </div>
      <SiteFooter
        compact
        source="aestheticbiz-cart"
        note="AestheticBiz cart demo · Preview only"
      />
    </>
  );
}
