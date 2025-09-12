import React from "react"
import { Link, NavLink } from "react-router"

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/home" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
          React Query Demo
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Posts
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
