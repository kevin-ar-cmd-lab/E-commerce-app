import { supabase } from "@/lib/supabaseClient";

/**
 * Storefront product, as shown on the home, products, search and detail pages.
 * Read from the Supabase `products` table (this replaces lib/catalog.ts).
 * `id` is the table's UUID, which is also what `cart.product_id` points to.
 */
export interface StoreProduct {
  id: string;
  name: string;
  category: string | null;
  price: number;
  description: string;
  image: string;
  stock: number;
}

interface ProductRow {
  id: string;
  name: string;
  category: string | null;
  price: number | string;
  description: string | null;
  image_url: string | null;
  stock: number | null;
}

const COLUMNS = "id, name, category, price, description, image_url, stock";

// Shown when a product row has no image_url.
const FALLBACK_IMAGE = "/images/powerbank.svg";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const toProduct = (row: ProductRow): StoreProduct => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: Number(row.price),
  description: row.description ?? "",
  image: row.image_url || FALLBACK_IMAGE,
  stock: row.stock ?? 0,
});

/** All products, oldest first. Returns [] (and logs) if the query fails. */
export async function getProducts(): Promise<StoreProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Could not load products:", error.message);
    return [];
  }

  return ((data ?? []) as ProductRow[]).map(toProduct);
}

/** One product by id, or null if it does not exist or the id is not a UUID. */
export async function getProduct(id: string): Promise<StoreProduct | null> {
  // Old slug URLs like /products/probook-elite-g8 are not UUIDs; querying a
  // uuid column with them would raise a database error, so treat as not found.
  if (!UUID_PATTERN.test(id)) return null;

  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Could not load product:", error.message);
    return null;
  }

  return data ? toProduct(data as ProductRow) : null;
}
