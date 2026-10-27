import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/articles";
import {
  categories,
  countByCategory,
  featuredProducts,
  formatPrice,
  products,
} from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import ServiceIllustration from "@/components/ServiceIllustration";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const promesses = [
  "Devis écrit sous 24 h",
  "Bon à tirer avant tirage",
  "48 h express sur flyers et cartes",
  "Retrait à Dakar, pose sur site",
];

const etapes = [
  {
    title: "Vous décrivez le besoin",
    text: "Quantité, format, date butoir et visuel — même imparfait. Nous disons ce qui est imprimable.",
  },
  {
    title: "Nous chiffrons et contrôlons",
    text: "Devis ligne par ligne, vérification du fichier, choix du support adapté à l’usage réel.",
  },
  {
    title: "Vous validez le BAT",
    text: "Preuve numérique ou papier. Après votre accord, rien ne sort sans ce que vous avez vu.",
  },
  {
    title: "Production, finitions, remise",
    text: "Tirage, découpe, pliage, œillets ou broderie, puis retrait à l’atelier ou pose sur site.",
  },
];

const vitrine = [
  {
    image: "/images/flyers-depliants.jpg",
    alt: "Pile de flyers quadri fraîchement imprimés",
    label: "Papier",
  },
  {
    image: "/images/tshirt.jpg",
    alt: "Presse sérigraphique en train d’imprimer un textile",
    label: "Textile",
  },
  {
    image: "/images/roll-up.jpg",
    alt: "Roll-up installé sur un stand d’exposition",
    label: "Grand format",
  },
  {
    image: "/images/mug.jpg",
    alt: "Mug blanc en céramique avant sublimation",
    label: "Objets",
  },
];

const atelier = [
  {
    image: "/images/stickers.jpg",
    alt: "Planche d’autocollants découpés à la forme",
    title: "Découpe à la forme",
  },
  {
    image: "/images/casquette.jpg",
    alt: "Casquette en toile posée sur l’atelier de broderie",
    title: "Broderie de logo",
  },
  {
    image: "/images/panneau-dibond.jpg",
    alt: "Panneau composite fixé en façade par des entretoises",
    title: "Panneau rigide en façade",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="bg-ink-950 py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">
              Imprimerie numérique · Dakar
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Vos idées prennent vie
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-300">
              Texte, papier, objets et grand format : douze prestations produites dans nos ateliers
              de Dakar, du prototype unique à la série de cinquante mille exemplaires.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/devis"
                className="rounded-lg bg-brand-400 px-6 py-3 font-bold text-ink-950 transition hover:bg-brand-300"
              >
                Demander un devis
              </Link>
              <Link
                href="/prestations"
                className="rounded-lg border border-ink-600 px-6 py-3 font-bold text-white transition hover:border-brand-400 hover:text-brand-300"
              >
                Les {products.length} prestations
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="px-2 py-3 font-bold text-ink-300 underline decoration-ink-600 underline-offset-4 transition hover:text-white"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <ul className="mt-10 grid gap-2 sm:grid-cols-2">
              {promesses.map((promesse) => (
                <li key={promesse} className="flex items-center gap-2 text-sm text-ink-300">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-400"
                  />
                  {promesse}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {vitrine.map((item, index) => (
              <div
                key={item.image}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-900"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-200 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">
            Quatre familles, un même contrôle
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-ink-600">
            Choisissez par usage : ce que le support doit traverser décide de la technique autant que
            du budget.
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/prestations?category=${category.slug}`}
                  className="group block h-full overflow-hidden rounded-xl border border-ink-200 transition hover:border-brand-400 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink-900 group-hover:text-brand-600">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ink-600">{category.tagline}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
                      {countByCategory(category.slug)} prestations
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">Les plus demandés</h2>
              <p className="mt-2 text-ink-600">
                Tarifs de départ, devis ferme après contrôle du fichier.
              </p>
            </div>
            <Link
              href="/prestations"
              className="text-sm font-bold text-brand-600 transition hover:text-brand-700"
            >
              Tout le catalogue →
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm transition hover:shadow-md">
                  <Link href={`/prestations/${product.id}`} className="block">
                    <ServiceIllustration product={product} />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-ink-900">
                      <Link
                        href={`/prestations/${product.id}`}
                        className="transition hover:text-brand-600"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 flex-1 text-sm leading-6 text-ink-600">{product.short}</p>
                    <p className="mt-4 text-sm font-bold text-ink-900">
                      dès {formatPrice(product.price)}
                      <span className="ml-1 font-normal text-ink-500">{product.priceUnit}</span>
                    </p>
                    <Link
                      href={`/prestations/${product.id}`}
                      className="mt-4 rounded-lg bg-ink-900 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-ink-800"
                    >
                      Configurer et demander un devis
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">
            De votre fichier au produit fini
          </h2>
          <ol className="mt-8 grid gap-5 lg:grid-cols-4">
            {etapes.map((etape, index) => (
              <li key={etape.title} className="rounded-xl border border-ink-200 bg-white p-6">
                <p className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-black text-white">
                  {index + 1}
                </p>
                <h3 className="mt-4 font-bold text-ink-900">{etape.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{etape.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-500">
            Une date butoir ?{" "}
            <Link
              href="/conseils/delais-realistes-a-dakar"
              className="font-bold text-brand-600 hover:text-brand-700"
            >
              Voici la chronologie réelle d’une commande
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-y border-ink-200 bg-ink-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">Dans l’atelier</h2>
            <Link href="/galerie" className="text-sm font-bold text-brand-600 transition hover:text-brand-700">
              Toutes les techniques →
            </Link>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {atelier.map((item) => (
              <li key={item.image} className="relative overflow-hidden rounded-xl">
                <Link href="/galerie" className="group block">
                  <div className="relative aspect-[4/3] bg-ink-200">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                    <p className="absolute bottom-4 left-4 right-4 font-bold text-white">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">Avant de commander</h2>
              <p className="mt-2 text-ink-600">
                Ce que nous vérifions avec vous, écrit noir sur blanc.
              </p>
            </div>
            <Link
              href="/conseils"
              className="text-sm font-bold text-brand-600 transition hover:text-brand-700"
            >
              Tous les conseils →
            </Link>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/conseils/${article.slug}`}
                  className="block h-full rounded-xl border border-ink-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-md"
                >
                  <p className="text-xs font-black uppercase tracking-widest text-brand-600">
                    {article.category}
                  </p>
                  <h3 className="mt-3 font-bold leading-6 text-ink-900">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-600">{article.excerpt}</p>
                  <p className="mt-4 text-xs text-ink-400">{article.minutes} min de lecture</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
              Un fichier douteux ? Envoyez-le nous.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-ink-300">
              Nous le contrôlons, nous vous disons ce qui passera à l’impression, et nous chiffrons
              sous 24 h. Cette étape est gratuite, même si vous ne commandez pas chez nous.
            </p>
          </div>
          <div className="grid gap-3">
            <Link
              href="/devis"
              className="rounded-lg bg-brand-400 px-6 py-3.5 text-center font-bold text-ink-950 transition hover:bg-brand-300"
            >
              Demander un devis
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-leaf-500 px-6 py-3.5 text-center font-bold text-white transition hover:bg-leaf-600"
            >
              Écrire sur WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-lg border border-ink-600 px-6 py-3.5 text-center font-bold text-white transition hover:border-brand-400"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
