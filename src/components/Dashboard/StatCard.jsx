import React from 'react';

const StatCard = ({ title, value, icon, change, changeType }) => {
    

    const changeColor = changeType === 'positive' 
        ? 'text-green-500' 
        : changeType === 'negative' 
            ? 'text-red-500' 
            : 'text-gray-500';

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-start">
                {/* Title and Value */}
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                {/* Icon */}
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    {icon}
                </div>
            </div>
            {/* Change Percentage */}
            {change && (
                <p className={`text-sm font-medium mt-2 ${changeColor}`}>
                    {change}
                </p>
            )}
        </div>
    );
};

export default StatCard;