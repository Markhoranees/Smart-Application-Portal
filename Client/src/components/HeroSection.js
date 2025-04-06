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

          {/* Dynamic Search Bar */}
          <div className="search-bar">
            {searchType === "job" ? (
              <>
                <input type="text" placeholder="Search jobs, scholarships..." />
                <select>
                  <option value="">Category</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                </select>
                <input type="text" placeholder="Location (e.g., New York)" />
              </>
            ) : (
              <>
                <input type="text" placeholder="Search candidate skills..." />
                <select>
                  <option value="">Experience Level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid-Level</option>
                  <option value="senior">Senior</option>
                </select>
                <input type="text" placeholder="Location (e.g., Remote)" />
              </>
            )}
            <button className="btn search-btn">Search</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
