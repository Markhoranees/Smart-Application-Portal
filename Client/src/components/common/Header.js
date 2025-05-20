import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Header.css";
import { useUser, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const { user, isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) return null;

  const isAdmin = user?.publicMetadata?.role === "admin";

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
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={closeMenu}>
                Jobs
              </Link>
            </li>


            <li>
              <Link to="/scholarships" onClick={closeMenu}>
                Scholarships
              </Link>
            </li>
            <li>
              <Link to="/internships" onClick={closeMenu}>
                Internships
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>

            {/* Admin Dashboard link visible only to admin in mobile menu */}
            {isAdmin && (
              <li>
                <Link to="/admin" onClick={closeMenu} className="admin-link-mobile">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {/* Admin Dashboard link for desktop */}
          {isAdmin && (
            <Link to="/admin" className="btn admin-link-desktop">
              Admin Dashboard
            </Link>
          )}

          {!user ? (
            <Link to="/signin" className="btn">
              Sign In
            </Link>
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



