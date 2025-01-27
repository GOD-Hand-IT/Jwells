import React, { useState } from "react";

const Login = () => {
  const [authMode, setAuthMode] = useState("signin"); // Modes: 'signin', 'signup', 'forgot'

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
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Email</label>
              <input
                type="email"
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
          <form className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">First Name</label>
              <input
                type="text"
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
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-[cinzel] font-medium">Email</label>
              <input
                type="email"
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
