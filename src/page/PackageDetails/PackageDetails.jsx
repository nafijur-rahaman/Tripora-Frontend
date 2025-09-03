import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import SweetAlert from "sweetalert2";

export default function PackageDetails() {
  const packageData = useLoaderData();
  const packageDetails = packageData.data;
  // console.log(packageDetails);
  const { user } = use(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [specialNote, setSpecialNote] = useState("");

  const token = localStorage.getItem("token");

  const handleBooking = async () => {
    const bookingData = {
      tour_name: packageDetails.tour_name,
      price: packageDetails.price,
      buyer_name: user?.displayName || "Guest",
      buyer_email: user?.email || "No Email",
      guide_email: packageDetails.guide_email,
      booking_date: new Date().toISOString(),
      special_note: specialNote,
      status: "pending",
    };

    // console.log("Booking Data:", bookingData);
    try {
      const response = await axios.post(
        "https://tripora-server.vercel.app/api/book_package/",
        {
          package_id: packageDetails._id,
          ...bookingData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Booking successful:", response.data);

      SweetAlert.fire({
        icon: "success",
        title: "Booking successful",
        text: "Your package has been booked successfully.",
      });
    } catch (error) {
      if (error.response) {
        SweetAlert.fire({
          icon: "error",
          title: "Booking failed",
          text: error.response.data.message,
        });
        // console.error("Booking failed:", error.response.data.message);
      } else {
        SweetAlert.fire({
          icon: "error",
          title: "Booking failed",
          text: error.message,
        });
        // console.error("Error booking package:", error.message);
      }
    }

    setShowModal(false);
    setSpecialNote("");
  };

  return (
    <>
      {/* ---- Main Package Details ---- */}
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
            <h2 className="text-3xl font-bold text-gray-800">
              {packageDetails.tour_name}
            </h2>

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
                <p className="text-sm text-gray-500">
                  {packageDetails.guide_email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs bg-sky-100 text-sky-700 rounded-full">
                Duration: {packageDetails.duration}
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
              <span className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">
                Bookings: {packageDetails.bookingCount}
              </span>
            </div>

            <div className="text-2xl font-bold text-sky-600">
              ${packageDetails.price}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Package Details
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {packageDetails.package_details}
              </p>
            </div>

            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:shadow-lg transition-all"
            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ---- Modal ---- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Your Booking
            </h2>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Tour Package
              </label>
              <input
                type="text"
                value={packageDetails.tour_name}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="text"
                value={`$${packageDetails.price}`}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Buyer Name
              </label>
              <input
                type="text"
                value={user?.displayName || "Guest"}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Buyer Email
              </label>
              <input
                type="email"
                value={user?.email || "No Email"}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Booking Date
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Special Note (Optional)
              </label>
              <textarea
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Any special requests?"
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 shadow"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
