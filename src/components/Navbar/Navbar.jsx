import React, { useState, useEffect } from "react";
import {
  Plane,
  Map,
  Calendar,
  Percent,
  HelpCircle,
  Search,
  Menu,
  X,
  Globe,
  UserRound,
  ChevronDown,
} from "lucide-react";

// --- Helpers ---
const UsersIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
    {...props}
  >
    <path d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5S14.34 11 16 11zm-8 0c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.94 1.97 3.45V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const MobileGroup = ({ title, children }) => (
  <div>
    <div className="uppercase tracking-wide text-xs font-semibold text-white/80">{title}</div>
    <div className="mt-2 grid gap-2">{children}</div>
  </div>
);

const MobileLink = ({ label, href = "#" }) => (
  <a
    href={href}
    className="block w-full px-3 py-3 rounded-xl bg-white/10 ring-1 ring-white/20 hover:bg-white/15"
  >
    {label}
  </a>
);

const DropLink = ({ title, desc, icon: Icon, href = "#" }) => (
  <a
    href={href}
    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
  >
    <Icon className="w-5 h-5 mt-1" />
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm opacity-90 leading-snug">{desc}</div>
    </div>
  </a>
);

const NavItem = ({ label, icon: Icon, href = "#", children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl text-white/90 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span className="font-medium">{label}</span>
        {children && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {children && open && (
        <div
          className="absolute left-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20 backdrop-blur bg-white/20 text-white/90"
        >
          <div className="p-2 grid gap-1">{children}</div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top gradient bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 opacity-90" />

      {/* Navbar */}
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
              <div className="text-lg font-extrabold tracking-wide leading-none">Skylark</div>
              <div className="text-[10px] uppercase opacity-90">Travel Management</div>
            </div>
          </a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            <NavItem label="Destinations" icon={Map}>
              <DropLink title="Explore Regions" desc="Browse continents & countries" icon={Globe} />
              <DropLink title="Top Cities" desc="Popular urban getaways" icon={Map} />
              <DropLink title="Nature Escapes" desc="Islands, mountains & more" icon={Plane} />
            </NavItem>
            <NavItem label="Trips" icon={Calendar}>
              <DropLink title="Plan a Trip" desc="Create multi-city itineraries" icon={Calendar} />
              <DropLink title="Group Tours" desc="Company & family packages" icon={UsersIcon} />
            </NavItem>
            <NavItem label="Deals" icon={Percent}>
              <DropLink title="Last-Minute" desc="Save on departures this week" icon={Percent} />
              <DropLink title="Seasonal" desc="Festivals & holiday offers" icon={Percent} />
            </NavItem>
            <NavItem label="Support" icon={HelpCircle}>
              <DropLink title="Help Center" desc="FAQs & policies" icon={HelpCircle} />
              <DropLink title="Live Chat" desc="Talk to a travel expert" icon={UserRound} />
            </NavItem>
          </div>

          {/* Desktop search and auth */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/90" />
              <input
                placeholder="Search trips, cities, airports…"
                className="w-64 pl-9 pr-3 py-2 rounded-xl bg-white/15 text-white placeholder-white/80 ring-1 ring-white/25 focus:ring-2 focus:ring-white/60 outline-none"
              />
            </div>
            <a
              href="#"
              className="px-3 py-2 rounded-xl text-white/95 hover:text-white ring-1 ring-white/25 hover:ring-white/40 transition text-sm"
            >
              Log in
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold hover:opacity-90 transition text-sm"
            >
              Sign up
            </a>
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center gap-2">
            <button className="p-2 rounded-xl ring-1 ring-white/25 text-white/90">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl ring-1 ring-white/25 text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-fuchsia-500 to-amber-400" />
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className="relative h-full px-4 py-4 flex flex-col">
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center gap-2">
                <div className="grid place-items-center w-10 h-10 rounded-2xl bg-white/10 ring-1 ring-white/30">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-lg font-extrabold tracking-wide leading-none">Skylark</div>
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
              <MobileGroup title="Destinations">
                <MobileLink label="Explore Regions" />
                <MobileLink label="Top Cities" />
                <MobileLink label="Nature Escapes" />
              </MobileGroup>
              <MobileGroup title="Trips">
                <MobileLink label="Plan a Trip" />
                <MobileLink label="Group Tours" />
              </MobileGroup>
              <MobileGroup title="Deals">
                <MobileLink label="Last-Minute" />
                <MobileLink label="Seasonal" />
              </MobileGroup>
              <MobileGroup title="Support">
                <MobileLink label="Help Center" />
                <MobileLink label="Live Chat" />
              </MobileGroup>
            </div>

            <div className="mt-auto grid gap-3">
              <a
                href="#"
                className="w-full text-center py-2 rounded-xl bg-white text-slate-900 font-semibold text-base"
              >
                Sign up
              </a>
              <a
                href="#"
                className="w-full text-center py-2 rounded-xl ring-1 ring-white/40 text-white text-base"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none h-6 bg-gradient-to-b from-amber-200/30 to-transparent" />
    </header>
  );
}
