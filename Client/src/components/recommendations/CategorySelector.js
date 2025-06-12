import React from 'react';

const CategorySelector = ({ category, handleCategoryChange }) => {
  return (
    <select value={category} onChange={handleCategoryChange} className="input">
      <option value="">Select Category</option>
      <option value="job">Jobs</option>
      <option value="internship">Internships</option>
      <option value="scholarship">Scholarships</option>
    </select>
  );
};

export default CategorySelector; 