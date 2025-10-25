import React, { useState, useMemo, useEffect } from 'react';
import { FiDollarSign, FiRefreshCcw, FiXCircle, FiLoader, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'; // Added FiCheckCircle
import Pagination from "../../components/Pagination/Pagination";
import useAuth from '../../hooks/UseAuth'; 
import { useApi } from '../../hooks/UseApi'; 

const PaymentHistory = () => {
    // --- State ---
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { user, loading: authLoading } = useAuth();
    const { get } = useApi();

    const paymentsPerPage = 5;

    // --- Data Fetching ---
    useEffect(() => {
        if (authLoading || !user?.email) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // --- Use the correct API endpoint ---
                const res = await get(`/get-user-transactions?email=${user.email}`);

                if (res.success && Array.isArray(res.data)) {
                    setPayments(res.data);
                } else {
                    throw new Error(res.message || "Failed to fetch payment history.");
                }
            } catch (err) {
                console.error("Error fetching payment history:", err);
                setError(err.message || "Could not load payment history.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, authLoading]);

    // --- Pagination Logic ---
    const sortedPayments = useMemo(() => {
        // Sort by 'created' timestamp descending (newest first)
        return [...payments].sort((a, b) => b.created - a.created);
    }, [payments]);

    const totalPages = Math.ceil(sortedPayments.length / paymentsPerPage);
    const currentPayments = useMemo(() => {
        const start = (currentPage - 1) * paymentsPerPage;
        const end = start + paymentsPerPage;
        return sortedPayments.slice(start, end);
    }, [currentPage, sortedPayments]);


    // --- Render Logic ---

    if (authLoading || isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin text-blue-600 text-4xl" />
                <span className="ml-4 text-lg font-semibold text-gray-700">Loading payment history...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 text-red-600">
                <FiAlertTriangle className="mx-auto text-4xl mb-4" />
                <h3 className="text-2xl font-bold">Could Not Load History</h3>
                <p className="mt-2">{error}</p>
            </div>
        );
    }

     if (!user) {
         return (
             <div className="text-center py-16">
                 <h3 className="text-2xl font-bold text-gray-800">Please Log In</h3>
                 <p className="text-gray-600 mt-2">Log in to view your payment history.</p>
             </div>
         );
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Payment History
            </h1>

            {/* Stat cards removed as data isn't available from this specific API call */}

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">Date</th>
                                <th className="py-4 px-6 font-medium">Payment ID</th>
                                <th className="py-4 px-6 font-medium">Booking / Package ID</th>
                                <th className="py-4 px-6 font-medium">Amount</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {currentPayments.length > 0 ? (
                                currentPayments.map((payment) => (
                                    <PaymentRow key={payment._id} payment={payment} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-16 text-gray-500">
                                        You have no payment history yet.
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
        </>
    );
};

export default PaymentHistory;

// --- Sub-Component for Payment Row (Updated for API data) ---
const PaymentRow = ({ payment }) => {
    
    // Map Stripe status to user-friendly text and style
    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'succeeded':
                return { text: 'Paid', chip: 'bg-green-100 text-green-700', icon: <FiCheckCircle className="w-4 h-4 mr-1.5" /> };
            case 'refunded': // Assuming your API might return this status
                return { text: 'Refunded', chip: 'bg-gray-100 text-gray-700', icon: <FiRefreshCcw className="w-4 h-4 mr-1.5" /> };
            case 'failed': // Assuming your API might return this status
                return { text: 'Failed', chip: 'bg-red-100 text-red-700', icon: <FiXCircle className="w-4 h-4 mr-1.5" /> };
            case 'pending': // Or requires_payment_method, processing etc.
            default:
                return { text: 'Pending', chip: 'bg-yellow-100 text-yellow-700', icon: <FiLoader className="w-4 h-4 mr-1.5 animate-spin" /> };
        }
    };

    const { text: statusText, chip, icon } = getStatusInfo(payment.status);
    
    // Convert Unix timestamp (seconds) to Date object, then format
    const formattedDate = payment.created 
        ? new Date(payment.created * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : 'N/A';

    // Convert amount from cents to dollars
    const formattedAmount = payment.amount 
        ? (payment.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : 'N/A';

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            {/* Date */}
            <td className="py-4 px-6 text-gray-700">{formattedDate}</td>
            
            {/* Payment ID */}
            <td className="py-4 px-6">
                <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded" title={payment.paymentIntentId}>
                    {payment.paymentIntentId ? `${payment.paymentIntentId.substring(0, 10)}...` : 'N/A'}
                </span>
            </td>
            
            {/* Booking / Package ID */}
            <td className="py-4 px-6">
                 {/* Displaying IDs as package name isn't available */}
                 <span className="font-semibold text-gray-800" title={`Package ID: ${payment.packageId}`}>Booking: {payment.bookingId || 'N/A'}</span>
                 <span className="block text-xs text-gray-500">Package ID: {payment.packageId ? `${payment.packageId.substring(0, 8)}...` : 'N/A'}</span>
            </td>
            
            {/* Amount */}
            <td className="py-4 px-6 text-gray-800 font-semibold">{formattedAmount}</td>
            
            {/* Status */}
            <td className="py-4 px-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${chip}`}>
                    {icon}
                    {statusText}
                </span>
            </td>
        </tr>
    );
};