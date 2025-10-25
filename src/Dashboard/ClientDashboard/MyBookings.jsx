import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiSearch, FiChevronDown } from 'react-icons/fi';
import CustomerBookingCard from './CustomerBookingCard';
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal"
import Pagination from "../../components/Pagination/Pagination"

// --- Dummy Data (Same as before) ---
const allBookings = [
    { id: 'B1234', package: 'Overwater Bungalow Retreat', location: 'Bora Bora', date: '2025-10-21', duration: '7 Days', status: 'Upcoming', price: 2499, image: '...' },
    { id: 'B1239', package: 'Alpine Hiking Adventure', location: 'Swiss Alps', date: '2025-11-05', duration: '9 Days', status: 'Upcoming', price: 3500, image: '...' },
    { id: 'B1238', package: 'Kyoto Cultural Tour', location: 'Kyoto, Japan', date: '2025-04-10', duration: '10 Days', status: 'Past', price: 3200, image: '...' },
    { id: 'B1236', package: 'Eternal City Discovery', location: 'Rome, Italy', date: '2024-08-15', duration: '5 Days', status: 'Past', price: 1900, image: '...' },
    // ... add more bookings to test pagination
    { id: 'B1240', package: 'City of Lights', location: 'Paris, France', date: '2024-05-20', duration: '5 Days', status: 'Past', price: 2100, image: '...' },
    { id: 'B1241', package: 'Santorini Sunset', location: 'Santorini, Greece', date: '2024-02-14', duration: '7 Days', status: 'Past', price: 2800, image: '...' },
];

const filterTabs = ['Upcoming', 'Past'];

const MyBookings = () => {
    // --- State ---
    const [activeFilter, setActiveFilter] = useState('Upcoming');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('date-desc');
    const [currentPage, setCurrentPage] = useState(1);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    const bookingsPerPage = 5; 

    // --- Enhanced Filtering & Sorting ---
    const filteredAndSortedBookings = useMemo(() => {
        const sq = searchQuery.toLowerCase();

        // Filter by Tab
        let items = allBookings.filter(booking => booking.status === activeFilter);
        
        // Filter by Search
        if (sq) {
            items = items.filter(booking => 
                booking.package.toLowerCase().includes(sq) ||
                booking.location.toLowerCase().includes(sq)
            );
        }

        // Sort
        items.sort((a, b) => {
            switch (sortOrder) {
                case 'date-asc': return a.date.localeCompare(b.date);
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'date-desc':
                default: return b.date.localeCompare(a.date);
            }
        });
        
        return items;
    }, [activeFilter, searchQuery, sortOrder]);

    // CREATE PAGINATED LIST & TOTAL PAGES ---
    const totalPages = Math.ceil(filteredAndSortedBookings.length / bookingsPerPage);

    const currentBookings = useMemo(() => {
        const start = (currentPage - 1) * bookingsPerPage;
        const end = start + bookingsPerPage;
        return filteredAndSortedBookings.slice(start, end);
    }, [currentPage, filteredAndSortedBookings]);
    
    // --- Modal Handlers 
    const openCancelModal = (booking) => { /* ... */ };
    const closeModal = () => { /* ... */ };
    const handleConfirmCancel = () => { /* ... */ };

return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                My Bookings
            </h1>

 
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
                

                <div className="flex items-center border-b border-gray-200 w-full md:w-auto">
                    {filterTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveFilter(tab);
                                setCurrentPage(1); 
                            }}
                            className={`px-1 py-3 text-lg font-semibold -mb-px mr-8
                                ${activeFilter === tab 
                                    ? 'border-b-2 border-blue-600 text-blue-600' 
                                    : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
 
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Sort Dropdown */}
                    <div className="relative w-full sm:w-48">
                        <select
                            value={sortOrder}
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                                setCurrentPage(1); 
                            }}
                            className="w-full appearance-none bg-white border border-gray-300 rounded-lg 
                                       pl-4 pr-10 py-2.5 text-gray-700 font-medium
                                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="date-desc">Newest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="price-asc">Price: Low to High</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-64">
                        <input 
                            type="text"
                            placeholder="Search trips..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); 
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* --- Bookings List --- */}
            <div className="space-y-6">
                {currentBookings.length > 0 ? (
                    currentBookings.map(booking => (
                        <CustomerBookingCard 
                            key={booking.id} 
                            booking={booking} 
                            onCancel={openCancelModal}
                        />
                    ))
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold text-gray-800">No Bookings Found</h3>
                        <p className="text-gray-600 mt-2">
                            {searchQuery || activeFilter !== 'Upcoming' 
                                ? "Try adjusting your filters or search terms."
                                : "You don't have any upcoming trips. Time to book one!"
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* --- Pagination --- */}
            {totalPages > 1 && (
                <div className="mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {/* --- Cancellation Modal --- */}
            {bookingToCancel && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmCancel}
                    title="Cancel Booking"
                    message={`Are you sure you want to cancel your trip to ${bookingToCancel.location}? Please check the cancellation policy.`}
                    confirmText="Yes, Cancel Booking"
                    confirmClass="bg-red-600 hover:bg-red-700"
                    icon={<FiAlertTriangle className="w-6 h-6 text-red-6D0" />}
                />
            )}
        </>
    );
};

export default MyBookings;