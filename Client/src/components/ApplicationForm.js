import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const ApplicationForm = ({ category, appliedForId }) => {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    education: {
      level: "",
      field: "",
      institution: "",
      graduationYear: "", // YYYY-MM-DD string from date picker
    },
    motivation: "",
    workExperience: "",
    financialStatus: "",
  });

  const [files, setFiles] = useState({ cvFile: null, additionalFiles: [] });

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (
    name === "educationLevel" ||
    name === "educationField" ||
    name === "educationInstitution" ||
    name === "educationGraduationYear"
  ) {
    // Map the input name to the exact key in education state
    let key = "";
    switch(name) {
      case "educationLevel":
        key = "level";
        break;
      case "educationField":
        key = "field";
        break;
      case "educationInstitution":
        key = "institution";
        break;
      case "educationGraduationYear":
        key = "graduationYear";
        break;
      default:
        key = name;
    }

    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [key]: value,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  // File input handler
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: name === "cvFile" ? files[0] : files,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation for required education fields
    const {
      level,
      field,
      institution,
      graduationYear,
    } = formData.education;

    if (!level || !field || !institution || !graduationYear) {
      return alert("Please fill all required education fields.");
    }

    const token = await getToken();

    const form = new FormData();
    form.append("category", category);
    form.append("appliedForId", appliedForId);

    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("address", formData.address);

    form.append("educationLevel", level);
    form.append("educationField", field);
    form.append("educationInstitution", institution);

    // Extract only the year number from the date string
    const yearStr = new Date(graduationYear).getFullYear().toString();
    if (isNaN(yearStr)) {
      return alert("Please select a valid graduation year.");
    }
    form.append("educationGraduationYear", yearStr);

    form.append("motivation", formData.motivation);
    form.append("workExperience", formData.workExperience);
    form.append("financialStatus", formData.financialStatus);

    if (files.cvFile) form.append("cvFile", files.cvFile);
    Array.from(files.additionalFiles || []).forEach((file) =>
      form.append("additionalFiles", file)
    );

    try {
      await axios.post("http://localhost:5000/api/applications", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        education: {
          level: "",
          field: "",
          institution: "",
          graduationYear: "",
        },
        motivation: "",
        workExperience: "",
        financialStatus: "",
      });
      setFiles({ cvFile: null, additionalFiles: [] });
    } catch (error) {
      console.error("Application Error:", error.response?.data || error.message);
      alert("Application failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="input"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input"
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="input"
      />

      {/* Address */}
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="input"
      />

      {/* Education Level */}
      <input
        type="text"
        name="educationLevel"
        placeholder="Education Level"
        value={formData.education.level}
        onChange={handleChange}
        required
        className="input"
      />

      {/* Field of Study */}
      <input
        type="text"
        name="educationField"
        placeholder="Field of Study"
        value={formData.education.field}
        onChange={handleChange}
        required
        className="input"
      />

      {/* Institution */}
      <input
        type="text"
        name="educationInstitution"
        placeholder="Institution"
        value={formData.education.institution}
        onChange={handleChange}
        required
        className="input"
      />

     {/* Graduation Year (date picker) */}
<input
  type="date"
  name="educationGraduationYear"
  value={formData.education.graduationYear || ""}
  onChange={handleChange}
  required
  className="input"
/>

      {/* Motivation */}
      <textarea
        name="motivation"
        placeholder={`Why this ${category}?`}
        value={formData.motivation}
        onChange={handleChange}
        className="textarea"
        required={category !== "job" ? true : false} // example, can customize per category
      />

      {/* Work Experience */}
      <textarea
        name="workExperience"
        placeholder="Work Experience"
        value={formData.workExperience}
        onChange={handleChange}
        className="textarea"
        required={category === "job" || category === "internship"}
      />

      {/* Financial Status */}
      {(category === "scholarship") && (
        <textarea
          name="financialStatus"
          placeholder="Financial Status"
          value={formData.financialStatus}
          onChange={handleChange}
          className="textarea"
          required
        />
      )}

      {/* CV Upload */}
      <label className="block">
        Upload CV (PDF/Doc):
        <input
          type="file"
          name="cvFile"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleFileChange}
          className="file-input"
        />
      </label>

      {/* Additional Documents Upload */}
      <label className="block">
        Upload Additional Documents:
        <input
          type="file"
          name="additionalFiles"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
      </label>

      <button type="submit" className="btn btn-primary">
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
