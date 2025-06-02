import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/RecommendationLanding.css"; // adjust the path as necessary

const RecommendationLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="recommendation-landing-container">
      <h1>Welcome to Your Career Recommendation System</h1>
      <p>
        Find the best matching jobs, scholarships, and internships based on
        your education, skills, and preferences. Save time and discover
        opportunities tailored just for you!
      </p>
      <button
        className="start-btn"
        onClick={() => navigate("/recomendationForm")}
      >
        Get Your Recommendations
      </button>
    </div>
  );
};

export default RecommendationLanding;
