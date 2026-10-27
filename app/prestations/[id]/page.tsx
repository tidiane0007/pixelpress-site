import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  categoryName,
  formatPrice,
  getCategory,
  getProduct,
  getRelated,
  products,
} from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import AddToCartPanel from "@/components/AddToCartPanel";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return { title: "Prestation introuvable", robots: { index: false, follow: false } };
  }

  return {
    title: product.name,
    description: `${product.short} ${categoryName(product.category)} à Dakar : options, délais et tarif indicatif. Devis sous 24 h avec PIXEL PRESS.`,
    alternates: { canonical: `/prestations/${product.id}` },
    openGraph: {
      title: `${product.name} | PIXEL PRESS`,
      description: product.short,
      url: `/prestations/${product.id}`,
      type: "website",
    },
  };
}

// 'navigation' impose que toute la fiche vienne d'un rendu statique : une
// prestation inconnue est donc générée puis servie avec son vrai 404. Sans cette
// contrainte, la coque PPR part en 200 avant l'exécution de notFound() et le code
// HTTP — comme son intérêt SEO — est perdu au premier appel.
// Contrepartie mesurée : le document 404 arrive vide côté serveur, l'interface
// « introuvable » est rendue par React. Le statut 404 + noindex suffit aux robots.
export const ensureStatic = 'navigation';

export default async function PrestationPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return notFound();

  const category = getCategory(product.category);
  const related = getRelated(product);
  const url = `${siteConfig.url}/prestations/${product.id}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.short,
      image: `${siteConfig.url}${product.image}`,
      brand: { "@type": "Brand", name: siteConfig.name },
      category: categoryName(product.category),
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "XOF",
        price: product.price,
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "Country", name: "Sénégal" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Prestations", item: `${siteConfig.url}/prestations` },
        { "@type": "ListItem", position: 3, name: product.name, item: url },
      ],
    },
  ];

  return (
    <div className="bg-white">
      {structuredData.map((json) => (
        <script
          key={json["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
      ))}

      <nav aria-label="Fil d’Ariane" className="border-b border-ink-200 bg-ink-50">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="text-ink-500 hover:text-brand-600">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">
            /
          </li>
          <li>
            <Link href="/prestations" className="text-ink-500 hover:text-brand-600">
              Prestations
            </Link>
          </li>
          {category && (
            <>
              <li aria-hidden="true" className="text-ink-300">
                /
              </li>
              <li>
                <Link
                  href={`/prestations?category=${category.slug}`}
                  className="text-ink-500 hover:text-brand-600"
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true" className="text-ink-300">
            /
          </li>
          <li aria-current="page" className="font-semibold text-ink-900">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="py-10 lg:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-ink-200 bg-ink-50 p-5 sm:grid-cols-3">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink-800">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
              {categoryName(product.category)}
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-lg font-medium leading-8 text-ink-600">{product.short}</p>
            <p className="mt-4 leading-7 text-ink-600">{product.description}</p>

            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
              <span className="font-bold">Délai :</span> {product.delay}
            </div>

            <div className="mt-6 border-t border-ink-200 pt-6">
              <AddToCartPanel product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-200 bg-ink-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ink-900">
            Comment votre fichier passe entre nos mains
          </h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Vous envoyez le visuel",
                text: "PDF, AI, PNG 300 dpi ou même une simple photo : on vous dit ce qui est imprimable.",
              },
              {
                title: "On vérifie avant d’imprimer",
                text: "Fonds perdus, résolution, couleurs RVB vers CMJN, lisibilité du texte.",
              },
              {
                title: "Bon à tirer",
                text: "Une preuve numérique ou papier validée par vous, avec le prix ferme.",
              },
              {
                title: "Production et retrait",
                text: `Tirage, finitions, puis retrait à l’atelier ou livraison à Dakar — ${siteConfig.phoneDisplay}.`,
              },
            ].map((step, index) => (
              <li key={step.title} className="rounded-xl border border-ink-200 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest text-brand-600">
                  Étape {index + 1}
                </p>
                <h3 className="mt-2 font-bold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-black text-ink-900">
                Dans la même famille : {categoryName(product.category)}
              </h2>
              <Link
                href={`/prestations?category=${product.category}`}
                className="text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                Toute la catégorie →
              </Link>
            </div>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/prestations/${item.id}`}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white transition hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-bold text-ink-900">{item.name}</h3>
                      <p className="mt-1 flex-1 text-sm leading-6 text-ink-600">{item.short}</p>
                      <p className="mt-3 text-sm font-bold text-ink-900">
                        dès {formatPrice(item.price)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
