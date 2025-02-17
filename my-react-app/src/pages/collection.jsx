import React, { useEffect, useState } from "react";
import ProductCard from '../components/productCard'
import { useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import "../App.css";
import SummaryApi from "../common/apiConfig";

const products = [

];

const itemsPerPage = 9;

const Collection = () => {
  const location = useLocation();
  const { collectionName } = location.state;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(collectionName);
  const [priceRange, setPriceRange] = useState('0-1000');
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${SummaryApi.categoryProduct.url}${selectedCategory}?priceRange=${priceRange}`);
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setSortedProducts(data.data);
          // Calculate max price from products
          const highestPrice = Math.max(...data.data.map(product => product.price));
          setMaxPrice(highestPrice || 1000); // fallback to 1000 if no products
        } else {
          console.error("API data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [selectedCategory, priceRange]);

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const categories = ["Rings", "Necklaces", "Bracelets", "Earrings"]; // Add your categories here

  return (
    <div className="contain flex">
      <Sidebar 
        onPriceRangeChange={handlePriceRangeChange}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        maxPrice={maxPrice}
      />
      
      {/* Main Content */}
      <div className="flex-1 px-4">
        <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {getPaginatedProducts().map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onPageSelect={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Collection;
