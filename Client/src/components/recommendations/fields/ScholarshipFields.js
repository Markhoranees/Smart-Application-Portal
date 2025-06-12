import React from 'react';

const ScholarshipFields = ({ formData, handleChange }) => {
  return (
    <>
      <input 
        name="educationLevel" 
        placeholder="Education Level" 
        value={formData.educationLevel || ""} 
        onChange={handleChange} 
        className="input" 
      />
      <input 
        name="educationField" 
        placeholder="Education Field" 
        value={formData.educationField || ""} 
        onChange={handleChange} 
        className="input" 
      />
      <input 
        name="eligibleCountries" 
        placeholder="Eligible Countries (comma separated)" 
        value={formData.eligibleCountries || ""} 
        onChange={handleChange} 
        className="input" 
      />
      <input 
        name="gpaRequirement" 
        type="number" 
        step="0.01" 
        placeholder="Max GPA Required" 
        value={formData.gpaRequirement || ""} 
        onChange={handleChange} 
        className="input" 
      />
    </>
  );
};

export default ScholarshipFields; 