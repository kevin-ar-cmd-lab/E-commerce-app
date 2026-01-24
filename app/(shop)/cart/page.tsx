"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { items } = useCart();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading cart…</p>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-6">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    KES{" "}
                    {item.product.price.toLocaleString()} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 font-semibold">
                  KES{" "}
                  {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-6">
            <p className="text-xl font-bold">
              Total: KES {total.toLocaleString()}
            </p>

            <Link
              href="/checkout"
              className="rounded-md bg-green-600 px-8 py-3 text-white hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
