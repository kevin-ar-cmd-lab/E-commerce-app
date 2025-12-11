'use client';

import { ReactNode } from 'react';
import { CartProvider, UserProvider, ProductProvider, ThemeProvider } from '.';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            {children}
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
