import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaMapMarkedAlt, FaHeadset } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <section className="py-30 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              About TriPora
            </h2>
            <p className="text-gray-600 mb-6">
              At TriPora, we believe that every journey should be unforgettable. Our mission is to provide exceptional travel experiences, whether it's discovering new destinations, connecting with local guides, or creating memories that last a lifetime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <FaGlobe className="text-sky-500 text-3xl mb-2" />
                <span className="font-semibold text-gray-700">Worldwide Travel</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <FaMapMarkedAlt className="text-purple-500 text-3xl mb-2" />
                <span className="font-semibold text-gray-700">Custom Packages</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <FaHeadset className="text-pink-500 text-3xl mb-2" />
                <span className="font-semibold text-gray-700">24/7 Support</span>
              </motion.div>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
              Learn More
            </button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/images/about-1.jpg"
              alt="About TriPora"
              className="rounded-3xl shadow-xl w-full h-120 object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
