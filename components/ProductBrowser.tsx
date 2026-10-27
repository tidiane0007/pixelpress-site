"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  categories,
  categoryName,
  defaultSelections,
  formatPrice,
  getCategory,
  products,
  type Product,
} from "@/lib/products";
import ServiceIllustration from "@/components/ServiceIllustration";

const SORTS = [
  { value: "recommandes", label: "Les plus demandés" },
  { value: "prix-croissant", label: "Prix croissant" },
  { value: "prix-decroissant", label: "Prix décroissant" },
  { value: "alphabetique", label: "Ordre alphabétique" },
] as const;

type Sort = (typeof SORTS)[number]["value"];

/** Enfant client de /prestations : le filtrage et le tri restent locaux pour ne
    plus déclencher une requête serveur à chaque frappe, comme le faisait pushState. */
export default function ProductBrowser() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("recommandes");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = !activeCategory || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.short.toLowerCase().includes(query) ||
        categoryName(product.category).toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    switch (sort) {
      case "prix-croissant":
        return [...list].sort((a, b) => a.price - b.price);
      case "prix-decroissant":
        return [...list].sort((a, b) => b.price - a.price);
      case "alphabetique":
        return [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
      default:
        return [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
  }, [activeCategory, search, sort]);

  const category = activeCategory ? getCategory(activeCategory) : undefined;

  return (
    <>
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Catalogue</p>
          <h1 className="mt-2 text-3xl font-black text-ink-900 sm:text-4xl">
            {category ? category.name : "Toutes nos prestations d’impression"}
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink-600">
            {category
              ? category.description
              : "Les tarifs affichés sont des points de départ indicatifs : le devis final dépend de la quantité, du support, des finitions et du délai. Envoyez votre visuel, nous confirmons sous 24 h."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
            <Link
              href="/prestations"
              aria-current={!activeCategory ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !activeCategory
                  ? "bg-ink-900 text-white"
                  : "border border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-600"
              }`}
            >
              Tout ({products.length})
            </Link>
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/prestations?category=${item.slug}`}
                aria-current={activeCategory === item.slug ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === item.slug
                    ? "bg-ink-900 text-white"
                    : "border border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {category && <p className="mt-4 text-sm text-ink-500">{category.tagline}</p>}
        </div>
      </section>

      <section className="bg-ink-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex-1 sm:max-w-sm">
              <span className="sr-only">Rechercher une prestation</span>
              <input
                type="search"
                placeholder="Rechercher : flyer, broderie, roll-up…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </label>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-ink-600">
                <span className="hidden sm:inline">Trier par</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as Sort)}
                  className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-800 outline-none focus:border-brand-400"
                >
                  {SORTS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-sm text-ink-500">
                {results.length} sur {products.length}
              </p>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-ink-900">Aucune prestation trouvée</h2>
              <p className="mt-2 text-ink-600">
                Nous imprimons aussi sur mesure : décrivez votre besoin sur la page devis.
              </p>
              <Link
                href="/devis"
                className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 font-bold text-white transition hover:bg-brand-600"
              >
                Demander un devis libre
              </Link>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product, index) => (
                <li key={product.id}>
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm transition hover:shadow-md">
                    <Link href={`/prestations/${product.id}`} className="block">
                      <ServiceIllustration product={product} priority={index < 3} />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-lg font-bold text-ink-900">
                        <Link
                          href={`/prestations/${product.id}`}
                          className="transition hover:text-brand-600"
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-ink-600">{product.short}</p>
                      <p className="mt-4 text-sm font-bold text-ink-900">
                        dès {formatPrice(product.price)}
                        <span className="ml-1 font-normal text-ink-500">{product.priceUnit}</span>
                      </p>
                      <div className="mt-5 flex items-center gap-2 border-t border-ink-100 pt-4">
                        <Link
                          href={`/prestations/${product.id}`}
                          className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-ink-800"
                        >
                          Configurer
                        </Link>
                        <button
                          type="button"
                          onClick={() => setQuickView(product)}
                          className="rounded-lg border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-400 hover:text-brand-600"
                        >
                          Aperçu
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}

function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) dialog.showModal();
    if (!product && dialog.open) dialog.close();
  }, [product]);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <dialog ref={dialogRef} className="w-[min(46rem,92vw)]" onClose={onClose}>
      {product && (
        <div className="max-h-[85vh] overflow-y-auto rounded-2xl bg-white">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={1200}
              height={900}
              className="aspect-[16/9] w-full rounded-t-2xl object-cover"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-ink-950/70 p-2 text-white transition hover:bg-ink-950"
            >
              <span className="sr-only">Fermer l’aperçu</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-none stroke-current stroke-[1.8]"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              {categoryName(product.category)}
            </p>
            <h2 className="mt-1 text-2xl font-black text-ink-900">{product.name}</h2>
            <p className="mt-2 leading-7 text-ink-600">{product.short}</p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink-800">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-sm text-ink-600">
              <span className="font-bold text-ink-900">Délai :</span> {product.delay}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-5">
              <p className="text-lg font-black text-ink-900">
                dès {formatPrice(product.price)}
                <span className="ml-1 text-sm font-normal text-ink-500">{product.priceUnit}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, 1, defaultSelections(product));
                    setAdded(true);
                  }}
                  className="rounded-lg bg-leaf-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-leaf-600"
                >
                  {added ? "Ajouté ✓" : "Ajouter à ma demande"}
                </button>
                <Link
                  href={`/prestations/${product.id}`}
                  onClick={onClose}
                  className="rounded-lg border border-ink-200 px-5 py-2.5 text-sm font-bold text-ink-800 transition hover:border-brand-400 hover:text-brand-600"
                >
                  Voir la fiche
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
