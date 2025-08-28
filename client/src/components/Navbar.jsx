import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import profile from "../assets/profile.jpg";
import "./Navbar.css";
import { useAuth } from "../AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handlelogout = () => {
    logout()
    navigate("/login")
  }
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
            {user ? (
              <div className="profile-section" onClick={toggleDropdown}>
                <div className="profile-image-container">
                  <img src={user.image || profile} alt="Profile" className="profile-image" />
                  <div className="profile-glow"></div>
                </div>
                {isOpen && (
                  <div className="profile-dropdown">
                    <Link to="/profile" className="dropdown-item">
                      <span>Profile Settings</span>
                      <div className="dropdown-glow"></div>
                    </Link>
                    <button onClick={handlelogout} className="dropdown-item">
                      <span>Logout</span>
                      <div className="dropdown-glow"></div>
                    </button>
                  </div>
                )}
              </div>) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                Login
              </button>
            )}
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
              {user ? (
                <Link to="/profile">
                  <div className="mobile-nav-link">
                    <img src={user?.image || profile} alt="Profile" className="h-[50px] w-[50px] ml-[7px] rounded-full" />
                    <div className="profile-glow"></div>
                  </div>
                </Link>) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;