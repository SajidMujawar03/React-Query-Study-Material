import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold">React Infinite Scroll</h1>

        {/* Links */}
        <div className="space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "font-semibold underline" : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/infinite-scroll"
            className={({ isActive }) =>
              isActive ? "font-semibold underline" : "hover:underline"
            }
          >
            Infinite Scroll
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
