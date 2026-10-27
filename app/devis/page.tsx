import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Devis gratuit pour vos impressions, supports publicitaires et objets personnalisés à Dakar. Format, quantité, finition : nous répondons avec un tarif clair.",
  alternates: { canonical: "/devis" },
};

const etapes = [
  {
    title: "Vous précisez le besoin",
    text: "Support, quantité, format, finition et date souhaitée. Le formulaire reprend votre sélection du catalogue.",
  },
  {
    title: "Nous vérifions la faisabilité",
    text: "Nous contrôlons le fichier, la matière et le délai atelier avant de chiffrer. Un doute ? Nous le disons.",
  },
  {
    title: "Vous recevez un tarif ferme",
    text: "Un prix pour ce que vous avez demandé, pas une estimation large. Validez, nous lançons la production.",
  },
];

export default function QuotePage() {
  return (
    <div className="bg-ink-50 py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-500">
            Devis gratuit
          </p>
          <h1 className="mt-3 text-4xl font-black text-ink-950 sm:text-5xl">
            Votre projet, votre tarif
          </h1>
          <p className="mt-4 leading-7 text-ink-600">
            Indiquez le format, les quantités et le délai souhaité&nbsp;: nous
            répondons avec une proposition claire, sans engagement.
          </p>
        </div>

        <ol className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
          {etapes.map((etape, index) => (
            <li key={etape.title} className="rounded-2xl bg-white p-5 ring-1 ring-ink-200">
              <p className="text-xs font-black uppercase tracking-widest text-brand-500">
                Étape {index + 1}
              </p>
              <h2 className="mt-2 font-bold text-ink-950">{etape.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">{etape.text}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="mb-4 text-sm text-ink-600">
            Prestations déjà choisies&nbsp;?{" "}
            <Link href="/panier" className="font-bold text-brand-600 hover:text-brand-700">
              Vérifier ma sélection
            </Link>{" "}
            avant l&apos;envoi.
          </p>
          <ContactForm quote />
        </div>
      </div>
    </div>
  );
}
