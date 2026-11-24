"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
  /** Resolves true if the item was saved to the cart, false otherwise. */
  addItem: (product: Product) => Promise<boolean>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProductRow {
  id: string;
  name: string;
  price: number | string;
}

interface CartQueryRow {
  id: string;
  quantity: number;
  products: CartProductRow | CartProductRow[] | null;
}

// Table name in Supabase (public.cart).
const CART_TABLE = "cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  /* ---------- Load cart on login ---------- */
  useEffect(() => {
    let isActive = true;

    const syncCart = async () => {
      if (!user) {
        setItems([]);
        return;
      }

      const { data, error } = await supabase
        .from(CART_TABLE)
        .select("id, quantity, products(id, name, price)")
        .eq("user_id", user.id);

      if (error) {
        console.error("Could not load cart:", error.message);
        return;
      }

      if (!isActive || !data) {
        return;
      }

      const mappedItems = (data as unknown as CartQueryRow[]).flatMap((row) => {
        const product = Array.isArray(row.products)
          ? row.products[0]
          : row.products;

        if (!product) return [];

        return [
          {
            id: row.id,
            quantity: row.quantity,
            product: {
              id: product.id,
              name: product.name,
              price: Number(product.price),
            },
          },
        ];
      });

      setItems(mappedItems);
    };

    void syncCart();
    return () => {
      isActive = false;
    };
  }, [user]);

  /* ---------- Add item (increments quantity if already in the cart) ---------- */
  const addItem = async (product: Product): Promise<boolean> => {
    if (!user) return false;

    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      const quantity = existing.quantity + 1;
      const { error } = await supabase
        .from(CART_TABLE)
        .update({ quantity })
        .eq("id", existing.id);

      if (error) {
        console.error("Could not update cart item:", error.message);
        return false;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === existing.id ? { ...item, quantity } : item
        )
      );
      return true;
    }

    const { data, error } = await supabase
      .from(CART_TABLE)
      .insert({
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Could not add to cart:", error?.message);
      return false;
    }

    setItems((prev) => [...prev, { id: data.id, product, quantity: 1 }]);
    return true;
  };

  /* ---------- Remove item ---------- */
  const removeItem = async (id: string) => {
    const { error } = await supabase.from(CART_TABLE).delete().eq("id", id);
    if (error) {
      console.error("Could not remove cart item:", error.message);
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ---------- Clear cart ---------- */
  const clearCart = async () => {
    if (!user) return;
    const { error } = await supabase
      .from(CART_TABLE)
      .delete()
      .eq("user_id", user.id);
    if (error) {
      console.error("Could not clear cart:", error.message);
      return;
    }
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
