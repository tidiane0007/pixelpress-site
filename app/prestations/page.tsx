import type { Metadata } from "next";
import { Suspense } from "react";
import ProductBrowser from "@/components/ProductBrowser";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nos prestations d’impression",
  description:
    "Flyers, cartes de visite, t-shirts, mugs, roll-up et bâches à Dakar : 12 prestations d’imprimerie numérique, leurs options, leurs délais et des tarifs de départ. Devis confirmé sous 24 h.",
  alternates: { canonical: "/prestations" },
};

// ItemList : le catalogue est la page que Google doit comprendre comme une liste
// de prestations, pas une simple grille de vignettes.
const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Catalogue PIXEL PRESS",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${siteConfig.url}/prestations/${product.id}`,
  })),
};

export default function PrestationsPage() {
  return (
    <div className="bg-ink-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-black text-ink-900">Nos prestations d’impression</h1>
          </div>
        }
      >
        <ProductBrowser />
      </Suspense>
    </div>
  );
}
