'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CartPage() {
  const { user, loading } = useAuth();
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <p>Loading cart...</p>;

  if (!items || items.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-4 rounded">
            <span>{item.product.name}</span>
            <span>{item.quantity}</span>
            <span>{item.product.price.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
