import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import SummaryApi from '../common/apiConfig';
import OrderModal from './OrderModal';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(SummaryApi.getMyOrders.url, {
                method: SummaryApi.getMyOrders.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ userId: userId })
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl text-black font-bold mb-6">My Orders</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Order ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Total</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {order._id.slice(-8)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        ₹{order.totalAmount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order._id);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEye className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Show empty state if no orders */}
            {orders.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No orders found</p>
                </div>
            )}

            {/* Order Modal */}
            <OrderModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedOrder(null);
                }}
                orderId={selectedOrder}
                isAdmin={false}
            />
        </div>
    );
};

export default MyOrders;
