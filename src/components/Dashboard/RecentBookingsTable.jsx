import React from 'react';


const bookings = [
    {
        id: 'B1234',
        user: 'Sarah Chen',
        package: 'Overwater Bungalow Retreat',
        date: '2025-10-21',
        amount: '$2,499',
        status: 'Confirmed'
    },
    {
        id: 'B1235',
        user: 'Michael B.',
        package: 'Alpine Hiking Adventure',
        date: '2025-10-20',
        amount: '$3,500',
        status: 'Pending'
    },
    {
        id: 'B1236',
        user: 'Emily Rodriguez',
        package: 'Eternal City Discovery',
        date: '2025-10-20',
        amount: '$1,900',
        status: 'Confirmed'
    },
    {
        id: 'B1237',
        user: 'David Kim',
        package: 'Luxury Beach Villa',
        date: '2025-10-19',
        amount: '$4,500',
        status: 'Cancelled'
    },
    {
        id: 'B1238',
        user: 'Alex Johnson',
        package: 'Kyoto Cultural Tour',
        date: '2025-10-18',
        amount: '$3,200',
        status: 'Confirmed'
    },
];

const RecentBookingsTable = () => {
    
 
    const getStatusChip = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (

        <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
                {/* Table Header */}
                <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                        <th className="py-4 px-4 font-medium">Booking ID</th>
                        <th className="py-4 px-4 font-medium">User</th>
                        <th className="py-4 px-4 font-medium">Package</th>
                        <th className="py-4 px-4 font-medium">Amount</th>
                        <th className="py-4 px-4 font-medium">Status</th>
                    </tr>
                </thead>
                

                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-800 font-medium">{booking.id}</td>
                            <td className="py-4 px-4 text-gray-800">{booking.user}</td>
                            <td className="py-4 px-4 text-gray-600">{booking.package}</td>
                            <td className="py-4 px-4 text-gray-800 font-semibold">{booking.amount}</td>
                            <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusChip(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentBookingsTable;