import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common/apiConfig';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

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
                toast.warning(result.message);
            }
        } catch (error) {
            toast.error('Error fetching cart items');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId, change) => {
        // TODO: Implement quantity update logic
        toast.info('Quantity update coming soon');
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(SummaryApi.removeFromCart.url, {
                method: SummaryApi.removeFromCart.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ cartItemId: itemId, userId })
            });

            if (response.ok) {
                fetchCartItems();
                toast.success('Item removed from cart');
            }
        } catch (error) {
            toast.error('Error removing item');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCartItems();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div className="text-center p-8 rounded-lg shadow-md bg-white">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to access your cart</p>
                    <button 
                        onClick={() => navigate('/login', { state: { from: '/cart' } })}
                        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
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
                                        <div className="shrink-0 md:order-1">
                                            <img className="h-20 w-20" src={item.productId.image} alt={item.productId.name} />
                                        </div>

                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button onClick={() => handleQuantityChange(item._id, -1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-[#41444B] cursor-pointer">
                                                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" className="w-10 shrink-0 border-0 bg-transparent text-center" value={item.quantity} readOnly />
                                                <button onClick={() => handleQuantityChange(item._id, 1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-[#41444B] cursor-pointer">
                                                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-end md:w-32">
                                                <p className="text-base font-bold text-black">₹{item.productId.price * item.quantity}</p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md">
                                            <p className="text-base font-medium text-gray-900">{item.productId.name}</p>
                                            <div className="flex items-center gap-4 mt-4">
                                                <button className="inline-flex items-center text-sm font-medium text-black hover:underline">
                                                    <svg className="me-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                    </svg>
                                                    Add to Favorites
                                                </button>
                                                <button 
                                                    onClick={() => handleRemoveItem(item._id)}
                                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                                                >
                                                    <svg className="me-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
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
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{total}</dd>
                                    </dl>
                                    {/* Add more summary items as needed */}
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-500 pt-2">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">₹{total}</dd>
                                </dl>
                            </div>

                            <button className="w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900">
                                Proceed to Checkout
                            </button>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500">or</span>
                                <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-black underline hover:no-underline">
                                    Continue Shopping
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;