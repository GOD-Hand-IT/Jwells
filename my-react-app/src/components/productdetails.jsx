import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common/apiConfig';
import BestOfHridhayamSection from '../components/BestOfHridhayamSection';
import bgImage from '../assets/frame-6.png';

const ProductDetails = ({ image, productName, price, description, productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (!userId) {
      toast.warning('Please login first');
      setIsLoading(false);
      navigate('/login'); // Navigate to login page
      return;
    }

    try {
      const response = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quantity: 1,
          userId: userId,
          productId: productId
        })
      });

      const result = await response.json();

      if (result) {
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      toast.error('Error adding to cart');
      console.error('Add to cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row h-auto md:h-[75vh] justify-center items-center p-4 md:p-8 gap-8">
        <img className="w-full md:w-[500px] h-[75vh] md:h-[500px] " src={image} alt={productName} />
        <div className="flex flex-col w-full md:w-1/2 justify-center items-start gap-4">
          <div className="text-center md:text-left font-medium text-[24px] md:text-[40px] tracking-[4px] md:tracking-[12px] text-black font-lato"> {productName} </div>
          <div className="w-full md:w-[700px] text-left font-medium text-[16px] md:text-[24px] tracking-[2px] md:tracking-[6px] text-[#41444B] font-lato">
            <h3>Rs. {price}</h3>
            <p className="mt-2 text-[14px] md:text-[18px] text-[#41444B]">{description}</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`w-full py-4 px-6 border border-black text-center text-black font-medium 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#41444B] hover:text-white'} 
                transition`}
            >
              {isLoading ? 'ADDING...' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
      <BestOfHridhayamSection
        className="section5"
        title="OTHER PRODUCTS"
        images={[
          '/src/assets/rectangle.jpeg',
          '/src/assets/earrings.png',
          '/src/assets/neck.png',
          '/src/assets/necklace.jpeg'
        ]}
        link="https://www.google.com"
      />
    </div>
  );
};

export default ProductDetails;
