import { createBrowserRouter } from "react-router";
import Home from "../page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login/Login";


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
      }
    ]
  },
]);