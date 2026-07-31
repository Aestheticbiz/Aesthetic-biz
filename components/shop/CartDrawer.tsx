"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/catalog";

export default function CartDrawer() {
  const { state, dispatch, subtotal } = useCart();
  const open = state.isDrawerOpen;

  return (
    <div className={`star-drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <button
        type="button"
        className="star-drawer-backdrop"
        aria-label="Close cart"
        onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
      />
      <aside className="star-drawer-panel" aria-label="Cart drawer">
        <div className="star-drawer-head">
          <strong>Your Cart</strong>
          <button
            type="button"
            onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
            style={{ border: 0, background: "transparent", fontSize: 22, cursor: "pointer" }}
          >
            ×
          </button>
        </div>
        <div className="star-drawer-body">
          {state.items.length === 0 ? (
            <p className="star-prose">Your cart is empty.</p>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {state.items.map((item) => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 64, height: 64, objectFit: "cover", border: "1px solid #e2e2e6" }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#636374" }}>
                      {formatMoney(item.price)} × {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}
                      style={{
                        marginTop: 6,
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
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="star-drawer-foot">
          <div className="star-summary-row total" style={{ margin: 0, padding: 0, border: 0 }}>
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <Link
            href="/cart"
            className="star-btn star-btn-navy star-btn-block"
            onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
          >
            View Cart
          </Link>
          <Link
            href="/shop"
            className="star-btn star-btn-outline star-btn-block"
            onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
          >
            Continue Shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
