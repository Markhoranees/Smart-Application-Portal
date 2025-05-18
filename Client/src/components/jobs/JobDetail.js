import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchJobDetails } from "../../api/jobs";
import "../../assets/styles/JobDetail.css";


const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const data = await fetchJobDetails(id);
        setJob(data);
        setError(null);
      } catch {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    getJob();
  }, [id]);

  if (loading)
    return (
      <div className="job-detail-loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading job details...</p>
      </div>
    );

  if (error) return <Alert variant="danger" className="job-detail-error">{error}</Alert>;

  if (!job) return null;

  return (
    <div className="job-detail-container container">
      <h2 className="job-detail-title">{job.jobTitle}</h2>
      {job.image ? (
        <img src={job.image} alt={job.company} className="job-detail-image" />
      ) : (
        <div className="job-image-placeholder">No Image Available</div>
      )}
      <p className="job-company">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="job-location">
        <strong>Location:</strong> {job.location || "N/A"}
      </p>
      <p className="job-category">
        <strong>Category:</strong> {job.category || "N/A"}
      </p>
      <p className="job-description">{job.description}</p>

      {/* Eligibility and terms could come from API; using placeholders here */}
      <h4>Eligibility Criteria</h4>
      <ul className="job-eligibility">
        {(job.eligibility || ["Bachelor’s degree in relevant field", "Experience preferred"]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h4>Terms & Conditions</h4>
      <ul className="job-terms">
        {(job.terms || ["Standard company policies apply"]).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <Button className="btn-apply" href={`mailto:${job.applicationEmail}`}>
        Apply Now
      </Button>
    </div>
  );
};

export default JobDetail;
