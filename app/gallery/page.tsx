import { products } from '@/lib/products';
import Link from 'next/link';

export const metadata = {
  title: 'Galerie - Pixel Press',
  description: 'Découvrez notre galerie de travaux : impressions textiles, flyers, mugs, cartes de visite, roll-up et bâches publicitaires.',
};

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Notre travail
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Découvrez nos créations : impression textile, flyers, mugs, cartes de visite,
          roll-up et bâches publicitaires.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] flex-col justify-between bg-gradient-to-br from-blue-700 via-cyan-600 to-slate-950 p-5 text-white">
                <span className="text-sm font-bold tracking-[0.2em]">PIXEL PRESS</span>
                <span className="text-2xl font-black">{product.category}</span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
