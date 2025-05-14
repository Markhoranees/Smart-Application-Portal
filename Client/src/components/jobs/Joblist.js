import React, { useState } from 'react';
import "../../assets/styles/Joblist.css";


// Dummy job data (replace with real data from API)
const jobData = [
  { id: 1, title: "Frontend Developer", category: "Full Time", location: "New York" },
  { id: 2, title: "Backend Developer", category: "Part Time", location: "San Francisco" },
  { id: 3, title: "UI/UX Designer", category: "Freelancer", location: "Remote" },
];

const Joblist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobData);

  // Handle search
  const handleSearch = () => {
    const filtered = jobData.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <>


      {/* Top Section with Background Image */}
      <section className="container-joblist">
        <div className="top-header">
          <h3>Job List</h3>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs, categories, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn search-btn" onClick={handleSearch}>Search</button>
        </div>
      </section>

   

\
    </>
  );
};

export default Joblist;
