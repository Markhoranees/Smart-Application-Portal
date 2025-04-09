import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../features/auth/jobsSlice';
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  const filteredJobs = activeTab === "All" ? jobs : jobs.filter(job => job.type === activeTab);

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
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.link}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company}
                  </Card.Subtitle>
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
