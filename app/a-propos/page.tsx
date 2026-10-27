import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "L’atelier",
  description:
    "Comment l’atelier PIXEL PRESS travaille à Dakar : un fichier contrôlé avant tirage, un bon à tirer validé par vous, un devis écrit ligne par ligne.",
  alternates: { canonical: "/a-propos" },
};

const regles = [
  {
    title: "On contrôle avant de lancer",
    text: "Fonds perdus, résolution, conversion CMJN, lisibilité : le fichier est vérifié par une personne, pas par une file d’attente.",
  },
  {
    title: "Rien ne sort sans votre validation",
    text: "Un bon à tirer numérique, ou papier quand la couleur compte. Après validation, le tirage part tel quel : c’est le dernier moment où corriger est gratuit.",
  },
  {
    title: "Un devis ligne par ligne",
    text: "Support, quantités, faces, finitions, pose. Vous pouvez comparer deux devis sur les lignes, pas seulement sur le total.",
  },
];

const limites = [
  "Nous ne vendons pas de stock permanent : chaque commande est produite pour vous.",
  "Nous ne chiffrons pas sans visuel ni sans quantité — un prix inventé est un prix qui augmente à la livraison.",
  "Nous ne tirons pas un fichier que vous n’avez pas validé, même pressés par une date.",
];

export default function AProposPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-ink-200 bg-ink-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">L’atelier</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            Nous imprimons ce que nous savons contrôler
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-300">
            PIXEL PRESS est une imprimerie numérique et un atelier de personnalisation à Dakar.
            Textile, papier, objets et grand format : quatre familles de production, les mêmes
            exigences du fichier au produit fini.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-black text-ink-900">Ce que nous prenons en charge</h2>
            <p className="mt-4 leading-7 text-ink-600">
              Du fichier que vous envoyez — PDF, AI, PNG 300 dpi, parfois une simple photo — jusqu’au
              produit que vous venez chercher ou que nous posons. Entre les deux : le contrôle
              technique, le bon à tirer, le tirage, les finitions, la découpe, l’œillettage et la pose.
            </p>
            <p className="mt-4 leading-7 text-ink-600">
              Nous travaillons pour les entreprises qui commandent des séries, les événements qui ont
              une date fixe, et les particuliers qui veulent une seule pièce bien faite.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/devis"
                className="rounded-lg bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600"
              >
                Demander un devis
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="rounded-lg border border-ink-200 px-5 py-3 font-bold text-ink-800 transition hover:border-brand-400"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src="/images/baches-affiches.jpg"
              alt="Traceur grand format déroulant une bâche imprimée dans l’atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-ink-200 bg-ink-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ink-900">Nos trois règles de production</h2>
          <ol className="mt-8 grid gap-5 lg:grid-cols-3">
            {regles.map((regle, index) => (
              <li key={regle.title} className="rounded-xl border border-ink-200 bg-white p-6">
                <p className="text-xs font-black uppercase tracking-widest text-brand-600">
                  Règle {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-bold text-ink-900">{regle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{regle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black text-ink-900">Ce que nous ne promettons pas</h2>
              <ul className="mt-5 space-y-3">
                {limites.map((limite) => (
                  <li key={limite} className="flex gap-3 text-sm leading-6 text-ink-600">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />
                    {limite}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black text-ink-900">Quatre familles de production</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/prestations?category=${category.slug}`}
                      className="block rounded-xl border border-ink-200 p-4 transition hover:border-brand-400 hover:bg-brand-50"
                    >
                      <span className="block font-bold text-ink-900">{category.name}</span>
                      <span className="mt-1 block text-sm leading-6 text-ink-600">
                        {category.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
