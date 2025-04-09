import React, { useState } from "react";
import "../assets/styles/HeroSection.css";
import bgImage from "../assets/image/bg_2.jpg";



const HeroSection = ({ showText = true, height = "100vh", breadcrumb,  backgroundImage={bgImage}  }) => {
  const [searchType, setSearchType] = useState("job");

  return (
    <section 
      className="hero" 
      style={{ height, backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="hero-overlay"></div>

      {/* Breadcrumb Navigation */}
      {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}

      {showText && (
        <div className="hero-content">
          <p>We have 850,000 great job offers you deserve!</p>
          <h1>
            Your <span className="highlight">Dream</span> Job & Scholarships is Waiting
          </h1>

          {/* Toggle Buttons */}
          <div className="hero-buttons">
            <button className={`btn ${searchType === "job" ? "active-btn" : ""}`} onClick={() => setSearchType("job")}>
              Find Job
            </button>
            <button className={`btn ${searchType === "candidate" ? "active-btn" : ""}`} onClick={() => setSearchType("candidate")}>
              Find a Candidate
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
