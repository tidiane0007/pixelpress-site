import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-ink-50 px-4 py-20">
      <div className="max-w-xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-500">
          Erreur 404
        </p>
        <h1 className="mt-3 text-4xl font-black text-ink-950">
          Cette page n&apos;existe plus
        </h1>
        <p className="mt-4 leading-7 text-ink-600">
          Le lien est peut-être ancien ou mal recopié. Tout est encore accessible
          depuis le catalogue, l&apos;atelier et les conseils de l&apos;équipe.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/prestations" className="rounded-lg bg-brand-500 px-6 py-3 font-bold text-white transition hover:bg-brand-600">
            Voir nos prestations
          </Link>
          <Link href="/devis" className="rounded-lg bg-ink-950 px-6 py-3 font-bold text-white transition hover:bg-ink-800">
            Demander un devis
          </Link>
        </div>
        <nav aria-label="Raccourcis" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-ink-600">
          <Link href="/galerie" className="hover:text-brand-600">Nos techniques en images</Link>
          <Link href="/conseils" className="hover:text-brand-600">Conseils de l&apos;atelier</Link>
          <Link href="/a-propos" className="hover:text-brand-600">L&apos;atelier</Link>
        </nav>
      </div>
    </div>
  );
}
