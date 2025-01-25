import React from "react";
import BestOfHridhayamSection from '../components/BestOfHridhayamSection';
import ProductDetails from "../components/productdetails";
import bgImage from '../assets/frame-6.png';
// Product data
const featuredProduct = {
    image: bgImage,
    productName: "Product Name",
    price:10000,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat ducimus excepturi numquam architecto, id deserunt laudantium iusto hic esse ullam nisi voluptatum nam ex vel itaque inventore provident, enim facilis.",
  };
  
  const product = () => {
    return (
      <div>
        <ProductDetails
          image={featuredProduct.image}
          productName={featuredProduct.productName}
          price={featuredProduct.price}
          description={featuredProduct.description}
        />
      </div>
    );
  };

export default product;
