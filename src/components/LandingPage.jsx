// src/components/LandingPage.jsx
import React from "react";
import Link from "next/link";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-serif font-bold mb-4 text-gray-900">Velkommen til M&S</h1>
      <p className="mb-6 text-lg text-gray-700">Her kan du finde en række af vores super lækre produkter!</p>
      <Link href="/products" className="px-6 py-3 text-white bg-gray-900 rounded hover:bg-gray-800 transition">
        Se produkter
      </Link>
    </div>
  );
}

export default LandingPage;