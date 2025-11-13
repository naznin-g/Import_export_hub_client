import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Component/ProductCard"; 

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch 6 latest products from backend
    axios
      .get("http://localhost:3000/products?limit=6&sort=-createdAt")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Latest Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
