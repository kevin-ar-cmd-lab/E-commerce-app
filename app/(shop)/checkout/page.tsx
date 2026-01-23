'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items: cartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!cartItems || cartItems.length === 0)
    return <p className="text-center mt-10">No items to checkout.</p>;

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <p className="text-lg mb-4">Total: {total.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Proceed to Payment</button>
    </div>
  );
}
