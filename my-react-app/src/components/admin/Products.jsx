import React, { useState } from "react";
import AddProductModal from "./AddProductmodal.jsx";

function Products() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Products;
