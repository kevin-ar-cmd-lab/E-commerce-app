"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export const Header = () => (
  <header
    className="
      w-full fixed top-0 left-0 z-50
      backdrop-blur-lg bg-white/30
      border-b border-white/10
    "
  >
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

      {/* Navigation Links */}
      <nav className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Right Icons */}
      <div className="flex gap-4">
        <Link href="/cart">
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-600 transition" />
        </Link>
        <Link href="/profile">
          <User className="w-6 h-6 cursor-pointer hover:text-blue-600 transition" />
        </Link>
      </div>
    </div>
  </header>
);
