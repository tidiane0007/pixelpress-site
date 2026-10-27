import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/prestations",
    "/galerie",
    "/a-propos",
    "/conseils",
    "/devis",
    "/contact",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/prestations/${product.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/conseils/${article.slug}`,
      lastModified: new Date(article.updated),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
