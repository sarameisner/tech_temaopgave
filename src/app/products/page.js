// src/app/products/page.js - altså product siden

"use client";

import React, { useState } from "react";
import useSWR from "swr";
import ProductCard from "../../components/ProductCard";
import { v4 as uuidv4 } from "uuid";
import PopupNotification from "@/components/PopNoti";

// fetch() sender HTTP-anmodning til URL'en og then((res) => res.json()) konverterer det til json
const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductsPage = () => {
  const { data, error } = useSWR("https://dummyjson.com/products", fetcher);
  const [showPopup, setShowPopup] = useState(false);
  // searchQuery er navnet på vores variabel, som indeholder væredien af søgeforespørgelsen og setSearchQuery er funktionen til at opdatere værdien af vores variabel
  const [searchQuery, setSearchQuery] = useState("");
  console.log(data);

  if (error) return <div>Der opstod en fejl...</div>;
  if (!data) return <div>Indlæser...</div>;
  // hvis `data` stadig er null betyder det, at dataene endnu ikke er hentet
  // viser indlæser besked indtil de er tilgængelige
  const handleSearchChange = (e) => {
    // e.target.value giver os værdien fra inputfeltet - altså søgefeltet
    // toLowerCase() er en js metode der gør hele teksten til små bogstaver, for at sikre at søgningen ikke er følsom over for store eller små bogstaver
    setSearchQuery(e.target.value.toLowerCase());
  };

  // koden filtrerer produkterne og returnerer dem, hvis searchQuery findes i titlen, tags eller mærket
  // data.products.filter opretter en ny liste
  const filteredProducts = data.products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchQuery);
    const tagsMatch = product.tags.some((tag) => tag.toLowerCase().includes(searchQuery));
    const brandMatch = product.brand && product.brand.toLowerCase().includes(searchQuery);

    return titleMatch || tagsMatch || brandMatch;
  });

  const handleAddToCart = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // skjuler efter 3 sek
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-josefin font-bold text-center mb-8 text-[#343067]">Webshop</h1>
      <div className="mb-6">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Søg efter produkt, brand eller tag" className="w-full p-3 border  bg-[#FEFEF2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8B3A9]" />
      </div>

      {showPopup && <PopupNotification message="Produkt tilføjet til din kurv!" onClose={() => setShowPopup(false)} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* mapper dataen i products arrayet */}
        {filteredProducts.map((product) => (
          <ProductCard key={uuidv4()} id={product.id} name={product.title} category={product.category} price={product.price} image={product.thumbnail} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
