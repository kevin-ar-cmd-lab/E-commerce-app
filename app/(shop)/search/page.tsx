"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { catalogProducts } from "@/lib/catalog";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return catalogProducts;
    }

    return catalogProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Search Products</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Find devices quickly by product name, category, or description.
        </p>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: powerbank, audio, laptop"
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-muted)] py-3 pl-10 pr-3 text-sm outline-none ring-[var(--accent)] focus:ring-1"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--text-muted)]">
        Showing {products.length} result{products.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const formattedPrice = new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            maximumFractionDigits: 0,
          }).format(product.price);

          return (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-3 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--shadow-color)]/25"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={600}
                className="h-44 w-full rounded-xl object-cover"
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {product.category}
              </p>
              <h2 className="mt-1 font-semibold">{product.name}</h2>
              <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{formattedPrice}</p>
            </Link>
          );
        })}
      </div>

      {!products.length && (
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--surface)] p-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">No products matched this search. Try a different keyword.</p>
        </div>
      )}
    </main>
  );
}
