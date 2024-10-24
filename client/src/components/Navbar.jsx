import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png'

function Navbar() {
  const linkClasses =
    "text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-";
  const buttonClasses =
    "px-5 py-2 text-base font-semibold leading-7 text-black transition-all duration-200 bg-transparent font- focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:bg-gray-900 focus:text-white";
  return (
    <div className="w-full h-[100px]" style={{ background: '#D1FFBD' }}>
      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div data-aos='fade-left' className="flex-shrink-0">
              <a
                href="#"
                title="NATCRED"
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                <Link to="/"><img
                  className="h-20 w-auto"
                  src={logo}
                  alt="EcoCred"
                /></Link>
                <div className="mt-6 text-[23px]">𝓝𝓐𝓣𝓒𝓡𝓔𝓓</div>
              </a>
            </div>

            <div className="flex lg:hidden">
              <button type="button" className="text-gray-900">
                <HiOutlineBars3 className="w-7 h-7" />
              </button>
            </div>
            <div data-aos='fade-right' className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12">
              <Link to="/" title="Home" className={linkClasses}>Home</Link>
              <Link to="/Dashboard" title="Dashboard" className={linkClasses}>Dashboard</Link>
              <Link to="/Projects" title="Projects" className={linkClasses}>Projects</Link>
              <Link to="/Product" title="Products" className={linkClasses}>Products</Link>
              <Link to="/Posts" title="Posts" className={linkClasses}>Posts</Link>
              <a href="#" title="Profile" className={buttonClasses} role="button">
                Utkarsh Jha
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;