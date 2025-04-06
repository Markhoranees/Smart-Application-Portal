import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../features/auth/jobsSlice';
import { Spinner, Card, Button } from 'react-bootstrap';


const Jobs = () => {
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
    </div>
  );
};

export default Jobs;
