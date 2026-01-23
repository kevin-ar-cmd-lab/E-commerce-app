"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="md:hidden w-full px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
          <Link href="/" className="text-xl font-bold">Jumatech</Link>
        </div>

        <div className="flex gap-4">
          <Link href="/search"><Search /></Link>
          <Link href="/cart"><ShoppingCart /></Link>
          {user ? (
            <button onClick={logout}><LogOut className="text-red-600" /></button>
          ) : (
            <Link href="/login"><User /></Link>
          )}
        </div>
      </div>

      {open && (
        <div className="flex flex-col mt-3 space-y-3">
          {user && <span className="text-sm">{user.email}</span>}
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {user && (
            <button onClick={logout} className="text-red-600 text-left">
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};
