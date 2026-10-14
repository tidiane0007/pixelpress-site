import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Demander un devis", description: "Obtenez un devis pour vos impressions, supports publicitaires et objets personnalisés PIXEL PRESS." };

export default function QuotePage() {
  return <div className="bg-slate-50 py-14"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><div className="mb-8 text-center"><p className="text-sm font-bold uppercase tracking-widest text-blue-700">Devis gratuit</p><h1 className="mt-3 text-4xl font-black text-slate-950">Votre projet, votre devis</h1><p className="mt-4 text-slate-600">Indiquez le format, les quantités et le délai souhaité : nous vous répondrons avec une proposition adaptée.</p></div><ContactForm quote /></div></div>;
}
