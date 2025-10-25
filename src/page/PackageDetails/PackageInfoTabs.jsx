import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiMap, FiMessageSquare, FiList } from 'react-icons/fi';

const tabs = [
    { icon: <FiFileText />, name: 'Overview' },
    { icon: <FiList />, name: 'Itinerary' },
    { icon: <FiMessageSquare />, name: 'Reviews' },
    { icon: <FiMap />, name: 'Location' },
];



const PackageInfoTabs = ({ overview, itinerary }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <div className="w-full mt-10">
            {/* Tab Headers */}
            <nav className="border-b border-gray-200">
                <ul className="flex -mb-px space-x-8">
                    {tabs.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => setSelectedTab(item)}
                                className={`flex items-center space-x-2 py-4 px-1
                                            border-b-2 text-lg font-semibold
                                            transition-colors
                                            ${item.name === selectedTab.name
                                                ? 'border-blue-600 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                            >
                                {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Tab Content */}
            <main className="py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab.name}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab.name === 'Overview' && <OverviewTab content={overview} />}
                        {selectedTab.name === 'Itinerary' && <ItineraryTab itinerary={itinerary} />}
                        {selectedTab.name === 'Reviews' && <ReviewsTab />}
                        {selectedTab.name === 'Location' && <LocationTab />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

// --- Tab Content Components ---

const OverviewTab = ({ content }) => (
    <div className="prose prose-lg max-w-none text-gray-600">
        {/* Use Tailwind's 'prose' class for beautiful text styling */}
        <p>{content}</p>
    </div>
);

const ItineraryTab = ({ itinerary }) => (
    <div className="space-y-6">
        {itinerary.map((day) => (
            <div key={day.day} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-17 px-2 h-12 bg-blue-100 text-blue-600
                                rounded-lg flex items-center justify-center font-bold text-lg">
                    Day {day.day}
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-900">{day.title}</h4>
                    <p className="text-gray-600 mt-1">{day.desc}</p>
                </div>
            </div>
        ))}
    </div>
);

const ReviewsTab = () => (
    <div>
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        <p className="text-gray-600">User reviews will be displayed here.</p>
        {/* You would map over your review data and display individual review components */}
    </div>
);

const LocationTab = () => (
    <div>
        <h3 className="text-2xl font-bold mb-4">Location</h3>
        <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Embedded map (e.g., Google Maps) will be here.</p>
        </div>
    </div>
);


export default PackageInfoTabs;