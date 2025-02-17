import React, { useState, useEffect } from 'react';
import SummaryApi from '../common/apiConfig.js';

const Sidebar = ({ onPriceRangeChange, onCategoryChange, selectedCategory, maxPrice }) => {
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
    const [tempPriceRange, setTempPriceRange] = useState([0, maxPrice]);
    const [categories, setCategories] = useState([]);

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
                if (Array.isArray(data.data)) {
                    setCategories(data.data);
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        setPriceRange([0, maxPrice]);
        setTempPriceRange([0, maxPrice]);
    }, [maxPrice]);

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        setTempPriceRange([0, value]);
    };

    const handleApplyPriceRange = () => {
        setPriceRange(tempPriceRange);
        onPriceRangeChange(`0-${tempPriceRange[1]}`);
    };

    return (
        <div className="w-64 p-4 bg-white shadow-md">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-black">Price Range</h3>
                <div className="flex flex-col space-y-2">
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
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
                        className="mt-2 px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#B8960C] transition-colors"
                    >
                        Apply
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3 text-black">Categories</h3>
                {categories.map((category) => (
                    <div key={category} className="mb-2 flex items-center">
                        <input
                            type="radio"
                            id={category}
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="w-4 h-4 mr-2 accent-[#D4AF37] cursor-pointer"
                            name="category"
                        />
                        <label htmlFor={category} className="text-black cursor-pointer hover:text-[#D4AF37] transition-colors">
                            {category}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
