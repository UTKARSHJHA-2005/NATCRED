import React, { useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import profile from "../assets/profile.jpg";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;