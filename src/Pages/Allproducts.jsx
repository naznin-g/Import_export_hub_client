import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios.jsx";
import ProductCard from "../Component/ProductCard.jsx";

const AllProducts = () => {
  const axios = useAxios();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        const productsArray = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProducts(productsArray);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, [axios]);

  // Filter products by name
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-center text-2xl font-bold mb-4 text-[#1D7A8B]">All Our Products</h2>

      {/* Top bar: count + search */}
      <div className="flex justify-between items-center mb-6">
        <p className="font-semibold text-gray-700">
          {filteredProducts.length} products found
        </p>

        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-64"
        />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
