"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const Header = () => {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/30 border-b border-white/10">
      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full">
        <MobileMenu />
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex max-w-7xl mx-auto w-full items-center justify-between px-6 py-3">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold">
          Jumatech
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-600 transition" />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {user.email}
              </span>
              <button onClick={handleLogout}>
                <LogOut className="w-5 h-5 text-red-600 hover:opacity-80" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 cursor-pointer hover:text-blue-600 transition" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
