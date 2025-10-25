import React from 'react';
import { Link } from 'react-router';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';

const CustomerBookingCard = ({ booking, onCancel }) => {
    const isUpcoming = booking.status === 'Upcoming';

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
                
                {/* Image */}
                <div className="md:col-span-1">
                    <img 
                        src={booking.image} 
                        alt={booking.package}
                        className="w-full h-48 md:h-full object-cover" 
                    />
                </div>
                
                {/* Content */}
                <div className="md:col-span-2 p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{booking.package}</h3>
                    
                    {/* Details */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <FiMapPin className="w-4 h-4 flex-shrink-0" />
                            <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <FiCalendar className="w-4 h-4 flex-shrink-0" />
                            <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <FiClock className="w-4 h-4 flex-shrink-0" />
                            <span>{booking.duration}</span>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            // You'll need to create this route
                            to={`/package/${booking.id}`} 
                            className="px-6 py-3 bg-blue-600 text-white text-center font-semibold 
                                       rounded-lg shadow-lg hover:bg-blue-700
                                       transition-colors duration-300"
                        >
                            View Package Details
                        </Link>
                        {isUpcoming && (
                            <button
                                onClick={() => onCancel(booking)}
                                className="px-6 py-3 bg-white text-red-600 text-center font-semibold
                                           rounded-lg border border-red-200 
                                           hover:bg-red-50 transition-colors duration-300"
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerBookingCard;