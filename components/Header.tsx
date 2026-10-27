"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories, featuredProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

const phoneHref = siteConfig.phoneHref;

function CategoryMegaMenu({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="mega-catalogue"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-600"
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
        <div
          id="mega-catalogue"
          className="absolute left-1/2 top-full z-50 mt-2 w-[min(58rem,90vw)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <div className="grid gap-6 sm:grid-cols-2">
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
                  <span className="block text-sm font-bold text-slate-900 group-hover:text-brand-600">
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
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Les plus demandés
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/prestations/${product.id}`}
                  onClick={onToggle}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-brand-400 hover:text-brand-600"
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

export default function Header() {
  const { totalItems } = useCart();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-sm">
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

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label="Accueil PIXEL PRESS">
            <Image
              src="/pixel-press-logo.png"
              alt="PIXEL PRESS"
              width={170}
              height={51}
              priority
              className="rounded bg-ink-950 p-1"
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            <CategoryMegaMenu open={megaOpen} onToggle={() => setMegaOpen((value) => !value)} />
            <Link
              href="/galerie"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-600"
            >
              Galerie
            </Link>
            <Link
              href="/a-propos"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-600"
            >
              L&apos;atelier
            </Link>
            <Link
              href="/conseils"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-600"
            >
              Conseils
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-600"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/panier"
              aria-label={`Voir ma demande${totalItems > 0 ? `, ${totalItems} article${totalItems > 1 ? "s" : ""}` : ", vide"}`}
              className="relative rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.6]">
                <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf-500 px-1 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/devis"
              className="hidden rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600 sm:inline-block"
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
              <li className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-slate-400">
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
              {[
                { href: "/prestations", label: "Tout le catalogue" },
                { href: "/galerie", label: "Galerie" },
                { href: "/a-propos", label: "L'atelier" },
                { href: "/conseils", label: "Conseils" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-2 py-2 hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/devis"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block rounded-lg bg-brand-500 px-4 py-3 text-center text-sm font-bold text-white"
            >
              Demander un devis
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
