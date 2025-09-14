import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <header className="bg-white shadow-lg">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo with retro punk glitch effect */}
                <h1 className="text-2xl font-extrabold text-blue-600 glitch-light tracking-widest">
                    RetroQuery
                </h1>

                {/* Links */}
                <ul className="flex gap-8 text-lg font-semibold">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `relative group transition duration-300 
                 ${isActive ? "text-blue-600" : "text-gray-700"}`
                            }
                        >
                            Home
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/usemutation"
                            className={({ isActive }) =>
                                `relative group transition duration-300 
                 ${isActive ? "text-blue-600" : "text-gray-700"}`
                            }
                        >
                            useMutation
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
