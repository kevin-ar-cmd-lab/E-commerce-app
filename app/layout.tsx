'use client';

import { AppProviders } from '@/context/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
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
