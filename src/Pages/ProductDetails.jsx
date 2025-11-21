import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { AuthContext } from "../Context/AuthContext";
import { FaStar, FaCoins } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";
import Loader from "../Component/Loader.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentStock, setCurrentStock] = useState(0);
  const [importers, setImporters] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resProduct = await axiosSecure.get(`/product/${id}`);
        setProduct(resProduct.data);
        setCurrentStock(resProduct.data.availableQuantity);

        const resImporters = await axiosSecure.get(`/product/${id}/imports`);
        setImporters(resImporters.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  
  const handleImportSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to import!");

    const qty = parseInt(quantity, 10);
    if (qty < 1 || qty > currentStock) {
      return alert(`Invalid quantity. Available: ${currentStock}`);
    }

    try {
      const token = await user.getIdToken();
      const res = await axiosSecure.post(
        `/product/${id}/imports`,
        { quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      setCurrentStock(res.data.remainingStock);
      setQuantity(1);
      setModalOpen(false);

      
      setImporters((prev) => [
        ...prev,
        {
          _id: res.data.importId,
          importerEmail: user.email,
          importedQuantity: qty,
          importedAt: new Date().toISOString(),
        },
      ]);

      alert(`Imported successfully! Remaining stock: ${res.data.remainingStock}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Import failed");
    }
  };

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4  shadow w-3/4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="mt-2 flex justify-between gap-2 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-400" /> {product.rating || 0}
        </span>
        <span className="flex items-center gap-1 text-[#7AA93C]">
          <FaCoins /> {product.price.toFixed(2)} TK
        </span>
        <span className="flex items-center gap-1 text-green-400">
          <LiaGlobeSolid /> {product.originCountry || "N/A"}
        </span>
        <span className="flex items-center gap-1 text-yellow-400">
          <BsBoxes /> {currentStock} Available
        </span>
      </p>

     {product.exporterEmail === user.email ? (
  <button
    disabled
    className="btn w-full mt-2 bg-gray-300 text-gray-500 cursor-not-allowed"
  >
    You are the exporter
  </button>
) : (
  <button
    onClick={() => setModalOpen(true)}
    className="btn btn-outline btn-primary w-full flex justify-center items-center gap-2 mt-2 mx-auto"
  >
    Import Now
  </button>
)}

     
      

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Import Product"
        ariaHideApp={false}
        className="max-w-md mx-auto mt-20 p-6 bg-white border rounded shadow"
      >
        <h3 className="text-xl font-bold mb-4">Import {product.name}</h3>
        <p className="mb-4">Available Quantity: {currentStock}</p>
        <form onSubmit={handleImportSubmit}>
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
              type="submit"
              disabled={quantity < 1 || quantity > currentStock}
              className={`px-4 py-2 rounded text-white ${
                quantity < 1 || quantity > currentStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600"
              }`}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Importers</h3>
        {importers.length === 0 ? (
          <p>No imports yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">SL</th>
                  <th className="border px-4 py-2">Importer Email</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {importers.map((imp, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{imp.importerEmail}</td>
                    <td className="border px-4 py-2">{imp.importedQuantity}</td>
                    <td className="border px-4 py-2">
                      {new Date(imp.importedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
