import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import useUserRole from '../hooks/UserRole';


const CustomerLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { role, roleLoading } = useUserRole();
  const userRole = role || 'customer';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-100 shadow-sm">
        <DashboardSidebar userRole={userRole} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-64 h-full bg-white z-50 lg:hidden shadow-md"
            >
              <DashboardSidebar userRole={userRole} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between lg:justify-end h-20 bg-white border-b border-gray-100 px-6">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMobileOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3 text-gray-800">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop"
              alt="Customer Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="font-semibold text-sm">Customer User</span>
              <span className="block text-xs text-gray-500">View Profile</span>
            </div>
          </div>
        </header>

        {/* Outlet (Page Content) */}
        <section className="px-8 py-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default CustomerLayout;
