export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "probook-elite-g8",
    name: "ProBook Elite G8",
    category: "Laptops",
    price: 65000,
    description:
      "A reliable performance laptop for developers, students, and business use.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bassmaster-wireless",
    name: "BassMaster Wireless",
    category: "Audio",
    price: 8500,
    description:
      "Noise-isolating wireless headphones with deep bass and all-day battery life.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fittrack-series-5",
    name: "FitTrack Series 5",
    category: "Wearables",
    price: 12000,
    description:
      "Smart fitness tracker with heart-rate monitoring and sleep analytics.",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ecocharge-powerbank",
    name: "EcoCharge Powerbank",
    category: "Accessories",
    price: 3200,
    description:
      "Compact 20,000mAh powerbank with fast charging for phones and tablets.",
    image:
      "https://images.unsplash.com/photo-1585792180666-f7347f490ee2?auto=format&fit=crop&w=1200&q=80",
  },
];
