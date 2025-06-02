import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/JobDetail.css";

const JobDetail = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>No job found</p>;

  return (
    <div className="job-detail-container">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Category:</strong> {job.category}</p>
      <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Closing Date:</strong> {new Date(job.closingDate).toLocaleDateString()}</p>

      <button className="apply-button" onClick={() => alert("Applying for job...")}>
        Apply Now
      </button>
    </div>
  );
};

export default JobDetail;
