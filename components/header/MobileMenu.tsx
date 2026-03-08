"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, LogOut, Moon, Sun } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useTheme } from "@/context/ThemeContext";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

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
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="w-full px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="rounded-md p-1 hover:bg-[var(--surface-hover)]">
            {open ? <X /> : <Menu />}
          </button>
          <Link href="/" className="text-xl font-black tracking-tight">
            Jumatech
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md border border-[var(--border-color)] bg-[var(--surface)] p-1.5"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/search" aria-label="Search"><Search /></Link>
          <Link href="/cart" aria-label="Cart"><ShoppingCart /></Link>
          {user ? (
            <button onClick={logout} aria-label="Logout"><LogOut className="text-red-600" /></button>
          ) : (
            <Link href="/login" aria-label="Login"><User /></Link>
          )}
        </div>
      </div>

      {open && (
        <div className="mt-3 flex flex-col space-y-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-4">
          {user && <span className="truncate text-sm text-[var(--text-muted)]">{user.email}</span>}
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/search" onClick={() => setOpen(false)}>Search</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          {user && (
            <button onClick={logout} className="text-left text-red-600">
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};
