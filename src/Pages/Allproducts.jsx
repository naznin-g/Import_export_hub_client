import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios.jsx";
import ProductCard from "../Component/ProductCard.jsx";

const AllProducts = () => {
  const axios = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products") // fetch all products
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [axios]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default AllProducts;
