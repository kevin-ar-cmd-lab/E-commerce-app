import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/products";

// Products come from Supabase on every request.
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Shop All Products</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
          Discover trusted electronics and accessories with practical specs, fair prices, and nationwide delivery.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--text-muted)]">
          No products are available right now. Please check back soon.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}
