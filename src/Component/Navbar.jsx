import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/export_import.png"; 
import { FaUser } from "react-icons/fa"; 
import { AuthContext } from "../Context/AuthContext";



const links = [
  { name: "Home", path: "/" },
  { name: "All Products", path: "/all-products" },
];

const userLinks = [
  { name: "My Exports", path: "/my-exports" },
  { name: "My Imports", path: "/my-imports" },
  { name: "Add Export", path: "/add-export" },
];


const activeClass = ({ isActive }) =>
  isActive ? "text-blue-600 underline font-semibold" : "text-gray-800";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser().catch(err => console.error(err));
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="bg-white py-2 px-4 flex items-center justify-between border-b border-gray-300">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-12" />
          <h2 className="text-blue-600 font-bold text-xl">ImportExportHub</h2>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6">
          {links.map(link => (
            <li key={link.path}>
              <NavLink to={link.path} className={activeClass}>
                {link.name}
              </NavLink>
            </li>
          ))}
          {user && userLinks.map(link => (
            <li key={link.path}>
              <NavLink to={link.path} className={activeClass}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User/Profile button */}
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "https://placehold.co/30"
}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <button onClick={handleSignOut} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-blue-600 text-white flex items-center gap-2 btn-sm"
          >
            <FaUser />
            <span>Login</span>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isDropdownOpen && (
          <ul className="flex flex-col gap-3 mt-2 bg-gray-50 p-4 rounded shadow-lg lg:hidden">
            {links.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={activeClass}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user && userLinks.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={activeClass}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default Navbar;
