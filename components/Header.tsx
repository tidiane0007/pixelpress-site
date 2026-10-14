"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="rounded bg-black p-1" aria-label="Accueil PIXEL PRESS"><Image src="/pixel-press-logo.png" alt="PIXEL PRESS" width={180} height={52} priority /></Link>
          <nav className="flex items-center gap-3 text-sm font-semibold text-slate-700 sm:gap-5">
            <Link href="/products" className="hover:text-blue-700">Services</Link>
            <Link href="/gallery" className="hover:text-blue-700">Galerie</Link>
            <Link href="/contact" className="hidden hover:text-blue-700 sm:inline">Contact</Link>
            <Link href="/cart" aria-label="Voir ma demande" className="relative rounded-lg p-2 hover:bg-slate-100">
              <span className="text-lg" aria-hidden="true">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/devis" className="rounded-lg bg-blue-700 px-3 py-2 text-white hover:bg-blue-800">Devis</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
