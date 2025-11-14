import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Context/AuthContext";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [exportsData, setExportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's exports
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

  // Delete export
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axiosSecure.delete(`/my-exports/${id}`);
      toast.success("Product deleted successfully!");
      setExportsData(exportsData.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  // Update export
  const handleUpdate = async (id) => {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;

    try {
      const res = await axiosSecure.patch(`/my-exports/${id}`, { price: parseFloat(newPrice) });
      toast.success("Product updated successfully!");
      setExportsData(exportsData.map(item => item._id === id ? { ...item, price: parseFloat(newPrice) } : item));
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Exports</h2>

      {exportsData.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exportsData.map((item) => (
            <div key={item._id} className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col">
              <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="h-40 w-full object-cover rounded" />
              <h3 className="font-bold mt-2">{item.name}</h3>
              <p>Price: {item.price.toFixed(2)} TK</p>
              <p>Origin: {item.originCountry || "N/A"}</p>
              <p>Available Quantity: {item.availableQuantity}</p>
              <p>Rating: {item.rating || 0}</p>

              <div className="mt-4 flex gap-2">
                <button onClick={() => handleUpdate(item._id)} className="btn btn-sm btn-outline">Update</button>
                <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExports;
