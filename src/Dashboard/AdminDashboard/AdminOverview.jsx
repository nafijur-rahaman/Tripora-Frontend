import {
  FiDollarSign,
  FiBox,
  FiUsers,
  FiCreditCard,
  FiPlusCircle,
  FiList,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router";
import RecentBookingsTable from "../../components/Dashboard/RecentBookingsTable";

import BookingsChart from "../../components/Dashboard/BookingsChart";

const statsData = [
  {
    title: "Total Revenue",
    value: "$48,250",
    icon: <FiDollarSign className="w-6 h-6" />,
    change: "+12.5%",
    changeType: "positive",
  },
  {
    title: "Total Bookings",
    value: "312",
    icon: <FiCreditCard className="w-6 h-6" />,
    change: "+5.2%",
    changeType: "positive",
  },
  {
    title: "Total Packages",
    value: "42",
    icon: <FiBox className="w-6 h-6" />,
    change: "2 new",
    changeType: "neutral",
  },
  {
    title: "Total Users",
    value: "1,204",
    icon: <FiUsers className="w-6 h-6" />,
    change: "+1.8%",
    changeType: "positive",
  },
];

const AdminOverview = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Premium Card: Softer shadow, rounded-2xl */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Monthly Bookings
          </h3>
          <BookingsChart /> {/* (Assumes this component exists) */}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="space-y-4">
            <QuickActionButton
              icon={<FiPlusCircle className="w-5 h-5" />}
              to="/admin/add-package"
            >
              Add New Package
            </QuickActionButton>
            <QuickActionButton
              icon={<FiList className="w-5 h-5" />}
              to="/admin/manage-packages"
            >
              Manage Packages
            </QuickActionButton>
            <QuickActionButton
              icon={<FiUserCheck className="w-5 h-5" />}
              to="/admin/manage-users"
            >
              Manage Users
            </QuickActionButton>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Recent Bookings
        </h3>
        <RecentBookingsTable /> {/* (Assumes this component exists) */}
      </div>
    </>
  );
};

const QuickActionButton = ({ icon, children, to }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 w-full p-4 bg-gray-50 
                   rounded-lg border border-gray-200
                   text-gray-700 font-semibold
                   hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600
                   transition-all duration-200"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const StatCard = ({ title, value, icon, change, changeType }) => {
  const changeColor =
    changeType === "positive" ? "text-green-500" : "text-gray-500";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">{icon}</div>
      </div>
      {change && (
        <p className={`text-sm font-medium mt-2 ${changeColor}`}>{change}</p>
      )}
    </div>
  );
};

export default AdminOverview;
