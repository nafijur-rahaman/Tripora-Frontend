import React from 'react';
import Slider from 'rc-slider';

const categories = ['Adventure', 'Beach', 'City', 'Cultural', 'Relaxation'];
const ratings = [5, 4, 3, 2, 1];

const FilterSidebar = ({ filters, setFilters }) => {

    const handlePriceChange = (value) => {
        setFilters(prev => ({ ...prev, priceRange: value }));
    };

    const handleCategoryToggle = (category) => {
        setFilters(prev => {
            const newCategories = prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category];
            return { ...prev, categories: newCategories };
        });
    };

    const handleRatingClick = (rate) => {
        setFilters(prev => ({ ...prev, rating: prev.rating === rate ? 0 : rate })); // Toggle rating
    };

    return (
        <aside className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Filters</h3>
                <button 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600"
                    onClick={() => setFilters({ priceRange: [0, 5000], duration: 0, categories: [], rating: 0 })}
                >
                    Clear All
                </button>
            </div>


            {/* --- Price Range Filter --- */}
            <FilterSection title="Price Range">
                <Slider
                    range
                    min={0}
                    max={5000}
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    allowCross={false}
                    handleStyle={[
                        { backgroundColor: '#3B82F6', borderColor: '#3B82F6', opacity: 1 },
                        { backgroundColor: '#3B82F6', borderColor: '#3B82F6', opacity: 1 }
                    ]}
                    trackStyle={[{ backgroundColor: '#3B82F6' }]}
                    railStyle={{ backgroundColor: '#E5E7EB' }}
                />
                <div className="flex justify-between text-gray-600 mt-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                </div>
            </FilterSection>

            {/* --- Categories Filter --- */}
            <FilterSection title="Categories">
                <div className="space-y-3">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                checked={filters.categories.includes(cat)}
                                onChange={() => handleCategoryToggle(cat)}
                            />
                            <span className="text-gray-700">{cat}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* --- Rating Filter --- */}
            <FilterSection title="Rating">
                <div className="flex flex-wrap gap-2">
                    {ratings.map((rate) => (
                        <button
                            key={rate}
                            onClick={() => handleRatingClick(rate)}
                            className={`px-4 py-2 rounded-lg border transition-colors
                                ${filters.rating === rate 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {rate} ★ & up
                        </button>
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
};


const FilterSection = ({ title, children }) => (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
        {children}
    </div>
);

export default FilterSidebar;