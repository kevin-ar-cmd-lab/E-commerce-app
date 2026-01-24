"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleCheckout = async () => {
    // TODO: integrate payment + Supabase order creation
    clearCart();
    router.push("/success");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              KES {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">
          Total: KES {total.toLocaleString()}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
