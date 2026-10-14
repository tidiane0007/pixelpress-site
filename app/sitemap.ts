import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixelpress.sn"; return ["", "/products", "/devis", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })); }
