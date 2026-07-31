"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

type Props = {
  productId: string;
  productSlug: string;
  productName: string;
  productImage: string;
  productPrice: number;
  showQuantity?: boolean;
};

export default function AddToCartControls({
  productId,
  productSlug,
  productName,
  productImage,
  productPrice,
  showQuantity = true,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { dispatch, isHydrated } = useCart();

  function handleAdd() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: productId,
        slug: productSlug,
        name: productName,
        image: productImage,
        price: productPrice,
        quantity,
      },
    });
    dispatch({ type: "OPEN_DRAWER" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="star-qty-row">
      {showQuantity ? (
        <div className="star-qty">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      ) : null}
      <button
        type="button"
        className={`star-btn star-btn-accent${showQuantity ? "" : ""}`}
        style={{
          flex: 1,
          background: added ? "#4A7C59" : undefined,
          opacity: isHydrated ? 1 : 0.6,
        }}
        disabled={!isHydrated}
        onClick={handleAdd}
      >
        {!isHydrated ? "Loading…" : added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
