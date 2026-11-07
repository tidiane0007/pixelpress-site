"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import {
  categories,
  categoryMatchesSearch,
  categoryName,
  defaultSelections,
  formatPrice,
  getCategory,
  matchesSearch,
  products,
  type Product,
} from "@/lib/products";
import ServiceIllustration from "@/components/ServiceIllustration";

// Skeleton loader for product cards
function ProductCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white">
      <div className="aspect-[4/3] w-full skeleton" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5 space-y-3">
        <div className="h-6 w-3/4 skeleton" aria-hidden="true" />
        <div className="h-4 w-full skeleton" aria-hidden="true" />
        <div className="h-4 w-1/2 skeleton" aria-hidden="true" />
        <div className="h-4 w-1/3 skeleton" aria-hidden="true" />
        <div className="mt-auto flex items-center gap-2 border-t border-ink-100 pt-4">
          <div className="h-10 w-full skeleton" aria-hidden="true" />
          <div className="h-10 w-full skeleton" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

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
  const urlSearch = searchParams.get("search") ?? "";
  // L'URL reste la source de vérité : les liens « Recherches populaires » du
  // catalogue vide pointent /prestations?search=… sans remonter ce composant, donc
  // repartir d'elle à chaque rendu suffit à les rendre actifs. La frappe s'y
  // superpose tant qu'elle est née de la même URL.
  const [typed, setTyped] = useState<{ url: string; value: string } | null>(null);
  const search = typed && typed.url === urlSearch ? typed.value : urlSearch;
  const [sort, setSort] = useState<Sort>("recommandes");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { showToast } = useToast();

  const handleSearchChange = useCallback(
    (value: string) => {
      setTyped({ url: urlSearch, value });
      setShowSuggestions(value.trim().length > 0);
    },
    [urlSearch]
  );

  // Le catalogue suit la frappe sans la bloquer : React rend d'abord le champ, puis
  // la liste en arrière-plan. Inutile de différer artificiellement 200 ms.
  const deferredSearch = useDeferredValue(search.trim());

  const results = useMemo(() => {
    const list = products.filter(
      (product) =>
        (!activeCategory || product.category === activeCategory) &&
        matchesSearch(product, deferredSearch)
    );

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
  }, [activeCategory, deferredSearch, sort]);

  const category = activeCategory ? getCategory(activeCategory) : undefined;

  // Suggestions d'autocomplétion : mêmes règles que le filtre du catalogue, sinon le
  // menu propose une prestation que la recherche ne retrouve pas juste après.
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const productMatches = products
      .filter((p) => matchesSearch(p, search))
      .slice(0, 5)
      .map((p) => ({ type: "product" as const, label: p.name, href: `/prestations/${p.id}` }));

    const categoryMatches = categories
      .filter((c) => categoryMatchesSearch(c, search))
      .slice(0, 3)
      .map((c) => ({ type: "category" as const, label: c.name, href: `/prestations?category=${c.slug}` }));

    return [...productMatches, ...categoryMatches];
  }, [search]);

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
            <label className="flex-1 sm:max-w-sm relative">
              <span className="sr-only">Rechercher une prestation</span>
              <input
                type="search"
                placeholder="Rechercher : flyer, broderie, roll-up…"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                onFocus={() => setShowSuggestions(search.trim().length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="search-suggestions"
                aria-expanded={showSuggestions && suggestions.length > 0}
                className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  id="search-suggestions"
                  role="listbox"
                  className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-ink-200 bg-white shadow-lg"
                >
                  {suggestions.map((suggestion, index) => (
                    <li key={`${suggestion.type}-${suggestion.label}-${index}`} role="option">
                      <Link
                        href={suggestion.href}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-ink-700 hover:bg-primary-50"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-ink-400 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          {suggestion.type === "product" ? (
                            <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6.2" strokeLinecap="round" strokeLinejoin="round" />
                          ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                        </svg>
                        <span>{suggestion.label}</span>
                        <span className="ml-auto text-xs text-ink-400 capitalize">{suggestion.type}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
              <p className="text-sm text-ink-500" aria-live="polite">
                {results.length} sur {products.length}
              </p>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-16 text-center" role="status" aria-live="polite">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-ink-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-ink-900">Aucune prestation trouvée</h2>
              <p className="mt-2 text-ink-600 max-w-md mx-auto">
                Votre recherche « {search} » n’a donné aucun résultat. Essayez avec des termes plus généraux
                ou parcourez nos catégories ci-dessous.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/prestations"
                  className="rounded-lg bg-brand-500 px-6 py-3 font-bold text-ink-950 transition hover:bg-brand-600"
                >
                  Voir tout le catalogue
                </Link>
                <Link
                  href="/devis"
                  className="rounded-lg border border-ink-200 bg-white px-6 py-3 font-bold text-ink-900 transition hover:border-brand-400 hover:text-brand-600"
                >
                  Demander un devis libre
                </Link>
              </div>
              {/* Show popular search suggestions */}
              <p className="mt-8 text-sm text-ink-500">
                Recherches populaires&nbsp;:
                {" "}
                {["flyers", "t-shirts", "cartes de visite", "roll-up", "mugs", "bâches"]
                  .map((term) => (
                    <Link
                      key={term}
                      href={`/prestations?search=${encodeURIComponent(term)}`}
                      className="mx-1 text-brand-600 hover:text-brand-700 underline underline-offset-2"
                    >
                      {term}
                    </Link>
                  ))}
              </p>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product, index) => (
                <li key={product.id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
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
                      <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                          dès
                        </span>
                        <span className="text-xl font-bold text-ink-900">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-ink-500">{product.priceUnit}</span>
                      </p>
                      {/* Le délai décide une commande : il était seulement sur la fiche,
                          jamais dans le catalogue. */}
                      <p className="mb-5 mt-3 flex items-start gap-2 text-sm text-ink-600">
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-current stroke-[1.6] text-brand-600"
                        >
                          <circle cx="10" cy="10" r="7.5" />
                          <path d="M10 6v4.5l3 1.8" strokeLinecap="round" />
                        </svg>
                        <span className="line-clamp-2">
                          <span className="font-semibold text-ink-700">Délai&nbsp;:</span>{" "}
                          {product.delay}
                        </span>
                      </p>
                      <div className="mt-auto flex items-center gap-2 border-t border-ink-100 pt-4">
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
                  className="rounded-lg bg-leaf-500 px-5 py-2.5 text-sm font-bold text-ink-950 transition hover:bg-leaf-600"
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
