import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import {Link} from 'react-router-dom';
import logo from '../assets/LOGO.png'

function Navbar() {
  const linkClasses =
    "text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-black-900 focus:ring-offset-2";
  const buttonClasses =
    "px-5 py-2 text-base font-semibold leading-7 text-white transition-all duration-200 bg-transparent font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:bg-gray-900 focus:text-white";
  return (
    <div className="overflow-x-hidden bg-gray-100" style={{ background: 'radial-gradient(circle,#95d5b2,#52b788)'}}>
      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <a
                href="#"
                title="EcoCred"
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                <Link to="/"><img
                  className="w-auto h-8"
                  src={logo}
                  alt="EcoCred"
                /></Link>
              </a>
            </div>

            <div className="flex lg:hidden">
              <button type="button" className="text-gray-900">
                <HiOutlineBars3 className="w-7 h-7" />
              </button>
            </div>
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12">
                <Link to="/experts" title="Services" className={linkClasses}>Services</Link>
                <Link to="/MarketPlace" title="MarketPlace" className={linkClasses}>Dashboard</Link>
                <Link to="/Products" title="Products" className={linkClasses}>Products</Link>
                <Link to="/Projects" title="Projects" className={linkClasses}>Projects</Link>
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
