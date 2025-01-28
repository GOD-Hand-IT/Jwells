import React from "react";

function AddProductModal({ onClose }) {
  return (
    <div className="text-black fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Product Name</label>
            <input className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea className="w-full border p-2 rounded" rows="3"></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image</label>
            <input type="file" />
          </div>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="text-red-500 mt-4 block">
          Close
        </button>
      </div>
    </div>
  );
}

export default AddProductModal;
