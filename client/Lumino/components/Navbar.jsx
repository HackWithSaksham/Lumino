import React, { useContext } from "react";
import logo from "../public/logo.png";
import user from "../public/defaultuser2.png";
import { AppContent } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ className = "" }) => {
  const { userData, backendUrl ,ideaid,setideaid} = useContext(AppContent);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`flex justify-between items-center px-20 py-3 text-white 
      bg-gradient-to-r from-[#0a0a1a]/80 via-[#121235]/80 to-[#1a1445]/80
      backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-900/10 ${className}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img src={logo} className="w-16 h-16 drop-shadow-[0_0_10px_#6d28d9]" />
        <h1 className="text-3xl font-extrabold tracking-wide">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Lumino
          </span>
        </h1>
      </motion.div>

      <ul className="hidden md:flex gap-8 text-md">
        {["Home", "About", "Features", "Collab","MindMaps","Requests","Chat","Idea"].map((item) => (
          <li key={item}>
            <NavLink
  to={item === "Home" ? "/" : item === "Idea" ? "/idea" : `/${item.toLowerCase()}`}
  end={item === "Home"}
  onClick={item === "Idea" ? () => setideaid("") : undefined}
  className={({ isActive }) =>
    `relative transition-all duration-300 ${
      isActive
        ? "text-indigo-400 font-semibold"
        : "text-gray-300 hover:text-indigo-300"
    } after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-indigo-400 
    hover:after:w-full after:transition-all after:duration-300`
  }
>
  {item}
</NavLink>
          </li>
        ))}
      </ul>

      <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
        {userData ? (
          <NavLink to="/profile">
            <div className="relative">
              <img
                src={`${backendUrl}${userData.profileimage}`}
                className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-lg"
              />
              <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-pulse opacity-30"></span>
            </div>
          </NavLink>
        ) : (
          <img
            src={user}
            className="w-12 h-12 rounded-full border-2 border-indigo-500/40"
          />
        )}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
