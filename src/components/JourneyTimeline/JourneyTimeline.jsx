import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPlane, FaSuitcase, FaMapMarkedAlt, FaCamera } from 'react-icons/fa';

const journeySteps = [
  { title: 'Book Your Trip', description: 'Choose your destination and book your package easily online.', icon: <FaPlane /> },
  { title: 'Prepare for Travel', description: 'Get ready with our travel checklist and tips for a smooth journey.', icon: <FaSuitcase /> },
  { title: 'Explore Destinations', description: 'Follow your guide and enjoy the best spots and hidden gems.', icon: <FaMapMarkedAlt /> },
  { title: 'Capture Memories', description: 'Take amazing photos and share your unforgettable moments.', icon: <FaCamera /> },
];

// Sparkles positions
const sparkles = [
  { top: "5%", left: "40%" },
  { top: "25%", left: "60%" },
  { top: "50%", left: "35%" },
  { top: "75%", left: "55%" },
];

export default function JourneyTimeline() {
  const { scrollYProgress } = useScroll({
    target: typeof window !== 'undefined' ? document.getElementById('journey') : undefined,
    offset: ["start end", "end start"],
  });

  // Plane animation
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const planeX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["45%", "55%", "40%", "60%", "50%"]);
  const planeRotate = useTransform(scrollYProgress, [0, 0.5, 1], ["-10deg", "15deg", "-5deg"]);

  // Glow trail height
  const trailHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Step arrival animation based on scroll
  const stepOpacity = (index) => useTransform(scrollYProgress, [index / journeySteps.length, (index + 1) / journeySteps.length], [0.5, 1]);
  const stepScale = (index) => useTransform(scrollYProgress, [index / journeySteps.length, (index + 1) / journeySteps.length], [0.9, 1.1]);

  const sparkleAnimation = {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-100 via-blue-50 to-white" id="journey">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Your Journey, Step by Step
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 via-purple-500 to-pink-500 rounded-full" />

          {/* Glow trail behind plane */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-b from-yellow-300 to-pink-400 opacity-40 rounded-full"
            style={{ height: trailHeight, top: 0 }}
          />

          {/* Plane with zig-zag and tilt */}
          <motion.div
            className="absolute w-10 h-10 text-white bg-sky-500 rounded-full flex items-center justify-center shadow-lg"
            style={{ top: planeY, left: planeX, rotate: planeRotate }}
          >
            <FaPlane />
          </motion.div>

          {/* Clouds */}
          <motion.div
            className="absolute w-20 h-8 bg-white rounded-full opacity-60 top-10 left-1/4"
            animate={{ x: ["0px", "20px", "0px"] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.div
            className="absolute w-24 h-10 bg-white rounded-full opacity-50 top-40 right-1/4"
            animate={{ x: ["0px", "-20px", "0px"] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />

          {/* Sparkles */}
          {sparkles.map((sparkle, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-lg"
              style={{ top: sparkle.top, left: sparkle.left }}
              animate={sparkleAnimation}
              transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.5 }}
            />
          ))}

          {/* Journey Steps */}
          <div className="flex flex-col items-center gap-20">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center relative z-10"
                style={{ opacity: stepOpacity(index), scale: stepScale(index) }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 text-white text-2xl shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
