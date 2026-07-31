"use client";

import { useState } from "react";
import { ProductMedia } from "@/components/ui/image-placeholder";

type Img = { url: string | null; alt_text: string };

export default function ProductImageGallery({
  images,
  productName,
}: {
  images: Img[];
  productName: string;
}) {
  const primary = images[0] ?? { url: null, alt_text: productName };
  const [active, setActive] = useState(primary);
  const thumbs = images.slice(0, 4);

  return (
    <div>
      <div className="star-gallery-main">
        <ProductMedia src={active.url} alt={active.alt_text || productName} />
      </div>
      {thumbs.length > 1 ? (
        <div className="star-thumbs">
          {thumbs.map((img, i) => (
            <button
              key={`${img.url ?? "ph"}-${i}`}
              type="button"
              className={active === img || (active.url === img.url && active.alt_text === img.alt_text) ? "active" : ""}
              onClick={() => setActive(img)}
              aria-label={`View ${img.alt_text || productName}`}
            >
              <ProductMedia src={img.url} alt={img.alt_text || productName} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
