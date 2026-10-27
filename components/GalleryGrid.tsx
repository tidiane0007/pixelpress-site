"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { categoryName } from "@/lib/products";
import { galleryItems } from "@/lib/gallery";

const families = [...new Set(galleryItems.map((item) => item.category))];

export default function GalleryGrid() {
  const [active, setActive] = useState<string | null>(null);

  const items = active ? galleryItems.filter((item) => item.category === active) : galleryItems;

  return (
    <>
      <div
        role="group"
        aria-label="Filtrer les techniques"
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => setActive(null)}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
            active === null
              ? "border-ink-900 bg-ink-900 text-white"
              : "border-ink-200 bg-white text-ink-600 hover:border-brand-400"
          }`}
        >
          Toutes ({galleryItems.length})
        </button>
        {families.map((slug) => (
          <button
            key={slug}
            type="button"
            aria-pressed={active === slug}
            onClick={() => setActive(slug)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              active === slug
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-200 bg-white text-ink-600 hover:border-brand-400"
            }`}
          >
            {categoryName(slug)}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.id} className={item.wide ? "sm:col-span-2" : undefined}>
            <figure className="group relative overflow-hidden rounded-xl bg-ink-950 shadow-sm">
              <div className={`relative ${item.wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent p-5 pt-14">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-300">
                  {categoryName(item.category)}
                </p>
                <h2 className="mt-1 text-lg font-bold text-white">{item.title}</h2>
                <p className="mt-1 text-sm text-ink-300">{item.spec}</p>
                <Link
                  href={`/prestations/${item.product}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white underline decoration-brand-400 decoration-2 underline-offset-4"
                >
                  Voir la prestation
                  <span aria-hidden="true">→</span>
                </Link>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
