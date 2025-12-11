"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* ============================
   TYPES
=============================== */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

/* ============================
   CONTEXT
=============================== */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ============================
   PROVIDER
=============================== */

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* Load cart from localStorage (persistence) */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  /* Save to localStorage whenever cart changes */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* Add item to cart */
  const addItem = (item: CartItem) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  /* Remove item */
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* Update quantity */
  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return; // prevent zero
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  /* Clear all cart */
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ============================
   HOOK
=============================== */

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used inside a CartProvider");
  return context;
}
