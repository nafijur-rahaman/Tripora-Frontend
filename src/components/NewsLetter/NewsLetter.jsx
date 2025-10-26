// src/components/NewsletterCta.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Newsletter = () => {
    return (
        <section className="py-24 bg-white"> 
            {/* Using a light background like bg-gray-50 or bg-blue-50 also works well */}
            <div className="container mx-auto px-6">
                <motion.div 
                    className="bg-white shadow-2xl rounded-3xl lg:flex overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    {/* 1. Image Side */}
                    <div className="flex-1 hidden lg:block">
                        <img 
                            src="/images/newsletterImg.jpg" 
                            alt="Traveler with a map"
                            className="w-full h-full object-cover" 
                        />
                    </div>

                    {/* 2. Content & Form Side */}
                    <div className="flex-1 p-10 md:p-16">
                        <span className="text-blue-600 font-semibold uppercase tracking-wider">
                            Stay Inspired
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-5">
                            Get Exclusive Deals & Travel Tips
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Sign up for our newsletter and be the first to know about 
                            exclusive deals, new destinations, and expert travel tips.
                        </p>
                        
                        <form 
                            className="w-full"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor="cta-email" className="sr-only">Email Address</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    id="cta-email"
                                    placeholder="Your email address"
                                    className="flex-1 px-5 py-3.5 rounded-xl border-2 border-gray-200 
                                               text-gray-800 focus:outline-none focus:border-blue-500
                                               focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                                />
                                <motion.button
                                    type="submit"
                                    className="px-7 py-3.5 bg-blue-600 text-white font-bold rounded-xl 
                                               shadow-lg hover:bg-blue-700 transition-colors duration-300
                                               flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiSend />
                                    <span>Sign Up</span>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;