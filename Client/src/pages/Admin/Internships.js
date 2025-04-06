// src/components/Internships.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternships } from '../../features/auth/internshipsSlice';

const Internships = () => {
  const dispatch = useDispatch();

  // Get internships state from Redux store
  const { internships, status, error } = useSelector((state) => state.internships);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInternships());
    }
  }, [status, dispatch]);

  // Loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {internships.map((internship) => (
          <div className="col-md-4" key={internship.link}>
            <div className="card mb-4">
              <img
                src={internship.image}
                className="card-img-top"
                alt={internship.title}
              />
              <div className="card-body">
                <h5 className="card-title">{internship.title}</h5>
                <p className="card-text">{internship.date}</p>
                <a href={internship.link} className="btn btn-primary">
                  View Internship
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
