import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const PackageCard = ({ pkg, variants }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/packages-details/${pkg._id}`);
    };
    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.03 }}
            onClick={handleCardClick}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
        >
 
            <img
                src={pkg.images[0]}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover 
                           transition-transform duration-500 ease-in-out
                           group-hover:scale-110"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>


            <div className="absolute top-0 right-0 p-4 z-20">
                <motion.button 
                    className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white
                               hover:bg-white/30 transition-colors"
                    whileTap={{ scale: 0.9 }}
                >
                    <FiHeart className="text-xl" />
                </motion.button>
            </div>
            
            <div className="absolute top-0 left-0 p-4 z-20">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white py-1.5 px-3 rounded-full">
                    <FiClock className="text-sm" />
                    <span className="text-sm font-medium">{pkg.duration}</span>
                </div>
            </div>

            {/* 4. Content - Aligned to Bottom */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{pkg.location}</h3>
                <p className="text-base text-white/90 mb-4">{pkg.title}</p>
                
                <div className="flex justify-between items-center border-t border-white/20 pt-4">
                    <div className="flex items-center space-x-1.5">
                        <FiStar className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-lg">{pkg.rating}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-white/80 block">From</span>
                        <span className="text-2xl font-extrabold">${pkg.price}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;