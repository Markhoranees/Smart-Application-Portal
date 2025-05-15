import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, deleteJob } from '../../features/auth/jobsSlice'; // Assuming you have deleteJob action
import { Card, Button, Spinner, Alert, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const [activeTab, setActiveTab] = useState("All");
  const [jobToDelete, setJobToDelete] = useState("");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  const filteredJobs = activeTab === "All" ? jobs : jobs.filter(job => job.type === activeTab);

  const handleDelete = () => {
    if (jobToDelete) {
      dispatch(deleteJob(jobToDelete));
      setJobToDelete(""); // Reset after delete
    }
  };

  if (status === 'loading') {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="danger" className="my-4">
        Error loading jobs: {error}
      </Alert>
    );
  }

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Jobs</h3>
        <div>
          <Badge bg="primary" className="me-2">{filteredJobs.length} found</Badge>
          <Badge bg="secondary">{jobs.length} total</Badge>
        </div>
      </div>

      <div className="mb-4">
        <Button
          variant={activeTab === "All" ? "primary" : "outline-primary"}
          className="me-2"
          onClick={() => setActiveTab("All")}
        >
          All
        </Button>
        {[...new Set(jobs.map(job => job.type))].map(type => (
          <Button
            key={type}
            variant={activeTab === type ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setActiveTab(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="row">
        {/* Add Job Card */}
        <div className="col-md-6 mb-4">
          <Card className="h-100 border-primary">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>Add New Job</Card.Title>
              <Card.Text>Create a new job posting to attract candidates.</Card.Text>
              <Button variant="success" onClick={() => navigate("/post-job")}>
                + Add Job
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* Delete Job Card */}
        <div className="col-md-6 mb-4">
          <Card className="h-100 border-danger">
            <Card.Body>
              <Card.Title>Delete Job</Card.Title>
              <Card.Text>Select a job from the list below to delete it.</Card.Text>
              <Form.Select
                value={jobToDelete}
                onChange={(e) => setJobToDelete(e.target.value)}
                aria-label="Select job to delete"
                className="mb-3"
              >
                <option value="">Select a job...</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </Form.Select>
              <Button
                variant="danger"
                disabled={!jobToDelete}
                onClick={handleDelete}
              >
                Delete Selected Job
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.id}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-geo-alt me-2"></i>
                    <span>{job.location}</span>
                  </div>
                  <Badge bg={job.type === 'Full-time' ? 'success' : 'warning'} className="mb-3">
                    {job.type}
                  </Badge>
                  <Button 
                    variant="primary" 
                    href={job.link} 
                    target="_blank"
                    className="w-100"
                  >
                    <i className="bi bi-box-arrow-up-right me-2"></i>
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <Alert variant="info" className="my-4">
            No jobs available in this category.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Jobs;
