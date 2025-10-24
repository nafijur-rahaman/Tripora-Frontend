import React, { useState, useMemo } from 'react';
import { FiSlash, FiTrash2, FiSearch, FiAlertTriangle } from 'react-icons/fi'; 
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from "../../components/Pagination/Pagination"
import { useApi } from '../../hooks/UseApi';
import { useEffect } from 'react';

// {
//     "_id": "68f885b0b54ea36eac8d9023",
//     "email": "nafiii@example.com",
//     "fullName": "Tanjid",
//     "photo": "https://btok.mrshakil.com/media/profiles/1000051513.jpg",
//     "role": "admin",
//     "createdAt": "2025-10-22T07:20:16.201Z",
//     "status": "active"
// }

const ManageUsers = () => {
    // --- State ---
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToActOn, setUserToActOn] = useState(null);
    const [modalAction, setModalAction] = useState(null); 
    const {get,put,del} = useApi();

    const usersPerPage = 6;

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await get('/get-all-users');
            // console.log(res.data);
            if (res?.success) {
                setAllUsers(res.data);
            }
        };
        fetchUsers();
    }, []);

    // console.log(allUsers);

    // --- Memoized Filtering & Pagination
    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => 
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allUsers, searchQuery]);

    const currentUsers = useMemo(() => {
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        return filteredUsers.slice(start, end);
    }, [currentPage, filteredUsers]);
    
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // --- Modal Handlers ---
    const openModal = (user, action) => {
        // console.log(user, action);
        setUserToActOn(user);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUserToActOn(null);
        setModalAction(null);
    };

    const handleConfirmAction = () => {
        if (!userToActOn || !modalAction) return;
                const performAction = async () => {
            if (modalAction === 'delete') {
                const res = await del(`/delete-user/${userToActOn._id}`);
                if (res?.success) {
                    // Remove the deleted user from the state
                    setAllUsers((prevUsers) =>
                        prevUsers.filter((user) => user._id !== userToActOn._id)
                    );
                }
            } else if (modalAction === 'ban') {
                const res = await put(`/update-user-status/${userToActOn._id}`);
                if (res?.success) {
                    setAllUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === userToActOn._id 
                                ? { ...user, status: 'banned' } 
                                : user
                        )
                    );
                }
            }

        
        closeModal();
    };
        performAction();
    }

    // --- Modal Content ---
    let modalContent = { title: '', message: '', confirmText: '', confirmClass: '' };
    if (userToActOn) {
        switch (modalAction) {
            case 'delete':
                modalContent = {
                    title: 'Delete User',
                    message: `Are you sure you want to permanently delete ${userToActOn.fullName}? This is irreversible.`,
                    confirmText: 'Delete',
                    confirmClass: 'bg-red-600 hover:bg-red-700'
                };
                break;
            case 'ban':
                modalContent = {
                    title: 'Ban User',
                    message: `Are you sure you want to ban ${userToActOn.fullName}? They will lose access to their account.`,
                    confirmText: 'Ban User',
                    confirmClass: 'bg-red-600 hover:bg-red-700'
                };
                break;
            default:
                break;
        }
    }

    return (
        <>
            {/* ---  Page Header & Search --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Manage Users
                </h1>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* ---  Main Content Card  --- */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        {/* Table Header */}
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">User</th>
                                <th className="py-4 px-6 font-medium">Role</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                                <th className="py-4 px-6 font-medium">Joined Date</th>
                                <th className="py-4 px-6 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody>
                            {currentUsers.map((user) => (
                                <UserRow key={user._id} user={user} openModal={openModal} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination --- */}
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

            {/* --- Confirmation Modal --- */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmAction}
                {...modalContent}
            />
        </>
    );
};

export default ManageUsers;

// --- Sub-Component for User Row ---
const UserRow = ({ user, openModal }) => {
    
    const getRoleChip = (role) => {
        return role === 'Admin' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-gray-100 text-gray-700';
    };

    const getStatusChip = (status) => {
        return status === 'active' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700';
    };

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            {/* User Info */}
            <td className="py-3 px-6">
                <div className="flex items-center space-x-3">
                    <img 
                        src={user?.photo} 
                        alt={user?.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <span className="font-semibold text-gray-900">{user?.fullName}</span>
                        <span className="block text-sm text-gray-600">{user?.email}</span>
                    </div>
                </div>
            </td>
            {/* Role Chip */}
            <td className="py-3 px-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleChip(user?.role)}`}>
                    {user?.role}
                </span>
            </td>
            {/* Status Chip */}
            <td className="py-3 px-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusChip(user?.status)}`}>
                    {user?.status}
                </span>
            </td>
            {/* Joined Date */}
            <td className="py-3 px-6 text-gray-700"><span>{new Date(user?.createdAt).toLocaleDateString()}</span>

</td>
            {/* Action Buttons (Updated) */}
            <td className="py-3 px-6">
                <div className="flex justify-center space-x-2">
                    {/* 'Make Admin' button removed */}

                    {user?.status === 'active' && user?.role !== 'admin' && (
                        <button
                            onClick={() => openModal(user, 'ban')}
                            className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors"
                            title="Ban User"
                        >
                            <FiSlash className="w-5 h-5" />
                        </button>
                    )}
                    {user?.role !== 'admin' && (
                        <button
                            onClick={() => openModal(user, 'delete')}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                            title="Delete User"
                        >
                            <FiTrash2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

// --- Confirmation Modal Component ---
const ConfirmationModal = ({ 
    isOpen, onClose, onConfirm, 
    title, message, confirmText, confirmClass 
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
                                          rounded-full ${confirmClass === 'bg-red-600 hover:bg-red-700' ? 'bg-red-100' : 'bg-blue-100'}`}>
                                <FiAlertTriangle className={`w-6 h-6 ${confirmClass === 'bg-red-600 hover:bg-red-700' ? 'text-red-600' : 'text-blue-600'}`} />
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