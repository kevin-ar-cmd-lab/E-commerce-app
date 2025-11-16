// app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';
import { CartProvider, UserProvider, ProductProvider, ThemeProvider } from '@/context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'YourBrand Ecommerce',
  description: 'Professional Next.js Ecommerce App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>
            <CartProvider>
              <ProductProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
              </ProductProvider>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
