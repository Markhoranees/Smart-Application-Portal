import React from 'react';
import JobResults from './results/JobResults';
import InternshipResults from './results/InternshipResults';
import ScholarshipResults from './results/ScholarshipResults';

const ResultsDisplay = ({ category, results }) => {
  const renderResults = () => {
    switch (category) {
      case "job":
        return <JobResults jobs={results.jobs} />;
      case "internship":
        return <InternshipResults internships={results.internships} />;
      case "scholarship":
        return <ScholarshipResults scholarships={results.scholarships} />;
      default:
        return null;
    }
  };

  return (
    <div className="results">
      {renderResults()}
    </div>
  );
};

export default ResultsDisplay; 