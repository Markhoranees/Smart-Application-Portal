import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/RecommendationForm.css"; // Import the external CSS file

const RecommendationForm = () => {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData({});
    setResults(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const params = new URLSearchParams();
      params.append("category", category);

      const categoryFields = {
        job: ["location", "onsite", "jobCategory", "skills"],
        internship: ["location", "educationLevel", "educationField", "skills", "remote"],
        scholarship: ["educationLevel", "educationField", "eligibleCountries", "gpaRequirement"],
      };

      const fieldsToSend = categoryFields[category] || [];
      fieldsToSend.forEach((field) => {
        if (formData[field]) params.append(field, formData[field]);
      });

      const response = await axios.get(`http://localhost:5000/api/recommendations?${params.toString()}`);
      setResults(response.data);
    } catch {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (category) {
      case "job":
        return (
          <>
            <input name="location" placeholder="Location" value={formData.location || ""} onChange={handleChange} className="input" />
            <select name="onsite" value={formData.onsite || ""} onChange={handleChange} className="input">
              <option value="">Onsite or Remote</option>
              <option value="true">Onsite</option>
              <option value="false">Remote</option>
            </select>
            <select name="jobCategory" value={formData.jobCategory || ""} onChange={handleChange} className="input">
              <option value="">Select Job Category</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
            </select>
            <input name="skills" placeholder="Skills (comma separated)" value={formData.skills || ""} onChange={handleChange} className="input" />
          </>
        );
      case "internship":
        return (
          <>
            <input name="location" placeholder="Location" value={formData.location || ""} onChange={handleChange} className="input" />
            <input name="educationLevel" placeholder="Education Level" value={formData.educationLevel || ""} onChange={handleChange} className="input" />
            <input name="educationField" placeholder="Education Field" value={formData.educationField || ""} onChange={handleChange} className="input" />
            <input name="skills" placeholder="Skills (comma separated)" value={formData.skills || ""} onChange={handleChange} className="input" />
            <select name="remote" value={formData.remote || ""} onChange={handleChange} className="input">
              <option value="">Remote or Onsite</option>
              <option value="true">Remote</option>
              <option value="false">Onsite</option>
            </select>
          </>
        );
      case "scholarship":
        return (
          <>
            <input name="educationLevel" placeholder="Education Level" value={formData.educationLevel || ""} onChange={handleChange} className="input" />
            <input name="educationField" placeholder="Education Field" value={formData.educationField || ""} onChange={handleChange} className="input" />
            <input name="eligibleCountries" placeholder="Eligible Countries (comma separated)" value={formData.eligibleCountries || ""} onChange={handleChange} className="input" />
            <input name="gpaRequirement" type="number" step="0.01" placeholder="Max GPA Required" value={formData.gpaRequirement || ""} onChange={handleChange} className="input" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Get Personalized Recommendations</h2>

      <form onSubmit={handleSubmit} className="form">
        <select value={category} onChange={handleCategoryChange} className="input">
          <option value="">Select Category</option>
          <option value="job">Jobs</option>
          <option value="internship">Internships</option>
          <option value="scholarship">Scholarships</option>
        </select>

        {renderFields()}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {results && (
        <div className="results">
          {category === "job" && (
            <>
              <h3>Recommended Jobs</h3>
              {results.jobs.length === 0 ? <p>No matching jobs found.</p> :
                results.jobs.map((job) => (
                  <div key={job._id} className="result-card">
                    <h4>{job.title}</h4>
                    <p>{job.company} — {job.location}</p>
                    <p><strong>Category:</strong> {job.category}</p>
                    <p><strong>Skills:</strong> {job.skillsRequirement}</p>
                  </div>
                ))}
            </>
          )}
          {category === "internship" && (
            <>
              <h3>Recommended Internships</h3>
              {results.internships.length === 0 ? <p>No matching internships found.</p> :
                results.internships.map((intern) => (
                  <div key={intern._id} className="result-card">
                    <h4>{intern.title}</h4>
                    <p>{intern.company} — {intern.location}</p>
                    <p><strong>Skills:</strong> {intern.skillsRequired?.join(", ")}</p>
                    <p><strong>Remote:</strong> {intern.remote ? "Yes" : "No"}</p>
                  </div>
                ))}
            </>
          )}
          {category === "scholarship" && (
            <>
              <h3>Recommended Scholarships</h3>
              {results.scholarships.length === 0 ? <p>No matching scholarships found.</p> :
                results.scholarships.map((sch) => (
                  <div key={sch._id} className="result-card">
                    <h4>{sch.title}</h4>
                    <p><strong>Provider:</strong> {sch.provider}</p>
                    <p><strong>Eligibility:</strong> {sch.eligibility}</p>
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;
