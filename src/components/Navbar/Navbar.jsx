import React, { useState, useEffect, use } from "react";
import {
  Plane,
  Menu,
  X,
  ChevronDown,
  LogOut,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { DropLink } from "../DropLink/DropLink";





export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {user} = use(AuthContext);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 opacity-90" />

      <nav className={`mx-auto max-w-7xl px-3 ${scrolled ? "mt-2" : "mt-3"}`}>
        <div
          className={`relative flex items-center justify-between gap-3 rounded-3xl px-4 py-3 transition-all backdrop-blur-lg ${
            scrolled
              ? "bg-slate-900/80 ring-1 ring-white/15 shadow-lg"
              : "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 shadow-xl"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="grid place-items-center w-10 h-10 rounded-2xl bg-white/10 ring-1 ring-white/30">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <div className="text-lg font-extrabold tracking-wide leading-none">
                Tripora
              </div>
              <div className="text-[10px] uppercase opacity-90">
                Travel Management
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 text-white">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/all_packages"className="hover:underline">
              All Packages
            </NavLink>
            {user && (
              <a href="#" className="hover:underline">
                My Bookings
              </a>
            )}
            <a href="#" className="hover:underline">
              About Us
            </a>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-2">
            {!user ? (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold hover:opacity-90 transition text-sm"
              >
                Login
              </NavLink>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 ring-1 ring-white/30 text-white hover:bg-white/30 transition"
                >
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/80  ring-white/15  ring-1  backdrop-blur-lg shadow-lg text-white p-2">

                  
                    <DropLink
                      title="Add Package"
                      icon={PlusCircle}
                      onClick={() => alert("Add Package clicked")}
                    />
                    <DropLink
                      title="Manage My Packages"
                      icon={LayoutDashboard}
                      onClick={() => alert("Manage My Packages clicked")}
                    />
                    <DropLink
                      title="Logout"
                      icon={LogOut}
                      onClick={handleLogout}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Full-Screen Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-fuchsia-500 to-amber-400" />
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className="relative h-full px-4 py-4 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center gap-2">
                <div className="grid place-items-center w-10 h-10 rounded-2xl bg-white/10 ring-1 ring-white/30">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-lg font-extrabold tracking-wide leading-none">
                    Tripora
                  </div>
                  <div className="text-[10px] uppercase opacity-90">
                    Travel Management
                  </div>
                </div>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl ring-1 ring-white/25 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="mt-6 space-y-4 text-white/95">
              <NavLink to="/" className="block py-2 px-3 rounded-xl bg-white/10">
                Home
              </NavLink>
              <NavLink to="/all_packages" className="block py-2 px-3 rounded-xl bg-white/10">
                All Packages
              </NavLink>
              {user && (
                <a href="#" className="block py-2 px-3 rounded-xl bg-white/10">
                  My Bookings
                </a>
              )}
              <a href="#" className="block py-2 px-3 rounded-xl bg-white/10">
                About Us
              </a>
            </div>

            {/* Auth Buttons */}
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
                  <a
                    href="#"
                    className="w-full text-center py-2 rounded-xl bg-white text-slate-900 font-semibold text-base"
                  >
                    Add Package
                  </a>
                  <a
                    href="#"
                    className="w-full text-center py-2 rounded-xl bg-white text-slate-900 font-semibold text-base"
                  >
                    Manage My Packages
                  </a>
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
