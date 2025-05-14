import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 

  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const toggleDropdown = (dropdownName, event) => {
    event.stopPropagation(); // Prevents closing immediately when clicking
    setActiveDropdown((prevDropdown) => (prevDropdown === dropdownName ? null : dropdownName));
  };

  // Close All Menus
  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown(null);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Detect Scroll for Sticky Header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="logo">
          JobPortal
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰ MENU
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>

                  {/* Find Jobs Dropdown */}
        <li className="dropdown">
          <button onClick={(e) => toggleDropdown("jobs", e)} className="dropdown-toggle">
            Find Jobs 
          </button>
          <ul className={`dropdown-menu ${activeDropdown === "jobs" ? "show" : ""}`}>
            <li><Link to="/joblist" onClick={closeMenu}>Job List</Link></li>
            <li><Link to="/jobdetail" onClick={closeMenu}>Job Detail</Link></li>
            <li><Link to="/enternships" onClick={closeMenu}>Internships</Link></li>
          </ul>
        </li>

        {/* More Pages Dropdown */}
        <li className="dropdown">
          <button onClick={(e) => toggleDropdown("pages", e)} className="dropdown-toggle">
            More Pages 
          </button>
          <ul className={`dropdown-menu ${activeDropdown === "pages" ? "show" : ""}`}>
            <li><Link to="/scholarships" onClick={closeMenu}>Scholarship</Link></li>
            <li><Link to="/experts" onClick={closeMenu}>Experts</Link></li>
            {/* <li><Link to="/findjobs" onClick={closeMenu}>Find Jobs</Link></li> */}
          </ul>
        </li>


     

            <div className="mobile-auth">
              <Link to="/signIn" className="btn" onClick={closeMenu}>Sign In</Link>
              <Link to="/postjob" className="btn btn-primary" onClick={closeMenu}>Post A Job</Link>
            </div>
          </ul>
        </nav>

        <div className="auth-buttons">
          <Link to="/signIn" className="btn">Sign In</Link>
          <Link to="/postjob" className="btn btn-primary">Post A Job</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
