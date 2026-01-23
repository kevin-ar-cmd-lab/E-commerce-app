"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  /* ---------- Load cart on login ---------- */
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    const loadCart = async () => {
      const { data } = await supabase
        .from("cart_items")
        .select("id, quantity, products(id, name, price)")
        .eq("user_id", user.id);

      if (data) {
        setItems(
          data.map((row: any) => ({
            id: row.id,
            quantity: row.quantity,
            product: row.products,
          }))
        );
      }
    };

    loadCart();
  }, [user]);

  /* ---------- Add item ---------- */
  const addItem = async (product: Product) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      })
      .select("id")
      .single();

    if (!error && data) {
      setItems((prev) => [
        ...prev,
        { id: data.id, product, quantity: 1 },
      ]);
    }
  };

  /* ---------- Remove item ---------- */
  const removeItem = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ---------- Clear cart ---------- */
  const clearCart = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
