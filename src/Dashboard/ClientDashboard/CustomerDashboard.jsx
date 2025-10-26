import React from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiList, FiHeart, FiUser, FiMapPin, FiCalendar } from 'react-icons/fi';
import StatCard from '../../components/Dashboard/StatCard';

// --- Dummy Data for the Customer ---
const customerData = {
    name: 'Sarah Chen',
    upcomingTrip: {
        id: 'B1234',
        title: 'Overwater Bungalow Retreat',
        location: 'Bora Bora, French Polynesia',
        date: '2025-10-21',
        duration: '7 Days',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2575'
    },
    stats: [
        {
            title: 'Total Bookings',
            value: '3',
            icon: <FiList className="w-6 h-6" />,
        },
        {
            title: 'Wishlist Items',
            value: '8',
            icon: <FiHeart className="w-6 h-6" />,
        },
        {
            title: 'Profile',
            value: 'Complete',
            icon: <FiUser className="w-6 h-6" />,
        }
    ]
};

const CustomerDashboard = () => {
    const { name, upcomingTrip, stats } = customerData;

    return (
        <>
            {/* --- 1. Welcome Header --- */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {name}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Here's a summary of your trips and activity.
            </p>

            {/* --- 2. Upcoming Trip Card (Premium) --- */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Next Adventure</h2>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Image */}
                    <div className="md:col-span-1">
                        <img 
                            src={upcomingTrip.image} 
                            alt={upcomingTrip.title}
                            className="w-full h-48 md:h-full object-cover" 
                        />
                    </div>
                    {/* Content */}
                    <div className="md:col-span-2 p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{upcomingTrip.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                            <span className="flex items-center space-x-1.5">
                                <FiMapPin className="w-4 h-4" />
                                <span>{upcomingTrip.location}</span>
                            </span>
                            <span className="flex items-center space-x-1.5">
                                <FiCalendar className="w-4 h-4" />
                                <span>{upcomingTrip.date}</span>
                            </span>
                        </div>
                        <p className="text-gray-700 mb-6">
                            Your {upcomingTrip.duration} trip is confirmed. We can't wait to host you!
                        </p>
                        <Link
                            to={`/dashboard/my-bookings/${upcomingTrip.id}`}
                            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white
                                       font-semibold rounded-lg shadow-lg hover:bg-blue-700
                                       transition-colors duration-300"
                        >
                            <span>View Booking Details</span>
                            <FiArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- 3. Stat Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatCard 
                        key={index} 
                        title={stat.title} 
                        value={stat.value} 
                        icon={stat.icon} 
                    />
                ))}
            </div>

            {/* --- 4. Quick Links (Optional, but professional) --- */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuickLinkCard 
                    title="View All My Bookings" 
                    desc="Review your past and upcoming trips." 
                    href="/dashboard/my-bookings" 
                />
                <QuickLinkCard 
                    title="Manage Your Profile" 
                    desc="Update your personal info and password." 
                    href="/dashboard/profile" 
                />
            </div>
        </>
    );
};

// --- Quick Link Card Sub-component ---
const QuickLinkCard = ({ title, desc, href }) => (
    <Link 
        to={href}
        className="block p-6 bg-white rounded-2xl shadow-xl border border-gray-100
                   hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group"
    >
        <div className="flex justify-between items-center">
            <div>
                <h4 className="text-xl font-bold text-gray-900">{title}</h4>
                <p className="text-gray-600 mt-1">{desc}</p>
            </div>
            <FiArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
    </Link>
);


export default CustomerDashboard;