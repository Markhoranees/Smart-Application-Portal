import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import Navigation from "./Navigation";
import RecommendationsButton from "./RecommendationsButton";
import "../../assets/styles/Header.css";

const Header = () => {
  const { user, isLoaded } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) return null;

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          JobPortal
        </Link>

        {/* Navigation menu */}
        <Navigation />

        {/* AI-powered recommendations button */}
        {!user?.publicMetadata?.role === "admin" && user && (
          <RecommendationsButton />
        )}

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {!user ? (
            <Link to="/signin" className="btn">Sign In</Link>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
