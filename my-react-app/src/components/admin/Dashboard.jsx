import React, { useState } from "react";
import Overview from "./Overview";
import Orders from "./Orders";
import Products from "./Products";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-1/4 bg-gray-800 text-white h-screen p-4">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <ul>
            <li
              className={`cursor-pointer p-2 mb-4 ${
                activeTab === "overview" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </li>
            <li
              className={`cursor-pointer p-2 mb-4 ${
                activeTab === "orders" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </li>
            <li
              className={`cursor-pointer p-2 mb-4 ${
                activeTab === "products" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-6">
          {activeTab === "overview" && <Overview />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "products" && <Products />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
