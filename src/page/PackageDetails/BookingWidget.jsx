// src/components/BookingWidget.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiUsers,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import useAuth from "../../hooks/UseAuth";
import { useApi } from "../../hooks/UseApi";

// --- Styling for CardElement ---
const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const BookingWidget = ({ price, packageId, packageName, customerEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { post, get } = useApi();

  // --- State Management ---
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTravelers, setSelectedTravelers] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  // --- Check if Package is Already Booked ---

  useEffect(() => {
    if (!packageId || !(user?.email || customerEmail)) return;

    const checkBookingStatus = async () => {
      try {
        const response = await get(
          `/get-booking-status?packageId=${packageId}&email=${
            user?.email || customerEmail
          }`
        );
        setAlreadyBooked(response?.status || false);
      } catch (err) {
        console.error("Error checking booking status:", err);
      }
    };

    checkBookingStatus();
  }, [packageId, user?.email, customerEmail]);

//   console.log("Already Booked:", alreadyBooked);

  // --- Handle Initial Payment Initiation ---
  const handleInitiatePayment = async () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    setError(null);
    setProcessing(true);

    try {
      const data = await post("/create-payment", {
        packageId,
        packageName,
        amount: price,
        customerEmail: user?.email || customerEmail,
      });

      if (data?.error) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
    } catch (err) {
      console.error("Payment initiation error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  // --- Handle Actual Payment Submission ---
  const handleSubmitPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
        receipt_email: customerEmail,
      });

    if (paymentError) {
      console.error("[stripe error]", paymentError);
      setError(paymentError.message || "Payment failed. Please try again.");
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
    //   console.log("[PaymentIntent]", paymentIntent);
  
      setProcessing(false);
      setShowPaymentForm(false);

      const bookingData = {
        packageId,
        packageName,
        customerEmail: user?.email || customerEmail,
        date: selectedDate,
        travelers: selectedTravelers,
        paymentIntentId: paymentIntent.id,
        status: "confirmed",
      };

      // Save transaction

      const bookingRes = await post("/book_package/", bookingData);

      if (bookingRes?.success) {
        const transactionData = {
          bookingId: bookingRes?.data?.bookingId || null,
          paymentIntentId: paymentIntent.id,
          packageId,
          amount: paymentIntent.amount,
          email: user?.email || customerEmail,
        };

        const transactionRes = await post("/save-transaction", transactionData);
        if (transactionRes?.success) {
              setSucceeded(true);
        }
      }
    } else {
      setError(
        `Payment status: ${paymentIntent.status}. Please contact support.`
      );
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
      {/* Price and Rating (same as before) */}
      <div className="flex justify-between items-center mb-4">
        {/* ... price and rating ... */}
      </div>

      {/* --- Initial Booking Info --- */}
      {!showPaymentForm && !succeeded && (
        <>
          <div className="space-y-4">
            {/* Date Picker */}
            <div className="relative">
              <label
                htmlFor="date"
                className="text-sm font-semibold text-gray-700"
              >
                Date
              </label>
              <FiCalendar className="absolute left-3 top-1/2 mt-2.5 -translate-y-1/2 text-gray-400" />
              <input
                type="date" // Use date type directly
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="Select your date"
                className="w-full pl-10 pr-4 py-3 mt-1 rounded-lg border border-gray-300 ..."
                required
              />
            </div>
            {/* Travelers */}
            <div className="relative">
              <label
                htmlFor="travelers"
                className="text-sm font-semibold text-gray-700"
              >
                Travelers
              </label>
              <FiUsers className="absolute left-3 top-1/2 mt-2.5 -translate-y-1/2 text-gray-400" />
              <select
                id="travelers"
                value={selectedTravelers}
                onChange={(e) => setSelectedTravelers(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-3 mt-1 rounded-lg border border-gray-300 ..."
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                {/* ... other options ... */}
              </select>
            </div>
          </div>
          {/* Initiate Payment Button */}
          {alreadyBooked ? (
            <div className="w-full mt-6 py-4 bg-yellow-100 text-green-600 font-semibold text-center rounded-lg border border-yellow-300 shadow-sm">
              You’ve already booked this package
            </div>
          ) : (
            <motion.button
              onClick={handleInitiatePayment}
              className="w-full mt-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-3xl shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-300"
              whileHover={{ scale: processing ? 1 : 1.03 }}
              whileTap={{ scale: processing ? 1 : 0.98 }}
            >
              {processing ? (
                <FiLoader className="animate-spin inline mr-2" />
              ) : (
                "Book Now"
              )}
            </motion.button>
          )}
        </>
      )}

      {/* --- Stripe Payment Form --- */}
      {showPaymentForm && !succeeded && (
        <form onSubmit={handleSubmitPayment}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Enter Payment Details
            </h3>
            {/* Stripe Card Element */}
            <div className="p-3 border border-gray-300 rounded-lg">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
          {/* Pay Button */}
          <motion.button
            type="submit"
            disabled={!stripe || !elements || processing || succeeded}
            className="w-full mt-6 py-4 bg-green-600 text-white font-bold text-lg rounded-3xl shadow-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-300"
            whileHover={{ scale: !stripe || processing ? 1 : 1.03 }}
            whileTap={{ scale: !stripe || processing ? 1 : 0.98 }}
          >
            {processing ? (
              <FiLoader className="animate-spin inline mr-2" />
            ) : (
              `Pay $${price}`
            )}
          </motion.button>
        </form>
      )}

      {/* --- Payment Status Messages --- */}
      {error && (
        <div
          role="alert"
          className="text-red-600 text-sm font-medium mt-4 text-center"
        >
          <FiAlertTriangle className="inline mr-1" /> {error}
        </div>
      )}
      {succeeded && (
        <div className="text-green-600 text-center font-semibold mt-4">
          <FiCheckCircle className="inline mr-1 text-2xl" /> Payment Successful!
          Your booking is confirmed.
        </div>
      )}

    </div>
  );
};

export default BookingWidget;
