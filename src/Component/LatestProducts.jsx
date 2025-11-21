import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios.jsx";
import ProductCard from "./ProductCard.jsx"; 

const LatestProducts = () => {
  const axios = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:3000/latest-products")
    .then(res => {
      console.log(res.data); // <-- check what server sends
      setProducts(res.data)
    })
    .catch(err => console.error(err));
}, [axios]);

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
