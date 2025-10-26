import React, { useState, useEffect } from 'react'; 
import {
    ResponsiveContainer, BarChart, Bar,
    XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import {useApi} from "../../hooks/UseApi"; 
import useAuth from '../../hooks/UseAuth';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi'; 

const BookingsChart = () => {
    // --- State ---
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { get } = useApi(); 
    const {loading, user} = useAuth();

    // --- Data Fetching ---
    useEffect(() => {
        if (loading) return; 
        const fetchChartData = async () => {
            setIsLoading(true);
            setError(null);
            try {

                const res = await get("/admin-bookings-chart");

                if (res?.success && Array.isArray(res.data)) {
                    setChartData(res.data);
                } else {
                    throw new Error(res?.message || "Failed to fetch chart data.");
                }
            } catch (err) {
                console.error("Error fetching chart data:", err);
                setError(err.message || "Could not load chart data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [loading, user?.email]); 

    // --- Render Logic ---


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <FiLoader className="animate-spin text-blue-600 text-3xl" />
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-[300px] text-red-600">
                <FiAlertTriangle className="text-3xl mb-2" />
                <p className="font-semibold">Could not load chart</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }


    if (!chartData || chartData.length === 0) {
        return (
             <div className="flex justify-center items-center h-[300px] text-gray-500">
                 <p>No booking data available for this period.</p>
             </div>
        );
    }



    return (

        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
 
                <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis
                        dataKey="name" 
                        stroke="#9CA3AF"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }} 
                        contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            borderColor: '#E5E7EB',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                        labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                    />
                    <Bar
                        dataKey="bookings" 
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BookingsChart;