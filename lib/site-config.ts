export const siteConfig = {
  name: "PIXEL PRESS",
  description:
    "Imprimerie numérique et personnalisation d'objets au Sénégal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixelpress.sn",
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
