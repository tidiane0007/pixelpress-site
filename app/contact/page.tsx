import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact", description: `Contactez ${siteConfig.name} pour vos impressions et objets personnalisés au Sénégal.` };

export default function ContactPage() {
  return <div className="bg-slate-50 py-14"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><section><p className="text-sm font-bold uppercase tracking-widest text-blue-700">Contact</p><h1 className="mt-3 text-4xl font-black text-slate-950">Parlons de votre projet</h1><p className="mt-4 text-lg leading-8 text-slate-600">Notre équipe vous accompagne pour chaque impression et personnalisation.</p><div className="mt-8 grid gap-4 text-slate-700"><a href={siteConfig.phoneHref} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><strong>Téléphone</strong><br />{siteConfig.phoneDisplay}</a><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><strong>WhatsApp</strong><br />{siteConfig.phoneDisplay}</a><a href={`mailto:${siteConfig.email}`} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><strong>E-mail</strong><br />{siteConfig.email}</a></div></section><ContactForm /></div></div>;
}
