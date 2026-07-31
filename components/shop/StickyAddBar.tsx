"use client";

import { useEffect, useState } from "react";
import AddToCartControls from "@/components/shop/AddToCartControls";
import { formatMoney } from "@/lib/catalog";
import { ProductMedia } from "@/components/ui/image-placeholder";

type Props = {
  productId: string;
  productSlug: string;
  productName: string;
  productImage: string | null;
  productPrice: number;
};

export default function StickyAddBar({
  productId,
  productSlug,
  productName,
  productImage,
  productPrice,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="sticky-atc">
      <div className="star-shell sticky-atc-inner">
        <div className="sticky-atc-product">
          <div className="sticky-atc-thumb">
            <ProductMedia src={productImage} alt={productName} />
          </div>
          <div>
            <strong>{productName}</strong>
            <div>{formatMoney(productPrice)}</div>
          </div>
        </div>
        <div className="sticky-atc-actions">
          <AddToCartControls
            productId={productId}
            productSlug={productSlug}
            productName={productName}
            productImage={productImage ?? ""}
            productPrice={productPrice}
            showQuantity={false}
          />
        </div>
      </div>
    </div>
  );
}
