import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/productCard';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import NoProductsFound from '../components/NoProductsFound';
import SummaryApi from "../common/apiConfig";

const Collection = () => {
  const { state: { collectionName } } = useLocation();
  const [state, setState] = useState({
    products: [],
    allProducts: [],
    currentPage: 1,
    selectedCategory: collectionName,
    maxPrice: 1000,
    priceRange: '0-1000'
  });
  const [shouldResetFilters, setShouldResetFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${SummaryApi.categoryProduct.url}${state.selectedCategory}`);
        const { data } = await response.json();
        if (Array.isArray(data)) {
          const maxPrice = Math.max(...data.map(p => p.price)) || 1000;
          setState(prev => ({
            ...prev,
            allProducts: data,
            products: filterProductsByPriceRange(data, `0-${maxPrice}`),
            maxPrice,
            priceRange: `0-${maxPrice}`
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, [state.selectedCategory]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      products: filterProductsByPriceRange(prev.allProducts, prev.priceRange)
    }));
  }, [state.priceRange]);

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

  const filterProductsByPriceRange = (products, priceRange) => {
    const [min, max] = priceRange.split('-').map(Number);
    return products.filter(product => product.price >= min && product.price <= max );
  };

  const resetFilters = () => {
    const defaultPriceRange = `0-${state.maxPrice}`;
    setState(prev => ({
      ...prev,
      priceRange: defaultPriceRange,
      products: filterProductsByPriceRange(prev.allProducts, defaultPriceRange),
      selectedCategory: collectionName,
      currentPage: 1
    }));
    setShouldResetFilters(true);
    // Reset the trigger after a short delay
    setTimeout(() => setShouldResetFilters(false), 100);
  };

  const renderProducts = () => {
    const paginatedProducts = getPaginatedProducts();
    
    if (state.products.length === 0) {
      return <NoProductsFound onResetFilters={resetFilters} />;
    }

    return (
      <>
        <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {paginatedProducts.map((product, index) => (
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
      </>
    );
  };

  return (
    <div className="contain flex">
      <Sidebar
        onPriceRangeChange={range => setState(prev => ({ ...prev, priceRange: range, currentPage: 1 }))}
        onCategoryChange={category => setState(prev => ({ ...prev, selectedCategory: category, currentPage: 1 }))}
        selectedCategory={state.selectedCategory}
        maxPrice={state.maxPrice}
        shouldReset={shouldResetFilters}
      />
      <div className="flex-1 px-4">
        {renderProducts()}
      </div>
    </div>
  );
};

export default Collection;
