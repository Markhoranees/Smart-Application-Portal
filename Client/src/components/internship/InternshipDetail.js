import React, { useEffect, useState } from 'react';
import ApplicationForm from '../ApplicationForm';  // Adjust path as needed
import '../../assets/styles/InternshipDetail.css';

const InternshipDetail = ({ id }) => {
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

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
      <p className="location"><strong>Location:</strong> {internship.location || 'Not specified'}</p>
      <p className="duration"><strong>Duration:</strong> {internship.duration || 'Not specified'}</p>
      <p className="education-level"><strong>Education Level:</strong> {internship.educationLevel || 'Not specified'}</p>
      <p className="education-field"><strong>Field of Study:</strong> {internship.educationField || 'Not specified'}</p>
      <p className="remote"><strong>Remote:</strong> {internship.remote ? 'Yes' : 'No'}</p>
      <div className="skills-required">
        <strong>Skills Required:</strong>
        <ul>
          {(internship.skillsRequired && internship.skillsRequired.length > 0) ? (
            internship.skillsRequired.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))
          ) : (
            <li>Not specified</li>
          )}
        </ul>
      </div>
      <div className="description">
        <p><strong>Description:</strong></p>
        <p>{internship.description}</p>
      </div>
      <p className="deadline"><strong>Apply By:</strong> {new Date(internship.closingDate).toLocaleDateString()}</p>

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
          category="internship"
          appliedForId={internship._id || internship.id}
        />
      )}
    </div>
  );
};

export default InternshipDetail;
