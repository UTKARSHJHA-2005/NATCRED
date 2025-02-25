import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import coin from '../assets/coins.png'
import profile from "../assets/profile.jpg";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [coins, setCoins] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
  }, []);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="logo-section">
            <Link to="/" className="logo-link h-16">
              <img src={logo} alt="NATCRED" className="logo-image" />
              <span className="brand-name">NATCRED</span>
            </Link>
          </div>

          <div className="desktop-nav">
            <div className="nav-links">
              <Link to="/" className="nav-link">
                <span className="link-text">Home</span>
                <span className="link-glow"></span>
              </Link>
              <Link to="/Dashboard" className="nav-link">
                <span className="link-text">Dashboard</span>
                <span className="link-glow"></span>
              </Link>
              <Link to="/Projects" className="nav-link">
                <span className="link-text">Projects</span>
                <span className="link-glow"></span>
              </Link>
              <Link to="/Product" className="nav-link">
                <span className="link-text">Products</span>
                <span className="link-glow"></span>
              </Link>
              <Link to="/Posts" className="nav-link">
                <span className="link-text">Posts</span>
                <span className="link-glow"></span>
              </Link>
            </div>
            <div className="flex flex-row gap-0 items-center cursor-pointer justify-center" onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <img src={coin} alt="Coins" title="CredCoins" className="h-[80px] mt-1 w-[70px]" />
              <p className="text-white text-[20px] font-semibold">{coins}</p>
              {isHovered && (
                <div className="absolute top-full mt-2 bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg w-48 text-center">
                  {coins} CredCoins= ₹{coins / 2}
                </div>
              )}
            </div>
            <div className="profile-section" onClick={toggleDropdown}>
              <div className="profile-image-container">
                <img src={profile} alt="Profile" className="profile-image" />
                <div className="profile-glow"></div>
              </div>
              {isOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    <span>Profile Settings</span>
                    <div className="dropdown-glow"></div>
                  </Link>
                  <button className="dropdown-item">
                    <span>Logout</span>
                    <div className="dropdown-glow"></div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <HiX className="menu-icon" />
            ) : (
              <HiOutlineMenuAlt3 className="menu-icon" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-content">
            <Link to="/" className="mobile-nav-link">
              <span>Home</span>
              <div className="mobile-link-glow"></div>
            </Link>
            <Link to="/Dashboard" className="mobile-nav-link">
              <span>Dashboard</span>
              <div className="mobile-link-glow"></div>
            </Link>
            <Link to="/Projects" className="mobile-nav-link">
              <span>Projects</span>
              <div className="mobile-link-glow"></div>
            </Link>
            <Link to="/Product" className="mobile-nav-link">
              <span>Products</span>
              <div className="mobile-link-glow"></div>
            </Link>
            <Link to="/Posts" className="mobile-nav-link">
              <span>Posts</span>
              <div className="mobile-link-glow"></div>
            </Link>
            <div className="flex flex-row">
              <Link to="/profile">
                <div className="mobile-nav-link">
                  <img src={profile} alt="Profile" className="h-[50px] w-[50px] ml-[7px] rounded-full" />
                  <div className="profile-glow"></div>
                </div>
              </Link>
              <div className="flex flex-row gap-0 items-center justify-center">
                <img src={coin} alt="Coins" title="CredCoins" className="h-[70px] mt-1 w-[70px]" />
                <p className="text-white text-[20px] font-semibold">{coins}= ₹{coins / 2}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;