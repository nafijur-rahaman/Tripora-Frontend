import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import FaqChatbot from "../components/FaqChatbot/FaqChatbot";
const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <FaqChatbot></FaqChatbot>
      <ScrollToTop/>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
