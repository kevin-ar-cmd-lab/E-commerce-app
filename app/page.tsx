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
    new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(
      amount
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs font-medium py-2 text-center px-4">
        Grand Opening Sale: Get 20% off with code{" "}
        <span className="font-bold text-yellow-400">JUMA20</span>
      </div>

      {/* Page content (navigation is provided globally in layout/Header) */}

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Next Gen Tech for</span>
              <span className="block text-blue-600">Professional Growth</span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8">
              Curated electronics specifically for students, developers, and
              creatives. High performance meets affordable pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#shop"
                className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:-translate-y-1 inline-block text-center"
              >
                Shop Now
              </a>
              <a
                href="#why-us"
                className="px-8 py-4 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors inline-block text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-95"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2070&q=80"
            alt="Workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent lg:via-transparent" />
        </div>
      </section>

      {/* Features */}
      <section id="why-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
              The Juma Tech Advantage
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">
              Built by Developers, For Developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="flex p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Products
            </h2>

            <div className="flex gap-2 mt-4 sm:mt-0 overflow-x-auto pb-2 w-full sm:w-auto">
              {["All", "Laptops", "Audio", "Wearables", "Accessories"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(
              (p) => activeCategory === "All" || p.category === activeCategory
            ).map((product) => (
              <article
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500"
                  />

                  {product.badge && (
                    <div
                      className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded ${
                        product.badge === "New"
                          ? "bg-green-600"
                          : product.badge === "Best Seller"
                          ? "bg-orange-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                  <div className="flex items-center mt-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="mt-4 text-xl font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 gap-2 group"
            >
              View All Products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-blue-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Tech Enthusiasts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <p className="text-gray-100 mb-6 italic">"{item.text}"</p>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center font-bold`}
                  >
                    {item.initial}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-blue-200 text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Stay updated with our latest offers
          </h3>
          <p className="text-gray-500 mb-6">
            Join our mailing list for exclusive deals and product drops.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto min-w-0 px-4 py-3 border border-gray-200 rounded-lg focus:ring-0 focus:outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    {/* Footer */}
<footer className="bg-white border-t border-gray-200 pt-12 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

      {/* Brand */}
      <div className="col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            J
          </div>
          <span className="font-bold text-xl text-gray-900">
            Juma<span className="text-blue-600">Tech</span>
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Empowering your digital journey with the best tools and gadgets
          available in Kenya.
        </p>
        <div className="flex space-x-4">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Shop */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Shop
        </h3>
        <ul className="space-y-2 text-sm text-gray-500">
          <li><a href="#" className="hover:text-blue-600">Laptops</a></li>
          <li><a href="#" className="hover:text-blue-600">Phones</a></li>
          <li><a href="#" className="hover:text-blue-600">Accessories</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div id="contact">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Contact Developer
        </h3>
        <ul className="space-y-3 text-sm text-gray-500">
          <li className="flex items-center gap-3">
            <User size={16} className="text-blue-600" />
            <span>Kevin Juma (Dev)</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={16} className="text-blue-600" />
            <a href="tel:+254113094610" className="hover:text-blue-600">
              +254 113 094 610
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="text-blue-600" />
            <a
              href="mailto:otienokevino100090@gmail.com"
              className="hover:text-blue-600 break-all"
            >
              otienokevino100090@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MessageCircle size={16} className="text-green-500" />
            <a
              href="https://wa.me/254113094610"
              className="hover:text-green-600"
            >
              Chat on WhatsApp
            </a>
          </li>
        </ul>
      </div>

    </div>
  </div>
</footer>
