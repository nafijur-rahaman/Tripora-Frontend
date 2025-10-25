import { createBrowserRouter } from "react-router";
import Home from "../page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import AllPackages from "../page/AllPackage/AllPackages";
import AboutUs from "../page/AboutUs/AboutUs";
import Page404 from "../page/Page404/Page404";
import PrivateRoute from "../Context/PrivateRoute";
import Loading from "../components/Loader/Loader";
import AdminLayout from "../Layout/AdminLayout";
import AdminOverview from "../Dashboard/AdminDashboard/AdminOverview";
import AddPackage from "../Dashboard/AdminDashboard/AddPackage";
import ManagePackages from "../Dashboard/AdminDashboard/ManagePackages";
import EditPackage from "../Dashboard/AdminDashboard/EditPackage";
import ManageUsers from "../Dashboard/AdminDashboard/ManageUsers";
import AllBookings from "../Dashboard/AdminDashboard/AllBookings";
import PaymentsPage from "../Dashboard/AdminDashboard/PaymentsPage";
import ProfilePage from "../Dashboard/AdminDashboard/ProfilePage";
import PackageDetailsPage from "../page/PackageDetails/PackageDetails";
import CustomerLayout from "../Layout/CustomerLayout";
import CustomerDashboard from "../Dashboard/ClientDashboard/CustomerDashboard";
import MyBookings from "../Dashboard/ClientDashboard/MyBookings";
import PaymentHistory from "../Dashboard/ClientDashboard/PaymentHistory";
import CustomerProfile from "../Dashboard/ClientDashboard/CustomerProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Page404></Page404>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all_packages",

        element: <AllPackages></AllPackages>,
      },
      {
        path: "package-details/:id",
        element: <PackageDetailsPage></PackageDetailsPage>
      },

      {
        path: "/about_us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "*",
        element: <Page404></Page404>,
      },
    ],
  },

{
  path: "/admin-dashboard",
  element: <AdminLayout />,
  children: [
  {
    index: true,
    element: <AdminOverview></AdminOverview>
  },{
    path: "add-package",
    element: <AddPackage></AddPackage>
  },{
    path: "manage-packages",
    element: <ManagePackages></ManagePackages>
  },{
    path: "edit-package/:id",
    element: <EditPackage></EditPackage>
  },{
    path: "manage-users",
    element: <ManageUsers></ManageUsers>
  },{
    path: "all-bookings",
    element: <AllBookings></AllBookings>
  },{
    path: "payments-history",
    element: <PaymentsPage></PaymentsPage>
  },{
    path: "profile",
    element: <ProfilePage></ProfilePage>
  }
  ],
},{
  path: "client-dashboard",
  element: <CustomerLayout></CustomerLayout>,
  children: [
    {
      index: true,
      element: <CustomerDashboard></CustomerDashboard>
    },{
      path: "my-bookings",
      element: <MyBookings></MyBookings>
    },{
      path: "payment-history",
      element: <PaymentHistory></PaymentHistory>
    },{
      path: "profile",
      element: <CustomerProfile></CustomerProfile>
    }
  ]
}

]);
