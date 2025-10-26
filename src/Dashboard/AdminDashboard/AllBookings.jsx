import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi"; // Added icons
import Pagination from "../../components/Pagination/Pagination"; // Adjust path if needed
import { useApi } from "../../hooks/UseApi"; // Adjust path if needed
import useAuth from "../../hooks/UseAuth"; // Adjust path if needed


const filterTabs = ["All", "Succeeded", "Cancelled", "Failed"];

const AllBookings = () => {
    // --- State ---
    const [allBookings, setAllBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const { get } = useApi();
    const { loading: authLoading, user } = useAuth(); 

    const bookingsPerPage = 6;

    // --- Data Fetching ---
    useEffect(() => {
        const fetchBookings = async () => {
      
            if (authLoading || !user) {
                 setIsLoading(false); 
                 return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const res = await get("/get-all-bookings");
                if (res?.success && Array.isArray(res.data)) {
                    setAllBookings(res.data);
                } else {
                    throw new Error(res?.message || "Failed to fetch bookings.");
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError(error.message || "Could not load bookings.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [authLoading, user]); 

    const filteredBookings = useMemo(() => {
        return allBookings.filter((booking) => {
            let matchesFilter = true;
            if (activeFilter !== "All") {

                const filterStatus = activeFilter.toLowerCase();
                matchesFilter = booking.paymentStatus?.toLowerCase() === filterStatus;
            }

   
            const sq = searchQuery.toLowerCase();
            let matchesSearch = true;
            if (sq) {
                matchesSearch =
                    booking.bookingId?.toLowerCase().includes(sq) ||
                    booking.customerEmail?.toLowerCase().includes(sq) ||
                    booking.packageName?.toLowerCase().includes(sq) ||
                    booking.paymentIntentId?.toLowerCase().includes(sq); 
            }

            return matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter, allBookings]);

    const sortedBookings = useMemo(() => {
        return [...filteredBookings].sort((a, b) => {

            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [filteredBookings]);


    // Paginate the sorted list
    const currentBookings = useMemo(() => {
        const start = (currentPage - 1) * bookingsPerPage;
        const end = start + bookingsPerPage;
        return sortedBookings.slice(start, end); 
    }, [currentPage, sortedBookings]);

    const totalPages = Math.ceil(sortedBookings.length / bookingsPerPage);


    if (authLoading || isLoading) {
         return (
             <div className="flex justify-center items-center h-64">
                 <FiLoader className="animate-spin text-blue-600 text-4xl" />
                 <span className="ml-4 text-lg font-semibold text-gray-700">Loading bookings...</span>
             </div>
         );
    }

    if (error) {
         return (
             <div className="text-center py-16 text-red-600">
             </div>
         );
    }

    if (!user) {
        return <div className="p-12 text-center">Admin access required.</div>;
    }


    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Bookings</h1>

            {/* --- Filter Bar --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* Filter Tabs */}
                <div className="bg-white p-1 rounded-lg shadow-md border border-gray-100">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveFilter(tab);
                                setCurrentPage(1); 
                            }}
                            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${
                                activeFilter === tab
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name, package, or ID..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); 
                        }}
                        className="w-full md:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* --- Main Table Container --- */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">Booking ID</th>
                                <th className="py-4 px-6 font-medium">Customer</th>
                                <th className="py-4 px-6 font-medium">Package</th>
                                <th className="py-4 px-6 font-medium">Travel Date</th> 
                                <th className="py-4 px-6 font-medium">Payment ID</th> 
                                <th className="py-4 px-6 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentBookings.length > 0 ? (
                                currentBookings.map((booking) => (
                                    <BookingRow key={booking._id} booking={booking} />
                                ))
                            ) : (
                                <tr>
                                     <td colSpan="6" className="text-center py-16 text-gray-500">
                                         No bookings match your criteria.
                                     </td>
                                </tr>
                            )}
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


const BookingRow = ({ booking }) => {


    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'succeeded':
                return { text: 'Succeeded', chip: 'bg-green-100 text-green-700', icon: <FiCheckCircle className="w-4 h-4 mr-1.5"/> };
            case 'cancelled': 
                 return { text: 'Cancelled', chip: 'bg-red-100 text-red-700', icon: <FiXCircle className="w-4 h-4 mr-1.5"/> };
            case 'failed': 
                 return { text: 'Failed', chip: 'bg-red-100 text-red-700', icon: <FiXCircle className="w-4 h-4 mr-1.5"/> };
            case 'pending': 
            default:
                return { text: 'Pending', chip: 'bg-yellow-100 text-yellow-700', icon: <FiLoader className="w-4 h-4 mr-1.5 animate-spin"/> };
        }
    };

    const { text: statusText, chip, icon } = getStatusInfo(booking.paymentStatus);

    // Format the travel date
    const formattedTravelDate = booking.date
        ? new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : 'N/A';

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            {/* Booking ID */}
            <td className="py-4 px-6">
                <span className="font-semibold text-gray-900">{booking.bookingId}</span>
            </td>
            {/* Customer Email */}
            <td className="py-4 px-6">
                 {/* Display Email as Name is not available */}
                <span className="font-semibold text-gray-900">{booking.customerEmail}</span>
            </td>
            {/* Package Name */}
            <td className="py-4 px-6 text-gray-700">{booking.packageName}</td>
            {/* Travel Date */}
            <td className="py-4 px-6 text-gray-700">{formattedTravelDate}</td>
            {/* Payment ID */}
             <td className="py-4 px-6">
                 <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded" title={booking.paymentIntentId}>
                     {booking.paymentIntentId ? `${booking.paymentIntentId.substring(0, 10)}...` : 'N/A'}
                 </span>
            </td>
            {/* Status */}
            <td className="py-4 px-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${chip}`}>
                    {icon}
                    {statusText}
                </span>
            </td>
        </tr>
    );
};