"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden w-full px-4 py-3">
      {/* Top Row: Hamburger + Brand + Icons */}
      <div className="flex items-center justify-between w-full">
        {/* Left: Hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(!open)} className="p-1">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="text-xl font-bold">
            Jumatech
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Search className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
          </Link>
          <Link href="/cart">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
          </Link>
          <Link href="/profile">
            <User className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
          </Link>
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="flex flex-col space-y-3 mt-3">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/shop" onClick={() => setOpen(false)}>
            Shop
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};
