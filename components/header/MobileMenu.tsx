"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";

export const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden w-full px-4 py-3">

      {/* Top Row: Hamburger + Title + Icons */}
      <div className="flex items-center justify-between w-full">

        {/* Left: Hamburger + Jumatech */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="p-1"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <h1 className="text-xl font-bold">Jumatech</h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5" />
          <ShoppingCart className="w-5 h-5" />
          <User className="w-5 h-5" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="flex flex-col space-y-3 mt-3">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}

    </div>
  );
};
