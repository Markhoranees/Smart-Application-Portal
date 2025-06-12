import React from 'react';

const JobFields = ({ formData, handleChange }) => {
  return (
    <>
      <input 
        name="location" 
        placeholder="Location" 
        value={formData.location || ""} 
        onChange={handleChange} 
        className="input" 
      />
      <select 
        name="onsite" 
        value={formData.onsite || ""} 
        onChange={handleChange} 
        className="input"
      >
        <option value="">Onsite or Remote</option>
        <option value="true">Onsite</option>
        <option value="false">Remote</option>
      </select>
      <select 
        name="jobCategory" 
        value={formData.jobCategory || ""} 
        onChange={handleChange} 
        className="input"
      >
        <option value="">Select Job Category</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
      </select>
      <input 
        name="skills" 
        placeholder="Skills (comma separated)" 
        value={formData.skills || ""} 
        onChange={handleChange} 
        className="input" 
      />
    </>
  );
};

export default JobFields; 