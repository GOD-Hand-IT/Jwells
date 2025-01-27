import React, { useState } from "react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form Submitted!");
  };

  return (
    <div className="bg-white text-black p-8 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Form Heading */}
        <h1 className="text-2xl text-center mb-4 cursor-default sm:text-3xl font-light font-[Cinzel]">
          Share Your Design
        </h1>

        {/* First Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:space-x-4">
          <div className="flex flex-col w-full">
            <label className="mb-2 text-sm font-[Cinzel] font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-2 font-[Cinzel] text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2  rounded focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-[Cinzel] font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-gray-300"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Third Row */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-[Cinzel] font-medium">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-gray-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Fourth Row */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-[Cinzel] font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-gray-300"
            placeholder="Enter your description"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-[Cinzel] font-medium">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="bg-[#41444B] text-white hover:bg-black cursor-pointer border border-gray-300 w-full p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#41444B] font-[Cinzel] text-white py-2 cursor-pointer rounded hover:bg-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
