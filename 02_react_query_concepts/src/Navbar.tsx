import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/stale-time", label: "Stale Time" },
    { path: "/cache-time", label: "Cache Time" },
    { path: "/automatic-sharing-1", label: "Auto Share 1" },
    { path: "/automatic-sharing-2", label: "Auto Share 2" },
    { path: "/manual-fetching", label: "Manual Fetching" },
    { path: "/polling", label: "Polling" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link to="/home" className="text-xl font-bold tracking-wide">
          React Query Demo
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-yellow-300 transition ${
                  isActive ? "text-yellow-300 font-semibold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
