import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { FiEdit, FiTrash2, FiPlus, FiAlertTriangle } from 'react-icons/fi';
import Pagination from "../../components/Pagination/Pagination"
import { useApi } from '../../hooks/UseApi';
import { useEffect } from 'react';

const ManagePackages = () => {

    const [allPackages, setAllPackages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const packagesPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState(null);
    const { get, del} = useApi();

    // --- Fetch Packages ---
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await get("/get-all-packages");
                if (res?.success) {
                    setAllPackages(res.data);
                }
            } catch (err) {
                console.error("Error fetching packages:", err);
            }
        };
        fetchPackages();
    }, []);

    // console.log(allPackages[13]);

    // --- Pagination Logic ---
    const totalPages = Math.ceil(allPackages.length / packagesPerPage);



    const currentPackages = useMemo(() => {
        const start = (currentPage - 1) * packagesPerPage;
        const end = start + packagesPerPage;
        return allPackages.slice(start, end);
    }, [allPackages, currentPage, packagesPerPage]);




    const openDeleteModal = (pkg) => {
        setPackageToDelete(pkg);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setPackageToDelete(null);
    };

    const handleConfirmDelete = async() => {
        const res = await del(`/delete-package/${packageToDelete._id}`);

        if (res?.success) {
            // Remove the deleted package from the state
            setAllPackages((prevPackages) =>
                prevPackages.filter((pkg) => pkg._id !== packageToDelete._id)
            );
        }

        closeDeleteModal();
    };


    return (
        <>
            {/* ---  Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Manage Packages
                </h1>
                <Link
                    to="/admin-dashboard/add-package"
                    className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white
                               font-semibold rounded-lg shadow-lg hover:bg-blue-700
                               transition-colors duration-300"
                >
                    <FiPlus className="w-5 h-5" />
                    <span>Add New Package</span>
                </Link>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                {/* Responsive Table Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                        {/* Table Header */}
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-4 px-6 font-medium">Package Title</th>
                                <th className="py-4 px-6 font-medium">Location</th>
                                <th className="py-4 px-6 font-medium">Price</th>
                                <th className="py-4 px-6 font-medium">Duration</th>
                                <th className="py-4 px-6 font-medium text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {currentPackages.map((pkg) => (
                                <tr key={pkg._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-6">
                                        <span className="font-semibold text-gray-900">{pkg?.title
                                        }</span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-700">{pkg?.location}</td>
                                    <td className="py-4 px-6 text-gray-800 font-medium">${pkg?.price?.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-gray-700">{pkg?.duration}</td>
                                    <td className="py-4 px-6">
                                        {/* Action Buttons */}
                                        <div className="flex justify-center space-x-2">
                                            <Link
                                                to={`/admin-dashboard/edit-package/${pkg._id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                                title="Edit"
                                            >
                                                <FiEdit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(pkg)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ---Pagination --- */}
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

            {/* ---Delete Modal*/}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Delete Package"
                message={`Are you sure you want to permanently delete "${packageToDelete?.title}"? This action cannot be undone.`}
            />
        </>
    );
};

export default ManagePackages;

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
                    >
                        <div className="flex items-start space-x-4">
                            {/* Warning Icon */}
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center
                                          rounded-full bg-red-100">
                                <FiAlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            {/* Text */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                                <p className="text-gray-600 mt-2">{message}</p>
                            </div>
                        </div>
                        {/* Buttons */}
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
                                className="px-5 py-2.5 font-semibold text-white bg-red-600
                                           rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};