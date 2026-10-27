"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

export default function PanierPage() {
  const { cartItems, totalItems, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-ink-50 px-4 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-black text-ink-900">Votre demande est vide</h1>
          <p className="mx-auto mt-3 max-w-md leading-7 text-ink-600">
            Ajoutez les prestations dont vous avez besoin : votre sélection sera transmise avec le
            formulaire de devis et nous chiffrons sous 24 h.
          </p>
          <Link
            href="/prestations"
            className="mt-8 inline-block rounded-lg bg-brand-500 px-6 py-3 font-bold text-white transition hover:bg-brand-600"
          >
            Parcourir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
              Étape 1 sur 2
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink-900">Ma demande de devis</h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-semibold text-ink-500 underline underline-offset-4 transition hover:text-red-700"
          >
            Tout vider
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <li
                key={item.key}
                className="flex gap-4 rounded-xl border border-ink-200 bg-white p-4"
              >
                <Link
                  href={`/prestations/${item.product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-ink-100"
                >
                  <Image
                    src={item.product.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-ink-900">
                    <Link
                      href={`/prestations/${item.product.id}`}
                      className="transition hover:text-brand-600"
                    >
                      {item.product.name}
                    </Link>
                  </h2>

                  {item.selections.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {item.selections.map((selection) => (
                        <li
                          key={selection}
                          className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs text-ink-600"
                        >
                          {selection}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2" role="group" aria-label="Quantité">
                      <button
                        type="button"
                        aria-label={`Diminuer la quantité de ${item.product.name}`}
                        onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 font-bold text-ink-700 transition hover:border-brand-400 disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-9 text-center font-mono font-bold text-ink-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Augmenter la quantité de ${item.product.name}`}
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 font-bold text-ink-700 transition hover:border-brand-400"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-ink-500">
                      réf. {formatPrice(item.product.price)} {item.product.priceUnit}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.key)}
                      className="text-sm font-semibold text-ink-500 transition hover:text-red-700"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-xl border border-ink-200 bg-white p-6">
            <h2 className="text-lg font-black text-ink-900">
              {cartItems.length} prestation{cartItems.length > 1 ? "s" : ""} ·{" "}
              {totalItems} unité{totalItems > 1 ? "s" : ""}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              Aucun total n’est calculé ici : le prix dépend du format, du support, des finitions et
              de la quantité réelle. Laissez-nous vos précisions, nous répondons avec un devis ferme.
            </p>
            <Link
              href="/devis"
              className="mt-5 block rounded-lg bg-leaf-500 px-6 py-3 text-center font-bold text-white transition hover:bg-leaf-600"
            >
              Étape 2 — envoyer le devis
            </Link>
            <Link
              href="/prestations"
              className="mt-3 block text-center text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Ajouter une autre prestation
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
