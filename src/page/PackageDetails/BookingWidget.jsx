import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiCalendar, FiUsers } from 'react-icons/fi';

const BookingWidget = ({ price, rating, reviewsCount }) => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
            {/* Price and Rating */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-extrabold text-gray-900">
                    ${price} <span className="text-base font-normal text-gray-600">/ person</span>
                </div>
                <div className="font-semibold">
                    <FiStar className="inline w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    {rating} <span className="text-gray-500 font-normal">({reviewsCount})</span>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* Date Picker */}
                <div className="relative">
                    <label htmlFor="date" className="text-sm font-semibold text-gray-700">Date</label>
                    <FiCalendar className="absolute left-3 top-1/2 mt-2.5 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        id="date"
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => e.target.type = 'text'}
                        placeholder="Select your date"
                        className="w-full pl-10 pr-4 py-3 mt-1 rounded-lg border border-gray-300
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                
                {/* Travelers */}
                <div className="relative">
                    <label htmlFor="travelers" className="text-sm font-semibold text-gray-700">Travelers</label>
                    <FiUsers className="absolute left-3 top-1/2 mt-2.5 -translate-y-1/2 text-gray-400" />
                    <select
                        id="travelers"
                        className="w-full pl-10 pr-4 py-3 mt-1 rounded-lg border border-gray-300
                                   appearance-none bg-white
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="1">1 Traveler</option>
                        <option value="2">2 Travelers</option>
                        <option value="3">3 Travelers</option>
                        <option value="4">4 Travelers</option>
                        <option value="5">5+ Travelers</option>
                    </select>
                </div>
            </div>

            {/* Book Now Button */}
            <motion.button
                className="w-full mt-6 py-4 bg-blue-600 text-white font-bold
                           text-lg rounded-lg shadow-lg hover:bg-blue-700
                           transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                Book Now
            </motion.button>
            
            <p className="text-center text-gray-500 text-sm mt-4">
                You won't be charged yet
            </p>
        </div>
    );
};

export default BookingWidget;