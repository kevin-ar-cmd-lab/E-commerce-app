"use client";

import Link from "next/link";
import { Mail, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-10 w-full border-t border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-color)]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <section>
          <h3 className="text-lg font-bold">Jumatech Shopper</h3>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Reliable electronics for creators, students, and professionals.
          </p>
          <div className="mt-4 flex gap-4 text-sm text-[var(--text-muted)]">
            <a href="#" aria-label="Instagram" className="hover:text-[var(--accent)]">Instagram</a>
            <a href="#" aria-label="Facebook" className="hover:text-[var(--accent)]">Facebook</a>
            <a href="#" aria-label="X" className="hover:text-[var(--accent)]">X</a>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/products" className="hover:text-[var(--accent)]">Shop</Link>
            <Link href="/search" className="hover:text-[var(--accent)]">Search</Link>
            <Link href="/about" className="hover:text-[var(--accent)]">About</Link>
            <Link href="/contact" className="hover:text-[var(--accent)]">Contact</Link>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">Newsletter</h3>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Subscribe for product drops, restocks, and weekly deals.
          </p>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-muted)] py-2.5 pl-9 pr-3 text-sm outline-none ring-[var(--accent)] focus:ring-1"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Subscribe
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>

      <div className="w-full border-t border-[var(--border-color)] px-4 py-4 text-center text-xs text-[var(--text-muted)] sm:px-6">
        &copy; {new Date().getFullYear()} Jumatech Shopper. All rights reserved.
      </div>
    </footer>
  );
};
