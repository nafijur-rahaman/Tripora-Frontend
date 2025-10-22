import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiStar, FiClock } from "react-icons/fi";

const PackageCard = ({ pkg }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
    >
      {/* Image */}
      <img
        src={pkg?.image}
        alt={pkg?.tour_name || "Package image"}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      {/* Wishlist & Duration */}
      <div className="absolute top-0 right-0 p-4 z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <FiHeart className="text-xl" />
        </motion.button>
      </div>
      <div className="absolute top-0 left-0 p-4 z-20">
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white py-1.5 px-3 rounded-full">
          <FiClock className="text-sm" />
          <span className="text-sm font-medium">{pkg?.duration}</span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{pkg?.destination}</h3>
        <p className="text-base text-white/90 mb-4">{pkg?.tour_name}</p>

        <div className="flex justify-between items-center border-t border-white/20 pt-4">
          <div className="flex items-center space-x-1.5">
            <FiStar className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-lg">
              {pkg?.rating ?? "4.9"}{" "}
              <span className="text-white/80 text-sm">
                ({pkg?.reviews ?? "120"} reviews)
              </span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-white/80 block">From</span>
            <span className="text-2xl font-extrabold">${pkg?.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
