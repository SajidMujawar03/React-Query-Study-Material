import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-white text-light-blue shadow-md border-b border-blue-200">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold glow">
          React Query ⚡
        </h1>

        {/* Nav Links */}
        <ul className="flex gap-8 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-sky-blue" : "text-light-blue"
                }`
              }
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-blue group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/usemutation"
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-sky-blue" : "text-light-blue"
                }`
              }
            >
              useMutation
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-blue group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
