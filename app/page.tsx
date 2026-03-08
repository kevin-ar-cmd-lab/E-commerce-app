"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Star, Truck, Zap } from "lucide-react";
import { catalogProducts } from "@/lib/catalog";

const FEATURES = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Fast Delivery",
    desc: "Dispatch in 24 hours with tracked delivery to every county.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Trusted Warranty",
    desc: "All devices include local warranty support and verified sourcing.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Picks",
    desc: "Curated products for dev work, design tasks, and daily productivity.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amina W.",
    role: "UX Designer",
    text: "Quick checkout, authentic products, and delivery updates were clear from start to finish.",
  },
  {
    name: "Kevin O.",
    role: "Student Developer",
    text: "The powerbank and headphones combo was exactly what I needed for campus and travel.",
  },
  {
    name: "Lydia N.",
    role: "Product Manager",
    text: "The storefront feels premium and support responded with practical advice in minutes.",
  },
];

export default function HomePage() {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)]">
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--surface-muted)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--badge-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Deals, Daily
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              E-commerce tech store built for serious daily performance
            </h1>
            <p className="text-base text-[var(--text-muted)] sm:text-lg">
              Shop laptops, audio gear, wearables, and accessories with clean pricing, responsive support, and reliable delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/search"
                className="rounded-xl border border-[var(--border-color)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--surface-hover)]"
              >
                Search Products
              </Link>
            </div>
          </div>

          <div className="w-full max-w-lg rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-4 shadow-xl shadow-[var(--shadow-color)]/30">
            <div className="grid grid-cols-2 gap-4">
              {catalogProducts.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-xl border border-[var(--border-color)] bg-[var(--surface-muted)] p-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={350}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  <p className="mt-2 text-xs font-semibold">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured Products</h2>
          <Link href="/products" className="text-sm font-semibold text-[var(--accent)] hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {catalogProducts.map((product) => (
            <article
              key={product.id}
              className="group rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--shadow-color)]/25"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={900}
                height={700}
                className="h-44 w-full rounded-xl object-cover"
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {product.category}
              </p>
              <h3 className="mt-1 text-base font-semibold">{product.name}</h3>
              <div className="mt-2 flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-[var(--accent)]">{formatCurrency(product.price)}</span>
                <Link
                  href={`/products/${product.id}`}
                  className="rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-xs font-semibold transition hover:bg-[var(--surface-hover)]"
                >
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border-color)] bg-[var(--surface-muted)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <div className="mb-4 inline-flex rounded-full bg-[var(--badge-bg)] p-3 text-[var(--accent)]">{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Customer Reviews</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--text-muted)]">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-5">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
