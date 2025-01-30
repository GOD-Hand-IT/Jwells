import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common/apiConfig";

const FormPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    description: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append files
      files.forEach(file => {
        formDataToSend.append('files', file);
      });

      const response = await fetch(SummaryApi.customizeDesign.url, {
        method: SummaryApi.customizeDesign.method,
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check content type
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Your design request has been sent successfully!');
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          description: "",
        });
        setFiles([]);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Server error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
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

        {/* Description Field */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-[Cinzel] font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-gray-300"
            placeholder="Describe your design requirements"
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-[Cinzel] font-medium">Upload Files</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-[#41444B] text-white hover:bg-black cursor-pointer border border-gray-300 w-full p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
            multiple
            accept="*/*"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can upload multiple files (images, documents, etc.)
          </p>
          {files.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Selected files:</p>
              <ul className="text-xs text-gray-600">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#41444B] font-[Cinzel] text-white py-2 rounded hover:bg-black transition-all
            ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? 'Sending...' : 'Submit Design Request'}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
