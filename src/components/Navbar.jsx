import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-10 bg-gray-900 border-b border-gray-700 py-5 text-white">
      <NavLink
        to={"/notes"}
        className={({ isActive }) =>
          `text-xl md:text-2xl font-medium transition ${
            isActive ? "text-violet-500" : "hover:text-violet-400"
          }`
        }
      >
        Notes
      </NavLink>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `text-xl md:text-2xl font-medium transition ${
            isActive ? "text-violet-500" : "hover:text-violet-400"
          }`
        }
      >
        Create
      </NavLink>
    </nav>
  );
}
