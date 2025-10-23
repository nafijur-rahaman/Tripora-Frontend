import React from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, 
    XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';


const data = [
    { name: 'Jan', bookings: 30 },
    { name: 'Feb', bookings: 45 },
    { name: 'Mar', bookings: 50 },
    { name: 'Apr', bookings: 62 },
    { name: 'May', bookings: 70 },
    { name: 'Jun', bookings: 65 },
    { name: 'Jul', bookings: 80 },
    { name: 'Aug', bookings: 95 },
    { name: 'Sep', bookings: 85 },
    { name: 'Oct', bookings: 110 },
    { name: 'Nov', bookings: 120 },
    { name: 'Dec', bookings: 135 },
];

const BookingsChart = () => {
    return (

        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>

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