import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import FilterSidebar from './FilterSidebar';
import PackageResults from './PackageResults';
import {useApi} from '../../hooks/UseApi';
import useAuth from  '../../hooks/UseAuth';


const AllPackagesPage = () => {
    const [allPackages, setAllPackages] = useState([]); 
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { get } = useApi();
    const { loading} = useAuth();
    
    useEffect(() =>{
        if (loading) return;
        const fetchPackages = async () => {
            try {
                const response = await get("/get-all-packages");
                setAllPackages(response?.data || []);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };
        fetchPackages();

    },[loading]);

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
                        <PackageResults  packages={filteredPackages} />
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