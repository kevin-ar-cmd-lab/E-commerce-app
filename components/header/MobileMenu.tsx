"use client";
import { FC, useState } from 'react';
import Link from 'next/link';

export const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="p-2">
        {open ? '✕' : '☰'}
      </button>
      {open && (
        <div className="flex flex-col space-y-2 mt-2">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </div>
  );
};
