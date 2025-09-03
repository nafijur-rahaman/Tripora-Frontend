import React, { useContext } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ThemeContext } from '../../Context/ThemeContext';
import { testimonials } from './testimonial';


export default function TestimonialsCarousel() {
  const { theme } = useContext(ThemeContext);

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

  // Dark mode classes
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const headingText = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardText = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const cardDesc = theme === 'dark' ? 'text-gray-300' : 'text-gray-500';
  const cardShadow = theme === 'dark' ? 'shadow-gray-700' : 'shadow-xl';

  return (
    <section className={`py-20 ${sectionBg}`} id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl font-extrabold text-center mb-12 ${headingText}`}>
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
                <div className={`rounded-3xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-2 ${cardBg} ${cardShadow}`}>
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-white"
                  />
                  <h3 className={`text-xl font-semibold mb-2 ${cardText}`}>{t.name}</h3>
                  <div className="flex justify-center mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className={`text-sm ${cardDesc}`}>"{t.review}"</p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
