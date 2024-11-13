// src/app/products/[id]/page.js
"use client";
import React, { useState, useEffect, useContext } from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { CartContext } from "../../../context/CartContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [productId, setProductId] = useState(id);

  useEffect(() => {
    setProductId(id);
  }, [id]);

  const { data: product, error } = useSWR(productId ? `https://dummyjson.com/products/${productId}` : null, fetcher);

  if (error) return <div>Der opstod en fejl...</div>;
  if (!product) return <div>Indlæser...</div>;

  // det er her der skal gøres noget for at få produktet fra singleview hen til kurven når det tilføjes ..
  const handleAddToCart = () => {
    addToCart(product); // sender hele produktet til addToCart (troede jeg)

    console.log("Adding to cart:", product);
    //addToCart({ id, name, price, thumbnail: image })} det er de her ting vi skal få sendt med - jeg troede at jeg havde mappet det ind, så man bare kunne skrive product
    alert("Produkt tilføjet til kurv!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="w-full lg:w-1/2 object-cover h-96 lg:h-full" />
        <div className="p-6 lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <div className="text-2xl font-bold text-pink-500 mb-6">{product.price} kr.</div>
          <button onClick={handleAddToCart} className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
            Tilføj til kurv
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
