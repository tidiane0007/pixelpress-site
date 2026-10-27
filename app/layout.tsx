import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "PIXEL PRESS | Imprimerie numérique au Sénégal", template: "%s | PIXEL PRESS" },
  description: siteConfig.description,
  keywords: ["imprimerie numérique Sénégal", "personnalisation d'objets", "impression", "Dakar", "PIXEL PRESS"],
  openGraph: {
    title: "PIXEL PRESS",
    description: siteConfig.description,
    siteName: "PIXEL PRESS",
    locale: siteConfig.locale,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PIXEL PRESS",
    description: siteConfig.description,
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "PrintShop",
  "@id": `${siteConfig.url}/#organisation`,
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: siteConfig.country,
  },
  areaServed: { "@type": "Country", name: "Sénégal" },
  sameAs: [siteConfig.whatsappUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <WhatsAppButton />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
