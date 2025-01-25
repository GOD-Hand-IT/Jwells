import React from "react";

// Product data
const products = [
  {
    id: 1,
    productName: "Rectangle Product",
    price: 50,
    image: "images/rectangle.jpeg",
  },
  {
    id: 2,
    productName: "Earrings",
    price: 50,
    image: "images/earrings.png",
  },
  {
    id: 3,
    productName: "Neck Product",
    price: 50,
    image: "images/neck.png",
  },
  {
    id: 4,
    productName: "Necklace",
    price: 50,
    image: "images/necklace.jpeg",
  },
];

const product = () => {
  const featuredProduct = {
    productName: "Product Name",
    price: 10000,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat ducimus excepturi numquam architecto, id deserunt laudantium iusto hic esse ullam nisi voluptatum nam ex vel itaque inventore provident, enim facilis.",
    image: "images/frame-6.png",
  };

  return (
    <div className="cart-page">
      {/* Featured Product */}
      <div className="center">
        <img src={featuredProduct.image} alt={featuredProduct.productName} />
      </div>
      <div className="center">
        <div className="h2">{featuredProduct.productName}</div>
        <div className="corner">
          <h3>Rs. {featuredProduct.price}</h3>
          <p>{featuredProduct.description}</p>
        </div>
        <div>
          <div className="explore">ADD TO CART</div>
          <div className="explore2">BUY NOW</div>
        </div>
      </div>

      {/* Other Products Section */}
      <section className="section section5">
        <div className="home-5">OTHER PRODUCTS</div>
        <div className="best-carousal-wrapper">
          <div className="best-carousal">
            {products.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.productName} />
                <h2>{product.productName}</h2>
                <h3>Rs. {product.price}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default product;
