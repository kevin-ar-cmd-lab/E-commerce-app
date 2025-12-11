'use client';

import { ReactNode } from 'react';
import '../styles/globals.css';
import { AppProviders } from '@/context/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
