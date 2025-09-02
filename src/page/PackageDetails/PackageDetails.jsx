import React from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";

export default function PackageDetails() {
  const packagedata = useLoaderData();
  const packageDetails = packagedata.data;

  return (
    <motion.section
      className="py-30 bg-gradient-to-b from-gray-50 via-white to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-lg relative group h-72 lg:h-120"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={packageDetails.image}
            alt={packageDetails.tour_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 rounded-md shadow">
            Featured
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6 border border-gray-100"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800">
            {packageDetails.tour_name}
          </h2>

          {/* Guide Info */}
          <div className="flex items-center gap-3">
            <img
              src={packageDetails.guide_photo}
              alt={packageDetails.guide_name}
              className="w-12 h-12 rounded-full border border-sky-400 shadow"
            />
            <div>
              <p className="text-base font-semibold text-gray-700">
                {packageDetails.guide_name}
              </p>
              <p className="text-sm text-gray-500">{packageDetails.guide_email}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs bg-sky-100 text-sky-700 rounded-full">
              {packageDetails.duration}
            </span>
            <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
              Departure: {packageDetails.departure_date}
            </span>
            <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
              From: {packageDetails.departure_location}
            </span>
            <span className="px-3 py-1 text-xs bg-pink-100 text-pink-700 rounded-full">
              Destination: {packageDetails.destination}
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-sky-600">
            ${packageDetails.price}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Package Details
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {packageDetails.package_details}
            </p>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 inline-block bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:shadow-lg transition-all"
          >
            Book Now
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
