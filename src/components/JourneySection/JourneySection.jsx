import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, NavLink } from 'react-router';

export default function JourneySection() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get_limited_packages/');
        setPackages(response.data.data); 
        // console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);


  return (
    <section className="py-20 bg-gray-50" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Your Journey Starts Here
        </motion.h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img src={pkg.image} alt={pkg.tour_name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.tour_name}</h3>
                <div className="flex items-center mb-2">
                  <img src={pkg.guide_photo} alt={pkg.guide_name} className="w-8 h-8 rounded-full mr-2" />
                  <span className="text-gray-600 text-sm">{pkg.guide_name}</span>
                </div>
                <p className="text-gray-500 text-sm mb-1">Duration: {pkg.duration}</p>
                <p className="text-gray-500 text-sm mb-3">Departure: {pkg.departure_date}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-sky-500">${pkg.price}</span>
                  <NavLink to= {`/package_details/${pkg._id}`} className="px-4 py-2 bg-gradient-to-r bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
                    View Details
                  </NavLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Packages Button */}
        <div className="text-center mt-12">
          <Link
            to="/all_packages"
            className="px-6 py-3 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg  transition">
            All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
