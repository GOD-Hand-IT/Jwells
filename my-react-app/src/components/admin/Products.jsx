import React, { useState } from "react";
import AddProductModal from "./AddProductmodal.jsx";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const orders = [
    { id: 1, product: "Necklace", customer: "2000", status: "lokllkmqlkr" },
    { id: 2, product: "Rings", customer: "400", status: "jflkfqkmfklqmkl" },
  ];

  return (
    <div>
        <table className="text-black w-full border">
        <thead>
          <tr>
            <th className="border p-2">Category</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.product}</td>
              <td className="border p-2">{order.customer}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl text-black font-bold mb-4">Products</h2>
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
