import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/products";

const atelierLinks = [
  { href: "/galerie", label: "Nos techniques en images" },
  { href: "/conseils", label: "Conseils de l'atelier" },
  { href: "/a-propos", label: "L'atelier PIXEL PRESS" },
  { href: "/devis", label: "Demander un devis" },
  { href: "/contact", label: "Nous écrire" },
];

const linkClass = "text-sm text-ink-400 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/pixel-press-logo.png"
            alt="PIXEL PRESS"
            width={200}
            height={60}
            className="rounded-lg bg-white/95 p-2"
          />
          <p className="mt-4 max-w-xs text-sm leading-6 text-ink-400">
            {siteConfig.description} Devis gratuit, impression contrôlée du fichier
            au produit fini.
          </p>
          <div className="mt-5 grid gap-2 text-sm">
            <a href={siteConfig.phoneHref} className="font-bold text-white transition-colors hover:text-brand-300">
              {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="text-ink-400 transition-colors hover:text-white">
              {siteConfig.email}
            </a>
          </div>
        </div>

        <nav aria-label="Prestations">
          <p className="font-bold text-white">Prestations</p>
          <ul className="mt-4 grid gap-3">
            <li>
              <Link href="/prestations" className="text-sm font-semibold text-ink-200 transition-colors hover:text-white">
                Tout le catalogue
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/prestations?category=${category.slug}`} className={linkClass}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Atelier et conseils">
          <p className="font-bold text-white">L&apos;atelier</p>
          <ul className="mt-4 grid gap-3">
            {atelierLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-bold text-white">Discuter d&apos;un projet</p>
          <p className="mt-4 text-sm leading-6 text-ink-400">
            Une question sur un format, un délai ou une finition&nbsp;? Écrivez-nous,
            la réponse vient souvent avant le devis.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block rounded-lg bg-leaf-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-leaf-600"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-ink-800 px-4 py-5 text-center text-xs text-ink-500">
        © {siteConfig.name} — Dakar, Sénégal. Tous droits réservés.
      </div>
    </footer>
  );
}
