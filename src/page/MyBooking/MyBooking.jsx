import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = use(AuthContext);
  const userEmail = user?.email;
  const token = localStorage.getItem("token");
  // console.log(userEmail);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/get_all_bookings?userEmail=${encodeURIComponent(userEmail)}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data.data || []);
        console.log(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  // Mark booking as completed
  const handleComplete = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3000/api/update_booking/${bookingId}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "completed" } : b
        )
      );
    } catch (error) {
      console.error("Failed to complete booking:", error);
      alert("Failed to update booking status.");
    }
  };

  // Cancel booking and decrement package booking count
  const handleCancel = async (bookingId, packageId) => {
    try {
      await axios.delete("http://localhost:3000/api/delete_booking/", {
        data: { booking_id: bookingId, package_id: packageId },
      });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <section className="py-30 bg-gray-50" id="manage-booking">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          Manage My Bookings
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading bookings...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">
                    {booking.tour_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    Guide: {booking.buyer_name}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    Email: {booking.buyer_email}
                  </p>

                  <p className="text-gray-600 text-sm mb-1">
                    Request for: {booking.special_note}
                  </p>
                  <p className="text-lg font-bold text-gray-800 mb-2">
                    ${booking.price}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-medium text-sm text-white ${
                      booking.status === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    {booking.status || "pending"}
                  </span>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        handleCancel(booking._id, booking.package_id)
                      }
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition"
                    >
                      Cancel
                    </button>
                    {booking.status !== "completed" && (
                      <button
                        onClick={() => handleComplete(booking._id)}
                        className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
