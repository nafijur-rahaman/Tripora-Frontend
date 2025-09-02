import { createBrowserRouter } from "react-router";
import Home from "../page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import AllPackages from "../page/AllPackage/AllPackages";
import PackageDetails from "../page/PackageDetails/PackageDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>
      },
      {
        path:"/login",
        element: <Login></Login>
      },{
        path: "/register",
        element: <Register></Register>
      },{
        path: "/all_packages",
        element: <AllPackages></AllPackages>
      },{
        path: "/package_details/:_id",
        element: <PackageDetails></PackageDetails>,
        loader: ({params})=>fetch(`http://localhost:3000/api/get_package/${params._id}`)
        
      }
    ]
  },
]);