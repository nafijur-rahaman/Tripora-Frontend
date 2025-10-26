import React, { useState, useMemo, useEffect } from 'react';
import {
    FiSearch, FiAlertTriangle, FiRefreshCcw, FiExternalLink,
    FiCheckCircle, FiXCircle, FiLoader
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from "../../components/Pagination/Pagination"; 
import { useApi } from "../../hooks/UseApi"; 
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'; 
const filterTabs = ['All', 'Succeeded', 'Refunded', 'Failed'];

const PaymentsPage = () => {
    // --- State ---
    const [allPayments, setAllPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentToActOn, setPaymentToActOn] = useState(null);

    const { get } = useApi();
    const paymentsPerPage = 6;

    // --- Data Fetching ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await get("/get-transactions");
                if (res?.success && Array.isArray(res.data)) {
                    setAllPayments(res.data);
                } else {
                    throw new Error(res?.message || "Failed to fetch transactions.");
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError(err.message || "Could not load transactions.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []); 

    // --- Filtering & Sorting ---
    const filteredPayments = useMemo(() => {
        return allPayments.filter(payment => {

            let matchesFilter = true;
            if (activeFilter !== "All") {
                const filterStatus = activeFilter.toLowerCase();
                matchesFilter = payment.status?.toLowerCase() === filterStatus;
            }


            const sq = searchQuery.toLowerCase();
            let matchesSearch = true;
            if (sq) {
                matchesSearch =
                    payment.paymentIntentId?.toLowerCase().includes(sq) ||
                    payment.email?.toLowerCase().includes(sq) ||
                    payment.bookingId?.toLowerCase().includes(sq) ||
                    payment.packageId?.toLowerCase().includes(sq);
            }
            return matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter, allPayments]);


    const sortedPayments = useMemo(() => {
        return [...filteredPayments].sort((a, b) => b.created - a.created);
    }, [filteredPayments]);


    const currentPayments = useMemo(() => {
        const start = (currentPage - 1) * paymentsPerPage;
        const end = start + paymentsPerPage;
        return sortedPayments.slice(start, end);
    }, [currentPage, sortedPayments]);

    const totalPages = Math.ceil(sortedPayments.length / paymentsPerPage);


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
        console.log(`Refunding payment: ${paymentToActOn.paymentIntentId}`);
        //later implement
        closeModal();
    };


    if (isLoading) {
         return (
             <div className="flex justify-center items-center h-64">
                 <FiLoader className="animate-spin text-blue-600 text-4xl" />
                 <span className="ml-4 text-lg font-semibold text-gray-700">Loading payments...</span>
             </div>
         );
    }
    if (error) {
         return (
             <div className="text-center py-16 text-red-600">
                 <FiAlertTriangle className="mx-auto text-4xl mb-4" />
                 <h3 className="text-2xl font-bold">Could Not Load Payments</h3>
                 <p className="mt-2">{error}</p>
             </div>
         );
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Payments & Transactions
            </h1>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="bg-white p-1 rounded-lg shadow-md border border-gray-100">
                    {filterTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveFilter(tab);
                                setCurrentPage(1);
                            }}
                            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${
                                activeFilter === tab
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
                        placeholder="Search ID, Email, Booking..."
                        value={searchQuery}
                        onChange={(e) => {
                             setSearchQuery(e.target.value);
                             setCurrentPage(1);
                        }}
                        className="w-full md:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">Date</th>
                                <th className="py-4 px-6 font-medium">Payment ID</th>
                                <th className="py-4 px-6 font-medium">Customer Email</th>
                                <th className="py-4 px-6 font-medium">Booking / Package ID</th>
                                <th className="py-4 px-6 font-medium">Amount</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                                <th className="py-4 px-6 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPayments.length > 0 ? (
                                currentPayments.map((payment) => (
                                    <PaymentRow key={payment._id} payment={payment} onRefund={openRefundModal} />
                                ))
                            ) : (
                                 <tr>
                                     <td colSpan="7" className="text-center py-16 text-gray-500">
                                         No transactions match your criteria.
                                     </td>
                                </tr>
                            )}
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

            {/* Refund Modal */}
            {paymentToActOn && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmRefund}
                    title="Issue Refund"
                    message={`Are you sure you want to refund ${paymentToActOn.email} for $${(paymentToActOn.amount / 100).toFixed(2)}? This will process a refund via Stripe for Payment ID ${paymentToActOn.paymentIntentId}.`}
                    confirmText="Confirm Refund"
                    confirmClass="bg-red-600 hover:bg-red-700"
                    icon={<FiAlertTriangle className="w-6 h-6 text-red-600" />}
                />
            )}
        </>
    );
};

export default PaymentsPage;

// --- Sub-Component for Payment Row ---
const PaymentRow = ({ payment, onRefund }) => {

    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'succeeded':
                return { text: 'Succeeded', chip: 'bg-green-100 text-green-700', icon: <FiCheckCircle className="w-4 h-4 mr-1.5"/> };
            case 'refunded':
                return { text: 'Refunded', chip: 'bg-gray-100 text-gray-700', icon: <FiRefreshCcw className="w-4 h-4 mr-1.5"/> };
            case 'failed':
                 return { text: 'Failed', chip: 'bg-red-100 text-red-700', icon: <FiXCircle className="w-4 h-4 mr-1.5"/> };
            default: // Handle unknown or pending statuses generally
                return { text: status || 'Unknown', chip: 'bg-yellow-100 text-yellow-700', icon: <FiLoader className="w-4 h-4 mr-1.5 animate-spin"/> };
        }
    };

    const { text: statusText, chip, icon } = getStatusInfo(payment.status);

    const formattedDate = payment.created
        ? new Date(payment.created * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'N/A';

    const formattedAmount = payment.amount
        ? (payment.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : 'N/A';


    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-4 px-6 text-gray-700 text-sm">{formattedDate}</td>
            <td className="py-4 px-6">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 group"
                    title={payment.paymentIntentId || 'No Payment ID'}
                >
                    <span className="font-mono text-sm text-gray-800 group-hover:text-blue-600">
                        {payment.paymentIntentId ? `${payment.paymentIntentId.substring(0, 10)}...` : 'N/A'}
                    </span>
                    {payment.paymentIntentId && <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />}
                </a>
            </td>
            <td className="py-4 px-6">
                <span className="font-semibold text-gray-900">{payment.email}</span>
            </td>
            <td className="py-4 px-6">
                 <span className="font-semibold text-gray-800" title={`Package ID: ${payment.packageId}`}>Booking: {payment.bookingId || 'N/A'}</span>
                 <span className="block text-xs text-gray-500">Package ID: {payment.packageId ? `${payment.packageId.substring(0, 8)}...` : 'N/A'}</span>
            </td>
            <td className="py-4 px-6 text-gray-800 font-semibold">{formattedAmount}</td>
            <td className="py-4 px-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${chip}`}>
                    {icon}
                    {statusText}
                </span>
            </td>
            <td className="py-4 px-6">
                <div className="flex justify-center space-x-2">
                    {payment.status?.toLowerCase() === 'succeeded' && (
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