import { createBrowserRouter } from "react-router";
import Home from "../page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import AllPackages from "../page/AllPackage/AllPackages";
import PackageDetails from "../page/PackageDetails/PackageDetails";
import ManageMyPackages from "../page/ManageMyPackages/ManageMyPackages";
import AboutUs from "../page/AboutUs/AboutUs";
import MyBooking from "../page/MyBooking/MyBooking";
import Page404 from "../page/Page404/Page404";
import PrivateRoute from "../Context/PrivateRoute";
import Loading from "../components/Loader/Loader";
// import DashboardLayout from "../Dashboard/AdminDashboard/DashboardLayout";
// import AdminOverview from "../Dashboard/AdminDashboard/AdminOverview";
// import AddPackage from "../Dashboard/AdminDashboard/AddPackage";
import AdminLayout from "../Layout/AdminLayout";
import AdminOverview from "../Dashboard/AdminDashboard/AdminOverview";
import AddPackage from "../Dashboard/AdminDashboard/AddPackage";

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
        path: "/package_details/:_id",
        element: (
          <PrivateRoute>
            <PackageDetails></PackageDetails>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");

          return fetch(
            `https://tripora-server.vercel.app/api/get_package/${params._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/my_packages",
        element: (
          <PrivateRoute>
            <ManageMyPackages></ManageMyPackages>
          </PrivateRoute>
        ),
      },
      {
        path: "/about_us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/my_bookings",
        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
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
  }
  ],
}

]);
