import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          React Query Demo
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 transition ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/optimistic-updates"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 transition ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Optimistic Updates
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
