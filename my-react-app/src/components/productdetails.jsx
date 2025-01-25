import React from "react";
import BestOfHridhayamSection from '../components/BestOfHridhayamSection';
import bgImage from '../assets/frame-6.png';

const ProductDetails = ({ image, productName, price, description }) => {
  return (
    <div><div className="h-[75vh] flex justify-evenly items-center">
    <img className="w-[500px] h-[500px]" src={image} alt={productName} />
    <div className="flex flex-col">
      <div className="m-0 font-medium text-[40px] tracking-[12px] text-black font-lato">{productName}</div>
      <div className="m-0 font-medium text-[24px] w-[700px] tracking-[6px] text-left ml-[50px] text-[#41444B] font-lato">
        <h3>Rs. {price}</h3>
        <p className="m-0 font-medium text-[18px] tracking-[6px] text-[#41444B] font-lato">{description}</p>
      </div>
      <div>
        <div className="explore">ADD TO CART</div>
        <div className="flex w-[700px] py-[20px] px-[80px] text-white bg-[#41444B] font-(Lora)">BUY NOW</div>
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
