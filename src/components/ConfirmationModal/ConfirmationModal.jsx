// src/components/dashboard/ConfirmationModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default ConfirmationModal;