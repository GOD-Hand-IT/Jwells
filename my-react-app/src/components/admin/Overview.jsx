import React from "react";

function Overview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Analytics Cards */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Products Sold</h3>
          <p className="text-2xl font-bold">567</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
