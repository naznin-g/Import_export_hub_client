import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios.jsx";
import ProductCard from "../Component/ProductCard.jsx";

const AllProducts = () => {
  const axios = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        console.log(res.data); // Inspect the response
        // Use res.data.data if your API returns { data: [...] }
        const productsArray = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProducts(productsArray);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [axios]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-center col-span-full">No products available.</p>
      ) : (
        products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default AllProducts;

