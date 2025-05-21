import React, { useEffect, useState } from 'react';
import '../../assets/styles/InternshipDetail.css'; // Import your CSS file for styling

const InternshipDetail = ({ id }) => {
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/internships/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch internship details');
        return res.json();
      })
      .then(data => {
        setInternship(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading internship details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!internship) return <p className="error">No internship found.</p>;

  return (
    <div className="internship-detail">
      <h2 className="title">{internship.title}</h2>
      <h3 className="company">{internship.company}</h3>
      <p className="location"><strong>Location:</strong> {internship.location}</p>
      <div className="description">
        <p><strong>Description:</strong></p>
        <p>{internship.description}</p>
      </div>
      <div className="requirements">
        <p><strong>Requirements:</strong></p>
        <p>{internship.requirements}</p>
      </div>
      <p className="deadline"><strong>Apply By:</strong> {new Date(internship.deadline).toLocaleDateString()}</p>
      <a
        className="apply-button"
        href={internship.applyLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Now
      </a>
    </div>
  );
};

export default InternshipDetail;
