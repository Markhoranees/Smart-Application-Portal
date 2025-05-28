import React, { useEffect, useState } from 'react';
import ApplicationForm from '../ApplicationForm'; // Adjust path accordingly
import '../../assets/styles/JobDetail.css';

const JobDetail = ({ id }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch job details');
        return res.json();
      })
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading job details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!job) return <p className="error">No job found.</p>;

  return (
    <div className="job-detail">
      <h2 className="title">{job.title}</h2>
      <h3 className="company">{job.company}</h3>
      <p className="location"><strong>Location:</strong> {job.location}</p>
      <div className="description">
        <p><strong>Description:</strong></p>
        <p>{job.description}</p>
      </div>
      <div className="requirements">
        <p><strong>Requirements:</strong></p>
        <p>{job.requirements}</p>
      </div>
      <p className="deadline"><strong>Apply By:</strong> {new Date(job.closingDate).toLocaleDateString()}</p>

      {!showForm ? (
        <button className="apply-button" onClick={() => setShowForm(true)}>
          Apply Now
        </button>
      ) : (
        <div className="application-form-container">
          <h3>Application Form</h3>
          <ApplicationForm category="job" appliedForId={job._id} />
        </div>
      )}
    </div>
  );
};

export default JobDetail;
