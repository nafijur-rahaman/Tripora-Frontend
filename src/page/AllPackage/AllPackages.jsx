import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { NavLink } from "react-router";

export default function AllPackages() {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/api/get_all_packages/",{
          headers: {
           Authorization: `Bearer ${token}`,
          },
        });
        setPackages(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        setError("Failed to load packages.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [token]);

  // Fetch categories
  useEffect(() => {
    
    const fetchCategories = async () => {
      if (!token) return;
      // console.log(token);
      try {
        const res = await axios.get("http://localhost:3000/api/categories",{
          headers: {
           Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data.map(cat => cat.name));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [token]);

  // Filter packages based on selected category
  const filteredPackages =
    activeCategory === "All"
      ? packages
      : packages.filter(pkg => pkg.category === activeCategory);

  return (
    <section className="py-30 bg-gray-50" id="packages">

    

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">Your Journey Starts Here</h2>
          <p className="text-lg text-gray-600 mt-2">Featured Packages for Your Next Adventure</p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-8 flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {loading
              ? // Skeleton Loading Cards
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/2 mt-4"></div>
                    </div>
                  </motion.div>
                ))
              : filteredPackages.map(pkg => (
                  <motion.div
                    key={pkg._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform"
                  >
                    <img src={pkg.image} alt={pkg.tour_name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{pkg.tour_name}</h3>
                      <div className="text-gray-600 text-sm mb-1">Guide: {pkg.guide_name}</div>
                      <div className="text-gray-600 text-sm mb-1">Duration: {pkg.duration}</div>
                      <div className="text-gray-600 text-sm mb-1">Departure: {pkg.departure_date}</div>
                      <div className="text-gray-600 text-sm mb-1">From: {pkg.departure_location}</div>
                      <div className="text-lg font-bold text-gray-800 mb-4">Price: ${pkg.price}</div>
                      <NavLink
                        to= {`/package_details/${pkg._id}`}
                        className="block w-full text-center bg-sky-500 hover:bg-sky-600  text-white py-2 rounded-xl  transition"
                      >
                        View Details
                      </NavLink>
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
