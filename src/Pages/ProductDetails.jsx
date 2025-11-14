import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import axiosSecure from "../hooks/useAxiosSecure"; // import Axios instance directly
import { FaStar, FaCoins } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";

const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentStock, setCurrentStock] = useState(0);

  // Fetch single product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/products/${id}`);
        setProduct(res.data);
        setCurrentStock(res.data.availableQuantity);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle import
  const handleImport = async () => {
    if (quantity > currentStock || quantity < 1) return;

    try {
      const res = await axiosSecure.post("/imports", {
        productId: product._id,
        quantity,
      });

      setCurrentStock(res.data.remainingStock); // update stock
      alert(`Imported successfully! Remaining stock: ${res.data.remainingStock}`);
      setModalOpen(false);
      setQuantity(1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Import failed. Make sure you are logged in.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />

      <div className="mt-3 flex-1">
        <h3 className="font-bold text-lg line-clamp-2 text-gray-600">{product.name}</h3>
        <p className="mt-2 flex justify-between gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" /> {product.rating || 0}
          </span>
          <span className="ml-3 flex items-center gap-1 text-[#7AA93C]">
            <FaCoins /> {product.price.toFixed(2)} TK
          </span>
          <span className="ml-3 flex items-center gap-1 text-green-400">
            <LiaGlobeSolid /> {product.originCountry || "N/A"}
          </span>
          <span className="ml-3 flex items-center gap-1 text-yellow-400">
            <BsBoxes /> {currentStock} Available
          </span>
        </p>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-outline btn-primary w-3/4 flex justify-center items-center gap-2 mt-2 mx-auto"
      >
        Import Now
      </button>

      {/* Import Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Import Product"
        ariaHideApp={false}
        className="max-w-md mx-auto mt-20 p-6 bg-white border rounded shadow"
      >
        <h3 className="text-xl font-bold mb-4">Import {product.name}</h3>

        <input
          type="number"
          min={1}
          max={currentStock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-full mb-4 rounded"
        />

        <div className="flex justify-between">
          <button
            onClick={handleImport}
            disabled={quantity > currentStock || quantity < 1}
            className={`px-4 py-2 rounded text-white ${
              quantity > currentStock || quantity < 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600"
            }`}
          >
            Submit
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
