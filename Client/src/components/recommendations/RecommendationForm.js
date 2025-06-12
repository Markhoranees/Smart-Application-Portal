import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/RecommendationForm.css";
import CategorySelector from "./CategorySelector";
import JobFields from "./fields/JobFields";
import InternshipFields from "./fields/InternshipFields";
import ScholarshipFields from "./fields/ScholarshipFields";
import ResultsDisplay from "./ResultsDisplay";

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
        return <JobFields formData={formData} handleChange={handleChange} />;
      case "internship":
        return <InternshipFields formData={formData} handleChange={handleChange} />;
      case "scholarship":
        return <ScholarshipFields formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Get Personalized Recommendations</h2>

      <form onSubmit={handleSubmit} className="form">
        <CategorySelector 
          category={category} 
          handleCategoryChange={handleCategoryChange} 
        />

        {renderFields()}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {results && (
        <ResultsDisplay 
          category={category} 
          results={results} 
        />
      )}
    </div>
  );
};

export default RecommendationForm; 