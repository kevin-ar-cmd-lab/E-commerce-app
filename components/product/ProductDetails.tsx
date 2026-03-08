import { FC } from "react";
import Image from "next/image";
import { Button } from "../forms/Button";

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const ProductDetails: FC<Props> = ({ name, price, description, image }) => {
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4 md:grid-cols-2 md:p-6">
      <Image
        src={image}
        alt={name}
        width={900}
        height={700}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="h-full min-h-72 w-full rounded-xl object-cover"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-xl font-bold text-[var(--accent)]">{formattedPrice}</p>
        <p className="text-[var(--text-muted)]">{description}</p>
        <div>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};
