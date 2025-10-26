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

        <section className="px-10 py-20">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default CustomerLayout;
