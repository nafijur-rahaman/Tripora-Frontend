// src/components/HeroSearchForm.jsx
import React, { useState } from 'react';
import { FiBox, FiHome, FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSearchForm = () => {
    const [activeTab, setActiveTab] = useState('packages');

    // Tab component for reusability
    const SearchTab = ({ icon, label, tabName }) => (
        <button
            type="button"
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-lg font-semibold outline-none transition-colors duration-300
                ${activeTab === tabName 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    // Form input component
    const SearchInput = ({ icon, placeholder, id, type = 'text', containerClassName = '', inputClassName = '' }) => (
        <div className={`relative flex-1 ${containerClassName}`}>
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">{icon}</div>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`w-full h-full bg-transparent text-white placeholder-white/70 py-4 pr-4 
                            pl-12 focus:outline-none focus:bg-white/10 ${inputClassName}`}
            />
        </div>
    );

    return (
        <div className="w-full max-w-4xl">
            {/* Tab Navigation */}
            <div className="flex space-x-1">
                <SearchTab icon={<FiBox />} label="Packages" tabName="packages" />
                <SearchTab icon={<FiHome />} label="Stays" tabName="stays" />
                {/* Add more tabs as needed, e.g., Flights */}
            </div>

            {/* Search Form Panel */}
            <motion.form
                key={activeTab} // This ensures the form re-renders with animation when tab changes
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/20 backdrop-blur-lg rounded-b-xl rounded-r-xl shadow-2xl 
                           flex flex-col md:flex-row items-center overflow-hidden"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 w-full">
                    {/* Destination */}
                    <SearchInput
                        icon={<FiMapPin />}
                        placeholder="Where are you going?"
                        id="destination"
                        containerClassName="border-b md:border-b-0 md:border-r border-white/30"
                    />

                    {/* Date */}
                    <SearchInput
                        icon={<FiCalendar />}
                        placeholder="Select Dates"
                        id="date"
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')} // UX trick
                        onBlur={(e) => (e.target.type = 'text')}  // UX trick
                        containerClassName="border-b md:border-b-0 md:border-r border-white/30"
                    />

                    {/* Travelers */}
                    <SearchInput
                        icon={<FiUsers />}
                        placeholder="Add Travelers"
                        id="travelers"
                        type="number"
                        containerClassName=""
                    />
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 text-white font-bold
                               flex items-center justify-center px-6 py-4 md:h-full
                               hover:bg-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiSearch className="text-xl md:mr-2" />
                    <span className="hidden md:inline">Search</span>
                </motion.button>
            </motion.form>
        </div>
    );
};

export default HeroSearchForm;