export const siteConfig = {
  name: "PIXEL PRESS",
  description:
    "Imprimerie numérique et personnalisation d'objets au Sénégal.",
  phoneDisplay: "+221 77 814 40 32",
  phoneHref: "tel:+221778144032",
  whatsappNumber: "221778144032",
  whatsappUrl: "https://wa.me/221778144032",
  email: "pixelpressdk@gmail.com",
  locale: "fr_SN",
  country: "SN",
} as const;

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);
