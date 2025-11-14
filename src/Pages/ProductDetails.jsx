import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ProductDetails = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(1);

  const handleImport = async () => {
    try {
      const res = await axiosSecure.post('/imports', {
        productId: product._id,
        quantity
      });
      alert(`Imported successfully! Remaining stock: ${res.data.remainingStock}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Available: {product.availableQuantity}</p>
      <input
        type="number"
        min="1"
        max={product.availableQuantity}
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleImport}>Import Now</button>
    </div>
  );
};

export default ProductDetails;

