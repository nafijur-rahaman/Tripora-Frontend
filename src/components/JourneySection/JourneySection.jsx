import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    name: "Dhaka to Cox’s Bazar Tour",
    guide: "John Doe",
    guideImage: "https://randomuser.me/api/portraits/men/1.jpg",
    duration: "3 Days, 2 Nights",
    departure: "Sept 15, 2025",
    price: "$350",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
    name: "Sundarban Adventure Trip",
    guide: "Jane Smith",
    guideImage: "https://randomuser.me/api/portraits/women/2.jpg",
    duration: "5 Days, 4 Nights",
    departure: "Oct 2, 2025",
    price: "$600",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    name: "Bandarban Hill Tour",
    guide: "Arafat Khan",
    guideImage: "https://randomuser.me/api/portraits/men/3.jpg",
    duration: "4 Days, 3 Nights",
    departure: "Oct 20, 2025",
    price: "$450",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1526779259212-756e5cbb6d1f?auto=format&fit=crop&w=800&q=80",
    name: "Saint Martin Island Trip",
    guide: "Moyna Akter",
    guideImage: "https://randomuser.me/api/portraits/women/4.jpg",
    duration: "3 Days, 2 Nights",
    departure: "Nov 1, 2025",
    price: "$400",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80",
    name: "Sylhet Tea Garden Tour",
    guide: "Nafijur Rahman",
    guideImage: "https://randomuser.me/api/portraits/men/5.jpg",
    duration: "2 Days, 1 Night",
    departure: "Nov 10, 2025",
    price: "$300",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    name: "Kuakata Sea Beach Tour",
    guide: "Sara Rahman",
    guideImage: "https://randomuser.me/api/portraits/women/6.jpg",
    duration: "3 Days, 2 Nights",
    departure: "Dec 5, 2025",
    price: "$380",
  },
];

export default function JourneySection() {
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
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img src={pkg.image} alt={pkg.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.name}</h3>
                <div className="flex items-center mb-2">
                  <img src={pkg.guideImage} alt={pkg.guideName} className="w-8 h-8 rounded-full mr-2" />
                  <span className="text-gray-600 text-sm">{pkg.guideName}</span>
                </div>
                <p className="text-gray-500 text-sm mb-1">Duration: {pkg.duration}</p>
                <p className="text-gray-500 text-sm mb-3">Departure: {pkg.departure}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-sky-500">{pkg.price}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
