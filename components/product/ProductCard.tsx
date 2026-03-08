import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard: FC<Props> = ({ id, name, price, image }) => {
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Link
      href={`/products/${id}`}
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-3 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--shadow-color)]/25"
    >
      <Image
        src={image}
        alt={name}
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="mb-3 h-48 w-full rounded-xl object-cover"
      />
      <h3 className="font-bold">{name}</h3>
      <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{formattedPrice}</p>
    </Link>
  );
};
