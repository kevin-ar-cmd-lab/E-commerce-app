import { ProductCard } from "@/components/product/ProductCard";
import { catalogProducts } from "@/lib/catalog";

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="mt-2 text-gray-600">
          Trusted devices and accessories for everyday professional use.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {catalogProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </main>
  );
}
