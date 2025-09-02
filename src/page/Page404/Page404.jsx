import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function Page404() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-r from-sky-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Floating Circles */}
      <motion.div
        className="absolute w-32 h-32 bg-sky-300 rounded-full top-10 left-10 opacity-50"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-purple-300 rounded-full bottom-20 right-16 opacity-50"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-pink-300 rounded-full top-1/2 left-1/3 opacity-40"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      <motion.h1
        className="text-9xl font-extrabold mt-20 text-gray-800 mb-6 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        404
      </motion.h1>
      
      <motion.p
        className="text-xl text-gray-700 mb-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Oops! Page Not Found.
      </motion.p>
      
      <motion.img
        src="/error.jpg"
        alt="Travel 404 Illustration"
        className="w-80 mb-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="z-10"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </motion.div>
    </section>
  );
}
