import Link from "next/link";
import { formatMoney } from "@/lib/catalog";
import { ProductMedia } from "@/components/ui/image-placeholder";

type Props = {
  name: string;
  slug: string;
  brand: string;
  price: number;
  imageUrl: string | null;
  hrefBase?: string;
  showAddHint?: boolean;
};

export default function ProductCard({
  name,
  slug,
  brand,
  price,
  imageUrl,
  hrefBase = "/shop/products",
  showAddHint = true,
}: Props) {
  return (
    <Link href={`${hrefBase}/${slug}`} className="star-product-card">
      <div className="img-wrap">
        <ProductMedia src={imageUrl} alt={name} />
        {showAddHint ? <div className="hover-bar">View Product</div> : null}
      </div>
      <div className="body">
        <p className="brand">{brand}</p>
        <h3>{name}</h3>
        <p className="price">{formatMoney(price)}</p>
      </div>
    </Link>
  );
}
