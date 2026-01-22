"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
  User,
} from "lucide-react";

// Mock Data
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
    badge: "Best Seller",
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
    badge: null,
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
    badge: "New",
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
    badge: null,
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
    text: "The laptop I bought for my CS degree is perfect. Kevin helped me pick the right specs for coding.",
    initial: "O",
    color: "bg-blue-500",
  },
  {
    name: "Sarah W.",
    role: "Graphic Designer",
    text: "Fast delivery to Kisumu. The packaging was secure and the product was authentic.",
    initial: "S",
    color: "bg-purple-500",
  },
  {
    name: "Brian K.",
    role: "IT Professional",
    text: "Best prices in town. I appreciate the honest advice on what accessories I actually needed.",
    initial: "B",
    color: "bg-green-500",
  },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"All" | string>("All");

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs font-medium py-2 text-center px-4">
        Grand Opening Sale: Get 20% off with code{" "}
        <span className="font-bold text-yellow-400">JUMA20</span>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Next Gen Tech for</span>
              <span className="block text-blue-600">
                Professional Growth
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8">
              Curated electronics specifically for students, developers, and
              creatives. High performance meets affordable pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Contact Developer
              </h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-3">
                  <User size={16} className="text-blue-600" />
                  <span>Kevin Juma (Dev)</span>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
