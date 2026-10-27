import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticle, type ArticleBlock } from "@/lib/articles";
import { formatPrice, getProduct } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Conseil introuvable", robots: { index: false, follow: false } };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/conseils/${article.slug}` },
    openGraph: {
      title: `${article.title} | PIXEL PRESS`,
      description: article.excerpt,
      url: `/conseils/${article.slug}`,
      type: "article",
    },
  };
}

// Comme pour les fiches prestations : la page entière doit venir du rendu statique,
// afin qu'identifiant inconnu réponde 404 au lieu d'une coque envoyée en 200.
export const ensureStatic = 'navigation';

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-black text-ink-900">{block.text}</h2>;
    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-7 text-ink-700">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <ul className="mt-5 grid gap-3 rounded-xl border border-ink-200 bg-ink-50 p-5 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-ink-700">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 fill-none stroke-leaf-500 stroke-[2]"
              >
                <path d="M4 10.5 8 14l8-8.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-5 leading-8 text-ink-700">{block.text}</p>;
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return notFound();

  const url = `${siteConfig.url}/conseils/${article.slug}`;
  const relatedProducts = article.related.flatMap((id) => {
    const product = getProduct(id);
    return product ? [product] : [];
  });

  const wordCount = article.blocks.reduce((sum, block) => {
    const words = "text" in block ? block.text.split(/\s+/).length : block.items.join(" ").split(/\s+/).length;
    return sum + words;
  }, 0);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      datePublished: article.updated,
      dateModified: article.updated,
      wordCount,
      author: { "@id": `${siteConfig.url}/#organisation` },
      publisher: { "@id": `${siteConfig.url}/#organisation` },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Conseils", item: `${siteConfig.url}/conseils` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  const others = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

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
        <ol className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6">
          <li>
            <Link href="/" className="text-ink-500 hover:text-brand-600">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">
            /
          </li>
          <li>
            <Link href="/conseils" className="text-ink-500 hover:text-brand-600">
              Conseils
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">
            /
          </li>
          <li aria-current="page" className="font-semibold text-ink-900">
            {article.category}
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          {article.category}
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-ink-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-600">{article.excerpt}</p>
        <p className="mt-4 text-sm text-ink-400">
          Atelier PIXEL PRESS · {article.minutes} min · mis à jour le {formatDate(article.updated)}
        </p>

        <div className="mt-8 border-t border-ink-200 pt-2">
          {article.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <aside className="mt-12 rounded-2xl border border-ink-200 bg-ink-50 p-6">
            <h2 className="text-lg font-black text-ink-900">Prestations concernées</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/prestations/${product.id}`}
                    className="flex items-baseline justify-between gap-3 rounded-lg border border-ink-200 bg-white px-4 py-3 transition hover:border-brand-400"
                  >
                    <span className="font-semibold text-ink-900">{product.name}</span>
                    <span className="shrink-0 text-sm text-ink-500">
                      dès {formatPrice(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/devis"
            className="rounded-lg bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600"
          >
            Faire chiffrer mon projet
          </Link>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-ink-200 px-5 py-3 font-bold text-ink-800 transition hover:border-brand-400"
          >
            Poser une question sur WhatsApp
          </a>
        </div>
      </article>

      <section className="border-t border-ink-200 bg-ink-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl font-black text-ink-900">Continuer à lire</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/conseils/${item.slug}`}
                  className="block h-full rounded-xl border border-ink-200 bg-white p-5 transition hover:border-brand-400"
                >
                  <p className="text-xs font-black uppercase tracking-widest text-brand-600">
                    {item.category}
                  </p>
                  <p className="mt-2 font-bold leading-6 text-ink-900">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
