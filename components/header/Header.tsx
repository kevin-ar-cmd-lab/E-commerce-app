"use client";

import { FC } from "react";
import { MobileMenu } from "./MobileMenu";

export const Header: FC = () => (
  <header
    className="
      w-full
      fixed
      top-0
      left-0
      z-50
      bg-transparent
      shadow-none
      px-2
      py-1
    "
  >

    {/* Mobile Header */}
    <div className="md:hidden w-full">
      <MobileMenu />
    </div>

    {/* Desktop Header (hidden for now, expands later) */}
    <div className="hidden md:flex max-w-7xl mx-auto w-full px-4 py-2 justify-between items-center">
      <h1 className="text-xl font-bold">Jumatech</h1>
      <div className="flex gap-4">
        {/* Desktop icons/links go here */}
      </div>
    </div>

  </header>
);

export default Header;
