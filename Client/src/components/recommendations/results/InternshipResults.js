import React from 'react';

const InternshipResults = ({ internships }) => {
  if (internships.length === 0) {
    return <p>No matching internships found.</p>;
  }

  return (
    <>
      <h3>Recommended Internships</h3>
      {internships.map((intern) => (
        <div key={intern._id} className="result-card">
          <h4>{intern.title}</h4>
          <p>{intern.company} — {intern.location}</p>
          <p><strong>Skills:</strong> {intern.skillsRequired?.join(", ")}</p>
          <p><strong>Remote:</strong> {intern.remote ? "Yes" : "No"}</p>
        </div>
      ))}
    </>
  );
};

export default InternshipResults; 