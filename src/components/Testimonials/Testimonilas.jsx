import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'Emily Johnson',
    image: '/images/traveler1.jpg',
    rating: 5,
    review: 'TravelX made our trip unforgettable! The guides were amazing and every detail was perfect.',
  },
  {
    name: 'David Smith',
    image: '/images/traveler2.jpg',
    rating: 4,
    review: 'A wonderful experience with excellent customer service. Highly recommended!',
  },
  {
    name: 'Sophia Lee',
    image: '/images/traveler3.jpg',
    rating: 5,
    review: 'The best travel experience I have ever had. Professional and friendly guides!',
  },
  // Add more testimonials as needed
];

export default function TestimonialsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          What Our Travelers Say
        </h2>

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.name}</h3>
                  <div className="flex justify-center mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">"{t.review}"</p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
