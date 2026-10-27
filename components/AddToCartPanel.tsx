"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, selectionLabel, type Product } from "@/lib/products";

export default function AddToCartPanel({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [picked, setPicked] = useState<number[]>(() => product.options.map(() => 0));
  const [added, setAdded] = useState(false);

  const selections = product.options.map(
    (option, index) => selectionLabel(option, option.values[picked[index]])
  );

  const handleAdd = () => {
    addToCart(product, quantity, selections);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {product.options.map((option, optionIndex) => (
        <fieldset key={option.label} className="border-0 p-0">
          <legend className="mb-2 text-sm font-bold text-ink-900">{option.label}</legend>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value, valueIndex) => (
              <label
                key={value}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-100 ${
                  picked[optionIndex] === valueIndex
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-200 text-ink-600 hover:border-ink-300"
                }`}
              >
                <input
                  type="radio"
                  name={option.label}
                  className="sr-only"
                  checked={picked[optionIndex] === valueIndex}
                  onChange={() =>
                    setPicked((current) =>
                      current.map((index, i) => (i === optionIndex ? valueIndex : index))
                    )
                  }
                />
                {value}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-ink-700">Quantité</span>
          <div className="flex items-center gap-2" role="group" aria-label="Quantité">
            <button
              type="button"
              aria-label="Diminuer la quantité"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-lg font-bold text-ink-700 transition hover:border-brand-400 disabled:opacity-40"
            >
              −
            </button>
            <span className="w-10 text-center font-mono text-lg font-bold text-ink-900" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Augmenter la quantité"
              onClick={() => setQuantity((value) => value + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-lg font-bold text-ink-700 transition hover:border-brand-400"
            >
              +
            </button>
          </div>
        </div>

        <p className="text-sm text-ink-600">
          <span className="font-black text-ink-900">dès {formatPrice(product.price)}</span>
          <span className="ml-1">{product.priceUnit}</span>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="rounded-lg bg-leaf-500 px-6 py-3 font-bold text-white transition hover:bg-leaf-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {product.inStock
            ? added
              ? "Ajouté à ma demande ✓"
              : `Ajouter à ma demande (${quantity})`
            : "Indisponible"}
        </button>
        <Link
          href="/devis"
          className="rounded-lg bg-ink-900 px-6 py-3 text-center font-bold text-white transition hover:bg-ink-800"
        >
          Demander un devis
        </Link>
      </div>

      <p className="text-xs leading-5 text-ink-500">
        Le tarif affiché est un point de départ : la quantité, les finitions et le délai sont
        confirmés au devis.{" "}
        <Link href="/panier" className="font-semibold text-brand-600 hover:text-brand-700">
          Voir ma demande
        </Link>
      </p>
    </div>
  );
}
