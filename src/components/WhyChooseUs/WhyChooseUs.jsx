
import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiGlobe, FiHeadphones, FiThumbsUp } from 'react-icons/fi';


const features = [
    {
        icon: <FiGlobe className="w-6 h-6 text-blue-600" />,
        title: 'Expert-Curated Trips',
        description: 'Every itinerary is hand-picked and vetted by our team of travel experts.'
    },
    {
        icon: <FiHeadphones className="w-6 h-6 text-blue-600" />,
        title: '24/7 Support',
        description: 'Our dedicated support team is available around the clock to help you.'
    },
    {
        icon: <FiAward className="w-6 h-6 text-blue-600" />,
        title: 'Best Price Guarantee',
        description: 'We ensure you get the best value for your money, with no hidden fees.'
    },
    {
        icon: <FiThumbsUp className="w-6 h-6 text-blue-600" />,
        title: 'Seamless Booking',
        description: 'Enjoy a hassle-free booking experience from start to finish.'
    }
];


const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* 1. Image Column */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <img 
                           
                            src="/images/about.jpg" 
                            alt="Happy traveler" 
                            className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                        />
                    </motion.div>


                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.span 
                            className="text-blue-600 font-semibold uppercase tracking-wider"
                            variants={itemVariants}
                        >
                            Our Commitment
                        </motion.span>
                        <motion.h2 
                            className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-6"
                            variants={itemVariants}
                        >
                            Why Book With Tripora?
                        </motion.h2>
                        <motion.p 
                            className="text-lg md:text-xl text-gray-600 mb-12"
                            variants={itemVariants}
                        >
                            We go the extra mile to make your travel dreams a reality, 
                            providing exceptional service, value, and peace of mind.
                        </motion.p>

                        {/* Features List */}
                        <motion.div 
                            className="space-y-8"
                            variants={contentVariants}
                        >
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex items-start"
                                    variants={itemVariants}
                                >
                                    <div className="flex-shrink-0 p-4 bg-blue-50 rounded-xl">
                                        {feature.icon}
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mt-2">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;