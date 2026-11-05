import { categories, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

/** Le générateur de devis et factures, posé sur un poste hors-ligne une partie de
    la journée, a besoin du catalogue sans le recopier à la main : une recopie
    diverge du site en deux mois et le client voit deux prix différents.
    Rien ici n'est confidentiel — uniquement ce que la fiche publique affiche déjà.
    Les chemins sont relatifs : l'adresse du site change quand `pixelpress.sn` sera
    branché, et un domaine codé en dur dans un JSON mise en cache afficherait sur les
    devis un lien mort des semaines avant que quelqu'un s'en aperçoive.
    Pas d'horodatage dans la réponse : `new Date()` empêcherait la prérendution et
    le JSON serait régénéré à chaque visite. La fraîcheur se lit sur l'ETag. */
export async function GET() {
  const body = {
    entreprise: {
      nom: siteConfig.name,
      telephone: siteConfig.phoneDisplay,
      whatsapp: siteConfig.whatsappNumber,
      email: siteConfig.email,
    },
    categories: categories.map((category) => ({
      slug: category.slug,
      nom: category.name,
    })),
    prestations: products.map((product) => ({
      id: product.id,
      nom: product.name,
      accroche: product.short,
      prix: product.price,
      unite: product.priceUnit,
      categorie: product.category,
      options: product.options.map((option) => ({
        label: option.label,
        valeurs: option.values,
      })),
      delai: product.delay,
      chemin: `/prestations/${product.id}`,
    })),
  };

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" },
  });
}
