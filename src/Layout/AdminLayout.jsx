import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

const AdminLayout = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const userRole = 'admin'; // Hardcoded for this example

    return (
        // Use a softer bg-gray-50 for a cleaner look
        <div className="flex min-h-screen bg-gray-50">
            
            {/* --- Desktop Sidebar --- */}
            {/* Wider sidebar for a more substantial, less-cramped feel */}
            <aside className="hidden lg:block w-72 bg-white shadow-sm flex-shrink-0 border-r border-gray-100">
                <DashboardSidebar userRole={userRole} />
            </aside>

            {/* --- Mobile Sidebar (Modal) --- */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 w-72 h-full bg-white z-50 lg:hidden"
                        >
                            <DashboardSidebar userRole={userRole} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* --- Main Content Area --- */}
            <main className="flex-1">
                {/* Top Bar with a subtle bottom border */}
                <header className="flex items-center justify-between lg:justify-end h-20 bg-white border-b border-gray-100 px-6 md:px-12">
                    <button 
                        className="lg:hidden text-gray-700"
                        onClick={() => setIsMobileOpen(true)}
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>
                    
                    <div className="flex items-center space-x-3 text-gray-800">
                        <img 
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop" 
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <span className="font-semibold text-sm">Admin User</span>
                            <span className="block text-xs text-gray-500">View Profile</span>
                        </div>
                    </div>
                </header>

                {/* --- Page Content Renders Here --- */}
                {/* More generous padding for a premium, breathable layout */}
                <div className="p-8 md:p-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;