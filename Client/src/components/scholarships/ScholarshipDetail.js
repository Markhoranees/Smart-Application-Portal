import React, { useEffect, useState } from 'react';
import ApplicationForm from '../ApplicationForm';  // Adjust path as needed
import '../../assets/styles/ScholarshipDetail.css';

const ScholarshipDetail = ({ id }) => {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/scholarships/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch scholarship details');
        return res.json();
      })
      .then(data => {
        setScholarship(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading scholarship details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!scholarship) return <p className="error">No scholarship found.</p>;

  return (
    <div className="scholarship-detail">
      <h2 className="title">{scholarship.title}</h2>
      {scholarship.image && (
        <img
          className="image"
          src={scholarship.image.startsWith('http') ? scholarship.image : `http://localhost:5000/uploads/${scholarship.image}`}
          alt={scholarship.title}
        />
      )}
      <div className="info">
        <p><strong>Description:</strong> {scholarship.description}</p>
        <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
        <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
        <p><strong>Amount:</strong> {scholarship.amount}</p>
      </div>

      {!showApplyForm && (
        <button
          className="apply-button"
          onClick={() => setShowApplyForm(true)}
        >
          Apply Now
        </button>
      )}

      {showApplyForm && (
        <ApplicationForm
          category="scholarship"
          appliedForId={scholarship._id || scholarship.id}
        />
      )}
    </div>
  );
};

export default ScholarshipDetail;
