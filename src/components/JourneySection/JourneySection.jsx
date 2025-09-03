import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, NavLink } from 'react-router';
import { ThemeContext } from '../../Context/ThemeContext';

export default function JourneySection() {
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem('token');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          'https://tripora-server.vercel.app/api/get_limited_packages/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPackages(response.data.data);
      } catch (error) {
        // console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, [token]);

  // Theme-based classes
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const headingText = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardText = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const smallText = theme === 'dark' ? 'text-gray-300' : 'text-gray-500';
  const shadowColor = theme === 'dark' ? 'shadow-gray-700' : 'shadow-xl';
  const hoverShadow = theme === 'dark' ? 'hover:shadow-gray-600' : 'hover:shadow-2xl';
  const overlay = theme === 'dark' ? 'after:absolute after:inset-0 after:bg-black/40 after:rounded-3xl' : '';

  return (
    <section className={`py-20 ${sectionBg}`} id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className={`text-4xl font-extrabold ${headingText} text-center mb-12`}
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
              className={`relative rounded-3xl ${cardBg} ${shadowColor} overflow-hidden transform hover:-translate-y-2 transition duration-300 ${hoverShadow}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.tour_name}
                  className="w-full h-56 object-cover rounded-t-3xl"
                />
                {theme === 'dark' && (
                  <div className="absolute inset-0 bg-black/40 rounded-t-3xl"></div>
                )}
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-semibold ${cardText} mb-2`}>
                  {pkg.tour_name}
                </h3>
                <div className="flex items-center mb-2">
                  <img
                    src={pkg.guide_photo}
                    alt={pkg.guide_name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className={`text-sm ${smallText}`}>{pkg.guide_name}</span>
                </div>
                <p className={`text-sm ${smallText} mb-1`}>Duration: {pkg.duration}</p>
                <p className={`text-sm ${smallText} mb-3`}>Departure: {pkg.departure_date}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-sky-500">${pkg.price}</span>
                  <NavLink
                    to={`/package_details/${pkg._id}`}
                    className="px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
                  >
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
            className="px-6 py-3 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-teal-500 hover:via-cyan-600 hover:to-blue-700 transition"
          >
            All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
