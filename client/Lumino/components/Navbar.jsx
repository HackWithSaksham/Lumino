import React, { useContext } from "react";
import logo from '../public/logo.png'
import user from '../public/defaultuser2.png'
import { AppContent } from "../context/AppContext";
  import { NavLink } from "react-router-dom";
const Navbar = () => {
  const {userData,backendUrl} = useContext(AppContent);
  return (
    <div className="flex justify-between items-center px-30 py-8 text-white">
      <div className="flex items-center gap-2">
        <img src={logo} className="w-20 h-20" />
        <div className="text-4xl font-bold">Lumino</div>
      </div>
      <ul className="hidden md:flex gap-8 text-lg">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "hover:text-indigo-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "hover:text-indigo-300"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "hover:text-indigo-300"
            }
          >
            Features
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "hover:text-indigo-300"
            }
          >
            FAQ
          </NavLink>
        </li>
      </ul>
      {userData ? (
        <NavLink to="/profile">
        <img src={`${backendUrl}${userData.profileimage}`} className="border-3 border-[#25183C] w-13 h-13 rounded-full" />
      </NavLink>
      ):(
        <img src={user} className="w-13 h-13 rounded-full" />
      )}
    </div>
  );
};

export default Navbar;
