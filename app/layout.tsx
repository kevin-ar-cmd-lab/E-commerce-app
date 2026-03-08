import type { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/globals.css";
import { AppProviders } from "@/context/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "JumaTech Shopper",
  description: "Professional electronics e-commerce storefront.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Header />
          <main className="min-h-[80vh]">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
