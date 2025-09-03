import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from '../../Context/ThemeContext';

const images = [
  "/images/hotel-resto-2.jpg",
  "/images/image_5.jpg",
  "/images/image_4.jpg",
  "/images/destination-11.jpg",
  "/images/destination-12.jpg",
  "/images/image_1.jpg",
  "/images/image_3.jpg",
  "/images/image_2.jpg",
];



export default function TourShowcase() {
   const { theme } = useContext(ThemeContext);
   const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
   const headingText = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';
  return (

<div>
<h2 className={`text-4xl font-extrabold ${sectionBg} ${headingText} text-center py-20`}>Memories of a lifetime</h2>
       <div className={`relative w-full min-h-screen flex justify-center items-center ${sectionBg} overflow-hidden`}>


    

      {images.map((src, index) => {
        const angle = (index / images.length) * 360; // distribute images in a circle
        const radius = 200; // circle radius

        return (
          <motion.img
            key={index}
            src={src}
            alt={`image-${index}`}
            className="absolute rounded-xl shadow-2xl cursor-pointer border-4 border-white"
            style={{ width: "300px", height: "300px", objectFit: "cover" }} // <-- set fixed size
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              x: radius * Math.cos((angle * Math.PI) / 180),
              y: radius * Math.sin((angle * Math.PI) / 180),
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            whileHover={{
              scale: 1.3,
              rotate: 0,
              zIndex: 10,
            }}
          />
        );
      })}
    </div>
</div>
  );
}
