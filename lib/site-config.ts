// Netlify fournit URL (production) et DEPLOY_PRIME_URL (aperçu) au moment du
// build : les lire évite de ressaisir l'environnement à chaque changement
// d'adresse, et empêche le canonical, le sitemap et les og:image d'annoncer un
// domaine qui ne répond pas. Une variable déclarée mais vide est ignorée :
// sinon new URL("") échoue au build pour une saisie accidentelle dans l'interface.
const publicUrl = (): string =>
  [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
  ].find((value) => value && value.trim()) ?? "https://pixelpress.sn";

export const siteConfig = {
  name: "PIXEL PRESS",
  description:
    "Imprimerie numérique et personnalisation d'objets au Sénégal.",
  url: publicUrl(),
  phoneDisplay: "+221 77 814 40 32",
  phoneHref: "tel:+221778144032",
  whatsappNumber: "221778144032",
  whatsappUrl: "https://wa.me/221778144032",
  email: "pixelpressdk@gmail.com",
  locale: "fr_SN",
  country: "SN",
} as const;

export const buildWhatsAppUrl = (message: string) =>
  `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
