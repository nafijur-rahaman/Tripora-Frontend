// src/components/TravelInspiration.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';


const posts = [
    {
        id: 1,
        image: '/images/place-1.jpg',
        category: 'Travel Guide',
        title: 'The Ultimate 10-Day Guide to the Swiss Alps',
        excerpt: 'From stunning peaks to serene lakes, discover the must-see spots in Switzerland.'
    },
    {
        id: 2,
        image: '/images/place-3.jpg',
        category: 'Culture',
        title: 'A Foodie\'s Journey Through Kyoto\'s Hidden Gems',
        excerpt: 'Explore the flavors of ancient Japan, from traditional tea houses to bustling markets.'
    },
    {
        id: 3,
        image: '/images/place-2.jpg',
        category: 'Tips',
        title: 'How to Pack Light for a 2-Week Beach Vacation',
        excerpt: 'Master the art of minimalist packing without sacrificing style or comfort.'
    }
];

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100,
        },
    },
};

const TravelInspiration = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div 
                    className="flex flex-col md:flex-row justify-between items-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Travel Inspiration
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                            Find tips, guides, and stories to fuel your next adventure.
                        </p>
                    </div>
                    <motion.a 
                        href="/blog"
                        className="flex-shrink-0 px-7 py-3.5 bg-blue-600 text-white font-bold rounded-lg 
                                   shadow-lg hover:bg-blue-700 transition-colors duration-300
                                   flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>View All Posts</span>
                        <FiArrowRight />
                    </motion.a>
                </motion.div>

                {/* Blog Post Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {posts.map((post) => (
                        <motion.div 
                            key={post.id} 
                            className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                            variants={cardVariants}
                        >
                            <div className="h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover 
                                               group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-blue-600 font-semibold text-sm uppercase">
                                    {post.category}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 my-2 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TravelInspiration;