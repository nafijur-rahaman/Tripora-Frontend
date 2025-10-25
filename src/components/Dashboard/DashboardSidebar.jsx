import React from 'react';
import { NavLink } from 'react-router';
import {
  FiHome, FiBox, FiList, FiUsers, FiCreditCard,
  FiUser, FiLogOut, FiClipboard, FiHeart
} from 'react-icons/fi';

const adminLinks = [
    { icon: <FiHome />, name: 'Overview', href: '/admin-dashboard' },
    { icon: <FiUser />, name: 'Profile', href: '/admin-dashboard/profile' },
    { icon: <FiBox />, name: 'Add Package', href: '/admin-dashboard/add-package' },
    { icon: <FiList />, name: 'Manage Packages', href: '/admin-dashboard/manage-packages' },
    { icon: <FiUsers />, name: 'Manage Users', href: '/admin-dashboard/manage-users' },
    { icon: <FiClipboard />, name: 'All Bookings', href: '/admin-dashboard/all-bookings' },
    { icon: <FiCreditCard />, name: 'Payments History', href: '/admin-dashboard/payments-history' },
];


const customerLinks = [
    { icon: <FiHome />, name: 'Dashboard', href: '/client-dashboard' },
    { icon: <FiList />, name: 'My Bookings', href: '/client-dashboard/my-bookings' },
    { icon: <FiHeart />, name: 'My Wishlist', href: '/client-dashboard/wishlist' },
    { icon: <FiUser />, name: 'My Profile', href: '/client-dashboard/profile' },
];



const DashboardSidebar = ({ userRole }) => {
  const links = userRole === 'admin' ? adminLinks : customerLinks;

  const activeClass = "bg-blue-50 text-blue-700 font-semibold";
  const inactiveClass = "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900";

  return (
    <div
      className="
        fixed top-0 left-0 
        h-screen w-67.5
        flex flex-col
        bg-white border-r border-gray-200
        shadow-sm
        overflow-y-auto
      "
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-start px-8">
        <a href="/" className="text-3xl font-extrabold text-gray-900">
          Tripora
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3.5 rounded-lg
               transition-all duration-200
               ${isActive ? activeClass : inactiveClass}`
            }
          >
            {React.cloneElement(link.icon, { className: 'w-5 h-5 flex-shrink-0' })}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-100">
        <a
          href="/logout"
          className={`flex items-center space-x-3 px-4 py-3.5 rounded-lg
                      transition-all duration-200 ${inactiveClass}`}
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Log Out</span>
        </a>
      </div>
    </div>
  );
};

export default DashboardSidebar;
