import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import FilterSidebar from './FilterSidebar';
import PackageResults from './PackageResults';

const allPackages = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2575&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'Bora Bora, French Polynesia',
        title: 'Overwater Bungalow Retreat',
        price: 2499,
        rating: 4.9,
        duration: '7 Days',
        category: 'Beach'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1542640243-2c46215363b3?q=80&w=2574&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'Kyoto, Japan',
        title: 'Ancient Temples & Spring Blossoms',
        price: 3200,
        rating: 4.8,
        duration: '10 Days',
        category: 'Cultural'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1533105079780-52bada29356f?q=80&w=2670&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'Santorini, Greece',
        title: 'Aegean Sea Caldera Views',
        price: 2850,
        rating: 4.9,
        duration: '8 Days',
        category: 'Relaxation'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1501555088652-42146b24896f?q=80&w=2574&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'Swiss Alps, Switzerland',
        title: 'Alpine Hiking Adventure',
        price: 3500,
        rating: 4.7,
        duration: '9 Days',
        category: 'Adventure'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=2574&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'Rome, Italy',
        title: 'Eternal City Discovery',
        price: 1900,
        rating: 4.6,
        duration: '5 Days',
        category: 'City'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2568&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'Maldives',
        title: 'Luxury Beach Villa',
        price: 4500,
        rating: 5.0,
        duration: '7 Days',
        category: 'Beach'
    }
];

const AllPackagesPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    

    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        duration: 0,
        categories: [],
        rating: 0
    });
    

    const filteredPackages = allPackages.filter(pkg => {
        const byPrice = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
        const byRating = filters.rating === 0 ? true : pkg.rating >= filters.rating;
        const byCategory = filters.categories.length === 0 ? true : filters.categories.includes(pkg.category);
        return byPrice && byRating && byCategory;
    });

    return (
        <div className="pt-32 pb-24 bg-gray-50 min-h-screen"> 
            <div className="container mx-auto px-6">
                
                {/* --- Page Header --- */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Explore All Packages
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Find the perfect adventure tailored to you.
                    </p>
                </div>


                {/* --- Mobile Filter Button --- */}
                <div className="lg:hidden mb-6 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Filter Results</span>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                    >
                        <FiFilter />
                        <span>Filters</span>
                    </button>
                </div>



                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* --- 1. Filter Sidebar (Desktop) --- */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32">
                            <FilterSidebar filters={filters} setFilters={setFilters} />
                        </div>
                    </aside>




                    {/* --- Package Results --- */}
                    <main className="lg:col-span-3">
                        <PackageResults packages={filteredPackages} />
                    </main>

                </div>
            </div>



            {/* --- Mobile Filter Modal --- */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 w-full h-full bg-white z-[100] lg:hidden overflow-y-auto"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold">Filters</h3>
                            <button onClick={() => setIsFilterOpen(false)}>
                                <FiX className="w-7 h-7" />
                            </button>
                        </div>
                        <div className="p-6">
                            <FilterSidebar filters={filters} setFilters={setFilters} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllPackagesPage;