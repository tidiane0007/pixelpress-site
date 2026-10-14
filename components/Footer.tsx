import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Image src="/pixel-press-logo.png" alt="PIXEL PRESS" width={200} height={58} />
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Navigation</p>
          <nav className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/products" className="hover:text-white">Nos réalisations</Link>
            <Link href="/devis" className="hover:text-white">Demander un devis</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
        <div>
          <p className="font-semibold text-white">Contactez-nous</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <a href={siteConfig.phoneHref} className="hover:text-white">{siteConfig.phoneDisplay}</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        © PIXEL PRESS — Sénégal. Tous droits réservés.
      </div>
    </footer>
  );
}
