import React, { useState , useEffect } from "react";
import "../assets/styles/RecentJobs.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/auth/jobsSlice';
import { Spinner, Card, Button } from 'react-bootstrap';


// const jobs = [
//   { title: "Frontend Development", company: "Facebook, Inc.", location: "Western City, UK", type: "Part-time", typeColor: "#007bff" },
//   { title: "Full Stack Developer", company: "Google, Inc.", location: "Western City, UK", type: "Full Time", typeColor: "#ffc107" },
//   { title: "Open Source Interactive Developer", company: "New York Times", location: "Western City, UK", type: "Freelance", typeColor: "#17a2b8" },
//   { title: "Frontend Development", company: "Facebook, Inc.", location: "Western City, UK", type: "Internship", typeColor: "#6c757d" },
//   { title: "Open Source Interactive Developer", company: "New York Times", location: "Western City, UK", type: "Temporary", typeColor: "#dc3545" },
// ];

const jobCategories = ["All", "Featured", "Full Time", "Part-time", "Freelance"];

const RecentJobs = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);
  const [activeTab, setActiveTab] = useState("All");

  const filteredJobs = activeTab === "All" ? jobs : jobs.filter(job => job.type === activeTab);
console.log("jobs", jobs);
  return (
    <div className="recent-jobs-container">
      <h2 className="section-title">Recently<strong> Job</strong></h2>

      {/* Tabs */}
      <div className="tabs">
        {jobCategories.map(tab => (
          <button 
            key={tab} 
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-info">
                <h3>{job.title} <span className="job-type" style={{ background: job.typeColor }}>{job.type}</span></h3>
                <p><span className="company">{job.company}</span> @ {job.location}</p>
              </div>
              <button className="apply-btn">Apply Job</button>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs available in this category.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="page active">1</span>
        <span className="page">2</span>
        <span className="page">3</span>
        <span className="page">4</span>
        <span className="page">5</span>
      </div>
    </div>
  );
};

export default RecentJobs;
