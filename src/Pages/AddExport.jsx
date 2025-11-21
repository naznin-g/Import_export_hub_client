import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { useNavigate } from "react-router-dom";

const AddExport = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    originCountry: "",
    rating: "",
    availableQuantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      
      const response = await axiosSecure.post("/products", {
        ...productData,
        price: parseFloat(productData.price),
        rating: parseFloat(productData.rating),
        availableQuantity: parseInt(productData.availableQuantity),
      });

      alert("Product added successfully!");
      navigate("/myExports"); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Export/Product</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={productData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="originCountry"
          placeholder="Origin Country"
          value={productData.originCountry}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          value={productData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="availableQuantity"
          placeholder="Available Quantity"
          value={productData.availableQuantity}
          onChange={handleChange}
          required
          min="1"
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddExport;
