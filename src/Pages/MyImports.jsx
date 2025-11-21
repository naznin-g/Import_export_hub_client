import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
//import { AuthContext } from "../Context/AuthContext";
import Loader from "../Component/Loader";
import Swal from "sweetalert2";
import { FaStar, FaCoins } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";

const MyImports = () => {
  //const { user } = useContext(AuthContext);
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
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This product will be removed from your imports.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!"
  });

  if (!result.isConfirmed) return;

  try {
    await axiosSecure.delete(`/my-imports/${id}`);
    toast.success("Import removed successfully!");
    fetchImports();
  } catch (err) {
    toast.error("Failed to remove import");
  }
};


  if (loading) return <div className="text-center mt-10"><Loader /></div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-3 text-center">My Imports</h2>

      {importsData.length === 0 ? (
        <p>No imported products yet.</p>
      ) : (
        <>
          {/* Display total number of imported products */}
          <div className="mb-4 mx-5">
            <h3 className="text-xl font-semibold">
              ({importsData.length}) products imported
            </h3>
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 w-full  gap-6">
            {importsData.map(item => (
              <div key={item._id} className=" p-4 shadow hover:shadow-lg flex">
                
                {/* Column 1: Image and Name */}
                <div className="flex flex-col items-center justify-center w-1/5 ">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded mb-2"
                  />
                  <h3 className="font-bold text-center">{item.name}</h3>
                </div>

                {/* Column 2: Product details */}
                <div className="font-bold p-5 gap-3 w-3/5">
                  {/*<div className="flex justify-between px-4 w-full font-bold sm:flex-col">*/}
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
</div>

                  <div className=" px-2 m-2 w-full font-semibold text-[#106A98]">
                  <p>Imported Quantity: {item.totalImportedQuantity}</p>
                </div></div>

                {/* Column 3: Actions */}
                <div className="flex flex-col justify-center gap-3 w-1/5">
                  <Link
                    to={`/product/${item._id}`}
                    className="btn btn-sm btn-primary text-white w-2/3"
                  >
                    See Details
                  </Link>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-error w-2/3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyImports;
