import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import axios from "axios";
import "../../assets/styles/Header.css";

const Header = () => {
  const { user, isLoaded } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) return null;

  const isAdmin = user?.publicMetadata?.role === "admin";

  // Fetch recommendations after user uploads CV or provides profile details
  const fetchRecommendations = async () => {
    if (!user) {
      alert("Please sign in to get recommendations.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recommendations",  // Backend endpoint to fetch recommendations
        {},
        {
          headers: {
            Authorization: `Bearer ${user.sessionId}`,  // Pass session token from Clerk for authorization
          },
        }
      );
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations.");
    }
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          JobPortal
        </Link>

        {/* Navigation menu */}
        <nav className="nav">
          <ul>
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-link">Jobs</Link>
            </li>
            <li>
              <Link to="/scholarships" className="nav-link">Scholarships</Link>
            </li>
            <li>
              <Link to="/internships" className="nav-link">Internships</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>

            {/* Admin Dashboard link visible only to admin */}
            {isAdmin && (
              <li>
                <Link to="/admin" className="admin-link">Admin Dashboard</Link>
              </li>
            )}

            {/* User Dashboard link for non-admin */}
            {!isAdmin && user && (
              <li>
                <Link to="/userdashboard" className="user-dashboard-link">
                  User Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* AI-powered recommendations button */}
        {!isAdmin && user && (
          <div className="ai-recommendations-btn">
            <button onClick={fetchRecommendations}>Get Smart Career Recommendations</button>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="auth-buttons">
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

      {/* Displaying the recommendations */}
      {recommendations && (
        <div className="recommendations">
          <h3>Recommended Jobs</h3>
          {recommendations.jobs && recommendations.jobs.length ? (
            recommendations.jobs.map((job) => (
              <div key={job._id}>
                <h4>{job.title}</h4>
                <p>{job.company} - {job.location}</p>
                <p>{job.skills.join(", ")}</p>
              </div>
            ))
          ) : (
            <p>No matching jobs found.</p>
          )}

          <h3>Recommended Internships</h3>
          {recommendations.internships && recommendations.internships.length ? (
            recommendations.internships.map((intern) => (
              <div key={intern._id}>
                <h4>{intern.title}</h4>
                <p>{intern.company} - {intern.location}</p>
                <p>{intern.skills.join(", ")}</p>
              </div>
            ))
          ) : (
            <p>No matching internships found.</p>
          )}

          <h3>Recommended Scholarships</h3>
          {recommendations.scholarships && recommendations.scholarships.length ? (
            recommendations.scholarships.map((scholarship) => (
              <div key={scholarship._id}>
                <h4>{scholarship.title}</h4>
                <p>{scholarship.provider}</p>
              </div>
            ))
          ) : (
            <p>No matching scholarships found.</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
