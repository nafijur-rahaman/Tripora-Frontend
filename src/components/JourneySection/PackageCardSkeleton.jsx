import React from "react";
import { motion } from "framer-motion";

const PackageCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse"
    >
      {/* Image Placeholder */}
      <div className="absolute inset-0 w-full h-full bg-gray-300 rounded-2xl"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-2xl"></div>

      {/* Wishlist & Duration */}
      <div className="absolute top-0 right-0 p-4">
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
      </div>
      <div className="absolute top-0 left-0 p-4">
        <div className="w-20 h-6 bg-gray-400 rounded-full"></div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 w-full p-6 flex flex-col space-y-2">
        <div className="h-6 bg-gray-400 rounded w-3/4"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2 items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="h-4 bg-gray-400 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-400 rounded w-12"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCardSkeleton;
