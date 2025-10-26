import React, { useState, useEffect } from 'react'; 
import {
    FiDollarSign, FiBox, FiUsers, FiCreditCard,
    FiPlusCircle, FiList, FiUserCheck, FiLoader, FiAlertTriangle 
} from "react-icons/fi";
import { Link } from "react-router"; 
import BookingsChart from "../../components/Dashboard/BookingsChart";
import StatCard from "../../components/dashboard/StatCard"; 
import { useApi } from "../../hooks/UseApi"; 
import useAuth from "../../hooks/UseAuth";

const AdminOverview = () => {
    // --- State---
    const [statsData, setStatsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { get } = useApi();
    const {loading,user} = useAuth();

    // --- Data Fetching ---
    useEffect(() => {
        if(loading || !user?.email){
            return;
        }
        const fetchStats = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await get("/admin-stats");
                if (res?.success && Array.isArray(res.data)) {
                    setStatsData(res.data);
                } else {
                    throw new Error(res?.message || "Failed to fetch admin stats.");
                }
            } catch (err) {
                console.error("Error fetching admin stats:", err);
                setError(err.message || "Could not load stats.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [loading,user?.email]); 


    const getStatIcon = (title) => {
        switch (title?.toLowerCase()) {
            case 'total revenue':
                return <FiDollarSign className="w-6 h-6" />;
            case 'total bookings':
                return <FiCreditCard className="w-6 h-6" />;
            case 'total packages':
                return <FiBox className="w-6 h-6" />;
            case 'total users':
                return <FiUsers className="w-6 h-6" />;
            default:
                return <FiList className="w-6 h-6" />; 
        }
    };


    if (isLoading) {
         return (
             <div className="flex justify-center items-center h-64">
                 <FiLoader className="animate-spin text-blue-600 text-4xl" />
                 <span className="ml-4 text-lg font-semibold text-gray-700">Loading dashboard data...</span>
             </div>
         );
    }

    if (error) {
         return (
             <div className="text-center py-16 text-red-600">
                 <FiAlertTriangle className="mx-auto text-4xl mb-4" />
                 <h3 className="text-2xl font-bold">Could Not Load Stats</h3>
                 <p className="mt-2">{error}</p>
             </div>
         );
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={getStatIcon(stat.title)}
                        // 'change' and 'changeType' are removed as they are not in the API response
                    />
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Monthly Bookings
                    </h3>
                    <BookingsChart />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Quick Actions
                    </h3>
                    <div className="space-y-4">
                        <QuickActionButton
                            icon={<FiPlusCircle className="w-5 h-5" />}
                            to="/admin-dashboard/add-package"
                        >
                            Add New Package
                        </QuickActionButton>
                        <QuickActionButton
                            icon={<FiList className="w-5 h-5" />}
                            to="/admin-dashboard/manage-packages"
                        >
                            Manage Packages
                        </QuickActionButton>
                        <QuickActionButton
                            icon={<FiUserCheck className="w-5 h-5" />}
                            to="/admin-dashboard/manage-users"
                        >
                            Manage Users
                        </QuickActionButton>
                    </div>
                </div>
            </div>
        </>
    );
};



const QuickActionButton = ({ icon, children, to }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 w-full p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
  >
    {icon}
    <span>{children}</span>
  </Link>
);



export default AdminOverview;