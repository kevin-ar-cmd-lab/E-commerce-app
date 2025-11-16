"use client";
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <p>&copy; {new Date().getFullYear()} YourBrand Ecommerce. All rights reserved.</p>
    </footer>
  );
};
