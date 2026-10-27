import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Nos techniques en images",
  description:
    "Sérigraphie, DTF, broderie, quadri numérique, découpe à la forme, sublimation et grand format : ce que l’atelier PIXEL PRESS de Dakar sait produire, en images.",
  alternates: { canonical: "/galerie" },
};

export default function GaleriePage() {
  return (
    <div className="bg-ink-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          L’atelier en images
        </p>
        <h1 className="mt-2 text-3xl font-black text-ink-900 sm:text-4xl">
          Nos techniques, du typon au panneau posé
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-ink-600">
          Une même prestation peut être imprimée de plusieurs façons, et le rendu change. Voici ce
          que chaque technique donne réellement dans nos ateliers de Dakar. Chaque visuel renvoie
          vers la prestation correspondante du catalogue.
        </p>

        <div className="mt-10">
          <GalleryGrid />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/devis"
            className="rounded-lg bg-brand-500 px-6 py-3 font-bold text-white transition hover:bg-brand-600"
          >
            Demander un devis
          </Link>
          <Link
            href="/prestations"
            className="rounded-lg border border-ink-200 bg-white px-6 py-3 font-bold text-ink-900 transition hover:border-brand-400 hover:text-brand-600"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
