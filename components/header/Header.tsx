"use client";

import Link from "next/link";
import { Moon, Search, ShoppingCart, Sun, User, LogOut } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useTheme } from "@/context/ThemeContext";

export const Header = () => {
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
    router.refresh();
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--header-bg)]/90 backdrop-blur-xl">
      <div className="md:hidden w-full">
        <MobileMenu />
      </div>

      <div className="hidden w-full items-center justify-between px-6 py-3 md:flex">
        <Link href="/" className="text-xl font-black tracking-tight">
          Jumatech
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/search">Search</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--surface)] p-2 hover:bg-[var(--surface-hover)]"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link href="/search" aria-label="Search">
            <Search className="h-5 w-5 transition hover:text-[var(--accent)]" />
          </Link>

          <Link href="/cart" aria-label="Cart">
            <ShoppingCart className="h-5 w-5 transition hover:text-[var(--accent)]" />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="max-w-40 truncate text-xs">{user.email}</span>
              <button onClick={logout} aria-label="Logout">
                <LogOut className="h-5 w-5 text-red-600" />
              </button>
            </div>
          ) : (
            <Link href="/login" aria-label="Login">
              <User className="h-5 w-5 transition hover:text-[var(--accent)]" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
