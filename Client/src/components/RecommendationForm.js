import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/RecommendationForm.css"; // Adjust path as needed

const RecommendationForm = () => {
  const [form, setForm] = useState({
    educationLevel: "",
    educationField: "",
    location: "",
    skills: "",
    category: "", // job, scholarship, internship, or blank for all
    onsite: "",   // For jobs: "true"/"false"
    remote: "",   // For internships: "true"/"false"
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const params = new URLSearchParams();

      Object.entries(form).forEach(([key, val]) => {
        if (val) params.append(key, val);
      });

      const res = await axios.get(`http://localhost:5000/api/recommendations?${params.toString()}`);
      setResults(res.data);
    } catch (err) {
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Get Recommended Jobs, Scholarships & Internships</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          name="educationLevel"
          placeholder="Education Level (e.g. Bachelor, Master)"
          value={form.educationLevel}
          onChange={handleChange}
        />

        <input
          name="educationField"
          placeholder="Education Field (e.g. Computer Science)"
          value={form.educationField}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="job">Jobs</option>
          <option value="scholarship">Scholarships</option>
          <option value="internship">Internships</option>
        </select>

        {(form.category === "job" || form.category === "") && (
          <select
            name="onsite"
            value={form.onsite}
            onChange={handleChange}
          >
            <option value="">Onsite or Remote (Jobs)</option>
            <option value="true">Onsite</option>
            <option value="false">Remote</option>
          </select>
        )}

        {(form.category === "internship" || form.category === "") && (
          <select
            name="remote"
            value={form.remote}
            onChange={handleChange}
          >
            <option value="">Remote or Onsite (Internships)</option>
            <option value="true">Remote</option>
            <option value="false">Onsite</option>
          </select>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {results && (
        <>
          <h3>Jobs</h3>
          {results.jobs.length === 0 && <p>No matching jobs found.</p>}
          {results.jobs.map((job) => (
            <div key={job._id} className="result-item">
              <h4>{job.title}</h4>
              <p>{job.company} - {job.location}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Skills Required:</strong> {job.skillsRequirement}</p>
            </div>
          ))}

          <h3>Scholarships</h3>
          {results.scholarships.length === 0 && <p>No matching scholarships found.</p>}
          {results.scholarships.map((sch) => (
            <div key={sch._id} className="result-item">
              <h4>{sch.title}</h4>
              <p><strong>Provider:</strong> {sch.provider}</p>
              <p><strong>Eligibility:</strong> {sch.eligibility}</p>
            </div>
          ))}

          <h3>Internships</h3>
          {results.internships.length === 0 && <p>No matching internships found.</p>}
          {results.internships.map((intern) => (
            <div key={intern._id} className="result-item">
              <h4>{intern.title}</h4>
              <p>{intern.company} - {intern.location}</p>
              <p><strong>Skills Required:</strong> {(intern.skillsRequired || []).join(", ")}</p>
              <p><strong>Remote:</strong> {intern.remote ? "Yes" : "No"}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RecommendationForm;
