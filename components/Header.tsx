"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartItems, totalItems } = useCart();

  return (
    <header className="bg-white dark:bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Ecommerce Store
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <span className="h-5 w-5 flex items-center justify-center text-gray-600 dark:text-gray-400">
                𛒀
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}