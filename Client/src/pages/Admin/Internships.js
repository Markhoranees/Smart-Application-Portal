import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternships } from '../../features/auth/internshipsSlice';
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';

const Internships = () => {
  const dispatch = useDispatch();
  const { internships, status, error } = useSelector((state) => state.internships);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInternships());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading internships...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="danger" className="my-4">
        Error loading internships: {error}
      </Alert>
    );
  }

  if (internships.length === 0) {
    return (
      <Alert variant="info" className="my-4">
        No internships available at the moment.
      </Alert>
    );
  }

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Internships</h3>
        <Badge bg="primary">{internships.length} found</Badge>
      </div>
      
      <div className="row">
        {internships.map((internship) => (
          <div className="col-md-6 col-lg-4 mb-4" key={internship.link}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={internship.image || 'https://via.placeholder.com/300x200?text=Internship'}
                alt={internship.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{internship.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {internship.company}
                </Card.Subtitle>
                <div className="mb-3">
                  <Badge bg="info" className="me-2">
                    <i className="bi bi-clock me-1"></i>
                    {internship.duration}
                  </Badge>
                  <Badge bg="success">
                    <i className="bi bi-cash me-1"></i>
                    {internship.stipend}
                  </Badge>
                </div>
                <div className="mb-3">
                  <small className="text-muted">
                    <i className="bi bi-calendar me-2"></i>
                    Deadline: {internship.deadline}
                  </small>
                </div>
                <Button 
                  variant="primary" 
                  href={internship.link} 
                  target="_blank"
                  className="mt-auto"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
