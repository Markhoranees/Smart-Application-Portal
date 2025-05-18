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
      <div className="jobs-loading d-flex flex-column align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
        <p className="loading-text mt-3 fs-5 text-primary">Loading jobs...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="jobs-error text-center my-4">
        {error}
      </Alert>
    );

  return (
    <div className="jobs-list-portal container py-5">
    
    <h1 className="text-center">Jobs List</h1>

      {/* Job Items */}
      <main className="jobs-main d-flex flex-column gap-4">
        {jobs.length === 0 ? (
          <p className="no-jobs text-center fs-4 text-secondary">
            No jobs found.
          </p>
        ) : (
          jobs.map((job) => (
            <article
              key={job._id}
              className="job-card d-flex flex-wrap align-items-center shadow-sm rounded border p-3 bg-white"
            >
              <div className="job-image-container flex-shrink-0 me-4 mb-3 mb-md-0">
                {job.image ? (
                  <img
                    src={job.image}
                    alt={`${job.company || "company"} logo`}
                    className="job-image rounded"
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image-text d-flex align-items-center justify-content-center rounded bg-light">
                    No Image
                  </div>
                )}
              </div>

              <div className="job-details flex-grow-1 d-flex flex-column">
                <h2 className="job-title mb-1">{job.title || "No Title"}</h2>
                <p className="job-company text-secondary mb-2">{job.company || "Unknown Company"}</p>
                <p className="job-location mb-2">
                  <strong>Location:</strong> {job.location || "N/A"}
                </p>
                <p className="job-category mb-2">
                  <strong>Category:</strong> {job.category || "N/A"}
                </p>
                <p className="job-description text-truncate">
                  {job.description || "No description available."}
                </p>

                <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <small className="text-muted">
                    Closing Date:{" "}
                    {job.closingDate
                      ? new Date(job.closingDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </small>

                  <div className="job-buttons d-flex gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(job._id)}
                      disabled={deletingId === job._id}
                    >
                      {deletingId === job._id ? "Deleting..." : "Delete"}
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/job/${job._id}`)}
                    >
                      View Details
                    </Button>
                  </div>
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
