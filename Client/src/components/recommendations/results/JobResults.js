import React from 'react';

const JobResults = ({ jobs }) => {
  if (jobs.length === 0) {
    return <p>No matching jobs found.</p>;
  }

  return (
    <>
      <h3>Recommended Jobs</h3>
      {jobs.map((job) => (
        <div key={job._id} className="result-card">
          <h4>{job.title}</h4>
          <p>{job.company} — {job.location}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Skills:</strong> {job.skillsRequirement}</p>
        </div>
      ))}
    </>
  );
};

export default JobResults; 