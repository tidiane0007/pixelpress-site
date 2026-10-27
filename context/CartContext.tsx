"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { getProduct, type Product } from "@/lib/products";

/** Ce que le navigateur conserve : une référence au catalogue, pas une copie du
    produit. Un panier qui stockerait nom et prix afficherait des tarifs périmés
    dès qu'une prestation change de tarif. */
interface CartLine {
  key: string;
  id: string;
  quantity: number;
  selections: string[];
}

export interface CartItem extends CartLine {
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, selections?: string[]) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

// v2 : la forme persistée est passée de « produit copié » à « référence au catalogue ».
const STORAGE_KEY = "pixelpress.cart.v2";
const EMPTY: CartLine[] = [];

export const lineKey = (id: string, selections: string[]) =>
  selections.length ? `${id}::${selections.join("|")}` : id;

const isCartLine = (value: unknown): value is CartLine => {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.id === "string" &&
    typeof line.key === "string" &&
    Array.isArray(line.selections) &&
    Number.isInteger(line.quantity) &&
    (line.quantity as number) > 0 &&
    // Une prestation retirée du catalogue disparaît de la demande au prochain rendu.
    getProduct(line.id) !== undefined
  );
};

let current: CartLine[] | null = null;
const listeners = new Set<() => void>();

const readStorage = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartLine) : EMPTY;
  } catch {
    return EMPTY;
  }
};

const getSnapshot = (): CartLine[] => {
  if (current === null) current = readStorage();
  return current;
};

const write = (next: CartLine[]) => {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota atteint ou navigation privée : la demande reste utilisable en mémoire.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = () => {
    current = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

const addToCart = (product: Product, quantity = 1, selections: string[] = []) => {
  const key = lineKey(product.id, selections);
  const lines = getSnapshot();
  const existing = lines.find((line) => line.key === key);
  write(
    existing
      ? lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + quantity } : line))
      : [...lines, { key, id: product.id, quantity, selections }]
  );
};

const removeFromCart = (key: string) => {
  write(getSnapshot().filter((line) => line.key !== key));
};

const updateQuantity = (key: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(key);
    return;
  }
  write(getSnapshot().map((line) => (line.key === key ? { ...line, quantity } : line)));
};

const clearCart = () => {
  write(EMPTY);
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const lines = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const cartItems = useMemo<CartItem[]>(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.id);
        return product ? [{ ...line, product }] : [];
      }),
    [lines]
  );

  const value = useMemo<CartContextType>(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems: cartItems.reduce((sum, line) => sum + line.quantity, 0),
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
