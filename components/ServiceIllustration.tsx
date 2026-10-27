import Image from "next/image";
import { categoryName, type Product } from "@/lib/products";

type ServiceIllustrationProps = {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ServiceIllustration({
  product,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: ServiceIllustrationProps) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-ink-100 ${className}`}>
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
        {categoryName(product.category)}
      </span>
    </div>
  );
}
