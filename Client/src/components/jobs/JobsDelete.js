import React, { useState } from 'react';
import "../../assets/styles/Joblist.css";


// Dummy job data (replace with real data from API)

const JobDelete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  // Handle search
  const handleSearch = () => {
   console.log("testing");
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

export default JobDelete;
