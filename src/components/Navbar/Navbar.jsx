import React, { useState, useEffect, useContext } from "react";
import { Plane, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeSwitcher from "../Switcher/ThemeSwitcher";
import useUserRole from "../../hooks/UserRole";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, LogoutUser } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  // console.log("User Role:", role);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    LogoutUser();
    localStorage.removeItem("token");
    navigate("/login");
  };

  // dashboard route based on role
  const dashboardRoute = () => {
    if (roleLoading || !role) return "/";
    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "customer":
        return "/client-dashboard";
      default:
        return "/client-dashboard";
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Animated gradient strip */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#0072ff] to-[#00c6ff] animate-gradient-x" />

      <nav className={`mx-auto max-w-7xl px-3 ${scrolled ? "mt-2" : "mt-3"}`}>
        <div
          className={`relative flex items-center justify-between gap-3 rounded-3xl px-5 py-3 transition-all backdrop-blur-lg ${
            scrolled
              ? "bg-slate-900/80 ring-1 ring-white/10 shadow-lg"
              : "bg-blue-600 shadow-xl"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="grid place-items-center w-10 h-10 rounded-2xl bg-white/10 ring-1 ring-white/30 hover:shadow-[0_0_10px_#00c6ff] transition">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <div className="text-lg font-extrabold tracking-wide leading-none">Tripora</div>
              <div className="text-[10px] uppercase opacity-90 tracking-wider">Travel Management</div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 text-white font-semibold">
            <NavLink to="/" className="hover:text-[#00c6ff] transition">Home</NavLink>
            <NavLink to="/all_packages" className="hover:text-[#00c6ff] transition">All Packages</NavLink>
            <NavLink to="/about_us" className="hover:text-[#00c6ff] transition">About Us</NavLink>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            {!user ? (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold hover:bg-[#00c6ff] hover:text-white transition text-sm"
              >
                Login
              </NavLink>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <NavLink
                  to={dashboardRoute()}
                  className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition text-sm"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl ring-1 ring-white/25 text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0072ff] via-[#00c6ff] to-[#facc15]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className="relative h-full px-4 py-4 flex flex-col">
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center gap-2">
                <div className="grid place-items-center w-10 h-10 rounded-2xl bg-white/10 ring-1 ring-white/30">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-lg font-extrabold tracking-wide leading-none">Tripora</div>
                  <div className="text-[10px] uppercase opacity-90">Travel Management</div>
                </div>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl ring-1 ring-white/25 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-white/95">
              <NavLink to="/" className="block py-2 px-3 rounded-xl bg-white/10">Home</NavLink>
              <NavLink to="/all_packages" className="block py-2 px-3 rounded-xl bg-white/10">All Packages</NavLink>
              {user && <NavLink to="/my_bookings" className="block py-2 px-3 rounded-xl bg-white/10">My Bookings</NavLink>}
              <NavLink to="/about_us" className="block py-2 px-3 rounded-xl bg-white/10">About Us</NavLink>
            </div>

            <div className="mt-auto grid gap-3">
              {!user ? (
                <NavLink
                  to="/login"
                  className="w-full text-center py-2 rounded-xl bg-white text-slate-900 font-semibold text-base"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-white font-semibold">Hello, {user.displayName || "User"}</span>
                  </div>
                  <NavLink
                    to={dashboardRoute()}
                    className="w-full text-center py-2 rounded-xl bg-white text-slate-900 font-semibold text-base"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 rounded-xl ring-1 ring-white/40 text-white text-base"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
