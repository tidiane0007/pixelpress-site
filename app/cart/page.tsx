"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { formatPrice } from "@/lib/site-config";

export default function CartPage() {
  const { cartItems, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Votre demande est vide
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Ajoutez des prestations pour préparer votre demande de devis.
          </p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
            Découvrir nos services
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
            ← Continuer à découvrir nos services
          </Link>
        </div>
      </div>

      {/* Cart Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center p-4 space-x-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded bg-gradient-to-br from-blue-700 to-cyan-600 p-2 text-center text-xs font-black text-white">PIXEL<br />PRESS</div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Dès {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Récapitulatif de votre demande
              </h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
              >
                Vider la demande
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Prestations ({totalItems})
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Les tarifs restent indicatifs jusqu&apos;à validation du devis.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Estimation à partir de
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(totalPrice)}
                </p>
              </div>

              <div className="sm:col-span-2 lg:col-span-1"><p className="text-sm text-gray-500 dark:text-gray-400">Ajoutez vos formats, finitions et délais dans le formulaire de devis.</p></div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Estimation totale à partir de
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <a href="/devis" className="block w-full bg-green-600 hover:bg-green-700 text-center font-bold py-3 px-8 rounded-lg transition-colors duration-200">Continuer vers le formulaire de devis</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
