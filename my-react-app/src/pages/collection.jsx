import React, { useEffect, useState } from "react";
import ProductCard from '../components/productCard'
import { useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';

import "../App.css";
import SummaryApi from "../common/apiConfig";

const products = [

];

const itemsPerPage = 9;

const Collection = () => { // Accept collectionName as a prop
  const location = useLocation()
  const { collectionName } = location.state;
  console.log(collectionName);


  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState([...products]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(SummaryApi.categoryProduct.url + collectionName);
        const data = await response.json();
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
  }, [collectionName]); // Dependency array with collectionName

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

  return (
    <div className="contain">
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
  );
};

export default Collection;
