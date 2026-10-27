import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Conseils d’impression",
  description:
    "Préparer un fichier, choisir un grammage, comparer sérigraphie et DTF, comprendre un devis et sécuriser un délai : les repères de l’atelier PIXEL PRESS.",
  alternates: { canonical: "/conseils" },
};

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Conseils PIXEL PRESS",
  numberOfItems: articles.length,
  itemListElement: articles.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.title,
    url: `${siteConfig.url}/conseils/${article.slug}`,
  })),
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function ConseilsPage() {
  return (
    <div className="bg-ink-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Le coin atelier</p>
        <h1 className="mt-2 text-3xl font-black text-ink-900 sm:text-4xl">
          Des repères avant de commander
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-ink-600">
          Ces pages ne vendent rien : elles évitent les fichiers rejetés, les mauvais supports et les
          délais impossibles. Le temps gagné est des deux côtés du comptoir.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/conseils/${article.slug}`}
                className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-brand-600">
                  {article.category}
                </p>
                <h2 className="mt-3 text-lg font-bold text-ink-900">{article.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{article.excerpt}</p>
                <p className="mt-4 text-xs text-ink-400">
                  {article.minutes} min de lecture · mis à jour le {formatDate(article.updated)}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-ink-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-black text-ink-900">Votre besoin n’est pas dans la liste ?</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink-600">
            Envoyez le visuel, la quantité et la date : nous répondons avec un chiffrage et, s’il le
            faut, une contre-proposition de support.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/devis"
              className="rounded-lg bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600"
            >
              Demander un devis
            </Link>
            <Link
              href="/prestations"
              className="rounded-lg border border-ink-200 px-5 py-3 font-bold text-ink-800 transition hover:border-brand-400"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
