import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import PackageCard from "./PackageCard";
import PackageCardSkeleton from "./PackageCardSkeleton";
import { useApi } from "../../hooks/UseApi";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi"; 

export default function JourneySection() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { get } = useApi();

    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await get("https://tripora-server.vercel.app/api/get_limited_packages/");
                if (response?.success && Array.isArray(response.data)) {
                    setPackages(response.data);
                } else {
                    throw new Error(response?.message || "Failed to fetch packages.");
                }
            } catch (error) {
                console.error("Error fetching packages:", error);
                setError(error.message || "Could not load featured packages.");
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const skeletons = Array.from({ length: 6 });

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
     
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Featured Packages
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Curated experiences from around the world, hand-picked just for you.
                    </p>
                </motion.div>

          
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading
                        ? skeletons.map((_, idx) => <PackageCardSkeleton key={idx} />)
                        : error
                            ? <div className="text-center py-16 text-red-600">
                                <FiAlertTriangle className="w-8 h-8 inline-block mr-2" />
                                <span>{error}</span>
                            </div>
                            : packages.map((pkg) => (
                          
                                <Link
                                    key={pkg._id} 
                                    to={`/package-details/${pkg._id}`} 
                                    className="block transition-transform duration-300 hover:-translate-y-1" // Add hover effect to Link
                                >
                                    <PackageCard
                                        pkg={{
                                            id: pkg._id,
                                            image: pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'default-placeholder.jpg',
                                            location: pkg.location,
                                            title: pkg.title,
                                            price: parseFloat(pkg.price) || 0,
                                            rating: parseFloat(pkg.rating) || 0,
                                            duration: pkg.duration,
                                        }}
                                    />
                                </Link>
                            ))
                    }
                </div>

               
                {!loading && !error && packages.length > 0 && ( 
                    <div className="text-center mt-16">
                        <Link
                            to="/all_packages" 
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white
                                       font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700
                                       transition-colors duration-300"
                        >
                            <span>View All Packages</span>
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}