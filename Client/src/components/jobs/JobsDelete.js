import React, { useEffect, useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchJobs, deleteJob } from "../../api/jobs";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/JobsDelete.css";

const JobsDelete = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
        setError(null);
      } catch {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setDeletingId(id);
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch {
      alert("Failed to delete the job. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="jobs-loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading jobs...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="jobs-error">
        {error}
      </Alert>
    );

  return (
    <div className="jobs-list-portal container">
      <header className="jobs-header">JOBS LIST</header>

      <main className="jobs-main">
        {jobs.length === 0 ? (
          <p className="no-jobs">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <article key={job._id} className="job-card">
              <div className="job-image-container">
                {job.image ? (
                  <img
             src={`http://localhost:5000/uploads/${job.image}`} 

                    alt={`${job.company || "Company"} logo`}
                    className="job-image"
                    loading="lazy"
                  />
                ) : (
                  <span className="no-image-text">No Image</span>
                )}
              </div>

              <div className="job-details">
                <h2 className="job-title">{job.title || "NO TITLE"}</h2>
                <p className="job-company">{job.company || "Unknown Company"}</p>

                <p className="job-location">
                  <strong>Location:</strong> {job.location || "N/A"}
                </p>
                <p className="job-category">
                  <strong>Category:</strong> {job.category || "N/A"}
                </p>

                <p className="job-description">{job.description || "No description available."}</p>

                {job.closingDate && (
                  <p className="job-closing-date">
                    Closing Date:{" "}
                    {new Date(job.closingDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                <div className="job-buttons">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(job._id)}
                    disabled={deletingId === job._id}
                    className="btn-delete"
                  >
                    {deletingId === job._id ? "Deleting..." : "Delete"}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="btn-view"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default JobsDelete;
