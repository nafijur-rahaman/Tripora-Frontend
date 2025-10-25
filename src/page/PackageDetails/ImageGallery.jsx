import React from 'react';
import { FiGrid } from 'react-icons/fi';

const ImageGallery = ({ images }) => {

    const [mainImage, ...otherImages] = images.slice(0, 5);

    return (
        <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">

            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-full">
                {/* Main Image */}
                <div className="col-span-2 row-span-2">
                    <img 
                        src={mainImage} 
                        alt="Main package view"
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                </div>
                {/* Other 4 Images */}
                {otherImages.map((img, index) => (
                    <div key={index} className="col-span-1 row-span-1">
                        <img 
                            src={img} 
                            alt={`Package view ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                    </div>
                ))}
            </div>

            {/* --- Single Image for Small screens --- */}
            <div className="md:hidden h-full">
                <img 
                    src={mainImage} 
                    alt="Main package view"
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* --- "Show All Photos" Button --- */}
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2
                               rounded-lg shadow-lg text-sm font-semibold
                               flex items-center space-x-2
                               hover:bg-gray-100 transition-colors">
                <FiGrid />
                <span>Show all photos</span>
            </button>
        </div>
    );
};

export default ImageGallery;