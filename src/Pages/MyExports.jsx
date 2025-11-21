import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaStar, FaCoins } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";

const MyExports = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [exportsData, setExportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formPrice, setFormPrice] = useState("");
  const [formQuantity, setFormQuantity] = useState("");

  
  const fetchExports = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/my-exports");
      setExportsData(res.data);
    } catch (err) {
      toast.error("Failed to fetch exports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExports();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axiosSecure.delete(`/product/${id}`);
      toast.success("Product deleted successfully!");
      fetchExports();
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  
  const openUpdateModal = (item) => {
    setSelectedProduct(item);
    setFormPrice(item.price);
    setFormQuantity(item.availableQuantity);
    setModalOpen(true);
  };

  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {};

    if (formPrice !== selectedProduct.price) {
      updatedData.price = parseFloat(formPrice);
    }

    if (formQuantity !== selectedProduct.availableQuantity) {
      updatedData.quantityChange =
        parseInt(formQuantity) - selectedProduct.availableQuantity;
    }

    if (Object.keys(updatedData).length === 0) {
      toast.error("No changes made!");
      return;
    }

    try {
      await axiosSecure.patch(`/product/${selectedProduct._id}`, updatedData);

      toast.success("Product updated!");

      
      setExportsData((prev) =>
        prev.map((exp) =>
          exp._id === selectedProduct._id
            ? { ...exp, price: formPrice, availableQuantity: formQuantity }
            : exp
        )
      );

      setModalOpen(false);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Exports</h2>

      {/* Update Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">
              Update {selectedProduct.name}
            </h3>

            <form onSubmit={handleUpdateSubmit}>
              <label className="block mb-3">
                New Price:
                <input
                  type="number"
                  className="w-full border rounded p-2 mt-1"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </label>

              <label className="block mb-4">
                New Quantity:
                <input
                  type="number"
                  className="w-full border rounded p-2 mt-1"
                  value={formQuantity}
                  onChange={(e) => setFormQuantity(e.target.value)}
                />
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-sm btn-primary text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {exportsData.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 w-full  gap-6">
          {exportsData.map((item) => (
           <div key={item._id} className="mx-5 p-4 shadow hover:shadow-lg flex">
               <div className="flex flex-col items-center justify-center w-1/5 ">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded mb-2"
                  />

              <h3 className="font-bold text-center">{item.name}</h3>
                </div>
             <div className="font-bold p-5 w-3/5">
            
             <div className="mb-2 px-2 flex flex-col md:flex-row justify-between gap-2 text-[#106A98]">
               <span className="text-[#7AA93C] flex items-center gap-1">
                 <FaCoins /> {item.price.toFixed(2)} TK
               </span>
               <span className="text-green-400 flex items-center gap-1">
                 <LiaGlobeSolid /> {item.originCountry || "N/A"}
               </span>
               <span className="text-yellow-400 flex items-center gap-1">
                 <FaStar /> {item.rating || 0}
               </span>
               <span className="text-yellow-400 flex items-center gap-1">
                 <BsBoxes/> {item.availableQuantity}
               </span>
             </div>
             
             </div>

              <div className="flex flex-col justify-center gap-3 w-1/5">
                <button
                  onClick={() => openUpdateModal(item)}
                  className="btn btn-sm btn-primary text-white w-3/4"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm btn-error w-3/4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExports;
