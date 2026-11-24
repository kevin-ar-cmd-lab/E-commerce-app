"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/forms/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart, type Product } from "@/context/CartContext";

interface Props {
  product: Product;
}

type Status = "idle" | "adding" | "added" | "error";

export const AddToCartButton: FC<Props> = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { addItem } = useCart();
  const [status, setStatus] = useState<Status>("idle");

  const handleClick = async () => {
    // Carts are stored per account, so sign in first and come back here.
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    setStatus("adding");
    const ok = await addItem(product);
    setStatus(ok ? "added" : "error");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Button
          onClick={handleClick}
          disabled={loading || status === "adding"}
        >
          {status === "adding"
            ? "Adding..."
            : status === "added"
              ? "Added to cart"
              : "Add to Cart"}
        </Button>
        {status === "added" && (
          <Link href="/cart" className="text-sm text-[var(--accent)] hover:underline">
            View cart
          </Link>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Couldn&apos;t add this to your cart. Please try again.
        </p>
      )}
    </div>
  );
};
