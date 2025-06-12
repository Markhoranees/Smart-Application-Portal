import React from 'react';

const ScholarshipResults = ({ scholarships }) => {
  if (scholarships.length === 0) {
    return <p>No matching scholarships found.</p>;
  }

  return (
    <>
      <h3>Recommended Scholarships</h3>
      {scholarships.map((sch) => (
        <div key={sch._id} className="result-card">
          <h4>{sch.title}</h4>
          <p><strong>Provider:</strong> {sch.provider}</p>
          <p><strong>Eligibility:</strong> {sch.eligibility}</p>
        </div>
      ))}
    </>
  );
};

export default ScholarshipResults; 