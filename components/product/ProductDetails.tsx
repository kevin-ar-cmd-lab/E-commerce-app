import { FC } from 'react';
import Image from 'next/image';
import { Button } from '../forms/Button';

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const ProductDetails: FC<Props> = ({ name, price, description, image }) => (
  <div className="flex flex-col md:flex-row gap-6 p-4">
    <Image
      src={image}
      alt={name}
      width={900}
      height={700}
      sizes="(max-width: 768px) 100vw, 50vw"
      className="w-full md:w-1/2 h-auto object-cover rounded"
    />
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-xl text-blue-600">${price.toFixed(2)}</p>
      <p>{description}</p>
      <Button>Add to Cart</Button>
    </div>
  </div>
);
