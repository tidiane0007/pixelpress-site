import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${siteConfig.name} à Dakar : téléphone, WhatsApp et e-mail pour vos impressions et objets personnalisés.`,
  alternates: { canonical: "/contact" },
};

const canaux = [
  {
    label: "Téléphone",
    value: siteConfig.phoneDisplay,
    note: "Le plus rapide en journée.",
    href: siteConfig.phoneHref,
    external: false,
  },
  {
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    note: "Idéal pour envoyer un visuel ou un fichier.",
    href: siteConfig.whatsappUrl,
    external: true,
  },
  {
    label: "E-mail",
    value: siteConfig.email,
    note: "Pour les demandes détaillées et les dossiers.",
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-ink-50 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <section>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-500">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-black text-ink-950">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-600">
            Une question de format, de finition ou de délai&nbsp;? Nous répondons
            avant de chiffrer, pour éviter les devis à côté du besoin.
          </p>

          <div className="mt-8 grid gap-3">
            {canaux.map((canal) => (
              <a
                key={canal.label}
                href={canal.href}
                {...(canal.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-ink-200 transition hover:ring-brand-300"
              >
                <p className="font-bold text-ink-950">{canal.label}</p>
                <p className="mt-1 text-brand-600">{canal.value}</p>
                <p className="mt-1 text-sm text-ink-500">{canal.note}</p>
              </a>
            ))}
          </div>

          <p className="mt-8 text-sm leading-6 text-ink-600">
            Vous voulez d&apos;abord comparer les supports&nbsp;?{" "}
            <Link href="/prestations" className="font-bold text-brand-600 hover:text-brand-700">
              Voir le catalogue
            </Link>{" "}
            ou{" "}
            <Link href="/conseils" className="font-bold text-brand-600 hover:text-brand-700">
              lire nos conseils
            </Link>
            .
          </p>
        </section>

        <ContactForm />
      </div>
    </div>
  );
}
