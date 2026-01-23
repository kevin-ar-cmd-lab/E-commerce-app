"use client";

import React, { useState } from "react";
import {
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  Phone,
  Mail,
  MessageCircle,
  User,
} from "lucide-react";

/* -------------------- MOCK DATA -------------------- */

const PRODUCTS = [
  {
    id: 1,
    name: "ProBook Elite G8",
    category: "Laptops",
    price: 65000,
    rating: 4.8,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "BassMaster Wireless",
    category: "Audio",
    price: 8500,
    rating: 5.0,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "FitTrack Series 5",
    category: "Wearables",
    price: 12000,
    rating: 4.5,
    reviews: 8,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "EcoCharge Powerbank",
    category: "Accessories",
    price: 3200,
    rating: 4.7,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1585792180666-f7347f490ee2?auto=format&fit=crop&w=800&q=80",
  },
];

const FEATURES = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Nationwide Delivery",
    desc: "Fast shipping across Kenya. Free delivery in Nairobi over KES 5,000.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "1 Year Warranty",
    desc: "Comprehensive local warranty on all electronics.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Expert Support",
    desc: "Chat directly with our IT specialists on WhatsApp.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ochieng D.",
    role: "Software Student",
    text: "The laptop I bought for my CS degree is perfect. I got honest advice and great value.",
    initial: "O",
    color: "bg-blue-500",
  },
  {
    name: "Sarah W.",
    role: "Graphic Designer",
    text: "Fast delivery to Kisumu. Packaging was secure and the product was authentic.",
    initial: "S",
    color: "bg-purple-500",
  },
  {
    name: "Brian K.",
    role: "IT Professional",
    text: "Best prices around. No upselling — just practical recommendations.",
    initial: "B",
    color: "bg-green-500",
  },
];

/* -------------------- PAGE -------------------- */

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs font-medium py-2 text-center">
        Grand Opening Sale: Get 20% off with{" "}
        <span className="font-bold text-yellow-400">JUMA20</span>
      </div>

      {/* Hero */}
      <section className="bg-white py-20 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Next Gen Tech for{" "}
          <span className="text-blue-600">Professional Growth</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Curated electronics for students, developers, and creatives. High
          performance meets affordable pricing.
        </p>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.category}
                </p>

                <div className="flex items-center text-sm text-yellow-500 mb-2">
                  <Star size={14} className="mr-1" />
                  {product.rating} ({product.reviews})
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">
                    {formatCurrency(product.price)}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {FEATURES.map((feature, idx) => (
            <div key={idx}>
              <div className="flex justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">
            What Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <p className="text-sm text-gray-600 mb-4">
                  “{t.text}”
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${t.color}`}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-sm font-semibold mb-4">
            Contact Developer
          </h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-center gap-3">
              <User size={16} className="text-blue-600" />
              Kevin Juma (Dev)
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-blue-600" />
              <a href="tel:+254113094610">+254 113 094 610</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-blue-600" />
              <a href="mailto:otienokevino100090@gmail.com">
                otienokevino100090@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={16} className="text-green-500" />
              <a href="https://wa.me/254113094610">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
