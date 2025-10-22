import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import PackageCard from "./PackageCard";
import PackageCardSkeleton from "./PackageCardSkeleton";
import { useApi } from "../../hooks/UseApi";
import { motion } from "framer-motion";

export default function JourneySection() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await get("/get_limited_packages");
        setPackages(response?.data || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
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
        {/* Section Header */}
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

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? skeletons.map((_, idx) => <PackageCardSkeleton key={idx} />)
            : packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>
      </div>
    </section>
  );
}
