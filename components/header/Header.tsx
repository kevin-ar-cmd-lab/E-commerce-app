import { FC } from "react";
import { MobileMenu } from "./MobileMenu";
import { ShoppingCart, User } from "lucide-react";

export const Header: FC = () => (
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

      <span className="text-xl font-bold">Jumatech</span>

      <nav className="flex gap-6">
        <a href="/" className="">Home</a>
        <a href="/shop" className="">Shop</a>
        <a href="/about" className="">About</a>
        <a href="/contact" className="">Contact</a>
      </nav>

      <div className="flex gap-4">
        <ShoppingCart className="w-6 h-6" />
        <User className="w-6 h-6" />
      </div>

    </div>

  </header>
);
