import React from 'react';
import { NavLink } from 'react-router'; 
import { 
    FiHome, FiBox, FiList, FiUsers, FiCreditCard, 
    FiUser, FiLogOut 
} from 'react-icons/fi';


const adminLinks = [
    { icon: <FiHome />, name: 'Overview', href: '/admin/dashboard' },
    { icon: <FiBox />, name: 'Add Package', href: '/admin/add-package' },
    { icon: <FiList />, name: 'Manage Packages', href: '/admin/manage-packages' },
    { icon: <FiUsers />, name: 'Manage Users', href: '/admin/manage-users' },
    { icon: <FiCreditCard />, name: 'All Bookings', href: '/admin/all-bookings' },
    { icon: <FiUser />, name: 'Profile', href: '/admin/profile' },
];

const customerLinks = [ ]; 

const DashboardSidebar = ({ userRole }) => {
    const links = userRole === 'admin' ? adminLinks : customerLinks;

    const activeClass = "bg-blue-50 text-blue-700 font-semibold";
    

    const inactiveClass = "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900";

    return (
        <div className="flex flex-col h-full">

            <div className="h-20 flex items-center justify-start px-8">
                <a href="/" className="text-3xl font-extrabold text-gray-900">
                    Tripora
                </a>
            </div>

            {/* Navigation Links with more padding */}
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

            {/* Logout Button */}
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