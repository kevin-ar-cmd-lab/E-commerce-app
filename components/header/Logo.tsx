"use client";
import { FC } from 'react';
import Link from 'next/link';

export const Logo: FC = () => (
  <Link href="/" className="text-2xl font-bold text-blue-600">
    YourBrand
  </Link>
);
