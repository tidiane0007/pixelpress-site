"use client";

import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailPageContent />
    </Suspense>
  );
}

function ProductDetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    router.replace("/products");
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product);
    // Reset quantity after adding
    setQuantity(1);
    // Optional: show success message
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
          <span className="mx-2 text-sm text-gray-400 dark:text-gray-500">/</span>
          <Link href="/products" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
            Products
          </Link>
          <span className="mx-2 text-sm text-gray-400 dark:text-gray-500">/</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="aspect-w-4 aspect-h-3 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails (optional) */}
              <div className="flex space-x-3">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 dark:text-gray-400"
                  >
                    {index}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                {product.description}
              </p>

              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded dark:bg-green-900">
                    In Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded dark:bg-red-900">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {product.inStock && (
                <button
                  type="button"
                  className="mt-4 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium py-3 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Related Products
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      {relatedProduct.inStock ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900">
                          In Stock
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded dark:bg-red-900">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}