import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { siteConfig } from "@/lib/site-config";

// Le root layout ne reçoit que children : LayoutProps<"/"> est le type généré par
// Next. Redéclarer LayoutProps localement masque ce type et casse le type-check du build.

// Preload fonts for better CLS - using variable fonts via next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Preconnect to external domains for faster resource loading
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

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
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip link for keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <CartProvider>
          <ToastProvider>
            <Header />
            <main id="main-content" className="flex-1">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
            <Suspense fallback={null}>
              <WhatsAppButton />
            </Suspense>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
