import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common/apiConfig';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const fetchCartItems = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(SummaryApi.showCart.url, {
                method: SummaryApi.showCart.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId })
            });

            const result = await response.json();
            if (response.ok) {
                setCartItems(result.data);
                // Calculate total
                const cartTotal = result.data.reduce((sum, item) => 
                    sum + (item.productId.price * item.quantity), 0);
                setTotal(cartTotal);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Error fetching cart items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-black sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item._id} className="rounded-lg bg-white p-4 shadow-sm md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="h-20 w-20" src={item.productId.image} alt={item.productId.name} />
                                        </a>

                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <input 
                                                    type="text" 
                                                    className="w-10 text-center bg-transparent"
                                                    value={item.quantity}
                                                    readOnly 
                                                />
                                            </div>
                                            <div className="text-end md:w-32">
                                                <p className="text-base font-bold text-black">
                                                    ₹{item.productId.price * item.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md">
                                            <p className="text-base font-medium text-gray-900">
                                                {item.productId.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-black">Order summary</p>

                            <div className="space-y-4">
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-500 pt-2">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">₹{total}</dd>
                                </dl>
                            </div>

                            <button className="w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;