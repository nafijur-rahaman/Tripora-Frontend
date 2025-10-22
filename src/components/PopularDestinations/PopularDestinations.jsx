
import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const destinations = [
    { id: 1, name: 'Paris, France', image: '/images/paris.jpg' },
    { id: 2, name: 'Maldives', image: '/images/maldives.jpg' },
    { id: 3, name: 'Rome, Italy', image: '/images/rome.jpg' },
    { id: 4, name: 'Bali, Indonesia', image: '/images/bali.jpg' },
    { id: 5, name: 'New York, USA', image: '/images/newyork.jpg' },
];


const NextArrow = ({ onClick }) => (
    <button 
        className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-10 
                   bg-white/80 backdrop-blur-sm shadow-lg rounded-full 
                   p-3 text-gray-800 hover:bg-white transition-all"
        onClick={onClick}
    >
        <FiChevronRight className="w-6 h-6" />
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button 
        className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-10
                   bg-white/80 backdrop-blur-sm shadow-lg rounded-full 
                   p-3 text-gray-800 hover:bg-white transition-all"
        onClick={onClick}
    >
        <FiChevronLeft className="w-6 h-6" />
    </button>
);


const DestinationCard = ({ item }) => (
    <motion.div 
        className="px-3" // Add padding between slides
        whileHover={{ y: -5 }} // Subtle lift effect
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                <h3 className="text-3xl font-bold">{item.name}</h3>
            </div>
        </div>
    </motion.div>
);

const PopularDestinations = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1280, // xl
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768, // md
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 640, // sm
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Popular Destinations
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Get inspired by these trending locations, loved by our travelers.
                    </p>
                </motion.div>

                {/* 5. The Slider */}
                <div className="px-4"> 
                    {/* Add horizontal padding to the container to avoid arrow clipping */}
                    <Slider {...settings}>
                        {destinations.map((item) => (
                            <DestinationCard key={item.id} item={item} />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;