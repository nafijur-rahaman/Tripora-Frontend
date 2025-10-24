import React, { useState, useMemo } from 'react';
import { 
    FiSearch, FiAlertTriangle, FiRefreshCcw, FiExternalLink, 
    FiDollarSign, FiTrendingUp, FiTrendingDown 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from "../../components/Pagination/Pagination"


const allPayments = [
    { id: 'pi_3Pj...aX1', bookingId: 'B1234', customerName: 'Sarah Chen', amount: 2499, status: 'Paid', date: '2025-10-21' },
    { id: 'pi_3Pj...bY2', bookingId: 'B1235', customerName: 'Michael B.', amount: 3500, status: 'Pending', date: '2025-10-20' },
    { id: 'pi_3Pj...cZ3', bookingId: 'B1236', customerName: 'Emily Rodriguez', amount: 1900, status: 'Paid', date: '2025-10-20' },
    { id: 'pi_3Pj...dA4', bookingId: 'B1237', customerName: 'David Kim', amount: 4500, status: 'Refunded', date: '2025-10-19' },
    { id: 'pi_3Pj...eB5', bookingId: 'B1238', customerName: 'Alex Johnson', amount: 3200, status: 'Paid', date: '2025-10-18' },
    { id: 'pi_3Pj...fC6', bookingId: 'B1239', customerName: 'Sarah Chen', amount: 3500, status: 'Failed', date: '2025-11-05' },
];

const filterTabs = ['All', 'Paid', 'Pending', 'Refunded', 'Failed'];

const PaymentsPage = () => {
    // --- State ---
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentToActOn, setPaymentToActOn] = useState(null);

    const paymentsPerPage = 6;

    // --- Memoized Filtering & Pagination ---
    const filteredPayments = useMemo(() => {
        return allPayments.filter(payment => {
            const matchesFilter = activeFilter === 'All' || payment.status === activeFilter;
            const sq = searchQuery.toLowerCase();
            const matchesSearch = 
                payment.id.toLowerCase().includes(sq) ||
                payment.bookingId.toLowerCase().includes(sq) ||
                payment.customerName.toLowerCase().includes(sq);
            return matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter]);

    const currentPayments = useMemo(() => {
        const start = (currentPage - 1) * paymentsPerPage;
        const end = start + paymentsPerPage;
        return filteredPayments.slice(start, end);
    }, [currentPage, filteredPayments]);
    
    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    // --- Modal Handlers ---
    const openRefundModal = (payment) => {
        setPaymentToActOn(payment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPaymentToActOn(null);
    };

    const handleConfirmRefund = () => {
        if (!paymentToActOn) return;
        
        console.log(`Refunding payment: ${paymentToActOn.id}`);

        
        closeModal();
    };

    // --- Dummy Stat Card Data ---
    // In a real app, this would come from an API endpoint
    const totalRevenue = allPayments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
    const totalRefunds = allPayments.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + p.amount, 0);

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Payments & Transactions
            </h1>

            {/* --- 1. Financial Stat Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="Total Revenue" 
                    value={`$${totalRevenue.toLocaleString()}`} 
                    icon={<FiDollarSign className="w-6 h-6" />} 
                />
                <StatCard 
                    title="Total Refunds" 
                    value={`$${totalRefunds.toLocaleString()}`} 
                    icon={<FiTrendingDown className="w-6 h-6" />} 
                />
                <StatCard 
                    title="Net Volume" 
                    value={`$${(totalRevenue - totalRefunds).toLocaleString()}`} 
                    icon={<FiTrendingUp className="w-6 h-6" />} 
                />
            </div>

            {/* --- 2. Filter Bar --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="bg-white p-1 rounded-lg shadow-md border border-gray-100">
                    {filterTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors
                                ${activeFilter === tab 
                                    ? 'bg-blue-600 text-white shadow' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search by Payment ID, Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* --- 3. Main Table Container --- */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">Payment ID</th>
                                <th className="py-4 px-6 font-medium">Customer</th>
                                <th className="py-4 px-6 font-medium">Booking ID</th>
                                <th className="py-4 px-6 font-medium">Amount</th>
                                <th className="py-4 px-6 font-medium">Date</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                                <th className="py-4 px-6 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {currentPayments.map((payment) => (
                                <PaymentRow key={payment.id} payment={payment} onRefund={openRefundModal} />
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {totalPages > 1 && (
                    <div className="p-6 border-t border-gray-100">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {/* --- 4. Refund Modal --- */}
            {paymentToActOn && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmRefund}
                    title="Issue Refund"
                    message={`Are you sure you want to refund ${paymentToActOn.customerName} for $${paymentToActOn.amount}? This will process a refund via Stripe for Payment ID ${paymentToActOn.id}.`}
                    confirmText="Confirm Refund"
                    confirmClass="bg-red-600 hover:bg-red-700"
                    icon={<FiAlertTriangle className="w-6 h-6 text-red-600" />}
                />
            )}
        </>
    );
};

export default PaymentsPage;

// --- Payment Row ---
const PaymentRow = ({ payment, onRefund }) => {
    
    const getStatusChip = (status) => {
        switch (status) {
            case 'Paid':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Refunded':
                return 'bg-gray-100 text-gray-700';
            case 'Failed':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };


    const stripePaymentUrl = `https://dashboard.stripe.com/test/payments/${payment.id}`;

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            {/* Payment ID */}
            <td className="py-4 px-6">
                <a 
                    href={stripePaymentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 group"
                >
                    <span className="font-mono text-sm text-gray-800 group-hover:text-blue-600">
                        {payment.id.substring(0, 12)}...
                    </span>
                    <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>
            </td>
            {/* Customer */}
            <td className="py-4 px-6">
                <span className="font-semibold text-gray-900">{payment.customerName}</span>
            </td>
            {/* Booking ID */}
            <td className="py-4 px-6">
                <span className="font-mono text-sm text-gray-600">{payment.bookingId}</span>
            </td>
            {/* Amount */}
            <td className="py-4 px-6 text-gray-800 font-semibold">${payment.amount.toLocaleString()}</td>
            {/* Date */}
            <td className="py-4 px-6 text-gray-700">{payment.date}</td>
            {/* Status */}
            <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusChip(payment.status)}`}>
                    {payment.status}
                </span>
            </td>
            {/* Actions */}
            <td className="py-4 px-6">
                <div className="flex justify-center space-x-2">
                    {payment.status === 'Paid' && (
                        <button
                            onClick={() => onRefund(payment)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                            title="Issue Refund"
                        >
                            <FiRefreshCcw className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};


const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-600">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                {icon}
            </div>
        </div>
    </div>
);


const ConfirmationModal = ({ 
    isOpen, onClose, onConfirm, 
    title, message, confirmText, confirmClass, icon
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
                    >
                        <div className="flex items-start space-x-4">
                            <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center
                                          rounded-full ${confirmClass.includes('red') ? 'bg-red-100' : 'bg-green-100'}`}>
                                {icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                                <p className="text-gray-600 mt-2">{message}</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 font-semibold text-gray-700 bg-gray-100
                                           rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-5 py-2.5 font-semibold text-white rounded-lg transition-colors ${confirmClass}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};