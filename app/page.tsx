import { products } from "@/lib/products";
import Link from "next/link";
import { siteConfig, formatPrice } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Impression & personnalisation</p>
            <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-6xl">
              Vos idées prennent vie avec PIXEL PRESS
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
              Imprimerie numérique et personnalisation d&apos;objets au Sénégal, pour les entreprises, les événements et les particuliers.
            </p>
            <div className="flex flex-wrap justify-center gap-3"><Link href="/devis" className="inline-block rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Demander un devis</Link><a href={siteConfig.phoneHref} className="inline-block rounded-lg border border-slate-600 px-6 py-3 font-bold transition hover:bg-slate-800">Appeler : {siteConfig.phoneDisplay}</a></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Nos services phares
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex aspect-[4/3] flex-col justify-between bg-gradient-to-br from-blue-700 via-cyan-600 to-slate-950 p-5 text-white"><span className="text-sm font-bold tracking-[0.2em]">PIXEL PRESS</span><span className="text-2xl font-black">{product.category}</span></div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-slate-900">
                      Dès {formatPrice(product.price)}
                    </span>
                    {product.inStock ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-dark:bg-green-900">
                        Sur devis
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-dark:bg-red-900">
                        Indisponible
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Une solution pour chaque besoin
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...new Set(products.map(p => p.category))].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="block rounded-lg bg-white p-6 text-center text-slate-900 transition-colors duration-200 hover:bg-cyan-50"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {category}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {products.filter(p => p.category === category).length} prestation{products.filter(p => p.category === category).length > 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
