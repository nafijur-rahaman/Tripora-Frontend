import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";



const teamMembers = [
  { name: "John Doe", role: "Tour Guide", image: "/images/team1.jpg" },
  { name: "Jane Smith", role: "Travel Planner", image: "/images/team2.jpg" },
  { name: "Michael Lee", role: "Tour Guide", image: "/images/team3.jpg" },
  {
    name: "Sara Wilson",
    role: "Travel Consultant",
    image: "/images/team4.jpg",
  },
];

export default function MeetTheTeam() {
  return (
    <section className="py-20 bg-gray-50" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Amazing Staff
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden text-center p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-500 mb-3">{member.role}</p>
              <div className="flex justify-center gap-3 text-gray-500">
                <a href="#" className="hover:text-blue-500 transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  <FaInstagram />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
