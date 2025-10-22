
import React from 'react';
import { motion } from 'framer-motion';
import HeroSearchForm from './HeroSearchForm'; 

// Animation 
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

const Hero = () => {
    return (
        <section className="relative h-screen bg-cover bg-center"
                 style={{ backgroundImage: "url('/images/bg_4.jpg')" }}>
            
            {/* New Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Content Container - Aligned Bottom-Left */}
            <motion.div 
                className="relative z-10 flex flex-col items-start justify-end h-full text-white 
                           pb-24 md:pb-32 px-6 md:px-12 lg:px-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {/* Upgraded Typography */}
                <motion.h1 
                    className="text-5xl md:text-7xl font-extrabold drop-shadow-lg leading-tight mb-4"
                    variants={itemVariants}
                >
                    Your Next Adventure Awaits
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl font-light max-w-2xl mb-10 drop-shadow-md"
                    variants={itemVariants}
                >
                    Discover amazing travel packages and book your dream vacation with ease.
                </motion.p>

                {/* New Search Form Integration */}
                <motion.div
                    className="w-full"
                    variants={itemVariants}
                >
                    <HeroSearchForm />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;