import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScholarships } from "../../features/auth/scholarshipsSlice";
import { Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Scholarships = () => {
  const dispatch = useDispatch();
  const { scholarships, status, error } = useSelector(
    (state) => state.scholarships
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchScholarships());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading scholarships...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <Alert variant="danger" className="my-4">
        Error loading scholarships: {error}
      </Alert>
    );
  }

  return (
    <>
   
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Scholarships</h3>
        <Badge bg="primary">{scholarships.length} found</Badge>
      </div>

      <div className="row">
        {scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <div className="col-md-6 col-lg-4 mb-4" key={scholarship.link}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={scholarship.image || 'https://implementeducation.co.uk/resources/frontendAsset/img/scholarship2.jpg'}
                  alt={scholarship.title}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{scholarship.title}</Card.Title>
                  <Card.Text className="text-muted">
                    <small>
                      <i className="bi bi-calendar me-2"></i>
                      {scholarship.date}
                    </small>
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    href={scholarship.link} 
                    target="_blank"
                    className="mt-auto"
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
            No scholarships available at the moment.
          </Alert>
        )}
      </div>
    </div>
    </>
  );
};

export default Scholarships;
