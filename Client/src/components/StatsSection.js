import React from "react";
import "../assets/styles/StatsSection.css";

const StatsSection = () => {
  return (
    <div className="stats-container">
      <div className="stats-overlay">
        <div className="stats-item">
          <h2>1,350,000</h2>
          <p>Jobs</p>
        </div>
        <div className="stats-item">
          <h2>40,000</h2>
          <p>Members</p>
        </div>
        <div className="stats-item">
          <h2>30,000</h2>
          <p>Resume</p>
        </div>
        <div className="stats-item">
          <h2>10,500</h2>
          <p>Company</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
