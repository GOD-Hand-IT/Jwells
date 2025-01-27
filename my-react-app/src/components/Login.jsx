import React, { useState } from "react";
import SummaryApi from "../common/apiConfig";

const Login = () => {
  const [authMode, setAuthMode] = useState("signin"); // Modes: 'signin', 'signup', 'forgot'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = authMode === "signin" 
        ? { 
            email: formData.email, 
            password: formData.password 
          }
        : formData;

      console.log('Submitting data:', data);
      
      // Example API call
      const response = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Success:', result);
      // Handle successful login/signup here
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  const toggleAuthMode = (mode) => setAuthMode(mode);

  return (
    <div className="bg-transparent text-black p-8 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Authentication Header */}
        <h1 className="text-2xl font-medium font-[cinzel] text-center">
          {authMode === "signin"
            ? "Sign In"
            : authMode === "signup"
            ? "Sign Up"
            : "Forgot Password"}
        </h1>

        {/* Authentication Form */}
        {authMode === "signin" && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#41444B] cursor-pointer text-white py-2 rounded hover:bg-black"
            >
              Sign In
            </button>
          </form>
        )}

        {authMode === "signup" && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Sign Up
            </button>
          </form>
        )}

        {authMode === "forgot" && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your registered email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* Footer Links */}
        <div className="text-center font-[lato] space-y-2">
          {authMode === "signin" && (
            <>
              <p className="text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleAuthMode("signup")}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </p>
              <p className="text-sm">
                Forgot your password?{" "}
                <button
                  type="button"
                  onClick={() => toggleAuthMode("forgot")}
                  className="text-blue-500 hover:underline"
                >
                  Reset Here
                </button>
              </p>
            </>
          )}

          {authMode === "signup" && (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => toggleAuthMode("signin")}
                className="text-blue-500 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}

          {authMode === "forgot" && (
            <p className="text-sm">
              Remembered your password?{" "}
              <button
                type="button"
                onClick={() => toggleAuthMode("signin")}
                className="text-blue-500 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
