import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Header.css";
import { useUser, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? "hidden" : "auto";
  };

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) setActiveDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          JobPortal
        </Link>

        {/* Mobile menu toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰ MENU
        </button>

        {/* Navigation menu */}
        <nav className={menuOpen ? "nav open" : "nav"}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>

            <li className="dropdown">
              <button className="dropdown-toggle" onClick={(e) => toggleDropdown("jobs", e)}>
                Find Jobs
              </button>
              <ul className={`dropdown-menu ${activeDropdown === "jobs" ? "show" : ""}`}>
                <li><Link to="/joblist" onClick={closeMenu}>Job List</Link></li>
                <li><Link to="/jobdetail" onClick={closeMenu}>Job Detail</Link></li>
                <li><Link to="/internships" onClick={closeMenu}>Internships</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <button className="dropdown-toggle" onClick={(e) => toggleDropdown("pages", e)}>
                More Pages
              </button>
              <ul className={`dropdown-menu ${activeDropdown === "pages" ? "show" : ""}`}>
                <li><Link to="/scholarships" onClick={closeMenu}>Scholarship</Link></li>
                <li><Link to="/experts" onClick={closeMenu}>Experts</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {/* Always show Admin Dashboard link */}
          <Link to="/admin" className="btn admin-link">
            Admin Dashboard
          </Link>

          {/* If no user show Sign In, else show profile */}
          {!user ? (
            <Link to="/signin" className="btn">Sign In</Link>
          ) : (
            <>
              <UserButton afterSignOutUrl="/signin" />
              <span className="ml-2 text-white font-semibold">
                {user.firstName || user.fullName || user.emailAddress}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
