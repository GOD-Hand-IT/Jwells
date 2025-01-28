import React from "react";

function Orders() {
  const orders = [
    { id: 1, product: "Product 1", customer: "John Doe", status: "Pending" },
    { id: 2, product: "Product 2", customer: "Jane Smith", status: "Shipped" },
  ];

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Status</th>
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
    </div>
  );
}

export default Orders;
