import React from "react";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Checkout Form */}
        <div className="p-6">
          <h2 className="text-2xl font-[cinzel] font-light text-black mb-6">Checkout</h2>

          <form className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                required 
                className="border p-2 rounded w-full text-black"
              />
              <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                required 
                className="border p-2 rounded w-full text-black"
              />
            </div>

            {/* Email */}
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              className="border p-2 rounded w-full text-black"
            />

            {/* Street Address */}
            <input 
              type="text" 
              name="street" 
              placeholder="Street Address" 
              required 
              className="border p-2 rounded w-full text-black"
            />

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="city" 
                placeholder="City" 
                required 
                className="border p-2 rounded w-full text-black"
              />
              <input 
                type="text" 
                name="state" 
                placeholder="State" 
                required 
                className="border p-2 rounded w-full text-black"
              />
            </div>

            {/* Country & Zip Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="country" 
                placeholder="Country" 
                required 
                className="border p-2 rounded w-full text-black"
              />
              <input 
                type="text" 
                name="zipcode" 
                placeholder="Zip Code" 
                required 
                className="border p-2 rounded w-full text-black"
              />
            </div>

            {/* Phone Number */}
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number" 
              required 
              className="border p-2 rounded w-full text-black"
            />
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-black p-6 text-white rounded-r-lg">
          <h2 className="text-2xl font-[cinzel] font-light mb-4">Order Summary</h2>

          {/* Dummy Product */}
          <div className="flex items-center gap-4 border-b border-gray-600 pb-4 mb-4">
            <div className="w-20 h-20 bg-gray-700 rounded"></div> {/* Image Placeholder */}
            <div>
              <p className="text-lg font-[lato] font-semibold">Product Name</p>
              <p className="text-gray-400">Quantity: 1</p>
              <p className="text-gray-200 font-semibold">$99.99</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <p>Total</p>
            <p>$99.99</p>
          </div>

          {/* Pay Now Button */}
          <button 
            type="button" 
            className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
