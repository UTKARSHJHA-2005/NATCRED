import React, { useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import profile from "../assets/profile.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkClasses =
    "text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj";
  const buttonClasses =
    "px-5 py-2 text-base bg-green-600 font-semibold leading-7 text-black transition-all duration-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300";

  return (
    <>
<div className="w-full h-[90px]" style={{ background: '#D1FFBD' }}>
        <header className="relative py-3 md:py-6">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between">
              <div data-aos='fade-left' className="flex-shrink-0">
                <a
                  href="#"
                  title="NATCRED"
                  className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  <Link to="/"><img
                    className="h-20 w-auto"
                    src={logo}
                    alt="EcoCred" /></Link>
                  <div className="mt-6 text-[23px]">𝓝𝓐𝓣𝓒𝓡𝓔𝓓</div>
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="text-gray-900"
                  onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? (
                    <HiX className="w-7 h-7" />
                  ) : (
                    <HiOutlineMenuAlt3 className="w-7 h-7" />
                  )}
                </button>
              </div>
              <div
                data-aos="fade-right"
                className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12">
                <Link to="/" title="Home" className={linkClasses}>
                  Home
                </Link>
                <Link to="/Dashboard" title="Dashboard" className={linkClasses}>
                  Dashboard
                </Link>
                <Link to="/Projects" title="Projects" className={linkClasses}>
                  Projects
                </Link>
                <Link to="/Product" title="Products" className={linkClasses}>
                  Products
                </Link>
                <Link to="/Posts" title="Posts" className={linkClasses}>
                  Posts
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10">
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-gray-300"/>
                  </div>
                  <a
                    href="#"
                    title="Profile"
                    className="text-gray-800 font-medium"
                    onClick={toggleDropdown}
                    role="button">
                    Utkarsh Jha
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      {isOpen && (
        <div className="absolute mt-2 ml-[1200px] w-48 bg-green-300 border border-green-400 rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-green-600 hover:text-white cursor-pointer">
              <Link to="/profile">Profile Settings</Link>
            </li>
            <li className="px-4 py-2 hover:bg-green-600 hover:text-white cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-green-100">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <Link to="/" title="Home" className={linkClasses}>
              Home
            </Link>
            <Link to="/Dashboard" title="Dashboard" className={linkClasses}>
              Dashboard
            </Link>
            <Link to="/Projects" title="Projects" className={linkClasses}>
              Projects
            </Link>
            <Link to="/Product" title="Products" className={linkClasses}>
              Products
            </Link>
            <Link to="/Posts" title="Posts" className={linkClasses}>
              Posts
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                />
              </div>
              <a
                href="#"
                title="Profile"
                className="text-gray-800 font-medium"
                onClick={toggleDropdown}
                role="button"
              >
                Utkarsh Jha
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
