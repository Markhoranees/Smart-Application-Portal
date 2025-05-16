import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
// Import your API utilities
import { fetchJobs, deleteJob } from "../../api/jobs";  // Adjust the import path as needed

const JobsDelete = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
        setError(null);
      } catch (err) {
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
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch {
      alert("Failed to delete the job. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="mt-3">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Listings</h2>
      {jobs.length === 0 && <p>No jobs found.</p>}

      <Row xs={1} md={2} className="g-4">
        {jobs.map((job) => (
          <Col key={job._id}>
            <Card className="h-100 shadow-sm">
              {job.file && (
                <Card.Img
                  variant="top"
                  src={job.file}
                  alt={`${job.companyName} Logo`}
                  style={{ maxHeight: "180px", objectFit: "contain" }}
                />
              )}
              <Card.Body>
                <Card.Title>{job.jobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                <Card.Text>
                  <strong>Location:</strong> {job.location || "Not specified"}
                  <br />
                  <strong>Category:</strong> {job.category || "Not specified"}
                  <br />
                  <strong>Description:</strong> {job.description?.slice(0, 100)}...
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(job._id)}
                  disabled={deletingId === job._id}
                >
                  {deletingId === job._id ? "Deleting..." : "Delete"}
                </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Closing Date: {job.closingDate ? new Date(job.closingDate).toLocaleDateString() : "N/A"}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobsDelete;
