import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/apiConfig";

const products = [
  { name: "Product 1", price: 50, image: "assets/image-1.jpg" },
  { name: "Product 2", price: 30, image: "assets/image-2.jpg" },
  { name: "Product 3", price: 20, image: "assets/image-3.png" },
  { name: "Product 4", price: 10, image: "assets/image-4.jpg" },
  { name: "Product 5", price: 55, image: "assets/image-5.png" },
  { name: "Product 6", price: 33, image: "assets/image-6.png" },
  { name: "Product 7", price: 52, image: "assets/image-7.png" },
  { name: "Product 8", price: 31, image: "assets/image-8.jpg" },
  { name: "Product 9", price: 23, image: "assets/image-9.jpg" },
  { name: "Product 10", price: 36, image: "assets/image-10.png" },
  { name: "Product 11", price: 50, image: "assets/image-11.jpg" },
  { name: "Product 12", price: 30, image: "assets/image-12.jpeg" },
];

const itemsPerPage = 9;

const collection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(SummaryApi.categoryProduct.url + params.collectionName);
        const data = await response.json();
        console.log(data.data);
        if (Array.isArray(data.data)) {
          setSortedProducts(data.data);
        } else {
          console.error("API data is not an array of strings:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [params.collectionName]); // Dependency array with collectionName

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const getPaginatedProducts = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    let sorted;

    if (sortValue === "priceHighLow") {
      sorted = [...sortedProducts].sort((a, b) => b.price - a.price);
    } else if (sortValue === "priceLowHigh") {
      sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
    } else {
      sorted = [...products]; // Default order
    }

    setSortedProducts(sorted);
    setCurrentPage(1); // Reset to the first page after sorting
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="contain">
      <div className="heading">
        <h1>Product Page</h1>
        <div className="filter">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="priceLowHigh">Price: Low to High</option>
          </select>
        </div>
      </div>
      <div id="product-grid" className="product-grid">
        {getPaginatedProducts().map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Rs. {product.price}</p>
            <button onClick={() => alert(`${product.name} added to cart!`)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          &larr;
        </button>
        <span id="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default collection;
