import React, { useState, useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import PackageCard from './PackageCard'; 
import Pagination from '../../components/Pagination/Pagination';
const PackageResults = ({ packages }) => {
    const [sortOrder, setSortOrder] = useState('featured');
    

    const sortedPackages = useMemo(() => {
        return [...packages].sort((a, b) => {
            switch (sortOrder) {
                case 'price-low-high':
                    return a.price - b.price;
                case 'price-high-low':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'featured':
                default:
                    return 0; 
            }
        });
    }, [packages, sortOrder]);


    const [currentPage, setCurrentPage] = useState(1);
    const packagesPerPage = 4; // Show 4 packages per page
    const totalPages = Math.ceil(sortedPackages.length / packagesPerPage);
    const currentPackages = sortedPackages.slice(
        (currentPage - 1) * packagesPerPage,
        currentPage * packagesPerPage
    );

    return (
        <div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Showing {packages.length} Packages
                </h2>
                <div className="relative">
                    <label htmlFor="sort-order" className="sr-only">Sort by</label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg 
                                   pl-4 pr-10 py-2.5 text-gray-700 font-medium
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="featured">Sort by: Featured</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="rating">Rating: High to Low</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* --- Results Grid --- */}
            {currentPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentPackages.map((pkg) => (
                        <PackageCard key={pkg._id} pkg={pkg} variants={{}} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24">
                    <h3 className="text-2xl font-bold text-gray-800">No Packages Found</h3>
                    <p className="text-gray-600 mt-2">Try adjusting your filters to find your perfect trip.</p>
                </div>
            )}


            {/* --- Pagination --- */}
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} 
                />
            )}
        </div>
    );
};

export default PackageResults;