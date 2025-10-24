import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import Pagination from "../../components/Pagination/Pagination"
import { useApi } from '../../hooks/UseApi';
import { useEffect } from 'react';
import AllPackages from '../../page/AllPackage/AllPackages';



const filterTabs = ['All', 'Confirmed', 'Pending', 'Cancelled'];

const AllBookings = () => {
    // --- State ---
    const [allBookings, setAllBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const { get } = useApi();

    const bookingsPerPage = 6;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await get('/get-all-bookings');
                if (res?.success) {
                    setAllBookings(res.data);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, [AllPackages]);

    // --- Memoized Filtering & Pagination ---
    const filteredBookings = useMemo(() => {
        return allBookings.filter(booking => {
            const matchesFilter = activeFilter === 'All' || booking.status === activeFilter;
            const sq = searchQuery.toLowerCase();
            const matchesSearch = 
                booking.bookingId.toLowerCase().includes(sq) ||
                booking.customerName.toLowerCase().includes(sq) ||
                booking.packageName.toLowerCase().includes(sq);
            return matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter, allBookings]);

    const currentBookings = useMemo(() => {
        const start = (currentPage - 1) * bookingsPerPage;
        const end = start + bookingsPerPage;
        return filteredBookings.slice(start, end);
    }, [currentPage, filteredBookings]);
    
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                All Bookings
            </h1>

            {/* --- Filter Bar --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="bg-white p-1 rounded-lg shadow-md border border-gray-100">
                    {filterTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors
                                ${activeFilter === tab 
                                    ? 'bg-blue-600 text-white shadow' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search by name, package, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* --- Main Table Container --- */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[800px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">Booking ID</th>
                                <th className="py-4 px-6 font-medium">Customer</th>
                                <th className="py-4 px-6 font-medium">Package</th>
                                <th className="py-4 px-6 font-medium">Date</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {currentBookings.map((booking) => (
                                <BookingRow key={booking.id} booking={booking} />
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {totalPages > 1 && (
                    <div className="p-6 border-t border-gray-100">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default AllBookings;

// --- Sub-Component for Booking Row (Simplified) ---
const BookingRow = ({ booking }) => {
    
    const getStatusChip = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            {/* Booking ID */}
            <td className="py-4 px-6">
                <span className="font-semibold text-gray-900">{booking.bookingId}</span>
            </td>
            {/* Customer */}
            <td className="py-4 px-6">
                <span className="font-semibold text-gray-900">{booking.customerName}</span>
                <span className="block text-sm text-gray-600">{booking.customerEmail}</span>
            </td>
            {/* Package */}
            <td className="py-4 px-6 text-gray-700">{booking.packageName}</td>
            {/* Date */}
            <td className="py-4 px-6 text-gray-700">{booking.bookingDate}</td>
            {/* Status */}
            <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusChip(booking.status)}`}>
                    {booking.status}
                </span>
            </td>
        </tr>
    );
};