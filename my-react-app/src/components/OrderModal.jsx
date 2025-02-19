import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common/apiConfig';

const OrderModal = ({ isOpen, onClose, orderId, isAdmin, onStatusUpdate }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && orderId) {
            fetchOrderDetails();
        }
    }, [isOpen, orderId]);

    const fetchOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${SummaryApi.getOrderDetails.url}${orderId}`, {
                method: SummaryApi.getOrderDetails.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setOrder(data.data);
            } else {
                toast.error('Failed to fetch order details');
            }
        } catch (error) {
            toast.error('Error fetching order details');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !orderId) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8">
                    <p>Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) return null;

    const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Order Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="border-b pb-4">
                        <h3 className="font-semibold mb-2">Order Summary</h3>
                        <p>Order ID: {order._id}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Status: {order.status}</p>
                        <p>Tracking Number: {order.trackingNumber || 'N/A'}</p>
                    </div>

                    {/* Customer Details */}
                    <div className="border-b pb-4">
                        <h3 className="font-semibold mb-2">Customer Information</h3>
                        <p>Name: {order.userId.name}</p>
                        <p>Email: {order.userId.email}</p>
                        <p>Phone: {order.contactPhone}</p>
                        <p>Shipping Address: {order.shippingAddress}</p>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="font-semibold mb-2">Order Items</h3>
                        <div className="space-y-2">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b py-2">
                                    <div>
                                        <p className="font-medium">{item.productId.name}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p>₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between">
                            <p className="font-semibold">Total Amount:</p>
                            <p>₹{order.totalAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Paid Amount:</p>
                            <p>₹{order.paidAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Balance Due:</p>
                            <p>₹{order.balanceAmount}</p>
                        </div>
                    </div>

                    {/* Admin Controls */}
                    {isAdmin && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Update Order Status</h3>
                            <div className="flex gap-2">
                                {orderStatuses.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => onStatusUpdate(order._id, status)}
                                        className={`px-3 py-1 rounded-full text-sm ${order.status === status
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
