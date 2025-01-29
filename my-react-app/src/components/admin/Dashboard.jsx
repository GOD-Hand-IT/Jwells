import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Overview from "./Overview";
import Products from "./Products";
import ProductModal from "./ProductModal";

function Dashboard({ onBackToProfile }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleProductAdded = async (productData) => {
    try {
      // Add your create product API call here
      // After successful creation:
      setShowAddProduct(false);
      setActiveTab("products");
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleBackToProfile = () => {
    onBackToProfile();
    localStorage.setItem('showAdminContent', 'false');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 h-screen bg-white border-r border-gray-200">
          <div className="p-6">
            {/* Back Button */}
            <button
              onClick={handleBackToProfile}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
            >
              <FaArrowLeft />
              <span>Back to Profile</span>
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h1>
            <nav className="space-y-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${activeTab === "overview"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">dashboard</span>
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${activeTab === "products"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="material-icons-outlined">inventory_2</span>
                <span>Products</span>
              </button>

              {/* Add Product Button */}
              <button
                onClick={() => setShowAddProduct(true)}
                className="w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-white bg-green-600 hover:bg-green-700 transition-all"
              >
                <span className="material-icons-outlined">add</span>
                <span>Add Product</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-screen overflow-y-auto">
            {activeTab === "overview" && <Overview />}
            {activeTab === "products" && <Products />}
          </div>
        </main>
      </div>

      <ProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSave={handleProductAdded}
        product={null}
        title="Add New Product"
        categories={[]} // You might want to pass categories here if available
      />
    </div>
  );
}

export default Dashboard;
