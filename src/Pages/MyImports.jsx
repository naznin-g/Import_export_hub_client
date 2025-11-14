import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Context/AuthContext";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [importsData, setImportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's imported products
  const fetchImports = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/my-imports");
      setImportsData(res.data);
    } catch (err) {
      toast.error("Failed to fetch imports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImports();
  }, []);

  // Remove an import
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this import?")) return;

    try {
      await axiosSecure.delete(`/my-imports/${id}`);
      toast.success("Import removed successfully!");
      setImportsData(importsData.filter(item => item._id !== id));
    } catch (err) {
      toast.error("Failed to remove import");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Imports</h2>

      {importsData.length === 0 ? (
        <p>No imported products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {importsData.map(item => (
            <div key={item._id} className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col">
              <img
                src={item.product.image || "https://via.placeholder.com/150"}
                alt={item.product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-2">{item.product.name}</h3>
              <p>Price: {item.product.price.toFixed(2)} TK</p>
              <p>Origin: {item.product.originCountry || "N/A"}</p>
              <p>Rating: {item.product.rating || 0}</p>
              <p>Imported Quantity: {item.quantity}</p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/product/${item.product._id}`}
                  className="btn btn-sm btn-outline"
                >
                  See Details
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-sm btn-error"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyImports;
