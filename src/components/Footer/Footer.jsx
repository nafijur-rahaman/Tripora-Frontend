import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600
 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">TravelMate</h2>
          <p className="text-sm opacity-90">
            Your trusted partner in exploring the world. Discover new places and
            make unforgettable memories with our expert travel management
            services.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Packages", "About Us", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all hover:after:w-full"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            {["FAQs", "Privacy Policy", "Terms & Conditions"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all hover:after:w-full"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter + Social */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="flex mb-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded-l-lg text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-r-lg hover:bg-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="text-sm text-green-200">Thanks for subscribing!</p>
          )}

          {/* Social Icons */}
          <div className="flex space-x-4 text-lg mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                className="hover:text-yellow-300 transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center text-sm mt-8 border-t border-white/30 pt-4"
      >
        © {new Date().getFullYear()} TravelMate. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
