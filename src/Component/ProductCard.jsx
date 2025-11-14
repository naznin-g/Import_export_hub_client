import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCoins } from "react-icons/fa";
import { LiaGlobeSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";

const ProductCard = ({ product }) => {
  const { _id, name, image, price, rating, originCountry, availableQuantity } = product;

return(
  <div className="border bg-[#f7f7f7] rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col">
  <img
    src={image}
    alt={name}
    className="w-full h-40 object-cover rounded"
    loading="lazy"
  />

  <div className="mt-3 flex-1">
    <h3 className="font-bold text-lg line-clamp-2 text-gray-600">{name}</h3>
    <p className="mt-2 flex justify-between gap-2 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <FaStar className="text-yellow-400" /> {rating}
      </span>
      <span className="flex items-center gap-1 ">
        <FaCoins className="text-[#7AA93C]" /> {price.toFixed(2)}TK
      </span>
    
    <span className="flex items-center gap-1 "><LiaGlobeSolid className="text-green-400"/> {originCountry}</span>
    <span className="flex items-center gap-1 "><BsBoxes className="text-yellow-400"/> {
availableQuantity} Available</span>
</p>
  </div>

  <div className="mt-4">
    <Link
      to={`/product/${_id}`}
      className="btn btn-outline btn-primary w-full flex justify-center items-center gap-2 mt-2 mx-auto"
    >
      See Details
    </Link>
  </div>
</div>
);
};
export default ProductCard;
