import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/Scholarship.css";
import JobFeature from "../../components/JobFeatures";
import { useDispatch, useSelector } from "react-redux";
import { fetchScholarships } from "../../features/auth/scholarshipsSlice";
import { Spinner, Card, Button } from "react-bootstrap";

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
    return <Spinner animation="border" />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container mt-4">
           <div className="row">
             {scholarships.map((scholarship) => (
               <div className="col-md-4 mb-3" key={scholarship.link}>
                 <Card className="bg-dark text-white">
                   {/* Render base64 image if available */}
                   <Card.Img
                     variant="top"
                     src={'https://implementeducation.co.uk/resources/frontendAsset/img/scholarship2.jpg'} // use default image if not available
                     alt={scholarship.title}
                   />
                   <Card.Body>
                     <Card.Title>{scholarship.title}</Card.Title>
                     <Card.Text>{scholarship.date}</Card.Text>
                     <Button variant="primary" href={scholarship.link} target="_blank">
                       Apply Now
                     </Button>
                   </Card.Body>
                 </Card>
               </div>
             ))}
           </div>
         </div>
    </>
  );
};

export default Scholarships;
