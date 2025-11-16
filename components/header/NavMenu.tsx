"use client";
import { FC } from 'react';
import Link from 'next/link';

export const NavMenu: FC = () => (
  <nav className="hidden md:flex space-x-6">
    <Link href="/">Home</Link>
    <Link href="/shop">Shop</Link>
    <Link href="/about">About</Link>
    <Link href="/contact">Contact</Link>
  </nav>
);
