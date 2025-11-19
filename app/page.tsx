"use client";
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  Smartphone, 
  Laptop, 
  Watch,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
  User
} from 'lucide-react';

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    name: "ProBook Elite G8",
    category: "Laptops",
    price: 65000,
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "BassMaster Wireless",
    category: "Audio",
    price: 8500,
    rating: 5.0,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: null
  },
  {
    id: 3,
    name: "FitTrack Series 5",
    category: "Wearables",
    price: 12000,
    rating: 4.5,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    badge: "New"
  },
  {
    id: 4,
    name: "EcoCharge Powerbank",
    category: "Accessories",
    price: 3200,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1585792180666-f7347f490ee2?auto=format&fit=crop&w=800&q=80",
    badge: null
  }
];

const FEATURES = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Nationwide Delivery",
    desc: "Fast shipping across Kenya. Free delivery in Nairobi > KES 5K."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "1 Year Warranty",
    desc: "Comprehensive local warranty on all electronics."
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Expert Support",
    desc: "Chat directly with our IT specialists on WhatsApp."
  }
];

const TESTIMONIALS = [
  {
    name: "Ochieng D.",
    role: "Software Student",
    text: "The laptop I bought for my CS degree is perfect. Kevin helped me pick the right specs for coding.",
    initial: "O",
    color: "bg-blue-500"
  },
  {
    name: "Sarah W.",
    role: "Graphic Designer",
    text: "Fast delivery to Kisumu. The packaging was secure and the product was authentic.",
    initial: "S",
    color: "bg-purple-500"
  },
  {
    name: "Brian K.",
    role: "IT Professional",
    text: "Best prices in town. I appreciate the honest advice on what accessories I actually needed.",
    initial: "B",
    color: "bg-green-500"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Format currency to KES
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs font-medium py-2 text-center px-4">
        Grand Opening Sale: Get 20% off with code <span className="font-bold text-yellow-400">JUMA20</span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">J</div>
              <span className="font-bold text-xl tracking-tight">Juma<span className="text-blue-600">Tech</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Shop', 'Why Us', 'Reviews', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                  {item}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-blue-600 transition">
                <Search className="w-5 h-5" />
              </button>
              <button className="relative text-gray-600 hover:text-blue-600 transition group">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg py-2">
            {['Home', 'Shop', 'Why Us', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Next Gen Tech for</span>
              <span className="block text-blue-600">Professional Growth</span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8">
              Curated electronics specifically for students, developers, and creatives. High performance meets affordable pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:-translate-y-1">
                Shop Now
              </button>
              <button className="px-8 py-4 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Hero Image / Abstract Graphic */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100">
          <img 
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-95" 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2070&q=80" 
            alt="Workspace" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent lg:via-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">The Juma Tech Advantage</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">Built by Developers, For Developers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <div className="flex gap-2 mt-4 sm:mt-0 overflow-x-auto pb-2 w-full sm:w-auto">
              {['All', 'Laptops', 'Audio', 'Wearables', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory).map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500" 
                  />
                  {product.badge && (
                    <div className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded ${product.badge === 'New' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">({product.reviews})</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">{formatCurrency(product.price)}</span>
                    <button 
                      onClick={handleAddToCart}
                      className="bg-gray-900 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 gap-2 group">
              View All Products 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-blue-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Tech Enthusiasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <p className="text-gray-100 mb-6 italic">"{item.text}"</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center font-bold`}>
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">J</div>
                <span className="font-bold text-xl text-gray-900">Juma<span className="text-blue-600">Tech</span></span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Empowering your digital journey with the best tools and gadgets available in Kenya.</p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links columns... */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600">Laptops</a></li>
                <li><a href="#" className="hover:text-blue-600">Phones</a></li>
                <li><a href="#" className="hover:text-blue-600">Accessories</a></li>
              </ul>
            </div>

            <div id="contact">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Developer</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-3">
                  <User size={16} className="text-blue-600" />
                  <span>Kevin Juma (Dev)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-blue-600" />
                  <a href="tel:+254113094610" className="hover:text-blue-600">+254 113 094 610</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-600" />
                  <a href="mailto:otienokevino100090@gmail.com" className="hover:text-blue-600 break-all">otienokevino100090@gmail.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-green-500" />
                  <a href="https://wa.me/254113094610" className="hover:text-green-600">Chat on WhatsApp</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
            &copy; 2025 Juma Tech Solutions. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`fixed bottom-5 right-5 transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} z-50`}>
        <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
             <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span>Item added to cart!</span>
        </div>
      </div>

    </div>
  );
}
