"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { categories, featuredProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

const phoneHref = siteConfig.phoneHref;

/** Une seule fonction décide ce qu'est « la section courante » : sans ça, cinq liens
    identiques n'indiquent pas au visiteur où il se trouve. */
const useActiveSection = () => {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
};

function CategoryMegaMenu({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isActive = useActiveSection();
  const active = isActive("/prestations");

  // Le panneau ne se fermait qu'en recomprimant le bouton : Échap et clic ailleurs
  // sont les deux gestes réflexes quand un mégamenu est ouvert.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onToggle();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      const horsZone =
        !buttonRef.current?.contains(target) && !panelRef.current?.contains(target);
      if (horsZone) onToggle();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onToggle]);

  return (
    <div ref={buttonRef}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="mega-catalogue"
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
          active
            ? "bg-brand-50 text-brand-700"
            : "text-slate-700 hover:bg-slate-100 hover:text-primary-800"
        }`}
      >
        Catalogue
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        /* Posé sur la rangée de l'en-tête (inset-x-0), pas sous le bouton : le panneau
           de 58 rem débordait de l'écran, mesuré à -20 px à gauche puis +75 px à droite. */
        <div
          ref={panelRef}
          id="mega-catalogue"
          className="absolute inset-x-0 top-full z-50 mt-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-slate-100 pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
              Nos familles de prestations
            </p>
            <Link
              href="/prestations"
              onClick={onToggle}
              className="text-sm font-bold text-brand-700 transition hover:text-primary-800"
            >
              Tout le catalogue&nbsp;→
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/prestations?category=${category.slug}`}
                onClick={onToggle}
                className="group flex gap-4 rounded-xl p-3 transition hover:bg-slate-50"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900 group-hover:text-primary-800">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                    {category.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
              Les plus demandés
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/prestations/${product.id}`}
                  onClick={onToggle}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-brand-400 hover:text-primary-800"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const NAV_ITEMS = [
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "L'atelier" },
  { href: "/conseils", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { totalItems } = useCart();
  const isActive = useActiveSection();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive(href)
        ? "bg-brand-50 text-brand-700"
        : "text-slate-700 hover:bg-slate-100 hover:text-primary-800"
    }`;

  return (
    <>
      <div className="bg-ink-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p className="font-medium">
            Imprimerie numérique et personnalisation à Dakar — devis en moins de 24 h
          </p>
          <div className="flex items-center gap-4">
            <a href={phoneHref} className="font-semibold text-white hover:text-brand-400">
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden hover:text-brand-400 sm:inline"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Seule la barre blanche reste collante : la bande noire d'infos faisait perdre
          32 px de viewport à chaque scroll, sur toutes les pages. Elle reste hors du
          <header> collant, sinon son parent défile et le collage ne tient plus. */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label="Accueil PIXEL PRESS">
            <Image
              src="/pixel-press-logo.png"
              alt="PIXEL PRESS"
              width={200}
              height={50}
              priority
              className="rounded bg-ink-950 p-1"
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            <CategoryMegaMenu open={megaOpen} onToggle={() => setMegaOpen((value) => !value)} />
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/panier"
              aria-label={`Voir ma demande${totalItems > 0 ? `, ${totalItems} article${totalItems > 1 ? "s" : ""}` : ", vide"}`}
              className="relative rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-primary-800"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.6]">
                <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf-500 px-1 text-xs font-bold text-ink-950">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/devis"
              className="hidden rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-ink-950 shadow-sm transition hover:bg-brand-600 sm:inline-block"
            >
              Demander un devis
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile"
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="nav-mobile"
            aria-label="Navigation mobile"
            className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 lg:hidden"
          >
            <ul className="space-y-1 text-sm font-semibold text-slate-800">
              <li className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-ink-500">
                Catégories
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/prestations?category=${category.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-2 py-2 hover:bg-slate-50"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="mt-3 border-t border-slate-100 pt-3" />
              {[{ href: "/prestations", label: "Tout le catalogue" }, ...NAV_ITEMS].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-lg px-2 py-2 ${
                      isActive(item.href) ? "bg-brand-50 text-brand-700" : "hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/devis"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block rounded-lg bg-brand-500 px-4 py-3 text-center text-sm font-bold text-ink-950"
            >
              Demander un devis
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
