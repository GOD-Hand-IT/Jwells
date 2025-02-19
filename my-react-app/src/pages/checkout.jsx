import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common/apiConfig";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [cartData, setCartData] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [formValid, setFormValid] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchUserData();
    fetchCartData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(SummaryApi.userProfile.url, {
        method: SummaryApi.userProfile.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setUserData({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || ''
        });
      } else {
        toast.error("Failed to fetch user details");
      }
    } catch (error) {
      toast.error("Error loading user data");
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch(SummaryApi.showCart.url, {
        method: SummaryApi.showCart.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setCartData(data.data);
      } else {
        toast.error("Failed to fetch cart details");
      }
    } catch (error) {
      toast.error("Error loading cart data");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    if (!cartData) return { regularTotal: 0, partialPaymentTotal: 0, balancePaymentTotal: 0, grandTotal: 0 };

    let totalAmount = 0;
    let totalPartialPayment = 0;
    let totalBalancePayment = 0;

    cartData.forEach(item => {
      const itemTotal = Math.round(item.productId.price * item.quantity);
      if (item.isPreOrder) {
        totalPartialPayment += Math.round(item.partialPayment);
        totalBalancePayment += Math.round(itemTotal - item.partialPayment);
      } else {
        totalAmount += itemTotal;
      }
    });

    return {
      regularTotal: Math.round(totalAmount),
      partialPaymentTotal: Math.round(totalPartialPayment),
      balancePaymentTotal: Math.round(totalBalancePayment),
      grandTotal: Math.round(totalAmount + totalPartialPayment)
    };
  };

  const validateForm = () => {
    const isPhoneValid = /^\d{10}$/.test(userData.phone);
    const isAddressValid =
      address.street.trim() !== "" &&
      address.city.trim() !== "" &&
      address.state.trim() !== "" &&
      address.zipcode.trim() !== "";

    setFormValid(isPhoneValid && isAddressValid);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setUserData({ ...userData, phone: value });
  };

  useEffect(() => {
    validateForm();
  }, [userData.phone, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.street || !address.city || !address.state || !address.zipcode || !userData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const formattedAddress = `${address.street}, ${address.city}, ${address.state} - ${address.zipcode}`;

      const orderData = {
        userId,
        shippingAddress: formattedAddress,
        contactPhone: userData.phone,
        totalAmount: calculateTotals().grandTotal,
        balanceDue: calculateTotals().balancePaymentTotal
      };

      const response = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.orderId) {
        toast.success("Order created successfully!");
        navigate(`/`);
      } else {
        toast.error(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Error processing your order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Shipping Details */}
        <div className="p-6">
          <h2 className="text-2xl font-[cinzel] font-light text-black mb-6">Shipping Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Info Display */}
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="text-gray-700">Name: {userData.name}</p>
              <p className="text-gray-700">Email: {userData.email}</p>
            </div>

            {/* Phone Number Input */}
            <input
              type="tel"
              value={userData.phone}
              onChange={handlePhoneChange}
              placeholder="Phone Number (10 digits)"
              required
              maxLength="10"
              className="border p-2 rounded w-full text-black"
            />
            {userData.phone && !/^\d{10}$/.test(userData.phone) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit phone number</p>
            )}

            {/* Address Form */}
            <div className="space-y-4">
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                placeholder="Street Address"
                required
                className="border p-2 rounded w-full text-black"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="City"
                  required
                  className="border p-2 rounded w-full text-black"
                />
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  placeholder="State"
                  required
                  className="border p-2 rounded w-full text-black"
                />
              </div>
              <input
                type="text"
                value={address.zipcode}
                onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
                placeholder="Zip Code"
                required
                className="border p-2 rounded w-full text-black"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !formValid}
              className={`w-full ${submitting || !formValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800'
                } text-white py-2 rounded-lg transition-all duration-300 mt-4 flex items-center justify-center 
              font-[cinzel] text-base tracking-wider shadow-lg transform hover:scale-[1.02] 
              border border-amber-400 hover:border-amber-600`}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : !formValid ? (
                'Please Fill Required Details'
              ) : (
                'Proceed to Payment →'
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-black p-6 text-white rounded-r-lg">
          <h2 className="text-2xl font-[cinzel] font-light mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {cartData?.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b border-gray-600 pb-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-lg font-[lato] font-semibold">{item.productId.name}</p>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-gray-200 font-semibold">₹{item.productId.price * item.quantity}</p>
                  {item.isPreOrder && (
                    <div className="text-amber-300 text-sm">
                      <p>Partial Payment: ₹{item.partialPayment}</p>
                      <p>Balance Due: ₹{(item.productId.price * item.quantity) - item.partialPayment}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-600 pt-4">
            {totals.regularTotal > 0 && (
              <div className="flex justify-between">
                <p>Regular Items</p>
                <p>₹{totals.regularTotal}</p>
              </div>
            )}
            {totals.partialPaymentTotal > 0 && (
              <>
                <div className="flex justify-between">
                  <p>Partial Payments</p>
                  <p>₹{totals.partialPaymentTotal}</p>
                </div>
                <div className="flex justify-between text-amber-300">
                  <p>Balance Due Later</p>
                  <p>₹{totals.balancePaymentTotal}</p>
                </div>
              </>
            )}
            <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-600">
              <p>Total Due Now</p>
              <p>₹{totals.grandTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
