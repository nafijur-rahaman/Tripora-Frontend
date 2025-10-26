import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Correct import
import {
    FiArrowRight, FiList, FiHeart, FiUser, FiMapPin,
    FiCalendar, FiDollarSign, FiLoader, FiAlertTriangle 
} from 'react-icons/fi';
import StatCard from '../../components/Dashboard/StatCard';
import useAuth from '../../hooks/UseAuth'; 
import { useApi } from '../../hooks/UseApi'; 

const CustomerDashboard = () => {
    // --- State ---
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { get } = useApi();

    // --- Data Fetching ---
    useEffect(() => {
        if (authLoading || !user?.email) {
            setIsLoading(false); // Stop loading if no user
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await get(`/customer-dashboard/?email=${user.email}`);
                if (res?.success && res.data) {
                    setDashboardData(res.data);
                } else {
                    throw new Error(res?.message || "Failed to fetch dashboard data.");
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError(err.message || "Could not load dashboard data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, authLoading]);


    const getStatIcon = (title) => {
        switch (title?.toLowerCase()) {
            case 'total bookings':
                return <FiList className="w-6 h-6" />;
            case 'total payment':
                return <FiDollarSign className="w-6 h-6" />;
            case 'wishlist items': // Keep this case if you might add it later
                return <FiHeart className="w-6 h-6" />;
            case 'profile': // Keep this case if you might add it later
                 return <FiUser className="w-6 h-6" />;
            default:
                return <FiList className="w-6 h-6" />; // Default icon
        }
    };


    if (authLoading || isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin text-blue-600 text-4xl" />
                <span className="ml-4 text-lg font-semibold text-gray-700">Loading dashboard...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 text-red-600">
                <FiAlertTriangle className="mx-auto text-4xl mb-4" />
                <h3 className="text-2xl font-bold">Could Not Load Dashboard</h3>
                <p className="mt-2">{error}</p>
            </div>
        );
    }

    if (!user || !dashboardData) {
         return (
             <div className="text-center py-16">
                 <h3 className="text-2xl font-bold text-gray-800">Please Log In</h3>
                 <p className="text-gray-600 mt-2">Log in to view your dashboard.</p>
             </div>
         );
    }

    const { name, upcomingTrip, stats } = dashboardData;

    const displayName = user.displayName || name.split('@')[0] || 'User';

    return (
        <>
  
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
  
                Welcome back, {displayName}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Here's a summary of your trips and activity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats && stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={getStatIcon(stat.title)} // Assign icon dynamically
                    />
                ))}
                 {/* Optionally add a static Profile card if not in API stats */}
                 {/* <StatCard title="Profile" value="Manage" icon={<FiUser className="w-6 h-6"/>} /> */}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Next Adventure</h2>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                {upcomingTrip ? (
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Image */}
                        <div className="md:col-span-1">
                            <img
                                src={upcomingTrip.image || 'default-placeholder.jpg'} 
                                alt={upcomingTrip.title || 'Upcoming Trip'}
                                className="w-full h-48 md:h-full object-cover bg-gray-200" 
                            />
                        </div>
                        {/* Content */}
                        <div className="md:col-span-2 p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{upcomingTrip.title || 'Trip Details'}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 mb-4">
                                <span className="flex items-center space-x-1.5">
                                    <FiMapPin className="w-4 h-4" />
                                    <span>{upcomingTrip.location || 'Location TBD'}</span>
                                </span>
                                <span className="flex items-center space-x-1.5">
                                    <FiCalendar className="w-4 h-4" />
                
                                    <span>{upcomingTrip.date ? new Date(upcomingTrip.date).toLocaleDateString() : 'Date TBD'}</span>
                                </span>
                            </div>
                            <p className="text-gray-700 mb-6">
              
                                Your {upcomingTrip.duration || 'upcoming'} trip is confirmed. We can't wait to host you!
                            </p>
                            <Link

                                to={`/dashboard/my-bookings/${upcomingTrip.id || ''}`}
                                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                <span>View Booking Details</span>
                                <FiArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
      
                    <div className="p-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">No Upcoming Trips</h3>
                        <p className="text-gray-600 mt-2 mb-4">Ready for your next adventure?</p>
                        <Link
                            to="/all_packages" 
                            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            <span>Explore Packages</span>
                            <FiArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>


            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuickLinkCard
                    title="View All My Bookings"
                    desc="Review your past and upcoming trips."
                    href="/client-dashboard/my-bookings"
                />
                <QuickLinkCard
                    title="Manage Your Profile"
                    desc="Update your personal info and password."
                    href="/client-dashboard/profile"
                />
            </div>
        </>
    );
};



const QuickLinkCard = ({ title, desc, href }) => (
    <Link
        to={href}
        className="block p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group"
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