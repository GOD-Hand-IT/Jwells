import React, { useState, useEffect } from 'react';
import SummaryApi from '../common/apiConfig.js';

const Sidebar = ({ onPriceRangeChange, onCategoryChange, selectedCategory, maxPrice, shouldReset }) => {
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
    const [tempPriceRange, setTempPriceRange] = useState([0, maxPrice]);
    const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(new Set([selectedCategory]));

    const fetchCategories = async () => {
        try {
            const response = await fetch(SummaryApi.category.url, {
                method: SummaryApi.category.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
            });
            if (response.ok) {
                const data = await response.json();
                const categoryList = [];
                data.data.forEach(category => {
                    categoryList.push(category);
                });
                setCategories(categoryList);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        setPriceRange([0, maxPrice]);
        setTempPriceRange([0, maxPrice]);
        setIsPriceRangeChanged(false);
    }, [maxPrice]);

    useEffect(() => {
        if (shouldReset) {
            setPriceRange([0, maxPrice]);
            setTempPriceRange([0, maxPrice]);
            setIsPriceRangeChanged(false);
            setSelectedCategories(new Set([selectedCategory]));
            onCategoryChange([]);
        }
    }, [shouldReset, maxPrice]);

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        setTempPriceRange([0, value]);
        setIsPriceRangeChanged(true);
    };

    const handleApplyPriceRange = () => {
        setPriceRange(tempPriceRange);
        onPriceRangeChange(`0-${tempPriceRange[1]}`);
        setIsPriceRangeChanged(false);
    };

    const handleCategoryChange = (category) => {
        const newSelectedCategories = new Set(selectedCategories);
        // Prevent unchecking the collection category
        if (category === selectedCategory && newSelectedCategories.has(category)) {
            return;
        }
        
        if (newSelectedCategories.has(category)) {
            newSelectedCategories.delete(category);
        } else {
            newSelectedCategories.add(category);
        }
        setSelectedCategories(newSelectedCategories);
        onCategoryChange(Array.from(newSelectedCategories));
    };

    return (
        <div className="w-64 p-4 bg-white shadow-md">
            <div>
                <h3 className="text-lg font-semibold mb-3 text-black">Categories</h3>
                {categories.map((category) => (
                    <div key={category} className="mb-2 flex items-center">
                        <input
                            type="checkbox"
                            id={category}
                            value={category}
                            checked={selectedCategories.has(category)}
                            onChange={() => handleCategoryChange(category)}
                            disabled={category === selectedCategory}
                            className={`w-4 h-4 mr-2 ${
                                category === selectedCategory 
                                ? 'accent-gray-400 cursor-not-allowed' 
                                : 'accent-[#D4AF37] cursor-pointer'
                            }`}
                        />
                        <label htmlFor={category} className={`${
                            category === selectedCategory 
                            ? 'text-gray-600' 
                            : 'text-black cursor-pointer hover:text-[#D4AF37]'
                        } transition-colors`}>
                            {category}
                        </label>
                    </div>
                ))}
            </div>

            <div className="mb-6 mt-6">
                <h3 className="text-lg font-semibold mb-3 text-black">Price Range</h3>
                <div className="flex flex-col space-y-2">
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="1"
                        value={tempPriceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                    <div className="flex justify-between text-black">
                        <span>${tempPriceRange[0]}</span>
                        <span>${tempPriceRange[1]}</span>
                    </div>
                    <button
                        onClick={handleApplyPriceRange}
                        disabled={!isPriceRangeChanged}
                        className={`mt-2 px-4 py-2 rounded ${
                            isPriceRangeChanged 
                            ? 'bg-[#D4AF37] text-white hover:bg-[#B08F26]' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        } transition-colors`}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
