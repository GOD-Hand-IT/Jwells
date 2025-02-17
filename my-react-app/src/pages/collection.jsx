import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/productCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import SummaryApi from "../common/apiConfig";

const Collection = () => {
  const { state: { collectionName } } = useLocation();
  const [state, setState] = useState({
    products: [],
    currentPage: 1,
    selectedCategory: collectionName,
    maxPrice: 1000,
    priceRange: '0-1000'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${SummaryApi.categoryProduct.url}${state.selectedCategory}`);
        const { data } = await response.json();
        if (Array.isArray(data)) {
          setState(prev => ({
            ...prev,
            products: data,
            maxPrice: Math.max(...data.map(p => p.price)) || 1000
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, [state.selectedCategory, state.priceRange]);

  useEffect(() => {
    setState(prev => ({ ...prev, selectedCategory: collectionName }));
  }, [collectionName]);

  const handlePageChange = (page) => {
    setState(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginatedProducts = () => {
    const start = (state.currentPage - 1) * 9;
    return state.products.slice(start, start + 9);
  };

  return (
    <div className="contain flex">
      <Sidebar
        onPriceRangeChange={range => setState(prev => ({ ...prev, priceRange: range, currentPage: 1 }))}
        onCategoryChange={category => setState(prev => ({ ...prev, selectedCategory: category, currentPage: 1 }))}
        selectedCategory={state.selectedCategory}
        maxPrice={state.maxPrice}
      />

      <div className="flex-1 px-4">
        <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {getPaginatedProducts().map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={state.currentPage}
          totalPages={Math.ceil(state.products.length / 9)}
          onPrevPage={() => handlePageChange(state.currentPage - 1)}
          onNextPage={() => handlePageChange(state.currentPage + 1)}
          onPageSelect={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Collection;
