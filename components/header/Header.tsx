"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/30 border-b border-white/10">
      <div className="md:hidden w-full">
        <MobileMenu />
      </div>

      <div className="hidden md:flex max-w-7xl mx-auto w-full items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-bold">Jumatech</Link>

        <nav className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 hover:text-blue-600 transition" />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.email}</span>
              <button onClick={logout}>
                <LogOut className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 hover:text-blue-600 transition" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
