import React from 'react';

const InternshipFields = ({ formData, handleChange }) => {
  return (
    <>
      <input 
        name="location" 
        placeholder="Location" 
        value={formData.location || ""} 
        onChange={handleChange} 
        className="input" 
      />
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
        name="skills" 
        placeholder="Skills (comma separated)" 
        value={formData.skills || ""} 
        onChange={handleChange} 
        className="input" 
      />
      <select 
        name="remote" 
        value={formData.remote || ""} 
        onChange={handleChange} 
        className="input"
      >
        <option value="">Remote or Onsite</option>
        <option value="true">Remote</option>
        <option value="false">Onsite</option>
      </select>
    </>
  );
};

export default InternshipFields; 