import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/ProductDetails";
import { catalogProducts } from "@/lib/catalog";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = catalogProducts.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Link href="/products" className="text-sm text-blue-600 hover:underline">
        Back to products
      </Link>
      <div className="mt-4">
        <ProductDetails
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
          image={product.image}
        />
      </div>
    </main>
  );
}
