"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="md:hidden w-full px-4 py-3">
      {/* Top Row */}
      <div className="flex items-center justify-between w-full">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(!open)} className="p-1">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="text-xl font-bold">
            Jumatech
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Search className="w-5 h-5 hover:text-blue-600 transition" />
          </Link>
          <Link href="/cart">
            <ShoppingCart className="w-5 h-5 hover:text-blue-600 transition" />
          </Link>

          {user ? (
            <button onClick={logout}>
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          ) : (
            <Link href="/login">
              <User className="w-5 h-5 hover:text-blue-600 transition" />
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="flex flex-col space-y-3 mt-3">
          {user && (
            <span className="text-sm font-medium text-gray-600">
              {user.email}
            </span>
          )}

          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {user && (
            <button
              onClick={logout}
              className="text-left text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};};
