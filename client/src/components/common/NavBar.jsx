import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FiSun, FiMoon } from 'react-icons/fi'; // Import the moon icon
import ThemeToggle from "../common/ThemeToggle";
import ThemeContext from "../../context/ThemeContext";

const NavBar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme } = useContext(ThemeContext); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 min-h-8 flex justify-between items-center px-4">
      {/* Logo Section */}
      <NavLink to="/">
        <img className="w-32 m-auto" src={Logo} alt="Logo" />
      </NavLink>

      {/* Icon and Dropdown Section */}
      <div className="flex justify-center items-center relative">
      

        {/* Theme Selection Dropdown */}
        <div className="relative ">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            onClick={toggleDropdown}
          >
            {theme === 'light' && <FiSun className="text-xl md:text-2xl dark:text-white" />}
            {theme === 'dark' && <FiMoon className="text-xl md:text-2xl text-yellow-400" />} 
            {theme === 'system' && <FiSun className="text-xl md:text-2xl dark:text-white" />} 
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div onClick={toggleDropdown} className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
