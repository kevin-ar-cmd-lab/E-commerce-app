'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider, UserProvider, ProductProvider, ThemeProvider } from '.';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
