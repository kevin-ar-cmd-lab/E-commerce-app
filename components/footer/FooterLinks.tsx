"use client";
import React from 'react';
import Link from 'next/link';

export const FooterLinks = () => {
  return (
    <div className="flex justify-center space-x-4">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
};
