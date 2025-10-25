import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertTriangle,
  FiSearch,
  FiChevronDown,
  FiLoader,
} from "react-icons/fi";
import CustomerBookingCard from "./CustomerBookingCard";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Pagination from "../../components/Pagination/Pagination";
import useAuth from "../../hooks/UseAuth";
import { useApi } from "../../hooks/UseApi";
import { useEffect } from "react";

const filterTabs = ["Upcoming", "Past"];

const MyBookings = () => {
  // --- State ---
  const [allBookingsData, setAllBookingsData] = useState([]); // Raw data from API
  const [isLoading, setIsLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  const [activeFilter, setActiveFilter] = useState("Upcoming"); // 'Upcoming' or 'Past'
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("date-desc"); // Default: Newest first
  const [currentPage, setCurrentPage] = useState(1);

  const { get } = useApi();
  const { user, loading: authLoading } = useAuth(); // Renamed loading to authLoading

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    // Don't fetch if auth is loading or user isn't available
    if (authLoading || !user?.email) {
      setIsLoading(false); // If no user, stop loading, show empty state later
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await get(`/get-user-bookings?userEmail=${user.email}`);
        if (res.success && Array.isArray(res.data)) {
          setAllBookingsData(res.data);
        } else {
          throw new Error(res.message || "Failed to fetch bookings.");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Could not load your bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading]);

  const bookingsPerPage = 3;

  const processedBookingsList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allBookingsData.map((booking) => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);

      const status = bookingDate >= today ? "Upcoming" : "Past";

      return {
        ...booking,
        status: status,

        packageTitle:
          booking.packageInfo?.title || booking.packageName || "N/A",
        location: booking.packageInfo?.location || "N/A",
        image: booking.packageInfo?.images || "default_image_path.jpg",
        price: parseFloat(booking.packageInfo?.price) || 0,
        duration: booking.packageInfo?.duration || "N/A",
      };
    });
  }, [allBookingsData]);

  // --- Filtering & Sorting ---
  const filteredAndSortedBookings = useMemo(() => {
    const sq = searchQuery.toLowerCase();

    let items = processedBookingsList.filter(
      (booking) => booking.status === activeFilter
    );

    if (sq) {
      items = items.filter(
        (booking) =>
          booking.packageTitle.toLowerCase().includes(sq) ||
          booking.location.toLowerCase().includes(sq) ||
          booking.bookingId.toLowerCase().includes(sq)
      );
    }

    items.sort((a, b) => {
      switch (sortOrder) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-desc":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return items;
  }, [activeFilter, searchQuery, sortOrder, processedBookingsList]);

  // --- Pagination ---
  const totalPages = Math.ceil(
    filteredAndSortedBookings.length / bookingsPerPage
  );
  const currentBookings = useMemo(() => {
    const start = (currentPage - 1) * bookingsPerPage;
    const end = start + bookingsPerPage;
    return filteredAndSortedBookings.slice(start, end);
  }, [currentPage, filteredAndSortedBookings]);

  const openCancelModal = (booking) => {
    setBookingToCancel(booking);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setBookingToCancel(null);
  };
  const handleConfirmCancel = () => {
    if (!bookingToCancel) return;
    console.log(`Cancelling booking: ${bookingToCancel.bookingId}`);
    //later
    closeModal();
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-blue-600 text-4xl" />
        <span className="ml-4 text-lg font-semibold text-gray-700">
          Loading your bookings...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <FiAlertTriangle className="mx-auto text-4xl mb-4" />
        <h3 className="text-2xl font-bold">Could Not Load Bookings</h3>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-800">Please Log In</h3>
        <p className="text-gray-600 mt-2">Log in to view your bookings.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {/* --- Premium Control Bar --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
        {/* Tabs */}
        <div className="flex items-center border-b border-gray-200 w-full md:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-1 py-3 text-lg font-semibold -mb-px mr-8 ${
                activeFilter === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Sort */}
          <div className="relative w-full sm:w-48">
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search trips or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* --- Bookings List --- */}
      <div className="space-y-6">
        {currentBookings.length > 0 ? (
          currentBookings.map((booking) => (
            <CustomerBookingCard
              key={booking._id}
              booking={{
                id: booking._id,
                bookingId: booking.bookingId,
                package: booking.packageTitle,
                location: booking.location,
                date: booking.date,
                duration: booking.duration,
                status: booking.status,
                price: booking.price,
                image: booking.image,
                packageApiId: booking.packageId,
              }}
              onCancel={openCancelModal}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800">
              No Bookings Found
            </h3>
            <p className="text-gray-600 mt-2">
              {searchQuery || activeFilter !== "Upcoming"
                ? "Try adjusting your filters or search terms."
                : "You don't have any upcoming trips. Time to book one!"}
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
          // Use flattened data for message
          message={`Are you sure you want to cancel your trip to ${bookingToCancel.location} (${bookingToCancel.bookingId})? Please check the cancellation policy.`}
          confirmText="Yes, Cancel Booking"
          confirmClass="bg-red-600 hover:bg-red-700"
          icon={<FiAlertTriangle className="w-6 h-6 text-red-600" />} // Fixed icon color
        />
      )}
    </>
  );
};

export default MyBookings;
